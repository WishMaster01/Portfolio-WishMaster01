import { z } from "zod";

const optionalTrimmed = z
  .string()
  .trim()
  .max(120)
  .optional()
  .transform((value) => (value ? value : undefined));

export const contactSubmissionSchema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().email().max(200),
  company: optionalTrimmed,
  subject: z.string().trim().min(3).max(120),
  message: z.string().trim().min(10).max(2000),
  source: z.string().trim().max(80).default("portfolio"),
  website: z.string().trim().max(0).optional(),
});

export const contactSchema = contactSubmissionSchema.pick({
  name: true,
  email: true,
  subject: true,
  message: true,
});

export const newsletterSubscriptionSchema = z.object({
  email: z.string().trim().email().max(200),
  name: optionalTrimmed,
  source: z.string().trim().max(80).default("portfolio"),
  consent: z.boolean().refine((value) => value, {
    message: "Consent is required.",
  }),
});
