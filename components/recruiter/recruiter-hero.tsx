import { Reveal } from "@/components/motion/reveal";

type RecruiterHeroProps = {
  name: string;
  headline: string;
  summary: string;
  availability: string;
  targetRoles: string[];
  preferredLocations: string[];
  workModes: string[];
};

export function RecruiterHero({
  name,
  headline,
  summary,
  availability,
  targetRoles,
  preferredLocations,
  workModes,
}: RecruiterHeroProps) {
  return (
    <section className="relative overflow-hidden rounded-[2rem] border border-accent/20 bg-surface/85 p-6 shadow-2xl shadow-accent/10 backdrop-blur sm:p-8 lg:p-10">
      <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-accent/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 left-1/4 h-72 w-72 rounded-full bg-[color-mix(in_oklab,var(--ambient-two)_18%,transparent)] blur-3xl" />
      <Reveal className="relative">
        <div className="flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-4 py-2 text-sm font-black text-emerald-500">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            {availability}
          </span>

          {targetRoles.slice(0, 4).map((role) => (
            <span
              key={role}
              className="rounded-full border border-border bg-background/60 px-4 py-2 text-sm font-bold text-muted-foreground"
            >
              {role}
            </span>
          ))}
        </div>

        <h1 className="mt-8 text-4xl font-black tracking-[-0.055em] sm:text-5xl lg:text-7xl">
          {name}
        </h1>

        <p className="mt-4 text-xl font-black tracking-[-0.03em] text-accent sm:text-2xl">
          {headline}
        </p>

        <p className="mt-6 max-w-4xl text-sm leading-7 text-muted-foreground sm:text-base sm:leading-8">
          {summary}
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <QuickSignal title="Target roles" items={targetRoles} />
          <QuickSignal title="Locations" items={preferredLocations} />
          <QuickSignal title="Work modes" items={workModes} />
        </div>
      </Reveal>
    </section>
  );
}

function QuickSignal({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-3xl border border-border bg-background/60 p-4">
      <p className="text-xs font-black uppercase tracking-[0.18em] text-muted-foreground">
        {title}
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        {items.map((item) => (
          <span
            key={item}
            className="rounded-full bg-accent/10 px-3 py-1 text-xs font-black text-accent"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
