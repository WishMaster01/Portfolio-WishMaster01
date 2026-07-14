"use client";

export function TypingIndicator() {
  return (
    <div className="flex justify-start" aria-live="polite">
      <div className="flex items-center gap-2 rounded-2xl bg-surface px-4 py-3 text-sm text-muted-foreground">
        <span>Thinking with portfolio context</span>
        <span className="flex gap-1" aria-hidden="true">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-current" />
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-current [animation-delay:120ms]" />
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-current [animation-delay:240ms]" />
        </span>
      </div>
    </div>
  );
}
