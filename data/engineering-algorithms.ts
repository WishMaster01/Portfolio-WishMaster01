export type EngineeringAlgorithm = {
  id: string;
  name: string;
  category: "Caching & Memory" | "Information Retrieval & NLP" | "Search & Ordering" | "Graph & Similarity";
  timeComplexity: {
    average: string;
    worst: string;
  };
  spaceComplexity: string;
  whyItExists: string;
  portfolioUsage: string;
  codeSnippet: string;
  exampleExplanation: string;
  sourceFile: string;
};

export const engineeringAlgorithms: EngineeringAlgorithm[] = [
  {
    id: "lru-cache",
    name: "LRU (Least Recently Used) Cache",
    category: "Caching & Memory",
    timeComplexity: {
      average: "O(1) get, O(1) set",
      worst: "O(1)",
    },
    spaceComplexity: "O(capacity)",
    whyItExists:
      "When memory is finite and access recency predicts future requests, LRU evicts items that have gone unrequested longest, ensuring fast O(1) reads without unbounded heap growth.",
    portfolioUsage:
      "Used in Server Component query memoization and client-side command palette history to cache recent lookups with fixed memory boundaries.",
    sourceFile: "lib/algorithms/lru-cache.ts",
    exampleExplanation:
      "A doubly-linked list maintains access order while a hash map maps keys to list nodes for O(1) access. Moving a node to head on access marks it as most recently used.",
    codeSnippet: `const cache = new LruCache<string, Project>(50);
cache.set("infinityai", projectData);
const hit = cache.get("infinityai"); // Promoted to head in O(1)`,
  },
  {
    id: "lfu-cache",
    name: "LFU (Least Frequently Used) Cache",
    category: "Caching & Memory",
    timeComplexity: {
      average: "O(1) get, O(1) set",
      worst: "O(1)",
    },
    spaceComplexity: "O(capacity)",
    whyItExists:
      "Unlike LRU, LFU tracks total access frequency. Infrequent burst access cannot evict genuinely hot items, protecting critical shared assets under high variance workloads.",
    portfolioUsage:
      "Powers Theme & User Preference memoization (lib/theme/theme-cache.ts), ensuring user font scaling and color settings remain instantaneous across renders.",
    sourceFile: "lib/algorithms/lfu-cache.ts",
    exampleExplanation:
      "Maintains frequency buckets (doubly-linked lists) indexed by access count. When capacity is exceeded, evicts the least frequently accessed item (breaking ties by oldest timestamp).",
    codeSnippet: `const themeCache = new LfuCache<string, ThemeConfig>(12);
themeCache.set("user-pref", resolvedTheme);
// Frequent calls increment frequency node without evicting hot items`,
  },
  {
    id: "bm25-retrieval",
    name: "BM25-Style Text Retrieval",
    category: "Information Retrieval & NLP",
    timeComplexity: {
      average: "O(Q × D_avg)",
      worst: "O(Q × |Docs|)",
    },
    spaceComplexity: "O(|Vocabulary| + |Docs|)",
    whyItExists:
      "Pure TF-IDF suffers from saturation when term frequency is high. BM25 applies sub-linear term frequency saturation and document length normalization (k1 and b parameters) for production relevance.",
    portfolioUsage:
      "Serves as the lexical search foundation in portfolio search (lib/algorithms/text-search.ts) and the lexical candidate generator for hybrid AI retrieval.",
    sourceFile: "lib/algorithms/text-search.ts",
    exampleExplanation:
      "Scores documents against multi-token queries by balancing Inverse Document Frequency (IDF) with length-penalized term frequencies.",
    codeSnippet: `const index = buildSearchIndex(portfolioDocuments);
const results = searchIndex(index, "PostgreSQL connection pooling", 5);
// Scores candidates by k1=1.2, b=0.75 saturation parameters`,
  },
  {
    id: "prefix-trie",
    name: "Prefix Trie",
    category: "Search & Ordering",
    timeComplexity: {
      average: "O(L) insert / lookup",
      worst: "O(L) where L is string length",
    },
    spaceComplexity: "O(Σ × L × N)",
    whyItExists:
      "Array scans for prefix matching require O(N × L). A Prefix Trie enables instant O(L) prefix autocomplete regardless of how many total documents or commands exist.",
    portfolioUsage:
      "Powers the global Command Palette (Cmd+K) instant prefix autocomplete for routes, projects, algorithms, and technical skills.",
    sourceFile: "lib/algorithms/text-search.ts",
    exampleExplanation:
      "Nodes store character branches and pre-computed word sets, allowing immediate sub-millisecond retrieval of matching keys as the user types.",
    codeSnippet: `const trie = new PrefixTrie();
trie.insert("engineering");
trie.insert("experience");
const matches = trie.findByPrefix("eng", 5); // ["engineering"]`,
  },
  {
    id: "fuzzy-matching",
    name: "Fuzzy Matching & Candidate Pruning",
    category: "Search & Ordering",
    timeComplexity: {
      average: "O(N × L)",
      worst: "O(N × L)",
    },
    spaceComplexity: "O(1) auxiliary",
    whyItExists:
      "Users make typographical errors, transposed letters, and partial queries. Fuzzy matching scores character subsequences with bonus weighting for word boundaries and acronyms.",
    portfolioUsage:
      "Used in the search bar and project filter dropdown to forgive typos (e.g., 'postgre' -> 'PostgreSQL', 'infinty' -> 'InfinityAI').",
    sourceFile: "lib/algorithms/text-search.ts",
    exampleExplanation:
      "Scans target text sequentially to find query characters, assigning higher scores for consecutive matches and uppercase initial matches.",
    codeSnippet: `const matches = fuzzyFilter("dockr", ["Docker", "Documents", "Database"]);
// Returns ["Docker"] with high confidence score`,
  },
  {
    id: "levenshtein-distance",
    name: "Levenshtein Distance (Edit Distance)",
    category: "Information Retrieval & NLP",
    timeComplexity: {
      average: "O(M × N)",
      worst: "O(M × N)",
    },
    spaceComplexity: "O(min(M, N)) with space optimization",
    whyItExists:
      "Quantifies the minimum single-character edits (insertions, deletions, substitutions) required to transform one string into another, enabling strict spell checking.",
    portfolioUsage:
      "Used as the fallback ranker when prefix and substring search fail, suggesting 'Did you mean?' corrections in technical queries.",
    sourceFile: "lib/algorithms/text-search.ts",
    exampleExplanation:
      "Dynamic programming 2-row rolling buffer tracks cumulative edit costs to determine exact typographical edit distance.",
    codeSnippet: `const distance = levenshteinDistance("kubernets", "kubernetes");
// distance === 1 -> triggers high-confidence typo resolution`,
  },
  {
    id: "binary-search",
    name: "Binary Search & Bound Operations",
    category: "Search & Ordering",
    timeComplexity: {
      average: "O(log n)",
      worst: "O(log n)",
    },
    spaceComplexity: "O(1)",
    whyItExists:
      "Linear searches scale as O(n). When data is sorted, binary halving achieves logarithmic lookup, lower-bound partition points, and range window bounds.",
    portfolioUsage:
      "Used in date-range blog filtering, DSA problem difficulty boundaries, and timestamp-based analytics event range slicing.",
    sourceFile: "lib/algorithms/binary-search.ts",
    exampleExplanation:
      "Maintains low and high pointers, evaluating mid-point comparators to bisect the search space in each iteration with integer-overflow-safe arithmetic.",
    codeSnippet: `const dates = [1704067200, 1706745600, 1709251200];
const startIndex = lowerBound(dates, targetTimestamp);
// O(log n) boundary identification without full array scans`,
  },
  {
    id: "priority-queue",
    name: "Priority Queue (Binary Min/Max Heap)",
    category: "Search & Ordering",
    timeComplexity: {
      average: "O(log n) push/pop, O(1) peek",
      worst: "O(log n)",
    },
    spaceComplexity: "O(n)",
    whyItExists:
      "Sorting an entire collection to retrieve the top-K elements takes O(n log n). A bounded Priority Queue retrieves top-K results in O(n log k) with minimal memory.",
    portfolioUsage:
      "Used inside the BM25 and vector ranking pipelines to extract the Top-K relevant documents without sorting the entire knowledge base.",
    sourceFile: "lib/algorithms/priority-queue.ts",
    exampleExplanation:
      "Array-backed complete binary tree satisfying the heap invariant: parent node priority is always higher than or equal to its children.",
    codeSnippet: `const pq = new PriorityQueue<RankedResult>((a, b) => b.score - a.score);
for (const doc of scoredDocs) pq.push(doc);
const top5 = pq.popN(5); // Top 5 results in O(N log 5)`,
  },
  {
    id: "graph-relevance",
    name: "Graph Relevance & Topological Traversal",
    category: "Graph & Similarity",
    timeComplexity: {
      average: "O(V + E)",
      worst: "O(V + E)",
    },
    spaceComplexity: "O(V + E)",
    whyItExists:
      "Skills, technologies, and project architectures have dependency relationships. Graphs model bidirectional links, prerequisite chains, and clustered relevance.",
    portfolioUsage:
      "Powers the interactive architecture dependency graph and related project clustering based on shared technological dependencies.",
    sourceFile: "lib/algorithms/graph-utils.ts",
    exampleExplanation:
      "Adjacency list representation supporting Breadth-First Search (BFS) for shortest path relevance and Kahn's algorithm for dependency order.",
    codeSnippet: `const graph = new DependencyGraph();
graph.addEdge("Next.js", "React");
graph.addEdge("React", "TypeScript");
const order = graph.topologicalSort(); // Valid build dependency order`,
  },
  {
    id: "vector-similarity",
    name: "Cosine Vector Similarity",
    category: "Graph & Similarity",
    timeComplexity: {
      average: "O(D) where D is vector dimensionality",
      worst: "O(D)",
    },
    spaceComplexity: "O(1) auxiliary",
    whyItExists:
      "Calculates the cosine of the angle between two multi-dimensional vectors, measuring semantic alignment regardless of vector magnitude.",
    portfolioUsage:
      "Used in semantic AI context matching and related project ranking (lib/algorithms/vector-similarity.ts) to identify semantically proximate case studies.",
    sourceFile: "lib/algorithms/vector-similarity.ts",
    exampleExplanation:
      "Computes dot product divided by product of Euclidean norms: (A · B) / (||A|| × ||B||). Yields 1.0 for parallel vectors, 0.0 for orthogonal.",
    codeSnippet: `const similarity = cosineSimilarityFromText(userPrompt, projectContext);
// Normalized score between 0.0 and 1.0 for semantic relevance`,
  },
  {
    id: "jaccard-similarity",
    name: "Jaccard Set Similarity",
    category: "Graph & Similarity",
    timeComplexity: {
      average: "O(min(|A|, |B|))",
      worst: "O(|A| + |B|)",
    },
    spaceComplexity: "O(|A| + |B|)",
    whyItExists:
      "Measures overlap between discrete finite sets via intersection over union (|A ∩ B| / |A ∪ B|), ideal for tag sets, tech stack overlaps, and category matching.",
    portfolioUsage:
      "Used in related projects calculation and skill tag recommendation to group case studies sharing overlapping technologies.",
    sourceFile: "lib/algorithms/jaccard-similarity.ts",
    exampleExplanation:
      "Hashes both collections into sets, iterates through the smaller set to count intersections, and divides by total unique elements.",
    codeSnippet: `const overlap = jaccardSimilarityFromArrays(
  ["Next.js", "TypeScript", "PostgreSQL"],
  ["Next.js", "TypeScript", "Prisma", "Docker"]
); // Returns 0.4 (2 shared out of 5 unique)`,
  },
];
