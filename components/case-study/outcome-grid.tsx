import { Reveal } from "@/components/motion/reveal";
import type { CaseStudyMetric } from "@/types/case-study";

type OutcomeGridProps = {
  outcomes: CaseStudyMetric[];
};

export function OutcomeGrid({ outcomes }: OutcomeGridProps) {
  return (
    <section aria-labelledby="outcomes-heading">
      <Reveal>
        <p className="text-xs font-black uppercase tracking-[0.22em] text-accent">
          Evaluated result
        </p>
        <h2
          id="outcomes-heading"
          className="mt-3 text-3xl font-black tracking-[-0.045em] sm:text-4xl"
        >
          Outcomes and measurable signals
        </h2>
      </Reveal>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {outcomes.map((outcome, index) => (
          <Reveal key={outcome.label} delay={index * 0.04}>
            <article className="relative overflow-hidden rounded-[2rem] border border-accent/20 bg-surface/90 p-6 shadow-sm shadow-foreground/5 transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-accent/10">
              <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-accent/15 blur-2xl" />
              <p className="relative text-4xl font-black tracking-[-0.05em] text-accent">
                {outcome.value}
              </p>
              <h3 className="relative mt-2 text-sm font-black uppercase tracking-[0.16em] text-muted-foreground">
                {outcome.label}
              </h3>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
