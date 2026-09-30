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
    "Hello! I am Aurora AI, an engineering assistant grounded in Sumit Kumar's portfolio, architecture decisions, projects, and systems code. What would you like to explore?",
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
            className="print-hide fixed inset-x-3 bottom-20 z-[70] ml-auto flex max-h-[min(44rem,82dvh)] max-w-lg flex-col overflow-hidden rounded-3xl border border-accent/35 bg-surface/95 text-foreground shadow-2xl shadow-accent/20 backdrop-blur-2xl sm:bottom-24 sm:left-auto sm:right-5 sm:w-[28rem]"
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.2 }}
          >
            <header className="border-b border-border/80 bg-surface/90 p-4">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-2.5">
                  <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-tr from-cyan-500/20 to-purple-500/20 border border-accent/40 text-sm font-black text-accent">
                    ✦
                  </span>
                  <div>
                    <h2 className="text-sm font-black tracking-tight flex items-center gap-1.5 text-foreground">
                      <span>Aurora AI</span>
                      <span className="rounded-full bg-accent/15 px-2 py-0.5 text-[9px] font-mono text-accent">
                        Grounded RAG
                      </span>
                    </h2>
                    <p className="text-[11px] text-muted-foreground">
                      Engine: {provider} • Sumit Kumar&apos;s Portfolio
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  className="grid h-7 w-7 place-items-center rounded-lg border border-border bg-surface text-xs font-bold text-muted-foreground hover:bg-surface-elevated hover:text-foreground transition-colors"
                  onClick={() => setIsOpen(false)}
                  aria-label="Close Aurora AI"
                >
                  ✕
                </button>
              </div>
            </header>

            <div className="flex-1 space-y-4 overflow-y-auto p-4">
              {messages.map((message, index) => (
                <ChatMessage key={`${message.role}-${index}`} message={message} />
              ))}
              {isLoading ? <TypingIndicator /> : null}
            </div>

            <div className="border-t border-border/80 bg-surface/90 p-4">
              {error ? (
                <p className="mb-3 rounded-2xl border border-destructive/30 bg-destructive/10 px-3 py-2 text-xs text-destructive">
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
                  placeholder="Ask about projects, architecture, skills..."
                  className="min-w-0 flex-1 rounded-2xl border border-accent/30 bg-background px-4 py-2.5 text-sm outline-none transition focus:border-accent focus:ring-4 focus:ring-accent/15"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  className="rounded-2xl bg-accent px-4 py-2.5 text-xs font-black text-accent-foreground shadow-md shadow-accent/20 transition hover:opacity-90 disabled:opacity-50"
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
