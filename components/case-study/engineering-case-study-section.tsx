import { Reveal } from "@/components/motion/reveal";
import type { ProjectCaseStudyData } from "@/types/case-study";

type EngineeringCaseStudySectionProps = {
  caseStudy: ProjectCaseStudyData;
};

export function EngineeringCaseStudySection({
  caseStudy,
}: EngineeringCaseStudySectionProps) {
  const hasArchitecturalDecisions =
    caseStudy.whyArchitecture ||
    caseStudy.whyPostgres ||
    caseStudy.whyRedis ||
    caseStudy.whyAIApproach;

  const hasPostMortem = caseStudy.whatFailed || caseStudy.whatChanged;
  const hasEngineeringHardening =
    caseStudy.performance ||
    caseStudy.security ||
    (caseStudy.tradeoffs && caseStudy.tradeoffs.length > 0) ||
    caseStudy.futureArchitecture;

  if (!hasArchitecturalDecisions && !hasPostMortem && !hasEngineeringHardening) {
    return null;
  }

  return (
    <div className="space-y-16 sm:space-y-20">
      {/* 1. Architectural Justification & Technical Choices */}
      {hasArchitecturalDecisions && (
        <section>
          <Reveal className="mb-6">
            <span className="text-xs font-black uppercase tracking-[0.2em] text-accent">
              Architectural Rationale
            </span>
            <h2 className="mt-2 text-2xl font-black text-foreground sm:text-3xl">
              Why This Architecture?
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Technical decisions, data store selection, and system topology rationale.
            </p>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-2">
            {caseStudy.whyArchitecture && (
              <Reveal delay={0.03}>
                <div className="h-full rounded-2xl border border-border bg-surface p-6 shadow-sm">
                  <span className="text-xs font-black uppercase tracking-wider text-accent">
                    Topology
                  </span>
                  <h3 className="mt-2 text-lg font-black text-foreground">
                    System Architecture
                  </h3>
                  <p className="mt-3 text-xs leading-5 text-muted-foreground sm:text-sm sm:leading-6">
                    {caseStudy.whyArchitecture}
                  </p>
                </div>
              </Reveal>
            )}

            {caseStudy.whyPostgres && (
              <Reveal delay={0.06}>
                <div className="h-full rounded-2xl border border-border bg-surface p-6 shadow-sm">
                  <span className="text-xs font-black uppercase tracking-wider text-accent">
                    Persistence
                  </span>
                  <h3 className="mt-2 text-lg font-black text-foreground">
                    Why PostgreSQL?
                  </h3>
                  <p className="mt-3 text-xs leading-5 text-muted-foreground sm:text-sm sm:leading-6">
                    {caseStudy.whyPostgres}
                  </p>
                </div>
              </Reveal>
            )}

            {caseStudy.whyRedis && (
              <Reveal delay={0.09}>
                <div className="h-full rounded-2xl border border-border bg-surface p-6 shadow-sm">
                  <span className="text-xs font-black uppercase tracking-wider text-accent">
                    Caching &amp; Rate Limiting
                  </span>
                  <h3 className="mt-2 text-lg font-black text-foreground">
                    Why Redis?
                  </h3>
                  <p className="mt-3 text-xs leading-5 text-muted-foreground sm:text-sm sm:leading-6">
                    {caseStudy.whyRedis}
                  </p>
                </div>
              </Reveal>
            )}

            {caseStudy.whyAIApproach && (
              <Reveal delay={0.12}>
                <div className="h-full rounded-2xl border border-border bg-surface p-6 shadow-sm">
                  <span className="text-xs font-black uppercase tracking-wider text-accent">
                    Model Orchestration
                  </span>
                  <h3 className="mt-2 text-lg font-black text-foreground">
                    Why This AI Approach?
                  </h3>
                  <p className="mt-3 text-xs leading-5 text-muted-foreground sm:text-sm sm:leading-6">
                    {caseStudy.whyAIApproach}
                  </p>
                </div>
              </Reveal>
            )}
          </div>
        </section>
      )}

      {/* 2. Engineering Post-Mortem: What Failed & What Changed */}
      {hasPostMortem && (
        <section>
          <Reveal className="mb-6">
            <span className="text-xs font-black uppercase tracking-[0.2em] text-accent">
              Engineering Reflection
            </span>
            <h2 className="mt-2 text-2xl font-black text-foreground sm:text-3xl">
              What Failed &amp; What I Changed
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Honest review of engineering bottlenecks encountered during development and architectural pivots.
            </p>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-2">
            {caseStudy.whatFailed && (
              <Reveal delay={0.04}>
                <div className="h-full rounded-2xl border border-red-500/20 bg-red-500/5 p-6 shadow-sm">
                  <span className="text-xs font-black uppercase tracking-wider text-red-500">
                    Challenge / Failure Mode
                  </span>
                  <h3 className="mt-2 text-lg font-black text-foreground">
                    What Failed Initially
                  </h3>
                  <p className="mt-3 text-xs leading-5 text-muted-foreground sm:text-sm sm:leading-6">
                    {caseStudy.whatFailed}
                  </p>
                </div>
              </Reveal>
            )}

            {caseStudy.whatChanged && (
              <Reveal delay={0.08}>
                <div className="h-full rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-6 shadow-sm">
                  <span className="text-xs font-black uppercase tracking-wider text-emerald-500">
                    Resolution / Architectural Pivot
                  </span>
                  <h3 className="mt-2 text-lg font-black text-foreground">
                    What I Changed
                  </h3>
                  <p className="mt-3 text-xs leading-5 text-muted-foreground sm:text-sm sm:leading-6">
                    {caseStudy.whatChanged}
                  </p>
                </div>
              </Reveal>
            )}
          </div>
        </section>
      )}

      {/* 3. Trade-offs, Performance & Security */}
      {hasEngineeringHardening && (
        <section>
          <Reveal className="mb-6">
            <span className="text-xs font-black uppercase tracking-[0.2em] text-accent">
              Hardening &amp; Trade-offs
            </span>
            <h2 className="mt-2 text-2xl font-black text-foreground sm:text-3xl">
              Performance, Security &amp; Trade-offs
            </h2>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-3">
            {caseStudy.tradeoffs && caseStudy.tradeoffs.length > 0 && (
              <Reveal delay={0.04}>
                <div className="h-full rounded-2xl border border-border bg-surface p-6 shadow-sm">
                  <span className="text-xs font-black uppercase tracking-wider text-accent">
                    Engineering Judgment
                  </span>
                  <h3 className="mt-2 text-lg font-black text-foreground">
                    Trade-offs
                  </h3>
                  <ul className="mt-3 space-y-2 text-xs leading-5 text-muted-foreground sm:text-sm sm:leading-6 list-disc list-inside">
                    {caseStudy.tradeoffs.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            )}

            {caseStudy.performance && (
              <Reveal delay={0.08}>
                <div className="h-full rounded-2xl border border-border bg-surface p-6 shadow-sm">
                  <span className="text-xs font-black uppercase tracking-wider text-accent">
                    Optimization
                  </span>
                  <h3 className="mt-2 text-lg font-black text-foreground">
                    Performance
                  </h3>
                  <p className="mt-3 text-xs leading-5 text-muted-foreground sm:text-sm sm:leading-6">
                    {caseStudy.performance}
                  </p>
                </div>
              </Reveal>
            )}

            {caseStudy.security && (
              <Reveal delay={0.12}>
                <div className="h-full rounded-2xl border border-border bg-surface p-6 shadow-sm">
                  <span className="text-xs font-black uppercase tracking-wider text-accent">
                    Protection
                  </span>
                  <h3 className="mt-2 text-lg font-black text-foreground">
                    Security
                  </h3>
                  <p className="mt-3 text-xs leading-5 text-muted-foreground sm:text-sm sm:leading-6">
                    {caseStudy.security}
                  </p>
                </div>
              </Reveal>
            )}
          </div>

          {caseStudy.futureArchitecture && (
            <Reveal className="mt-6">
              <div className="rounded-2xl border border-border bg-surface-elevated/40 p-6">
                <span className="text-xs font-black uppercase tracking-wider text-accent">
                  Roadmap
                </span>
                <h3 className="mt-1 text-base font-black text-foreground">
                  Future Architecture &amp; Scale
                </h3>
                <p className="mt-2 text-xs leading-5 text-muted-foreground sm:text-sm sm:leading-6">
                  {caseStudy.futureArchitecture}
                </p>
              </div>
            </Reveal>
          )}
        </section>
      )}
    </div>
  );
}
