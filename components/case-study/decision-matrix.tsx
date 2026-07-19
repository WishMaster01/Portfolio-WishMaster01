import { Reveal } from "@/components/motion/reveal";

type DecisionMatrixProps = {
  constraints: string[];
  goals: string[];
};

export function DecisionMatrix({ constraints, goals }: DecisionMatrixProps) {
  return (
    <section aria-labelledby="decision-heading">
      <Reveal>
        <p className="text-xs font-black uppercase tracking-[0.22em] text-accent">
          Product decisions
        </p>
        <h2
          id="decision-heading"
          className="mt-3 text-3xl font-black tracking-[-0.045em] sm:text-4xl"
        >
          Constraints shaped the goals
        </h2>
      </Reveal>

      <div className="mt-8 grid gap-5 lg:grid-cols-2">
        <DecisionList
          title="Constraints"
          description="Non-negotiable conditions that influenced the architecture and product decisions."
          items={constraints}
          prefix="C"
        />
        <DecisionList
          title="Goals"
          description="The product and engineering outcomes the implementation needed to support."
          items={goals}
          prefix="G"
        />
      </div>
    </section>
  );
}

function DecisionList({
  title,
  description,
  items,
  prefix,
}: {
  title: string;
  description: string;
  items: string[];
  prefix: string;
}) {
  return (
    <Reveal>
      <article className="h-full rounded-[2rem] border border-border bg-surface/85 p-5 shadow-sm shadow-foreground/5 backdrop-blur sm:p-6">
        <h3 className="text-2xl font-black tracking-[-0.04em]">{title}</h3>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          {description}
        </p>
        <div className="mt-5 grid gap-3">
          {items.map((item, index) => (
            <div
              key={item}
              className="flex gap-3 rounded-2xl border border-border bg-background/60 p-4 transition duration-300 hover:-translate-y-0.5 hover:border-accent/40 hover:bg-accent/5"
            >
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-accent/10 text-xs font-black text-accent">
                {prefix}
                {index + 1}
              </span>
              <p className="text-sm leading-6 text-muted-foreground">{item}</p>
            </div>
          ))}
        </div>
      </article>
    </Reveal>
  );
}
