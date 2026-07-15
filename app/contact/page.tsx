import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
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
      <Section className="py-16">
        <Container className="max-w-[1180px]">
          <div className="mb-8">
            <h1 className="text-4xl font-black tracking-[-0.04em] sm:text-5xl">
              Contact Me
            </h1>
            <p className="mt-3 text-base text-muted-foreground">
              Let&apos;s build something amazing together!
            </p>
          </div>

          <div className="grid gap-7 lg:grid-cols-[1fr_420px]">
            <Card className="rounded-2xl">
              <CardContent className="p-6">
                <form className="grid gap-5" aria-label="Contact form">
                  <div className="grid gap-2">
                    <label className="text-sm font-black" htmlFor="name">
                      Your Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      placeholder="Enter your name"
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
                      placeholder="Enter your email"
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
                      rows={8}
                      placeholder="Write your message..."
                      className="resize-none rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-accent focus:ring-4 focus:ring-accent/15"
                    />
                  </div>
                  <Button type="button" className="w-fit rounded-xl px-8">
                    Send Message →
                  </Button>
                </form>
              </CardContent>
            </Card>

            <aside className="space-y-6">
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
                        href={item === "Email" ? `mailto:${siteConfig.email}` : "#"}
                        className="grid h-10 w-10 place-items-center rounded-xl border border-border bg-background text-xs font-black hover:border-accent/50 hover:text-accent"
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
                    Let&apos;s collaborate and create impact together!
                  </h2>
                </CardContent>
              </Card>
            </aside>
          </div>
        </Container>
      </Section>
    </div>
  );
}
