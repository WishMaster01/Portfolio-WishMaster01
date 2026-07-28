"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Reveal } from "@/components/motion/reveal";
import type { TestSuite, TestSuiteStatus } from "@/types/engineering";
import { cn } from "@/lib/utils";

const statusStyles: Record<TestSuiteStatus, string> = {
  Implemented:
    "border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
  Partial: "border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-300",
  Planned: "border-border bg-background/70 text-muted-foreground",
};

type TestSuiteGridProps = {
  suites: TestSuite[];
};

export function TestSuiteGrid({ suites }: TestSuiteGridProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="testing" aria-labelledby="testing-heading" className="scroll-mt-28">
      <Reveal>
        <p className="text-xs font-black uppercase tracking-[0.22em] text-accent">
          Validation layers
        </p>
        <h2
          id="testing-heading"
          className="mt-2 text-3xl font-black tracking-[-0.04em] sm:text-4xl"
        >
          Testing strategy
        </h2>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">
          Each layer documents what is validated today versus what is planned.
          Status labels reflect the current codebase — not aspirational coverage
          percentages.
        </p>
      </Reveal>

      <div className="mt-8 grid gap-5 md:grid-cols-2">
        {suites.map((suite, index) => (
          <Reveal key={`${suite.type}-${suite.status}`} delay={index * 0.05}>
            <motion.article
              whileHover={shouldReduceMotion ? undefined : { y: -4 }}
              transition={{ type: "spring", stiffness: 320, damping: 24 }}
              className="group h-full rounded-[1.75rem] border border-border bg-surface/85 p-5 shadow-sm shadow-foreground/5 backdrop-blur"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <h3 className="text-xl font-black tracking-[-0.025em]">{suite.type}</h3>
                <span
                  className={cn(
                    "rounded-full border px-3 py-1 text-xs font-black uppercase tracking-[0.14em]",
                    statusStyles[suite.status],
                  )}
                >
                  {suite.status}
                </span>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {suite.tools.map((tool) => (
                  <span
                    key={tool}
                    className="rounded-full border border-accent/20 bg-accent/10 px-3 py-1 text-xs font-black text-accent"
                  >
                    {tool}
                  </span>
                ))}
              </div>

              <p className="mt-4 text-sm leading-7 text-muted-foreground">{suite.coverage}</p>

              <div className="mt-5 h-1 overflow-hidden rounded-full bg-border">
                <motion.div
                  initial={shouldReduceMotion ? false : { width: 0 }}
                  whileInView={
                    shouldReduceMotion
                      ? undefined
                      : {
                          width:
                            suite.status === "Implemented"
                              ? "100%"
                              : suite.status === "Partial"
                                ? "55%"
                                : "18%",
                        }
                  }
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: "easeOut", delay: index * 0.06 }}
                  className={cn(
                    "h-full rounded-full",
                    suite.status === "Implemented"
                      ? "bg-emerald-500"
                      : suite.status === "Partial"
                        ? "bg-amber-500"
                        : "bg-muted-foreground/40",
                  )}
                />
              </div>
            </motion.article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
