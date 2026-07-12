import type { Metadata } from "next";
import { TimelineItem } from "@/components/experience/timeline-item";
import { PageHeader } from "@/components/layout/page-header";
import { Reveal } from "@/components/motion/reveal";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { experienceItems } from "@/data/experience";

export const metadata: Metadata = {
  title: "Experience",
  description: "Experience timeline and engineering focus for WishMaster01.",
};

export default function ExperiencePage() {
  return (
    <>
      <PageHeader
        eyebrow="Experience"
        title="A practical timeline focused on product engineering execution."
        description="Experience is presented as implementation capability: route architecture, typed data, reusable UI, portfolio products, and production checks."
      />
      <Section className="pt-10">
        <Container className="space-y-6">
          {experienceItems.map((item, index) => (
            <Reveal key={`${item.company}-${item.title}`} delay={index * 0.06}>
              <TimelineItem item={item} />
            </Reveal>
          ))}
        </Container>
      </Section>
    </>
  );
}
