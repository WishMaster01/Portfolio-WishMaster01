import { Reveal } from "@/components/motion/reveal";
import type { ArchitectureFlow } from "@/types/architecture";

type RequestFlowProps = {
  steps: string[];
  flows: ArchitectureFlow[];
};

export function RequestFlow({ steps, flows }: RequestFlowProps) {
  return (
    <section aria-labelledby="architecture-flow-heading">
      <Reveal className="mb-8">
        <p className="text-xs font-black uppercase tracking-[0.22em] text-accent">
          Runtime behavior
        </p>
        <h2
          id="architecture-flow-heading"
          className="mt-2 text-3xl font-black tracking-[-0.04em] text-foreground sm:text-4xl"
        >
          Request and data flow
        </h2>
      </Reveal>

      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <Reveal>
          <div className="relative h-full overflow-hidden rounded-[2rem] border border-accent/20 bg-surface/85 p-6 shadow-2xl shadow-accent/10 backdrop-blur sm:p-8">
            <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-accent/20 blur-3xl" />
            <p className="relative text-xs font-black uppercase tracking-[0.2em] text-accent">
              Primary request path
            </p>
            <ol className="relative mt-6 space-y-4">
              {steps.map((step, index) => (
                <li key={step} className="flex gap-4">
                  <span className="relative grid h-9 w-9 shrink-0 place-items-center rounded-full bg-accent text-xs font-black text-accent-foreground shadow-lg shadow-accent/25">
                    {index + 1}
                    {index < steps.length - 1 ? (
                      <span className="absolute left-1/2 top-full h-4 w-px -translate-x-1/2 bg-accent/35" />
                    ) : null}
                  </span>
                  <p className="pt-1 text-sm leading-7 text-muted-foreground">
                    {step}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </Reveal>

        <div className="grid gap-5">
          {flows.map((flow, index) => (
            <Reveal key={flow.title} delay={index * 0.04}>
              <article className="rounded-[1.75rem] border border-border bg-surface/85 p-5 shadow-sm shadow-foreground/5 backdrop-blur">
                <h3 className="text-xl font-black tracking-[-0.025em] text-foreground">
                  {flow.title}
                </h3>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {flow.steps.map((step) => (
                    <div
                      key={step}
                      className="rounded-2xl border border-border bg-background/60 p-4 text-sm leading-6 text-muted-foreground"
                    >
                      {step}
                    </div>
                  ))}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
