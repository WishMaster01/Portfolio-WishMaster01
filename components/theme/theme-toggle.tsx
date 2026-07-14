"use client";

import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";
import { useTheme } from "@/components/theme/theme-provider";
import {
  getThemeOption,
  themeLabels,
  themeOptions,
  type Theme,
} from "@/components/theme/themes";
import { cn } from "@/lib/utils";

export function ThemeToggle() {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const currentTheme = getThemeOption(resolvedTheme);

  useEffect(() => {
    function handlePointerDown(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, []);

  function selectTheme(nextTheme: Theme) {
    setTheme(nextTheme);
    setIsOpen(false);
  }

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        className="inline-flex h-10 items-center gap-2 rounded-xl border border-border bg-surface/85 px-3 text-sm font-semibold text-foreground shadow-sm shadow-foreground/5 backdrop-blur transition hover:border-accent/60"
        onClick={() => setIsOpen((value) => !value)}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-label={`Open theme menu. Current theme is ${themeLabels[theme]}.`}
      >
        <span aria-hidden="true">{currentTheme.icon}</span>
        <span className="hidden sm:inline">{currentTheme.label}</span>
      </button>

      {isOpen ? (
        <div
          role="menu"
          aria-label="Portfolio themes"
          className="absolute right-0 top-12 z-50 w-72 overflow-hidden rounded-3xl border border-border bg-surface/95 p-2 shadow-2xl shadow-foreground/10 backdrop-blur-xl"
        >
          <button
            type="button"
            role="menuitem"
            className={cn(
              "mb-2 flex w-full items-center justify-between rounded-2xl border border-border px-3 py-2 text-left text-sm transition hover:border-accent/60 hover:bg-surface-elevated",
              theme === "system" && "border-accent/70 bg-accent/10",
            )}
            onClick={() => selectTheme("system")}
          >
            <span>
              <span className="block font-semibold">System</span>
              <span className="text-xs text-muted-foreground">
                Match device preference
              </span>
            </span>
            <span className="text-base" aria-hidden="true">
              🖥️
            </span>
          </button>

          <div className="grid grid-cols-2 gap-2">
            {themeOptions.map((option) => (
              <button
                key={option.id}
                type="button"
                role="menuitemradio"
                aria-checked={theme === option.id}
                className={cn(
                  "group rounded-2xl border border-border bg-background/70 p-3 text-left transition hover:border-accent/60 hover:bg-surface-elevated",
                  theme === option.id && "border-accent/80 bg-accent/10",
                )}
                onClick={() => selectTheme(option.id)}
                style={
                  {
                    "--swatch-background": option.swatch[0],
                    "--swatch-surface": option.swatch[1],
                    "--swatch-accent": option.swatch[2],
                  } as CSSProperties
                }
              >
                <span className="flex items-center justify-between gap-2">
                  <span className="text-xs font-bold uppercase tracking-wide">
                    {option.label}
                  </span>
                  <span aria-hidden="true">{option.icon}</span>
                </span>
                <span className="mt-2 flex h-7 overflow-hidden rounded-full border border-border">
                  <span className="theme-swatch theme-swatch-background flex-1" />
                  <span className="theme-swatch theme-swatch-surface flex-1" />
                  <span className="theme-swatch theme-swatch-accent flex-1" />
                </span>
              </button>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
