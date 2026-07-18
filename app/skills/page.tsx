import type { Metadata } from "next";
import { Reveal } from "@/components/motion/reveal";
import { SkillsDashboard } from "@/components/skills/skills-dashboard";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";

export const metadata: Metadata = {
  title: "Skills",
  description:
    "Structured technical skills, engineering strengths, and product capabilities for WishMaster01.",
};

export default function SkillsPage() {
  return (
    <div className="bg-background text-foreground">
      <Section className="py-12 sm:py-16">
        <Container className="max-w-[1380px]">
          <Reveal className="mb-8">
            <p className="text-xs font-black uppercase tracking-[0.28em] text-accent">
              Technical Stack
            </p>
            <h1 className="mt-3 text-4xl font-black tracking-[-0.04em] sm:text-5xl">
              My Skills
            </h1>
            <p className="mt-4 max-w-3xl text-base leading-7 text-muted-foreground">
              A structured view of the technologies, architecture habits,
              product thinking, and engineering quality practices I use to
              build full-stack AI and SaaS products.
            </p>
          </Reveal>

          <SkillsDashboard />
        </Container>
      </Section>
    </div>
  );
}
