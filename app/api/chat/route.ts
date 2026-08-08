import { NextResponse } from "next/server";
import { checkRateLimit } from "@/lib/server/rate-limit";
import {
  createPortfolioChatResponse,
  getConfiguredProvider,
} from "@/server/chat/chat-service";
import { getChatSuggestedQuestions } from "@/server/chat/context-builder";
import { readJson, validationError } from "@/lib/server/api";
import { chatRequestSchema } from "@/validations/chat.schema";

export const runtime = "nodejs";

function getClientIp(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for");

  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() ?? "unknown";
  }

  return (
    request.headers.get("x-real-ip") ??
    request.headers.get("cf-connecting-ip") ??
    "unknown"
  );
}

export async function GET() {
  return NextResponse.json({
    ok: true,
    suggestedQuestions: getChatSuggestedQuestions(),
    configuredProvider: getConfiguredProvider(),
  });
}

export async function POST(request: Request) {
  const clientIp = getClientIp(request);
  const rateLimit = checkRateLimit(`chat:${clientIp}`, {
    algorithm: "token-bucket",
    capacity: 10,
    refillTokens: 1,
    refillIntervalMs: 12_000,
  });

  if (!rateLimit.allowed) {
    return NextResponse.json(
      {
        error: "Too many chat requests.",
        message: "Please wait a few seconds before sending another message.",
      },
      {
        status: 429,
        headers: {
          "Retry-After": String(
            Math.max(1, Math.ceil((rateLimit.resetAt - Date.now()) / 1000)),
          ),
        },
      },
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

  return NextResponse.json(result, {
    status: result.error ? 502 : 200,
  });
}
