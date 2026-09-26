/**
 * Production Binary Search Utilities
 * Demonstrates O(log n) search, lower bound, and upper bound operations.
 */

/**
 * Standard binary search over a sorted array.
 * Returns the index of the target element, or -1 if not found.
 */
export function binarySearch<T>(
  sortedList: readonly T[],
  target: T,
  comparator: (a: T, b: T) => number = defaultComparator,
): number {
  let low = 0;
  let high = sortedList.length - 1;

  while (low <= high) {
    // Avoid potential integer overflow
    const mid = low + Math.floor((high - low) / 2);
    const comparison = comparator(sortedList[mid], target);

    if (comparison === 0) {
      return mid;
    }
    if (comparison < 0) {
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }

  return -1;
}

/**
 * Finds the first index where element >= target (lower bound).
 * If all elements are smaller, returns sortedList.length.
 */
export function lowerBound<T>(
  sortedList: readonly T[],
  target: T,
  comparator: (a: T, b: T) => number = defaultComparator,
): number {
  let low = 0;
  let high = sortedList.length;

  while (low < high) {
    const mid = low + Math.floor((high - low) / 2);
    if (comparator(sortedList[mid], target) < 0) {
      low = mid + 1;
    } else {
      high = mid;
    }
  }

  return low;
}

/**
 * Finds the first index where element > target (upper bound).
 * If no element is greater, returns sortedList.length.
 */
export function upperBound<T>(
  sortedList: readonly T[],
  target: T,
  comparator: (a: T, b: T) => number = defaultComparator,
): number {
  let low = 0;
  let high = sortedList.length;

  while (low < high) {
    const mid = low + Math.floor((high - low) / 2);
    if (comparator(sortedList[mid], target) <= 0) {
      low = mid + 1;
    } else {
      high = mid;
    }
  }

  return low;
}

function defaultComparator<T>(a: T, b: T): number {
  if (a < b) return -1;
  if (a > b) return 1;
  return 0;
}
