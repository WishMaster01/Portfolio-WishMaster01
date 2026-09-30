import { notFound } from "next/navigation";
import { ProjectSlugChrome } from "@/components/projects/details/project-slug-chrome";
import { AuroraBackground } from "@/components/aurora/aurora-background";
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
    <AuroraBackground intensity="medium" className="min-h-screen">
      <div className="mx-auto w-full max-w-[1500px] px-4 py-8 sm:px-8 sm:py-10 text-foreground">
        <ProjectSlugChrome slug={slug} title={project.title} hero={hero}>
          {children}
        </ProjectSlugChrome>
      </div>
    </AuroraBackground>
  );
}
