import type { ReactNode } from "react";

type MetricCardProps = {
  label: string;
  value: string;
  detail: string;
  icon: ReactNode;
  tone?: "violet" | "cyan" | "emerald" | "amber" | "rose";
};

const toneClasses = {
  violet: "from-accent/25 to-accent/5 text-accent",
  cyan: "from-cyan-500/25 to-cyan-500/5 text-cyan-400",
  emerald: "from-emerald-500/25 to-emerald-500/5 text-emerald-400",
  amber: "from-amber-500/25 to-amber-500/5 text-amber-400",
  rose: "from-rose-500/25 to-rose-500/5 text-rose-400",
} as const;

export function MetricCard({
  label,
  value,
  detail,
  icon,
  tone = "violet",
}: MetricCardProps) {
  return (
    <article className="group relative overflow-hidden rounded-3xl border border-border bg-surface/85 p-5 shadow-sm shadow-foreground/5 backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-accent/40">
      <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-accent/10 blur-2xl transition group-hover:bg-accent/20" />
      <div
        className={`relative grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br ${toneClasses[tone]} shadow-sm shadow-foreground/5`}
      >
        <span className="text-lg font-black">{icon}</span>
      </div>
      <p className="relative mt-5 text-3xl font-black tracking-[-0.05em]">
        {value}
      </p>
      <h3 className="relative mt-1 text-sm font-black">{label}</h3>
      <p className="relative mt-2 text-sm leading-6 text-muted-foreground">
        {detail}
      </p>
    </article>
  );
}
