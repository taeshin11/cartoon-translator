"use client"

import React, { useState, useRef, useCallback, useEffect } from "react"
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  UploadCloud,
  Download,
  RotateCcw,
  Loader2,
  ImageIcon,
  X,
  Clock,
  Trash2,
  Columns2,
} from "lucide-react"

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

const MAX_FILE_SIZE = 10 * 1024 * 1024
const MAX_FILES = 20
const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp"]

interface TranslationBlock {
  original: string
  translated: string
  confidence: number
}

interface TranslationResult {
  success: boolean
  message: string
  imageUrl?: string
  blocks?: TranslationBlock[]
}

interface PageResult {
  file: File
  previewUrl: string
  result: TranslationResult | null
  isProcessing: boolean
}

interface HistoryItem {
  id: string
  date: string
  sourceLang: string
  targetLang: string
  pageCount: number
  thumbnail?: string
}

function loadHistory(): HistoryItem[] {
  if (typeof window === "undefined") return []
  try {
    return JSON.parse(localStorage.getItem("ct_history") || "[]")
  } catch {
    return []
  }
}

function saveHistory(items: HistoryItem[]) {
  try {
    localStorage.setItem("ct_history", JSON.stringify(items.slice(0, 50)))
  } catch {
    // localStorage full
  }
}

