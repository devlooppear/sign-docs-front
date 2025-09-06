import { Languages, SUPPORTED_LANGUAGES } from "@/enum/language";
import i18n from "@/provider/i18n/i18n";

const STORAGE_KEY = "i18nextLng";

/**
 * Sets the app language and persists it in localStorage.
 */
export function setAppLanguage(lang: Languages) {
  if (!SUPPORTED_LANGUAGES.includes(lang)) {
    console.warn(`[i18n] Unsupported language: ${lang}`);
    return;
  }

  i18n.changeLanguage(lang);

  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY, lang);
  }
}

/**
 * Gets the saved language from localStorage or falls back to default.
 */
export function getAppLanguage(): Languages {
  if (typeof window !== "undefined") {
    const savedLang = localStorage.getItem(STORAGE_KEY);
    if (savedLang && SUPPORTED_LANGUAGES.includes(savedLang as Languages)) {
      return savedLang as Languages;
    }
  }
  return Languages.PT;
}
