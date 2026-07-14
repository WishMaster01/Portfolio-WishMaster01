"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
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

export function CommandPalette({ compact = false }: CommandPaletteProps) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [isOpen, setIsOpen] = useState(false);
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
        href: "/blog",
        label: article.title,
        group: "Blog",
        keywords: `${article.title} ${article.excerpt} ${article.category}`,
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

    if (event.key === "Enter" && results[activeIndex]) {
      event.preventDefault();
      selectItem(results[activeIndex]);
    }
  }

  return (
    <>
      <button
        type="button"
        className={cn(
          "inline-flex h-10 items-center gap-2 rounded-xl border border-border bg-surface px-3 text-sm font-medium text-muted-foreground transition hover:text-foreground",
          compact &&
            "h-12 w-14 justify-center border-slate-200 bg-white px-0 font-bold text-slate-700",
        )}
        onClick={openPalette}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
      >
        <span aria-hidden="true">{compact ? "⌘K" : "⌘"}</span>
        <span className={cn(compact && "sr-only")}>Search</span>
        {!compact ? (
          <kbd className="rounded-md border border-border px-1.5 py-0.5 text-[10px] text-muted-foreground">
            Ctrl K
          </kbd>
        ) : null}
      </button>

      <AnimatePresence>
        {isOpen ? (
          <motion.div
            className="fixed inset-0 z-[80] grid place-items-start bg-slate-950/50 px-4 py-20 backdrop-blur-sm sm:place-items-center sm:py-4"
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onMouseDown={() => setIsOpen(false)}
          >
            <motion.div
              className="w-full max-w-2xl overflow-hidden rounded-3xl border border-border bg-background shadow-2xl shadow-slate-950/30"
              initial={{ opacity: 0, y: 18, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.98 }}
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
                  placeholder="Search pages, projects, posts..."
                  className="h-12 w-full bg-transparent text-base outline-none placeholder:text-muted-foreground"
                />
              </div>
              <div className="max-h-[55dvh] overflow-y-auto p-2">
                {results.length ? (
                  results.map((item, index) => (
                    <button
                      key={`${item.group}-${item.label}-${item.href}`}
                      type="button"
                      className={cn(
                        "flex w-full items-center justify-between rounded-2xl px-4 py-3 text-left transition",
                        index === activeIndex
                          ? "bg-surface-elevated text-foreground"
                          : "text-muted-foreground hover:bg-surface hover:text-foreground",
                      )}
                      onMouseEnter={() => setActiveIndex(index)}
                      onClick={() => selectItem(item)}
                    >
                      <span>
                        <span className="block font-medium">{item.label}</span>
                        <span className="text-xs text-muted-foreground">
                          {item.group}
                        </span>
                      </span>
                      <span className="text-xs text-muted-foreground">
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
              <div className="flex items-center justify-between border-t border-border px-4 py-3 text-xs text-muted-foreground">
                <span>Use ↑ ↓ to move, Enter to open</span>
                <Link href="/projects" onClick={() => setIsOpen(false)}>
                  Browse projects
                </Link>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
