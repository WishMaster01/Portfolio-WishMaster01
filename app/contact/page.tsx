import type { Metadata } from "next";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Start a project conversation with WishMaster01.",
};

export default function ContactPage() {
  return (
    <Section>
      <Container className="grid gap-10 lg:grid-cols-[0.85fr_1fr] lg:items-start">
        <Reveal className="space-y-5">
          <p className="text-sm font-medium uppercase tracking-[0.25em] text-accent">
            Contact
          </p>
          <h1 className="text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
            Let&apos;s define the right build before writing the first line.
          </h1>
          <p className="text-lg leading-8 text-muted-foreground">
            Use this route as the front-end foundation. A validated API-backed
            submission flow belongs in the next phase with rate limiting,
            persistence, and email delivery.
          </p>
          <Button asChild>
            <a href={`mailto:${siteConfig.email}`}>Email {siteConfig.email}</a>
          </Button>
        </Reveal>

        <Reveal delay={0.08}>
          <Card>
            <CardContent className="p-6">
              <form className="grid gap-5" aria-label="Contact form preview">
                <div className="grid gap-2">
                  <label className="text-sm font-medium" htmlFor="name">
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    placeholder="Your name"
                    className="h-11 rounded-xl border border-border bg-background px-4 text-sm outline-none transition focus:border-accent focus:ring-4 focus:ring-accent/15"
                  />
                </div>
                <div className="grid gap-2">
                  <label className="text-sm font-medium" htmlFor="email">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    className="h-11 rounded-xl border border-border bg-background px-4 text-sm outline-none transition focus:border-accent focus:ring-4 focus:ring-accent/15"
                  />
                </div>
                <div className="grid gap-2">
                  <label className="text-sm font-medium" htmlFor="message">
                    Project summary
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    placeholder="What are you trying to build?"
                    className="resize-none rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-accent focus:ring-4 focus:ring-accent/15"
                  />
                </div>
                <Button type="button" variant="secondary">
                  Form API comes in Phase 2
                </Button>
              </form>
            </CardContent>
          </Card>
        </Reveal>
      </Container>
    </Section>
  );
}
