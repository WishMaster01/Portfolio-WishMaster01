"use client";

import { useSyncExternalStore } from "react";
import { useTheme } from "@/components/theme/theme-provider";
import { getThemeOption } from "@/components/theme/themes";

function subscribeToHydration() {
  return () => undefined;
}

function getClientHydrationSnapshot() {
  return true;
}

function getServerHydrationSnapshot() {
  return false;
}

export function ThemeBadge() {
  const { resolvedTheme } = useTheme();
  const isMounted = useSyncExternalStore(
    subscribeToHydration,
    getClientHydrationSnapshot,
    getServerHydrationSnapshot,
  );
  const theme = getThemeOption(resolvedTheme);

  return (
    <span className="inline-flex w-fit items-center gap-2 rounded-full border border-accent/40 bg-surface/80 px-3 py-1 text-xs font-bold uppercase tracking-wide text-foreground shadow-sm shadow-foreground/5 backdrop-blur">
      <span aria-hidden="true">{isMounted ? theme.icon : "T"}</span>
      {isMounted ? theme.badge : "Theme"}
    </span>
  );
}
