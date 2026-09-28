import { NextResponse } from "next/server";
import { apiError, readJson, validationError } from "@/lib/server/api";
import { checkRateLimit, getClientIp, RATE_LIMIT_PRESETS } from "@/lib/server/rate-limit";
import {
  createPortfolioChatResponse,
  getChatTelemetry,
  getConfiguredProvider,
} from "@/server/chat/chat-service";
import { getChatSuggestedQuestions } from "@/server/chat/context-builder";
import { chatRequestSchema } from "@/validations/chat.schema";

export const runtime = "nodejs";

export async function GET() {
  return NextResponse.json({
    success: true,
    data: {
      suggestedQuestions: getChatSuggestedQuestions(),
      configuredProvider: getConfiguredProvider(),
      telemetry: getChatTelemetry(),
    },
    // Backward compatibility
    ok: true,
    suggestedQuestions: getChatSuggestedQuestions(),
    configuredProvider: getConfiguredProvider(),
  });
}

export async function POST(request: Request) {
  const clientIp = getClientIp(request);
  const rateLimit = checkRateLimit(`chat:${clientIp}`, RATE_LIMIT_PRESETS.chat);

  if (!rateLimit.allowed) {
    const retrySeconds = Math.max(1, Math.ceil((rateLimit.resetAt - Date.now()) / 1000));
    return apiError(
      "RATE_LIMITED",
      "Too many chat requests. Please wait a moment before sending another message.",
      429,
      undefined,
      { "Retry-After": String(retrySeconds) },
    );
  }

  const body = await readJson(request);
  const parsed = chatRequestSchema.safeParse(body);

  if (!parsed.success) {
    return validationError(parsed.error);
  }

  const result = await createPortfolioChatResponse({
    message: parsed.data.message,
    history: parsed.data.history,
  });

  return NextResponse.json(
    {
      success: !result.error,
      data: result,
      // Backward compatibility
      ...result,
    },
    { status: result.error ? 502 : 200 },
  );
}
