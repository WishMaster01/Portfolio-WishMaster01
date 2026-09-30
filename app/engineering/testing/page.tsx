import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "@/components/icons/arrow-left";
import { Reveal } from "@/components/motion/reveal";
import { GlassCard } from "@/components/ui/glass-card";
import { SectionHeader } from "@/components/ui/section-header";
import { TechnologyBadge } from "@/components/ui/technology-badge";
import { AuroraBackground } from "@/components/aurora/aurora-background";

export const metadata: Metadata = {
  title: "Testing Strategy & Quality Pyramid | Sumit Kumar",
  description:
    "Production testing pyramid: 75+ unit & integration tests, Vitest test runner, Playwright E2E suites, 16 AI benchmark evaluations, and CI pipelines.",
  alternates: {
    canonical: "/engineering/testing",
  },
};

const pyramidTiers = [
  {
    tier: "Top Tier",
    level: "E2E & Accessibility Testing",
    tech: "Playwright & Axe-Core",
    count: "Critical User Flows",
    description:
      "Automated end-to-end tests validating recruiter navigation, theme switching, contact form submissions, command palette shortcuts, and WCAG 2.2 AA accessibility standards.",
    color: "border-purple-500/30 text-purple-400 bg-purple-500/10",
  },
  {
    tier: "Middle Tier",
    level: "API & Integration Suites",
    tech: "Node.js Test Runner & Supertest",
    count: "30+ Integration Tests",
    description:
      "Validates authentication state transitions, role-based access control rejections, database migrations, rate-limiting counters, and Judge0 sandboxed executions.",
    color: "border-cyan-500/30 text-cyan-400 bg-cyan-500/10",
  },
  {
    tier: "Foundation Tier",
    level: "Unit Tests & Static Typing",
    tech: "Vitest, TypeScript (Strict), ESLint",
    count: "45+ Algorithm & Math Tests",
    description:
      "Exhaustive test coverage over core data structures: LRU/LFU cache evictions, BM25 inverse document scoring, Prefix Trie lookups, and Vector similarity calculations.",
    color: "border-emerald-500/30 text-emerald-400 bg-emerald-500/10",
  },
];

const aiBenchmarks = [
  {
    metric: "16 Evaluation Scenarios",
    summary:
      "Pre-scripted portfolio questions testing retrieval recall, answer groundedness, and resistance against instruction injection.",
  },
  {
    metric: "Zero Fabrication Requirement",
    summary:
      "Automated assert checks fail if the model attempts to invent ungrounded project metrics or fictitious production claims.",
  },
  {
    metric: "Latency SLA Assertions",
    summary:
      "Benchmarks verify that fallback to Google Gemini occurs reliably within 8000ms if OpenRouter encounters latency spikes.",
  },
];

export default function TestingPage() {
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
          eyebrow="Verification & Reliability"
          title="Testing Strategy &amp; Quality Gates"
          description="How strict TypeScript, comprehensive unit testing, integration suites, and AI benchmark evaluations guarantee that this portfolio is stable and defensible."
        />

        {/* Testing Pyramid Visualization */}
        <section className="space-y-6">
          <SectionHeader
            eyebrow="Testing Pyramid"
            title="Layered Test Coverage Distribution"
          />

          <div className="grid gap-6">
            {pyramidTiers.map((tier, idx) => (
              <Reveal key={tier.level} delay={idx * 0.05}>
                <GlassCard className="p-6 sm:p-8 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <span className={`rounded-full px-3 py-1 text-xs font-mono font-bold border ${tier.color}`}>
                        {tier.tier}
                      </span>
                      <h3 className="text-xl font-black text-foreground">
                        {tier.level}
                      </h3>
                    </div>
                    <span className="text-xs font-mono font-bold text-accent">
                      {tier.count}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {tier.description}
                  </p>

                  <div className="pt-3 border-t border-border/70 flex items-center gap-2">
                    <span className="text-xs font-bold text-muted-foreground">Stack:</span>
                    <TechnologyBadge name={tier.tech} />
                  </div>
                </GlassCard>
              </Reveal>
            ))}
          </div>
        </section>

        {/* AI Evaluation Benchmarks */}
        <section className="space-y-6">
          <SectionHeader
            eyebrow="AI Quality Verification"
            title="16 AI Retrieval & Grounding Benchmarks"
            description="Our evaluation harness (npm run eval:ai) runs automated tests against representative portfolio queries to score correctness and citation precision."
          />

          <div className="grid gap-6 sm:grid-cols-3">
            {aiBenchmarks.map((bench, idx) => (
              <Reveal key={bench.metric} delay={idx * 0.04}>
                <GlassCard className="h-full p-6 space-y-3">
                  <h3 className="text-base font-black text-foreground">
                    {bench.metric}
                  </h3>
                  <p className="text-xs leading-relaxed text-muted-foreground">
                    {bench.summary}
                  </p>
                </GlassCard>
              </Reveal>
            ))}
          </div>
        </section>
      </div>
    </AuroraBackground>
  );
}
