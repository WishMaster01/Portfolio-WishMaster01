"use client";

import type { FormEvent } from "react";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type NewsletterFormProps = {
  source?: string;
  compact?: boolean;
  className?: string;
};

type FormState = {
  email: string;
  name: string;
};

type Notice = {
  type: "success" | "error";
  message: string;
} | null;

const initialForm: FormState = {
  email: "",
  name: "",
};

export function NewsletterForm({
  source = "portfolio-newsletter",
  compact = false,
  className,
}: NewsletterFormProps) {
  const shouldReduceMotion = useReducedMotion();
  const [form, setForm] = useState(initialForm);
  const [notice, setNotice] = useState<Notice>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!notice) {
      return;
    }

    const timeout = window.setTimeout(() => setNotice(null), 5000);
    return () => window.clearTimeout(timeout);
  }, [notice]);

  async function subscribe(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setNotice(null);
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: form.email,
          name: form.name || undefined,
          source,
          consent: true,
        }),
      });
      const data = (await response.json()) as {
        message?: string;
        error?: string;
      };

      if (!response.ok) {
        setNotice({
          type: "error",
          message:
            data.message ??
            data.error ??
            "Subscription failed. Please try again.",
        });
        return;
      }

      setNotice({
        type: "success",
        message:
          data.message ??
          "Subscription successful. Please check your inbox.",
      });
      setForm(initialForm);
    } catch {
      setNotice({
        type: "error",
        message: "Network error. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className={cn("relative", className)}>
      <form
        className={cn(
          "grid gap-3",
          compact ? "sm:grid-cols-[minmax(0,1fr)_auto]" : "sm:grid-cols-2",
        )}
        onSubmit={subscribe}
      >
        {!compact ? (
          <label className="grid gap-2">
            <span className="text-sm font-black">Name</span>
            <input
              value={form.name}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  name: event.target.value,
                }))
              }
              placeholder="Your name"
              autoComplete="name"
              className="h-12 rounded-2xl border border-border bg-background/70 px-4 text-sm outline-none transition hover:border-accent/35 focus:border-accent focus:ring-4 focus:ring-accent/15"
            />
          </label>
        ) : null}

        <label className={cn("grid gap-2", compact && "min-w-0")}>
          <span className={cn("text-sm font-black", compact && "sr-only")}>
            Email
          </span>
          <input
            value={form.email}
            onChange={(event) =>
              setForm((current) => ({
                ...current,
                email: event.target.value,
              }))
            }
            type="email"
            required
            placeholder="Enter your email"
            autoComplete="email"
            className="h-12 rounded-2xl border border-border bg-background/70 px-4 text-sm outline-none transition hover:border-accent/35 focus:border-accent focus:ring-4 focus:ring-accent/15"
          />
        </label>

        <div
          className={cn(
            "flex items-end",
            compact ? "sm:items-center" : "sm:col-span-2",
          )}
        >
          <Button
            type="submit"
            disabled={isSubmitting}
            className={cn(
              "h-12 rounded-2xl shadow-lg shadow-accent/20",
              compact ? "w-full whitespace-nowrap px-5 sm:w-auto" : "w-full sm:w-fit",
            )}
          >
            {isSubmitting ? "Subscribing..." : "Subscribe"}
          </Button>
        </div>
      </form>

      <AnimatePresence>
        {notice ? (
          <motion.p
            initial={shouldReduceMotion ? false : { opacity: 0, y: -8 }}
            animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            exit={shouldReduceMotion ? undefined : { opacity: 0, y: -8 }}
            className={cn(
              "mt-3 rounded-2xl border px-4 py-3 text-sm font-bold",
              notice.type === "success"
                ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-500"
                : "border-red-500/30 bg-red-500/10 text-red-500",
            )}
            role="status"
          >
            {notice.message}
          </motion.p>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
