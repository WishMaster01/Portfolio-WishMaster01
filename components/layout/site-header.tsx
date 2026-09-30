"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { CommandPalette } from "@/components/command-palette/CommandPalette";
import { ThemeSwitcher } from "@/components/theme/ThemeSwitcher";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { buttonVariants } from "@/components/ui/button";
import { navigation } from "@/data/navigation";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const isProjectDetailPage = /^\/projects\/[^/]+$/.test(pathname);
  const drawerRef = useRef<HTMLDivElement>(null);
  const toggleButtonRef = useRef<HTMLButtonElement>(null);

  const [prevPathname, setPrevPathname] = useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setIsOpen(false);
  }

  // Handle escape key and focus trap when drawer is open
  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
        toggleButtonRef.current?.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (isProjectDetailPage) {
    return null;
  }

  return (
    <header className="print-hide sticky top-0 z-50 border-b border-border/80 bg-surface/85 text-foreground backdrop-blur-2xl shadow-sm">
      <div className="mx-auto flex h-16 w-full max-w-[1680px] items-center justify-between gap-3 px-4 sm:h-20 sm:px-8">
        <Link
          href="/"
          className="flex min-w-0 items-center gap-2.5 font-black tracking-tight sm:gap-3.5 group"
          onClick={() => setIsOpen(false)}
        >
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-tr from-cyan-500/20 via-accent/20 to-purple-500/20 border border-accent/30 text-xl font-black leading-none text-accent sm:h-11 sm:w-11 sm:text-2xl shadow-sm group-hover:scale-105 transition-transform">
            SK
          </span>
          <div className="hidden min-w-0 flex-col md:flex">
            <span className="truncate text-base font-black tracking-tight text-foreground xl:text-lg leading-tight">
              Sumit Kumar
            </span>
            <span className="text-[10px] font-mono font-bold text-accent tracking-wider">
              @WishMaster01
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav
          className="hidden items-center gap-1 xl:flex 2xl:gap-2.5"
          aria-label="Primary navigation"
        >
          {navigation.main.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname === item.href || pathname.startsWith(`${item.href}/`);

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "relative rounded-lg px-3 py-1.5 text-xs font-bold transition hover:bg-accent/10 hover:text-accent 2xl:text-sm",
                  isActive
                    ? "text-accent font-black after:absolute after:inset-x-3 after:-bottom-3.5 after:h-0.5 after:rounded-full after:bg-accent"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Desktop CTAs */}
        <div className="hidden items-center gap-2.5 xl:flex">
          <CommandPalette compact />
          <ThemeSwitcher compact={false} />
          <Link
            href="/recruiter"
            className={buttonVariants({
              size: "md",
              className:
                "h-9 rounded-full px-4 text-xs font-black shadow-lg shadow-accent/20 bg-accent text-accent-foreground hover:opacity-95 transition-all hover:scale-[1.02]",
            })}
          >
            <span>Recruiter View</span>
            <span aria-hidden="true" className="text-xs">⚡</span>
          </Link>
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-2 xl:hidden">
          <CommandPalette compact />
          <ThemeToggle />
          <button
            ref={toggleButtonRef}
            type="button"
            aria-expanded={isOpen}
            aria-controls="mobile-navigation"
            aria-label="Toggle navigation menu"
            className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-surface text-foreground hover:bg-accent/10 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            onClick={() => setIsOpen((prev) => !prev)}
          >
            <span className="sr-only">Toggle navigation</span>
            {isOpen ? (
              <span className="text-base font-bold">✕</span>
            ) : (
              <span className="flex flex-col gap-1.5">
                <span className="h-0.5 w-4 rounded-full bg-current" />
                <span className="h-0.5 w-4 rounded-full bg-current" />
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Accessible Mobile Drawer */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation"
          className="fixed inset-x-0 top-16 bottom-0 z-50 flex flex-col bg-background/95 backdrop-blur-2xl sm:top-20 xl:hidden"
        >
          <div
            ref={drawerRef}
            id="mobile-navigation"
            className="flex-1 overflow-y-auto px-6 py-6 space-y-6"
          >
            <div className="p-1 space-y-3">
              <Link
                href="/recruiter"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-between rounded-2xl bg-accent p-4 text-accent-foreground shadow-lg shadow-accent/25 transition hover:opacity-90"
              >
                <div>
                  <span className="text-xs font-black uppercase tracking-wider opacity-90 block">
                    Fast Candidate Evaluation
                  </span>
                  <span className="text-base font-black block">
                    Open Recruiter View
                  </span>
                </div>
                <span className="text-xl">⚡</span>
              </Link>

              {/* Mobile Theme Selection */}
              <div className="rounded-2xl border border-border bg-surface p-3.5 flex items-center justify-between">
                <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                  Theme
                </span>
                <ThemeSwitcher compact={false} />
              </div>
            </div>

            <nav aria-label="Mobile main navigation" className="grid gap-1">
              {navigation.main.map((item) => {
                const isActive =
                  item.href === "/"
                    ? pathname === "/"
                    : pathname === item.href || pathname.startsWith(`${item.href}/`);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={isActive ? "page" : undefined}
                    className={cn(
                      "flex items-center justify-between rounded-xl px-4 py-3 text-base font-bold transition",
                      isActive
                        ? "bg-accent/15 text-accent"
                        : "text-foreground hover:bg-surface hover:text-accent",
                    )}
                    onClick={() => setIsOpen(false)}
                  >
                    <span>{item.label}</span>
                    <span className="text-xs text-muted-foreground" aria-hidden="true">→</span>
                  </Link>
                );
              })}
            </nav>

            <div className="border-t border-border pt-4 grid grid-cols-2 gap-3">
              <Link
                href="/resume/WishMaster01-Resume.pdf"
                target="_blank"
                rel="noreferrer"
                onClick={() => setIsOpen(false)}
                className="flex h-11 items-center justify-center rounded-xl border border-accent/40 bg-accent/10 text-xs font-bold text-accent transition hover:bg-accent hover:text-accent-foreground"
              >
                Resume PDF
              </Link>
              <Link
                href="/contact"
                onClick={() => setIsOpen(false)}
                className="flex h-11 items-center justify-center rounded-xl border border-border bg-surface text-xs font-bold text-foreground transition hover:border-accent/40 hover:text-accent"
              >
                Get In Touch
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
