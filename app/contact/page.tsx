import type { Metadata } from "next";
import Link from "next/link";
import { ContactForm } from "@/components/contact/contact-form";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Start a project conversation with WishMaster01 for AI, SaaS, full-stack, and portfolio engineering work.",
};

const contactChannels = [
  {
    label: "Email",
    value: siteConfig.email,
    href: `mailto:${siteConfig.email}`,
    icon: "@",
  },
  {
    label: "Phone",
    value: "+91 12345 67890",
    href: "tel:+911234567890",
    icon: "☎",
  },
  {
    label: "Location",
    value: "India / Remote",
    href: "#",
    icon: "⌖",
  },
] as const;

const collaborationSteps = [
  {
    step: "01",
    title: "Scope the goal",
    text: "Share the problem, timeline, stack preferences, and success criteria.",
  },
  {
    step: "02",
    title: "Plan the system",
    text: "I map the UX, data model, API boundaries, risks, and delivery path.",
  },
  {
    step: "03",
    title: "Build with feedback",
    text: "You get focused updates, testable increments, and production-minded polish.",
  },
] as const;

const availability = [
  "AI portfolio systems",
  "Next.js SaaS apps",
  "Prisma + PostgreSQL APIs",
  "Responsive UI engineering",
] as const;

const socials = [
  {
    label: "GitHub",
    href: siteConfig.social.github,
    short: "GH",
  },
  {
    label: "LinkedIn",
    href: siteConfig.social.linkedin,
    short: "IN",
  },
  {
    label: "Twitter",
    href: `https://twitter.com/${siteConfig.social.twitter.replace("@", "")}`,
    short: "X",
  },
  {
    label: "Email",
    href: `mailto:${siteConfig.email}`,
    short: "EM",
  },
] as const;

