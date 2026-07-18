"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { CommandPalette } from "@/components/command-palette/CommandPalette";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { buttonVariants } from "@/components/ui/button";
import { navigation } from "@/data/navigation";
import { siteConfig } from "@/data/site";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const isProjectDetailPage = /^\/projects\/[^/]+$/.test(pathname);

  if (isProjectDetailPage) {
    return null;
  }

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-surface/85 text-foreground backdrop-blur-xl">
      <div className="mx-auto flex h-20 w-full max-w-[1680px] items-center justify-between gap-4 px-5 sm:px-8 lg:px-8">
        <Link
          href="/"
          className="flex min-w-0 items-center gap-3 font-black tracking-tight sm:gap-4"
          onClick={() => setIsOpen(false)}
        >
          <span className="grid h-12 w-12 place-items-center text-5xl font-black leading-none text-accent">
            W
          </span>
          <span className="hidden truncate text-xl md:inline xl:text-2xl">
            {siteConfig.name}
          </span>
        </Link>

        <nav
          className="hidden items-center gap-5 2xl:flex"
          aria-label="Primary navigation"
        >
          {navigation.main.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "relative py-7 text-sm font-semibold text-foreground transition hover:text-accent 2xl:text-base",
                  isActive &&
                    "text-accent after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:rounded-full after:bg-accent",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-4 2xl:flex">
          <CommandPalette compact />
          <ThemeToggle />
          <Link
            href="/contact"
            className={buttonVariants({
              size: "md",
              className:
                "h-12 rounded-xl px-6 shadow-xl shadow-accent/25",
            })}
          >
            Get In Touch
            <span aria-hidden="true">→</span>
          </Link>
        </div>

        <div className="flex items-center gap-2 2xl:hidden">
          <CommandPalette compact />
          <ThemeToggle />
          <button
            type="button"
            aria-expanded={isOpen}
            aria-controls="mobile-navigation"
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-surface text-foreground"
            onClick={() => setIsOpen((value) => !value)}
          >
            <span className="sr-only">Toggle navigation</span>
            <span className="flex flex-col gap-1.5">
              <span className="h-0.5 w-5 rounded-full bg-current" />
              <span className="h-0.5 w-5 rounded-full bg-current" />
            </span>
          </button>
        </div>
      </div>

      {isOpen ? (
        <nav
          id="mobile-navigation"
          aria-label="Mobile navigation"
          className="border-t border-border bg-surface px-6 py-4 2xl:hidden"
        >
          <div className="grid max-h-[calc(100dvh-6rem)] gap-2 overflow-y-auto">
            {navigation.main.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "rounded-xl px-3 py-2 text-sm font-medium text-muted-foreground transition hover:bg-accent/10 hover:text-accent",
                    isActive && "bg-accent/10 text-accent",
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </nav>
      ) : null}
    </header>
  );
}
