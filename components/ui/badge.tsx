import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

type BadgeProps = ComponentPropsWithoutRef<"span"> & {
  variant?: "primary" | "secondary";
};

export function Badge({
  className,
  variant = "primary",
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex w-fit items-center rounded-full px-3 py-1 text-xs font-medium",
        variant === "primary" &&
          "bg-accent text-accent-foreground shadow-sm shadow-accent/20",
        variant === "secondary" &&
          "border border-border bg-surface text-muted-foreground",
        className,
      )}
      {...props}
    />
  );
}
