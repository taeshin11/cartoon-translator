import type { NextRequest } from "next/server";
import sharp from "sharp";

interface RerenderBlock {
  translated: string;
  bbox: number[][];
}

function escapeXml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function getCharWidthRatio(targetLang: string): number {
  if (["ja", "ko", "zh", "zh-TW"].includes(targetLang)) return 0.9;
  if (["ar", "hi", "bn", "he"].includes(targetLang)) return 0.6;
  return 0.52;
}

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

async function detectBackgroundColor(
  imageBuffer: Buffer,
  bbox: number[][]
): Promise<{ r: number; g: number; b: number }> {
  try {
    const xs = bbox.map((p) => p[0]);
    const ys = bbox.map((p) => p[1]);
    const minX = Math.min(...xs);
    const minY = Math.min(...ys);
    const bw = Math.max(...xs) - minX;
    const bh = Math.max(...ys) - minY;

    if (bw <= 0 || bh <= 0) return { r: 255, g: 255, b: 255 };

    const pad = Math.max(2, Math.min(8, Math.floor(Math.min(bw, bh) * 0.1)));
    const sampleX = Math.max(0, Math.floor(minX - pad));
    const sampleY = Math.max(0, Math.floor(minY - pad));
    const sampleW = Math.floor(bw + pad * 2);
    const sampleH = Math.floor(bh + pad * 2);

    if (sampleW <= 0 || sampleH <= 0) return { r: 255, g: 255, b: 255 };

    const { data, info } = await sharp(imageBuffer)
      .extract({ left: sampleX, top: sampleY, width: sampleW, height: sampleH })
      .resize(1, 1, { fit: "cover" })
      .raw()
      .toBuffer({ resolveWithObject: true });

    if (info.channels >= 3) return { r: data[0], g: data[1], b: data[2] };
    return { r: 255, g: 255, b: 255 };
  } catch {
    return { r: 255, g: 255, b: 255 };
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const image = formData.get("image") as File | null;
    const blocksJson = formData.get("blocks") as string;
    const targetLang = (formData.get("targetLang") as string) || "en";

    if (!image || !blocksJson) {
      return Response.json(
        { success: false, message: "Image and blocks are required" },
        { status: 400 }
      );
    }

    const blocks: RerenderBlock[] = JSON.parse(blocksJson);
    const imageBuffer = Buffer.from(await image.arrayBuffer());
    const metadata = await sharp(imageBuffer).metadata();
    const width = metadata.width || 800;
    const height = metadata.height || 600;

    const svgParts: string[] = [];
    const charWidthRatio = getCharWidthRatio(targetLang);
    const fontFamily = getFontFamily(targetLang);

    for (const block of blocks) {
      if (!block.translated || !block.bbox || block.bbox.length < 4) continue;

      const xs = block.bbox.map((p) => p[0]);
      const ys = block.bbox.map((p) => p[1]);
      const minX = Math.min(...xs);
      const minY = Math.min(...ys);
      const maxX = Math.max(...xs);
      const maxY = Math.max(...ys);
      const bw = maxX - minX;
      const bh = maxY - minY;

      if (bw <= 0 || bh <= 0) continue;

      const bgColor = await detectBackgroundColor(imageBuffer, block.bbox);
      const bgHex = `rgb(${bgColor.r},${bgColor.g},${bgColor.b})`;
      const brightness =
        bgColor.r * 0.299 + bgColor.g * 0.587 + bgColor.b * 0.114;
      const textColor = brightness > 128 ? "black" : "white";

      const padX = Math.max(2, Math.floor(bw * 0.05));
      const padY = Math.max(2, Math.floor(bh * 0.08));
      const coverX = Math.max(0, minX - padX);
      const coverY = Math.max(0, minY - padY);
      const coverW = Math.min(width - coverX, bw + padX * 2);
      const coverH = Math.min(height - coverY, bh + padY * 2);

      svgParts.push(
        `<rect x="${coverX}" y="${coverY}" width="${coverW}" height="${coverH}" fill="${bgHex}" rx="3"/>`
      );

      const innerW = bw - padX;
      const innerH = bh - padY;
      let fontSize = Math.max(
        9,
        Math.min(
          innerH * 0.65,
          innerW / Math.max(block.translated.length * charWidthRatio, 1)
        )
      );

      let lines = wrapText(block.translated, innerW, fontSize, charWidthRatio);
      const maxLines = Math.max(1, Math.floor(innerH / (fontSize * 1.25)));

      while (lines.length > maxLines && fontSize > 8) {
        fontSize -= 1;
        lines = wrapText(block.translated, innerW, fontSize, charWidthRatio);
      }

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

    if (svgParts.length === 0) {
      return Response.json({
        success: false,
        message: "No valid blocks to render",
      });
    }

    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">${svgParts.join("")}</svg>`;

    const resultBuffer = await sharp(imageBuffer)
      .composite([{ input: Buffer.from(svg), top: 0, left: 0 }])
      .png()
      .toBuffer();

    const base64 = resultBuffer.toString("base64");

    return Response.json({
      success: true,
      imageUrl: `data:image/png;base64,${base64}`,
    });
  } catch (err) {
    return Response.json(
      {
        success: false,
        message: `Re-render failed: ${err instanceof Error ? err.message : "Unknown error"}`,
      },
      { status: 500 }
    );
  }
}
