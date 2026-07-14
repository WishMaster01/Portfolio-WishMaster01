import type { ChatMessage, ChatResponse } from "@/types/chat";
import { buildPortfolioSystemPrompt, compactMessages } from "@/lib/ai/portfolio-prompt";

type ProviderInput = {
  messages: ChatMessage[];
  context: unknown;
};

type OpenRouterResponse = {
  choices?: Array<{
    message?: {
      content?: string;
    };
  }>;
  model?: string;
};

type GeminiResponse = {
  output_text?: string;
  model?: string;
  output?: Array<{
    content?: Array<{
      text?: string;
    }>;
  }>;
};

function assertOk(response: Response, provider: string) {
  if (!response.ok) {
    throw new Error(`${provider} request failed with ${response.status}`);
  }
}

export async function callOpenRouter({
  messages,
  context,
}: ProviderInput): Promise<ChatResponse> {
  const apiKey = process.env.OPENROUTER_API_KEY;

  if (!apiKey) {
    throw new Error("OPENROUTER_API_KEY is not configured.");
  }

  const model = process.env.OPENROUTER_MODEL || "openai/gpt-4o-mini";
  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "HTTP-Referer": process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
      "X-Title": "WishMaster01 Portfolio",
    },
    body: JSON.stringify({
      model,
      messages: [
        {
          role: "system",
          content: buildPortfolioSystemPrompt(context),
        },
        ...compactMessages(messages),
      ],
      temperature: 0.35,
      max_completion_tokens: 700,
    }),
  });

  assertOk(response, "OpenRouter");

  const data = (await response.json()) as OpenRouterResponse;
  const answer = data.choices?.[0]?.message?.content?.trim();

  if (!answer) {
    throw new Error("OpenRouter returned an empty response.");
  }

  return {
    answer,
    provider: "openrouter",
    model: data.model || model,
  };
}

export async function callGemini({
  messages,
  context,
}: ProviderInput): Promise<ChatResponse> {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not configured.");
  }

  const model = process.env.GEMINI_MODEL || "gemini-3.5-flash";
  const lastMessage = messages[messages.length - 1];
  const history = compactMessages(messages)
    .map((message) => `${message.role.toUpperCase()}: ${message.content}`)
    .join("\n");

  const response = await fetch("https://generativelanguage.googleapis.com/v1beta/interactions", {
    method: "POST",
    headers: {
      "x-goog-api-key": apiKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      system_instruction: buildPortfolioSystemPrompt(context),
      input: [
        "Conversation history:",
        history,
        "",
        "Answer the latest user message:",
        lastMessage?.content ?? "",
      ].join("\n"),
      generation_config: {
        temperature: 0.35,
        max_output_tokens: 700,
      },
    }),
  });

  assertOk(response, "Gemini");

  const data = (await response.json()) as GeminiResponse;
  const answer =
    data.output_text?.trim() ||
    data.output
      ?.flatMap((item) => item.content ?? [])
      .map((part) => part.text)
      .filter(Boolean)
      .join("")
      .trim();

  if (!answer) {
    throw new Error("Gemini returned an empty response.");
  }

  return {
    answer,
    provider: "gemini",
    model: data.model || model,
  };
}
