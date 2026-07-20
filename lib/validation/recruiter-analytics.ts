import { z } from "zod";

export const recruiterAnalyticsEventSchema = z.object({
  event: z.enum([
    "recruiter_page_opened",
    "recruiter_resume_downloaded",
    "recruiter_github_clicked",
    "recruiter_linkedin_clicked",
    "recruiter_contact_clicked",
    "recruiter_project_clicked",
  ]),
  target: z.string().trim().max(180).optional(),
});
