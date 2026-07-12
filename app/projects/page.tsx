import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";
import { Reveal } from "@/components/motion/reveal";
import { ProjectCard } from "@/components/projects/project-card";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Project listing for InfinityAI, ExploreX, DailyEssentials, Vyvo, and WishCart.",
};

export default function ProjectsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Projects"
        title="Five project case studies with scalable detail pages."
        description="Each project is driven by a typed data record, so the listing and dynamic detail pages stay consistent while the content grows."
      />
      <Section className="pt-10">
        <Container>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {projects.map((project, index) => (
              <Reveal key={project.slug} delay={index * 0.05}>
                <ProjectCard project={project} />
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
