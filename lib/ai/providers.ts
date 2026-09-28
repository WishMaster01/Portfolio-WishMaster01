import type { ChatMessage, ChatResponse } from "@/types/chat";
import { buildGroundedSystemPrompt, type GroundedContext } from "@/server/chat/context-builder";
import { compactMessages } from "@/lib/ai/portfolio-prompt";

const PROVIDER_TIMEOUT_MS = 8000; // 8-second strict timeout

type ProviderInput = {
  messages: ChatMessage[];
  context: GroundedContext;
};

export type ProviderExecutionResult = ChatResponse & {
  promptTokens?: number;
  completionTokens?: number;
};

type OpenRouterApiResponse = {
  choices?: Array<{
    message?: {
      content?: string;
    };
  }>;
  model?: string;
  usage?: {
    prompt_tokens?: number;
    completion_tokens?: number;
    total_tokens?: number;
  };
};

type GeminiApiResponse = {
  candidates?: Array<{
    content?: {
      parts?: Array<{
        text?: string;
      }>;
    };
  }>;
  usageMetadata?: {
    promptTokenCount?: number;
    candidatesTokenCount?: number;
    totalTokenCount?: number;
  };
};

export async function callOpenRouter({
  messages,
  context,
}: ProviderInput): Promise<ProviderExecutionResult> {
  const apiKey = process.env.OPENROUTER_API_KEY;

  if (!apiKey) {
    throw new Error("OPENROUTER_API_KEY is not configured.");
  }

  const model = process.env.OPENROUTER_MODEL || "openai/gpt-4o-mini";
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), PROVIDER_TIMEOUT_MS);

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": process.env.NEXT_PUBLIC_SITE_URL || "https://wishmaster01.com",
        "X-Title": "WishMaster01 Portfolio Intelligence",
      },
      body: JSON.stringify({
        model,
        messages: [
          {
            role: "system",
            content: buildGroundedSystemPrompt(context),
          },
          ...compactMessages(messages),
        ],
        temperature: 0.35,
        max_completion_tokens: 700,
      }),
      signal: controller.signal,
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`OpenRouter returned HTTP ${response.status}`);
    }

    const data = (await response.json()) as OpenRouterApiResponse;
    const answer = data.choices?.[0]?.message?.content?.trim();

    if (!answer) {
      throw new Error("OpenRouter returned an empty message payload.");
    }

    return {
      answer,
      provider: "openrouter",
      model: data.model || model,
      promptTokens: data.usage?.prompt_tokens,
      completionTokens: data.usage?.completion_tokens,
    };
  } finally {
    clearTimeout(timeoutId);
  }
}

export async function callGemini({
  messages,
  context,
}: ProviderInput): Promise<ProviderExecutionResult> {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not configured.");
  }

  const model = process.env.GEMINI_MODEL || "gemini-1.5-flash";
  const lastMessage = messages[messages.length - 1];
  const systemPrompt = buildGroundedSystemPrompt(context);

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), PROVIDER_TIMEOUT_MS);

  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        system_instruction: {
          parts: [{ text: systemPrompt }],
        },
        contents: [
          ...compactMessages(messages.slice(0, -1)).map((m) => ({
            role: m.role === "assistant" ? "model" : "user",
            parts: [{ text: m.content }],
          })),
          {
            role: "user",
            parts: [{ text: lastMessage?.content ?? "Summarize your skills and background." }],
          },
        ],
        generationConfig: {
          temperature: 0.35,
          maxOutputTokens: 700,
        },
      }),
      signal: controller.signal,
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`Gemini returned HTTP ${response.status}`);
    }

    const data = (await response.json()) as GeminiApiResponse;
    const candidatePart = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim();

    if (!candidatePart) {
      throw new Error("Gemini returned an empty candidate payload.");
    }

    return {
      answer: candidatePart,
      provider: "gemini",
      model,
      promptTokens: data.usageMetadata?.promptTokenCount,
      completionTokens: data.usageMetadata?.candidatesTokenCount,
    };
  } finally {
    clearTimeout(timeoutId);
  }
}
