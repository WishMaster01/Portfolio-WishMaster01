import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "@/components/icons/arrow-right";
import { Reveal } from "@/components/motion/reveal";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { AlgorithmsShowcase } from "@/components/engineering/algorithms-section";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: "Engineering & Algorithms",
  description:
    "System architecture, clean design patterns, and 11 core data structures & algorithms implemented in the WishMaster01 portfolio codebase.",
  alternates: {
    canonical: "/engineering",
  },
  openGraph: {
    title: `Engineering & Algorithms | ${siteConfig.name}`,
    description:
      "Deep dive into system design, algorithmic efficiency, and production-grade engineering principles.",
    url: `${siteConfig.url}/engineering`,
  },
};

const architecturalLayers = [
  {
    step: "01",
    title: "Client & Edge Layer",
    tech: "Next.js App Router, React 19, Tailwind CSS v4",
    description:
      "Static site generation (SSG) for public content, minimal client component boundaries, accessible focus management, and automatic theme hydration via LFU cache.",
  },
  {
    step: "02",
    title: "Validation & Security Gate",
    tech: "Zod Schema Validation, CSP, Session RBAC",
    description:
      "Every mutation and search parameter is validated before processing. Server-side role checks reject untrusted client claims. Strict HTTP headers protect against XSS and clickjacking.",
  },
  {
    step: "03",
    title: "Service & Business Layer",
    tech: "Modular Domain Services, Algorithmic Indexers",
    description:
      "Clean separation of business logic from UI components. Implements BM25 text retrieval, Cosine similarity context generation, and AI provider fallback chains.",
  },
  {
    step: "04",
    title: "Persistence & Caching Layer",
    tech: "PostgreSQL, Prisma ORM, Distributed Redis Caching",
    description:
      "PostgreSQL acts as the single source of truth with explicit indexes and foreign key constraints. Redis handles distributed rate limiting, cache tiers, and external API throttling.",
  },
];

const engineeringHighlights = [
  {
    title: "PostgreSQL as Source of Truth",
    summary:
      "Replaced hybrid static storage with normalized relational models, indexed query paths, and transaction safety for all core domain entities.",
  },
  {
    title: "Deterministic Algorithmic Retrieval",
    summary:
      "Implemented in-memory BM25 retrieval, Prefix Tries, and Cosine vector similarity to power instant search and grounded context construction without heavy external dependencies.",
  },
  {
    title: "Strict Type Safety Baseline",
    summary:
      "100% strict TypeScript with zero implicit any. Schema-driven validation ensures that database rows, API requests, and UI props share unified type contracts.",
  },
  {
    title: "Fault-Tolerant AI Provider Fallback",
    summary:
      "Dual-provider architecture using OpenRouter primary with automatic timeout fallback to Gemini API, with structured context guarding against prompt injection.",
  },
  {
    title: "Defensible Performance & Caching",
    summary:
      "Dual LFU and LRU caches reduce repeated lookups for user preferences and search queries from milliseconds to sub-microsecond in-memory reads.",
  },
  {
    title: "Accessible & Resilient UI Systems",
    summary:
      "Semantic HTML, full keyboard navigation, skip links, contrast-checked dark/light modes, and automatic prefers-reduced-motion accommodations.",
  },
];

