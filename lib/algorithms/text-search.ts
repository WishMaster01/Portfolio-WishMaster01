import { PriorityQueue } from "@/lib/algorithms/priority-queue";

type SearchDocument<T> = {
  id: string;
  title: string;
  body: string;
  keywords?: string[];
  payload: T;
};

type IndexedDocument<T> = SearchDocument<T> & {
  normalizedTitle: string;
  normalizedBody: string;
  tokens: string[];
  titleTokens: string[];
  keywordTokens: string[];
  termFrequency: Map<string, number>;
  tokenSet: Set<string>;
};

export type SearchIndex<T> = {
  documents: Array<IndexedDocument<T>>;
  averageDocumentLength: number;
  documentFrequency: Map<string, number>;
  invertedIndex: Map<string, number[]>;
  trie: PrefixTrie;
};

export type RankedSearchResult<T> = {
  item: T;
  score: number;
};

const TOKEN_PATTERN = /[a-z0-9]+/g;

class PrefixTrieNode {
  children = new Map<string, PrefixTrieNode>();
  words = new Set<string>();
}

class PrefixTrie {
  private readonly root = new PrefixTrieNode();

  insert(term: string) {
    let current = this.root;

    for (const char of term) {
      if (!current.children.has(char)) {
        current.children.set(char, new PrefixTrieNode());
      }

      current = current.children.get(char)!;
      current.words.add(term);
    }
  }

  findByPrefix(prefix: string, limit = 8) {
    let current = this.root;

    for (const char of prefix) {
      const next = current.children.get(char);

      if (!next) {
        return [];
      }

      current = next;
    }

    return Array.from(current.words).slice(0, limit);
  }
}

export function tokenize(value: string) {
  return (value.toLowerCase().match(TOKEN_PATTERN) ?? []).filter(Boolean);
}

export function levenshteinDistance(left: string, right: string) {
  if (left === right) {
    return 0;
  }

  if (!left.length) {
    return right.length;
  }

  if (!right.length) {
    return left.length;
  }

  const previous = Array.from({ length: right.length + 1 }, (_, index) => index);
  const current = new Array<number>(right.length + 1).fill(0);

  for (let row = 1; row <= left.length; row += 1) {
    current[0] = row;

    for (let column = 1; column <= right.length; column += 1) {
      const substitutionCost = left[row - 1] === right[column - 1] ? 0 : 1;

      current[column] = Math.min(
        current[column - 1] + 1,
        previous[column] + 1,
        previous[column - 1] + substitutionCost,
      );
    }

    for (let column = 0; column <= right.length; column += 1) {
      previous[column] = current[column];
    }
  }

  return previous[right.length];
}

function buildTermFrequency(tokens: string[]) {
  const frequency = new Map<string, number>();

  for (const token of tokens) {
    frequency.set(token, (frequency.get(token) ?? 0) + 1);
  }

  return frequency;
}

function computeIdf(documentFrequency: number, documentCount: number) {
  return Math.log(1 + (documentCount - documentFrequency + 0.5) / (documentFrequency + 0.5));
}

function computeBm25(
  termFrequency: number,
  documentLength: number,
  averageDocumentLength: number,
  idf: number,
) {
  const k1 = 1.2;
  const b = 0.75;

  if (!termFrequency) {
    return 0;
  }

  return (
    idf *
    ((termFrequency * (k1 + 1)) /
      (termFrequency + k1 * (1 - b + b * (documentLength / averageDocumentLength))))
  );
}

function minimumDistance(term: string, candidates: string[]) {
  let best = Number.POSITIVE_INFINITY;

  for (const candidate of candidates) {
    const distance = levenshteinDistance(term, candidate);

    if (distance < best) {
      best = distance;
    }

    if (best === 0) {
      break;
    }
  }

  return best;
}

