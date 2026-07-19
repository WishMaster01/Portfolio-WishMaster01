-- CreateTable
CREATE TABLE "ContactMessage" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'NEW',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ContactMessage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AlgorithmCategory" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AlgorithmCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AlgorithmTopic" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "explanation" TEXT NOT NULL,
    "visualExplanation" TEXT NOT NULL,
    "difficulty" TEXT NOT NULL,
    "patterns" TEXT[],
    "recognition" TEXT[],
    "approach" TEXT[],
    "pitfalls" TEXT[],
    "timeComplexity" TEXT NOT NULL,
    "spaceComplexity" TEXT NOT NULL,
    "useCases" TEXT[],
    "published" BOOLEAN NOT NULL DEFAULT true,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "categoryId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AlgorithmTopic_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CodeExample" (
    "id" TEXT NOT NULL,
    "language" TEXT NOT NULL DEFAULT 'Java',
    "code" TEXT NOT NULL,
    "isPrimary" BOOLEAN NOT NULL DEFAULT true,
    "topicId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CodeExample_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PracticeProblem" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "difficulty" TEXT NOT NULL,
    "pattern" TEXT NOT NULL,
    "url" TEXT,
    "topicId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PracticeProblem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ContactMessage_email_idx" ON "ContactMessage"("email");

-- CreateIndex
CREATE INDEX "ContactMessage_status_createdAt_idx" ON "ContactMessage"("status", "createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "AlgorithmCategory_slug_key" ON "AlgorithmCategory"("slug");

-- CreateIndex
CREATE INDEX "AlgorithmCategory_sortOrder_idx" ON "AlgorithmCategory"("sortOrder");

-- CreateIndex
CREATE UNIQUE INDEX "AlgorithmTopic_slug_key" ON "AlgorithmTopic"("slug");

-- CreateIndex
CREATE INDEX "AlgorithmTopic_published_sortOrder_idx" ON "AlgorithmTopic"("published", "sortOrder");

-- CreateIndex
CREATE INDEX "AlgorithmTopic_difficulty_idx" ON "AlgorithmTopic"("difficulty");

-- CreateIndex
CREATE INDEX "AlgorithmTopic_categoryId_idx" ON "AlgorithmTopic"("categoryId");

-- CreateIndex
CREATE INDEX "CodeExample_topicId_isPrimary_idx" ON "CodeExample"("topicId", "isPrimary");

-- CreateIndex
CREATE INDEX "PracticeProblem_topicId_idx" ON "PracticeProblem"("topicId");

-- CreateIndex
CREATE INDEX "PracticeProblem_difficulty_idx" ON "PracticeProblem"("difficulty");

-- AddForeignKey
ALTER TABLE "AlgorithmTopic" ADD CONSTRAINT "AlgorithmTopic_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "AlgorithmCategory"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CodeExample" ADD CONSTRAINT "CodeExample_topicId_fkey" FOREIGN KEY ("topicId") REFERENCES "AlgorithmTopic"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PracticeProblem" ADD CONSTRAINT "PracticeProblem_topicId_fkey" FOREIGN KEY ("topicId") REFERENCES "AlgorithmTopic"("id") ON DELETE CASCADE ON UPDATE CASCADE;
