import { Reveal } from "@/components/motion/reveal";

type RecruiterProfileSummaryProps = {
  education: Array<{
    title: string;
    institution: string;
    period: string;
    detail: string;
  }>;
  experienceSummary: Array<{
    title: string;
    period: string;
    summary: string;
  }>;
  highlights: string[];
};

export function RecruiterProfileSummary({
  education,
  experienceSummary,
  highlights,
}: RecruiterProfileSummaryProps) {
  return (
    <section className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
      <Reveal>
        <article className="h-full rounded-[2rem] border border-border bg-surface/85 p-5 shadow-sm shadow-foreground/5 backdrop-blur sm:p-6">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-accent">
            Education
          </p>
          <h2 className="mt-3 text-3xl font-black tracking-[-0.045em]">
            Academic foundation
          </h2>
          <div className="mt-6 grid gap-4">
            {education.map((item) => (
              <div
                key={`${item.title}-${item.period}`}
                className="rounded-2xl border border-border bg-background/60 p-4"
              >
                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h3 className="font-black">{item.title}</h3>
                    <p className="mt-1 text-sm font-bold text-accent">
                      {item.institution}
                    </p>
                  </div>
                  <span className="w-fit rounded-full bg-accent/10 px-3 py-1 text-xs font-black text-accent">
                    {item.period}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">
                  {item.detail}
                </p>
              </div>
            ))}
          </div>
        </article>
      </Reveal>

      <Reveal delay={0.05}>
        <article className="h-full rounded-[2rem] border border-border bg-surface/85 p-5 shadow-sm shadow-foreground/5 backdrop-blur sm:p-6">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-accent">
            Experience & achievements
          </p>
          <h2 className="mt-3 text-3xl font-black tracking-[-0.045em]">
            What recruiters should know
          </h2>
          <div className="mt-6 grid gap-4">
            {experienceSummary.map((item) => (
              <div
                key={`${item.title}-${item.period}`}
                className="rounded-2xl border border-border bg-background/60 p-4"
              >
                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                  <h3 className="font-black">{item.title}</h3>
                  <span className="w-fit rounded-full bg-surface-elevated px-3 py-1 text-xs font-black text-muted-foreground">
                    {item.period}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">
                  {item.summary}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-6 grid gap-3">
            {highlights.slice(0, 4).map((highlight, index) => (
              <div
                key={highlight}
                className="flex gap-3 rounded-2xl border border-border bg-background/60 p-4"
              >
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-accent/10 text-xs font-black text-accent">
                  {index + 1}
                </span>
                <p className="text-sm leading-6 text-muted-foreground">
                  {highlight}
                </p>
              </div>
            ))}
          </div>
        </article>
      </Reveal>
    </section>
  );
}
