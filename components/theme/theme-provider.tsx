"use client";

import {
  ThemeProvider as NextThemesProvider,
  useTheme as useNextTheme,
} from "next-themes";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  isTheme,
  isThemeName,
  themeNames,
  type Theme,
  type ThemeName,
} from "./themes";
import {
  parseThemePreferences,
  resolveThemeOption,
} from "@/lib/theme/theme-cache";

type ThemeContextValue = {
  theme: Theme;
  resolvedTheme: ThemeName;
  setTheme: (theme: Theme) => void;
  systemTheme: ThemeName;
  reducedMotion: boolean;
  setReducedMotion: (value: boolean) => void;
  fontScale: number;
  setFontScale: (value: number) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export const themeStorageKey = "wishmaster01-theme";
const preferenceStorageKey = "wishmaster01-theme-preferences";

export function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <NextThemesProvider
      attribute="data-theme"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      storageKey={themeStorageKey}
      themes={themeNames}
    >
      <ThemeStateProvider>{children}</ThemeStateProvider>
    </NextThemesProvider>
  );
}

function ThemeStateProvider({ children }: { children: ReactNode }) {
  const nextTheme = useNextTheme();
  const [reducedMotion, setReducedMotionState] = useState(
    () => readStoredPreferences().reducedMotion,
  );
  const [fontScale, setFontScaleState] = useState(
    () => readStoredPreferences().fontScale,
  );

  const theme = isTheme(nextTheme.theme) ? nextTheme.theme : "system";
  const systemTheme = isThemeName(nextTheme.systemTheme)
    ? nextTheme.systemTheme
    : "light";
  const resolvedTheme = isThemeName(nextTheme.resolvedTheme)
    ? nextTheme.resolvedTheme
    : theme === "system"
      ? systemTheme
      : isThemeName(theme)
        ? theme
        : "light";
  const themeOption = resolveThemeOption(resolvedTheme);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", themeOption.dark);
    document.documentElement.style.colorScheme = themeOption.dark
      ? "dark"
      : "light";
  }, [themeOption.dark]);

  useEffect(() => {
    document.documentElement.dataset.reducedMotion = String(reducedMotion);
    document.documentElement.style.setProperty(
      "--font-scale",
      String(fontScale),
    );
    window.localStorage.setItem(
      preferenceStorageKey,
      JSON.stringify({ reducedMotion, fontScale }),
    );
  }, [fontScale, reducedMotion]);

  const setReducedMotion = useCallback((value: boolean) => {
    setReducedMotionState(value);
  }, []);

  const setFontScale = useCallback((value: number) => {
    setFontScaleState(clampFontScale(value));
  }, []);

  const value = useMemo(
    () => ({
      theme,
      resolvedTheme,
      setTheme: nextTheme.setTheme as (theme: Theme) => void,
      systemTheme,
      reducedMotion,
      setReducedMotion,
      fontScale,
      setFontScale,
    }),
    [
      fontScale,
      nextTheme.setTheme,
      reducedMotion,
      resolvedTheme,
      setFontScale,
      setReducedMotion,
      systemTheme,
      theme,
    ],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

function clampFontScale(value: number) {
  return Math.min(1.3, Math.max(0.85, value));
}

function readStoredPreferences() {
  if (typeof window === "undefined") {
    return {
      reducedMotion: false,
      fontScale: 1,
    };
  }

  const storedPreferences = window.localStorage.getItem(preferenceStorageKey);
  const parsed = parseThemePreferences(storedPreferences, clampFontScale);

  if (storedPreferences && parsed.fontScale === 1 && !parsed.reducedMotion) {
    try {
      JSON.parse(storedPreferences);
    } catch {
      window.localStorage.removeItem(preferenceStorageKey);
    }
  }

  return parsed;
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }

  return context;
}
