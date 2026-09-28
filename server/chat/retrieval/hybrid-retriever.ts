import { buildKnowledgeBase, type KnowledgeDocument } from "../knowledge-base";
import { BM25Index } from "./bm25";
import { VectorIndex } from "./embeddings";

export type RankedRetrievalResult = {
  document: KnowledgeDocument;
  finalScore: number;
  lexicalScore: number;
  vectorScore: number;
  metadataBoost: number;
};

export class HybridRetriever {
  private bm25Index: BM25Index;
  private vectorIndex: VectorIndex;
  private documents: KnowledgeDocument[];

  constructor(documents: KnowledgeDocument[] = buildKnowledgeBase()) {
    this.documents = documents;
    this.bm25Index = new BM25Index(documents);
    this.vectorIndex = new VectorIndex(documents);
  }

  private calculateMetadataBoost(query: string, doc: KnowledgeDocument): number {
    const q = query.toLowerCase();
    let boost = 0;

    // Type affinity boosting
    if ((q.includes("project") || q.includes("built") || q.includes("case study") || q.includes("work")) && doc.type === "project") {
      boost += 0.20;
    }
    if ((q.includes("stack") || q.includes("skill") || q.includes("technology") || q.includes("technologies") || q.includes("tools")) && doc.type === "skill") {
      boost += 0.20;
    }
    if ((q.includes("experience") || q.includes("company") || q.includes("career") || q.includes("role") || q.includes("job")) && doc.type === "experience") {
      boost += 0.20;
    }
    if ((q.includes("blog") || q.includes("article") || q.includes("post") || q.includes("writing")) && doc.type === "blog") {
      boost += 0.20;
    }
    if ((q.includes("dsa") || q.includes("algorithm") || q.includes("problem") || q.includes("leetcode") || q.includes("complexity") || q.includes("pattern")) && doc.type === "dsa") {
      boost += 0.20;
    }
    if ((q.includes("who is") || q.includes("bio") || q.includes("resume") || q.includes("education") || q.includes("contact") || q.includes("email")) && doc.type === "profile") {
      boost += 0.20;
    }

    // Specific entity mentions matching doc slug or title
    if (doc.slug && q.includes(doc.slug.toLowerCase())) {
      boost += 0.35;
    }

    // Tag matching boost
    const tagMatches = doc.tags.filter((t) => q.includes(t.toLowerCase())).length;
    boost += Math.min(0.20, tagMatches * 0.05);

    return Math.min(0.40, boost);
  }

  public retrieve(query: string, limit = 4): RankedRetrievalResult[] {
    const candidateLimit = limit * 3;
    const bm25Matches = this.bm25Index.search(query, candidateLimit);
    const vectorMatches = this.vectorIndex.search(query, candidateLimit);

    // Map by document ID
    const scoreMap = new Map<
      string,
      {
        document: KnowledgeDocument;
        lexicalScore: number;
        vectorScore: number;
        metadataBoost: number;
      }
    >();

    for (const match of bm25Matches) {
      scoreMap.set(match.document.id, {
        document: match.document,
        lexicalScore: match.score,
        vectorScore: 0,
        metadataBoost: 0,
      });
    }

    for (const match of vectorMatches) {
      const existing = scoreMap.get(match.document.id);
      if (existing) {
        existing.vectorScore = match.similarity;
      } else {
        scoreMap.set(match.document.id, {
          document: match.document,
          lexicalScore: 0,
          vectorScore: match.similarity,
          metadataBoost: 0,
        });
      }
    }

    const results: RankedRetrievalResult[] = [];

    for (const entry of scoreMap.values()) {
      const metadataBoost = this.calculateMetadataBoost(query, entry.document);
      entry.metadataBoost = metadataBoost;

      // Weighted hybrid fusion formula: 45% Lexical + 40% Vector + 15% Metadata Boost
      const finalScore =
        entry.lexicalScore * 0.45 +
        entry.vectorScore * 0.40 +
        entry.metadataBoost * 0.15;

      results.push({
        document: entry.document,
        finalScore,
        lexicalScore: entry.lexicalScore,
        vectorScore: entry.vectorScore,
        metadataBoost,
      });
    }

    results.sort((a, b) => b.finalScore - a.finalScore);
    return results.slice(0, limit);
  }
}

let defaultRetriever: HybridRetriever | null = null;

export function getHybridRetriever(): HybridRetriever {
  if (!defaultRetriever) {
    defaultRetriever = new HybridRetriever();
  }
  return defaultRetriever;
}
