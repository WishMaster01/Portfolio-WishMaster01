"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useTheme } from "./theme-provider";
import { ThemePreviewCard } from "./ThemePreviewCard";
import { themeOptions, type Theme } from "./themes";

type ThemeSettingsPanelProps = {
  onClose: () => void;
};

export function ThemeSettingsPanel({ onClose }: ThemeSettingsPanelProps) {
  const {
    theme,
    resolvedTheme,
    setTheme,
    systemTheme,
    reducedMotion,
    setReducedMotion,
    fontScale,
    setFontScale,
  } = useTheme();
  const shouldReduceMotion = useReducedMotion();

  function selectTheme(nextTheme: Theme) {
    setTheme(nextTheme);
    onClose();
  }

  return (
    <motion.div
      role="menu"
      aria-label="Portfolio theme settings"
      className="absolute right-0 top-14 z-50 w-[min(calc(100vw-2rem),25rem)] overflow-hidden rounded-3xl border border-border bg-surface/95 text-foreground shadow-2xl shadow-foreground/15 backdrop-blur-xl"
      initial={shouldReduceMotion ? false : { opacity: 0, y: -8, scale: 0.98 }}
      animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
      exit={shouldReduceMotion ? undefined : { opacity: 0, y: -8, scale: 0.98 }}
      transition={{ duration: 0.18 }}
    >
      <div className="border-b border-border bg-surface-elevated/50 p-3">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-accent">
              Theme system
            </p>
            <h2 className="mt-1 text-base font-black">Choose your mode</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-border bg-background text-lg leading-none text-muted-foreground transition hover:border-accent/50 hover:bg-accent/10 hover:text-accent focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/30"
            aria-label="Close theme settings"
          >
            x
          </button>
        </div>

        <button
          type="button"
          role="menuitemradio"
          aria-checked={theme === "system"}
          className={cn(
            "mt-3 flex w-full items-center justify-between rounded-2xl border border-border bg-background/70 px-4 py-3 text-left transition hover:border-accent/60 hover:bg-accent/10 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/30",
            theme === "system" && "border-accent/70 bg-accent/10",
          )}
          onClick={() => selectTheme("system")}
        >
          <span>
            <span className="block text-sm font-black text-foreground">
              System
            </span>
            <span className="text-xs text-muted-foreground">
              Match device preference. Currently resolves to {systemTheme}.
            </span>
          </span>
          <span className="rounded-full bg-accent/10 px-3 py-1 text-xs font-black uppercase text-accent">
            Auto
          </span>
        </button>
      </div>

      <div className="grid max-h-[min(68dvh,38rem)] grid-cols-1 gap-2 overflow-y-auto p-3 sm:grid-cols-2">
        {themeOptions.map((option) => (
          <ThemePreviewCard
            key={option.id}
            id={option.id}
            label={option.label}
            description={option.description}
            icon={option.icon}
            swatch={option.swatch}
            isActive={
              theme === option.id ||
              (theme === "system" && resolvedTheme === option.id)
            }
            onSelect={() => selectTheme(option.id)}
          />
        ))}
      </div>

      <div className="border-t border-border bg-surface-elevated/35 p-3">
        <p className="mb-3 text-xs leading-5 text-muted-foreground">
          Theme resolution is memoized through an LFU cache so repeated palette
          and preference reads stay cheap across interactions.
        </p>
        <div className="grid gap-3 sm:grid-cols-2">
          <button
            type="button"
            className={cn(
              "rounded-2xl border border-border bg-background/70 p-3 text-left transition hover:border-accent/60 hover:bg-accent/10 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/30",
              reducedMotion && "border-accent/70 bg-accent/10",
            )}
            onClick={() => setReducedMotion(!reducedMotion)}
          >
            <span className="block text-xs font-black uppercase tracking-[0.14em] text-foreground">
              Reduced motion
            </span>
            <span className="mt-1 block text-xs text-muted-foreground">
              {reducedMotion ? "Enabled" : "Disabled"} for theme transitions.
            </span>
          </button>

          <div className="rounded-2xl border border-border bg-background/70 p-3">
            <div className="flex items-center justify-between gap-3">
              <span>
                <span className="block text-xs font-black uppercase tracking-[0.14em] text-foreground">
                  Font scale
                </span>
                <span className="mt-1 block text-xs text-muted-foreground">
                  {Math.round(fontScale * 100)}%
                </span>
              </span>
              <div className="flex gap-2">
                <button
                  type="button"
                  className="grid h-8 w-8 place-items-center rounded-xl border border-border bg-surface text-sm font-black transition hover:border-accent/60 hover:text-accent"
                  onClick={() => setFontScale(fontScale - 0.05)}
                  aria-label="Decrease font scale"
                >
                  -
                </button>
                <button
                  type="button"
                  className="grid h-8 w-8 place-items-center rounded-xl border border-border bg-surface text-sm font-black transition hover:border-accent/60 hover:text-accent"
                  onClick={() => setFontScale(fontScale + 0.05)}
                  aria-label="Increase font scale"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
