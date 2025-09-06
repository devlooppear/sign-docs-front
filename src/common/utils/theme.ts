import { ThemeMode } from "@/enum/theme";

const THEME_KEY = "app-theme";

export const getStoredTheme = (): ThemeMode | null => {
  if (typeof window === "undefined") return null;

  const stored = localStorage.getItem(THEME_KEY);
  if (stored === ThemeMode.LIGHT || stored === ThemeMode.DARK) return stored as ThemeMode;

  return null;
};

export const setStoredTheme = (mode: ThemeMode) => {
  if (typeof window === "undefined") return;
  localStorage.setItem(THEME_KEY, mode);
};
