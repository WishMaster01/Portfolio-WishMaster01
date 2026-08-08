import { articles } from "@/data/blog";
import { experienceItems } from "@/data/experience";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";
import { resume } from "@/data/resume";
import { services, siteConfig } from "@/data/site";
import { skillGroups, skillHighlights } from "@/data/skills";
import { rankByTextSimilarity } from "@/lib/algorithms/vector-similarity";

export function buildChatContext(question: string) {
  const relevantProjects = rankByTextSimilarity(
    question,
    projects,
    (project) =>
      [
        project.slug,
        project.title,
        project.category,
        project.role,
        project.summary,
        project.problem,
        project.solution,
        project.impact,
        project.stack.join(" "),
        project.highlights.join(" "),
      ].join(" "),
    3,
  );
  const relevantArticles = rankByTextSimilarity(
    question,
    articles,
    (article) =>
      [
        article.title,
        article.excerpt,
        article.summary,
        article.category,
        article.tags.join(" "),
      ].join(" "),
    4,
  );
  const relevantServices = rankByTextSimilarity(
    question,
    services,
    (service) =>
      [service.title, service.description, service.deliverables.join(" ")].join(
        " ",
      ),
    3,
  );
  const relevantExperience = rankByTextSimilarity(
    question,
    experienceItems,
    (item) =>
      [
        item.title,
        item.company,
        item.summary,
        item.impact ?? "",
        item.stack?.join(" ") ?? "",
        item.achievements.join(" "),
      ].join(" "),
    3,
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
    experience:
      relevantExperience.length > 0 ? relevantExperience : experienceItems,
    services: relevantServices.length > 0 ? relevantServices : services,
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
    blog: relevantArticles.length > 0 ? relevantArticles : articles,
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
