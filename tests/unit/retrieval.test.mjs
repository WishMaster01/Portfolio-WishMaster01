import test, { describe } from "node:test";
import assert from "node:assert";

import { BM25Index } from "@/server/chat/retrieval/bm25";
import { generateFeatureVector, cosineSimilarity, VectorIndex } from "@/server/chat/retrieval/embeddings";
import { HybridRetriever } from "@/server/chat/retrieval/hybrid-retriever";

describe("Search & RAG Retrieval Engine Unit Tests", () => {
  const sampleDocs = [
    {
      id: "doc-nextjs",
      type: "project",
      title: "Next.js Architecture Portfolio",
      source: "/projects/portfolio",
      tags: ["nextjs", "react", "typescript", "architecture"],
      content: "Scalable App Router architecture with server components, typed data layer, and production readiness.",
      updatedAt: "2026-09-27",
    },
    {
      id: "doc-postgres",
      type: "article",
      title: "PostgreSQL Prisma Optimization",
      source: "/blog/postgres-prisma",
      tags: ["postgres", "prisma", "sql", "database"],
      content: "Database schema design, composite indexes, relational models, and connection pooling for SaaS systems.",
      updatedAt: "2026-09-27",
    },
    {
      id: "doc-ai",
      type: "project",
      title: "InfinityAI Platform",
      source: "/projects/infinityai",
      tags: ["ai", "gemini", "openrouter", "saas"],
      content: "Multimodal generative AI workspace with credit controls, provider fallback, and streaming completions.",
      updatedAt: "2026-09-27",
    },
  ];

  describe("BM25 Lexical Engine", () => {
    test("should index documents and score exact matches highest", () => {
      const bm25 = new BM25Index(sampleDocs);
      const results = bm25.search("Next.js App Router", 2);

      assert.ok(results.length > 0);
      assert.strictEqual(results[0].document.id, "doc-nextjs");
      assert.ok(results[0].score > 0);
    });

    test("should rank database document highest for postgres queries", () => {
      const bm25 = new BM25Index(sampleDocs);
      const results = bm25.search("PostgreSQL indexes and connection pooling", 2);

      assert.ok(results.length > 0);
      assert.strictEqual(results[0].document.id, "doc-postgres");
    });

    test("should return empty list for completely irrelevant queries", () => {
      const bm25 = new BM25Index(sampleDocs);
      const results = bm25.search("quantum teleportation astrophysics", 3);
      assert.strictEqual(results.length, 0);
    });
  });

  describe("Deterministic Dense Vector Embeddings", () => {
    test("should produce 256-dimensional unit vectors (L2 norm = 1.0)", () => {
      const vec = generateFeatureVector("Full-Stack AI Software Engineer");
      assert.strictEqual(vec.length, 256);

      // Compute L2 norm
      const norm = Math.sqrt(vec.reduce((sum, val) => sum + val * val, 0));
      assert.ok(Math.abs(norm - 1.0) < 0.001);
    });

    test("should return high cosine similarity for semantically related texts", () => {
      const vec1 = generateFeatureVector("React Next.js TypeScript frontend");
      const vec2 = generateFeatureVector("React TypeScript Next.js web application");
      const vec3 = generateFeatureVector("quantum mechanics black hole physics");

      const simRelated = cosineSimilarity(vec1, vec2);
      const simUnrelated = cosineSimilarity(vec1, vec3);

      assert.ok(simRelated > simUnrelated);
      assert.ok(simRelated > 0.5);
    });

    test("should index and search vector store", () => {
      const index = new VectorIndex(sampleDocs);

      const results = index.search("generative AI multimodal models", 2);
      assert.ok(results.length > 0);
      assert.strictEqual(results[0].document.id, "doc-ai");
    });
  });

  describe("Hybrid Retrieval Fusion", () => {
    test("should combine BM25 and vector embeddings to surface target document", () => {
      const retriever = new HybridRetriever(sampleDocs);
      const results = retriever.retrieve("How does the App Router architecture work?", 2);

      assert.ok(results.length > 0);
      assert.strictEqual(results[0].document.id, "doc-nextjs");
      assert.ok(results[0].finalScore > 0);
      assert.ok(results[0].lexicalScore >= 0);
      assert.ok(results[0].vectorScore >= 0);
    });

    test("should apply metadata boost to matching tags", () => {
      const retriever = new HybridRetriever(sampleDocs);
      const results = retriever.retrieve("prisma database schema", 1);

      assert.strictEqual(results[0].document.id, "doc-postgres");
      assert.ok(results[0].metadataBoost > 0);
    });
  });
});
