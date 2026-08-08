export class BloomFilter {
  private readonly bits: Uint8Array;

  constructor(private readonly size = 2048, private readonly hashCount = 3) {
    this.bits = new Uint8Array(size);
  }

  add(value: string) {
    for (const index of this.indexesFor(value)) {
      this.bits[index] = 1;
    }
  }

  mightContain(value: string) {
    return this.indexesFor(value).every((index) => this.bits[index] === 1);
  }

  private indexesFor(value: string) {
    const normalized = value.toLowerCase();

    return Array.from({ length: this.hashCount }, (_, salt) =>
      this.hash(normalized, salt) % this.size,
    );
  }

  private hash(value: string, salt: number) {
    let hash = 2166136261 ^ salt;

    for (let index = 0; index < value.length; index += 1) {
      hash ^= value.charCodeAt(index);
      hash = Math.imul(hash, 16777619);
    }

    return Math.abs(hash >>> 0);
  }
}
