import en from "./en";
import ko from "./ko";
import ja from "./ja";
import zh from "./zh";
import es from "./es";
import fr from "./fr";
import de from "./de";
import pt from "./pt";

export type Locale = "en" | "ko" | "ja" | "zh" | "es" | "fr" | "de" | "pt";

export const LOCALE_NAMES: Record<Locale, string> = {
  en: "English",
  ko: "한국어",
  ja: "日本語",
  zh: "中文",
  es: "Español",
  fr: "Français",
  de: "Deutsch",
  pt: "Português",
};

export const translations: Record<Locale, typeof en> = {
  en,
  ko,
  ja,
  zh,
  es,
  fr,
  de,
  pt,
};

export { en };
export type { TranslationKeys } from "./en";
