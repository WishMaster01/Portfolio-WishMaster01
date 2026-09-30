"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { useTheme } from "@/components/theme/theme-provider";
import { themeOptions, type ThemeName } from "@/components/theme/themes";
import { cn } from "@/lib/utils";

type ThemeSwitcherProps = {
  compact?: boolean;
  className?: string;
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

export function ThemeSwitcher({ compact = false, className = "" }: ThemeSwitcherProps) {
  const { resolvedTheme, setTheme } = useTheme();
  const shouldReduceMotion = useReducedMotion();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const isMounted = useSyncExternalStore(
    subscribeToHydration,
    getClientHydrationSnapshot,
    getServerHydrationSnapshot,
  );

  const activeThemeId = (isMounted ? resolvedTheme : "dark") as ThemeName;
  const activeOption = themeOptions.find((t) => t.id === activeThemeId) ?? themeOptions[1];

  // Close when clicking outside or pressing Escape
  useEffect(() => {
    if (!isOpen) return;

    function handleClickOutside(event: MouseEvent | TouchEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const handleSelectTheme = (themeId: ThemeName) => {
    setTheme(themeId);
    setIsOpen(false);
  };

  return (
    <div ref={containerRef} className={cn("relative inline-block text-left", className)}>
      {/* Dropdown Trigger Button */}
      <button
        type="button"
        id="theme-dropdown-trigger"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={`Theme: ${activeOption.label}. Click to switch theme`}
        onClick={() => setIsOpen((prev) => !prev)}
        className={cn(
          "group relative inline-flex items-center justify-center gap-2 rounded-full border border-border/80 bg-surface/80 text-foreground backdrop-blur-xl shadow-sm transition-all hover:border-accent/50 hover:bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
          compact
            ? "h-9 w-9 p-0"
            : "h-9 px-3.5 text-xs font-bold uppercase tracking-wider",
        )}
      >
        {/* Glow indicator */}
        <span
          className="absolute -inset-0.5 -z-10 rounded-full opacity-0 blur transition-opacity group-hover:opacity-40"
          style={{
            background: `linear-gradient(135deg, ${activeOption.swatch[0]}, ${activeOption.swatch[2]})`,
          }}
        />

        {/* Theme Icon */}
        <span aria-hidden="true" className="text-sm">
          {activeOption.icon}
        </span>

        {/* Color Swatch Dot */}
        <span
          aria-hidden="true"
          className="h-2.5 w-2.5 rounded-full border border-white/20 shadow-xs"
          style={{
            background: `linear-gradient(135deg, ${activeOption.swatch[0]}, ${activeOption.swatch[2]})`,
          }}
        />

        {/* Theme Label (hidden when compact) */}
        {!compact ? (
          <span className="whitespace-nowrap font-black text-[11px] tracking-wider">
            {activeOption.label.replace("Aurora ", "")}
          </span>
        ) : null}

        {/* Chevron Icon */}
        <svg
          aria-hidden="true"
          className={cn(
            "h-3 w-3 text-muted-foreground transition-transform duration-200",
            isOpen && "rotate-180 text-accent",
            compact && "sr-only",
          )}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -8, scale: 0.96 }}
            animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -6, scale: 0.96 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            role="listbox"
            aria-labelledby="theme-dropdown-trigger"
            aria-activedescendant={`theme-option-${activeThemeId}`}
            className="absolute right-0 top-full mt-2 z-50 w-72 origin-top-right rounded-2xl border border-border/80 bg-surface/95 p-1.5 shadow-2xl backdrop-blur-2xl ring-1 ring-white/10"
          >
            {/* Header / Palette Bar */}
            <div className="px-3 py-2 border-b border-border/50">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                  Aurora Palettes
                </span>
                <span className="flex items-center gap-1">
                  {themeOptions.map((opt) => (
                    <span
                      key={opt.id}
                      className="h-1.5 w-1.5 rounded-full"
                      style={{ background: opt.swatch[2] }}
                    />
                  ))}
                </span>
              </div>
            </div>

            {/* Theme Options List */}
            <div className="p-1 space-y-1">
              {themeOptions.map((option) => {
                const isActive = activeThemeId === option.id;

                return (
                  <button
                    key={option.id}
                    id={`theme-option-${option.id}`}
                    type="button"
                    role="option"
                    aria-selected={isActive}
                    onClick={() => handleSelectTheme(option.id)}
                    className={cn(
                      "group flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-xs transition-all",
                      isActive
                        ? "bg-accent/15 border border-accent/30 text-accent font-black shadow-sm"
                        : "text-foreground hover:bg-surface/80 hover:text-accent border border-transparent",
                    )}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      {/* Swatch Circle */}
                      <span
                        aria-hidden="true"
                        className={cn(
                          "relative flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-white/20 text-xs shadow-inner",
                          isActive && "ring-2 ring-accent ring-offset-1 ring-offset-background",
                        )}
                        style={{
                          background: `linear-gradient(135deg, ${option.swatch[0]}, ${option.swatch[2]})`,
                        }}
                      >
                        <span className="text-[11px] drop-shadow-sm">{option.icon}</span>
                      </span>

                      {/* Text info */}
                      <div className="flex flex-col min-w-0">
                        <span className="font-black text-xs leading-none">
                          {option.label}
                        </span>
                        <span className="text-[10px] text-muted-foreground truncate mt-0.5 font-normal">
                          {option.id === "light" && "Ethereal bright cyan & lavender"}
                          {option.id === "dark" && "Midnight navy & electric cyan"}
                          {option.id === "eclipse" && "Obsidian black & ultraviolet"}
                          {option.id === "cyber" && "Matrix teal & neon emerald"}
                          {option.id === "sunset" && "Cosmic magenta & solar amber"}
                        </span>
                      </div>
                    </div>

                    {/* Active Checkmark */}
                    {isActive ? (
                      <span className="ml-2 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground text-[10px] font-black shadow-sm">
                        ✓
                      </span>
                    ) : (
                      <span className="ml-2 h-2 w-2 rounded-full border border-border group-hover:border-accent/40" />
                    )}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
