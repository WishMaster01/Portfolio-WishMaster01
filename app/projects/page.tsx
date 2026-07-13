import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";
import { ProjectBrowser } from "@/components/projects/project-browser";
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
          <ProjectBrowser projects={projects} />
        </Container>
      </Section>
    </>
  );
}
