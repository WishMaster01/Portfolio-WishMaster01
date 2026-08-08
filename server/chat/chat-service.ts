import type { ChatMessage, ChatResponse } from "@/types/chat";
import { LruCache } from "@/lib/algorithms/lru-cache";
import { callGemini, callOpenRouter } from "@/lib/ai/providers";
import {
  buildFallbackAnswer,
  buildPortfolioSystemPrompt,
  compactMessages,
} from "@/lib/ai/portfolio-prompt";
import { buildChatContext } from "@/server/chat/context-builder";

const chatResponseCache = new LruCache<string, ChatResponse>(50);

type CreateChatResponseInput = {
  message: string;
  history?: ChatMessage[];
};

function toProviderMessages({ message, history = [] }: CreateChatResponseInput) {
  return [
    ...history.filter(
      (item) =>
        item.content.trim() &&
        (item.role === "user" || item.role === "assistant"),
    ),
    {
      role: "user" as const,
      content: message,
    },
  ].slice(-12);
}

export function getConfiguredProvider() {
  if (process.env.OPENROUTER_API_KEY && process.env.GEMINI_API_KEY) {
    return "openrouter-with-gemini-fallback";
  }

  if (process.env.OPENROUTER_API_KEY) {
    return "openrouter";
  }

  if (process.env.GEMINI_API_KEY) {
    return "gemini";
  }

  return "fallback";
}

export async function createPortfolioChatResponse({
  message,
  history = [],
}: CreateChatResponseInput): Promise<ChatResponse> {
  const cacheKey = JSON.stringify({
    message: message.trim().toLowerCase(),
    history: history.slice(-6),
  });
  const cached = chatResponseCache.get(cacheKey);

  if (cached) {
    return {
      ...cached,
      cached: true,
    };
  }

  const context = buildChatContext(message);
  const messages = toProviderMessages({ message, history });

  if (process.env.OPENROUTER_API_KEY) {
    try {
      const response = await callOpenRouter({ messages, context });
      chatResponseCache.set(cacheKey, response);
      return response;
    } catch (openRouterError) {
      console.error("OpenRouter chat request failed.", openRouterError);

      if (process.env.GEMINI_API_KEY) {
        try {
          const geminiResult = await callGemini({ messages, context });
          const fallbackResponse = {
            ...geminiResult,
            fallbackFrom: "openrouter" as const,
          };
          chatResponseCache.set(cacheKey, fallbackResponse);

          return fallbackResponse;
        } catch (geminiError) {
          console.error("Gemini fallback chat request failed.", geminiError);
        }
      }
    }
  }

  if (process.env.GEMINI_API_KEY) {
    try {
      const response = await callGemini({ messages, context });
      chatResponseCache.set(cacheKey, response);
      return response;
    } catch (geminiError) {
      console.error("Gemini chat request failed.", geminiError);
    }
  }

  const fallbackResponse = {
    answer: buildFallbackAnswer(message),
    provider: "fallback",
    model: "local-rule-based",
    setup:
      "Set OPENROUTER_API_KEY and GEMINI_API_KEY to enable provider-backed answers with automatic fallback.",
  };
  chatResponseCache.set(cacheKey, fallbackResponse);

  return fallbackResponse;
}

export function buildDebugPrompt(message: string) {
  const context = buildChatContext(message);

  return {
    systemPrompt: buildPortfolioSystemPrompt(context),
    compactMessages: compactMessages([{ role: "user", content: message }]),
  };
}
