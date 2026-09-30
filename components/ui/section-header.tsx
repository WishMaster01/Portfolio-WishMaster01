import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  description?: string;
  action?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeader({
  eyebrow,
  title,
  description,
  action,
  align = "left",
  className = "",
}: SectionHeaderProps) {
  return (
    <Reveal className={cn("space-y-3", className)}>
      <div
        className={cn(
          "flex flex-col gap-3",
          align === "center"
            ? "items-center text-center"
            : "sm:flex-row sm:items-end sm:justify-between",
        )}
      >
        <div className={align === "center" ? "max-w-2xl" : "max-w-3xl"}>
          <div className="inline-flex items-center gap-2 rounded-full border border-accent/25 bg-accent/10 px-3.5 py-1 text-xs font-black uppercase tracking-[0.2em] text-accent">
            <span
              aria-hidden="true"
              className="h-1.5 w-1.5 rounded-full bg-accent"
            />
            {eyebrow}
          </div>
          <h2 className="mt-3 text-3xl font-black tracking-[-0.04em] text-foreground sm:text-4xl lg:text-5xl">
            {title}
          </h2>
          {description ? (
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base sm:leading-7">
              {description}
            </p>
          ) : null}
        </div>

        {action ? <div className="shrink-0">{action}</div> : null}
      </div>
    </Reveal>
  );
}
