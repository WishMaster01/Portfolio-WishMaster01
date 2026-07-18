import type { Metadata } from "next";
import { ExperienceDashboard } from "@/components/experience/experience-dashboard";
import { Reveal } from "@/components/motion/reveal";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";

export const metadata: Metadata = {
  title: "Experience",
  description:
    "Professional journey, project impact, working principles, and education for WishMaster01.",
};

export default function ExperiencePage() {
  return (
    <div className="bg-background text-foreground">
      <Section className="py-12 sm:py-16">
        <Container className="max-w-[1380px]">
          <Reveal className="mb-8">
            <p className="text-xs font-black uppercase tracking-[0.28em] text-accent">
              Professional Journey
            </p>
            <h1 className="mt-3 text-4xl font-black tracking-[-0.04em] sm:text-5xl">
              My Experience
            </h1>
            <p className="mt-4 max-w-3xl text-base leading-7 text-muted-foreground">
              A stronger view of my hands-on project work, full-stack product
              experience, AI/SaaS direction, engineering process, and education.
            </p>
          </Reveal>

          <ExperienceDashboard />
        </Container>
      </Section>
    </div>
  );
}
