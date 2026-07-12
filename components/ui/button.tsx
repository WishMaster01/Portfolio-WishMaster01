import type { ButtonHTMLAttributes, ReactElement, ReactNode } from "react";
import { cloneElement, isValidElement } from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md";

type ButtonVariantOptions = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
};

const baseClasses =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium outline-none transition focus-visible:ring-4 focus-visible:ring-ring/30 disabled:pointer-events-none disabled:opacity-50";

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-foreground text-background shadow-sm shadow-foreground/10 hover:bg-foreground/90",
  secondary:
    "border border-border bg-surface text-foreground hover:bg-surface-elevated",
  ghost: "text-foreground hover:bg-surface",
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-10 px-4 text-sm",
  md: "h-11 px-5 text-sm",
};

export function buttonVariants({
  variant = "primary",
  size = "md",
  className,
}: ButtonVariantOptions = {}) {
  return cn(baseClasses, variants[variant], sizes[size], className);
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  asChild?: boolean;
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
};

export function Button({
  asChild = false,
  className,
  children,
  variant,
  size,
  ...props
}: ButtonProps) {
  const classes = buttonVariants({ variant, size, className });

  if (asChild && isValidElement<{ className?: string }>(children)) {
    return cloneElement(children as ReactElement<{ className?: string }>, {
      className: cn(classes, children.props.className),
    });
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
