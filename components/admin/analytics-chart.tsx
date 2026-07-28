type AnalyticsItem = {
  label: string;
  value: number;
  tone: string;
};

type AnalyticsChartProps = {
  title: string;
  description: string;
  items: AnalyticsItem[];
};

export function AnalyticsChart({
  title,
  description,
  items,
}: AnalyticsChartProps) {
  const total = items.reduce((sum, item) => sum + item.value, 0) || 1;

  return (
    <section
      id="analytics"
      className="rounded-[2rem] border border-border bg-surface/85 shadow-sm shadow-foreground/5 backdrop-blur"
    >
      <div className="border-b border-border p-5 sm:p-6">
        <p className="text-xs font-black uppercase tracking-[0.2em] text-accent">
          AnalyticsChart
        </p>
        <h2 className="mt-2 text-2xl font-black tracking-[-0.04em]">{title}</h2>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          {description}
        </p>
      </div>

      <div className="grid gap-6 p-5 sm:p-6 xl:grid-cols-[0.8fr_1.2fr]">
        <div className="grid place-items-center">
          <div
            className="relative grid h-56 w-56 place-items-center rounded-full border border-border shadow-inner shadow-foreground/10"
            style={{
              background: `conic-linear(${items
                .reduce(
                  (segments, item) => {
                    const start = segments.offset;
                    const end = start + (item.value / total) * 100;
                    segments.parts.push(`${item.tone} ${start}% ${end}%`);
                    segments.offset = end;
                    return segments;
                  },
                  { offset: 0, parts: [] as string[] },
                )
                .parts.join(", ")})`,
            }}
          >
            <div className="grid h-32 w-32 place-items-center rounded-full border border-border bg-surface text-center">
              <span>
                <span className="block text-3xl font-black">{total}</span>
                <span className="text-xs font-bold text-muted-foreground">
                  records
                </span>
              </span>
            </div>
          </div>
        </div>

        <div className="grid gap-3">
          {items.map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border border-border bg-background/60 p-4"
            >
              <div className="flex items-center justify-between gap-4">
                <span className="text-sm font-black">{item.label}</span>
                <span className="text-sm font-black text-accent">
                  {item.value}
                </span>
              </div>
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-surface-elevated">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${Math.max(6, (item.value / total) * 100)}%`,
                    background: item.tone,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-border p-5 sm:p-6">
        <h3 className="font-black">Protected mutation flow</h3>
        <div className="mt-4 grid gap-3 md:grid-cols-4">
          {[
            "Admin enters key",
            "API validates key",
            "Zod validates payload",
            "Prisma writes data",
          ].map((step, index) => (
            <div
              key={step}
              className="relative rounded-2xl border border-border bg-background/60 p-4 text-sm font-bold"
            >
              <span className="mb-3 grid h-8 w-8 place-items-center rounded-xl bg-accent/10 text-xs font-black text-accent">
                {index + 1}
              </span>
              {step}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
