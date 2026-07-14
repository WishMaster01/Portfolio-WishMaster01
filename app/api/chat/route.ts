import { NextResponse } from "next/server";
import {
  createPortfolioChatResponse,
  getConfiguredProvider,
} from "@/server/chat/chat-service";
import { getChatSuggestedQuestions } from "@/server/chat/context-builder";
import { readJson, validationError } from "@/lib/server/api";
import { chatRequestSchema } from "@/validations/chat.schema";

export const runtime = "nodejs";

export async function GET() {
  return NextResponse.json({
    ok: true,
    suggestedQuestions: getChatSuggestedQuestions(),
    configuredProvider: getConfiguredProvider(),
  });
}

export async function POST(request: Request) {
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
