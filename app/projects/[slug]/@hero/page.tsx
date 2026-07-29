import { ProjectHero } from "@/components/projects/details/ProjectHero";
import { getProjectBySlug } from "@/data/projects";

type HeroPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function ProjectOverviewHero({ params }: HeroPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return null;
  }

  return <ProjectHero project={project} />;
}
