import { articles } from "@/data/blog";
import { algorithmTopics } from "@/data/dsa";
import { navigation } from "@/data/navigation";
import { projects } from "@/data/projects";
import { skillGroups, skillHighlights } from "@/data/skills";

export type CommandRecord = {
  id: string;
  title: string;
  group: "Pages" | "Projects" | "Blog" | "DSA" | "Skills";
  keywords: string[];
  href: string;
};

export const commands: CommandRecord[] = [
  ...navigation.main.map((item) => ({
    id: item.href === "/" ? "home" : item.href.replace("/", ""),
    title: item.label,
    group: "Pages" as const,
    keywords: [item.label, item.href, "navigation", "page"],
    href: item.href,
  })),
  { id: "resume", title: "Resume", group: "Pages", keywords: ["cv", "download", "profile"], href: "/resume" },
  ...projects.map((project) => ({
    id: project.slug,
    title: project.title,
    group: "Projects" as const,
    keywords: [
      project.title,
      project.category,
      project.summary,
      project.stack.join(" "),
      project.highlights.join(" "),
    ],
    href: `/projects/${project.slug}`,
  })),
  ...projects.map((project) => ({
    id: `${project.slug}-architecture`,
    title: `${project.title} Architecture`,
    group: "Projects" as const,
    keywords: [
      project.title,
      project.category,
      "architecture system design diagram mermaid backend api database",
      project.stack.join(" "),
    ],
    href: `/projects/${project.slug}/architecture`,
  })),
  ...articles.map((article) => ({
    id: article.slug,
    title: article.title,
    group: "Blog" as const,
    keywords: [
      article.title,
      article.excerpt,
      article.category,
      article.tags.join(" "),
    ],
    href: `/blog/${article.slug}`,
  })),
  ...algorithmTopics.map((topic) => ({
    id: `dsa-${topic.slug}`,
    title: topic.title,
    group: "DSA" as const,
    keywords: [
      topic.title,
      topic.explanation,
      topic.patterns.join(" "),
      "dsa algorithms java complexity",
    ],
    href: `/dsa-showcase/${topic.slug}`,
  })),
  ...skillHighlights.map((skill) => ({
    id: `skill-${skill.toLowerCase().replaceAll(" ", "-")}`,
    title: skill,
    group: "Skills" as const,
    keywords: [skill, "frontend backend technology tool"],
    href: "/skills",
  })),
  ...skillGroups.flatMap((group) =>
    group.skills.map((skill) => ({
      id: `skill-${group.title}-${skill}`.toLowerCase().replaceAll(" ", "-"),
      title: skill,
      group: "Skills" as const,
      keywords: [skill, group.title, group.description],
      href: "/skills",
    })),
  ),
];
