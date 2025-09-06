export enum Languages {
  EN = "en-US",
  PT = "pt-BR",
  ES = "es-ES",
}

export const SUPPORTED_LANGUAGES = Object.values(Languages);

export const LANGUAGE_OPTIONS = [
  { code: Languages.EN, label: "English", flag: "🇺🇸" },
  { code: Languages.PT, label: "Português", flag: "🇧🇷" },
  { code: Languages.ES, label: "Español", flag: "🇪🇸" },
];
