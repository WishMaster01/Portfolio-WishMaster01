"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Reveal } from "@/components/motion/reveal";

type ChecklistColumn = {
  id: string;
  title: string;
  description: string;
  items: string[];
};

type ReliabilityChecklistProps = {
  reliability: string[];
  security: string[];
  monitoring: string[];
};

function ChecklistColumnBlock({
  column,
  index,
}: {
  column: ChecklistColumn;
  index: number;
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <Reveal delay={index * 0.05}>
      <section
        aria-labelledby={`${column.id}-heading`}
        className="h-full rounded-[1.75rem] border border-border bg-surface/85 p-5 shadow-sm shadow-foreground/5 backdrop-blur"
      >
        <p className="text-xs font-black uppercase tracking-[0.22em] text-accent">
          {column.title}
        </p>
        <h3
          id={`${column.id}-heading`}
          className="mt-2 text-xl font-black tracking-[-0.025em]"
        >
          {column.description}
        </h3>

        <ul className="mt-5 grid gap-3">
          {column.items.map((item, itemIndex) => (
            <motion.li
              key={item}
              initial={shouldReduceMotion ? false : { opacity: 0, x: -8 }}
              whileInView={shouldReduceMotion ? undefined : { opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: itemIndex * 0.04, duration: 0.35 }}
              className="flex gap-3 rounded-2xl border border-border bg-background/60 p-3 text-sm leading-6 text-muted-foreground"
            >
              <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-accent shadow-sm shadow-accent/40" />
              <span>{item}</span>
            </motion.li>
          ))}
        </ul>
      </section>
    </Reveal>
  );
}

export function ReliabilityChecklist({
  reliability,
  security,
  monitoring,
}: ReliabilityChecklistProps) {
  const columns: ChecklistColumn[] = [
    {
      id: "reliability",
      title: "Reliability",
      description: "Failure handling and recovery",
      items: reliability,
    },
    {
      id: "security",
      title: "Security",
      description: "Access and data boundaries",
      items: security,
    },
    {
      id: "monitoring",
      title: "Monitoring",
      description: "Observability and signals",
      items: monitoring,
    },
  ];

  return (
    <div id="reliability" className="scroll-mt-28 space-y-8">
      <Reveal>
        <p className="text-xs font-black uppercase tracking-[0.22em] text-accent">
          Production controls
        </p>
        <h2 className="mt-2 text-3xl font-black tracking-[-0.04em] sm:text-4xl">
          Reliability, security and monitoring
        </h2>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">
          Controls documented in the architecture and implemented or designed in
          the codebase — not generic compliance checklists.
        </p>
      </Reveal>

      <div className="grid gap-5 lg:grid-cols-3">
        {columns.map((column, index) => (
          <ChecklistColumnBlock key={column.id} column={column} index={index} />
        ))}
      </div>
    </div>
  );
}
