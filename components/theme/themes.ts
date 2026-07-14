export const themeOptions = [
  {
    id: "light",
    label: "Light",
    badge: "Light Theme",
    icon: "☀️",
    dark: false,
    swatch: ["#f8fafc", "#ffffff", "#6d4aff"],
  },
  {
    id: "dark",
    label: "Dark",
    badge: "Dark Theme",
    icon: "🌙",
    dark: true,
    swatch: ["#020617", "#0f172a", "#a855f7"],
  },
  {
    id: "cyber",
    label: "Cyber",
    badge: "Cyber Theme",
    icon: "⚡",
    dark: true,
    swatch: ["#05000a", "#16051f", "#ff2fcf"],
  },
  {
    id: "gradient",
    label: "Gradient",
    badge: "Gradient Theme",
    icon: "🌈",
    dark: false,
    swatch: ["#fff7fb", "#ffffff", "#7c3aed"],
  },
  {
    id: "solarized",
    label: "Solarized",
    badge: "Solarized Theme",
    icon: "☀️",
    dark: true,
    swatch: ["#022b2d", "#073b36", "#f6c65b"],
  },
  {
    id: "ocean",
    label: "Ocean",
    badge: "Ocean Theme",
    icon: "🌊",
    dark: true,
    swatch: ["#011627", "#082f49", "#22d3ee"],
  },
  {
    id: "forest",
    label: "Forest",
    badge: "Forest Theme",
    icon: "🌲",
    dark: true,
    swatch: ["#02170b", "#052e16", "#6ee75f"],
  },
  {
    id: "sunset",
    label: "Sunset",
    badge: "Sunset Theme",
    icon: "🌅",
    dark: true,
    swatch: ["#31143f", "#6f2351", "#fb923c"],
  },
  {
    id: "monochrome",
    label: "Monochrome",
    badge: "Monochrome Theme",
    icon: "◐",
    dark: true,
    swatch: ["#050505", "#171717", "#f5f5f5"],
  },
] as const;

export type ThemeName = (typeof themeOptions)[number]["id"];
export type Theme = ThemeName | "system";

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
};

const themeIds = new Set<string>(themeOptions.map((theme) => theme.id));

export function isTheme(value: string | null): value is Theme {
  return value === "system" || themeIds.has(value ?? "");
}

export function getThemeOption(theme: ThemeName) {
  return themeOptions.find((option) => option.id === theme) ?? themeOptions[0];
}
