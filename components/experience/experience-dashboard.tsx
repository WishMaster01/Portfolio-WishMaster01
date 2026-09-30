"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "@/components/icons/arrow-right";
import {
  education,
  experienceDependencyEdges,
  experienceHighlights,
  experienceItems,
  experienceMetrics,
  workingPrinciples,
} from "@/data/experience";
import { ExperienceDag } from "@/components/experience/experience-dag";
import { TechnologyBadge } from "@/components/ui/technology-badge";

const coreProductionSkills = [
  "Next.js 16 (App Router)",
  "TypeScript (Strict)",
  "PostgreSQL",
  "Prisma ORM",
  "Redis Caching",
  "Tailwind CSS",
  "Framer Motion",
  "Zod Validation",
  "Docker Sandbox",
  "RAG & Hybrid Retrieval",
  "REST & Streaming APIs",
  "Automated Testing (Vitest)",
];

const engineeringTrackRecord = [
  {
    title: "100% TypeScript Coverage",
    description: "Zero implicit any across all API routes, database schemas, and client UI components.",
  },
  {
    title: "Layered Domain Architecture",
    description: "Strict isolation between presentation, validation gates, business services, and database persistence.",
  },
  {
    title: "Production Test Pyramid",
    description: "75+ automated unit/integration tests and 16 AI retrieval benchmarks verified in CI.",
  },
];

