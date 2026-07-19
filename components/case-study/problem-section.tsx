import { Reveal } from "@/components/motion/reveal";

type ProblemSectionProps = {
  background: string;
  problem: string;
  targetUsers: string;
  role: string;
};

const cards = [
  {
    key: "background",
    title: "Background",
    accent: "01",
  },
  {
    key: "problem",
    title: "Problem identified",
    accent: "02",
  },
  {
    key: "targetUsers",
    title: "Target users",
    accent: "03",
  },
  {
    key: "role",
    title: "My role",
    accent: "04",
  },
] as const;

export function ProblemSection({
  background,
  problem,
  targetUsers,
  role,
}: ProblemSectionProps) {
  const content = {
    background,
    problem,
    targetUsers,
    role,
  };

  return (
    <section aria-labelledby="problem-heading">
      <Reveal>
        <p className="text-xs font-black uppercase tracking-[0.22em] text-accent">
          Product context
        </p>
        <h2
          id="problem-heading"
          className="mt-3 text-3xl font-black tracking-[-0.045em] sm:text-4xl"
        >
          What needed to be solved
        </h2>
      </Reveal>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {cards.map((card, index) => (
          <Reveal key={card.key} delay={index * 0.04}>
            <article className="group h-full rounded-[2rem] border border-border bg-surface/85 p-5 shadow-sm shadow-foreground/5 backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-accent/40 hover:bg-accent/5 sm:p-6">
              <span className="grid h-11 w-11 place-items-center rounded-2xl bg-accent/10 text-xs font-black text-accent">
                {card.accent}
              </span>
              <h3 className="mt-5 text-xl font-black tracking-[-0.03em]">
                {card.title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                {content[card.key]}
              </p>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
