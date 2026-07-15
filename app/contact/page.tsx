import type { Metadata } from "next";
import Link from "next/link";
import { ContactForm } from "@/components/contact/contact-form";
import { Reveal } from "@/components/motion/reveal";
import { Card, CardContent } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Start a project conversation with WishMaster01.",
};

const socials = ["GitHub", "LinkedIn", "Twitter", "Instagram", "Email"];

export default function ContactPage() {
  return (
    <div className="bg-background text-foreground">
      <Section className="py-12 sm:py-16">
        <Container className="max-w-[1180px]">
          <Reveal className="mb-8">
            <h1 className="text-4xl font-black tracking-[-0.04em] sm:text-5xl">
              Contact Me
            </h1>
            <p className="mt-3 text-base text-muted-foreground">
              Let&apos;s build something amazing together!
            </p>
          </Reveal>

          <div className="grid gap-7 lg:grid-cols-[1fr_420px]">
            <Reveal>
              <Card className="rounded-2xl">
                <CardContent className="p-6">
                  <ContactForm />
                </CardContent>
              </Card>
            </Reveal>

            <Reveal delay={0.08} className="space-y-6">
              <Card className="rounded-2xl">
                <CardContent className="p-6">
                  <h2 className="font-black">Get In Touch</h2>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">
                    I&apos;m always open to discussing new projects, creative
                    ideas or opportunities to be part of your vision.
                  </p>
                  <div className="mt-6 space-y-4 text-sm">
                    <p>{siteConfig.email}</p>
                    <p>+91 12345 67890</p>
                    <p>India</p>
                  </div>

                  <h3 className="mt-8 font-black">Let&apos;s Connect</h3>
                  <div className="mt-4 flex flex-wrap gap-3">
                    {socials.map((item) => (
                      <Link
                        key={item}
                        href={
                          item === "Email" ? `mailto:${siteConfig.email}` : "#"
                        }
                        className="grid h-10 w-10 place-items-center rounded-xl border border-border bg-background text-xs font-black transition hover:-translate-y-0.5 hover:border-accent/50 hover:text-accent"
                        aria-label={item}
                      >
                        {item.slice(0, 2)}
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-2xl bg-accent/10">
                <CardContent className="p-6">
                  <h2 className="font-black text-accent">
                    Let&apos;s collaborate and create impact together.
                  </h2>
                </CardContent>
              </Card>
            </Reveal>
          </div>
        </Container>
      </Section>
    </div>
  );
}
