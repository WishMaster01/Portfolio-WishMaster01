import { LfuCache } from "@/lib/algorithms/lfu-cache";
import { getThemeOption, type ThemeName } from "@/components/theme/themes";

export type ThemePreferenceSnapshot = {
  reducedMotion: boolean;
  fontScale: number;
};

const preferenceCache = new LfuCache<string, ThemePreferenceSnapshot>(12);
const themeOptionCache = new LfuCache<
  ThemeName,
  ReturnType<typeof getThemeOption>
>(12);

export function parseThemePreferences(
  rawValue: string | null,
  clampFontScale: (value: number) => number,
) {
  const cacheKey = rawValue ?? "__default__";
  const cached = preferenceCache.get(cacheKey);

  if (cached) {
    return cached;
  }

  if (!rawValue) {
    const fallback = {
      reducedMotion: false,
      fontScale: 1,
    };

    preferenceCache.set(cacheKey, fallback);
    return fallback;
  }

  try {
    const parsed = JSON.parse(rawValue) as {
      reducedMotion?: unknown;
      fontScale?: unknown;
    };
    const normalized = {
      reducedMotion:
        typeof parsed.reducedMotion === "boolean"
          ? parsed.reducedMotion
          : false,
      fontScale:
        typeof parsed.fontScale === "number"
          ? clampFontScale(parsed.fontScale)
          : 1,
    };

    preferenceCache.set(cacheKey, normalized);
    return normalized;
  } catch {
    const fallback = {
      reducedMotion: false,
      fontScale: 1,
    };

    preferenceCache.set(cacheKey, fallback);
    return fallback;
  }
}

export function resolveThemeOption(theme: ThemeName) {
  const cached = themeOptionCache.get(theme);

  if (cached) {
    return cached;
  }

  const option = getThemeOption(theme);
  themeOptionCache.set(theme, option);
  return option;
}
