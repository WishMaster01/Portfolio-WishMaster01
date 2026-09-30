export const themeOptions = [
  {
    id: "light",
    label: "Aurora Light",
    badge: "Aurora Light",
    icon: "☼",
    dark: false,
    swatch: ["#e0f2fe", "#f5f3ff", "#6366f1"],
    description:
      "Bright, ethereal atmosphere with soft cyan, lavender, pale mint, and violet product accents.",
  },
  {
    id: "dark",
    label: "Aurora Dark",
    badge: "Aurora Dark",
    icon: "✦",
    dark: true,
    swatch: ["#050b18", "#0c1735", "#00f2fe"],
    description:
      "Deep midnight navy with luminous cyan, electric violet, and teal glassmorphic panels.",
  },
  {
    id: "eclipse",
    label: "Aurora Eclipse",
    badge: "Aurora Eclipse",
    icon: "⚡",
    dark: true,
    swatch: ["#020208", "#0a071e", "#ff007f"],
    description:
      "Obsidian command center with ultraviolet radiance, hot magenta, and neon teal depth.",
  },
  {
    id: "cyber",
    label: "Aurora Cyber",
    badge: "Aurora Cyber",
    icon: "❖",
    dark: true,
    swatch: ["#030f14", "#06222b", "#00f5d4"],
    description:
      "Cyberpunk matrix with cyber teal, neon emerald, and deep cyber obsidian depth.",
  },
  {
    id: "sunset",
    label: "Aurora Sunset",
    badge: "Aurora Sunset",
    icon: "✹",
    dark: true,
    swatch: ["#0d061a", "#18092f", "#f43f5e"],
    description:
      "Radiant cosmic sunset with solar amber, radiant magenta, and deep cosmic violet.",
  },
] as const;

export type ThemeName = (typeof themeOptions)[number]["id"];
export type Theme = ThemeName | "system";
export const themeNames = themeOptions.map((theme) => theme.id) as ThemeName[];

export const themeLabels: Record<Theme, string> = {
  system: "System",
  light: "Aurora Light",
  dark: "Aurora Dark",
  eclipse: "Aurora Eclipse",
  cyber: "Aurora Cyber",
  sunset: "Aurora Sunset",
};

const themeIds = new Set<string>(themeOptions.map((theme) => theme.id));

export function isTheme(value: string | null | undefined): value is Theme {
  return value === "system" || themeIds.has(value ?? "");
}

export function isThemeName(
  value: string | null | undefined,
): value is ThemeName {
  return themeIds.has(value ?? "");
}

export function getThemeOption(theme: ThemeName) {
  return (
    themeOptions.find((option) => option.id === theme) ??
    themeOptions[1] // Default to Aurora Dark
  );
}
