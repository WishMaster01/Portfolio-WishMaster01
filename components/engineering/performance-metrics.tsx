"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Reveal } from "@/components/motion/reveal";
import type { PerformanceMetric } from "@/types/engineering";

type PerformanceMetricsProps = {
  metrics: PerformanceMetric[];
};

export function PerformanceMetrics({ metrics }: PerformanceMetricsProps) {
  const shouldReduceMotion = useReducedMotion();

  if (metrics.length === 0) {
    return (
      <section id="performance" aria-labelledby="performance-heading" className="scroll-mt-28">
        <Reveal>
          <p className="text-xs font-black uppercase tracking-[0.22em] text-accent">
            Measured performance
          </p>
          <h2
            id="performance-heading"
            className="mt-2 text-3xl font-black tracking-[-0.04em] sm:text-4xl"
          >
            No verified metrics yet
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">
            This section only displays numbers produced by real tools or monitoring.
            Lighthouse, uptime, and API latency data will appear here once measured.
          </p>
        </Reveal>
      </section>
    );
  }

  return (
    <section id="performance" aria-labelledby="performance-heading" className="scroll-mt-28">
      <Reveal>
        <p className="text-xs font-black uppercase tracking-[0.22em] text-accent">
          Measured performance
        </p>
        <h2
          id="performance-heading"
          className="mt-2 text-3xl font-black tracking-[-0.04em] sm:text-4xl"
        >
          Tool-produced signals
        </h2>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">
          These values come from a local Next.js production build — not estimated
          Web Vitals or invented uptime figures.
        </p>
      </Reveal>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {metrics.map((metric, index) => (
          <Reveal key={`${metric.metric}-${metric.measuredAt}`} delay={index * 0.05}>
            <motion.article
              whileHover={shouldReduceMotion ? undefined : { y: -4, scale: 1.01 }}
              transition={{ type: "spring", stiffness: 320, damping: 22 }}
              className="relative overflow-hidden rounded-[1.75rem] border border-accent/20 bg-surface/90 p-6 shadow-sm shadow-foreground/5"
            >
              <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-accent/15 blur-2xl" />
              <p className="relative text-sm font-black uppercase tracking-[0.16em] text-muted-foreground">
                {metric.metric}
              </p>
              <p className="relative mt-3 text-4xl font-black tracking-[-0.05em] text-accent">
                {metric.value}
              </p>
              <p className="relative mt-4 text-xs leading-5 text-muted-foreground">
                {metric.environment}
              </p>
              <time
                dateTime={metric.measuredAt}
                className="relative mt-2 block text-xs font-black text-muted-foreground/80"
              >
                Measured {metric.measuredAt}
              </time>
            </motion.article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
