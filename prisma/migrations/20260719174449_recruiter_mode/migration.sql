-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "caseStudy" JSONB,
ADD COLUMN     "published" BOOLEAN NOT NULL DEFAULT true;

-- CreateTable
CREATE TABLE "RecruiterProfile" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "headline" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "availability" TEXT NOT NULL,
    "targetRoles" JSONB NOT NULL,
    "preferredLocations" JSONB NOT NULL,
    "workModes" JSONB NOT NULL,
    "topSkills" JSONB NOT NULL,
    "highlights" JSONB NOT NULL,
    "education" JSONB NOT NULL,
    "experienceSummary" JSONB NOT NULL,
    "resumeUrl" TEXT NOT NULL,
    "githubUrl" TEXT NOT NULL,
    "linkedinUrl" TEXT,
    "email" TEXT NOT NULL,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RecruiterProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RecruiterAnalyticsEvent" (
    "id" TEXT NOT NULL,
    "event" TEXT NOT NULL,
    "target" TEXT,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RecruiterAnalyticsEvent_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "RecruiterProfile_published_idx" ON "RecruiterProfile"("published");

-- CreateIndex
CREATE INDEX "RecruiterAnalyticsEvent_event_createdAt_idx" ON "RecruiterAnalyticsEvent"("event", "createdAt");

-- CreateIndex
CREATE INDEX "Project_published_featured_idx" ON "Project"("published", "featured");
