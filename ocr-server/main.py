import io
import logging
from contextlib import asynccontextmanager
from typing import List

import numpy as np
from fastapi import FastAPI, File, HTTPException, Query, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image
from pydantic import BaseModel

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Global OCR instances keyed by language
ocr_instances: dict = {}


def get_ocr(lang: str):
    """Return a cached PaddleOCR instance for the given language."""
    if lang not in ocr_instances:
        from paddleocr import PaddleOCR

        logger.info("Initialising PaddleOCR for lang=%s", lang)
        ocr_instances[lang] = PaddleOCR(
            use_angle_cls=True,  # Required for vertical Japanese text
            lang=lang,
            use_gpu=False,       # CPU-only — fits Railway free tier memory
            show_log=False,
        )
        logger.info("PaddleOCR ready for lang=%s", lang)
    return ocr_instances[lang]


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Pre-warm the default Japanese model so the first request is fast
    logger.info("Pre-warming PaddleOCR (japan)...")
    get_ocr("japan")
    logger.info("Startup complete.")
    yield
    ocr_instances.clear()


app = FastAPI(title="Cartoon OCR Service", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


# ---------- Response models ----------

class TextBlock(BaseModel):
    text: str
    confidence: float
    bbox: List[List[float]]  # [[x1,y1],[x2,y2],[x3,y3],[x4,y4]]


class OCRResponse(BaseModel):
    blocks: List[TextBlock]


# ---------- Endpoints ----------

@app.get("/health")
def health():
    return {"status": "ok"}


@app.post("/ocr", response_model=OCRResponse)
async def run_ocr(
    file: UploadFile = File(...),
    lang: str = Query("japan", description="PaddleOCR language code, e.g. 'japan', 'en', 'ch'"),
):
    # Validate content type loosely
    if file.content_type and not file.content_type.startswith("image/"):
        raise HTTPException(status_code=415, detail="File must be an image.")

    raw = await file.read()
    if not raw:
        raise HTTPException(status_code=400, detail="Uploaded file is empty.")

    try:
        pil_image = Image.open(io.BytesIO(raw)).convert("RGB")
    except Exception as exc:
        raise HTTPException(status_code=400, detail=f"Cannot decode image: {exc}") from exc

    img_array = np.array(pil_image)

    try:
        ocr = get_ocr(lang)
        result = ocr.ocr(img_array, cls=True)
    except Exception as exc:
        logger.exception("PaddleOCR inference failed")
        raise HTTPException(status_code=500, detail=f"OCR error: {exc}") from exc

    blocks: List[TextBlock] = []

    # result is a list of pages; we always send one image so use result[0]
    page = result[0] if result else []
    if page:
        for line in page:
            # Each line: [bbox_points, (text, score)]
            bbox_points, (text, confidence) = line
            blocks.append(
                TextBlock(
                    text=text,
                    confidence=round(float(confidence), 4),
                    bbox=[[float(pt[0]), float(pt[1])] for pt in bbox_points],
                )
            )

    return OCRResponse(blocks=blocks)
