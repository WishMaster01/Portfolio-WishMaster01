import { z } from "zod";

export const MAX_SOURCE_CODE_BYTES = 64 * 1024; // 64 KB
export const MAX_STDIN_BYTES = 10 * 1024; // 10 KB

export const dsaSubmissionSchema = z.object({
  sourceCode: z
    .string()
    .trim()
    .min(5, "Source code must contain code to execute.")
    .max(
      MAX_SOURCE_CODE_BYTES,
      `Source code exceeds maximum allowed size of 64 KB (${MAX_SOURCE_CODE_BYTES} bytes).`,
    ),
  stdin: z
    .string()
    .max(
      MAX_STDIN_BYTES,
      `Standard input exceeds maximum allowed size of 10 KB (${MAX_STDIN_BYTES} bytes).`,
    )
    .default(""),
  languageId: z.number().int().positive().default(62),
});

export type DsaSubmissionInput = z.infer<typeof dsaSubmissionSchema>;
