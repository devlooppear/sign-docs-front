import { ThemeMode } from "./ThemeRegistry";

export interface ThemeContextProps {
  mode: ThemeMode;
  toggleTheme: () => void;
}
