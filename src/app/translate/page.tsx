"use client"

import React, { useState, useRef, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { UploadCloud, Download, RotateCcw, Loader2, ImageIcon } from "lucide-react"

const SOURCE_LANGUAGES = [
  { value: "auto", label: "Auto-detect" },
  { value: "ja", label: "Japanese" },
  { value: "ko", label: "Korean" },
  { value: "zh", label: "Chinese (Simplified)" },
  { value: "zh-TW", label: "Chinese (Traditional)" },
  { value: "en", label: "English" },
]

const TARGET_LANGUAGES = [
  { value: "en", label: "English" },
  { value: "ko", label: "Korean" },
  { value: "ja", label: "Japanese" },
  { value: "zh", label: "Chinese (Simplified)" },
  { value: "zh-TW", label: "Chinese (Traditional)" },
  { value: "es", label: "Spanish" },
  { value: "fr", label: "French" },
  { value: "de", label: "German" },
]

const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10 MB
const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp"]

interface TranslationResult {
  success: boolean
  message: string
  imageUrl?: string
}

export default function TranslatePage() {
  const [file, setFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [sourceLanguage, setSourceLanguage] = useState("auto")
  const [targetLanguage, setTargetLanguage] = useState("en")
  const [isProcessing, setIsProcessing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [result, setResult] = useState<TranslationResult | null>(null)
  const [isDragOver, setIsDragOver] = useState(false)
  const [fileError, setFileError] = useState<string | null>(null)

  const fileInputRef = useRef<HTMLInputElement>(null)

  const validateAndSetFile = useCallback((selected: File) => {
    setFileError(null)

    if (!ACCEPTED_TYPES.includes(selected.type)) {
      setFileError("Only JPG, PNG, and WEBP files are accepted.")
      return
    }

    if (selected.size > MAX_FILE_SIZE) {
      setFileError("File size must be 10 MB or less.")
      return
    }

    const objectUrl = URL.createObjectURL(selected)
    setFile(selected)
    setPreviewUrl(objectUrl)
    setResult(null)
  }, [])

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const selected = e.target.files?.[0]
      if (selected) validateAndSetFile(selected)
    },
    [validateAndSetFile]
  )

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragOver(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragOver(false)
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault()
      e.stopPropagation()
      setIsDragOver(false)

      const dropped = e.dataTransfer.files?.[0]
      if (dropped) validateAndSetFile(dropped)
    },
    [validateAndSetFile]
  )

  const handleTranslate = useCallback(async () => {
    if (!file) return

    setIsProcessing(true)
    setProgress(10)
    setResult(null)

    try {
      const formData = new FormData()
      formData.append("image", file)
      formData.append("sourceLang", sourceLanguage)
      formData.append("targetLang", targetLanguage)

      // Simulate progress increments while the request is in-flight
      const progressTimer = setInterval(() => {
        setProgress((prev) => (prev < 85 ? prev + 15 : prev))
      }, 400)

      const response = await fetch("/api/translate", {
        method: "POST",
        body: formData,
      })

      clearInterval(progressTimer)
      setProgress(100)

      const data: TranslationResult = await response.json()
      setResult(data)
    } catch {
      setResult({ success: false, message: "An unexpected error occurred. Please try again." })
    } finally {
      setIsProcessing(false)
    }
  }, [file, sourceLanguage, targetLanguage])

  const handleReset = useCallback(() => {
    if (previewUrl) URL.revokeObjectURL(previewUrl)
    setFile(null)
    setPreviewUrl(null)
    setResult(null)
    setProgress(0)
    setFileError(null)
    if (fileInputRef.current) fileInputRef.current.value = ""
  }, [previewUrl])

  const handleDownload = useCallback(() => {
    if (!result?.imageUrl) return
    const link = document.createElement("a")
    link.href = result.imageUrl
    link.download = "translated.png"
    link.click()
  }, [result])

  return (
    <div className="min-h-screen bg-background flex flex-col items-center px-4 py-12">
      <div className="w-full max-w-2xl space-y-6">
        {/* Page heading */}
        <div className="text-center space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">
            Manga &amp; Comic Translator
          </h1>
          <p className="text-sm text-muted-foreground">
            Upload an image, choose your languages, and get a translated result in seconds.
          </p>
        </div>

        {/* Upload card */}
        <Card>
          <CardHeader>
            <CardTitle>Upload Image</CardTitle>
            <CardDescription>JPG, PNG, or WEBP &mdash; max 10 MB</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Drop zone */}
            <div
              role="button"
              tabIndex={0}
              aria-label="Upload image drop zone"
              onClick={() => fileInputRef.current?.click()}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") fileInputRef.current?.click()
              }}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={[
                "relative flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed px-6 py-10 text-center cursor-pointer transition-colors outline-none",
                isDragOver
                  ? "border-primary bg-primary/5"
                  : "border-border bg-muted/30 hover:border-primary/60 hover:bg-muted/50",
                "focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50",
              ].join(" ")}
            >
              {previewUrl ? (
                /* Image preview */
                <div className="relative w-full" onClick={(e) => e.stopPropagation()}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={previewUrl}
                    alt="Uploaded preview"
                    className="mx-auto max-h-72 w-auto rounded-lg object-contain shadow-sm"
                  />
                  <p className="mt-3 text-xs text-muted-foreground">
                    {file?.name} &mdash; {((file?.size ?? 0) / 1024 / 1024).toFixed(2)} MB
                  </p>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      fileInputRef.current?.click()
                    }}
                    className="mt-2 text-xs text-primary underline-offset-4 hover:underline"
                  >
                    Change image
                  </button>
                </div>
              ) : (
                /* Empty state */
                <>
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                    <UploadCloud className="size-6 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      Drag &amp; drop your image here
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">or click to browse files</p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      fileInputRef.current?.click()
                    }}
                  >
                    <ImageIcon />
                    Choose file
                  </Button>
                </>
              )}
            </div>

            {fileError && (
              <p role="alert" className="text-sm text-destructive">
                {fileError}
              </p>
            )}

            {/* Hidden file input */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              className="hidden"
              onChange={handleFileChange}
              aria-hidden="true"
            />
          </CardContent>
        </Card>

        {/* Language selection card */}
        <Card>
          <CardHeader>
            <CardTitle>Languages</CardTitle>
            <CardDescription>Select the source and target languages for translation.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="source-language">Source language</Label>
                <Select
                  value={sourceLanguage}
                  onValueChange={(val) => val && setSourceLanguage(val)}
                >
                  <SelectTrigger id="source-language" className="w-full">
                    <SelectValue placeholder="Select source language" />
                  </SelectTrigger>
                  <SelectContent align="start">
                    {SOURCE_LANGUAGES.map((lang) => (
                      <SelectItem key={lang.value} value={lang.value}>
                        {lang.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="target-language">Target language</Label>
                <Select
                  value={targetLanguage}
                  onValueChange={(val) => val && setTargetLanguage(val)}
                >
                  <SelectTrigger id="target-language" className="w-full">
                    <SelectValue placeholder="Select target language" />
                  </SelectTrigger>
                  <SelectContent align="start">
                    {TARGET_LANGUAGES.map((lang) => (
                      <SelectItem key={lang.value} value={lang.value}>
                        {lang.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Translate button + progress */}
        <div className="space-y-3">
          <Button
            onClick={handleTranslate}
            disabled={!file || isProcessing}
            className="w-full h-11 text-base font-semibold bg-indigo-600 hover:bg-indigo-700 text-white disabled:opacity-50"
          >
            {isProcessing ? (
              <>
                <Loader2 className="animate-spin" />
                Translating&hellip;
              </>
            ) : (
              "Translate Now"
            )}
          </Button>

          {isProcessing && (
            <Progress value={progress} aria-label="Translation progress" />
          )}
        </div>

        {/* Result card */}
        {result && (
          <Card>
            <CardHeader>
              <CardTitle>
                {result.success ? "Translation Complete" : "Translation Failed"}
              </CardTitle>
              <CardDescription>{result.message}</CardDescription>
            </CardHeader>

            {result.imageUrl && (
              <CardContent>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={result.imageUrl}
                  alt="Translated result"
                  className="mx-auto max-h-96 w-auto rounded-lg object-contain shadow-sm"
                />
              </CardContent>
            )}

            <CardContent className="flex flex-col gap-2 sm:flex-row">
              {result.imageUrl && (
                <Button onClick={handleDownload} variant="outline" className="flex-1">
                  <Download />
                  Download
                </Button>
              )}
              <Button onClick={handleReset} variant="outline" className="flex-1">
                <RotateCcw />
                Translate Another
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
