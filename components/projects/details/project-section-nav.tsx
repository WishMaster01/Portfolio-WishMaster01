"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import {
  getProjectNavigation,
  isProjectNavItemActive,
} from "@/lib/projects/navigation";
import { cn } from "@/lib/utils";

type ProjectSectionNavProps = {
  slug: string;
  className?: string;
};

export function ProjectSectionNav({ slug, className }: ProjectSectionNavProps) {
  const pathname = usePathname();
  const items = getProjectNavigation(slug);
  const shouldReduceMotion = useReducedMotion();

  return (
    <nav
      aria-label="Project sections"
      className={cn(
        "sticky top-20 z-30 border-b border-border bg-background/90 backdrop-blur-xl",
        className,
      )}
    >
      <div className="flex gap-1 overflow-x-auto pb-px">
        {items.map((item) => {
          const active = isProjectNavItemActive(pathname, item.href, slug);

          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={cn(
                "relative whitespace-nowrap px-4 py-3 text-sm font-black transition",
                active
                  ? "text-accent"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {item.label}
              {active ? (
                shouldReduceMotion ? (
                  <span className="absolute inset-x-3 bottom-0 h-0.5 rounded-full bg-accent" />
                ) : (
                  <motion.span
                    layoutId={`project-section-nav-${slug}`}
                    className="absolute inset-x-3 bottom-0 h-0.5 rounded-full bg-accent shadow-sm shadow-accent/40"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )
              ) : (
                <span className="absolute inset-x-3 bottom-0 h-0.5 scale-x-0 rounded-full bg-accent/40 transition group-hover:scale-x-100" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
