import type { NextRequest } from "next/server";
import sharp from "sharp";

const OCR_API_URL = process.env.NEXT_PUBLIC_OCR_API_URL || "";
const TRANSLATION_API_URL =
  process.env.NEXT_PUBLIC_TRANSLATION_API_URL ||
  "https://api.mymemory.translated.net/get";
const GOOGLE_SHEETS_WEBHOOK_URL =
  process.env.NEXT_PUBLIC_GOOGLE_SHEETS_WEBHOOK_URL || "";

// OCR.space free API key (free tier: 25,000 requests/month)
const OCR_SPACE_API_KEY = process.env.OCR_SPACE_API_KEY || "K85403682488957";

interface OcrBlock {
  text: string;
  confidence: number;
  bbox: number[][];
}

// ---------- OCR via PaddleOCR server (preferred) ----------
async function extractWithPaddleOCR(
  imageBuffer: Buffer,
  lang: string
): Promise<OcrBlock[]> {
  const formData = new FormData();
  formData.append("file", new Blob([new Uint8Array(imageBuffer)]), "image.png");
  formData.append("lang", lang === "auto" ? "japan" : lang);

  const response = await fetch(`${OCR_API_URL}/ocr`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) throw new Error(`PaddleOCR error: ${response.status}`);
  const data = await response.json();
  return data.blocks;
}

// ---------- OCR via OCR.space free API (fallback) ----------
async function extractWithOcrSpace(
  imageBuffer: Buffer,
  lang: string
): Promise<OcrBlock[]> {
  const langMap: Record<string, string> = {
    auto: "jpn",
    ja: "jpn",
    ko: "kor",
    zh: "chs",
    "zh-TW": "cht",
    en: "eng",
    es: "spa",
    fr: "fre",
    de: "ger",
  };

  const formData = new FormData();
  formData.append("file", new Blob([new Uint8Array(imageBuffer)], { type: "image/png" }), "image.png");
  formData.append("language", langMap[lang] || "jpn");
  formData.append("isOverlayRequired", "true");
  formData.append("OCREngine", "2"); // Engine 2 is better for Asian languages

  const response = await fetch("https://api.ocr.space/parse/image", {
    method: "POST",
    headers: { apikey: OCR_SPACE_API_KEY },
    body: formData,
  });

  if (!response.ok) throw new Error(`OCR.space error: ${response.status}`);

  const data = await response.json();

  if (!data.ParsedResults?.[0]) return [];

  const result = data.ParsedResults[0];
  const blocks: OcrBlock[] = [];

  if (result.TextOverlay?.Lines) {
    for (const line of result.TextOverlay.Lines) {
      const words = line.Words || [];
      if (words.length === 0) continue;

      // Combine words into a line with bounding box
      const lineText = line.LineText || words.map((w: { WordText: string }) => w.WordText).join(" ");
      const minX = Math.min(...words.map((w: { Left: number }) => w.Left));
      const minY = Math.min(...words.map((w: { Top: number }) => w.Top));
      const maxX = Math.max(
        ...words.map((w: { Left: number; Width: number }) => w.Left + w.Width)
      );
      const maxY = Math.max(
        ...words.map((w: { Top: number; Height: number }) => w.Top + w.Height)
      );

      blocks.push({
        text: lineText,
        confidence: 0.9,
        bbox: [
          [minX, minY],
          [maxX, minY],
          [maxX, maxY],
          [minX, maxY],
        ],
      });
    }
  } else if (result.ParsedText) {
    // Fallback: no overlay data, just return text without position
    const lines = result.ParsedText.split("\n").filter((l: string) => l.trim());
    for (const line of lines) {
      blocks.push({
        text: line.trim(),
        confidence: 0.8,
        bbox: [],
      });
    }
  }

  return blocks;
}

// ---------- Extract text (try PaddleOCR first, fallback to OCR.space) ----------
async function extractText(
  imageBuffer: Buffer,
  lang: string
): Promise<OcrBlock[]> {
  if (OCR_API_URL) {
    try {
      return await extractWithPaddleOCR(imageBuffer, lang);
    } catch (err) {
      console.warn("PaddleOCR failed, falling back to OCR.space:", err);
    }
  }
  return await extractWithOcrSpace(imageBuffer, lang);
}

// ---------- Translation ----------
async function translateText(
  text: string,
  sourceLang: string,
  targetLang: string
): Promise<string> {
  const langMap: Record<string, string> = {
    auto: "autodetect",
    ja: "ja",
    ko: "ko",
    zh: "zh-CN",
    "zh-TW": "zh-TW",
    en: "en",
    es: "es",
    fr: "fr",
    de: "de",
  };

  const src = langMap[sourceLang] || sourceLang;
  const tgt = langMap[targetLang] || targetLang;
  const url = `${TRANSLATION_API_URL}?q=${encodeURIComponent(text)}&langpair=${src}|${tgt}`;

  try {
    const response = await fetch(url);
    if (!response.ok) return text;
    const data = await response.json();
    return data?.responseData?.translatedText || text;
  } catch {
    return text;
  }
}

