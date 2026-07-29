import { notFound } from "next/navigation";
import { ProjectSlugChrome } from "@/components/projects/details/project-slug-chrome";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { getProjectBySlug } from "@/data/projects";

type ProjectSlugLayoutProps = {
  children: React.ReactNode;
  hero: React.ReactNode;
  params: Promise<{
    slug: string;
  }>;
};

export default async function ProjectSlugLayout({
  children,
  hero,
  params,
}: ProjectSlugLayoutProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="bg-background text-foreground">
      <Section className="py-8 sm:py-10">
        <Container className="max-w-[1500px]">
          <ProjectSlugChrome slug={slug} title={project.title} hero={hero}>
            {children}
          </ProjectSlugChrome>
        </Container>
      </Section>
    </div>
  );
}
