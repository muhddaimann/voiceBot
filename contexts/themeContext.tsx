import { CustomDarkTheme, CustomLightTheme } from "@/constants/theme";
import * as SecureStore from "expo-secure-store";
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const THEME_KEY = "app_theme_darkMode";

type ThemeContextType = {
  isDarkMode: boolean;
  toggleTheme: () => void;
  theme: typeof CustomLightTheme;
};

const ThemeContext = createContext<ThemeContextType>({
  isDarkMode: true,
  toggleTheme: () => {},
  theme: CustomDarkTheme,
});

export const useToggle = () => useContext(ThemeContext);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const saved = await SecureStore.getItemAsync(THEME_KEY);
        if (saved !== null) {
          setIsDarkMode(saved === "true");
        }
      } catch {}
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        await SecureStore.setItemAsync(THEME_KEY, isDarkMode.toString());
      } catch {}
    })();
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode((prev) => !prev);

  const theme = useMemo(
    () => (isDarkMode ? CustomDarkTheme : CustomLightTheme),
    [isDarkMode]
  );

  const value = {
    isDarkMode,
    toggleTheme,
    theme,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}
