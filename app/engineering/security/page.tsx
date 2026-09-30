import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "@/components/icons/arrow-left";
import { Reveal } from "@/components/motion/reveal";
import { GlassCard } from "@/components/ui/glass-card";
import { SectionHeader } from "@/components/ui/section-header";
import { AuroraBackground } from "@/components/aurora/aurora-background";

export const metadata: Metadata = {
  title: "Security Engineering | Sumit Kumar",
  description:
    "Production security engineering: cryptographic sessions, server-derived RBAC, Zod validation, distributed rate limits, sandboxed code execution, and strict CSP.",
  alternates: {
    canonical: "/engineering/security",
  },
};

const securityPillars = [
  {
    title: "Cryptographic Sessions & RBAC",
    category: "Identity & Access",
    description:
      "Client-provided identity headers (like x-user-id) are completely eliminated. Sessions use encrypted HTTP-only cookies with server-side role resolution (USER, RECRUITER, ADMIN). Unauthorized mutations are blocked before database access.",
  },
  {
    title: "Zod Schema Validation",
    category: "Input Boundary",
    description:
      "All route handlers, query parameters, contact forms, newsletter inputs, and Judge0 submissions are strictly validated against runtime Zod schemas. Untrusted properties are stripped automatically.",
  },
  {
    title: "Distributed Rate Limiting",
    category: "Abuse Prevention",
    description:
      "Sliding-window Redis rate limiters protect expensive endpoints including AI inference, code execution, contact emails, and GitHub proxy calls across distributed serverless instances.",
  },
  {
    title: "Judge0 Execution Sandboxing",
    category: "Code Execution Safety",
    description:
      "Algorithm sandbox execution is capped at 5 seconds CPU time, 128MB memory ceiling, 16KB max source code, and 4KB max stdin, preventing denial-of-service and memory leak attacks.",
  },
  {
    title: "Strict Security Headers & CSP",
    category: "Browser Hardening",
    description:
      "Configured Content-Security-Policy (CSP), Strict-Transport-Security (HSTS), X-Content-Type-Options (nosniff), X-Frame-Options (DENY), and Permissions-Policy protect users against clickjacking and script injection.",
  },
  {
    title: "Zero Secret Exposure",
    category: "Secrets Governance",
    description:
      "All API tokens, database connection strings, and provider keys are restricted to Node.js server runtimes. Zero NEXT_PUBLIC_ prefixes exist on sensitive credentials.",
  },
];

export default function SecurityPage() {
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
          eyebrow="Application & Infrastructure Security"
          title="Production Security Architecture"
          description="A verifiable breakdown of how the WishMaster01 codebase enforces defense-in-depth across authentication, inputs, sandboxing, and browser headers."
        />

        {/* Security Cards Grid */}
        <section className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {securityPillars.map((pillar, index) => (
              <Reveal key={pillar.title} delay={index * 0.04}>
                <GlassCard className="h-full p-6 sm:p-8 flex flex-col justify-between space-y-4 border-accent/25 hover:border-accent/45">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-accent bg-accent/15 px-2.5 py-0.5 rounded-full">
                        {pillar.category}
                      </span>
                      <span className="text-xs text-muted-foreground font-mono">
                        VERIFIED
                      </span>
                    </div>
                    <h3 className="text-lg font-black text-foreground">
                      {pillar.title}
                    </h3>
                    <p className="text-xs sm:text-sm leading-relaxed text-muted-foreground">
                      {pillar.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-border/70 flex items-center gap-2 text-xs font-mono text-accent">
                    <span>✓</span> Implemented in Production
                  </div>
                </GlassCard>
              </Reveal>
            ))}
          </div>
        </section>
      </div>
    </AuroraBackground>
  );
}
