export const themeOptions = [
  {
    id: "light",
    label: "Light",
    badge: "Light Theme",
    icon: "☀️",
    dark: false,
    swatch: ["#f8fafc", "#ffffff", "#6d4aff"],
    description: "Clean white interface with violet product accents.",
  },
  {
    id: "dark",
    label: "Dark",
    badge: "Dark Theme",
    icon: "🌙",
    dark: true,
    swatch: ["#020617", "#0f172a", "#a855f7"],
    description: "Deep navy surfaces with high contrast readable text.",
  },
  {
    id: "cyber",
    label: "Cyber",
    badge: "Cyber Theme",
    icon: "⚡",
    dark: true,
    swatch: ["#05000a", "#16051f", "#ff2fcf"],
    description: "Neon magenta and cyan for a futuristic hacker feel.",
  },
  {
    id: "gradient",
    label: "Gradient",
    badge: "Gradient Theme",
    icon: "🌈",
    dark: false,
    swatch: ["#fff7fb", "#ffffff", "#7c3aed"],
    description: "Soft pastel gradients while preserving dark text contrast.",
  },
  {
    id: "solarized",
    label: "Solarized",
    badge: "Solarized Theme",
    icon: "🌞",
    dark: true,
    swatch: ["#022b2d", "#073b36", "#f6c65b"],
    description: "Warm terminal-inspired palette with amber highlights.",
  },
  {
    id: "ocean",
    label: "Ocean",
    badge: "Ocean Theme",
    icon: "🌊",
    dark: true,
    swatch: ["#011627", "#082f49", "#22d3ee"],
    description: "Blue depth, cyan highlights, and calm technical contrast.",
  },
  {
    id: "forest",
    label: "Forest",
    badge: "Forest Theme",
    icon: "🌲",
    dark: true,
    swatch: ["#02170b", "#052e16", "#6ee75f"],
    description: "Dark green surfaces with bright accessible action color.",
  },
  {
    id: "sunset",
    label: "Sunset",
    badge: "Sunset Theme",
    icon: "🌅",
    dark: true,
    swatch: ["#31143f", "#6f2351", "#fb923c"],
    description: "Warm dusk tones with orange accent and cream text.",
  },
  {
    id: "monochrome",
    label: "Monochrome",
    badge: "Monochrome Theme",
    icon: "◐",
    dark: true,
    swatch: ["#050505", "#171717", "#f5f5f5"],
    description: "Minimal grayscale mode with maximum focus on content.",
  },
  {
    id: "futuristic",
    label: "Futuristic",
    badge: "Futuristic Theme",
    icon: "🛸",
    dark: true,
    swatch: ["#020617", "#07111f", "#00f5ff"],
    description: "Cinematic cyan grid theme for the GitHub dashboard mode.",
  },
] as const;

export type ThemeName = (typeof themeOptions)[number]["id"];
export type Theme = ThemeName | "system";
export const themeNames = themeOptions.map((theme) => theme.id) as ThemeName[];

export const themeLabels: Record<Theme, string> = {
  system: "System",
  light: "Light",
  dark: "Dark",
  cyber: "Cyber",
  gradient: "Gradient",
  solarized: "Solarized",
  ocean: "Ocean",
  forest: "Forest",
  sunset: "Sunset",
  monochrome: "Monochrome",
  futuristic: "Futuristic",
};

const themeIds = new Set<string>(themeOptions.map((theme) => theme.id));

export function isTheme(value: string | null | undefined): value is Theme {
  return value === "system" || themeIds.has(value ?? "");
}

export function isThemeName(value: string | null | undefined): value is ThemeName {
  return themeIds.has(value ?? "");
}

export function getThemeOption(theme: ThemeName) {
  return themeOptions.find((option) => option.id === theme) ?? themeOptions[0];
}
