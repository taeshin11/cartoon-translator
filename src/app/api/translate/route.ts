import type { NextRequest } from "next/server"

export async function POST(request: NextRequest) {
  const formData = await request.formData()

  // Extract fields — these will be used when real OCR integration is added
  const image = formData.get("image") as File | null
  const sourceLang = formData.get("sourceLang") as string | null
  const targetLang = formData.get("targetLang") as string | null

  // Validate that the required fields are present
  if (!image || !sourceLang || !targetLang) {
    return Response.json(
      { success: false, message: "Missing required fields: image, sourceLang, targetLang" },
      { status: 400 }
    )
  }

  // Placeholder response — PaddleOCR integration coming in Milestone 2
  return Response.json({
    success: true,
    message: "Translation API coming in Milestone 2",
  })
}
