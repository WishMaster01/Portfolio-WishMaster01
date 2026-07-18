import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

export function Section({
  className,
  ...props
}: ComponentPropsWithoutRef<"section">) {
  return <section className={cn("py-12 sm:py-16 lg:py-20", className)} {...props} />;
}
