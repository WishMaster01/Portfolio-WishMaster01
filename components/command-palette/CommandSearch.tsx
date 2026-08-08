"use client";

import { Command } from "cmdk";

type CommandSearchProps = {
  onClose: () => void;
  value: string;
  onValueChange: (value: string) => void;
};

export function CommandSearch({
  onClose,
  value,
  onValueChange,
}: CommandSearchProps) {
  return (
    <div className="border-b border-border p-4">
      <div className="flex items-center gap-3 rounded-2xl border border-border bg-surface px-4 py-2 shadow-sm shadow-foreground/5">
        <Command.Input
          autoFocus
          value={value}
          onValueChange={onValueChange}
          placeholder="Trie + fuzzy search for projects, resume, contact, DSA..."
          className="h-10 min-w-0 flex-1 bg-transparent text-base text-foreground outline-none placeholder:text-muted-foreground"
        />
        <button
          type="button"
          onClick={onClose}
          className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-border bg-background text-lg leading-none text-muted-foreground transition hover:border-accent/50 hover:bg-accent/10 hover:text-accent focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/30"
          aria-label="Close search"
        >
          x
        </button>
      </div>
    </div>
  );
}