export default function ContactPage() {
  return (
    <div className="relative overflow-hidden bg-background text-foreground">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[var(--theme-texture)] bg-[length:var(--theme-texture-size)] opacity-60" />
      <div className="pointer-events-none absolute left-[-12rem] top-12 -z-10 h-96 w-96 rounded-full bg-[color-mix(in_oklab,var(--ambient-one)_22%,transparent)] blur-3xl" />
      <div className="pointer-events-none absolute right-[-14rem] top-36 -z-10 h-[30rem] w-[30rem] rounded-full bg-[color-mix(in_oklab,var(--ambient-two)_18%,transparent)] blur-3xl" />

      <Section className="py-10 sm:py-14 lg:py-16">
        <Container className="max-w-[1240px]">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,0.98fr)_minmax(360px,0.62fr)] lg:items-start">
            <div className="space-y-6">
              <Reveal>
                <Card className="relative overflow-hidden rounded-[2rem] border-accent/20 bg-surface/80">
                  <div className="absolute inset-x-0 top-0 h-1 bg-linear-to-r from-accent via-[var(--ambient-two)] to-[var(--ambient-three)]" />
                  <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-accent/20 blur-3xl" />
                  <CardContent className="p-6 sm:p-8 lg:p-10">
                    <div className="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
                      <div className="max-w-3xl">
                        <p className="inline-flex rounded-full border border-accent/20 bg-accent/10 px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-accent">
                          Project inquiry
                        </p>
                        <h1 className="mt-5 max-w-4xl text-4xl font-black tracking-[-0.055em] sm:text-5xl lg:text-6xl">
                          Let&apos;s build a clean, scalable product together.
                        </h1>
                        <p className="mt-5 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
                          Send the details for your AI, SaaS, full-stack, DSA,
                          or portfolio idea. The form is validated,
                          rate-limited, stored server-side, and can notify me
                          through Resend.
                        </p>
                      </div>

                      <div className="grid gap-3 rounded-3xl border border-border bg-background/60 p-4 shadow-sm shadow-foreground/5 sm:min-w-64">
                        <div className="flex items-center justify-between gap-4">
                          <span className="text-xs font-black uppercase tracking-[0.18em] text-muted-foreground">
                            Status
                          </span>
                          <span className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-black text-emerald-500">
                            <span className="h-2 w-2 rounded-full bg-emerald-500" />
                            Available
                          </span>
                        </div>
                        <p className="text-sm font-bold">
                          Usually replies within 24–48 hours.
                        </p>
                      </div>
                    </div>

                    <div className="mt-8 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                      {availability.map((item, index) => (
                        <div
                          key={item}
                          className="group rounded-2xl border border-border bg-background/55 p-4 transition duration-300 hover:-translate-y-1 hover:border-accent/40 hover:bg-accent/10"
                        >
                          <span className="text-xs font-black text-accent">
                            0{index + 1}
                          </span>
                          <p className="mt-2 text-sm font-black">{item}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </Reveal>

              <Reveal delay={0.05}>
                <Card className="overflow-hidden rounded-[2rem] border-accent/15 bg-surface/90">
                  <CardContent className="p-0">
                    <div className="border-b border-border bg-surface-elevated/40 px-5 py-4 sm:px-7">
                      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                          <p className="text-xs font-black uppercase tracking-[0.2em] text-accent">
                            Secure message
                          </p>
                          <h2 className="mt-1 text-2xl font-black tracking-[-0.04em]">
                            Tell me what you need
                          </h2>
                        </div>
                        <p className="max-w-sm text-xs leading-5 text-muted-foreground">
                          Name, email, subject, and message are required. Hidden
                          honeypot and rate limits reduce spam.
                        </p>
                      </div>
                    </div>
                    <div className="p-5 sm:p-7">
                      <ContactForm />
                    </div>
                  </CardContent>
                </Card>
              </Reveal>
            </div>

            <Reveal delay={0.1} className="space-y-6">
              <Card className="rounded-[2rem] border-accent/20 bg-surface/85">
                <CardContent className="p-5 sm:p-6">
                  <p className="text-xs font-black uppercase tracking-[0.2em] text-accent">
                    Get in touch
                  </p>
                  <h2 className="mt-3 text-2xl font-black tracking-[-0.04em]">
                    Direct contact details
                  </h2>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">
                    I&apos;m open to projects, internships, collaborations, and
                    technical discussions around modern web and AI products.
                  </p>

                  <div className="mt-6 space-y-3">
                    {contactChannels.map((channel) => (
                      <Link
                        key={channel.label}
                        href={channel.href}
                        className="group flex items-center gap-4 rounded-2xl border border-border bg-background/55 p-4 transition duration-300 hover:-translate-y-1 hover:border-accent/45 hover:bg-accent/10"
                      >
                        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-accent/10 text-sm font-black text-accent shadow-sm shadow-accent/10">
                          {channel.icon}
                        </span>
                        <span className="min-w-0">
                          <span className="block text-xs font-black uppercase tracking-[0.14em] text-muted-foreground">
                            {channel.label}
                          </span>
                          <span className="mt-1 block truncate text-sm font-black">
                            {channel.value}
                          </span>
                        </span>
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-[2rem] border-accent/20 bg-linear-to-br from-accent/20 via-surface to-surface">
                <CardContent className="p-5 sm:p-6">
                  <p className="text-xs font-black uppercase tracking-[0.2em] text-accent">
                    Workflow
                  </p>
                  <h2 className="mt-3 text-2xl font-black tracking-[-0.04em]">
                    How collaboration moves
                  </h2>
                  <div className="mt-6 space-y-4">
                    {collaborationSteps.map((item) => (
                      <div key={item.step} className="flex gap-4">
                        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl border border-accent/25 bg-background/60 text-xs font-black text-accent">
                          {item.step}
                        </span>
                        <div>
                          <h3 className="font-black">{item.title}</h3>
                          <p className="mt-1 text-sm leading-6 text-muted-foreground">
                            {item.text}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="relative overflow-hidden rounded-[2rem] border-accent/25 bg-accent text-accent-foreground">
                <div className="pointer-events-none absolute -right-14 -top-14 h-40 w-40 rounded-full bg-white/20 blur-2xl" />
                <CardContent className="relative p-5 sm:p-6">
                  <h2 className="text-2xl font-black tracking-[-0.04em]">
                    Prefer browsing first?
                  </h2>
                  <p className="mt-3 text-sm leading-6 opacity-85">
                    Review projects, GitHub stats, and resume details before
                    sending a message.
                  </p>
                  <div className="mt-5 flex flex-wrap gap-3">
                    <Button asChild variant="secondary" className="bg-white/95">
                      <Link href="/projects">View Projects</Link>
                    </Button>
                    <Button
                      asChild
                      variant="ghost"
                      className="border border-white/25 text-accent-foreground hover:bg-white/10"
                    >
                      <Link href="/resume">Resume</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <div className="flex flex-wrap gap-3">
                {socials.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="grid h-12 min-w-12 place-items-center rounded-2xl border border-border bg-surface/80 px-4 text-xs font-black transition duration-300 hover:-translate-y-1 hover:border-accent/50 hover:bg-accent/10 hover:text-accent"
                    aria-label={item.label}
                  >
                    {item.short}
                  </Link>
                ))}
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>
    </div>
  );
}
