"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Reveal } from "@/components/motion/reveal";

type PipelineSectionProps = {
  steps: string[];
};

export function PipelineSection({ steps }: PipelineSectionProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="pipeline" aria-labelledby="pipeline-heading" className="scroll-mt-28">
      <Reveal>
        <p className="text-xs font-black uppercase tracking-[0.22em] text-accent">
          Delivery pipeline
        </p>
        <h2
          id="pipeline-heading"
          className="mt-2 text-3xl font-black tracking-[-0.04em] sm:text-4xl"
        >
          CI and validation gates
        </h2>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">
          Current quality gates run locally and are documented in the README.
          GitHub Actions automation is planned — nothing here claims a CI badge
          that does not exist yet.
        </p>
      </Reveal>

      <div className="mt-8 rounded-[2rem] border border-border bg-surface/85 p-6 sm:p-8">
        <ol className="relative grid gap-0">
          {steps.map((step, index) => (
            <Reveal key={step} delay={index * 0.05}>
              <li className="relative flex gap-4 pb-8 last:pb-0">
                {index < steps.length - 1 ? (
                  <span className="absolute left-[21px] top-11 h-[calc(100%-2.75rem)] w-px bg-accent/30" />
                ) : null}

                <motion.span
                  initial={shouldReduceMotion ? false : { scale: 0.8, opacity: 0 }}
                  whileInView={shouldReduceMotion ? undefined : { scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.06, type: "spring", stiffness: 280 }}
                  className="relative z-10 grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-accent text-sm font-black text-accent-foreground shadow-lg shadow-accent/25"
                >
                  {index + 1}
                </motion.span>

                <div className="min-w-0 flex-1 rounded-2xl border border-border bg-background/60 px-4 py-3 sm:px-5 sm:py-4">
                  <p className="text-sm font-black text-foreground">{step}</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Gate {index + 1} of {steps.length}
                  </p>
                </div>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
