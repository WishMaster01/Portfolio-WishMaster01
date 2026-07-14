import type { ChatMessage } from "@/types/chat";

export function buildPortfolioSystemPrompt(context: unknown) {
  return [
    "You are the AI portfolio assistant for WishMaster01.",
    "Your job is to answer recruiter, client, and collaborator questions using only the supplied portfolio context.",
    "Be concise, specific, and confident. Prefer concrete projects, skills, and evidence over generic praise.",
    "If asked whether WishMaster01 knows a technology, answer from the context and mention related projects or skill groups.",
    "If asked about a project, explain the product goal, problem, solution, impact, role, and stack when available.",
    "If the answer is not in the context, say that the portfolio does not provide that detail yet and suggest contacting WishMaster01.",
    "Do not invent employment history, metrics, degrees, clients, or private information.",
    "Do not claim the model was trained or fine-tuned. Explain that the assistant is grounded on the portfolio's structured context if asked.",
    "",
    "Portfolio context JSON:",
    JSON.stringify(context),
  ].join("\n");
}

export function buildFallbackAnswer(question: string) {
  const normalizedQuestion = question.toLowerCase();

  if (normalizedQuestion.includes("infinityai")) {
    return "InfinityAI is an AI product platform case study focused on fast onboarding, clear model interaction, prompt-first workflows, reusable AI UI sections, and future API integration points. WishMaster01’s role is positioned as full-stack product engineer using Next.js, TypeScript, Tailwind, Framer Motion, and AI UX patterns.";
  }

  if (
    normalizedQuestion.includes("project") ||
    normalizedQuestion.includes("built")
  ) {
    return "WishMaster01 has portfolio case studies for InfinityAI, ExploreX, DailyEssentials, Vyvo, and WishCart. They cover AI product UX, travel discovery, commerce, wellness dashboards, and marketplace architecture.";
  }

  if (
    normalizedQuestion.includes("stack") ||
    normalizedQuestion.includes("skills") ||
    normalizedQuestion.includes("next")
  ) {
    return "WishMaster01’s stack includes Next.js, React, TypeScript, Tailwind CSS, Framer Motion, Node.js, Prisma, PostgreSQL, route handlers, accessibility, SEO, and production build discipline. The portfolio itself is built with Next.js App Router and TypeScript.";
  }

  if (normalizedQuestion.includes("resume")) {
    return "WishMaster01 is presented as a full-stack software engineer focused on Next.js, TypeScript, responsive UI systems, typed content/data modeling, reusable components, and scalable portfolio/product architecture.";
  }

  return "WishMaster01 is a product-minded full-stack engineer focused on Next.js, TypeScript, Tailwind CSS, polished interfaces, and scalable portfolio/product architecture. Ask about projects, skills, resume, InfinityAI, or the tech stack for a more specific answer.";
}

export function compactMessages(messages: ChatMessage[]) {
  return messages.slice(-8).map((message) => ({
    role: message.role,
    content: message.content,
  }));
}
