"use client";

import type { ReactNode } from "react";
import { Command } from "cmdk";

type CommandGroupProps = {
  heading: string;
  children: ReactNode;
};

export function CommandGroup({ heading, children }: CommandGroupProps) {
  return (
    <Command.Group
      heading={heading}
      className="p-2 text-xs font-black uppercase tracking-[0.18em] text-muted-foreground [&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:py-2"
    >
      <div className="space-y-1">{children}</div>
    </Command.Group>
  );
}
