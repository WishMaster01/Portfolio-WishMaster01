"use client";

import {
  useDeferredValue,
  useEffect,
  useMemo,
  useState,
  useSyncExternalStore,
} from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import { Command } from "cmdk";
import { AnimatePresence, motion } from "framer-motion";
import {
  buildSearchIndex,
  searchIndex,
} from "@/lib/algorithms/text-search";
import { cn } from "@/lib/utils";
import { CommandGroup } from "./CommandGroup";
import { CommandItem } from "./CommandItem";
import { CommandSearch } from "./CommandSearch";
import { commands, type CommandRecord } from "./commands";

type CommandPaletteProps = {
  compact?: boolean;
};

const groupOrder: CommandRecord["group"][] = [
  "Pages",
  "Projects",
  "Blog",
  "DSA",
  "Skills",
];

function subscribeToHydration() {
  return () => undefined;
}

function getClientHydrationSnapshot() {
  return true;
}

function getServerHydrationSnapshot() {
  return false;
}

export function CommandPalette({ compact = false }: CommandPaletteProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);
  const isMounted = useSyncExternalStore(
    subscribeToHydration,
    getClientHydrationSnapshot,
    getServerHydrationSnapshot,
  );

  const commandIndex = useMemo(
    () =>
      buildSearchIndex(
        commands.map((command) => ({
          id: command.id,
          title: command.title,
          body: [command.group, command.href, command.keywords.join(" ")].join(" "),
          keywords: command.keywords,
          payload: command,
        })),
      ),
    [],
  );

  const rankedCommands = useMemo(() => {
    if (!deferredQuery.trim()) {
      return commands;
    }

    return searchIndex(commandIndex, deferredQuery, commands.length).map(
      (result) => result.item,
    );
  }, [commandIndex, deferredQuery]);

  const groupedCommands = useMemo(
    () =>
      groupOrder.map((group) => ({
        group,
        items: rankedCommands.filter((command) => command.group === group),
      })),
    [rankedCommands],
  );

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      const isCommandKey = event.metaKey || event.ctrlKey;

      if (isCommandKey && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setIsOpen((value) => !value);
      }

      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  function selectCommand(command: CommandRecord) {
    setIsOpen(false);
    setQuery("");
    router.push(command.href);
  }

  const dialog = (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-start justify-center overflow-y-auto bg-slate-950/60 px-3 pb-8 pt-24 backdrop-blur-sm sm:px-4 sm:pt-28"
          role="dialog"
          aria-modal="true"
          aria-label="Command palette"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={() => setIsOpen(false)}
        >
          <motion.div
            className="w-full max-w-2xl overflow-hidden rounded-3xl border border-border bg-background text-foreground shadow-2xl shadow-slate-950/40"
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.18 }}
            onMouseDown={(event) => event.stopPropagation()}
          >
            <Command
              loop
              shouldFilter={false}
              className="bg-background text-foreground"
            >
              <CommandSearch
                onClose={() => setIsOpen(false)}
                value={query}
                onValueChange={setQuery}
              />
              <Command.List className="max-h-[min(58dvh,32rem)] overflow-y-auto p-2">
                <Command.Empty className="px-4 py-10 text-center text-sm text-muted-foreground">
                  No matching command found.
                </Command.Empty>

                {groupedCommands.map(({ group, items }) => (
                  <CommandGroup key={group} heading={group}>
                    {items.map((command) => (
                      <CommandItem
                        key={command.id}
                        command={command}
                        onSelect={selectCommand}
                      />
                    ))}
                  </CommandGroup>
                ))}
              </Command.List>
              <div className="flex items-center justify-between gap-4 border-t border-border px-4 py-3 text-xs text-muted-foreground">
                <span>Trie prefix ranking, fuzzy matching, Enter to open</span>
                <span>Ctrl K / Cmd K</span>
              </div>
            </Command>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );

  return (
    <>
      <button
        type="button"
        className={cn(
          "inline-flex h-10 items-center gap-2 rounded-xl border border-border bg-surface px-3 text-sm font-medium text-muted-foreground transition hover:text-foreground",
          compact &&
            "h-12 w-16 justify-center border-border bg-surface px-0 font-bold text-foreground",
        )}
        onClick={() => setIsOpen(true)}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
      >
        <span aria-hidden="true">{compact ? "Ctrl K" : "Search"}</span>
        <span className={cn(compact && "sr-only")}>Search</span>
        {!compact ? (
          <kbd className="rounded-md border border-border px-1.5 py-0.5 text-[10px] text-muted-foreground">
            Ctrl K
          </kbd>
        ) : null}
      </button>

      {isMounted ? createPortal(dialog, document.body) : null}
    </>
  );
}
