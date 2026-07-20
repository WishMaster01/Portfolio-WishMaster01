import { Reveal } from "@/components/motion/reveal";
import type { ArchitectureFlow, ArchitectureQuality } from "@/types/architecture";

type QualityPanelProps =
  | {
      eyebrow: string;
      title: string;
      description: string;
      items: ArchitectureQuality[];
      variant?: "quality";
    }
  | {
      eyebrow: string;
      title: string;
      description: string;
      items: ArchitectureFlow[];
      variant: "flow";
    };

export function QualityPanel({
  eyebrow,
  title,
  description,
  items,
  variant = "quality",
}: QualityPanelProps) {
  return (
    <section aria-labelledby={`${title.toLowerCase().replaceAll(" ", "-")}-heading`}>
      <Reveal className="mb-8">
        <p className="text-xs font-black uppercase tracking-[0.22em] text-accent">
          {eyebrow}
        </p>
        <h2
          id={`${title.toLowerCase().replaceAll(" ", "-")}-heading`}
          className="mt-2 text-3xl font-black tracking-[-0.04em] text-foreground sm:text-4xl"
        >
          {title}
        </h2>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">
          {description}
        </p>
      </Reveal>

      <div className="grid gap-5 md:grid-cols-2">
        {items.map((item, index) => (
          <Reveal key={item.title} delay={index * 0.04}>
            <article className="h-full rounded-[1.75rem] border border-border bg-surface/85 p-5 shadow-sm shadow-foreground/5 backdrop-blur">
              <h3 className="text-xl font-black tracking-[-0.025em] text-foreground">
                {item.title}
              </h3>
              {variant === "quality" && "description" in item ? (
                <p className="mt-3 text-sm leading-7 text-muted-foreground">
                  {item.description}
                </p>
              ) : null}
              <ul className="mt-5 grid gap-3">
                {(variant === "flow" && "steps" in item
                  ? item.steps
                  : "checks" in item
                    ? item.checks
                    : []
                ).map((entry) => (
                  <li
                    key={entry}
                    className="flex gap-3 rounded-2xl border border-border bg-background/60 p-3 text-sm leading-6 text-muted-foreground"
                  >
                    <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-accent shadow-sm shadow-accent/40" />
                    <span>{entry}</span>
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
