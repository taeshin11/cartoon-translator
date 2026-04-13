"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";
import { translations, Locale, LOCALE_NAMES } from "./translations";

type I18nContextType = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string, vars?: Record<string, string>) => string;
};

const I18nContext = createContext<I18nContextType | null>(null);

const STORAGE_KEY = "ct-ui-locale";

function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(
    new RegExp(`(?:^|; )${name}=([^;]*)`)
  );
  return match ? decodeURIComponent(match[1]) : null;
}

function setCookie(name: string, value: string) {
  document.cookie = `${name}=${encodeURIComponent(value)};path=/;max-age=${
    60 * 60 * 24 * 365
  };samesite=lax`;
}

function detectLocale(): Locale {
  if (typeof window === "undefined") return "en";

  // 1. Cookie (persisted from previous visit)
  const cookieLocale = getCookie(STORAGE_KEY);
  if (cookieLocale && cookieLocale in translations)
    return cookieLocale as Locale;

  // 2. localStorage (user's explicit choice)
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved && saved in translations) return saved as Locale;

  // 3. Browser navigator
  const browserLangs = navigator.languages || [navigator.language];
  for (const lang of browserLangs) {
    const code = lang.toLowerCase().split("-")[0] as Locale;
    if (code in translations) return code;
  }

  return "en";
}

function getInitialLocale(): Locale {
  if (typeof document === "undefined") return "en";
  const cookieLocale = getCookie(STORAGE_KEY);
  if (cookieLocale && cookieLocale in translations)
    return cookieLocale as Locale;
  return "en";
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(getInitialLocale);

  useEffect(() => {
    const detected = detectLocale();
    setLocaleState(detected);
    document.documentElement.lang = detected;
  }, []);

  const setLocale = useCallback((loc: Locale) => {
    setLocaleState(loc);
    localStorage.setItem(STORAGE_KEY, loc);
    setCookie(STORAGE_KEY, loc);
    document.documentElement.lang = loc;
  }, []);

  const t = useCallback(
    (key: string, vars?: Record<string, string>) => {
      const dict = translations[locale];
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let value: string = (dict as any)[key] ?? (translations.en as any)[key] ?? key;
      if (vars) {
        for (const [k, v] of Object.entries(vars)) {
          value = value.replace(`{${k}}`, v);
        }
      }
      return value;
    },
    [locale]
  );

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}

export function useT() {
  return useI18n().t;
}

export { LOCALE_NAMES };
export type { Locale };
