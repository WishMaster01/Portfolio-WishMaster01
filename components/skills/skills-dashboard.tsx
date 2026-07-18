"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import {
  learningRoadmap,
  skillGroups,
  skillHighlights,
  skillMetrics,
  skillOverview,
  skillStrengths,
} from "@/data/skills";

export function SkillsDashboard() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="space-y-8">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {skillMetrics.map((metric, index) => (
          <motion.div
            key={metric.label}
            initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
            whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ delay: index * 0.05, duration: 0.35 }}
          >
            <Card className="h-full overflow-hidden rounded-3xl bg-surface/95">
              <CardContent className="relative p-5">
                <div className="absolute right-0 top-0 h-24 w-24 rounded-bl-full bg-accent/10" />
                <p className="relative text-3xl font-black text-accent">
                  {metric.value}
                </p>
                <p className="relative mt-1 font-black text-foreground">
                  {metric.label}
                </p>
                <p className="relative mt-3 text-sm leading-6 text-muted-foreground">
                  {metric.detail}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_390px]">
        <div className="space-y-5">
          {skillGroups.map((group, index) => (
            <motion.article
              key={group.title}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
              whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: (index % 3) * 0.05, duration: 0.36 }}
            >
              <Card className="group overflow-hidden rounded-[2rem] bg-surface/95 transition hover:-translate-y-1 hover:border-accent/40 hover:shadow-xl hover:shadow-accent/10">
                <CardContent className="p-5 sm:p-6">
                  <div className="grid gap-5 lg:grid-cols-[1fr_190px]">
                    <div>
                      <div className="flex flex-wrap items-center gap-3">
                        <h2 className="text-xl font-black tracking-[-0.02em] text-foreground">
                          {group.title}
                        </h2>
                        {group.level ? (
                          <span className="rounded-full bg-accent/10 px-3 py-1 text-xs font-black text-accent">
                            {group.level}% ready
                          </span>
                        ) : null}
                      </div>
                      <p className="mt-3 text-sm leading-7 text-muted-foreground">
                        {group.description}
                      </p>
                      {group.focus ? (
                        <p className="mt-3 rounded-2xl border border-border bg-background/70 px-4 py-3 text-sm font-semibold text-foreground">
                          Focus:{" "}
                          <span className="font-medium text-muted-foreground">
                            {group.focus}
                          </span>
                        </p>
                      ) : null}
                    </div>

                    <div>
                      <div className="h-2 rounded-full bg-accent/10">
                        <motion.div
                          initial={shouldReduceMotion ? false : { width: 0 }}
                          whileInView={
                            shouldReduceMotion
                              ? undefined
                              : { width: `${group.level ?? 80}%` }
                          }
                          viewport={{ once: true }}
                          transition={{ duration: 0.8, ease: "easeOut" }}
                          className="h-full rounded-full bg-accent"
                        />
                      </div>
                      <p className="mt-3 text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">
                        Skill depth
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {group.skills.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-full border border-border bg-background/80 px-3 py-1.5 text-xs font-bold text-muted-foreground transition group-hover:border-accent/30 group-hover:text-foreground"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.article>
          ))}
        </div>

        <aside className="space-y-6 xl:sticky xl:top-28 xl:self-start">
          <Card className="rounded-[2rem] bg-surface/95">
            <CardContent className="p-6">
              <h2 className="font-black text-foreground">Skills Overview</h2>
              <div className="mt-5 space-y-4">
                {skillOverview.map((item, index) => (
                  <div key={item.label}>
                    <div className="flex justify-between text-xs font-bold">
                      <span>{item.label}</span>
                      <span className="text-accent">{item.value}%</span>
                    </div>
                    <div className="mt-2 h-2 rounded-full bg-accent/10">
                      <motion.div
                        initial={shouldReduceMotion ? false : { width: 0 }}
                        whileInView={
                          shouldReduceMotion
                            ? undefined
                            : { width: `${item.value}%` }
                        }
                        viewport={{ once: true }}
                        transition={{
                          duration: 0.7,
                          delay: index * 0.04,
                          ease: "easeOut",
                        }}
                        className="h-full rounded-full bg-accent"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="overflow-hidden rounded-[2rem] bg-accent text-accent-foreground shadow-xl shadow-accent/20">
            <CardContent className="p-6">
              <h2 className="font-black">Core strengths</h2>
              <div className="mt-5 space-y-4">
                {skillStrengths.map((item) => (
                  <div key={item.title} className="rounded-2xl bg-background/15 p-4">
                    <p className="font-black">{item.title}</p>
                    <p className="mt-2 text-sm leading-6 opacity-90">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-[2rem] bg-surface/95">
            <CardContent className="p-6">
              <h2 className="font-black text-foreground">Currently sharpening</h2>
              <ul className="mt-5 space-y-3">
                {learningRoadmap.map((item) => (
                  <li key={item} className="flex gap-3 text-sm text-muted-foreground">
                    <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-accent" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </aside>
      </div>

      <Card className="rounded-[2rem] bg-surface/95">
        <CardContent className="p-5 sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.22em] text-accent">
                Practical toolkit
              </p>
              <h2 className="mt-2 text-2xl font-black text-foreground">
                Skills I apply across portfolio projects
              </h2>
            </div>
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            {skillHighlights.map((skill) => (
              <span
                key={skill}
                className="rounded-full bg-accent/10 px-4 py-2 text-sm font-bold text-accent"
              >
                {skill}
              </span>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
