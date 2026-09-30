import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "@/components/icons/arrow-right";
import { Reveal } from "@/components/motion/reveal";
import { GlassCard } from "@/components/ui/glass-card";
import { SectionHeader } from "@/components/ui/section-header";
import { TechnologyBadge } from "@/components/ui/technology-badge";
import { AuroraBackground } from "@/components/aurora/aurora-background";
import { AlgorithmsShowcase } from "@/components/engineering/algorithms-section";
import { CombinedPlatformBanner } from "@/components/developer-activity/CombinedPlatformBanner";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: "Engineering Hub | Sumit Kumar",
  description:
    "System architecture, production algorithms, AI retrieval pipelines, security controls, and testing strategy in Sumit Kumar's portfolio.",
  alternates: {
    canonical: "/engineering",
  },
  openGraph: {
    title: `Engineering Hub | ${siteConfig.name}`,
    description:
      "Deep dive into system design, algorithmic efficiency, and production-grade engineering principles.",
    url: `${siteConfig.url}/engineering`,
  },
};

const engineeringDisciplines = [
  {
    title: "System Architecture",
    href: "/engineering/architecture",
    badge: "System Design",
    description:
      "Four-layer production architecture: Next.js 16 App Router edge presentation, Zod validation gates, decoupled domain services, and PostgreSQL relational persistence.",
    tags: ["App Router", "Layered Design", "PostgreSQL", "Prisma"],
  },
  {
    title: "Algorithms & DSA",
    href: "/engineering/algorithms",
    badge: "11 Algorithms",
    description:
      "Native TypeScript implementations of LRU/LFU caching, BM25 retrieval, Prefix Tries, Levenshtein distance, Priority Queues, and vector similarity.",
    tags: ["LRU Cache", "BM25", "Prefix Trie", "Complexity Analysis"],
  },
  {
    title: "AI Engineering & RAG",
    href: "/engineering/ai",
    badge: "Hybrid Retrieval",
    description:
      "Hybrid retrieval merging BM25 lexical ranking and 256-dim vector similarity with reciprocal rank fusion, prompt-injection defense, and OpenRouter-to-Gemini fallback.",
    tags: ["BM25 + Vector", "RRF Ranking", "Prompt Defense", "Fallback"],
  },
  {
    title: "Security Engineering",
    href: "/engineering/security",
    badge: "Defense in Depth",
    description:
      "Cryptographic session-based RBAC eliminating client identity headers, distributed Redis rate limiting, Judge0 execution quotas, and strict Content Security Policy.",
    tags: ["RBAC", "Redis Quotas", "Judge0 Sandbox", "Strict CSP"],
  },
  {
    title: "Performance Engineering",
    href: "/engineering/performance",
    badge: "Sub-millisecond",
    description:
      "Server Components by default, in-memory dual LFU/LRU caches, selective WebP/AVIF asset optimization, and background cached GitHub telemetry.",
    tags: ["Dual Cache", "Server Components", "Asset Tuning", "Fast TTFB"],
  },
  {
    title: "Testing Strategy",
    href: "/engineering/testing",
    badge: "75+ Tests & Evals",
    description:
      "Three-tier testing pyramid: Vitest unit tests over core algorithms, Playwright E2E suites, 16 AI benchmark evaluations, and GitHub Actions CI verification.",
    tags: ["Vitest", "Playwright", "16 AI Evals", "CI Pipeline"],
  },
];

const architecturalLayers = [
  {
    step: "01",
    title: "Client & Edge Layer",
    tech: "Next.js App Router, React 19, Tailwind CSS",
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
    title: "Persistence & Caching Tier",
    tech: "PostgreSQL, Prisma ORM, Distributed Redis",
    description:
      "PostgreSQL acts as the single source of truth with explicit indexes and foreign key constraints. Redis handles distributed rate limiting, cache tiers, and external API throttling.",
  },
];

