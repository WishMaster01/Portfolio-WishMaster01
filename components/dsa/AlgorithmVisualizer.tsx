"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { AlgorithmTopic } from "@/types/dsa";

type AlgorithmVisualizerProps = {
  topic: AlgorithmTopic;
};

export function AlgorithmVisualizer({ topic }: AlgorithmVisualizerProps) {
  const shouldReduceMotion = useReducedMotion();
  const nodes = topic.patterns.slice(0, 5);

  return (
    <div className="overflow-hidden rounded-3xl border border-border bg-surface p-5">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.24em] text-accent">
            Visual explanation
          </p>
          <h2 className="mt-2 text-xl font-black">{topic.title} flow</h2>
        </div>
        <span className="rounded-full bg-accent/10 px-3 py-1 text-xs font-black text-accent">
          Read-only trace
        </span>
      </div>

      <p className="mt-4 text-sm leading-7 text-muted-foreground">
        {topic.visualExplanation}
      </p>

      <div className="mt-6 grid gap-3 sm:grid-cols-5">
        {nodes.map((node, index) => (
          <motion.div
            key={node}
            initial={shouldReduceMotion ? false : { opacity: 0, y: 14 }}
            whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ delay: index * 0.06, duration: 0.35 }}
            className="relative rounded-2xl border border-border bg-background/75 p-4"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent text-sm font-black text-accent-foreground">
              {index + 1}
            </div>
            <h3 className="mt-4 text-sm font-black">{node}</h3>
            <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-foreground/10">
              <motion.div
                className="h-full rounded-full bg-accent"
                initial={shouldReduceMotion ? false : { width: 0 }}
                whileInView={
                  shouldReduceMotion
                    ? undefined
                    : { width: `${Math.min(100, 35 + index * 16)}%` }
                }
                viewport={{ once: true }}
                transition={{ delay: 0.15 + index * 0.07, duration: 0.45 }}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