export function buildSearchIndex<T>(documents: Array<SearchDocument<T>>): SearchIndex<T> {
  const trie = new PrefixTrie();
  const documentFrequency = new Map<string, number>();
  const invertedIndex = new Map<string, number[]>();

  const indexedDocuments = documents.map((document, documentIndex) => {
    const normalizedTitle = document.title.toLowerCase();
    const normalizedBody = document.body.toLowerCase();
    const titleTokens = tokenize(document.title);
    const bodyTokens = tokenize(document.body);
    const keywordTokens = (document.keywords ?? []).flatMap((keyword) => tokenize(keyword));
    const tokens = [...titleTokens, ...keywordTokens, ...bodyTokens];
    const termFrequency = buildTermFrequency(tokens);
    const tokenSet = new Set(tokens);

    for (const token of tokenSet) {
      trie.insert(token);
      documentFrequency.set(token, (documentFrequency.get(token) ?? 0) + 1);

      if (!invertedIndex.has(token)) {
        invertedIndex.set(token, []);
      }

      invertedIndex.get(token)!.push(documentIndex);
    }

    return {
      ...document,
      normalizedTitle,
      normalizedBody,
      titleTokens,
      keywordTokens,
      tokens,
      termFrequency,
      tokenSet,
    };
  });

  const averageDocumentLength =
    indexedDocuments.reduce((sum, document) => sum + document.tokens.length, 0) /
      Math.max(indexedDocuments.length, 1) || 1;

  return {
    documents: indexedDocuments,
    averageDocumentLength,
    documentFrequency,
    invertedIndex,
    trie,
  };
}

export function searchIndex<T>(
  index: SearchIndex<T>,
  query: string,
  limit = index.documents.length,
): Array<RankedSearchResult<T>> {
  const normalizedQuery = query.trim().toLowerCase();

  if (!normalizedQuery) {
    return index.documents.slice(0, limit).map((document) => ({
      item: document.payload,
      score: 0,
    }));
  }

  const queryTokens = tokenize(normalizedQuery);
  const candidateIndexes = new Set<number>();
  const prefixExpansions = new Map<string, string[]>();

  for (const token of queryTokens) {
    const expandedTerms = Array.from(
      new Set([token, ...index.trie.findByPrefix(token, 10)]),
    );

    prefixExpansions.set(token, expandedTerms);

    for (const expandedTerm of expandedTerms) {
      for (const documentIndex of index.invertedIndex.get(expandedTerm) ?? []) {
        candidateIndexes.add(documentIndex);
      }
    }
  }

  const documentIndexes =
    candidateIndexes.size > 0
      ? Array.from(candidateIndexes)
      : index.documents.map((_, documentIndex) => documentIndex);

  const queue = new PriorityQueue<{
    item: T;
    score: number;
    index: number;
  }>((left, right) => {
    if (left.score !== right.score) {
      return left.score - right.score;
    }

    return right.index - left.index;
  });

  for (const documentIndex of documentIndexes) {
    const document = index.documents[documentIndex];
    let score = 0;

    for (const queryToken of queryTokens) {
      const matchedTerms = prefixExpansions.get(queryToken) ?? [queryToken];

      for (const term of matchedTerms) {
        const termFrequency = document.termFrequency.get(term) ?? 0;

        if (!termFrequency) {
          continue;
        }

        const idf = computeIdf(
          index.documentFrequency.get(term) ?? 1,
          index.documents.length,
        );

        score +=
          computeBm25(
            termFrequency,
            document.tokens.length,
            index.averageDocumentLength,
            idf,
          ) * (term === queryToken ? 1 : 0.55);
      }

      if (document.titleTokens.some((token) => token.startsWith(queryToken))) {
        score += 2.8;
      } else if (
        document.keywordTokens.some((token) => token.startsWith(queryToken))
      ) {
        score += 1.4;
      }

      const distance = minimumDistance(queryToken, document.titleTokens);

      if (distance === 1) {
        score += 0.85;
      } else if (distance === 2) {
        score += 0.35;
      }
    }

    if (document.normalizedTitle.includes(normalizedQuery)) {
      score += 4.5;
    }

    if (document.normalizedBody.includes(normalizedQuery)) {
      score += 1.75;
    }

    if (
      queryTokens.every(
        (token) =>
          document.tokenSet.has(token) ||
          document.titleTokens.some((titleToken) => titleToken.startsWith(token)),
      )
    ) {
      score += 2.2;
    }

    if (!score) {
      continue;
    }

    queue.push({
      item: document.payload,
      score,
      index: documentIndex,
    });

    if (queue.size > limit) {
      queue.pop();
    }
  }

  return queue
    .toArray()
    .sort((left, right) => right.score - left.score || left.index - right.index)
    .map(({ item, score }) => ({ item, score }));
}
