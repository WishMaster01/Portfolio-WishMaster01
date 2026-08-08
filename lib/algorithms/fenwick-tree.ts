export class FenwickTree {
  private readonly tree: number[];

  constructor(size: number) {
    this.tree = new Array(size + 1).fill(0);
  }

  update(index: number, delta: number) {
    let current = index + 1;

    while (current < this.tree.length) {
      this.tree[current] += delta;
      current += current & -current;
    }
  }

  query(index: number) {
    let current = index + 1;
    let sum = 0;

    while (current > 0) {
      sum += this.tree[current];
      current -= current & -current;
    }

    return sum;
  }

  rangeQuery(left: number, right: number) {
    if (right < left) {
      return 0;
    }

    return this.query(right) - (left > 0 ? this.query(left - 1) : 0);
  }
}
