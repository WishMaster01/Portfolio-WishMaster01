import type { ChatMessage } from "@/types/chat";
import type { GroundedContext } from "@/server/chat/context-builder";

export function buildFallbackAnswer(question: string, context?: GroundedContext): string {
  const topDoc = context?.retrievedDocuments?.[0];

  if (!topDoc || topDoc.score < 0.15) {
    return "I don't have enough information in the portfolio data to answer that question accurately. Feel free to reach out to WishMaster01 directly through the contact page or email.";
  }

  // Synthesize answer dynamically based on retrieved document content
  if (topDoc.type === "project") {
    return `${topDoc.title}\n\n${topDoc.content.split("\n").slice(1, 8).join("\n")}\n\nYou can explore the full case study and architectural breakdown at ${topDoc.source}.`;
  }

  if (topDoc.type === "dsa") {
    return `${topDoc.title}\n\n${topDoc.content.split("\n").slice(0, 6).join("\n")}\n\nYou can inspect the implementation details at ${topDoc.source}.`;
  }

  if (topDoc.type === "skill") {
    return `WishMaster01's ${topDoc.title}:\n\n${topDoc.content}\n\nHis core focus areas include Next.js App Router, TypeScript, PostgreSQL, and scalable frontend/backend systems.`;
  }

  if (topDoc.type === "experience") {
    return `${topDoc.title}:\n\n${topDoc.content}`;
  }

  if (topDoc.type === "blog") {
    return `${topDoc.title}:\n\n${topDoc.content.split("\n").slice(1, 5).join("\n")}\n\nRead the full technical article at ${topDoc.source}.`;
  }

  return topDoc.content.slice(0, 600);
}

export function compactMessages(messages: ChatMessage[]) {
  return messages.slice(-8).map((message) => ({
    role: message.role,
    content: message.content,
  }));
}