export function ExperienceDashboard() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="space-y-12">
      {/* 1. Top Metrics Strip (Balanced 4-Column Grid) */}
      <div className="grid grid-cols-2 gap-3 sm:gap-5 xl:grid-cols-4">
        {experienceMetrics.map((metric, index) => (
          <motion.div
            key={metric.label}
            initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
            whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px" }}
            transition={{ delay: index * 0.05, duration: 0.35 }}
          >
            <Card className="rounded-2xl border border-border/80 bg-surface/90 shadow-sm backdrop-blur-xl sm:rounded-3xl hover:border-accent/40 transition-colors">
              <CardContent className="p-4 sm:p-6">
                <p className="text-3xl font-black text-accent sm:text-4xl">
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

      {/* 2. Main Two-Column Experience Grid (Both Columns Fully Populated) */}
      <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] xl:grid-cols-[1.2fr_0.8fr] xl:gap-10">
        {/* Left Column: Chronological Engineering Roles & Milestones */}
        <div className="relative space-y-8">
          {/* Subtle timeline track */}
          <span
            aria-hidden="true"
            className="absolute left-4 top-8 hidden h-[calc(100%-4rem)] w-0.5 bg-gradient-to-b from-accent via-accent/40 to-transparent sm:block sm:left-6"
          />

          {experienceItems.map((item, index) => (
            <motion.article
              key={`${item.company}-${item.title}`}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
              whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px" }}
              transition={{ delay: (index % 3) * 0.06, duration: 0.4 }}
              className="relative"
            >
              {/* Timeline marker node */}
              <span
                aria-hidden="true"
                className="absolute left-2.5 top-8 hidden h-3.5 w-3.5 rounded-full border-2 border-background bg-accent shadow-md shadow-accent/50 sm:block sm:left-[19px]"
              />

              <Card className="overflow-hidden rounded-[2rem] border border-border/80 bg-surface/90 shadow-sm backdrop-blur-xl transition hover:border-accent/40 hover:shadow-xl hover:shadow-accent/10 sm:ml-12">
                <CardContent className="p-5 sm:p-8">
                  {/* Role Header */}
                  <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start sm:gap-4">
                    <div>
                      <span className="text-xs font-black uppercase tracking-[0.2em] text-accent">
                        {item.company}
                      </span>
                      <h2 className="mt-2 text-xl font-black tracking-[-0.03em] text-foreground sm:text-2xl">
                        {item.title}
                      </h2>
                      <p className="mt-1 text-xs font-bold text-muted-foreground sm:text-sm">
                        {item.location}
                      </p>
                    </div>
                    <span className="h-fit shrink-0 rounded-full border border-accent/40 bg-accent/15 px-3 py-1.5 text-xs font-black uppercase tracking-wider text-accent shadow-xs">
                      {item.period}
                    </span>
                  </div>

                  {/* Summary */}
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:leading-7">
                    {item.summary}
                  </p>

                  {/* Engineering Impact Box */}
                  {item.impact ? (
                    <div className="mt-5 rounded-2xl border border-accent/25 bg-accent/5 p-4 sm:p-5">
                      <p className="text-[11px] font-black uppercase tracking-[0.2em] text-accent">
                        Key Engineering Impact
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-foreground font-semibold">
                        {item.impact}
                      </p>
                    </div>
                  ) : null}

                  {/* Stack Badges */}
                  {item.stack?.length ? (
                    <div className="mt-5 flex flex-wrap gap-1.5">
                      {item.stack.map((tech) => (
                        <TechnologyBadge key={tech} name={tech} />
                      ))}
                    </div>
                  ) : null}

                  {/* Concrete Key Achievements */}
                  <div className="mt-6 space-y-2.5">
                    <p className="text-xs font-black uppercase tracking-wider text-muted-foreground">
                      Delivered Systems & Modules
                    </p>
                    {item.achievements.map((achievement) => (
                      <div
                        key={achievement}
                        className="flex gap-3 rounded-2xl border border-border/70 bg-background/60 p-3.5 text-xs leading-relaxed text-muted-foreground sm:text-sm"
                      >
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                        <span>{achievement}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.article>
          ))}
        </div>

        {/* Right Column: Fully Populated Supporting Cards (No Empty Space) */}
        <aside className="space-y-6">
          {/* Card 1: Experience Highlights */}
          <Card className="rounded-[2rem] border border-border/80 bg-surface/90 shadow-sm backdrop-blur-xl">
            <CardContent className="p-5 sm:p-7">
              <span className="text-xs font-black uppercase tracking-[0.2em] text-accent block">
                Executive Summary
              </span>
              <h2 className="mt-2 text-xl font-black text-foreground">
                Experience Highlights
              </h2>
              <ul className="mt-5 space-y-3.5 text-sm text-muted-foreground">
                {experienceHighlights.map((item) => (
                  <li key={item} className="flex gap-3 leading-relaxed">
                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-accent shadow-xs shadow-accent" />
                    <span className="text-xs sm:text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Card 2: Working Principles (With Proper Contrast in All Themes) */}
          <Card className="rounded-[2rem] border border-accent/30 bg-surface/95 shadow-sm backdrop-blur-xl">
            <CardContent className="p-5 sm:p-7">
              <span className="text-xs font-black uppercase tracking-[0.2em] text-accent block">
                Engineering Discipline
              </span>
              <h2 className="mt-2 text-xl font-black text-foreground">
                Working Principles
              </h2>
              <div className="mt-5 space-y-3.5">
                {workingPrinciples.map((item, index) => (
                  <div
                    key={item.title}
                    className="rounded-2xl border border-border/70 bg-background/60 p-4 transition-colors hover:border-accent/40"
                  >
                    <p className="text-[11px] font-black uppercase tracking-[0.16em] text-accent">
                      Principle 0{index + 1}
                    </p>
                    <p className="mt-1.5 text-sm font-black text-foreground">
                      {item.title}
                    </p>
                    <p className="mt-1.5 text-xs sm:text-sm leading-relaxed text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Card 3: Education & Academics */}
          <Card className="rounded-[2rem] border border-border/80 bg-surface/90 shadow-sm backdrop-blur-xl">
            <CardContent className="p-5 sm:p-7">
              <span className="text-xs font-black uppercase tracking-[0.2em] text-accent block">
                Academic Background
              </span>
              <h2 className="mt-2 text-xl font-black text-foreground">
                Education
              </h2>
              <div className="mt-5 space-y-3 text-sm text-muted-foreground">
                <div>
                  <p className="font-black text-foreground text-base">
                    {education.degree}
                  </p>
                  <p className="text-xs font-bold text-accent mt-0.5">
                    {education.period} • {education.institution}
                  </p>
                </div>
                <div className="pt-2 border-t border-border/60">
                  <p className="text-xs font-black uppercase tracking-wider text-foreground">
                    Core Coursework
                  </p>
                  <p className="text-xs sm:text-sm leading-relaxed mt-1">
                    {education.coursework}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Card 4: Production Stack Competencies */}
          <Card className="rounded-[2rem] border border-border/80 bg-surface/90 shadow-sm backdrop-blur-xl">
            <CardContent className="p-5 sm:p-7">
              <span className="text-xs font-black uppercase tracking-[0.2em] text-accent block">
                Technical Mastery
              </span>
              <h2 className="mt-2 text-xl font-black text-foreground">
                Core Production Stack
              </h2>
              <p className="mt-2 text-xs text-muted-foreground">
                Technologies utilized across active repositories and production architectures:
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {coreProductionSkills.map((skill) => (
                  <TechnologyBadge key={skill} name={skill} />
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Card 5: Engineering Quality Record */}
          <Card className="rounded-[2rem] border border-border/80 bg-surface/90 shadow-sm backdrop-blur-xl">
            <CardContent className="p-5 sm:p-7">
              <span className="text-xs font-black uppercase tracking-[0.2em] text-accent block">
                Quality Standards
              </span>
              <h2 className="mt-2 text-xl font-black text-foreground">
                Quality & Verification
              </h2>
              <div className="mt-4 space-y-3">
                {engineeringTrackRecord.map((record) => (
                  <div key={record.title} className="rounded-xl border border-border/60 bg-background/50 p-3">
                    <p className="text-xs font-black text-foreground">
                      {record.title}
                    </p>
                    <p className="text-[11px] leading-relaxed text-muted-foreground mt-0.5">
                      {record.description}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Card 6: Candidate Fast-Track & Resume CTA */}
          <div className="rounded-[2rem] border border-accent/40 bg-gradient-to-br from-accent/20 via-surface/95 to-accent/10 p-6 shadow-xl shadow-accent/15 backdrop-blur-xl">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-accent">
              Recruiter Quick Access
            </p>
            <h3 className="mt-2 text-lg font-black text-foreground">
              Interested in collaborating?
            </h3>
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
              Review my 30-second recruiter brief or download the verified engineering resume.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                href="/recruiter"
                className="inline-flex h-10 items-center gap-1.5 rounded-full bg-accent px-5 text-xs font-black text-accent-foreground shadow-md shadow-accent/20 transition hover:scale-[1.02]"
              >
                <span>Recruiter View (30s)</span>
                <span aria-hidden="true">⚡</span>
              </Link>
              <Link
                href="/resume/WishMaster01-Resume.pdf"
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-10 items-center gap-1.5 rounded-full border border-border bg-surface px-4 text-xs font-bold text-foreground transition hover:border-accent hover:text-accent"
              >
                <span>Resume PDF</span>
                <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          </div>
        </aside>
      </div>

      {/* 3. Skill & Dependency DAG Graph */}
      <ExperienceDag
        items={experienceItems}
        edges={[...experienceDependencyEdges]}
      />
    </div>
  );
}
