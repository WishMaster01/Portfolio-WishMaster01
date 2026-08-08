export type CursorPage<T> = {
  items: T[];
  nextCursor: string | null;
  hasMore: boolean;
};

export function encodeCursor(value: string) {
  return Buffer.from(value, "utf8").toString("base64url");
}

export function decodeCursor(value: string | undefined) {
  if (!value) {
    return null;
  }

  try {
    return Buffer.from(value, "base64url").toString("utf8");
  } catch {
    return null;
  }
}

export function binarySearchByKey<T>(
  items: T[],
  target: string,
  keySelector: (item: T) => string,
) {
  let left = 0;
  let right = items.length - 1;

  while (left <= right) {
    const middle = Math.floor((left + right) / 2);
    const value = keySelector(items[middle]);

    if (value === target) {
      return middle;
    }

    if (value < target) {
      left = middle + 1;
    } else {
      right = middle - 1;
    }
  }

  return left - 1;
}
