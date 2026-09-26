/**
 * Jaccard Similarity Utilities
 * Calculates set intersection over union for text, tags, and category matching.
 */

function tokenize(text: string): Set<string> {
  const tokens = text.toLowerCase().match(/[a-z0-9]+/g) ?? [];
  return new Set(tokens.filter(Boolean));
}

/**
 * Calculates Jaccard similarity between two sets: |A ∩ B| / |A ∪ B|
 * Returns a value between 0.0 (no overlap) and 1.0 (identical sets).
 */
export function jaccardSimilarity<T>(setA: ReadonlySet<T>, setB: ReadonlySet<T>): number {
  if (setA.size === 0 && setB.size === 0) {
    return 1.0;
  }
  if (setA.size === 0 || setB.size === 0) {
    return 0.0;
  }

  let intersectionCount = 0;
  // Iterate through smaller set for O(min(|A|, |B|)) efficiency
  const [smaller, larger] = setA.size <= setB.size ? [setA, setB] : [setB, setA];

  for (const item of smaller) {
    if (larger.has(item)) {
      intersectionCount += 1;
    }
  }

  const unionCount = setA.size + setB.size - intersectionCount;
  return unionCount === 0 ? 0 : intersectionCount / unionCount;
}

/**
 * Convenience function to compute Jaccard similarity from two text strings.
 */
export function jaccardSimilarityFromText(textA: string, textB: string): number {
  const setA = tokenize(textA);
  const setB = tokenize(textB);
  return jaccardSimilarity(setA, setB);
}

/**
 * Convenience function to compute Jaccard similarity from two string arrays (e.g., tags, technologies).
 */
export function jaccardSimilarityFromArrays(arrA: readonly string[], arrB: readonly string[]): number {
  const setA = new Set(arrA.map((s) => s.toLowerCase().trim()));
  const setB = new Set(arrB.map((s) => s.toLowerCase().trim()));
  return jaccardSimilarity(setA, setB);
}