export default function TranslatePage() {
  const [pages, setPages] = useState<PageResult[]>([])
  const [sourceLanguage, setSourceLanguage] = useState("auto")
  const [targetLanguage, setTargetLanguage] = useState("en")
  const [isProcessing, setIsProcessing] = useState(false)
  const [overallProgress, setOverallProgress] = useState(0)
  const [isDragOver, setIsDragOver] = useState(false)
  const [fileError, setFileError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("upload")
  const [viewMode, setViewMode] = useState<"single" | "sideBySide">("single")
  const [activePageIndex, setActivePageIndex] = useState(0)
  const [editedBlocks, setEditedBlocks] = useState<Record<number, TranslationBlock[]>>({})
  const [history, setHistory] = useState<HistoryItem[]>([])

  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setHistory(loadHistory())
  }, [])

  const validateFiles = useCallback(
    (files: FileList | File[]): File[] => {
      setFileError(null)
      const valid: File[] = []
      const fileArray = Array.from(files)

      if (pages.length + fileArray.length > MAX_FILES) {
        setFileError(`Maximum ${MAX_FILES} pages allowed. You have ${pages.length} already.`)
        return []
      }

      for (const f of fileArray) {
        if (!ACCEPTED_TYPES.includes(f.type)) {
          setFileError(`"${f.name}" is not a supported format. Use JPG, PNG, or WEBP.`)
          continue
        }
        if (f.size > MAX_FILE_SIZE) {
          setFileError(`"${f.name}" exceeds 10 MB limit.`)
          continue
        }
        valid.push(f)
      }
      return valid
    },
    [pages.length]
  )

  const addFiles = useCallback(
    (files: File[]) => {
      const newPages: PageResult[] = files.map((f) => ({
        file: f,
        previewUrl: URL.createObjectURL(f),
        result: null,
        isProcessing: false,
      }))
      setPages((prev) => [...prev, ...newPages])
    },
    []
  )

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files
      if (!files) return
      const valid = validateFiles(files)
      if (valid.length > 0) addFiles(valid)
      if (fileInputRef.current) fileInputRef.current.value = ""
    },
    [validateFiles, addFiles]
  )

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragOver(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragOver(false)
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      e.stopPropagation()
      setIsDragOver(false)
      const files = e.dataTransfer.files
      if (files) {
        const valid = validateFiles(files)
        if (valid.length > 0) addFiles(valid)
      }
    },
    [validateFiles, addFiles]
  )

  const removePage = useCallback(
    (index: number) => {
      setPages((prev) => {
        const next = [...prev]
        URL.revokeObjectURL(next[index].previewUrl)
        next.splice(index, 1)
        return next
      })
      if (activePageIndex >= pages.length - 1 && activePageIndex > 0) {
        setActivePageIndex(activePageIndex - 1)
      }
    },
    [activePageIndex, pages.length]
  )

  const translateSinglePage = async (
    page: PageResult,
    index: number
  ): Promise<TranslationResult> => {
    const formData = new FormData()
    formData.append("image", page.file)
    formData.append("sourceLang", sourceLanguage)
    formData.append("targetLang", targetLanguage)

    const response = await fetch("/api/translate", {
      method: "POST",
      body: formData,
    })

    return await response.json()
  }

  const handleTranslate = useCallback(async () => {
    if (pages.length === 0) return

    setIsProcessing(true)
    setOverallProgress(0)
    setActiveTab("result")

    const total = pages.length
    let completed = 0

    const updatedPages = [...pages]

    for (let i = 0; i < total; i++) {
      updatedPages[i] = { ...updatedPages[i], isProcessing: true }
      setPages([...updatedPages])

      try {
        const result = await translateSinglePage(updatedPages[i], i)
        updatedPages[i] = { ...updatedPages[i], result, isProcessing: false }

        // Initialize editable blocks
        if (result.blocks) {
          setEditedBlocks((prev) => ({ ...prev, [i]: [...result.blocks!] }))
        }
      } catch {
        updatedPages[i] = {
          ...updatedPages[i],
          result: { success: false, message: "Translation failed" },
          isProcessing: false,
        }
      }

      completed++
      setOverallProgress(Math.round((completed / total) * 100))
      setPages([...updatedPages])
    }

    // Save to history
    const historyItem: HistoryItem = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      sourceLang: sourceLanguage,
      targetLang: targetLanguage,
      pageCount: total,
    }
    const newHistory = [historyItem, ...loadHistory()]
    saveHistory(newHistory)
    setHistory(newHistory)

    setIsProcessing(false)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pages, sourceLanguage, targetLanguage])

  const handleEditBlock = useCallback(
    (pageIndex: number, blockIndex: number, newText: string) => {
      setEditedBlocks((prev) => {
        const blocks = [...(prev[pageIndex] || [])]
        blocks[blockIndex] = { ...blocks[blockIndex], translated: newText }
        return { ...prev, [pageIndex]: blocks }
      })
    },
    []
  )

  const handleReset = useCallback(() => {
    pages.forEach((p) => URL.revokeObjectURL(p.previewUrl))
    setPages([])
    setEditedBlocks({})
    setOverallProgress(0)
    setFileError(null)
    setActiveTab("upload")
    setActivePageIndex(0)
    if (fileInputRef.current) fileInputRef.current.value = ""
  }, [pages])

  const handleDownload = useCallback(
    (index: number) => {
      const page = pages[index]
      if (!page?.result?.imageUrl) return
      const link = document.createElement("a")
      link.href = page.result.imageUrl
      link.download = `translated_${index + 1}.png`
      link.click()
    },
    [pages]
  )

  const handleDownloadAll = useCallback(() => {
    pages.forEach((page, i) => {
      if (page.result?.imageUrl) {
        setTimeout(() => {
          const link = document.createElement("a")
          link.href = page.result!.imageUrl!
          link.download = `translated_${i + 1}.png`
          link.click()
        }, i * 300)
      }
    })
  }, [pages])

  const clearHistory = useCallback(() => {
    localStorage.removeItem("ct_history")
    setHistory([])
  }, [])

  const hasResults = pages.some((p) => p.result)
  const currentPage = pages[activePageIndex]
  const currentBlocks = editedBlocks[activePageIndex] || currentPage?.result?.blocks || []

  return (
    <div className="min-h-screen bg-background flex flex-col items-center px-4 py-8 sm:py-12">
      <div className="w-full max-w-4xl space-y-6">
        <div className="text-center space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">
            Manga &amp; Comic Translator
          </h1>
          <p className="text-sm text-muted-foreground">
            Upload up to {MAX_FILES} pages, choose languages, and get translated results.
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="upload">Upload</TabsTrigger>
            <TabsTrigger value="result" disabled={!hasResults && !isProcessing}>
              Results
            </TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>

          {/* ===== UPLOAD TAB ===== */}
          <TabsContent value="upload" className="space-y-6 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Upload Images</CardTitle>
                <CardDescription>
                  JPG, PNG, or WEBP &mdash; max 10 MB each &mdash; up to {MAX_FILES} pages
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
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
                    "flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed px-6 py-10 text-center cursor-pointer transition-colors outline-none",
                    isDragOver
                      ? "border-primary bg-primary/5"
                      : "border-border bg-muted/30 hover:border-primary/60 hover:bg-muted/50",
                    "focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50",
                  ].join(" ")}
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                    <UploadCloud className="size-6 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      Drag &amp; drop your images here
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      or click to browse &mdash; select multiple files at once
                    </p>
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
                    <ImageIcon className="size-4" />
                    Choose files
                  </Button>
                </div>

                {fileError && (
                  <p role="alert" className="text-sm text-destructive">
                    {fileError}
                  </p>
                )}

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  multiple
                  className="hidden"
                  onChange={handleFileChange}
                  aria-hidden="true"
                />

                {/* Thumbnails of uploaded pages */}
                {pages.length > 0 && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-foreground">
                        {pages.length} page{pages.length !== 1 ? "s" : ""} uploaded
                      </p>
                      <Button variant="ghost" size="sm" onClick={handleReset}>
                        <Trash2 className="size-4" />
                        Clear all
                      </Button>
                    </div>
                    <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
                      {pages.map((page, i) => (
                        <div key={i} className="relative group">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={page.previewUrl}
                            alt={`Page ${i + 1}`}
                            className="w-full aspect-[3/4] object-cover rounded-lg border"
                          />
                          <button
                            type="button"
                            onClick={() => removePage(i)}
                            className="absolute -top-1.5 -right-1.5 bg-destructive text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X className="size-3" />
                          </button>
                          <span className="absolute bottom-0.5 left-0.5 text-[10px] bg-black/60 text-white px-1 rounded">
                            {i + 1}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Language selection */}
            <Card>
              <CardHeader>
                <CardTitle>Languages</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="source-language">Source language</Label>
                    <Select value={sourceLanguage} onValueChange={(val) => val && setSourceLanguage(val)}>
                      <SelectTrigger id="source-language" className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
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
                    <Select value={targetLanguage} onValueChange={(val) => val && setTargetLanguage(val)}>
                      <SelectTrigger id="target-language" className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
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

            {/* Translate button */}
            <Button
              onClick={handleTranslate}
              disabled={pages.length === 0 || isProcessing}
              className="w-full h-12 text-base font-semibold bg-indigo-600 hover:bg-indigo-700 text-white disabled:opacity-50"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="animate-spin" />
                  Translating {pages.length} page{pages.length !== 1 ? "s" : ""}&hellip;
                </>
              ) : (
                `Translate ${pages.length > 0 ? pages.length : ""} Page${pages.length !== 1 ? "s" : ""}`
              )}
            </Button>

            {isProcessing && (
              <div className="space-y-1">
                <Progress value={overallProgress} />
                <p className="text-xs text-muted-foreground text-center">
                  {overallProgress}% complete
                </p>
              </div>
            )}
          </TabsContent>

          {/* ===== RESULTS TAB ===== */}
          <TabsContent value="result" className="space-y-4 mt-4">
            {pages.length > 0 && (
              <>
                {/* Page selector + controls */}
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <div className="flex items-center gap-2">
                    {pages.length > 1 && (
                      <div className="flex gap-1 overflow-x-auto pb-1">
                        {pages.map((_, i) => (
                          <Button
                            key={i}
                            variant={activePageIndex === i ? "default" : "outline"}
                            size="sm"
                            onClick={() => setActivePageIndex(i)}
                            className="min-w-[2.5rem]"
                          >
                            {i + 1}
                          </Button>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        setViewMode(viewMode === "single" ? "sideBySide" : "single")
                      }
                    >
                      <Columns2 className="size-4" />
                      {viewMode === "single" ? "Side by Side" : "Single View"}
                    </Button>
                    {currentPage?.result?.imageUrl && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDownload(activePageIndex)}
                      >
                        <Download className="size-4" />
                        Download
                      </Button>
                    )}
                    {pages.filter((p) => p.result?.imageUrl).length > 1 && (
                      <Button variant="outline" size="sm" onClick={handleDownloadAll}>
                        <Download className="size-4" />
                        All
                      </Button>
                    )}
                  </div>
                </div>

                {/* Current page result */}
                {currentPage?.isProcessing && (
                  <Card>
                    <CardContent className="flex items-center justify-center py-16">
                      <Loader2 className="animate-spin size-8 text-primary" />
                      <span className="ml-3 text-muted-foreground">
                        Processing page {activePageIndex + 1}...
                      </span>
                    </CardContent>
                  </Card>
                )}

                {currentPage?.result && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        {currentPage.result.success
                          ? `Page ${activePageIndex + 1} — Translated`
                          : `Page ${activePageIndex + 1} — Failed`}
                      </CardTitle>
                      <CardDescription>{currentPage.result.message}</CardDescription>
                    </CardHeader>

                    {/* Image display */}
                    {(currentPage.result.imageUrl || currentPage.previewUrl) && (
                      <CardContent>
                        {viewMode === "sideBySide" ? (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <p className="text-xs font-medium text-muted-foreground text-center">
                                Original
                              </p>
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img
                                src={currentPage.previewUrl}
                                alt="Original"
                                className="w-full rounded-lg border object-contain max-h-[500px]"
                              />
                            </div>
                            {currentPage.result.imageUrl && (
                              <div className="space-y-2">
                                <p className="text-xs font-medium text-muted-foreground text-center">
                                  Translated
                                </p>
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                  src={currentPage.result.imageUrl}
                                  alt="Translated"
                                  className="w-full rounded-lg border object-contain max-h-[500px]"
                                />
                              </div>
                            )}
                          </div>
                        ) : (
                          currentPage.result.imageUrl && (
                            <>
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img
                                src={currentPage.result.imageUrl}
                                alt="Translated result"
                                className="mx-auto max-h-[600px] w-auto rounded-lg object-contain shadow-sm"
                              />
                            </>
                          )
                        )}
                      </CardContent>
                    )}

                    {/* Editable translation blocks */}
                    {currentBlocks.length > 0 && (
                      <CardContent>
                        <div className="space-y-3">
                          <h3 className="text-sm font-semibold text-foreground">
                            Translation Details (editable)
                          </h3>
                          <div className="space-y-2">
                            {currentBlocks.map((block, i) => (
                              <div
                                key={i}
                                className="rounded-lg border bg-muted/30 p-3 text-sm space-y-1"
                              >
                                <div className="text-muted-foreground text-xs">
                                  {block.original}
                                </div>
                                <input
                                  type="text"
                                  value={block.translated}
                                  onChange={(e) =>
                                    handleEditBlock(activePageIndex, i, e.target.value)
                                  }
                                  className="w-full bg-background border rounded px-2 py-1 text-sm font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    )}
                  </Card>
                )}

                <Button onClick={handleReset} variant="outline" className="w-full">
                  <RotateCcw className="size-4" />
                  Start Over
                </Button>
              </>
            )}
          </TabsContent>

          {/* ===== HISTORY TAB ===== */}
          <TabsContent value="history" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="size-5" />
                    Translation History
                  </CardTitle>
                  {history.length > 0 && (
                    <Button variant="ghost" size="sm" onClick={clearHistory}>
                      <Trash2 className="size-4" />
                      Clear
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                {history.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-8">
                    No translation history yet. Translate some pages to see them here.
                  </p>
                ) : (
                  <div className="space-y-2">
                    {history.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between rounded-lg border bg-muted/20 p-3"
                      >
                        <div className="space-y-0.5">
                          <p className="text-sm font-medium">
                            {item.pageCount} page{item.pageCount !== 1 ? "s" : ""}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {SOURCE_LANGUAGES.find((l) => l.value === item.sourceLang)?.label ||
                              item.sourceLang}{" "}
                            &rarr;{" "}
                            {TARGET_LANGUAGES.find((l) => l.value === item.targetLang)?.label ||
                              item.targetLang}
                          </p>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {new Date(item.date).toLocaleDateString()}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
