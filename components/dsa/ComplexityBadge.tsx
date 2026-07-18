type ComplexityBadgeProps = {
  label: "Time" | "Space";
  value: string;
};

export function ComplexityBadge({ label, value }: ComplexityBadgeProps) {
  return (
    <div className="rounded-2xl border border-border bg-background/75 p-4">
      <p className="text-xs font-black uppercase tracking-[0.22em] text-accent">
        {label} complexity
      </p>
      <p className="mt-2 text-sm font-bold leading-6 text-foreground">
        {value}
      </p>
    </div>
  );
}
