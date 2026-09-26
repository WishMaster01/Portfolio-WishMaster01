import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "@/components/icons/arrow-right";
import { Reveal } from "@/components/motion/reveal";
import { NewsletterForm } from "@/components/newsletter/newsletter-form";
import { projects } from "@/data/projects";
import { skillGroups } from "@/data/skills";
import { experienceItems } from "@/data/experience";
import { engineeringAlgorithms } from "@/data/engineering-algorithms";

const socials = [
  { label: "GitHub", value: "GH", href: "https://github.com/WishMaster01" },
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
    <div className="min-h-screen bg-[radial-gradient(circle_at_74%_18%,color-mix(in_oklab,var(--accent)_12%,transparent),transparent_26rem),linear-gradient(180deg,var(--background)_0%,color-mix(in_oklab,var(--background-alt)_45%,var(--background))_50%,var(--background)_100%)] text-foreground">
      <div className="mx-auto w-full max-w-[1680px] px-4 pb-16 pt-8 sm:px-8 sm:pt-12 lg:px-16 lg:pb-24 lg:pt-16">
        {/* ============================================================ */}
        {/* 1. HERO SECTION                                              */}
        {/* ============================================================ */}
        <section className="grid min-h-[420px] grid-cols-1 gap-8 sm:grid-cols-[minmax(0,1.1fr)_minmax(260px,0.9fr)] sm:items-center lg:min-h-[500px] lg:gap-16">
          <Reveal className="relative z-10 min-w-0 max-w-[720px]">
            <div className="inline-flex items-center gap-2 rounded-xl bg-accent/10 px-3.5 py-1.5 text-xs font-black uppercase tracking-[0.18em] text-accent shadow-sm">
              <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
              <span>Full-Stack &amp; Systems Engineer</span>
            </div>

            <h1 className="mt-4 text-[clamp(2.4rem,8vw,4.75rem)] font-black leading-[1.02] tracking-[-0.05em] text-foreground">
              WishMaster01
            </h1>

            <p className="mt-3 text-lg font-bold text-accent sm:text-2xl">
              Building scalable web architectures, resilient services, and AI systems.
            </p>

            <p className="mt-4 max-w-[620px] text-sm leading-6 text-muted-foreground sm:text-base sm:leading-7">
              I build production-grade web applications with Next.js, TypeScript,
              and PostgreSQL. Focused on clean system design, algorithmic efficiency,
              robust API contracts, and high-signal recruiter UX.
            </p>

            {/* Hero CTAs */}
            <div className="mt-6 flex flex-wrap items-center gap-3 sm:gap-4">
              <Link
                href="/recruiter"
                className="inline-flex h-12 items-center gap-2 rounded-xl bg-accent px-6 text-sm font-black text-accent-foreground shadow-xl shadow-accent/25 transition hover:-translate-y-0.5 hover:opacity-90"
              >
                <span>Recruiter View (30s)</span>
                <span aria-hidden="true">⚡</span>
              </Link>
              <Link
                href="/projects"
                className="inline-flex h-12 items-center gap-2 rounded-xl border border-border bg-surface px-6 text-sm font-bold text-foreground shadow-sm transition hover:-translate-y-0.5 hover:border-accent/40 hover:text-accent"
              >
                <span>Explore Projects</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/resume"
                className="inline-flex h-12 items-center gap-2 rounded-xl border border-border bg-surface px-5 text-sm font-bold text-foreground shadow-sm transition hover:-translate-y-0.5 hover:border-accent/40 hover:text-accent"
              >
                <span>Resume</span>
              </Link>
            </div>

            {/* Social Links */}
            <div className="mt-6 flex items-center gap-3">
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

          {/* Hero Art / Character Shell */}
          <Reveal delay={0.08} className="relative hidden sm:block">
            <div className="hero-art-shell relative mx-auto aspect-[804/507] w-full max-w-[440px] overflow-hidden rounded-2xl border border-border/70 bg-surface/70 shadow-2xl backdrop-blur-sm lg:max-w-[620px]">
              <Image
                src="/home-page-character.png"
                alt="WishMaster01 engineering portfolio avatar with system architecture cards"
                fill
                priority
                sizes="(min-width: 1024px) 620px, 440px"
                className="hero-art-image object-contain"
              />
            </div>
          </Reveal>
        </section>

        {/* ============================================================ */}
        {/* 2. VERIFIABLE METRICS STRIP                                  */}
        {/* ============================================================ */}
        <Reveal className="mt-12 rounded-2xl border border-border bg-surface/85 shadow-lg shadow-foreground/5 backdrop-blur sm:mt-16">
          <div className="grid grid-cols-2 divide-x divide-y divide-border sm:grid-cols-2 lg:grid-cols-4 lg:divide-y-0">
            {verifiedMetrics.map((item) => (
              <div key={item.label} className="p-6 text-center sm:text-left">
                <div className="flex items-baseline justify-center sm:justify-start gap-2">
                  <span className="text-3xl font-black tracking-tight text-foreground sm:text-4xl">
                    {item.value}
                  </span>
                  <span className="rounded-full bg-accent/10 px-2 py-0.5 text-[10px] font-black uppercase text-accent">
                    {item.badge}
                  </span>
                </div>
                <p className="mt-1 text-sm font-black text-foreground">
                  {item.label}
                </p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {item.sublabel}
                </p>
              </div>
            ))}
          </div>
        </Reveal>

        {/* ============================================================ */}
        {/* 3. ENGINEERING POSITIONING & PRINCIPLES                     */}
        {/* ============================================================ */}
        <section className="mt-16 sm:mt-24">
          <Reveal className="max-w-2xl">
            <span className="text-xs font-black uppercase tracking-[0.2em] text-accent">
              Engineering Philosophy
            </span>
            <h2 className="mt-2 text-2xl font-black sm:text-4xl">
              How I Think, Design &amp; Build
            </h2>
            <p className="mt-2 text-sm text-muted-foreground sm:text-base">
              A serious developer portfolio should reflect disciplined software engineering,
              not just superficial technology counts.
            </p>
          </Reveal>

          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {engineeringPillars.map((pillar, index) => (
              <Reveal key={pillar.title} delay={index * 0.04}>
                <div className="flex h-full flex-col justify-between rounded-2xl border border-border bg-surface p-6 shadow-sm">
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
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ============================================================ */}
        {/* 4. SELECTED PROJECTS (FLAGSHIP CASE STUDIES)                 */}
        {/* ============================================================ */}
        <section className="mt-16 sm:mt-24">
          <Reveal className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end mb-8">
            <div>
              <span className="text-xs font-black uppercase tracking-[0.2em] text-accent">
                Featured Work
              </span>
              <h2 className="mt-2 text-2xl font-black sm:text-4xl">
                Selected Software Projects
              </h2>
              <p className="mt-2 text-sm text-muted-foreground sm:text-base max-w-2xl">
                Each project exposes concrete engineering challenges, system architectures,
                technical trade-offs, and source repositories.
              </p>
            </div>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-sm font-bold text-accent hover:underline shrink-0"
            >
              View all 5 projects
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {featured.map((project, index) => (
              <Reveal key={project.slug} delay={index * 0.04}>
                <div className="group flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-border bg-surface shadow-sm transition hover:-translate-y-1 hover:border-accent/40 hover:shadow-xl">
                  <div className="p-6">
                    <div className="flex items-center justify-between gap-2">
                      <span className="rounded-full bg-accent/10 px-3 py-1 text-xs font-black text-accent">
                        {categoryLabels[project.slug] ?? project.category}
                      </span>
                      <span className="rounded-full border border-border px-2.5 py-0.5 text-[11px] font-bold text-muted-foreground">
                        {project.status}
                      </span>
                    </div>

                    <h3 className="mt-4 text-xl font-black text-foreground">
                      {project.title}
                    </h3>

                    <p className="mt-2 text-xs leading-5 text-muted-foreground sm:text-sm sm:leading-6">
                      {project.summary}
                    </p>

                    {/* Problem / Solution preview */}
                    <div className="mt-4 rounded-xl border border-border/60 bg-background/50 p-3 space-y-2 text-xs">
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
                        <span
                          key={tech}
                          className="rounded-md bg-surface-elevated px-2 py-0.5 text-[11px] font-bold text-foreground border border-border/50"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Card footer links */}
                  <div className="flex items-center justify-between border-t border-border bg-surface-elevated/40 px-6 py-3 text-xs font-bold">
                    <Link
                      href={`/projects/${project.slug}/case-study`}
                      className="text-accent hover:underline"
                    >
                      Case Study →
                    </Link>
                    <div className="flex items-center gap-3">
                      {project.liveUrl && project.liveUrl !== "#" && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-muted-foreground hover:text-foreground"
                        >
                          Demo
                        </a>
                      )}
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-muted-foreground hover:text-foreground"
                      >
                        GitHub
                      </a>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ============================================================ */}
        {/* 5. ENGINEERING HIGHLIGHTS & ALGORITHMS                       */}
        {/* ============================================================ */}
        <section className="mt-16 sm:mt-24">
          <Reveal className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end mb-8">
            <div>
              <span className="text-xs font-black uppercase tracking-[0.2em] text-accent">
                Computer Science &amp; Systems
              </span>
              <h2 className="mt-2 text-2xl font-black sm:text-4xl">
                In-Repository Algorithms (11)
              </h2>
              <p className="mt-2 text-sm text-muted-foreground sm:text-base max-w-2xl">
                Demonstrated algorithmic implementation in TypeScript with formal
                complexity analysis and explicit portfolio usage.
              </p>
            </div>
            <Link
              href="/engineering"
              className="inline-flex items-center gap-2 text-sm font-bold text-accent hover:underline shrink-0"
            >
              Full Engineering Breakdown
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {engineeringAlgorithms.slice(0, 6).map((algo, index) => (
              <Reveal key={algo.id} delay={index * 0.03}>
                <div className="h-full rounded-2xl border border-border bg-surface p-5 shadow-sm space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-sm font-black text-foreground">
                      {algo.name}
                    </h3>
                    <span className="shrink-0 rounded bg-accent/10 px-2 py-0.5 text-[10px] font-black text-accent">
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
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ============================================================ */}
        {/* 6. TECHNICAL SKILLS GROUPED LOGICALLY                        */}
        {/* ============================================================ */}
        <section className="mt-16 sm:mt-24">
          <Reveal className="max-w-2xl mb-8">
            <span className="text-xs font-black uppercase tracking-[0.2em] text-accent">
              Core Competencies
            </span>
            <h2 className="mt-2 text-2xl font-black sm:text-4xl">
              Technical Stack &amp; Skill Domains
            </h2>
            <p className="mt-2 text-sm text-muted-foreground sm:text-base">
              Hands-on tools and disciplines used across frontend, backend, database, and AI systems.
            </p>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {skillGroups.slice(0, 6).map((group, index) => (
              <Reveal key={group.title} delay={index * 0.04}>
                <div className="h-full rounded-2xl border border-border bg-surface p-6 shadow-sm flex flex-col justify-between">
                  <div>
                    <h3 className="text-base font-black text-foreground">
                      {group.title}
                    </h3>
                    <p className="mt-2 text-xs leading-5 text-muted-foreground">
                      {group.description}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {group.skills.map((skill) => (
                        <span
                          key={skill}
                          className="rounded-lg bg-surface-elevated px-2.5 py-1 text-xs font-bold text-foreground border border-border/60"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ============================================================ */}
        {/* 7. EXPERIENCE & EDUCATION TIMELINE                          */}
        {/* ============================================================ */}
        <section className="mt-16 sm:mt-24">
          <Reveal className="max-w-2xl mb-8">
            <span className="text-xs font-black uppercase tracking-[0.2em] text-accent">
              Timeline
            </span>
            <h2 className="mt-2 text-2xl font-black sm:text-4xl">
              Engineering Experience
            </h2>
          </Reveal>

          <div className="space-y-4">
            {experienceItems.slice(0, 3).map((item, index) => (
              <Reveal key={item.title} delay={index * 0.04}>
                <div className="rounded-2xl border border-border bg-surface p-6 shadow-sm">
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
                      <span
                        key={t}
                        className="rounded-md bg-accent/10 px-2 py-0.5 text-[11px] font-bold text-accent"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ============================================================ */}
        {/* 8. RECRUITER CTA BANNER                                      */}
        {/* ============================================================ */}
        <section className="mt-16 sm:mt-24">
          <Reveal>
            <div className="rounded-3xl border border-accent/30 bg-surface/90 p-8 shadow-2xl backdrop-blur sm:p-12 lg:flex lg:items-center lg:justify-between">
              <div className="max-w-2xl">
                <span className="rounded-full bg-accent/15 px-3 py-1 text-xs font-black uppercase tracking-wider text-accent">
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
                <Link
                  href="/recruiter"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-accent px-7 text-sm font-black text-accent-foreground shadow-lg shadow-accent/25 transition hover:-translate-y-0.5"
                >
                  <span>Launch Recruiter View</span>
                  <span>⚡</span>
                </Link>
                <Link
                  href="/resume"
                  className="inline-flex h-12 items-center justify-center rounded-xl border border-border bg-background px-6 text-sm font-bold text-foreground transition hover:border-accent/40"
                >
                  Download Resume
                </Link>
              </div>
            </div>
          </Reveal>
        </section>

        {/* ============================================================ */}
        {/* 9. TECHNICAL NEWSLETTER & CONTACT                           */}
        {/* ============================================================ */}
        <section className="mt-16 sm:mt-24">
          <Reveal>
            <div className="relative overflow-hidden rounded-[2rem] border border-border bg-surface/85 p-6 shadow-xl backdrop-blur sm:p-8 lg:p-10">
              <div className="relative grid gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-center">
                <div>
                  <span className="inline-flex rounded-full border border-accent/25 bg-accent/10 px-4 py-1.5 text-xs font-black uppercase tracking-[0.2em] text-accent">
                    Technical Notes
                  </span>
                  <h3 className="mt-4 text-2xl font-black text-foreground sm:text-3xl lg:text-4xl">
                    Engineering Dispatch from WishMaster01
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground sm:text-base">
                    Practical write-ups on Next.js 16 App Router architecture,
                    retrieval-grounded AI systems, PostgreSQL database migrations,
                    and clean TypeScript systems.
                  </p>
                </div>

                <div className="rounded-2xl border border-border bg-background/70 p-5 sm:p-6">
                  <NewsletterForm source="portfolio-home" />
                </div>
              </div>
            </div>
          </Reveal>
        </section>
      </div>
    </div>
  );
}
