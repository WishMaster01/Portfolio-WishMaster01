import { z } from "zod";

const timelineItemSchema = z.object({
  phase: z.string().trim().min(2).max(80),
  description: z.string().trim().min(10).max(1000),
});

const metricSchema = z.object({
  label: z.string().trim().min(1).max(80),
  value: z.string().trim().min(1).max(40),
});

export const projectCaseStudySchema = z.object({
  background: z.string().trim().min(20).max(5000),
  problem: z.string().trim().min(20).max(5000),
  targetUsers: z.string().trim().min(5).max(1000),
  role: z.string().trim().min(3).max(500),
  constraints: z.array(z.string().trim().min(2).max(500)).max(20),
  goals: z.array(z.string().trim().min(2).max(500)).max(20),
  process: z.array(timelineItemSchema).min(1).max(15),
  outcomes: z.array(metricSchema).max(20),
  lessons: z.array(z.string().trim().min(2).max(1000)).max(20),
  futureScope: z.array(z.string().trim().min(2).max(1000)).max(20),
});

export type ProjectCaseStudyInput = z.infer<typeof projectCaseStudySchema>;
