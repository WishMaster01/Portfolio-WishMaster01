import Link from "next/link";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";

type ArchitectureHeroProps = {
  title: string;
  slug: string;
  category: string;
  summary: string;
  liveUrl: string;
  githubUrl: string;
};

export function ArchitectureHero({
  title,
  slug,
  category,
  summary,
  liveUrl,
  githubUrl,
}: ArchitectureHeroProps) {
  return (
    <Reveal>
      <section className="relative overflow-hidden rounded-[2.5rem] border border-accent/20 bg-surface/90 p-6 shadow-2xl shadow-accent/10 backdrop-blur sm:p-8 lg:p-10">
        <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-accent/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 left-1/3 h-80 w-80 rounded-full bg-[color-mix(in_oklab,var(--ambient-two)_18%,transparent)] blur-3xl" />

        <div className="relative grid gap-8 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-center">
          <div>
            <Link
              href={`/projects/${slug}`}
              className="inline-flex text-sm font-black text-accent transition hover:opacity-75"
            >
              Back to project details
            </Link>

            <p className="mt-6 inline-flex rounded-full border border-accent/25 bg-accent/10 px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-accent">
              Architecture and system design
            </p>
            <h1 className="mt-5 max-w-5xl text-4xl font-black tracking-[-0.06em] sm:text-5xl lg:text-6xl">
              {title} technical blueprint
            </h1>
            <p className="mt-3 text-base font-black text-accent sm:text-lg">
              {category}
            </p>
            <p className="mt-5 max-w-4xl text-sm leading-7 text-muted-foreground sm:text-base sm:leading-8">
              {summary}
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <Button asChild>
                <a href={liveUrl} target="_blank" rel="noreferrer">
                  Live Demo
                </a>
              </Button>
              <Button asChild variant="secondary">
                <a href={githubUrl} target="_blank" rel="noreferrer">
                  GitHub Repository
                </a>
              </Button>
              <Button asChild variant="secondary">
                <Link href={`/projects/${slug}/case-study`}>
                  Read Case Study
                </Link>
              </Button>
              <Button asChild variant="secondary">
                <Link href={`/projects/${slug}/engineering`}>
                  Engineering Quality
                </Link>
              </Button>
            </div>
          </div>

          <div className="relative rounded-4xl border border-border bg-background/65 p-5 shadow-xl shadow-foreground/5">
            <div className="grid gap-3">
              {[
                ["Client", "Next.js UI"],
                ["Server", "Validation + services"],
                ["Providers", "External adapters"],
                ["Storage", "Database + assets"],
              ].map(([label, value], index) => (
                <div key={label} className="relative flex items-center gap-3">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-accent/10 text-xs font-black text-accent ring-1 ring-accent/20">
                    {index + 1}
                  </span>
                  <div className="min-w-0 rounded-2xl border border-border bg-surface/85 px-4 py-3">
                    <p className="text-[10px] font-black uppercase tracking-[0.18em] text-muted-foreground">
                      {label}
                    </p>
                    <p className="mt-1 text-sm font-black text-foreground">
                      {value}
                    </p>
                  </div>
                  {index < 3 ? (
                    <span className="absolute left-[5.25px] top-11 h-3 w-px bg-accent/35" />
                  ) : null}
                </div>
              ))}
            </div>

            <div className="mt-5 rounded-2xl border border-accent/20 bg-accent/10 p-4">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-accent">
                Main idea
              </p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Build stable boundaries first, then let features grow without
                leaking provider, database, billing, or admin concerns into the
                UI layer.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Reveal>
  );
}
