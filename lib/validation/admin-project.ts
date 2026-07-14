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

const titledDescriptionSchema = z.object({
  title: text(1, 120),
  description: text(10, 1000),
});

const challengeSchema = titledDescriptionSchema.extend({
  resolution: text(10, 1000),
});

const architectureSchema = z.object({
  summary: text(20, 1400),
  layers: z.array(titledDescriptionSchema).min(1).max(8),
});

const screenshotSchema = titledDescriptionSchema.extend({
  image: text(1, 300),
});

const milestoneSchema = z.object({
  label: text(1, 80),
  date: text(1, 80),
  description: text(10, 1000),
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
  description: text(20, 1400),
  problem: text(20, 1200),
  solution: text(20, 1200),
  impact: text(20, 1200),
  stack: z.array(text(1, 80)).min(1).max(20),
  technologies: z.array(text(1, 100)).min(1).max(30),
  features: z.array(titledDescriptionSchema).min(1).max(12),
  architecture: architectureSchema,
  screenshots: z.array(screenshotSchema).min(1).max(12),
  challenges: z.array(challengeSchema).min(1).max(12),
  futureScope: z.array(text(1, 160)).min(1).max(16),
  githubUrl: z.string().trim().url(),
  liveUrl: z.string().trim().url(),
  milestones: z.array(milestoneSchema).min(1).max(12),
  highlights: z.array(text(1, 160)).min(1).max(12),
  metrics: z.array(projectMetricInputSchema).min(1).max(8),
  sections: z.array(projectSectionInputSchema).min(1).max(8),
  featured: z.boolean().default(false),
  sortOrder: z.number().int().min(0).default(0),
});

export const projectPatchSchema = projectInputSchema.partial().extend({
  slug: projectInputSchema.shape.slug.optional(),
});
