import { articles } from "@/data/blog";
import { experienceItems } from "@/data/experience";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";
import { resume } from "@/data/resume";
import { services, siteConfig } from "@/data/site";
import { skillGroups, skillHighlights } from "@/data/skills";

function containsAny(source: string, terms: string[]) {
  const normalizedSource = source.toLowerCase();
  return terms.some((term) => normalizedSource.includes(term.toLowerCase()));
}

export function buildChatContext(question: string) {
  const relevantProjects = projects.filter((project) =>
    containsAny(question, [
      project.slug,
      project.title,
      project.category,
      project.role,
      ...project.stack,
    ]),
  );

  return {
    owner: siteConfig.name,
    role: "Full-Stack AI & SaaS Developer",
    contact: {
      email: siteConfig.email,
      github: siteConfig.social.github,
      linkedin: siteConfig.social.linkedin,
    },
    profile: {
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
    projects: (relevantProjects.length ? relevantProjects : projects).map(
      (project) => ({
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
      }),
    ),
    blog: articles,
  };
}

export function getChatSuggestedQuestions() {
  return [
    "What projects has WishMaster01 built?",
    "What tech stack does he know?",
    "Explain InfinityAI.",
    "Is he experienced with Next.js?",
    "Summarize his resume.",
  ];
}
