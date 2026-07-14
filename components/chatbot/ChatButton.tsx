"use client";

type ChatButtonProps = {
  isOpen: boolean;
  onClick: () => void;
};

export function ChatButton({ isOpen, onClick }: ChatButtonProps) {
  return (
    <button
      type="button"
      className="fixed bottom-5 right-5 z-[70] inline-flex h-14 items-center gap-3 rounded-full border border-border bg-foreground px-5 text-sm font-semibold text-background shadow-2xl shadow-slate-950/20 transition hover:scale-[1.02]"
      onClick={onClick}
      aria-expanded={isOpen}
      aria-haspopup="dialog"
      aria-controls="portfolio-chat-window"
    >
      <span aria-hidden="true">AI</span>
      <span className="hidden sm:inline">Ask portfolio</span>
    </button>
  );
}
