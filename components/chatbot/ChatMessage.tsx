"use client";

import type { ChatMessage as ChatMessageType } from "@/types/chat";
import { cn } from "@/lib/utils";

type ChatMessageProps = {
  message: ChatMessageType;
};

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === "user";

  return (
    <div className={cn("flex", isUser ? "justify-end" : "justify-start")}>
      <div
        className={cn(
          "max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-6",
          isUser
            ? "bg-foreground text-background"
            : "bg-surface text-foreground",
        )}
      >
        {message.content}
      </div>
    </div>
  );
}
