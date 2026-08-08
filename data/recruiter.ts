import { education, experienceItems } from "@/data/experience";
import { projects } from "@/data/projects";
import { resume } from "@/data/resume";
import { skillHighlights } from "@/data/skills";
import { rankRecruiterProjects } from "@/lib/recruiter/project-ranking";
import type {
  RecruiterProfileData,
  RecruiterProject,
} from "@/types/recruiter";

export const recruiterProfile: RecruiterProfileData = {
  name: resume.name,
  headline: "Full-Stack AI & SaaS Developer",
  summary:
    "Product-minded developer focused on building polished Next.js applications, AI-powered portfolio systems, Prisma/PostgreSQL APIs, responsive dashboards, and production-ready web experiences. Strong fit for frontend, full-stack, AI product, and SaaS engineering roles.",
  availability: "Available for internships, freelance projects, and entry-level full-stack roles",
  targetRoles: [
    "Full-Stack Developer",
    "Next.js Developer",
    "Frontend Engineer",
    "AI Product Engineer",
    "SaaS Developer",
  ],
  preferredLocations: ["India", "Remote", "Hybrid"],
  workModes: ["Internship", "Full-time", "Freelance", "Contract"],
  topSkills: [
    "Next.js App Router",
    "React",
    "TypeScript",
    "Tailwind CSS",
    "Framer Motion",
    "Node.js APIs",
    "Prisma",
    "PostgreSQL",
    "Zod Validation",
    "AI API Integration",
    ...skillHighlights.slice(0, 4),
  ],
  highlights: [
    "Built a multi-page portfolio product with project case studies, blogs, DSA guides, GitHub dashboard, AI chatbot, and admin modules.",
    "Implemented backend route handlers for projects, blogs, contact, newsletter, resume, DSA, Judge0 submissions, GitHub stats, and AI chat.",
    "Designed Prisma PostgreSQL schemas, Zod validation, server-only API key handling, and production build/lint workflows.",
    "Created theme-aware, responsive, animated UI systems across home, about, projects, skills, experience, DSA, blog, contact, resume, and admin pages.",
  ],
  education: [
    {
      title: education.degree,
      institution: education.institution,
      period: education.period,
      detail: education.coursework,
    },
  ],
  experienceSummary: experienceItems.slice(0, 3).map((item) => ({
    title: item.title,
    period: item.period,
    summary: item.impact ?? item.summary,
  })),
  resumeUrl: resume.resumeFile,
  githubUrl: resume.github,
  linkedinUrl: resume.linkedin,
  email: resume.email,
};

export const recruiterProjects: RecruiterProject[] = rankRecruiterProjects(
  projects.map((project) => ({
    ...project,
    shortSummary: project.summary,
  })),
)
  .map((project) => ({
    title: project.title,
    slug: project.slug,
    shortSummary: project.summary,
    category: project.category,
    coverImage: project.screenshots[0]?.image ?? "/window.svg",
    liveUrl: project.liveUrl,
    githubUrl: project.githubUrl,
  }));
