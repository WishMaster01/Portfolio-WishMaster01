import { z } from "zod";

const testSuiteStatusSchema = z.enum(["Implemented", "Partial", "Planned"]);

const testSuiteSchema = z.object({
  type: z.string().trim().min(2).max(80),
  tools: z.array(z.string().trim().min(1).max(80)).min(1).max(10),
  coverage: z.string().trim().min(10).max(1000),
  status: testSuiteStatusSchema,
});

const performanceMetricSchema = z.object({
  metric: z.string().trim().min(1).max(80),
  value: z.string().trim().min(1).max(40),
  environment: z.string().trim().min(5).max(200),
  measuredAt: z
    .string()
    .trim()
    .regex(/^\d{4}-\d{2}-\d{2}$/),
});

export const projectEngineeringSchema = z.object({
  testingSummary: z.string().trim().min(20).max(5000),
  testSuites: z.array(testSuiteSchema).min(1).max(12),
  performance: z.array(performanceMetricSchema).max(20),
  reliability: z.array(z.string().trim().min(2).max(500)).max(30),
  security: z.array(z.string().trim().min(2).max(500)).max(30),
  monitoring: z.array(z.string().trim().min(2).max(500)).max(30),
  ciCd: z.array(z.string().trim().min(2).max(500)).max(20),
});

export type ProjectEngineeringInput = z.infer<typeof projectEngineeringSchema>;
