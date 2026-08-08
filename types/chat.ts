export type ChatRole = "user" | "assistant";

export type ChatMessage = {
  role: ChatRole;
  content: string;
};

export type ChatResponse = {
  answer: string;
  provider: "openrouter" | "gemini" | "fallback";
  model?: string;
  fallbackFrom?: "openrouter" | "gemini";
  setup?: string;
  cached?: boolean;
  error?: string;
};
