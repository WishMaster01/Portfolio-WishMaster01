"use client";

import type { CSSProperties } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { ThemeName } from "./themes";

type ThemePreviewCardProps = {
  id: ThemeName;
  label: string;
  description: string;
  icon: string;
  swatch: readonly string[];
  isActive: boolean;
  onSelect: () => void;
};

export function ThemePreviewCard({
  id,
  label,
  description,
  icon,
  swatch,
  isActive,
  onSelect,
}: ThemePreviewCardProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.button
      type="button"
      role="menuitemradio"
      aria-checked={isActive}
      className={cn(
        "group rounded-2xl border border-border bg-background/70 p-3 text-left text-foreground shadow-sm shadow-foreground/5 outline-none transition hover:border-accent/60 hover:bg-surface-elevated focus-visible:ring-4 focus-visible:ring-ring/30",
        isActive && "border-accent/80 bg-accent/10 shadow-accent/15",
      )}
      onClick={onSelect}
      whileHover={shouldReduceMotion ? undefined : { y: -3 }}
      whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
      style={
        {
          "--swatch-background": swatch[0],
          "--swatch-surface": swatch[1],
          "--swatch-accent": swatch[2],
        } as CSSProperties
      }
    >
      <span className="flex items-center justify-between gap-2">
        <span className="text-xs font-black uppercase tracking-[0.12em] text-foreground">
          {label}
        </span>
        <span
          aria-hidden="true"
          className="grid h-7 w-7 place-items-center rounded-xl bg-surface text-sm shadow-sm shadow-foreground/5"
        >
          {icon}
        </span>
      </span>
      <span className="mt-2 flex h-7 overflow-hidden rounded-full border border-border">
        <span className="theme-swatch theme-swatch-background flex-1" />
        <span className="theme-swatch theme-swatch-surface flex-1" />
        <span className="theme-swatch theme-swatch-accent flex-1" />
      </span>
      <span className="mt-2 block text-[11px] leading-4 text-muted-foreground">
        {description}
      </span>
      <span className="sr-only">Select {id} theme</span>
    </motion.button>
  );
}
