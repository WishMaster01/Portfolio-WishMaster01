"use client";

import { useState, useTransition } from "react";
import type { FormEvent } from "react";
import { Button } from "@/components/ui/button";

type ContactFormState = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

const initialState: ContactFormState = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

export function ContactForm() {
  const [form, setForm] = useState(initialState);
  const [status, setStatus] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);
  const [isPending, startTransition] = useTransition();

  function updateField(field: keyof ContactFormState, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function submitForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus(null);

    startTransition(async () => {
      try {
        const response = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...form,
            source: "portfolio-contact-page",
            website: "",
          }),
        });

        const data = (await response.json()) as {
          error?: string;
          message?: string;
        };

        if (!response.ok) {
          setStatus({
            type: "error",
            message:
              data.error ??
              "The message could not be sent. Please check the form and try again.",
          });
          return;
        }

        setStatus({
          type: "success",
          message:
            data.message ??
            "Message sent successfully. I will get back to you soon.",
        });
        setForm(initialState);
      } catch {
        setStatus({
          type: "error",
          message: "Network error. Please try again or email directly.",
        });
      }
    });
  }

  return (
    <form className="grid gap-5" aria-label="Contact form" onSubmit={submitForm}>
      <div className="grid gap-2">
        <label className="text-sm font-black" htmlFor="name">
          Your Name
        </label>
        <input
          id="name"
          name="name"
          value={form.name}
          onChange={(event) => updateField("name", event.target.value)}
          placeholder="Enter your name"
          required
          minLength={2}
          className="h-12 rounded-xl border border-border bg-background px-4 text-sm outline-none transition focus:border-accent focus:ring-4 focus:ring-accent/15"
        />
      </div>
      <div className="grid gap-2">
        <label className="text-sm font-black" htmlFor="email">
          Email Address
        </label>
        <input
          id="email"
          name="email"
          type="email"
          value={form.email}
          onChange={(event) => updateField("email", event.target.value)}
          placeholder="Enter your email"
          required
          className="h-12 rounded-xl border border-border bg-background px-4 text-sm outline-none transition focus:border-accent focus:ring-4 focus:ring-accent/15"
        />
      </div>
      <div className="grid gap-2">
        <label className="text-sm font-black" htmlFor="subject">
          Subject
        </label>
        <input
          id="subject"
          name="subject"
          value={form.subject}
          onChange={(event) => updateField("subject", event.target.value)}
          placeholder="What is this about?"
          className="h-12 rounded-xl border border-border bg-background px-4 text-sm outline-none transition focus:border-accent focus:ring-4 focus:ring-accent/15"
        />
      </div>
      <div className="grid gap-2">
        <label className="text-sm font-black" htmlFor="message">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          value={form.message}
          onChange={(event) => updateField("message", event.target.value)}
          rows={8}
          minLength={20}
          placeholder="Write your message..."
          required
          className="resize-none rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-accent focus:ring-4 focus:ring-accent/15"
        />
      </div>
      <Button type="submit" className="w-fit rounded-xl px-8" disabled={isPending}>
        {isPending ? "Sending..." : "Send Message →"}
      </Button>
      {status ? (
        <p
          className={
            status.type === "success"
              ? "rounded-xl bg-emerald-500/10 px-4 py-3 text-sm font-bold text-emerald-500"
              : "rounded-xl bg-red-500/10 px-4 py-3 text-sm font-bold text-red-500"
          }
        >
          {status.message}
        </p>
      ) : null}
    </form>
  );
}
