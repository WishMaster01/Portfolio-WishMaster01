import { z } from "zod";

const optionalTrimmed = z
  .string()
  .trim()
  .max(120)
  .optional()
  .transform((value) => (value ? value : undefined));

export const contactSubmissionSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(200),
  company: optionalTrimmed,
  subject: optionalTrimmed,
  message: z.string().trim().min(20).max(4000),
  source: z.string().trim().max(80).default("portfolio"),
  website: z.string().trim().max(0).optional(),
});

export const newsletterSubscriptionSchema = z.object({
  email: z.string().trim().email().max(200),
  name: optionalTrimmed,
  source: z.string().trim().max(80).default("portfolio"),
  consent: z.boolean().refine((value) => value, {
    message: "Consent is required.",
  }),
});
