"use client";

type ChatButtonProps = {
  isOpen: boolean;
  onClick: () => void;
};

export function ChatButton({ isOpen, onClick }: ChatButtonProps) {
  return (
    <button
      type="button"
      className="print-hide group fixed bottom-5 right-5 z-[70] inline-flex h-12 sm:h-13 items-center gap-2.5 rounded-full border border-accent/40 bg-surface/90 px-4 sm:px-5 text-xs sm:text-sm font-black text-foreground shadow-2xl shadow-accent/20 backdrop-blur-xl transition-all duration-300 hover:scale-105 hover:border-accent hover:shadow-accent/35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
      onClick={onClick}
      aria-expanded={isOpen}
      aria-haspopup="dialog"
      aria-controls="portfolio-chat-window"
    >
      <span className="relative flex h-2.5 w-2.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75" />
        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-gradient-to-tr from-cyan-400 to-purple-500" />
      </span>
      <span className="bg-gradient-to-r from-cyan-400 via-accent to-purple-400 bg-clip-text font-black text-transparent">
        Aurora AI
      </span>
      <span className="hidden rounded-full bg-accent/15 px-2 py-0.5 text-[10px] font-mono text-accent sm:inline">
        Portfolio Intel
      </span>
    </button>
  );
}
