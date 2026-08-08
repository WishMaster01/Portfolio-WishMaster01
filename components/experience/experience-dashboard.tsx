"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import {
  education,
  experienceDependencyEdges,
  experienceHighlights,
  experienceItems,
  experienceMetrics,
  workingPrinciples,
} from "@/data/experience";
import { ExperienceDag } from "@/components/experience/experience-dag";

export function ExperienceDashboard() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-4">
        {experienceMetrics.map((metric, index) => (
          <motion.div
            key={metric.label}
            initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
            whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ delay: index * 0.05, duration: 0.35 }}
          >
            <Card className="rounded-2xl bg-surface/95 sm:rounded-3xl">
              <CardContent className="p-3 sm:p-5">
                <p className="text-2xl font-black text-accent sm:text-3xl">
                  {metric.value}
                </p>
                <p className="mt-1 text-xs font-bold leading-5 text-muted-foreground sm:mt-2 sm:text-sm sm:leading-6">
                  {metric.label}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid gap-8 xl:grid-cols-[1fr_410px]">
        <div className="relative space-y-6">
          <span className="absolute left-6 top-8 hidden h-[calc(100%-4rem)] w-px bg-accent/30 md:block" />

          {experienceItems.map((item, index) => (
            <motion.article
              key={`${item.company}-${item.title}`}
              initial={shouldReduceMotion ? false : { opacity: 0, x: -18 }}
              whileInView={shouldReduceMotion ? undefined : { opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: (index % 3) * 0.06, duration: 0.4 }}
              className="relative"
            >
              <span className="absolute left-[17px] top-8 hidden h-4 w-4 rounded-full border-4 border-background bg-accent shadow-lg shadow-accent/30 md:block" />
              <Card className="overflow-hidden rounded-[2rem] bg-surface/95 md:ml-14">
                <CardContent className="p-4 sm:p-7">
                  <div className="flex flex-col justify-between gap-3 sm:flex-row sm:gap-4">
                    <div>
                      <p className="text-xs font-black uppercase tracking-[0.22em] text-accent">
                        {item.company}
                      </p>
                      <h2 className="mt-2 text-xl font-black tracking-[-0.03em] text-foreground sm:text-2xl">
                        {item.title}
                      </h2>
                      <p className="mt-2 text-sm font-semibold text-muted-foreground">
                        {item.location}
                      </p>
                    </div>
                    <span className="h-fit w-fit rounded-full border border-accent/30 bg-accent/10 px-3 py-1.5 text-[11px] font-black uppercase tracking-[0.12em] text-accent sm:px-4 sm:py-2 sm:text-xs sm:tracking-[0.16em]">
                      {item.period}
                    </span>
                  </div>

                  <p className="mt-4 text-sm leading-6 text-muted-foreground sm:mt-5 sm:leading-7">
                    {item.summary}
                  </p>

                  {item.impact ? (
                    <div className="mt-4 rounded-2xl border border-border bg-background/70 p-3 sm:mt-5 sm:p-4">
                      <p className="text-xs font-black uppercase tracking-[0.18em] text-accent">
                        Impact
                      </p>
                      <p className="mt-2 text-sm leading-6 text-foreground sm:leading-7">
                        {item.impact}
                      </p>
                    </div>
                  ) : null}

                  {item.stack?.length ? (
                    <div className="mt-5 flex flex-wrap gap-2">
                      {item.stack.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-full bg-accent/10 px-3 py-1.5 text-xs font-bold text-accent"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  ) : null}

                  <div className="mt-5 grid gap-2 sm:mt-6 sm:gap-3">
                    {item.achievements.map((achievement) => (
                      <div
                        key={achievement}
                        className="flex gap-3 rounded-2xl border border-border bg-background/60 p-3 text-sm leading-6 text-muted-foreground sm:p-4 sm:leading-7"
                      >
                        <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-accent" />
                        <span>{achievement}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.article>
          ))}
        </div>

        <aside className="space-y-6 xl:sticky xl:top-28 xl:self-start">
          <Card className="rounded-[2rem] bg-surface/95">
            <CardContent className="p-4 sm:p-6">
              <h2 className="font-black text-foreground">Experience Highlights</h2>
              <ul className="mt-5 space-y-4 text-sm text-muted-foreground">
                {experienceHighlights.map((item) => (
                  <li key={item} className="flex gap-3 leading-6">
                    <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-accent" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="overflow-hidden rounded-[2rem] bg-accent text-accent-foreground shadow-xl shadow-accent/20">
            <CardContent className="p-4 sm:p-6">
              <h2 className="font-black">Working principles</h2>
              <div className="mt-5 space-y-4">
                {workingPrinciples.map((item, index) => (
                  <div key={item.title} className="rounded-2xl bg-background/15 p-4">
                    <p className="text-xs font-black uppercase tracking-[0.18em] opacity-80">
                      Principle {index + 1}
                    </p>
                    <p className="mt-2 font-black">{item.title}</p>
                    <p className="mt-2 text-sm leading-6 opacity-90">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-[2rem] bg-surface/95">
            <CardContent className="p-4 sm:p-6">
              <h2 className="font-black text-foreground">Education</h2>
              <div className="mt-5 space-y-4 text-sm leading-7 text-muted-foreground">
                <div>
                  <p className="font-black text-foreground">{education.degree}</p>
                  <p>{education.period}</p>
                  <p>{education.institution}</p>
                </div>
                <div>
                  <p className="font-black text-foreground">
                    Relevant Coursework
                  </p>
                  <p>{education.coursework}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </aside>
      </div>

      <ExperienceDag
        items={experienceItems}
        edges={[...experienceDependencyEdges]}
      />
    </div>
  );
}
