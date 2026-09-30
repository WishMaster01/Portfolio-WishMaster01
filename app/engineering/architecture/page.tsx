import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "@/components/icons/arrow-left";
import { Reveal } from "@/components/motion/reveal";
import { GlassCard } from "@/components/ui/glass-card";
import { TechnologyBadge } from "@/components/ui/technology-badge";
import { SectionHeader } from "@/components/ui/section-header";
import { AuroraBackground } from "@/components/aurora/aurora-background";

export const metadata: Metadata = {
  title: "System Architecture | Sumit Kumar",
  description:
    "Production system architecture, layered App Router topology, PostgreSQL database models, and service boundaries in Sumit Kumar's portfolio.",
  alternates: {
    canonical: "/engineering/architecture",
  },
};

const layers = [
  {
    step: "01",
    name: "Presentation & Edge Layer",
    tech: ["Next.js 16 App Router", "React 19 Server Components", "Tailwind CSS", "Framer Motion"],
    description:
      "Public routes are pre-rendered statically with ISR revalidation where appropriate. Client boundaries are isolated to interactive components (theme toggle, chat widget, command palette, algorithm sandboxes) to minimize client bundle overhead.",
    responsibility: "Route rendering, layout composition, accessibility trees, and responsive mobile drawers.",
  },
  {
    step: "02",
    name: "Validation & Security Gate",
    tech: ["Zod", "Server-Side RBAC", "HTTP Security Headers", "Session Cookies"],
    description:
      "All inbound requests across query parameters, path slugs, and JSON payloads are parsed through strict Zod schemas before hitting business logic. Client-provided identity headers are eliminated; cryptographic session cookies determine user role (USER, RECRUITER, ADMIN).",
    responsibility: "Input sanitization, role authorization, and CSRF/XSS protection.",
  },
  {
    step: "03",
    name: "Domain Service Layer",
    tech: ["TypeScript Domain Services", "BM25 Engine", "Dual Fallback AI Chain"],
    description:
      "Stateless domain services encapsulate business logic away from route handlers. Includes the hybrid retrieval pipeline (BM25 + vector ranking), Judge0 execution safety limits, and GitHub activity synchronizer.",
    responsibility: "Business rule orchestration, algorithm execution, and provider isolation.",
  },
  {
    step: "04",
    name: "Persistence & Caching Tier",
    tech: ["PostgreSQL", "Prisma ORM", "Redis Distributed Cache", "In-Memory LFU/LRU"],
    description:
      "PostgreSQL is the single source of truth for projects, case studies, blogs, messages, and telemetry. Redis manages distributed rate-limiting counters and external API cache entries. Process-local LFU/LRU caches speed up repetitive text searches and preference reads.",
    responsibility: "ACID transactions, relational integrity, foreign key constraints, and multi-tier caching.",
  },
];

const dataFlows = [
  {
    flow: "AI Assistant Query Flow",
    steps: [
      "User submits prompt in Aurora AI widget",
      "Route handler validates request size and verifies distributed rate limit quota",
      "Retrieval service extracts query terms and generates BM25 lexical candidates",
      "Candidate snippets are grounded into strict prompt template preventing instruction injection",
      "OpenRouter model executes inference; on timeout (>8s), transparent fallback to Google Gemini",
      "Structured response with cited portfolio references is returned to client",
    ],
  },
  {
    flow: "Judge0 Code Execution Flow",
    steps: [
      "User writes custom test case in algorithm sandbox",
      "Validation schema verifies code length (<16KB), stdin length (<4KB), and allowed language ID",
      "Rate limiter checks per-IP execution budget to prevent denial of service",
      "Job submitted to sandboxed Judge0 runner with 5-second CPU timeout and 128MB memory ceiling",
      "Execution output sanitized and returned with verified execution runtime and memory usage",
    ],
  },
];

