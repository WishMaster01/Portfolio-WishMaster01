import { z } from "zod";

export const projectQuerySchema = z.object({
  category: z.string().trim().min(1).max(120).optional(),
  featured: z
    .enum(["true", "false"])
    .optional()
    .transform((value) => (value ? value === "true" : undefined)),
});

export const blogQuerySchema = z.object({
  category: z.string().trim().min(1).max(120).optional(),
  tag: z.string().trim().min(1).max(80).optional(),
  q: z.string().trim().min(1).max(120).optional(),
});
