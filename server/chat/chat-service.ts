import type { ChatMessage, ChatResponse } from "@/types/chat";
import { LruCache } from "@/lib/algorithms/lru-cache";
import { callGemini, callOpenRouter } from "@/lib/ai/providers";
import { buildFallbackAnswer, compactMessages } from "@/lib/ai/portfolio-prompt";
import { buildChatContext, buildGroundedSystemPrompt } from "@/server/chat/context-builder";
import {
  detectPromptInjection,
  SAFE_INJECTION_REFUSAL,
  sanitizeUserInput,
} from "@/server/chat/security/injection-detector";
import { chatTelemetry } from "./telemetry";

const chatResponseCache = new LruCache<string, ChatResponse>(100);

type CreateChatResponseInput = {
  message: string;
  history?: ChatMessage[];
};

function toProviderMessages({ message, history = [] }: CreateChatResponseInput): ChatMessage[] {
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
  ].slice(-10);
}

export function getConfiguredProvider(): string {
  if (process.env.OPENROUTER_API_KEY && process.env.GEMINI_API_KEY) {
    return "openrouter-with-gemini-fallback";
  }

  if (process.env.OPENROUTER_API_KEY) {
    return "openrouter";
  }

  if (process.env.GEMINI_API_KEY) {
    return "gemini";
  }

  return "grounded-rag-engine";
}

export async function createPortfolioChatResponse({
  message,
  history = [],
}: CreateChatResponseInput): Promise<ChatResponse> {
  const startTime = Date.now();
  const sanitizedMessage = sanitizeUserInput(message);

  // 1. Perimeter Prompt-Injection & Adversarial Defense
  const injectionCheck = detectPromptInjection(sanitizedMessage);
  if (injectionCheck.isSuspicious) {
    chatTelemetry.record({
      provider: "security-filter",
      cached: false,
      success: true,
      blocked: true,
      latencyMs: Date.now() - startTime,
    });

    return {
      answer: SAFE_INJECTION_REFUSAL,
      provider: "fallback",
      model: "adversarial-guard",
    };
  }

  // 2. Query Cache Check
  const cacheKey = JSON.stringify({
    message: sanitizedMessage.toLowerCase(),
    historyLen: history.length,
  });
  const cached = chatResponseCache.get(cacheKey);

  if (cached) {
    chatTelemetry.record({
      provider: cached.provider ?? "cache",
      cached: true,
      success: true,
      latencyMs: Date.now() - startTime,
    });

    return {
      ...cached,
      cached: true,
    };
  }

  // 3. Grounded Context Construction via Hybrid Retrieval
  const context = buildChatContext(sanitizedMessage);
  const messages = toProviderMessages({ message: sanitizedMessage, history });

  // 4. Primary Provider: OpenRouter
  if (process.env.OPENROUTER_API_KEY) {
    try {
      const response = await callOpenRouter({ messages, context });
      const latencyMs = Date.now() - startTime;

      chatTelemetry.record({
        provider: "openrouter",
        cached: false,
        success: true,
        promptTokens: response.promptTokens,
        completionTokens: response.completionTokens,
        latencyMs,
      });

      chatResponseCache.set(cacheKey, response);
      return response;
    } catch (openRouterError) {
      console.warn("[Chat Service] OpenRouter request failed, initiating fallback:", openRouterError);

      // Attempt Secondary Fallback: Gemini
      if (process.env.GEMINI_API_KEY) {
        try {
          const geminiResult = await callGemini({ messages, context });
          const latencyMs = Date.now() - startTime;

          const fallbackResponse = {
            ...geminiResult,
            fallbackFrom: "openrouter" as const,
          };

          chatTelemetry.record({
            provider: "gemini",
            cached: false,
            success: true,
            fallbackFrom: "openrouter",
            promptTokens: geminiResult.promptTokens,
            completionTokens: geminiResult.completionTokens,
            latencyMs,
          });

          chatResponseCache.set(cacheKey, fallbackResponse);
          return fallbackResponse;
        } catch (geminiError) {
          console.error("[Chat Service] Gemini fallback also failed:", geminiError);
        }
      }
    }
  }

  // 5. Standalone Gemini Provider (if OpenRouter is not configured)
  if (process.env.GEMINI_API_KEY && !process.env.OPENROUTER_API_KEY) {
    try {
      const response = await callGemini({ messages, context });
      const latencyMs = Date.now() - startTime;

      chatTelemetry.record({
        provider: "gemini",
        cached: false,
        success: true,
        promptTokens: response.promptTokens,
        completionTokens: response.completionTokens,
        latencyMs,
      });

      chatResponseCache.set(cacheKey, response);
      return response;
    } catch (geminiError) {
      console.error("[Chat Service] Gemini request failed:", geminiError);
    }
  }

  // 6. Tertiary Deterministic Grounded Engine
  const latencyMs = Date.now() - startTime;
  const groundedAnswer = buildFallbackAnswer(sanitizedMessage, context);

  const fallbackResponse: ChatResponse = {
    answer: groundedAnswer,
    provider: "fallback",
    model: "hybrid-bm25-vector-rerank",
    setup:
      "Provider-backed LLMs can be attached by providing OPENROUTER_API_KEY or GEMINI_API_KEY in environment variables.",
  };

  chatTelemetry.record({
    provider: "grounded-rag-engine",
    cached: false,
    success: true,
    fallbackFrom: process.env.OPENROUTER_API_KEY || process.env.GEMINI_API_KEY ? "remote-providers" : undefined,
    latencyMs,
  });

  chatResponseCache.set(cacheKey, fallbackResponse);
  return fallbackResponse;
}

export function buildDebugPrompt(message: string) {
  const context = buildChatContext(message);

  return {
    systemPrompt: buildGroundedSystemPrompt(context),
    compactMessages: compactMessages([{ role: "user", content: message }]),
    retrievedDocuments: context.retrievedDocuments,
  };
}

export function getChatTelemetry() {
  return chatTelemetry.getSummary();
}
