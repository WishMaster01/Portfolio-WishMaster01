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
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/85 text-slate-950 backdrop-blur-xl">
      <div className="mx-auto flex h-20 w-full max-w-[1680px] items-center justify-between px-5 sm:px-8 lg:px-8">
        <Link
          href="/"
          className="flex items-center gap-4 font-black tracking-tight"
          onClick={() => setIsOpen(false)}
        >
          <span className="grid h-12 w-12 place-items-center text-5xl font-black leading-none text-violet-600">
            W
          </span>
          <span className="hidden text-2xl sm:inline">{siteConfig.name}</span>
        </Link>

        <nav
          className="hidden items-center gap-8 xl:flex"
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
                  "relative py-7 text-base font-semibold text-slate-950 transition hover:text-violet-600",
                  isActive &&
                    "text-violet-600 after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:rounded-full after:bg-violet-600",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <CommandPalette compact />
          <ThemeToggle />
          <Link
            href="/contact"
            className={buttonVariants({
              size: "md",
              className:
                "h-12 rounded-xl bg-violet-600 px-6 text-white shadow-xl shadow-violet-500/25 hover:bg-violet-700",
            })}
          >
            Get In Touch
            <span aria-hidden="true">→</span>
          </Link>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <CommandPalette compact />
          <ThemeToggle />
          <button
            type="button"
            aria-expanded={isOpen}
            aria-controls="mobile-navigation"
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-950"
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
          className="border-t border-slate-200 bg-white px-6 py-4 lg:hidden"
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
                    isActive && "bg-violet-50 text-violet-600",
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
