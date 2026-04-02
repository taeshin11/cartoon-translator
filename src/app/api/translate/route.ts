import type { NextRequest } from "next/server";
import sharp from "sharp";

const OCR_API_URL = process.env.NEXT_PUBLIC_OCR_API_URL || "";
const TRANSLATION_API_URL =
  process.env.NEXT_PUBLIC_TRANSLATION_API_URL ||
  "https://api.mymemory.translated.net/get";
const GOOGLE_SHEETS_WEBHOOK_URL =
  process.env.NEXT_PUBLIC_GOOGLE_SHEETS_WEBHOOK_URL || "";

const OCR_SPACE_API_KEY = process.env.OCR_SPACE_API_KEY || "K85403682488957";

// Daily free limit
const FREE_DAILY_LIMIT = 5;

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
    pt: "por",
    it: "ita",
    ru: "rus",
    ar: "ara",
    th: "tai",
    vi: "vie",
    id: "ind",
    ms: "msa",
    tr: "tur",
    pl: "pol",
    nl: "dut",
    sv: "swe",
    da: "dan",
    no: "nor",
    fi: "fin",
    hu: "hun",
    cs: "cze",
    ro: "rum",
    bg: "bul",
    hr: "hrv",
    uk: "ukr",
    hi: "hin",
  };

  const formData = new FormData();
  formData.append(
    "file",
    new Blob([new Uint8Array(imageBuffer)], { type: "image/png" }),
    "image.png"
  );
  formData.append("language", langMap[lang] || "jpn");
  formData.append("isOverlayRequired", "true");
  formData.append("OCREngine", "2");

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

      const lineText =
        line.LineText ||
        words.map((w: { WordText: string }) => w.WordText).join(" ");
      const minX = Math.min(
        ...words.map((w: { Left: number }) => w.Left)
      );
      const minY = Math.min(
        ...words.map((w: { Top: number }) => w.Top)
      );
      const maxX = Math.max(
        ...words.map(
          (w: { Left: number; Width: number }) => w.Left + w.Width
        )
      );
      const maxY = Math.max(
        ...words.map(
          (w: { Top: number; Height: number }) => w.Top + w.Height
        )
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
    const lines = result.ParsedText.split("\n").filter(
      (l: string) => l.trim()
    );
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
const LANG_MAP: Record<string, string> = {
  auto: "autodetect",
  ja: "ja",
  ko: "ko",
  zh: "zh-CN",
  "zh-TW": "zh-TW",
  en: "en",
  es: "es",
  fr: "fr",
  de: "de",
  pt: "pt",
  "pt-BR": "pt-BR",
  it: "it",
  ru: "ru",
  ar: "ar",
  th: "th",
  vi: "vi",
  id: "id",
  ms: "ms",
  tr: "tr",
  pl: "pl",
  nl: "nl",
  sv: "sv",
  da: "da",
  no: "no",
  fi: "fi",
  hu: "hu",
  cs: "cs",
  ro: "ro",
  bg: "bg",
  hr: "hr",
  uk: "uk",
  hi: "hi",
  bn: "bn",
  tl: "tl",
  he: "he",
  el: "el",
};

async function translateText(
  text: string,
  sourceLang: string,
  targetLang: string
): Promise<string> {
  const src = LANG_MAP[sourceLang] || sourceLang;
  const tgt = LANG_MAP[targetLang] || targetLang;
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

// ---------- Smart Background Color Detection ----------
async function detectBackgroundColor(
  imageBuffer: Buffer,
  bbox: number[][]
): Promise<{ r: number; g: number; b: number }> {
  try {
    const xs = bbox.map((p) => p[0]);
    const ys = bbox.map((p) => p[1]);
    const minX = Math.min(...xs);
    const minY = Math.min(...ys);
    const maxX = Math.max(...xs);
    const maxY = Math.max(...ys);
    const bw = maxX - minX;
    const bh = maxY - minY;

    if (bw <= 0 || bh <= 0) return { r: 255, g: 255, b: 255 };

    // Sample a thin border around the text region to detect bubble background
    const pad = Math.max(2, Math.min(8, Math.floor(Math.min(bw, bh) * 0.1)));
    const sampleX = Math.max(0, Math.floor(minX - pad));
    const sampleY = Math.max(0, Math.floor(minY - pad));
    const sampleW = Math.floor(bw + pad * 2);
    const sampleH = Math.floor(bh + pad * 2);

    if (sampleW <= 0 || sampleH <= 0) return { r: 255, g: 255, b: 255 };

    // Extract the region and get dominant color via resize to 1x1
    const { data, info } = await sharp(imageBuffer)
      .extract({
        left: sampleX,
        top: sampleY,
        width: sampleW,
        height: sampleH,
      })
      .resize(1, 1, { fit: "cover" })
      .raw()
      .toBuffer({ resolveWithObject: true });

    if (info.channels >= 3) {
      return { r: data[0], g: data[1], b: data[2] };
    }
    return { r: 255, g: 255, b: 255 };
  } catch {
    return { r: 255, g: 255, b: 255 };
  }
}

// ---------- Smart Text Wrapping ----------
function wrapText(
  text: string,
  maxWidth: number,
  fontSize: number,
  charWidthRatio: number
): string[] {
  const charWidth = fontSize * charWidthRatio;
  const maxChars = Math.max(1, Math.floor(maxWidth / charWidth));

  if (text.length <= maxChars) return [text];

  const words = text.split(/\s+/);
  const lines: string[] = [];
  let currentLine = "";

  for (const word of words) {
    if (currentLine.length === 0) {
      currentLine = word;
    } else if (currentLine.length + 1 + word.length <= maxChars) {
      currentLine += " " + word;
    } else {
      lines.push(currentLine);
      currentLine = word;
    }
  }
  if (currentLine) lines.push(currentLine);

  // If still too long (e.g., CJK without spaces), force-break
  const result: string[] = [];
  for (const line of lines) {
    if (line.length > maxChars) {
      for (let i = 0; i < line.length; i += maxChars) {
        result.push(line.slice(i, i + maxChars));
      }
    } else {
      result.push(line);
    }
  }
  return result;
}

// ---------- Determine character width ratio based on target language ----------
function getCharWidthRatio(targetLang: string): number {
  // CJK characters are roughly full-width
  if (["ja", "ko", "zh", "zh-TW"].includes(targetLang)) return 0.9;
  // Arabic, Hindi, Bengali — slightly wider than Latin
  if (["ar", "hi", "bn", "he"].includes(targetLang)) return 0.6;
  // Latin-based languages
  return 0.52;
}

// ---------- Get font family for target language ----------
function getFontFamily(targetLang: string): string {
  if (["ja"].includes(targetLang))
    return "'Noto Sans JP', 'Hiragino Sans', 'MS Gothic', sans-serif";
  if (["ko"].includes(targetLang))
    return "'Noto Sans KR', 'Malgun Gothic', sans-serif";
  if (["zh", "zh-TW"].includes(targetLang))
    return "'Noto Sans SC', 'Microsoft YaHei', sans-serif";
  if (["ar", "he"].includes(targetLang))
    return "'Noto Sans Arabic', 'Segoe UI', sans-serif";
  if (["hi", "bn"].includes(targetLang))
    return "'Noto Sans Devanagari', 'Segoe UI', sans-serif";
  if (["th"].includes(targetLang))
    return "'Noto Sans Thai', 'Tahoma', sans-serif";
  return "Arial, 'Noto Sans', sans-serif";
}

// ---------- Image Reconstruction (Smart Inpainting) ----------
async function reconstructImage(
  imageBuffer: Buffer,
  blocks: OcrBlock[],
  translations: string[],
  targetLang: string
): Promise<Buffer> {
  const metadata = await sharp(imageBuffer).metadata();
  const width = metadata.width || 800;
  const height = metadata.height || 600;

  const svgParts: string[] = [];
  const charWidthRatio = getCharWidthRatio(targetLang);
  const fontFamily = getFontFamily(targetLang);

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

    // Detect background color of the speech bubble
    const bgColor = await detectBackgroundColor(imageBuffer, block.bbox);
    const bgHex = `rgb(${bgColor.r},${bgColor.g},${bgColor.b})`;

    // Choose text color based on background brightness
    const brightness =
      bgColor.r * 0.299 + bgColor.g * 0.587 + bgColor.b * 0.114;
    const textColor = brightness > 128 ? "black" : "white";

    // Add padding (extend coverage slightly beyond bbox)
    const padX = Math.max(2, Math.floor(bw * 0.05));
    const padY = Math.max(2, Math.floor(bh * 0.08));
    const coverX = Math.max(0, minX - padX);
    const coverY = Math.max(0, minY - padY);
    const coverW = Math.min(width - coverX, bw + padX * 2);
    const coverH = Math.min(height - coverY, bh + padY * 2);

    // Background fill to cover original text
    svgParts.push(
      `<rect x="${coverX}" y="${coverY}" width="${coverW}" height="${coverH}" fill="${bgHex}" rx="3"/>`
    );

    // Calculate font size — try to fit multi-line
    const innerW = bw - padX;
    const innerH = bh - padY;

    // Start with height-based estimate, then refine
    let fontSize = Math.max(
      9,
      Math.min(innerH * 0.65, innerW / Math.max(translation.length * charWidthRatio, 1))
    );

    // Wrap text and adjust font size to fit vertically
    let lines = wrapText(translation, innerW, fontSize, charWidthRatio);
    const maxLines = Math.max(1, Math.floor(innerH / (fontSize * 1.25)));

    // If too many lines, reduce font size
    while (lines.length > maxLines && fontSize > 8) {
      fontSize -= 1;
      lines = wrapText(translation, innerW, fontSize, charWidthRatio);
    }

    // Cap at reasonable limits
    fontSize = Math.min(fontSize, 48);
    const lineHeight = fontSize * 1.25;
    const totalTextHeight = lines.length * lineHeight;
    const startY = minY + (bh - totalTextHeight) / 2 + fontSize * 0.85;

    for (let li = 0; li < lines.length; li++) {
      svgParts.push(
        `<text x="${minX + bw / 2}" y="${startY + li * lineHeight}" ` +
          `font-family="${fontFamily}" font-size="${fontSize}" ` +
          `fill="${textColor}" text-anchor="middle" ` +
          `font-weight="bold">${escapeXml(lines[li])}</text>`
      );
    }
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

// ---------- Usage tracking ----------
function getUsageKey(): string {
  const today = new Date().toISOString().slice(0, 10);
  return `usage_${today}`;
}

// In-memory usage store (resets on cold start, per-IP daily tracking)
const usageStore = new Map<string, number>();

function checkAndIncrementUsage(
  ip: string,
  pageCount: number,
  isPro: boolean
): { allowed: boolean; remaining: number; limit: number } {
  if (isPro) return { allowed: true, remaining: 999, limit: 999 };

  const key = `${getUsageKey()}_${ip}`;
  const current = usageStore.get(key) || 0;

  if (current + pageCount > FREE_DAILY_LIMIT) {
    return {
      allowed: false,
      remaining: Math.max(0, FREE_DAILY_LIMIT - current),
      limit: FREE_DAILY_LIMIT,
    };
  }

  usageStore.set(key, current + pageCount);
  return {
    allowed: true,
    remaining: Math.max(0, FREE_DAILY_LIMIT - current - pageCount),
    limit: FREE_DAILY_LIMIT,
  };
}

// Clean up old usage entries periodically
setInterval(() => {
  const todayKey = getUsageKey();
  for (const key of usageStore.keys()) {
    if (!key.startsWith(todayKey)) {
      usageStore.delete(key);
    }
  }
}, 60 * 60 * 1000); // Every hour

// ---------- POST handler ----------
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const image = formData.get("image") as File | null;
    const sourceLang = (formData.get("sourceLang") as string) || "auto";
    const targetLang = (formData.get("targetLang") as string) || "en";
    const proKey = (formData.get("proKey") as string) || "";

    // Check pro status (simple key validation for now)
    const isPro =
      !!proKey &&
      !!process.env.STRIPE_SECRET_KEY &&
      proKey.startsWith("ct_pro_");

    // Get client IP for rate limiting
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "unknown";

    // Usage tracking (limits disabled — Pro launch pending)
    const usage = checkAndIncrementUsage(ip, 1, true);

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

    // Step 3: Reconstruct image with smart inpainting
    const hasPositionData = blocks.some((b) => b.bbox && b.bbox.length >= 4);
    let resultBuffer: Buffer | null = null;
    let resultUrl: string | undefined;

    if (hasPositionData) {
      resultBuffer = await reconstructImage(
        imageBuffer,
        blocks,
        translations,
        targetLang
      );
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
      is_pro: isPro,
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
        bbox: b.bbox,
      })),
      usage: {
        remaining: usage.remaining,
        limit: usage.limit,
        isPro,
      },
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
