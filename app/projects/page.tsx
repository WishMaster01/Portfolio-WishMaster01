import type { Metadata } from "next";
import { Reveal } from "@/components/motion/reveal";
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
    <div className="bg-background text-foreground">
      <Section className="py-16">
        <Container className="max-w-[1380px]">
          <Reveal className="mb-7">
            <h1 className="text-4xl font-black tracking-[-0.04em] sm:text-5xl">
              My Projects
            </h1>
            <p className="mt-3 text-base text-muted-foreground">
              Things I&apos;ve built with passion
            </p>
          </Reveal>
          <ProjectBrowser projects={projects} />
        </Container>
      </Section>
    </div>
  );
}
