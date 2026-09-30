"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type TechnologyBadgeProps = {
  name: string;
  category?: string;
  projectContext?: string;
  className?: string;
};

export function TechnologyBadge({
  name,
  category,
  projectContext,
  className = "",
}: TechnologyBadgeProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.span
      whileHover={
        !shouldReduceMotion ? { scale: 1.05, y: -2 } : undefined
      }
      transition={{ duration: 0.2, ease: "easeOut" }}
      title={projectContext ? `${name} • Used in: ${projectContext}` : name}
      className={cn(
        "group inline-flex items-center gap-1.5 rounded-full border border-border/70 bg-surface/75 px-3 py-1 text-xs font-bold text-foreground shadow-xs backdrop-blur-md transition-all hover:border-accent/50 hover:bg-accent/15 hover:text-accent hover:shadow-sm hover:shadow-accent/20",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className="h-1.5 w-1.5 rounded-full bg-gradient-to-tr from-[var(--ambient-one)] to-[var(--ambient-two)] group-hover:scale-125 transition-transform duration-200"
      />
      <span>{name}</span>
      {category ? (
        <span className="text-[10px] opacity-60 font-normal">
          ({category})
        </span>
      ) : null}
    </motion.span>
  );
}
