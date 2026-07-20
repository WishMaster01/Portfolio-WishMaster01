import { Reveal } from "@/components/motion/reveal";
import type { ArchitectureComponent } from "@/types/architecture";

type ComponentGridProps = {
  components: ArchitectureComponent[];
};

export function ComponentGrid({ components }: ComponentGridProps) {
  return (
    <section aria-labelledby="architecture-components-heading">
      <Reveal className="mb-8">
        <p className="text-xs font-black uppercase tracking-[0.22em] text-accent">
          Building blocks
        </p>
        <h2
          id="architecture-components-heading"
          className="mt-2 text-3xl font-black tracking-[-0.04em] text-foreground sm:text-4xl"
        >
          System components
        </h2>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">
          Each module has one clear responsibility. This keeps UI, validation,
          provider calls, persistence, billing, and admin operations from
          becoming tightly coupled.
        </p>
      </Reveal>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {components.map((component, index) => (
          <Reveal key={component.name} delay={index * 0.04}>
            <article className="group h-full rounded-[1.75rem] border border-border bg-surface/85 p-5 shadow-sm shadow-foreground/5 backdrop-blur transition hover:-translate-y-1 hover:border-accent/45 hover:shadow-2xl hover:shadow-accent/10">
              <div className="flex items-start gap-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-accent/10 text-sm font-black text-accent ring-1 ring-accent/20 transition group-hover:bg-accent group-hover:text-accent-foreground">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-xl font-black tracking-[-0.025em] text-foreground">
                    {component.name}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">
                    {component.responsibility}
                  </p>
                </div>
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                {component.technologies.map((technology) => (
                  <span
                    key={technology}
                    className="rounded-full border border-accent/20 bg-accent/10 px-3 py-1 text-xs font-black text-accent"
                  >
                    {technology}
                  </span>
                ))}
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
