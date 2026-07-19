"use client";

import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useForm } from "react-hook-form";
import type { UseFormRegisterReturn } from "react-hook-form";
import type { z } from "zod";
import { Button } from "@/components/ui/button";
import { contactSubmissionSchema } from "@/lib/validation/forms";

type ContactFormValues = z.input<typeof contactSubmissionSchema>;

type ToastState = {
  type: "success" | "error";
  message: string;
} | null;

const defaultValues: ContactFormValues = {
  name: "",
  email: "",
  subject: "",
  message: "",
  source: "portfolio-contact-page",
  website: "",
};

export function ContactForm() {
  const shouldReduceMotion = useReducedMotion();
  const [toast, setToast] = useState<ToastState>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSubmissionSchema),
    defaultValues,
    mode: "onBlur",
  });

  useEffect(() => {
    if (!toast) {
      return;
    }

    const timeout = window.setTimeout(() => setToast(null), 4500);
    return () => window.clearTimeout(timeout);
  }, [toast]);

  async function submitForm(values: ContactFormValues) {
    setToast(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = (await response.json()) as {
        error?: string;
        message?: string;
      };

      if (!response.ok) {
        setToast({
          type: "error",
          message:
            data.message ??
            data.error ??
            "The message could not be sent. Please check the form and try again.",
        });
        return;
      }

      setToast({
        type: "success",
        message:
          data.message ??
          "Message sent successfully. I will get back to you soon.",
      });
      reset(defaultValues);
    } catch {
      setToast({
        type: "error",
        message: "Network error. Please try again or email directly.",
      });
    }
  }

  return (
    <div className="relative">
      <AnimatePresence>
        {toast ? (
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: -12 }}
            animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            exit={shouldReduceMotion ? undefined : { opacity: 0, y: -12 }}
            className={
              toast.type === "success"
                ? "mb-5 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm font-bold text-emerald-500"
                : "mb-5 rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm font-bold text-red-500"
            }
            role="status"
          >
            {toast.message}
          </motion.div>
        ) : null}
      </AnimatePresence>

      <form
        className="grid gap-5"
        aria-label="Contact form"
        onSubmit={handleSubmit(submitForm)}
        noValidate
      >
        <input
          type="text"
          tabIndex={-1}
          autoComplete="off"
          className="hidden"
          aria-hidden="true"
          {...register("website")}
        />
        <input type="hidden" {...register("source")} />

        <div className="grid gap-4 sm:grid-cols-2">
          <AnimatedField delay={0}>
            <TextInput
              label="Name"
              id="name"
              placeholder="Enter your name"
              autoComplete="name"
              error={errors.name?.message}
              registration={register("name")}
            />
          </AnimatedField>

          <AnimatedField delay={0.04}>
            <TextInput
              label="Email"
              id="email"
              type="email"
              placeholder="Enter your email"
              autoComplete="email"
              error={errors.email?.message}
              registration={register("email")}
            />
          </AnimatedField>
        </div>

        <AnimatedField delay={0.08}>
          <TextInput
            label="Subject"
            id="subject"
            placeholder="What is this about?"
            error={errors.subject?.message}
            registration={register("subject")}
          />
        </AnimatedField>

        <AnimatedField delay={0.12}>
          <div className="grid gap-2">
            <label className="text-sm font-black" htmlFor="message">
              Message
            </label>
            <textarea
              id="message"
              rows={8}
              placeholder="Write your message..."
              className="min-h-44 resize-none rounded-2xl border border-border bg-background/70 px-4 py-3 text-sm shadow-inner shadow-foreground/[0.02] outline-none transition duration-300 placeholder:text-muted-foreground/70 hover:border-accent/30 focus:border-accent focus:bg-surface focus:ring-4 focus:ring-accent/15"
              aria-invalid={Boolean(errors.message)}
              {...register("message")}
            />
            {errors.message?.message ? (
              <p className="text-xs font-bold text-red-500">
                {errors.message.message}
              </p>
            ) : null}
          </div>
        </AnimatedField>

        <AnimatedField delay={0.16}>
          <Button
            type="submit"
            className="h-12 w-full rounded-2xl px-8 shadow-lg shadow-accent/20 sm:w-fit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Sending..." : "Send Message ->"}
          </Button>
        </AnimatedField>
      </form>
    </div>
  );
}

function AnimatedField({
  children,
  delay,
}: {
  children: React.ReactNode;
  delay: number;
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={shouldReduceMotion ? false : { opacity: 0, y: 14 }}
      whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.35, delay }}
    >
      {children}
    </motion.div>
  );
}

function TextInput({
  label,
  id,
  placeholder,
  registration,
  error,
  type = "text",
  autoComplete,
}: {
  label: string;
  id: string;
  placeholder: string;
  registration: UseFormRegisterReturn;
  error?: string;
  type?: string;
  autoComplete?: string;
}) {
  return (
    <div className="grid gap-2">
      <label className="text-sm font-black" htmlFor={id}>
        {label}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className="h-12 rounded-2xl border border-border bg-background/70 px-4 text-sm shadow-inner shadow-foreground/[0.02] outline-none transition duration-300 placeholder:text-muted-foreground/70 hover:border-accent/30 focus:border-accent focus:bg-surface focus:ring-4 focus:ring-accent/15"
        aria-invalid={Boolean(error)}
        {...registration}
      />
      {error ? <p className="text-xs font-bold text-red-500">{error}</p> : null}
    </div>
  );
}
