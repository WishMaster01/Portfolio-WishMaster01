import { z } from "zod";

export const chatMessageSchema = z.object({
  role: z.enum(["user", "assistant"]),
  content: z.string().trim().min(1).max(2000),
});

export const chatRequestSchema = z
  .object({
    message: z.string().trim().min(1).max(2000).optional(),
    history: z.array(chatMessageSchema).max(12).optional(),
    messages: z.array(chatMessageSchema).max(12).optional(),
  })
  .superRefine((value, context) => {
    if (!value.message && (!value.messages || value.messages.length === 0)) {
      context.addIssue({
        code: "custom",
        path: ["message"],
        message: "A message or messages array is required.",
      });
    }
  })
  .transform((value) => {
    if (value.message) {
      return {
        message: value.message,
        history: value.history ?? [],
      };
    }

    const messages = value.messages ?? [];
    const latestUserMessage = [...messages]
      .reverse()
      .find((message) => message.role === "user");

    return {
      message: latestUserMessage?.content ?? "",
      history: messages,
    };
  });
