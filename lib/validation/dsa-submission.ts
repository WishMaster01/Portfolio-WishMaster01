import { z } from "zod";

export const dsaSubmissionSchema = z.object({
  sourceCode: z.string().trim().min(20).max(12000),
  stdin: z.string().max(4000).default(""),
  languageId: z.number().int().positive().default(62),
});
