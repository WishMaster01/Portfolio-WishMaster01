import type { Metadata } from "next";
import { Reveal } from "@/components/motion/reveal";
import { ProjectCard } from "@/components/projects/project-card";
import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Selected portfolio projects and implementation case studies by WishMaster01.",
};

export default function ProjectsPage() {
  return (
    <Section>
      <Container className="space-y-10">
        <Reveal className="max-w-3xl space-y-5">
          <Badge>Projects</Badge>
          <h1 className="text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
            Case-study routes ready for deeper technical storytelling.
          </h1>
          <p className="text-lg leading-8 text-muted-foreground">
            These cards are intentionally data-driven. The same shape can later
            be backed by Prisma without rewriting the presentation layer.
          </p>
        </Reveal>

        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((project, index) => (
            <Reveal key={project.slug} delay={index * 0.06}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
