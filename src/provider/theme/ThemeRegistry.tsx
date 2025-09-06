"use client";

import * as React from "react";
import { ThemeProvider, createTheme, PaletteOptions } from "@mui/material/styles";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import CssBaseline from "@mui/material/CssBaseline";
import systemColors from "@/common/constants/systemColors";
import { ThemeMode } from "@/enum/theme";
import { useThemeContext } from "./ThemeContext";

const paletteConfig: Record<ThemeMode, PaletteOptions> = {
  [ThemeMode.LIGHT]: {
    primary: { ...systemColors.blue, main: systemColors.blue[500] },
    secondary: { ...systemColors.indigo, main: systemColors.indigo[500] },
    success: { main: systemColors.success },
    warning: { main: systemColors.warning },
    error: { main: systemColors.error },
    info: { main: systemColors.info },
    background: { default: systemColors.gray[50], paper: systemColors.gray[100] },
    text: { primary: systemColors.gray[900], secondary: systemColors.gray[700] },
  },
  [ThemeMode.DARK]: {
    primary: { ...systemColors.blue, main: systemColors.blue[200] },
    secondary: { ...systemColors.indigo, main: systemColors.indigo[200] },
    success: { main: systemColors.success },
    warning: { main: systemColors.warning },
    error: { main: systemColors.error },
    info: { main: systemColors.info },
    background: { default: systemColors.gray[900], paper: systemColors.gray[800] },
    text: { primary: systemColors.gray[50], secondary: systemColors.gray[200] },
  },
};

const ThemeRegistry: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { mode } = useThemeContext();

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: paletteConfig[mode],
        typography: { fontFamily: "Roboto, Arial, sans-serif" },
      }),
    [mode]
  );

  return (
    <AppRouterCacheProvider options={{ enableCssLayer: true }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
};

export default ThemeRegistry;
export { systemColors, ThemeMode };
