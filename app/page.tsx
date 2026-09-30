import Link from "next/link";
import { ArrowRight } from "@/components/icons/arrow-right";
import { Reveal } from "@/components/motion/reveal";
import { NewsletterForm } from "@/components/newsletter/newsletter-form";
import { projects } from "@/data/projects";
import { skillGroups } from "@/data/skills";
import { experienceItems } from "@/data/experience";
import { engineeringAlgorithms } from "@/data/engineering-algorithms";
import { CombinedPlatformBanner } from "@/components/developer-activity/CombinedPlatformBanner";
import { AuroraBackground } from "@/components/aurora/aurora-background";
import { HeroEngineeringGraph } from "@/components/home/hero-engineering-graph";
import { GlassCard } from "@/components/ui/glass-card";
import { StatusBadge } from "@/components/ui/status-badge";
import { TechnologyBadge } from "@/components/ui/technology-badge";
import { SectionHeader } from "@/components/ui/section-header";
import { MagneticButton } from "@/components/ui/magnetic-button";

const socials = [
  { label: "GitHub", value: "GH", href: "https://github.com/WishMaster01" },
  { label: "LeetCode", value: "LC", href: "https://leetcode.com/u/WishMaster01/" },
  {
    label: "LinkedIn",
    value: "in",
    href: "https://www.linkedin.com/in/wishmaster01",
  },
  { label: "Email", value: "@", href: "mailto:hello@wishmaster01.com" },
] as const;

// Truthful, verifiable metrics only
const verifiedMetrics = [
  {
    value: "5",
    label: "Curated Projects",
    sublabel: "Flagship case studies",
    badge: "Production / Active",
  },
  {
    value: "2+",
    label: "Years Engineering",
    sublabel: "Full-stack web & SaaS",
    badge: "2024 - 2026",
  },
  {
    value: "11",
    label: "Core Algorithms",
    sublabel: "Implemented in repo",
    badge: "DSA & Retrieval",
  },
  {
    value: "100%",
    label: "Strict TypeScript",
    sublabel: "Zero implicit any",
    badge: "Verified Types",
  },
] as const;

const engineeringPillars = [
  {
    title: "Explicit Architecture Boundaries",
    description:
      "Routes, validation schemas, domain services, and Prisma repositories are strictly separated so code can be inspected, tested, and replaced without side effects.",
  },
  {
    title: "PostgreSQL as Single Source of Truth",
    description:
      "Normalized relational models, unique constraints, and foreign key indexes ensure state integrity. Database outages are surfaced transparently rather than hidden.",
  },
  {
    title: "First-Principles Algorithmic Engineering",
    description:
      "Custom LRU/LFU caching, BM25 text retrieval, and Prefix Trie autocomplete are implemented natively to eliminate unnecessary heavy dependencies.",
  },
  {
    title: "Recruiter & Engineering Empathy",
    description:
      "Engineered with clean navigation, accessible contrast, mobile-friendly layouts, and a dedicated 30-second recruiter evaluation view.",
  },
];

const categoryLabels: Record<string, string> = {
  infinityai: "AI SaaS Platform",
  explorex: "AI Trip Planner",
  dailyessentials: "Grocery Platform",
  vyvo: "Chat & Social App",
  wishcart: "E-Commerce Platform",
};

