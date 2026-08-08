export function longestCommonSubsequence<T>(left: T[], right: T[]) {
  const rows = left.length + 1;
  const columns = right.length + 1;
  const table = Array.from({ length: rows }, () =>
    new Array<number>(columns).fill(0),
  );

  for (let row = 1; row < rows; row += 1) {
    for (let column = 1; column < columns; column += 1) {
      if (left[row - 1] === right[column - 1]) {
        table[row][column] = table[row - 1][column - 1] + 1;
      } else {
        table[row][column] = Math.max(
          table[row - 1][column],
          table[row][column - 1],
        );
      }
    }
  }

  const sequence: T[] = [];
  let row = left.length;
  let column = right.length;

  while (row > 0 && column > 0) {
    if (left[row - 1] === right[column - 1]) {
      sequence.unshift(left[row - 1]);
      row -= 1;
      column -= 1;
      continue;
    }

    if (table[row - 1][column] >= table[row][column - 1]) {
      row -= 1;
    } else {
      column -= 1;
    }
  }

  return {
    length: table[left.length][right.length],
    sequence,
  };
}
