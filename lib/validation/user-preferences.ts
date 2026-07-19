import { z } from "zod";
import { themeLabels } from "@/components/theme/themes";

export const userPreferencesSchema = z.object({
  preferredTheme: z
    .enum(Object.keys(themeLabels) as [keyof typeof themeLabels])
    .optional(),
  reducedMotion: z.boolean().optional(),
  fontScale: z.number().min(0.85).max(1.3).optional(),
});

export type UserPreferencesInput = z.infer<typeof userPreferencesSchema>;
