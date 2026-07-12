"use client";

import { useTheme } from "@/components/theme/theme-provider";

const labels = {
  light: "Light",
  dark: "Dark",
  system: "System",
} as const;

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const nextTheme =
    theme === "system" ? "light" : theme === "light" ? "dark" : "system";

  return (
    <button
      type="button"
      className="inline-flex h-10 items-center rounded-xl border border-border bg-surface px-3 text-sm font-medium text-muted-foreground transition hover:text-foreground"
      onClick={() => setTheme(nextTheme)}
      aria-label={`Switch theme. Current theme is ${labels[theme]}.`}
    >
      {labels[theme]}
    </button>
  );
}
