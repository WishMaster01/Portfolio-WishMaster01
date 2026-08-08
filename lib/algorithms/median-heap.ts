import { PriorityQueue } from "@/lib/algorithms/priority-queue";

export class MedianHeap {
  private readonly lower = new PriorityQueue<number>(
    (left, right) => right - left,
  );
  private readonly upper = new PriorityQueue<number>(
    (left, right) => left - right,
  );
  private sum = 0;
  private count = 0;

  add(value: number) {
    if (this.lower.size === 0 || value <= (this.lower.peek() ?? value)) {
      this.lower.push(value);
    } else {
      this.upper.push(value);
    }

    this.rebalance();
    this.sum += value;
    this.count += 1;
  }

  median() {
    if (this.count === 0) {
      return 0;
    }

    if (this.lower.size === this.upper.size) {
      return ((this.lower.peek() ?? 0) + (this.upper.peek() ?? 0)) / 2;
    }

    return this.lower.peek() ?? 0;
  }

  average() {
    return this.count === 0 ? 0 : this.sum / this.count;
  }

  private rebalance() {
    if (this.lower.size > this.upper.size + 1) {
      const moved = this.lower.pop();

      if (typeof moved === "number") {
        this.upper.push(moved);
      }
    } else if (this.upper.size > this.lower.size) {
      const moved = this.upper.pop();

      if (typeof moved === "number") {
        this.lower.push(moved);
      }
    }
  }
}
