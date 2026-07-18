"use client";

import { Command } from "cmdk";

export function CommandSearch() {
  return (
    <div className="border-b border-border p-4">
      <Command.Input
        autoFocus
        placeholder="Search projects, resume, contact, DSA, blog..."
        className="h-12 w-full bg-transparent text-base text-foreground outline-none placeholder:text-muted-foreground"
      />
    </div>
  );
}