export default function EngineeringPage() {
  return (
    <AuroraBackground intensity="medium" className="min-h-screen">
      <div className="mx-auto w-full max-w-[1400px] px-4 py-12 sm:px-8 sm:py-16 lg:px-16 lg:py-20 text-foreground space-y-20">
        {/* Hub Hero */}
        <section className="space-y-6">
          <Reveal className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-xs font-black uppercase tracking-[0.2em] text-accent">
              <span>Engineering Knowledge System</span>
            </div>
            <h1 className="text-4xl font-black tracking-[-0.04em] text-foreground sm:text-6xl">
              Engineering Hub
            </h1>
            <p className="text-base leading-relaxed text-muted-foreground sm:text-lg sm:leading-8">
              Explore the technical disciplines powering this portfolio: production system
              architecture, first-principles algorithm implementations, hybrid AI retrieval,
              hardened security boundaries, and rigorous testing suites.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <a
                href="#disciplines"
                className="inline-flex h-11 items-center gap-2 rounded-2xl bg-accent px-6 text-xs font-black text-accent-foreground shadow-lg shadow-accent/25 transition hover:opacity-95"
              >
                <span>Browse Engineering Disciplines</span>
                <ArrowRight className="h-4 w-4" />
              </a>
              <Link
                href="/projects"
                className="inline-flex h-11 items-center gap-2 rounded-2xl border border-border bg-surface px-6 text-xs font-bold text-foreground transition hover:border-accent/40 hover:text-accent"
              >
                Project Case Studies
              </Link>
            </div>
          </Reveal>
        </section>

        {/* 6 Engineering Disciplines Grid */}
        <section id="disciplines" className="space-y-8 scroll-mt-24">
          <SectionHeader
            eyebrow="Core Disciplines"
            title="Interactive Engineering Deep Dives"
            description="Dedicated technical pages analyzing real implementations, trade-offs, and architecture."
          />

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {engineeringDisciplines.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.04}>
                <Link href={item.href} className="group block h-full">
                  <GlassCard className="h-full p-6 sm:p-8 flex flex-col justify-between space-y-5 border-accent/25 group-hover:border-accent/50 transition-colors">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="rounded-full bg-accent/15 px-3 py-1 text-[11px] font-mono font-bold text-accent">
                          {item.badge}
                        </span>
                        <span className="text-xs text-muted-foreground group-hover:text-accent group-hover:translate-x-1 transition-all">
                          →
                        </span>
                      </div>

                      <h3 className="text-xl font-black text-foreground group-hover:text-accent transition-colors">
                        {item.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-border/70 flex flex-wrap gap-1.5">
                      {item.tags.map((t) => (
                        <TechnologyBadge key={t} name={t} />
                      ))}
                    </div>
                  </GlassCard>
                </Link>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Layered Application Architecture */}
        <section className="space-y-8">
          <SectionHeader
            eyebrow="System Topology"
            title="Layered Application Architecture"
            description="How requests travel through strict validation, services, and persistence layers."
            action={
              <Link
                href="/engineering/architecture"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-accent hover:underline shrink-0"
              >
                Full Architecture Spec <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            }
          />

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {architecturalLayers.map((layer, index) => (
              <Reveal key={layer.step} delay={index * 0.05}>
                <GlassCard className="h-full p-6 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <span className="text-3xl font-black text-accent/30 font-mono">
                      {layer.step}
                    </span>
                    <h3 className="text-base font-black text-foreground">
                      {layer.title}
                    </h3>
                    <p className="text-xs leading-relaxed text-muted-foreground">
                      {layer.description}
                    </p>
                  </div>
                  <div className="pt-2 border-t border-border/70">
                    <span className="text-[10px] font-mono text-accent">
                      {layer.tech}
                    </span>
                  </div>
                </GlassCard>
              </Reveal>
            ))}
          </div>
        </section>

        {/* In-Repository Algorithms Showcase */}
        <section id="algorithms" className="space-y-8 scroll-mt-24">
          <SectionHeader
            eyebrow="Algorithmic Depth"
            title="11 In-Repository Algorithms"
            description="Demonstrated algorithmic implementation in TypeScript with formal complexity analysis and explicit portfolio usage."
            action={
              <Link
                href="/engineering/algorithms"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-accent hover:underline shrink-0"
              >
                Dedicated Algorithms Page <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            }
          />

          <GlassCard className="p-6 sm:p-8 border-accent/25">
            <AlgorithmsShowcase />
          </GlassCard>
        </section>

        {/* Dual Platform Telemetry (GitHub & LeetCode) */}
        <section className="space-y-8">
          <CombinedPlatformBanner />
        </section>
      </div>
    </AuroraBackground>
  );
}
