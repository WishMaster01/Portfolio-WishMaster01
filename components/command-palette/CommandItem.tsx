"use client";

import { Command } from "cmdk";
import type { CommandRecord } from "./commands";

type CommandItemProps = {
  command: CommandRecord;
  onSelect: (command: CommandRecord) => void;
};

export function CommandItem({ command, onSelect }: CommandItemProps) {
  return (
    <Command.Item
      value={`${command.title} ${command.keywords.join(" ")}`}
      keywords={command.keywords}
      onSelect={() => onSelect(command)}
      className="flex cursor-pointer items-center justify-between gap-4 rounded-2xl px-4 py-3 text-sm text-muted-foreground outline-none transition aria-selected:bg-surface-elevated aria-selected:text-foreground data-[selected=true]:bg-surface-elevated data-[selected=true]:text-foreground"
    >
      <span className="min-w-0">
        <span className="block truncate font-bold">{command.title}</span>
        <span className="text-xs text-muted-foreground">{command.group}</span>
      </span>
      <span className="hidden max-w-[45%] truncate text-xs text-muted-foreground sm:block">
        {command.href}
      </span>
    </Command.Item>
  );
}
