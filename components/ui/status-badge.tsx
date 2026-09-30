import { cn } from "@/lib/utils";

export type ProjectStatusType =
  | "Production"
  | "Active Development"
  | "Prototype"
  | "Planned";

type StatusBadgeProps = {
  status: ProjectStatusType | string;
  className?: string;
};

const statusStyles: Record<
  string,
  { bg: string; text: string; border: string; dot: string }
> = {
  Production: {
    bg: "bg-emerald-500/10",
    text: "text-emerald-500 dark:text-emerald-400",
    border: "border-emerald-500/25",
    dot: "bg-emerald-500",
  },
  "Active Development": {
    bg: "bg-cyan-500/10",
    text: "text-cyan-500 dark:text-cyan-400",
    border: "border-cyan-500/25",
    dot: "bg-cyan-500",
  },
  Prototype: {
    bg: "bg-amber-500/10",
    text: "text-amber-500 dark:text-amber-400",
    border: "border-amber-500/25",
    dot: "bg-amber-500",
  },
  Planned: {
    bg: "bg-purple-500/10",
    text: "text-purple-500 dark:text-purple-400",
    border: "border-purple-500/25",
    dot: "bg-purple-500",
  },
};

export function StatusBadge({ status, className = "" }: StatusBadgeProps) {
  const style =
    statusStyles[status] ?? statusStyles["Active Development"];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-black uppercase tracking-wider border",
        style.bg,
        style.text,
        style.border,
        className,
      )}
    >
      <span
        aria-hidden="true"
        className={cn("h-1.5 w-1.5 rounded-full animate-pulse", style.dot)}
      />
      {status}
    </span>
  );
}
