"use client";

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpBackend from "i18next-http-backend";
import { Languages, SUPPORTED_LANGUAGES } from "@/enum/language";
import { getAppLanguage } from "@/common/utils/language";

const DEFAULT_NAMESPACES = ["common"];

i18n
  .use(HttpBackend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    lng: getAppLanguage(),
    fallbackLng: Languages.PT,
    supportedLngs: SUPPORTED_LANGUAGES,
    defaultNS: "common",
    ns: DEFAULT_NAMESPACES,
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ["localStorage", "navigator", "htmlTag"],
      caches: ["localStorage"],
      lookupLocalStorage: "i18nextLng",
    },
    backend: {
      loadPath: "/locales/{{lng}}/{{ns}}.json",
    },
  });

export default i18n;
