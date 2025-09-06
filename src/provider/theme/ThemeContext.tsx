"use client";

import * as React from "react";
import { ThemeMode } from "@/enum/theme";
import { getStoredTheme, setStoredTheme } from "@/common/utils/theme";
import { ThemeContextProps } from "./interface";

const ThemeContext = React.createContext<ThemeContextProps>({
  mode: ThemeMode.LIGHT,
  toggleTheme: () => {},
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mode, setMode] = React.useState<ThemeMode>(() => {
    return (getStoredTheme() as ThemeMode) || ThemeMode.LIGHT;
  });

  const toggleTheme = () => {
    const newMode = mode === ThemeMode.LIGHT ? ThemeMode.DARK : ThemeMode.LIGHT;
    setMode(newMode);
    setStoredTheme(newMode);
  };

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => React.useContext(ThemeContext);
