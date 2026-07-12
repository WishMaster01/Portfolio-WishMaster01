import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/layout/page-header";
import { Reveal } from "@/components/motion/reveal";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { experienceItems } from "@/data/experience";
import { resume } from "@/data/resume";
import { skillHighlights } from "@/data/skills";

export const metadata: Metadata = {
  title: "Resume",
  description: "Resume summary, strengths, experience, and contact details.",
};

export default function ResumePage() {
  return (
    <>
      <PageHeader
        eyebrow="Resume"
        title={`${resume.name} — ${resume.title}`}
        description={resume.summary}
      />
      <Section className="pt-10">
        <Container className="grid gap-8 lg:grid-cols-[0.35fr_1fr]">
          <Reveal>
            <aside className="space-y-6">
              <Card>
                <CardContent className="space-y-3 p-6">
                  <p className="text-sm text-muted-foreground">Location</p>
                  <p className="font-medium">{resume.location}</p>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <a
                    className="font-medium text-accent"
                    href={`mailto:${resume.email}`}
                  >
                    {resume.email}
                  </a>
                </CardContent>
              </Card>
              <Link href="/contact" className={buttonVariants()}>
                Contact for PDF
              </Link>
            </aside>
          </Reveal>

          <div className="space-y-6">
            <Reveal>
              <Card>
                <CardContent className="space-y-4 p-6">
                  <h2 className="text-xl font-semibold">Core strengths</h2>
                  <div className="flex flex-wrap gap-2">
                    {resume.strengths.map((strength) => (
                      <Badge key={strength} variant="secondary">
                        {strength}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </Reveal>

            <Reveal delay={0.06}>
              <Card>
                <CardContent className="space-y-4 p-6">
                  <h2 className="text-xl font-semibold">Technical focus</h2>
                  <div className="flex flex-wrap gap-2">
                    {skillHighlights.map((skill) => (
                      <Badge key={skill} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </Reveal>

            <Reveal delay={0.12}>
              <Card>
                <CardContent className="space-y-5 p-6">
                  <h2 className="text-xl font-semibold">Experience</h2>
                  {experienceItems.map((item) => (
                    <div
                      key={`${item.company}-${item.title}`}
                      className="border-t border-border pt-5 first:border-t-0 first:pt-0"
                    >
                      <p className="text-sm font-medium text-accent">
                        {item.period}
                      </p>
                      <h3 className="mt-1 font-semibold">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {item.company}
                      </p>
                      <p className="mt-2 text-sm leading-6 text-muted-foreground">
                        {item.summary}
                      </p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </Reveal>
          </div>
        </Container>
      </Section>
    </>
  );
}
