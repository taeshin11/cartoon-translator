"use client"

import { useEffect } from "react"

// Maps browser language codes to supported target languages
const SUPPORTED_LOCALES: Record<string, string> = {
  en: "en",
  ko: "ko",
  ja: "ja",
  zh: "zh",
  "zh-TW": "zh-TW",
  "zh-HK": "zh-TW",
  es: "es",
  fr: "fr",
  de: "de",
  pt: "pt",
  "pt-BR": "pt-BR",
  "pt-PT": "pt",
}

const LOCALE_STORAGE_KEY = "ct_target_lang"

/**
 * Detects browser language on first visit and stores the preferred target
 * translation language. The translate page reads this value as its default.
 */
export function LocaleDetector() {
  useEffect(() => {
    // Only auto-detect if user hasn't already set a preference
    if (localStorage.getItem(LOCALE_STORAGE_KEY)) return

    const browserLang = navigator.language || "en"

    // Try exact match first (e.g. "zh-TW"), then prefix (e.g. "zh")
    const detected =
      SUPPORTED_LOCALES[browserLang] ||
      SUPPORTED_LOCALES[browserLang.split("-")[0]] ||
      "en"

    localStorage.setItem(LOCALE_STORAGE_KEY, detected)
  }, [])

  return null
}
