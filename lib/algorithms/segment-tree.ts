export class SegmentTree {
  private readonly size: number;
  private readonly tree: number[];

  constructor(values: number[]) {
    let size = 1;

    while (size < values.length) {
      size *= 2;
    }

    this.size = size;
    this.tree = new Array(size * 2).fill(0);

    values.forEach((value, index) => {
      this.tree[this.size + index] = value;
    });

    for (let index = this.size - 1; index > 0; index -= 1) {
      this.tree[index] = Math.max(this.tree[index * 2], this.tree[index * 2 + 1]);
    }
  }

  maxQuery(left: number, right: number) {
    let start = left + this.size;
    let end = right + this.size;
    let result = Number.NEGATIVE_INFINITY;

    while (start <= end) {
      if (start % 2 === 1) {
        result = Math.max(result, this.tree[start]);
        start += 1;
      }

      if (end % 2 === 0) {
        result = Math.max(result, this.tree[end]);
        end -= 1;
      }

      start = Math.floor(start / 2);
      end = Math.floor(end / 2);
    }

    return Number.isFinite(result) ? result : 0;
  }
}
