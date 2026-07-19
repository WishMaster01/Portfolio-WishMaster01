"use client";

import { AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { useTheme } from "@/components/theme/theme-provider";
import { getThemeOption, themeLabels } from "@/components/theme/themes";
import { cn } from "@/lib/utils";
import { ThemeSettingsPanel } from "./ThemeSettingsPanel";

type ThemeSwitcherProps = {
  compact?: boolean;
};

function subscribeToHydration() {
  return () => undefined;
}

function getClientHydrationSnapshot() {
  return true;
}

function getServerHydrationSnapshot() {
  return false;
}

export function ThemeSwitcher({ compact = true }: ThemeSwitcherProps) {
  const { theme, resolvedTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const isMounted = useSyncExternalStore(
    subscribeToHydration,
    getClientHydrationSnapshot,
    getServerHydrationSnapshot,
  );
  const rootRef = useRef<HTMLDivElement>(null);
  const currentTheme = getThemeOption(resolvedTheme);

  useEffect(() => {
    function handlePointerDown(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        className={cn(
          "group inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-border bg-surface text-sm font-black text-foreground shadow-sm shadow-foreground/5 backdrop-blur transition hover:-translate-y-0.5 hover:border-accent/60 hover:bg-accent/10 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/30",
          compact ? "w-12 px-0" : "px-4",
        )}
        onClick={() => setIsOpen((value) => !value)}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-label="Open theme menu"
      >
        <span aria-hidden="true" className="text-base">
          {isMounted ? currentTheme.icon : "T"}
        </span>
        {!compact ? (
          <span>{isMounted ? themeLabels[theme] : "Theme"}</span>
        ) : null}
      </button>

      <AnimatePresence>
        {isOpen ? (
          <ThemeSettingsPanel onClose={() => setIsOpen(false)} />
        ) : null}
      </AnimatePresence>
    </div>
  );
}
