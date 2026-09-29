import test, { describe } from "node:test";
import assert from "node:assert";

import { LruCache } from "@/lib/algorithms/lru-cache";
import { LfuCache } from "@/lib/algorithms/lfu-cache";
import { PriorityQueue } from "@/lib/algorithms/priority-queue";
import { levenshteinDistance, tokenize, buildSearchIndex } from "@/lib/algorithms/text-search";
import { jaccardSimilarity, jaccardSimilarityFromText } from "@/lib/algorithms/jaccard-similarity";
import { cosineSimilarityFromText } from "@/lib/algorithms/vector-similarity";
import { binarySearch, lowerBound, upperBound } from "@/lib/algorithms/binary-search";
import { movingAverage } from "@/lib/algorithms/rolling-window";

describe("Algorithms & Data Structures Unit Tests", () => {
  describe("LRU Cache", () => {
    test("should store and retrieve values", () => {
      const cache = new LruCache(3);
      cache.set("a", 1);
      cache.set("b", 2);
      assert.strictEqual(cache.get("a"), 1);
      assert.strictEqual(cache.get("b"), 2);
      assert.strictEqual(cache.get("nonexistent"), undefined);
    });

    test("should evict least recently used item when capacity is exceeded", () => {
      const cache = new LruCache(2);
      cache.set("x", 10);
      cache.set("y", 20);
      // Access 'x' so 'y' becomes the LRU
      cache.get("x");
      // Add 'z', should evict 'y'
      cache.set("z", 30);

      assert.strictEqual(cache.get("x"), 10);
      assert.strictEqual(cache.get("z"), 30);
      assert.strictEqual(cache.get("y"), undefined);
    });

    test("should update existing keys without exceeding capacity", () => {
      const cache = new LruCache(2);
      cache.set("k1", 100);
      cache.set("k2", 200);
      cache.set("k1", 150); // update
      assert.strictEqual(cache.get("k1"), 150);
      cache.set("k3", 300);
      assert.strictEqual(cache.get("k2"), undefined); // k2 was LRU
    });
  });

  describe("LFU Cache", () => {
    test("should evict least frequently used item", () => {
      const cache = new LfuCache(2);
      cache.set("a", 1);
      cache.set("b", 2);
      // Access 'a' twice, 'b' once
      cache.get("a");
      cache.get("a");
      cache.get("b");

      // Add 'c', should evict 'b' (frequency 2) over 'a' (frequency 3)
      cache.set("c", 3);
      assert.strictEqual(cache.get("a"), 1);
      assert.strictEqual(cache.get("c"), 3);
      assert.strictEqual(cache.get("b"), undefined);
    });

    test("should break frequency ties using least recent access", () => {
      const cache = new LfuCache(2);
      cache.set("item1", 10);
      cache.set("item2", 20);
      // Both have frequency 1. Add item3: item1 was least recently accessed among frequency 1
      cache.set("item3", 30);
      assert.strictEqual(cache.get("item1"), undefined);
      assert.strictEqual(cache.get("item2"), 20);
      assert.strictEqual(cache.get("item3"), 30);
    });
  });

  describe("Priority Queue (Min & Max Heap)", () => {
    test("should maintain min-heap ordering", () => {
      const minHeap = new PriorityQueue((a, b) => a - b);
      minHeap.push(42);
      minHeap.push(10);
      minHeap.push(30);
      minHeap.push(5);

      assert.strictEqual(minHeap.size, 4);
      assert.strictEqual(minHeap.peek(), 5);
      assert.strictEqual(minHeap.pop(), 5);
      assert.strictEqual(minHeap.pop(), 10);
      assert.strictEqual(minHeap.pop(), 30);
      assert.strictEqual(minHeap.pop(), 42);
      assert.strictEqual(minHeap.pop(), undefined);
    });

    test("should maintain max-heap ordering", () => {
      const maxHeap = new PriorityQueue((a, b) => b - a);
      maxHeap.push(15);
      maxHeap.push(50);
      maxHeap.push(25);

      assert.strictEqual(maxHeap.pop(), 50);
      assert.strictEqual(maxHeap.pop(), 25);
      assert.strictEqual(maxHeap.pop(), 15);
    });
  });

  describe("Levenshtein Distance & Fuzzy Match", () => {
    test("should compute correct edit distance", () => {
      assert.strictEqual(levenshteinDistance("", ""), 0);
      assert.strictEqual(levenshteinDistance("abc", "abc"), 0);
      assert.strictEqual(levenshteinDistance("kitten", "sitting"), 3);
      assert.strictEqual(levenshteinDistance("nextjs", "react"), 5);
      assert.strictEqual(levenshteinDistance("fast", "faster"), 2);
    });

    test("should correctly tokenize text", () => {
      const tokens = tokenize("Next.js App Router 16.0 (Production-Ready)!");
      assert.deepStrictEqual(tokens, ["next", "js", "app", "router", "16", "0", "production", "ready"]);
    });

    test("should index and search documents", () => {
      const index = buildSearchIndex([
        { id: "1", title: "Next.js Architecture", body: "Server components and App Router", payload: { slug: "nextjs" } },
        { id: "2", title: "PostgreSQL Prisma", body: "Relational database modeling and queries", payload: { slug: "postgres" } },
      ]);
      assert.strictEqual(index.documents.length, 2);
      assert.ok(index.averageDocumentLength > 0);
    });
  });

  describe("Jaccard Similarity", () => {
    test("should calculate set overlap accurately", () => {
      const setA = new Set(["react", "nextjs", "typescript"]);
      const setB = new Set(["react", "typescript", "tailwind"]);
      // Intersection: 2 (react, typescript), Union: 4 (react, nextjs, typescript, tailwind)
      // Expected: 2/4 = 0.5
      const sim = jaccardSimilarity(setA, setB);
      assert.strictEqual(sim, 0.5);
    });

    test("should return 1.0 for identical sets and 0.0 for disjoint sets", () => {
      assert.strictEqual(jaccardSimilarity(new Set(["a"]), new Set(["a"])), 1.0);
      assert.strictEqual(jaccardSimilarity(new Set(["a"]), new Set(["b"])), 0.0);
      assert.strictEqual(jaccardSimilarity(new Set(), new Set()), 1.0);
    });

    test("should compute text-based Jaccard similarity", () => {
      const sim = jaccardSimilarityFromText("frontend engineering react nextjs", "frontend engineering vue nuxt");
      assert.ok(sim > 0 && sim < 1);
    });
  });

  describe("Cosine / Vector Similarity", () => {
    test("should return 1.0 for identical text and 0.0 for disjoint text", () => {
      const simSame = cosineSimilarityFromText("react typescript nextjs", "react typescript nextjs");
      assert.ok(Math.abs(simSame - 1.0) < 0.001);

      const simDisjoint = cosineSimilarityFromText("apple banana", "car truck");
      assert.strictEqual(simDisjoint, 0);
    });

    test("should calculate proportional similarity for overlapping terms", () => {
      const sim = cosineSimilarityFromText("full stack software engineer", "full stack developer");
      assert.ok(sim > 0.4 && sim < 0.9);
    });
  });

  describe("Binary Search & Bounds", () => {
    test("should find exact matches in sorted array", () => {
      const arr = [2, 5, 8, 12, 16, 23, 38, 56, 72, 91];
      assert.strictEqual(binarySearch(arr, 23), 5);
      assert.strictEqual(binarySearch(arr, 2), 0);
      assert.strictEqual(binarySearch(arr, 91), 9);
      assert.strictEqual(binarySearch(arr, 40), -1);
    });

    test("should compute lowerBound and upperBound", () => {
      const arr = [10, 20, 20, 20, 30, 40];
      assert.strictEqual(lowerBound(arr, 20), 1);
      assert.strictEqual(upperBound(arr, 20), 4);
      assert.strictEqual(lowerBound(arr, 25), 4);
    });
  });

  describe("Rolling Window", () => {
    test("should calculate correct moving averages", () => {
      const data = [10, 20, 30, 40, 50];
      const ma2 = movingAverage(data, 2);
      assert.strictEqual(ma2[0], 10);
      assert.strictEqual(ma2[1], 15); // (10+20)/2
      assert.strictEqual(ma2[2], 25); // (20+30)/2
      assert.strictEqual(ma2[3], 35); // (30+40)/2
      assert.strictEqual(ma2[4], 45); // (40+50)/2
    });

    test("should handle empty or invalid window sizes gracefully", () => {
      assert.deepStrictEqual(movingAverage([], 3), []);
      assert.deepStrictEqual(movingAverage([1, 2, 3], 0), []);
    });
  });
});
