"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { CommandPalette } from "@/components/command/command-palette";
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
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-6 sm:px-8 lg:px-10">
        <Link
          href="/"
          className="flex items-center gap-3 font-semibold tracking-tight"
          onClick={() => setIsOpen(false)}
        >
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-foreground text-sm text-background">
            W
          </span>
          <span>{siteConfig.name}</span>
        </Link>

        <nav
          className="hidden items-center gap-1 xl:flex"
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
                  "rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition hover:bg-surface hover:text-foreground",
                  isActive && "bg-surface text-foreground",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <CommandPalette />
          <ThemeToggle />
          <Link href="/contact" className={buttonVariants({ size: "sm" })}>
            Contact
          </Link>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
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
          className="border-t border-border bg-background px-6 py-4 lg:hidden"
        >
          <div className="grid gap-2">
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
                    "rounded-xl px-3 py-2 text-sm font-medium text-muted-foreground",
                    isActive && "bg-surface text-foreground",
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
