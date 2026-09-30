import { articles } from "@/data/blog";
import { allAlgorithmTopics } from "@/data/dsa";
import { navigation } from "@/data/navigation";
import { projects } from "@/data/projects";
import { skillGroups, skillHighlights } from "@/data/skills";

export type CommandRecord = {
  id: string;
  title: string;
  group: "Pages" | "Projects" | "Blog" | "DSA" | "Skills" | "Theme";
  keywords: string[];
  href: string;
};

export const commands: CommandRecord[] = [
  { id: "cmd-home", title: "Go Home", group: "Pages", keywords: ["home", "main", "start"], href: "/" },
  { id: "cmd-projects", title: "View Projects", group: "Projects", keywords: ["projects", "work", "apps", "codebase"], href: "/projects" },
  { id: "cmd-recruiter", title: "Recruiter Mode", group: "Pages", keywords: ["recruiter", "fast", "eval", "summary", "hire"], href: "/recruiter" },
  { id: "cmd-resume", title: "Open Resume", group: "Pages", keywords: ["resume", "cv", "pdf", "download"], href: "/resume" },
  { id: "cmd-engineering", title: "Engineering", group: "Pages", keywords: ["engineering", "systems", "architecture", "hub"], href: "/engineering" },
  { id: "cmd-architecture", title: "Architecture", group: "Pages", keywords: ["architecture", "system design", "diagrams"], href: "/engineering/architecture" },
  { id: "cmd-algorithms", title: "Algorithms", group: "DSA", keywords: ["algorithms", "dsa", "complexity", "lru", "cache"], href: "/engineering/algorithms" },
  { id: "cmd-ai-engineering", title: "AI Engineering", group: "Pages", keywords: ["ai", "rag", "hybrid retrieval", "embeddings"], href: "/engineering/ai" },
  { id: "cmd-blog", title: "Blog", group: "Blog", keywords: ["blog", "writing", "articles"], href: "/blog" },
  { id: "cmd-activity", title: "GitHub", group: "Pages", keywords: ["github", "activity", "git", "commits", "repos"], href: "/activity" },
  { id: "cmd-contact", title: "Contact", group: "Pages", keywords: ["contact", "email", "message", "hire"], href: "/contact" },
  { id: "cmd-theme-light", title: "Aurora Light", group: "Theme", keywords: ["theme", "light", "aurora light", "mode", "color"], href: "theme:light" },
  { id: "cmd-theme-dark", title: "Aurora Dark", group: "Theme", keywords: ["theme", "dark", "aurora dark", "mode", "color"], href: "theme:dark" },
  { id: "cmd-theme-eclipse", title: "Aurora Eclipse", group: "Theme", keywords: ["theme", "eclipse", "aurora eclipse", "mode", "neon"], href: "theme:eclipse" },
  { id: "cmd-theme-cyber", title: "Aurora Cyber", group: "Theme", keywords: ["theme", "cyber", "aurora cyber", "mode", "matrix", "emerald", "teal"], href: "theme:cyber" },
  { id: "cmd-theme-sunset", title: "Aurora Sunset", group: "Theme", keywords: ["theme", "sunset", "aurora sunset", "mode", "cosmic", "magenta", "amber"], href: "theme:sunset" },
  ...navigation.main.map((item) => ({
    id: item.href === "/" ? "nav-home" : `nav-${item.href.replace("/", "")}`,
    title: item.label,
    group: "Pages" as const,
    keywords: [
      item.label,
      item.href,
      "navigation",
      "page",
      ...(item.href === "/activity" ? ["github", "leetcode", "dsa", "telemetry", "codebase", "contributions", "activity"] : []),
    ],
    href: item.href,
  })),
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
  ...projects.map((project) => ({
    id: `${project.slug}-engineering`,
    title: `${project.title} Engineering`,
    group: "Projects" as const,
    keywords: [
      project.title,
      project.category,
      "engineering testing performance reliability ci cd security monitoring",
      project.stack.join(" "),
    ],
    href: `/projects/${project.slug}/engineering`,
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
  ...allAlgorithmTopics.map((topic) => ({
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
