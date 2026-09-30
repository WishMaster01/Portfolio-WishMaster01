"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type GlassCardProps = {
  children: React.ReactNode;
  className?: string;
  hoverGlow?: boolean;
  elevation?: boolean;
  interactive?: boolean;
  onClick?: () => void;
};

export function GlassCard({
  children,
  className = "",
  hoverGlow = true,
  elevation = true,
  interactive = false,
  onClick,
}: GlassCardProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      onClick={onClick}
      whileHover={
        !shouldReduceMotion && elevation
          ? { y: -4, transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] } }
          : undefined
      }
      className={cn(
        "group relative overflow-hidden rounded-[2rem] border border-border/80 bg-surface/85 p-6 shadow-sm shadow-foreground/5 backdrop-blur-xl transition-colors duration-300",
        hoverGlow &&
          "hover:border-accent/45 hover:shadow-xl hover:shadow-accent/10 dark:hover:border-accent/50 dark:hover:shadow-2xl dark:hover:shadow-accent/15",
        interactive && "cursor-pointer",
        className,
      )}
    >
      {/* Top Aurora Gradient Beam on Hover */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-accent/70 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      />

      {/* Aurora Ambient Glow Sheen */}
      {hoverGlow ? (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-20 -top-20 h-52 w-52 rounded-full bg-gradient-to-br from-[var(--ambient-one)] via-[var(--ambient-two)] to-transparent opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-30"
        />
      ) : null}

      {children}
    </motion.div>
  );
}
