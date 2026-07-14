import { articles } from "@/data/blog";
import { experienceItems } from "@/data/experience";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";
import { resume } from "@/data/resume";
import { services, siteConfig } from "@/data/site";
import { skillGroups, skillHighlights } from "@/data/skills";

function includesAny(source: string, terms: string[]) {
  const normalizedSource = source.toLowerCase();
  return terms.some((term) => normalizedSource.includes(term.toLowerCase()));
}

export function buildPortfolioContext(question: string) {
  const selectedProjects = projects.filter((project) =>
    includesAny(question, [
      project.slug,
      project.title,
      project.category,
      ...project.stack,
    ]),
  );

  const relevantProjects = selectedProjects.length ? selectedProjects : projects;

  return {
    identity: {
      name: siteConfig.name,
      creator: siteConfig.creator,
      email: siteConfig.email,
      summary: profile.shortBio,
      longBio: profile.longBio,
      focusAreas: profile.focusAreas,
      principles: profile.principles,
    },
    skills: {
      highlights: skillHighlights,
      groups: skillGroups,
    },
    resume,
    experience: experienceItems,
    services,
    projects: relevantProjects.map((project) => ({
      title: project.title,
      slug: project.slug,
      category: project.category,
      year: project.year,
      role: project.role,
      timeline: project.timeline,
      summary: project.summary,
      problem: project.problem,
      solution: project.solution,
      impact: project.impact,
      stack: project.stack,
      highlights: project.highlights,
      metrics: project.metrics,
    })),
    blog: articles,
  };
}

export function getSuggestedQuestions() {
  return [
    "What projects has WishMaster01 built?",
    "What tech stack does he know?",
    "Explain InfinityAI.",
    "Is he good with Next.js?",
    "Summarize his resume.",
  ];
}
