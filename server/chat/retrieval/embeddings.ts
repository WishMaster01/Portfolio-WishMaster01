import type { KnowledgeDocument } from "../knowledge-base";
import { tokenize } from "./bm25";

const VECTOR_DIM = 256;

/**
 * Generate a deterministic dense embedding vector from text using
 * subword n-gram feature hashing and term frequency weighting.
 * Guaranteed 100% deterministic, zero network latency, and offline-reliable.
 */
export function generateFeatureVector(text: string, dim = VECTOR_DIM): number[] {
  const vector = new Float32Array(dim);
  const tokens = tokenize(text);

  if (tokens.length === 0) {
    return Array.from(vector);
  }

  for (const token of tokens) {
    // 1. Unigram feature hash
    let h1 = 2166136261;
    for (let i = 0; i < token.length; i++) {
      h1 ^= token.charCodeAt(i);
      h1 = Math.imul(h1, 16777619);
    }
    const idx1 = Math.abs(h1 % dim);
    vector[idx1] += 1.0;

    // 2. Character trigram hashes for subword morphological matching
    if (token.length >= 3) {
      for (let i = 0; i <= token.length - 3; i++) {
        let h2 = 2166136261;
        h2 ^= token.charCodeAt(i);
        h2 = Math.imul(h2, 16777619);
        h2 ^= token.charCodeAt(i + 1);
        h2 = Math.imul(h2, 16777619);
        h2 ^= token.charCodeAt(i + 2);
        h2 = Math.imul(h2, 16777619);
        const idx2 = Math.abs(h2 % dim);
        vector[idx2] += 0.35;
      }
    }
  }

  // L2 Normalization
  let norm = 0;
  for (let i = 0; i < dim; i++) {
    norm += vector[i] * vector[i];
  }
  norm = Math.sqrt(norm);

  if (norm > 0) {
    for (let i = 0; i < dim; i++) {
      vector[i] /= norm;
    }
  }

  return Array.from(vector);
}

/**
 * Calculate cosine similarity between two unit vectors.
 */
export function cosineSimilarity(a: number[], b: number[]): number {
  if (a.length !== b.length || a.length === 0) return 0;
  let dotProduct = 0;
  for (let i = 0; i < a.length; i++) {
    dotProduct += a[i] * b[i];
  }
  // Bounded between 0 and 1 for positive feature weights
  return Math.max(0, Math.min(1, dotProduct));
}

export type VectorMatch = {
  document: KnowledgeDocument;
  similarity: number;
};

export class VectorIndex {
  private documents: KnowledgeDocument[];
  private embeddings: number[][];

  constructor(documents: KnowledgeDocument[]) {
    this.documents = documents;
    this.embeddings = documents.map((doc) => {
      if (doc.embedding && doc.embedding.length === VECTOR_DIM) {
        return doc.embedding;
      }
      return generateFeatureVector(`${doc.title} ${doc.tags.join(" ")} ${doc.content}`);
    });
  }

  public search(query: string, limit = 5): VectorMatch[] {
    const queryVector = generateFeatureVector(query);
    const matches: VectorMatch[] = [];

    for (let i = 0; i < this.documents.length; i++) {
      const similarity = cosineSimilarity(queryVector, this.embeddings[i]);
      if (similarity > 0.01) {
        matches.push({
          document: this.documents[i],
          similarity,
        });
      }
    }

    matches.sort((a, b) => b.similarity - a.similarity);
    return matches.slice(0, limit);
  }
}