export default function Home() {
  const featured = projects.slice(0, 5);

  return (
    <AuroraBackground intensity="high" className="min-h-screen">
      <div className="mx-auto w-full max-w-[1680px] px-4 pb-16 pt-8 sm:px-8 sm:pt-12 lg:px-16 lg:pb-24 lg:pt-16">
        {/* ============================================================ */}
        {/* 1. HERO SECTION                                              */}
        {/* ============================================================ */}
        <section className="grid min-h-[500px] grid-cols-1 gap-12 lg:grid-cols-[1.05fr_1.15fr] lg:items-center xl:gap-16">
          <Reveal className="relative z-10 min-w-0 max-w-[720px]">
            {/* Eyebrow badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-xs font-black uppercase tracking-[0.2em] text-accent shadow-sm animate-floating-slow backdrop-blur-md">
              <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
              <span>Full Stack Developer • AI Engineer</span>
            </div>

            {/* Brand Title & Moniker */}
            <div className="mt-5 flex flex-wrap items-baseline gap-3">
              <h1 className="text-[clamp(2.5rem,7vw,4.5rem)] font-black leading-[1.02] tracking-[-0.05em] text-foreground">
                Sumit Kumar
              </h1>
              <span className="rounded-full border border-accent/40 bg-accent/15 px-3 py-1 text-xs font-mono font-bold text-accent shadow-xs">
                @WishMaster01
              </span>
            </div>

            {/* Main Headline */}
            <h2 className="mt-3 text-xl font-black text-foreground sm:text-2xl lg:text-3xl leading-snug">
              <span className="aurora-shimmer-text">
                Building intelligent products
              </span>{" "}
              with strong engineering foundations.
            </h2>

            {/* Supporting Copy */}
            <p className="mt-4 max-w-[620px] text-sm leading-relaxed text-muted-foreground sm:text-base sm:leading-7">
              I build AI-powered products, scalable web applications, developer tools and data-driven systems with a focus on architecture, performance and real-world usability.
            </p>

            {/* Hero CTAs */}
            <div className="mt-7 flex flex-wrap items-center gap-3 sm:gap-4">
              <MagneticButton>
                <Link
                  href="/projects"
                  className="inline-flex h-12 items-center gap-2 rounded-2xl bg-accent px-6 text-sm font-black text-accent-foreground shadow-xl shadow-accent/25 transition hover:-translate-y-0.5 hover:opacity-95"
                >
                  <span>View Projects</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </MagneticButton>

              <MagneticButton>
                <Link
                  href="/recruiter"
                  className="inline-flex h-12 items-center gap-2 rounded-2xl border border-accent/40 bg-surface/90 px-6 text-sm font-black text-accent shadow-lg shadow-accent/10 transition hover:-translate-y-0.5 hover:bg-accent/10"
                >
                  <span>Recruiter View (30s)</span>
                  <span aria-hidden="true">⚡</span>
                </Link>
              </MagneticButton>

              <Link
                href="/resume/WishMaster01-Resume.pdf"
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-12 items-center gap-2 rounded-2xl border border-border bg-surface px-5 text-sm font-bold text-foreground shadow-sm transition hover:-translate-y-0.5 hover:border-accent/40 hover:text-accent"
              >
                <span>Download Resume</span>
              </Link>
            </div>

            {/* Social Links */}
            <div className="mt-7 flex items-center gap-3">
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                Connect:
              </span>
              {socials.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  target={social.href.startsWith("http") ? "_blank" : undefined}
                  rel={social.href.startsWith("http") ? "noreferrer" : undefined}
                  className="grid h-9 w-9 place-items-center rounded-xl border border-border bg-surface text-xs font-black text-foreground shadow-sm transition hover:-translate-y-0.5 hover:border-accent/50 hover:text-accent"
                >
                  {social.value}
                </Link>
              ))}
            </div>
          </Reveal>

          {/* Hero Visual: Interactive Engineering Graph */}
          <Reveal delay={0.08} className="relative w-full">
            <HeroEngineeringGraph />
          </Reveal>
        </section>

        {/* ============================================================ */}
        {/* 2. VERIFIABLE METRICS STRIP                                  */}
        {/* ============================================================ */}
        <Reveal className="mt-14 sm:mt-20">
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {verifiedMetrics.map((item) => (
              <GlassCard key={item.label} className="p-6 text-center sm:text-left">
                <div className="flex items-baseline justify-center sm:justify-start gap-2">
                  <span className="text-3xl font-black tracking-tight text-foreground sm:text-4xl">
                    {item.value}
                  </span>
                  <span className="rounded-full bg-accent/15 px-2 py-0.5 text-[10px] font-black uppercase text-accent">
                    {item.badge}
                  </span>
                </div>
                <p className="mt-1.5 text-sm font-black text-foreground">
                  {item.label}
                </p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {item.sublabel}
                </p>
              </GlassCard>
            ))}
          </div>
        </Reveal>

        {/* ============================================================ */}
        {/* 3. ENGINEERING POSITIONING & PRINCIPLES                     */}
        {/* ============================================================ */}
        <section className="mt-16 sm:mt-24">
          <SectionHeader
            eyebrow="Engineering Philosophy"
            title="How I Think, Design & Build"
            description="A serious developer portfolio should reflect disciplined software engineering, not just superficial technology counts."
          />

          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {engineeringPillars.map((pillar, index) => (
              <Reveal key={pillar.title} delay={index * 0.04}>
                <GlassCard className="flex h-full flex-col justify-between p-6">
                  <div>
                    <span className="text-xs font-black text-accent uppercase tracking-wider">
                      Pillar 0{index + 1}
                    </span>
                    <h3 className="mt-2 text-base font-black text-foreground">
                      {pillar.title}
                    </h3>
                    <p className="mt-3 text-xs leading-5 text-muted-foreground sm:text-sm sm:leading-6">
                      {pillar.description}
                    </p>
                  </div>
                </GlassCard>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ============================================================ */}
        {/* 4. SELECTED PROJECTS (FLAGSHIP CASE STUDIES)                 */}
        {/* ============================================================ */}
        <section className="mt-16 sm:mt-24">
          <SectionHeader
            eyebrow="Featured Work"
            title="Selected Software Projects"
            description="Each project exposes concrete engineering challenges, system architectures, technical trade-offs, and source repositories."
            action={
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 text-sm font-bold text-accent hover:underline shrink-0"
              >
                View all 5 projects
                <ArrowRight className="h-4 w-4" />
              </Link>
            }
          />

          <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {featured.map((project, index) => (
              <Reveal key={project.slug} delay={index * 0.04}>
                <GlassCard className="flex h-full flex-col justify-between p-0 overflow-hidden">
                  <div className="p-6">
                    <div className="flex items-center justify-between gap-2">
                      <span className="rounded-full bg-accent/15 px-3 py-1 text-xs font-black text-accent">
                        {categoryLabels[project.slug] ?? project.category}
                      </span>
                      <StatusBadge status={project.status} />
                    </div>

                    <h3 className="mt-4 text-xl font-black text-foreground">
                      {project.title}
                    </h3>

                    <p className="mt-2 text-xs leading-5 text-muted-foreground sm:text-sm sm:leading-6">
                      {project.summary}
                    </p>

                    {/* Problem / Solution preview */}
                    <div className="mt-4 rounded-2xl border border-border/70 bg-background/60 p-3.5 space-y-2 text-xs">
                      <div>
                        <strong className="text-accent uppercase text-[10px] tracking-wider block">
                          Problem:
                        </strong>
                        <p className="line-clamp-2 text-muted-foreground">
                          {project.problem}
                        </p>
                      </div>
                      <div>
                        <strong className="text-foreground uppercase text-[10px] tracking-wider block">
                          Solution:
                        </strong>
                        <p className="line-clamp-2 text-muted-foreground">
                          {project.solution}
                        </p>
                      </div>
                    </div>

                    {/* Tech stack badges */}
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {project.stack.slice(0, 4).map((tech) => (
                        <TechnologyBadge key={tech} name={tech} />
                      ))}
                    </div>
                  </div>

                  {/* Card footer links */}
                  <div className="flex items-center justify-between border-t border-border/70 bg-surface-elevated/40 px-6 py-3.5 text-xs font-bold">
                    <Link
                      href={`/projects/${project.slug}/case-study`}
                      className="text-accent hover:underline flex items-center gap-1"
                    >
                      Case Study <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                    <div className="flex items-center gap-3">
                      {project.liveUrl && project.liveUrl !== "#" && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-muted-foreground hover:text-foreground transition-colors"
                        >
                          Demo
                        </a>
                      )}
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-muted-foreground hover:text-foreground transition-colors"
                      >
                        GitHub
                      </a>
                    </div>
                  </div>
                </GlassCard>
              </Reveal>
            ))}

            {/* 6th Card: Open Source & Labs Showcase to complete the 3x2 grid */}
            <Reveal delay={0.24}>
              <GlassCard className="flex h-full flex-col justify-between p-6 border-dashed border-accent/40 bg-surface/75 hover:border-accent hover:bg-accent/5">
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="rounded-full border border-accent/30 bg-accent/15 px-3 py-1 text-xs font-black text-accent uppercase tracking-wider">
                      Open Source & Labs
                    </span>
                    <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
                  </div>

                  <h3 className="mt-4 text-xl font-black text-foreground">
                    Engineering Labs & R&D
                  </h3>

                  <p className="mt-2 text-xs leading-5 text-muted-foreground sm:text-sm sm:leading-6">
                    Experimental architectures, algorithmic benchmarks, system design blueprints, and open-source contributions.
                  </p>

                  <div className="mt-4 rounded-2xl border border-border/70 bg-background/60 p-3.5 space-y-1.5 text-xs">
                    <strong className="text-accent uppercase text-[10px] tracking-wider block">
                      Active In-Repo Research:
                    </strong>
                    <p className="text-muted-foreground">• Hybrid RAG Retrieval (BM25 + Cosine)</p>
                    <p className="text-muted-foreground">• In-Memory Dual Caches (LRU + LFU)</p>
                    <p className="text-muted-foreground">• Prefix Trie Search & Jaccard Sim</p>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-between pt-4 border-t border-border/70 text-xs font-bold">
                  <Link
                    href="/activity"
                    className="text-accent hover:underline flex items-center gap-1"
                  >
                    GitHub Telemetry <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                  <Link
                    href="/engineering"
                    className="rounded-full border border-border bg-background px-3 py-1.5 text-foreground hover:border-accent/40 hover:text-accent transition-colors"
                  >
                    Engineering Hub
                  </Link>
                </div>
              </GlassCard>
            </Reveal>
          </div>
        </section>

        {/* ============================================================ */}
        {/* 5. ENGINEERING HIGHLIGHTS & ALGORITHMS                       */}
        {/* ============================================================ */}
        <section className="mt-16 sm:mt-24">
          <SectionHeader
            eyebrow="Computer Science & Systems"
            title="In-Repository Algorithms (11)"
            description="Demonstrated algorithmic implementation in TypeScript with formal complexity analysis and explicit portfolio usage."
            action={
              <Link
                href="/engineering"
                className="inline-flex items-center gap-2 text-sm font-bold text-accent hover:underline shrink-0"
              >
                Full Engineering Breakdown
                <ArrowRight className="h-4 w-4" />
              </Link>
            }
          />

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {engineeringAlgorithms.slice(0, 6).map((algo, index) => (
              <Reveal key={algo.id} delay={index * 0.03}>
                <GlassCard className="h-full p-5 space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-sm font-black text-foreground">
                      {algo.name}
                    </h3>
                    <span className="shrink-0 rounded-md bg-accent/15 px-2 py-0.5 text-[10px] font-black text-accent font-mono">
                      {algo.timeComplexity.average}
                    </span>
                  </div>
                  <p className="text-xs leading-5 text-muted-foreground">
                    {algo.portfolioUsage}
                  </p>
                  <div className="pt-2 border-t border-border/60">
                    <span className="text-[11px] font-mono text-muted-foreground">
                      Source: {algo.sourceFile}
                    </span>
                  </div>
                </GlassCard>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ============================================================ */}
        {/* DUAL PLATFORM TELEMETRY (GITHUB & LEETCODE)                 */}
        {/* ============================================================ */}
        <section className="mt-16 sm:mt-24">
          <CombinedPlatformBanner />
        </section>

        {/* ============================================================ */}
        {/* 6. TECHNICAL SKILLS GROUPED LOGICALLY                        */}
        {/* ============================================================ */}
        <section className="mt-16 sm:mt-24">
          <SectionHeader
            eyebrow="Core Competencies"
            title="Technical Stack & Skill Domains"
            description="Hands-on tools and disciplines used across frontend, backend, database, and AI systems."
          />

          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {skillGroups.slice(0, 6).map((group, index) => (
              <Reveal key={group.title} delay={index * 0.04}>
                <GlassCard className="h-full p-6 flex flex-col justify-between">
                  <div>
                    <h3 className="text-base font-black text-foreground">
                      {group.title}
                    </h3>
                    <p className="mt-2 text-xs leading-5 text-muted-foreground">
                      {group.description}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {group.skills.map((skill) => (
                        <TechnologyBadge key={skill} name={skill} />
                      ))}
                    </div>
                  </div>
                </GlassCard>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ============================================================ */}
        {/* 7. EXPERIENCE & EDUCATION TIMELINE                          */}
        {/* ============================================================ */}
        <section className="mt-16 sm:mt-24">
          <SectionHeader
            eyebrow="Timeline"
            title="Engineering Experience"
          />

          <div className="mt-8 space-y-4">
            {experienceItems.slice(0, 3).map((item, index) => (
              <Reveal key={item.title} delay={index * 0.04}>
                <GlassCard className="p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                    <div>
                      <h3 className="text-base font-black text-foreground">
                        {item.title}
                      </h3>
                      <p className="text-xs font-bold text-accent">
                        {item.company} • {item.location}
                      </p>
                    </div>
                    <span className="text-xs font-mono font-bold text-muted-foreground">
                      {item.period}
                    </span>
                  </div>
                  <p className="mt-3 text-xs leading-5 text-muted-foreground sm:text-sm sm:leading-6">
                    {item.summary}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {(item.stack ?? []).map((t) => (
                      <TechnologyBadge key={t} name={t} />
                    ))}
                  </div>
                </GlassCard>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ============================================================ */}
        {/* 8. RECRUITER CTA BANNER                                      */}
        {/* ============================================================ */}
        <section className="mt-16 sm:mt-24">
          <Reveal>
            <GlassCard className="p-8 sm:p-12 lg:flex lg:items-center lg:justify-between border-accent/40 shadow-xl shadow-accent/10">
              <div className="max-w-2xl">
                <span className="rounded-full bg-accent/15 px-3.5 py-1 text-xs font-black uppercase tracking-wider text-accent border border-accent/25">
                  Recruiter Fast Track
                </span>
                <h3 className="mt-4 text-2xl font-black text-foreground sm:text-4xl">
                  Evaluating for engineering roles?
                </h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground sm:text-base sm:leading-7">
                  Open the streamlined Recruiter View for a 30-second summary:
                  core skills, selected production repositories, direct resume PDF
                  download, and verified contact links.
                </p>
              </div>

              <div className="mt-6 flex flex-wrap gap-4 shrink-0 lg:mt-0">
                <MagneticButton>
                  <Link
                    href="/recruiter"
                    className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl bg-accent px-7 text-sm font-black text-accent-foreground shadow-lg shadow-accent/25 transition hover:-translate-y-0.5 hover:opacity-95"
                  >
                    <span>Launch Recruiter View</span>
                    <span>⚡</span>
                  </Link>
                </MagneticButton>
                <Link
                  href="/resume/WishMaster01-Resume.pdf"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-12 items-center justify-center rounded-2xl border border-border bg-background px-6 text-sm font-bold text-foreground transition hover:border-accent/40"
                >
                  Download Resume PDF
                </Link>
              </div>
            </GlassCard>
          </Reveal>
        </section>

        {/* ============================================================ */}
        {/* 9. TECHNICAL NEWSLETTER & CONTACT                           */}
        {/* ============================================================ */}
        <section className="mt-16 sm:mt-24">
          <Reveal>
            <GlassCard className="p-6 sm:p-8 lg:p-10">
              <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-center">
                <div>
                  <span className="inline-flex rounded-full border border-accent/25 bg-accent/10 px-4 py-1.5 text-xs font-black uppercase tracking-[0.2em] text-accent">
                    Technical Notes
                  </span>
                  <h3 className="mt-4 text-2xl font-black text-foreground sm:text-3xl lg:text-4xl">
                    Engineering Dispatch from Sumit Kumar
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground sm:text-base">
                    Practical write-ups on Next.js 16 App Router architecture,
                    retrieval-grounded AI systems, PostgreSQL database migrations,
                    and clean TypeScript systems.
                  </p>
                </div>

                <div className="rounded-2xl border border-border/80 bg-background/80 p-5 sm:p-6 backdrop-blur-md">
                  <NewsletterForm source="portfolio-home" />
                </div>
              </div>
            </GlassCard>
          </Reveal>
        </section>
      </div>
    </AuroraBackground>
  );
}
