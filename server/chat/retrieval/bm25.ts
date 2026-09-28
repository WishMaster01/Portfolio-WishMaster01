import type { KnowledgeDocument, KnowledgeDocumentType } from "../knowledge-base";

const STOPWORDS = new Set([
  "a", "about", "above", "after", "again", "against", "all", "am", "an", "and",
  "any", "are", "arent", "as", "at", "be", "because", "been", "before", "being",
  "below", "between", "both", "but", "by", "cant", "cannot", "could", "couldnt",
  "did", "didnt", "do", "does", "doesnt", "doing", "dont", "down", "during",
  "each", "few", "for", "from", "further", "had", "hadnt", "has", "hasnt",
  "have", "havent", "having", "he", "hed", "hell", "hes", "her", "here", "heres",
  "hers", "herself", "him", "himself", "his", "how", "hows", "i", "id", "ill",
  "im", "ive", "if", "in", "into", "is", "isnt", "it", "its", "itself", "lets",
  "me", "more", "most", "mustnt", "my", "myself", "no", "nor", "not", "of",
  "off", "on", "once", "only", "or", "other", "ought", "our", "ours", "ourselves",
  "out", "over", "own", "same", "shant", "she", "shed", "shell", "shes", "should",
  "shouldnt", "so", "some", "such", "than", "that", "thats", "the", "their",
  "theirs", "them", "themselves", "then", "there", "theres", "these", "they",
  "theyd", "theyll", "theyre", "theyve", "this", "those", "through", "to", "too",
  "under", "until", "up", "very", "was", "wasnt", "we", "wed", "well", "were",
  "werent", "weve", "what", "whats", "when", "whens", "where", "wheres", "which",
  "while", "who", "whos", "whom", "why", "whys", "with", "wont", "would",
  "wouldnt", "you", "youd", "youll", "youre", "youve", "your", "yours",
]);

export function tokenize(text: string): string[] {
  // Normalize, handle tech identifiers like next.js or c++, and split
  const normalized = text
    .toLowerCase()
    .replace(/next\.js/g, "nextjs")
    .replace(/react\.js/g, "reactjs")
    .replace(/vue\.js/g, "vuejs")
    .replace(/node\.js/g, "nodejs");

  const matches = normalized.match(/[a-z0-9+#_.-]+/g) ?? [];
  return matches
    .map((token) => token.replace(/^[.-]+|[.-]+$/g, ""))
    .filter((token) => token.length > 1 && !STOPWORDS.has(token));
}

export type BM25Match = {
  document: KnowledgeDocument;
  score: number;
  rawScore: number;
};

export type BM25FilterOptions = {
  types?: KnowledgeDocumentType[];
  tags?: string[];
};

export class BM25Index {
  private documents: KnowledgeDocument[];
  private docTokens: string[][];
  private docLengths: number[];
  private avgDocLength: number;
  private docFrequencies: Map<string, number>;
  private totalDocs: number;
  private k1: number;
  private b: number;

  constructor(documents: KnowledgeDocument[], k1 = 1.2, b = 0.75) {
    this.documents = documents;
    this.k1 = k1;
    this.b = b;
    this.totalDocs = documents.length;

    this.docTokens = documents.map((doc) =>
      tokenize(`${doc.title} ${doc.tags.join(" ")} ${doc.content}`),
    );

    this.docLengths = this.docTokens.map((tokens) => tokens.length);
    const totalLength = this.docLengths.reduce((sum, len) => sum + len, 0);
    this.avgDocLength = this.totalDocs > 0 ? totalLength / this.totalDocs : 1;

    // Calculate document frequency for each term
    this.docFrequencies = new Map();
    for (const tokens of this.docTokens) {
      const unique = new Set(tokens);
      for (const term of unique) {
        this.docFrequencies.set(term, (this.docFrequencies.get(term) ?? 0) + 1);
      }
    }
  }

  private idf(term: string): number {
    const df = this.docFrequencies.get(term) ?? 0;
    // Standard Lucene / Robertson BM25 IDF
    return Math.log(1 + (this.totalDocs - df + 0.5) / (df + 0.5));
  }

  public search(query: string, limit = 5, filters?: BM25FilterOptions): BM25Match[] {
    const queryTokens = tokenize(query);
    if (queryTokens.length === 0 || this.totalDocs === 0) {
      return [];
    }

    const matches: BM25Match[] = [];

    for (let i = 0; i < this.documents.length; i++) {
      const doc = this.documents[i];

      // Metadata filter
      if (filters?.types && !filters.types.includes(doc.type)) {
        continue;
      }
      if (filters?.tags && !filters.tags.some((t) => doc.tags.includes(t))) {
        continue;
      }

      const tokens = this.docTokens[i];
      const docLen = this.docLengths[i];

      // Compute term frequencies in document
      const tfMap = new Map<string, number>();
      for (const t of tokens) {
        tfMap.set(t, (tfMap.get(t) ?? 0) + 1);
      }

      let score = 0;
      for (const qTerm of queryTokens) {
        const tf = tfMap.get(qTerm) ?? 0;
        if (tf === 0) continue;

        const idfVal = this.idf(qTerm);
        const numerator = tf * (this.k1 + 1);
        const denominator = tf + this.k1 * (1 - this.b + this.b * (docLen / this.avgDocLength));

        score += idfVal * (numerator / denominator);
      }

      // Title exact term bonus
      const titleLower = doc.title.toLowerCase();
      for (const qTerm of queryTokens) {
        if (titleLower.includes(qTerm)) {
          score += 1.5;
        }
      }

      if (score > 0) {
        matches.push({
          document: doc,
          rawScore: score,
          score, // Will be normalized below
        });
      }
    }

    // Sort by raw score descending
    matches.sort((a, b) => b.rawScore - a.rawScore);

    // Normalize scores to [0, 1] relative to top hit
    const maxScore = matches[0]?.rawScore ?? 1;
    for (const match of matches) {
      match.score = Math.min(1, Math.max(0, match.rawScore / maxScore));
    }

    return matches.slice(0, limit);
  }
}
