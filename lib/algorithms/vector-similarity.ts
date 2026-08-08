function tokenize(text: string) {
  return (text.toLowerCase().match(/[a-z0-9]+/g) ?? []).filter(Boolean);
}

function frequency(tokens: string[]) {
  const counts = new Map<string, number>();

  for (const token of tokens) {
    counts.set(token, (counts.get(token) ?? 0) + 1);
  }

  return counts;
}

export function cosineSimilarityFromText(left: string, right: string) {
  const leftFrequency = frequency(tokenize(left));
  const rightFrequency = frequency(tokenize(right));
  const terms = new Set([...leftFrequency.keys(), ...rightFrequency.keys()]);

  let dotProduct = 0;
  let leftMagnitude = 0;
  let rightMagnitude = 0;

  for (const term of terms) {
    const leftWeight = leftFrequency.get(term) ?? 0;
    const rightWeight = rightFrequency.get(term) ?? 0;

    dotProduct += leftWeight * rightWeight;
    leftMagnitude += leftWeight * leftWeight;
    rightMagnitude += rightWeight * rightWeight;
  }

  if (!leftMagnitude || !rightMagnitude) {
    return 0;
  }

  return dotProduct / (Math.sqrt(leftMagnitude) * Math.sqrt(rightMagnitude));
}

export function rankByTextSimilarity<T>(
  query: string,
  items: T[],
  toText: (item: T) => string,
  limit: number,
) {
  return items
    .map((item) => ({
      item,
      score: cosineSimilarityFromText(query, toText(item)),
    }))
    .sort((left, right) => right.score - left.score)
    .slice(0, limit)
    .map(({ item }) => item);
}
