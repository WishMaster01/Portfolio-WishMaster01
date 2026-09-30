import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "@/components/icons/arrow-left";
import { Reveal } from "@/components/motion/reveal";
import { GlassCard } from "@/components/ui/glass-card";
import { SectionHeader } from "@/components/ui/section-header";
import { TechnologyBadge } from "@/components/ui/technology-badge";
import { AuroraBackground } from "@/components/aurora/aurora-background";

export const metadata: Metadata = {
  title: "AI Engineering & Retrieval | Sumit Kumar",
  description:
    "AI retrieval architecture: BM25 lexical scoring, vector similarity, hybrid reciprocal rank fusion, prompt-injection guardrails, and dual-provider fallback.",
  alternates: {
    canonical: "/engineering/ai",
  },
};

const pipelineSteps = [
  {
    step: "01",
    name: "User Query & Sanitization",
    description:
      "Inbound query is checked against size constraints (<1000 chars), stripped of control characters, and evaluated by rate-limiting middleware.",
  },
  {
    step: "02",
    name: "Lexical Retrieval (BM25)",
    description:
      "BM25 calculates term frequency and inverse document frequency across tokenized portfolio documents to surface keyword-accurate matches.",
  },
  {
    step: "03",
    name: "Semantic Vector Search",
    description:
      "Cosine similarity across 256-dimensional embeddings retrieves semantically related case studies, skills, and technical trade-offs even without exact keyword overlap.",
  },
  {
    step: "04",
    name: "Hybrid Ranking (RRF)",
    description:
      "Reciprocal Rank Fusion merges BM25 lexical candidates and vector similarity candidates into a single ranked candidate pool.",
  },
  {
    step: "05",
    name: "Grounded Context Construction",
    description:
      "Top-ranked snippets are assembled into a hardened system prompt with explicit instructions forbidding fabrication and resisting prompt injection.",
  },
  {
    step: "06",
    name: "Dual Provider Inference",
    description:
      "OpenRouter serves as primary inference provider; if an API timeout or error occurs (>8s), the request falls back seamlessly to Google Gemini.",
  },
];

const guardrails = [
  {
    title: "Zero Hallucination Mandate",
    description:
      "The assistant is instructed to explicitly state 'I do not have enough information in the portfolio data' when a query cannot be grounded in verified documents.",
  },
  {
    title: "System Prompt Extraction Defense",
    description:
      "The prompt structure rejects instructions attempting to reveal hidden instructions, developer directives, or internal API configurations.",
  },
  {
    title: "Tool & Mutation Isolation",
    description:
      "The AI chat endpoint is strictly read-only and has no mutation privileges over the database, file system, or admin routes.",
  },
  {
    title: "Distributed Rate Limiting",
    description:
      "Redis sliding-window rate limiters prevent query spam and abusive inference cycles from consuming external API quotas.",
  },
];

export default function AiEngineeringPage() {
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
          eyebrow="Artificial Intelligence & Systems"
          title="AI Retrieval & Grounding Architecture"
          description="A transparent, defensible implementation of hybrid lexical and semantic retrieval powering Aurora AI without hallucinatory claims."
        />

        {/* Retrieval Pipeline Visualization */}
        <section className="space-y-6">
          <SectionHeader
            eyebrow="Architecture Pipeline"
            title="End-to-End Query & Grounding Pipeline"
          />

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {pipelineSteps.map((step, idx) => (
              <Reveal key={step.step} delay={idx * 0.04}>
                <GlassCard className="h-full p-6 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-black text-accent">
                      STAGE {step.step}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {idx < pipelineSteps.length - 1 ? "↓" : "✓"}
                    </span>
                  </div>
                  <h3 className="text-base font-black text-foreground">
                    {step.name}
                  </h3>
                  <p className="text-xs leading-relaxed text-muted-foreground">
                    {step.description}
                  </p>
                </GlassCard>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Providers & Fallback Strategy */}
        <section className="space-y-6">
          <SectionHeader
            eyebrow="Reliability & Redundancy"
            title="Dual Provider Fallback Chain"
            description="Production LLM endpoints must handle network degradation and rate-limit spikes gracefully."
          />

          <div className="grid gap-6 md:grid-cols-2">
            <Reveal>
              <GlassCard className="h-full p-6 sm:p-8 space-y-4 border-cyan-500/30">
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-cyan-500/15 px-3 py-1 text-xs font-mono font-bold text-cyan-400">
                    Primary Provider
                  </span>
                  <span className="text-xs font-mono text-muted-foreground">8000ms SLA</span>
                </div>
                <h3 className="text-xl font-black text-foreground">OpenRouter API</h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Handles primary inference with cost-optimized models. Requests are dispatched
                  with custom timeout bounds and exponential backoff retry policies.
                </p>
                <div className="pt-2 flex flex-wrap gap-1.5">
                  <TechnologyBadge name="OpenRouter" />
                  <TechnologyBadge name="JSON Mode" />
                  <TechnologyBadge name="Timeout Guards" />
                </div>
              </GlassCard>
            </Reveal>

            <Reveal delay={0.05}>
              <GlassCard className="h-full p-6 sm:p-8 space-y-4 border-purple-500/30">
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-purple-500/15 px-3 py-1 text-xs font-mono font-bold text-purple-400">
                    Failover Fallback
                  </span>
                  <span className="text-xs font-mono text-muted-foreground">Automated</span>
                </div>
                <h3 className="text-xl font-black text-foreground">Google Gemini API</h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Automatically receives the synthesized prompt if OpenRouter exceeds latency
                  thresholds or responds with an upstream provider error, ensuring uninterrupted availability.
                </p>
                <div className="pt-2 flex flex-wrap gap-1.5">
                  <TechnologyBadge name="Gemini 2.5 Flash" />
                  <TechnologyBadge name="Failover Recovery" />
                  <TechnologyBadge name="Observability" />
                </div>
              </GlassCard>
            </Reveal>
          </div>
        </section>

        {/* Safety & Guardrails */}
        <section className="space-y-6">
          <SectionHeader
            eyebrow="Security & Safety"
            title="Prompt Injection & Quality Guardrails"
          />

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {guardrails.map((g, index) => (
              <Reveal key={g.title} delay={index * 0.04}>
                <GlassCard className="h-full p-6 space-y-3">
                  <h3 className="text-sm font-black text-foreground">
                    {g.title}
                  </h3>
                  <p className="text-xs leading-relaxed text-muted-foreground">
                    {g.description}
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