// ---------- Image Reconstruction ----------
async function reconstructImage(
  imageBuffer: Buffer,
  blocks: OcrBlock[],
  translations: string[]
): Promise<Buffer> {
  const metadata = await sharp(imageBuffer).metadata();
  const width = metadata.width || 800;
  const height = metadata.height || 600;

  const svgParts: string[] = [];

  for (let i = 0; i < blocks.length; i++) {
    const block = blocks[i];
    const translation = translations[i];
    if (!translation || !block.bbox || block.bbox.length < 4) continue;

    const xs = block.bbox.map((p) => p[0]);
    const ys = block.bbox.map((p) => p[1]);
    const minX = Math.min(...xs);
    const minY = Math.min(...ys);
    const maxX = Math.max(...xs);
    const maxY = Math.max(...ys);
    const bw = maxX - minX;
    const bh = maxY - minY;

    if (bw <= 0 || bh <= 0) continue;

    // White rectangle to cover original text
    svgParts.push(
      `<rect x="${minX}" y="${minY}" width="${bw}" height="${bh}" fill="white" rx="2"/>`
    );

    // Calculate font size to fit
    const fontSize = Math.max(
      10,
      Math.min(bh * 0.7, bw / Math.max(translation.length * 0.55, 1))
    );

    svgParts.push(
      `<text x="${minX + bw / 2}" y="${minY + bh / 2}" ` +
        `font-family="Arial, sans-serif" font-size="${fontSize}" ` +
        `fill="black" text-anchor="middle" dominant-baseline="central" ` +
        `font-weight="bold">${escapeXml(translation)}</text>`
    );
  }

  if (svgParts.length === 0) return imageBuffer;

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">${svgParts.join(
    ""
  )}</svg>`;

  return await sharp(imageBuffer)
    .composite([{ input: Buffer.from(svg), top: 0, left: 0 }])
    .png()
    .toBuffer();
}

function escapeXml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

// ---------- Google Sheets logging ----------
async function logToGoogleSheets(data: Record<string, unknown>) {
  if (!GOOGLE_SHEETS_WEBHOOK_URL) return;
  try {
    await fetch(GOOGLE_SHEETS_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  } catch {
    // Silent fail
  }
}

// ---------- POST handler ----------
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const image = formData.get("image") as File | null;
    const sourceLang = (formData.get("sourceLang") as string) || "auto";
    const targetLang = (formData.get("targetLang") as string) || "en";

    if (!image) {
      return Response.json(
        { success: false, message: "No image provided" },
        { status: 400 }
      );
    }

    const imageBuffer = Buffer.from(await image.arrayBuffer());

    // Step 1: OCR
    const blocks = await extractText(imageBuffer, sourceLang);

    if (blocks.length === 0) {
      return Response.json({
        success: false,
        message:
          "No text detected in the image. Try a clearer image with visible text.",
      });
    }

    // Step 2: Translate
    const translations = await Promise.all(
      blocks.map((block) => translateText(block.text, sourceLang, targetLang))
    );

    // Step 3: Reconstruct image
    const hasPositionData = blocks.some((b) => b.bbox && b.bbox.length >= 4);
    let resultBuffer: Buffer | null = null;
    let resultUrl: string | undefined;

    if (hasPositionData) {
      resultBuffer = await reconstructImage(imageBuffer, blocks, translations);
      const base64 = resultBuffer.toString("base64");
      resultUrl = `data:image/png;base64,${base64}`;
    }

    // Step 4: Log to Google Sheets (non-blocking)
    logToGoogleSheets({
      timestamp: new Date().toISOString(),
      source_lang: sourceLang,
      target_lang: targetLang,
      page_count: 1,
      text_count: blocks.length,
      user_agent: request.headers.get("user-agent") || "unknown",
      referrer: request.headers.get("referer") || "direct",
    });

    return Response.json({
      success: true,
      message: `Translated ${blocks.length} text block(s) successfully.`,
      imageUrl: resultUrl,
      blocks: blocks.map((b, i) => ({
        original: b.text,
        translated: translations[i],
        confidence: b.confidence,
      })),
    });
  } catch (err) {
    return Response.json(
      {
        success: false,
        message: `Translation failed: ${err instanceof Error ? err.message : "Unknown error"}`,
      },
      { status: 500 }
    );
  }
}
