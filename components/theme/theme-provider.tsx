"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { getThemeOption, isTheme, type Theme, type ThemeName } from "./themes";

type ThemeContextValue = {
  theme: Theme;
  resolvedTheme: ThemeName;
  setTheme: (theme: Theme) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

const storageKey = "wishmaster01-theme";
let currentTheme: Theme = "system";
const listeners = new Set<() => void>();

function getSystemTheme() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function resolveTheme(theme: Theme): ThemeName {
  return theme === "system" ? getSystemTheme() : theme;
}

function applyTheme(theme: Theme) {
  const resolvedTheme = resolveTheme(theme);
  const themeOption = getThemeOption(resolvedTheme);

  document.documentElement.classList.toggle("dark", themeOption.dark);
  document.documentElement.dataset.theme = resolvedTheme;
  document.documentElement.style.colorScheme = themeOption.dark
    ? "dark"
    : "light";
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot() {
  return currentTheme;
}

function getServerSnapshot(): Theme {
  return "system";
}

function setThemeValue(theme: Theme, persist: boolean) {
  currentTheme = theme;

  if (persist) {
    window.localStorage.setItem(storageKey, theme);
  }

  applyTheme(theme);
  listeners.forEach((listener) => listener());
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const theme = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  useEffect(() => {
    const storedTheme = window.localStorage.getItem(storageKey);
    const nextTheme = isTheme(storedTheme) ? storedTheme : "system";

    setThemeValue(nextTheme, false);
  }, []);

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const listener = () => {
      if (theme === "system") {
        applyTheme("system");
      }
    };

    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, [theme]);

  const setTheme = useCallback((nextTheme: Theme) => {
    setThemeValue(nextTheme, true);
  }, []);

  const resolvedTheme =
    typeof window === "undefined"
      ? "light"
      : resolveTheme(theme);

  const value = useMemo(
    () => ({ theme, resolvedTheme, setTheme }),
    [theme, resolvedTheme, setTheme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }

  return context;
}
