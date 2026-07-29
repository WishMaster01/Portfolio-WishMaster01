import { ArchitectureHero } from "@/components/architecture/architecture-hero";
import { getProjectArchitecture } from "@/server/queries/get-project-architecture";

type HeroPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function ProjectArchitectureHero({ params }: HeroPageProps) {
  const { slug } = await params;
  const project = await getProjectArchitecture(slug);

  if (!project?.architecture) {
    return null;
  }

  return (
    <ArchitectureHero
      title={project.title}
      slug={project.slug}
      category={project.category}
      summary={project.architecture.summary}
      liveUrl={project.liveUrl}
      githubUrl={project.githubUrl}
    />
  );
}
