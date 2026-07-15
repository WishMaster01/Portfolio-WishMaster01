"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { articles } from "@/data/blog";
import { navigation } from "@/data/navigation";
import { projects } from "@/data/projects";
import { cn } from "@/lib/utils";

type CommandPaletteProps = {
  compact?: boolean;
};

type CommandItem = {
  href: string;
  label: string;
  group: string;
  keywords: string;
};

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
  const inputRef = useRef<HTMLInputElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const isMounted = useSyncExternalStore(
    subscribeToHydration,
    getClientHydrationSnapshot,
    getServerHydrationSnapshot,
  );
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);

  const items = useMemo<CommandItem[]>(
    () => [
      ...navigation.main.map((item) => ({
        href: item.href,
        label: item.label,
        group: "Pages",
        keywords: `${item.label} ${item.href}`,
      })),
      ...projects.map((project) => ({
        href: `/projects/${project.slug}`,
        label: project.title,
        group: "Projects",
        keywords: [
          project.title,
          project.category,
          project.summary,
          project.stack.join(" "),
        ].join(" "),
      })),
      ...articles.map((article) => ({
        href: `/blog/${article.slug}`,
        label: article.title,
        group: "Blog",
        keywords: [
          article.title,
          article.excerpt,
          article.category,
          article.tags.join(" "),
        ].join(" "),
      })),
    ],
    [],
  );

  const results = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
      return items;
    }

    return items.filter((item) =>
      item.keywords.toLowerCase().includes(normalizedQuery),
    );
  }, [items, query]);

  const safeActiveIndex = results.length
    ? Math.min(activeIndex, results.length - 1)
    : 0;

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    inputRef.current?.focus();
  }, [isOpen]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const isCommandKey = event.metaKey || event.ctrlKey;

      if (isCommandKey && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setIsOpen((value) => {
          if (!value) {
            setQuery("");
            setActiveIndex(0);
          }

          return !value;
        });
      }

      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  function selectItem(item: CommandItem) {
    setIsOpen(false);
    setQuery("");
    setActiveIndex(0);
    router.push(item.href);
  }

  function openPalette() {
    setQuery("");
    setActiveIndex(0);
    setIsOpen(true);
  }

  function handleInputKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((index) => Math.min(index + 1, results.length - 1));
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((index) => Math.max(index - 1, 0));
    }

    if (event.key === "Enter" && results[safeActiveIndex]) {
      event.preventDefault();
      selectItem(results[safeActiveIndex]);
    }
  }

  const paletteDialog = (
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
            <div className="border-b border-border p-4">
              <label className="sr-only" htmlFor="command-search">
                Search pages, projects, and blog posts
              </label>
              <input
                ref={inputRef}
                id="command-search"
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value);
                  setActiveIndex(0);
                }}
                onKeyDown={handleInputKeyDown}
                placeholder="Search pages, projects, blog posts..."
                className="h-12 w-full bg-transparent text-base text-foreground outline-none placeholder:text-muted-foreground"
              />
            </div>
            <div className="max-h-[min(58dvh,32rem)] overflow-y-auto p-2">
              {results.length ? (
                results.map((item, index) => (
                  <button
                    key={`${item.group}-${item.label}-${item.href}`}
                    type="button"
                    className={cn(
                      "flex w-full items-center justify-between gap-4 rounded-2xl px-4 py-3 text-left transition",
                      index === safeActiveIndex
                        ? "bg-surface-elevated text-foreground"
                        : "text-muted-foreground hover:bg-surface hover:text-foreground",
                    )}
                    onMouseEnter={() => setActiveIndex(index)}
                    onClick={() => selectItem(item)}
                  >
                    <span className="min-w-0">
                      <span className="block truncate font-medium">
                        {item.label}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {item.group}
                      </span>
                    </span>
                    <span className="hidden max-w-[45%] truncate text-xs text-muted-foreground sm:block">
                      {item.href}
                    </span>
                  </button>
                ))
              ) : (
                <div className="px-4 py-10 text-center text-sm text-muted-foreground">
                  No matching command found.
                </div>
              )}
            </div>
            <div className="flex items-center justify-between gap-4 border-t border-border px-4 py-3 text-xs text-muted-foreground">
              <span>Use arrows to move, Enter to open, Esc to close</span>
              <Link href="/projects" onClick={() => setIsOpen(false)}>
                Browse projects
              </Link>
            </div>
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
        onClick={openPalette}
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

      {isMounted ? createPortal(paletteDialog, document.body) : null}
    </>
  );
}
