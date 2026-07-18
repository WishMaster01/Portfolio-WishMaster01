import { z } from "zod";

const text = (min = 1, max = 500) => z.string().trim().min(min).max(max);

export const blogContentSectionSchema = z.object({
  heading: text(2, 160),
  body: z.array(text(10, 2500)).min(1).max(8),
  bullets: z.array(text(2, 400)).max(12).optional(),
  code: z.string().trim().max(6000).optional(),
  language: z.string().trim().max(40).optional(),
});

export const blogInputSchema = z.object({
  slug: z
    .string()
    .trim()
    .min(2)
    .max(100)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  title: text(2, 160),
  excerpt: text(20, 1000),
  summary: text(20, 1400),
  content: z.array(blogContentSectionSchema).min(1).max(20),
  coverImage: z.string().trim().min(1).max(400),
  image: z.string().trim().min(1).max(400).optional(),
  coverAlt: text(6, 240),
  category: text(2, 120),
  tags: z.array(text(1, 60)).min(1).max(16),
  published: z.boolean().default(false),
  publishedAt: z.coerce.date().optional(),
  date: z.coerce.date().optional(),
  readingTime: text(2, 40),
  author: text(2, 120).default("WishMaster01"),
  views: z.number().int().min(0).default(0),
});

export const blogPatchSchema = blogInputSchema.partial().extend({
  slug: blogInputSchema.shape.slug.optional(),
});
