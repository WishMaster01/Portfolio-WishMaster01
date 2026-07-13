import { z } from "zod";

const text = (min = 1, max = 400) => z.string().trim().min(min).max(max);

export const projectMetricInputSchema = z.object({
  label: text(1, 80),
  value: text(1, 80),
});

export const projectSectionInputSchema = z.object({
  title: text(1, 120),
  body: text(20, 4000),
});

export const projectInputSchema = z.object({
  slug: z
    .string()
    .trim()
    .min(2)
    .max(80)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  title: text(2, 120),
  category: text(2, 120),
  year: z.string().trim().regex(/^\d{4}$/),
  status: text(2, 80).default("Case study"),
  role: text(2, 120),
  timeline: text(2, 120),
  summary: text(20, 800),
  problem: text(20, 1200),
  solution: text(20, 1200),
  impact: text(20, 1200),
  stack: z.array(text(1, 80)).min(1).max(20),
  highlights: z.array(text(1, 160)).min(1).max(12),
  metrics: z.array(projectMetricInputSchema).min(1).max(8),
  sections: z.array(projectSectionInputSchema).min(1).max(8),
  featured: z.boolean().default(false),
  sortOrder: z.number().int().min(0).default(0),
});

export const projectPatchSchema = projectInputSchema.partial().extend({
  slug: projectInputSchema.shape.slug.optional(),
});
