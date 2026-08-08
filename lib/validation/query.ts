import { z } from "zod";

export const projectQuerySchema = z.object({
  category: z.string().trim().min(1).max(120).optional(),
  featured: z
    .enum(["true", "false"])
    .optional()
    .transform((value) => (value ? value === "true" : undefined)),
  cursor: z.string().trim().min(1).max(200).optional(),
  limit: z
    .union([z.string().trim().regex(/^\d+$/), z.number().int().positive()])
    .optional()
    .transform((value) => {
      if (typeof value === "number") {
        return Math.min(24, Math.max(1, value));
      }

      if (typeof value === "string") {
        return Math.min(24, Math.max(1, Number(value)));
      }

      return undefined;
    }),
});

export const blogQuerySchema = z.object({
  category: z.string().trim().min(1).max(120).optional(),
  tag: z.string().trim().min(1).max(80).optional(),
  q: z.string().trim().min(1).max(120).optional(),
});
