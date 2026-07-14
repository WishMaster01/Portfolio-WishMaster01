"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navigation } from "@/data/navigation";
import { siteConfig } from "@/data/site";

export function SiteFooter() {
  const pathname = usePathname();
  const isProjectDetailPage = /^\/projects\/[^/]+$/.test(pathname);

  if (isProjectDetailPage) {
    return null;
  }

  return (
    <footer className="border-t border-border bg-surface/60">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-6 py-10 sm:px-8 lg:px-10">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-start">
          <div className="max-w-md space-y-3">
            <Link href="/" className="text-lg font-semibold tracking-tight">
              {siteConfig.name}
            </Link>
            <p className="text-sm leading-6 text-muted-foreground">
              {siteConfig.description}
            </p>
          </div>
          <nav
            aria-label="Footer navigation"
            className="flex flex-wrap gap-x-5 gap-y-3 text-sm text-muted-foreground"
          >
            {navigation.main.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="transition hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex flex-col justify-between gap-3 border-t border-border pt-6 text-sm text-muted-foreground sm:flex-row">
          <p>
            © {new Date().getFullYear()} {siteConfig.creator}. All rights
            reserved.
          </p>
          <p>Built with Next.js, TypeScript, Tailwind, and Framer Motion.</p>
        </div>
      </div>
    </footer>
  );
}