export default function ArchitecturePage() {
  return (
    <AuroraBackground intensity="medium" className="min-h-screen">
      <div className="mx-auto w-full max-w-[1400px] px-4 py-12 sm:px-8 sm:py-16 lg:px-16 lg:py-20 text-foreground space-y-16">
        {/* Navigation Breadcrumb */}
        <Link
          href="/engineering"
          className="inline-flex items-center gap-2 text-xs font-bold text-accent hover:underline"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Engineering Hub
        </Link>

        {/* Header */}
        <SectionHeader
          eyebrow="System Design & Topology"
          title="Layered Production Architecture"
          description="Detailed breakdown of how the WishMaster01 portfolio routes, validates, processes, and persists data across decoupled layers."
        />

        {/* High-level Topology Visual Diagram */}
        <Reveal>
          <GlassCard className="p-8 sm:p-10 border-accent/30 shadow-xl shadow-accent/5">
            <h2 className="text-sm font-black uppercase tracking-wider text-accent mb-6">
              Full Stack Request Pipeline Diagram
            </h2>
            <div className="grid gap-4 md:grid-cols-4 relative">
              {layers.map((layer, idx) => (
                <div
                  key={layer.step}
                  className="rounded-2xl border border-border/80 bg-surface-elevated/60 p-5 space-y-3 relative group hover:border-accent/50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-black text-accent">
                      LAYER {layer.step}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {idx < 3 ? "→" : "✓"}
                    </span>
                  </div>
                  <h3 className="text-base font-black text-foreground">
                    {layer.name}
                  </h3>
                  <p className="text-xs leading-5 text-muted-foreground">
                    {layer.responsibility}
                  </p>
                  <div className="flex flex-wrap gap-1 pt-2">
                    {layer.tech.slice(0, 2).map((t) => (
                      <span
                        key={t}
                        className="rounded-md bg-accent/10 px-2 py-0.5 text-[10px] font-mono text-accent"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </Reveal>

        {/* Detailed Layer Specifications */}
        <section className="space-y-6">
          <SectionHeader
            eyebrow="Layer Specifications"
            title="Responsibilities & Technology Contracts"
          />

          <div className="grid gap-6 md:grid-cols-2">
            {layers.map((layer, index) => (
              <Reveal key={layer.name} delay={index * 0.05}>
                <GlassCard className="h-full p-6 sm:p-8 flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-3xl font-black text-accent/30 font-mono">
                        {layer.step}
                      </span>
                      <span className="rounded-full bg-accent/15 px-3 py-1 text-[11px] font-mono text-accent font-bold">
                        {layer.name}
                      </span>
                    </div>
                    <h3 className="text-xl font-black text-foreground">
                      {layer.name}
                    </h3>
                    <p className="text-xs sm:text-sm leading-relaxed text-muted-foreground">
                      {layer.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-border/70 space-y-2">
                    <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider block">
                      Core Technologies:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {layer.tech.map((t) => (
                        <TechnologyBadge key={t} name={t} />
                      ))}
                    </div>
                  </div>
                </GlassCard>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Critical End-to-End Data Flows */}
        <section className="space-y-6">
          <SectionHeader
            eyebrow="Runtime Execution"
            title="Critical Data Flow Walkthroughs"
            description="Trace real requests through security, caching, retrieval, and third-party orchestration."
          />

          <div className="grid gap-6 md:grid-cols-2">
            {dataFlows.map((flow, index) => (
              <Reveal key={flow.flow} delay={index * 0.05}>
                <GlassCard className="h-full p-6 sm:p-8 space-y-5">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
                    <h3 className="text-lg font-black text-foreground">
                      {flow.flow}
                    </h3>
                  </div>

                  <ol className="space-y-3 text-xs sm:text-sm text-muted-foreground list-decimal list-inside">
                    {flow.steps.map((s, stepIdx) => (
                      <li key={stepIdx} className="leading-relaxed">
                        <strong className="text-foreground">{s.split(" ")[0]}</strong>{" "}
                        {s.slice(s.indexOf(" ") + 1)}
                      </li>
                    ))}
                  </ol>
                </GlassCard>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Architectural Decision Records Link CTA */}
        <Reveal>
          <GlassCard className="p-8 sm:p-10 border-accent/40 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="max-w-xl space-y-2">
              <span className="text-xs font-black uppercase tracking-wider text-accent">
                Architectural Decision Records
              </span>
              <h3 className="text-2xl font-black text-foreground">
                Documented Engineering Trade-offs
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Review the implemented ADRs in the repository detailing why PostgreSQL was chosen as the
                source of truth, how session-based RBAC replaced client identity headers, and how hybrid AI retrieval was constructed.
              </p>
            </div>
            <Link
              href="/engineering"
              className="inline-flex h-11 items-center justify-center rounded-2xl bg-accent px-6 text-xs font-black text-accent-foreground shadow-lg shadow-accent/20 shrink-0 hover:opacity-95"
            >
              Explore All Engineering Pillars
            </Link>
          </GlassCard>
        </Reveal>
      </div>
    </AuroraBackground>
  );
}
