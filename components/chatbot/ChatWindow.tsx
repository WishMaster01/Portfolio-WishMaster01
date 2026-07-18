"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { ChatButton } from "@/components/chatbot/ChatButton";
import { ChatMessage } from "@/components/chatbot/ChatMessage";
import { SuggestedQuestions } from "@/components/chatbot/SuggestedQuestions";
import { TypingIndicator } from "@/components/chatbot/TypingIndicator";
import type { ChatMessage as ChatMessageType, ChatResponse } from "@/types/chat";

const initialMessage: ChatMessageType = {
  role: "assistant",
  content:
    "Ask me about WishMaster01's projects, skills, resume, or tech stack. I'm grounded on the portfolio data.",
};

export function ChatWindow() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessageType[]>([initialMessage]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [provider, setProvider] = useState<ChatResponse["provider"]>("fallback");
  const isProjectDetailPage = /^\/projects\/[^/]+$/.test(pathname);

  if (isProjectDetailPage) {
    return null;
  }

  async function submitQuestion(question: string) {
    const userMessage = question.trim();

    if (!userMessage || isLoading) {
      return;
    }

    const userChatMessage: ChatMessageType = {
      role: "user",
      content: userMessage,
    };
    const visibleMessages = [...messages, userChatMessage];
    const history = messages.filter(
      (message) => message.content !== initialMessage.content,
    );

    setMessages(visibleMessages);
    setInput("");
    setError(null);
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userMessage,
          history,
        }),
      });

      const data = (await response.json()) as ChatResponse;

      if (!response.ok && data.error) {
        setError(data.error);
      }

      setMessages((currentMessages) => [
        ...currentMessages,
        {
          role: "assistant",
          content:
            data.answer ||
            data.error ||
            "I could not generate a response. Try asking about projects, skills, or resume.",
        },
      ]);
      setProvider(data.provider || "fallback");
    } catch {
      setError("The chatbot API is unavailable.");
      setMessages((currentMessages) => [
        ...currentMessages,
        {
          role: "assistant",
          content:
            "The chatbot API is unavailable right now. Try again after the dev server is ready.",
        },
      ]);
      setProvider("fallback");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <ChatButton isOpen={isOpen} onClick={() => setIsOpen((value) => !value)} />

      <AnimatePresence>
        {isOpen ? (
          <motion.section
            id="portfolio-chat-window"
            role="dialog"
            aria-modal="false"
            aria-label="AI portfolio chatbot"
            className="print-hide fixed inset-x-3 bottom-20 z-[70] ml-auto flex max-h-[min(42rem,78dvh)] max-w-lg flex-col overflow-hidden rounded-3xl border border-border bg-background shadow-2xl shadow-slate-950/25 sm:bottom-24 sm:left-auto sm:right-5 sm:w-[28rem]"
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.2 }}
          >
            <header className="border-b border-border bg-surface/80 p-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="font-semibold">WishMaster01 AI Assistant</h2>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Provider: {provider}
                  </p>
                </div>
                <button
                  type="button"
                  className="rounded-full px-2 py-1 text-sm text-muted-foreground hover:bg-surface-elevated hover:text-foreground"
                  onClick={() => setIsOpen(false)}
                >
                  Close
                </button>
              </div>
            </header>

            <div className="flex-1 space-y-4 overflow-y-auto p-4">
              {messages.map((message, index) => (
                <ChatMessage key={`${message.role}-${index}`} message={message} />
              ))}
              {isLoading ? <TypingIndicator /> : null}
            </div>

            <div className="border-t border-border p-4">
              {error ? (
                <p className="mb-3 rounded-2xl border border-border bg-surface px-3 py-2 text-xs text-muted-foreground">
                  {error}
                </p>
              ) : null}

              <SuggestedQuestions
                disabled={isLoading}
                onSelect={submitQuestion}
              />

              <form
                className="flex gap-2"
                onSubmit={(event) => {
                  event.preventDefault();
                  submitQuestion(input);
                }}
              >
                <label className="sr-only" htmlFor="portfolio-chat-input">
                  Ask a portfolio question
                </label>
                <input
                  id="portfolio-chat-input"
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  placeholder="Ask about projects, skills, resume..."
                  className="min-w-0 flex-1 rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-accent focus:ring-4 focus:ring-accent/15"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  className="rounded-2xl bg-foreground px-4 py-3 text-sm font-semibold text-background disabled:opacity-50"
                  disabled={isLoading || !input.trim()}
                >
                  Send
                </button>
              </form>
            </div>
          </motion.section>
        ) : null}
      </AnimatePresence>
    </>
  );
}
