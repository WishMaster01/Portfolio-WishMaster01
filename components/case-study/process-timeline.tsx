import { Reveal } from "@/components/motion/reveal";
import type { CaseStudyPhase } from "@/types/case-study";

type ProcessTimelineProps = {
  phases: CaseStudyPhase[];
};

export function ProcessTimeline({ phases }: ProcessTimelineProps) {
  return (
    <section aria-labelledby="process-heading">
      <Reveal>
        <p className="text-xs font-black uppercase tracking-[0.22em] text-accent">
          Execution process
        </p>
        <h2
          id="process-heading"
          className="mt-3 text-3xl font-black tracking-[-0.045em] sm:text-4xl"
        >
          How the project moved from idea to system
        </h2>
      </Reveal>

      <div className="relative mt-8 grid gap-4 lg:grid-cols-4">
        <div className="pointer-events-none absolute left-6 right-6 top-10 hidden h-px bg-linear-to-r from-transparent via-accent/50 to-transparent lg:block" />
        {phases.map((phase, index) => (
          <Reveal key={phase.phase} delay={index * 0.05}>
            <article className="relative h-full rounded-[2rem] border border-border bg-surface/90 p-5 shadow-sm shadow-foreground/5 backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-accent/40 sm:p-6">
              <span className="grid h-12 w-12 place-items-center rounded-2xl border border-accent/25 bg-background text-sm font-black text-accent shadow-sm shadow-accent/10">
                {index + 1}
              </span>
              <p className="mt-5 text-xs font-black uppercase tracking-[0.18em] text-accent">
                Phase {index + 1}
              </p>
              <h3 className="mt-2 text-xl font-black tracking-[-0.03em]">
                {phase.phase}
              </h3>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                {phase.description}
              </p>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
