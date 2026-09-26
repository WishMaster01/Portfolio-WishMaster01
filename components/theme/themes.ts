export const themeOptions = [
  {
    id: "light",
    label: "Light",
    badge: "Light Theme",
    icon: "LT",
    dark: false,
    swatch: ["#f8fafc", "#ffffff", "#6d4aff"],
    description: "Clean, high-contrast interface with violet product accents.",
  },
  {
    id: "dark",
    label: "Dark",
    badge: "Dark Theme",
    icon: "DK",
    dark: true,
    swatch: ["#020617", "#0f172a", "#818cf8"],
    description: "Deep surfaces with accessible text contrast and luminous accents.",
  },
] as const;

export type ThemeName = (typeof themeOptions)[number]["id"];
export type Theme = ThemeName | "system";
export const themeNames = themeOptions.map((theme) => theme.id) as ThemeName[];

export const themeLabels: Record<Theme, string> = {
  system: "System",
  light: "Light",
  dark: "Dark",
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
  return themeOptions.find((option) => option.id === theme) ?? themeOptions[0];
}
