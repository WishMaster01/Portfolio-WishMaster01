import { Reveal } from "@/components/motion/reveal";
import type { ArchitectureDecision } from "@/types/architecture";

type DecisionRecordsProps = {
  decisions: ArchitectureDecision[];
};

export function DecisionRecords({ decisions }: DecisionRecordsProps) {
  return (
    <section aria-labelledby="architecture-decisions-heading">
      <Reveal className="mb-8">
        <p className="text-xs font-black uppercase tracking-[0.22em] text-accent">
          Engineering judgment
        </p>
        <h2
          id="architecture-decisions-heading"
          className="mt-2 text-3xl font-black tracking-[-0.04em] text-foreground sm:text-4xl"
        >
          Architecture decision records
        </h2>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">
          These decisions explain why the architecture is shaped this way, not
          only which tools are used.
        </p>
      </Reveal>

      <div className="grid gap-5 lg:grid-cols-3">
        {decisions.map((decision, index) => (
          <Reveal key={decision.title} delay={index * 0.05}>
            <article className="h-full rounded-[1.75rem] border border-border bg-surface/85 p-5 shadow-sm shadow-foreground/5 backdrop-blur transition hover:-translate-y-1 hover:border-accent/45 hover:shadow-2xl hover:shadow-accent/10">
              <span className="inline-flex rounded-full bg-accent/10 px-3 py-1 text-xs font-black text-accent">
                ADR {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-4 text-xl font-black tracking-[-0.025em] text-foreground">
                {decision.title}
              </h3>
              <p className="mt-3 text-sm font-bold text-foreground">
                Reason
              </p>
              <p className="mt-1 text-sm leading-7 text-muted-foreground">
                {decision.reason}
              </p>
              <p className="mt-4 text-sm font-bold text-foreground">
                Tradeoff
              </p>
              <p className="mt-1 text-sm leading-7 text-muted-foreground">
                {decision.tradeoff}
              </p>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
