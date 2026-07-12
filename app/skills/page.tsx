import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";
import { Reveal } from "@/components/motion/reveal";
import { SkillGroupCard } from "@/components/skills/skill-group-card";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { skillGroups, skillHighlights } from "@/data/skills";

export const metadata: Metadata = {
  title: "Skills",
  description:
    "Technical skills across frontend, backend-ready architecture, product execution, and quality.",
};

export default function SkillsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Skills"
        title="A focused stack for building maintainable product interfaces."
        description="The skill model is split by engineering responsibility so the portfolio can communicate capability without becoming a generic keyword wall."
      />
      <Section className="pt-10">
        <Container className="space-y-8">
          <Reveal>
            <Card>
              <CardContent className="flex flex-wrap gap-2 p-6">
                {skillHighlights.map((skill) => (
                  <Badge key={skill} variant="secondary">
                    {skill}
                  </Badge>
                ))}
              </CardContent>
            </Card>
          </Reveal>
          <div className="grid gap-6 md:grid-cols-2">
            {skillGroups.map((group, index) => (
              <Reveal key={group.title} delay={index * 0.06}>
                <SkillGroupCard group={group} />
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
