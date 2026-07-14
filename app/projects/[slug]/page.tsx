import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectDetails } from "@/components/projects/details/ProjectDetails";
import { getProjectBySlug, projects } from "@/data/projects";
import { siteConfig } from "@/data/site";

type ProjectPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Project not found",
    };
  }

  return {
    title: project.title,
    description: project.summary,
    alternates: {
      canonical: `/projects/${project.slug}`,
    },
    openGraph: {
      type: "article",
      url: `${siteConfig.url}/projects/${project.slug}`,
      title: `${project.title} | ${siteConfig.name}`,
      description: project.summary,
      siteName: siteConfig.name,
      images: [
        {
          url: `/projects/${project.slug}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: `${project.title} case study`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} | ${siteConfig.name}`,
      description: project.summary,
      images: [`/projects/${project.slug}/opengraph-image`],
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CreativeWork",
            name: project.title,
            description: project.summary,
            url: `${siteConfig.url}/projects/${project.slug}`,
            creator: {
              "@type": "Person",
              name: siteConfig.creator,
            },
            keywords: project.technologies,
            codeRepository: project.githubUrl,
            workExample: project.liveUrl,
          }),
        }}
      />
      <ProjectDetails project={project} />
    </>
  );
}