export default function EngineeringPage() {
  return (
    <div className="bg-background text-foreground">
      <Section className="py-12 sm:py-16 lg:py-20">
        <Container className="max-w-[1400px]">
          {/* Hero */}
          <Reveal className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-xl bg-accent/10 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-accent">
              <span>System Design &amp; Algorithms</span>
            </div>
            <h1 className="mt-5 text-4xl font-black tracking-[-0.04em] text-foreground sm:text-6xl">
              Engineering Architecture &amp; Foundations
            </h1>
            <p className="mt-4 text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
              This portfolio is built to demonstrate genuine software engineering:
              disciplined system architecture, strict type contracts, defensible
              metrics, and production data structures implemented from first principles.
            </p>

            <div className="mt-6 flex flex-wrap gap-4">
              <a
                href="#algorithms"
                className="inline-flex h-11 items-center gap-2 rounded-xl bg-accent px-6 text-sm font-bold text-accent-foreground shadow-lg shadow-accent/25 transition hover:-translate-y-0.5"
              >
                Inspect Algorithms (11)
                <ArrowRight className="h-4 w-4" />
              </a>
              <Link
                href="/projects"
                className="inline-flex h-11 items-center gap-2 rounded-xl border border-border bg-surface px-6 text-sm font-bold text-foreground transition hover:border-accent/40"
              >
                Project Case Studies
              </Link>
            </div>
          </Reveal>

          {/* Architecture Pipeline */}
          <section className="mt-16 sm:mt-24">
            <Reveal className="mb-8">
              <span className="text-xs font-black uppercase tracking-[0.2em] text-accent">
                System Topology
              </span>
              <h2 className="mt-2 text-2xl font-black sm:text-4xl">
                Layered Application Architecture
              </h2>
              <p className="mt-2 text-sm text-muted-foreground sm:text-base">
                How requests travel through strict validation, services, and persistence layers.
              </p>
            </Reveal>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {architecturalLayers.map((layer, index) => (
                <Reveal key={layer.step} delay={index * 0.05}>
                  <div className="flex h-full flex-col justify-between rounded-2xl border border-border bg-surface p-6 shadow-sm">
                    <div>
                      <span className="text-3xl font-black text-accent/40">
                        {layer.step}
                      </span>
                      <h3 className="mt-2 text-lg font-black text-foreground">
                        {layer.title}
                      </h3>
                      <p className="mt-1 text-xs font-bold text-accent">
                        {layer.tech}
                      </p>
                      <p className="mt-3 text-xs leading-5 text-muted-foreground sm:text-sm sm:leading-6">
                        {layer.description}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </section>

          {/* DSA Showcase */}
          <section id="algorithms" className="mt-16 sm:mt-24 scroll-mt-24">
            <Reveal className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <span className="text-xs font-black uppercase tracking-[0.2em] text-accent">
                  Algorithms &amp; Data Structures
                </span>
                <h2 className="mt-2 text-2xl font-black sm:text-4xl">
                  Key Production Algorithms
                </h2>
                <p className="mt-2 text-sm text-muted-foreground sm:text-base max-w-2xl">
                  Demonstrating algorithmic engineering with real complexity analysis,
                  rationale, and portfolio code integration.
                </p>
              </div>

              <Link
                href="/dsa-showcase"
                className="inline-flex items-center gap-2 text-sm font-bold text-accent hover:underline shrink-0"
              >
                View 30+ Topic Practice Catalog
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Reveal>

            <AlgorithmsShowcase />
          </section>

          {/* Engineering Highlights */}
          <section className="mt-16 sm:mt-24">
            <Reveal className="mb-8">
              <span className="text-xs font-black uppercase tracking-[0.2em] text-accent">
                Engineering Highlights
              </span>
              <h2 className="mt-2 text-2xl font-black sm:text-4xl">
                Technical Execution Highlights
              </h2>
            </Reveal>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {engineeringHighlights.map((item, index) => (
                <Reveal key={item.title} delay={index * 0.04}>
                  <div className="h-full rounded-2xl border border-border bg-surface p-6 shadow-sm">
                    <h3 className="text-base font-black text-foreground">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      {item.summary}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </section>

          {/* Recruiter CTA */}
          <section className="mt-16 sm:mt-24">
            <Reveal>
              <div className="rounded-3xl border border-accent/30 bg-surface/90 p-8 shadow-xl backdrop-blur sm:p-12 lg:flex lg:items-center lg:justify-between">
                <div className="max-w-2xl">
                  <span className="text-xs font-black uppercase tracking-[0.2em] text-accent">
                    For Technical Recruiters &amp; Engineering Managers
                  </span>
                  <h3 className="mt-3 text-2xl font-black text-foreground sm:text-3xl">
                    Need a 30-second candidate summary?
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground sm:text-base">
                    Inspect core technical competencies, verified projects, resume download,
                    and contact links in a streamlined single-page view.
                  </p>
                </div>
                <div className="mt-6 flex shrink-0 gap-4 lg:mt-0">
                  <Link
                    href="/recruiter"
                    className="inline-flex h-12 items-center justify-center rounded-xl bg-accent px-6 text-sm font-black text-accent-foreground shadow-lg shadow-accent/25 transition hover:-translate-y-0.5"
                  >
                    Open Recruiter View
                  </Link>
                  <Link
                    href="/resume"
                    className="inline-flex h-12 items-center justify-center rounded-xl border border-border bg-background px-6 text-sm font-bold text-foreground transition hover:border-accent/40"
                  >
                    Resume
                  </Link>
                </div>
              </div>
            </Reveal>
          </section>
        </Container>
      </Section>
    </div>
  );
}
