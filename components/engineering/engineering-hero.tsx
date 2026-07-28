"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";

type EngineeringHeroProps = {
  title: string;
  slug: string;
  category: string;
  liveUrl: string;
  githubUrl: string;
  testingSummary: string;
  suiteCount: number;
  metricCount: number;
  controlCount: number;
};

export function EngineeringHero({
  title,
  slug,
  category,
  liveUrl,
  githubUrl,
  testingSummary,
  suiteCount,
  metricCount,
  controlCount,
}: EngineeringHeroProps) {
  const shouldReduceMotion = useReducedMotion();

  const stats = [
    { label: "Test layers", value: suiteCount, detail: "Documented validation strategy" },
    { label: "Measured signals", value: metricCount, detail: "Tool-produced build metrics" },
    { label: "Reliability controls", value: controlCount, detail: "Production failure mitigations" },
  ];

  return (
    <Reveal>
      <section className="relative overflow-hidden rounded-[2.5rem] border border-accent/20 bg-surface/90 p-6 shadow-2xl shadow-accent/10 backdrop-blur sm:p-8 lg:p-10">
        <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-accent/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 left-1/3 h-80 w-80 rounded-full bg-[color-mix(in_oklab,var(--ambient-two)_18%,transparent)] blur-3xl" />

        <div className="relative grid gap-8 lg:grid-cols-[minmax(0,1fr)_380px] lg:items-center">
          <div>
            <Link
              href={`/projects/${slug}`}
              className="inline-flex text-sm font-black text-accent transition hover:opacity-75"
            >
              ← Back to project details
            </Link>

            <p className="mt-6 inline-flex rounded-full border border-accent/25 bg-accent/10 px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-accent">
              Engineering quality
            </p>
            <h1 className="mt-5 max-w-4xl text-4xl font-black tracking-[-0.06em] sm:text-5xl lg:text-6xl">
              Testing, performance and reliability
            </h1>
            <p className="mt-3 text-base font-black text-accent sm:text-lg">{title}</p>
            <p className="mt-1 text-sm font-black text-muted-foreground">{category}</p>
            <p className="mt-5 max-w-3xl text-sm leading-7 text-muted-foreground sm:text-base sm:leading-8">
              {testingSummary}
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <Button asChild>
                <a href={liveUrl} target="_blank" rel="noreferrer">
                  Live Demo
                </a>
              </Button>
              <Button asChild variant="secondary">
                <a href={githubUrl} target="_blank" rel="noreferrer">
                  GitHub Repository
                </a>
              </Button>
              <Button asChild variant="secondary">
                <Link href={`/projects/${slug}/architecture`}>Architecture</Link>
              </Button>
              <Button asChild variant="secondary">
                <Link href={`/projects/${slug}/case-study`}>Case Study</Link>
              </Button>
            </div>
          </div>

          <div className="relative rounded-[2rem] border border-border bg-background/65 p-5 shadow-xl shadow-foreground/5">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-muted-foreground">
              Evidence model
            </p>
            <div className="mt-4 grid gap-3">
              {[
                ["Validate", "Lint, types, build"],
                ["Measure", "Real tool output only"],
                ["Harden", "Reliability + security"],
                ["Ship", "Documented pipeline"],
              ].map(([label, value], index) => (
                <motion.div
                  key={label}
                  initial={shouldReduceMotion ? false : { opacity: 0, x: 12 }}
                  whileInView={shouldReduceMotion ? undefined : { opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08, duration: 0.4 }}
                  className="relative flex items-center gap-3"
                >
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-accent/10 text-xs font-black text-accent ring-1 ring-accent/20">
                    {index + 1}
                  </span>
                  <div className="min-w-0 flex-1 rounded-2xl border border-border bg-surface/85 px-4 py-3">
                    <p className="text-[10px] font-black uppercase tracking-[0.18em] text-muted-foreground">
                      {label}
                    </p>
                    <p className="mt-1 text-sm font-black text-foreground">{value}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <div className="relative mt-8 grid gap-4 md:grid-cols-3">
          {stats.map((stat, index) => (
            <Reveal key={stat.label} delay={index * 0.04}>
              <article className="rounded-[1.75rem] border border-border bg-background/55 p-5">
                <p className="text-3xl font-black text-accent">{stat.value}</p>
                <h2 className="mt-2 text-lg font-black tracking-[-0.025em]">{stat.label}</h2>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{stat.detail}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>
    </Reveal>
  );
}
