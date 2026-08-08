type CacheNode<K, V> = {
  key: K;
  value: V;
  frequency: number;
  prev?: CacheNode<K, V>;
  next?: CacheNode<K, V>;
};

class FrequencyList<K, V> {
  private readonly head: CacheNode<K, V>;
  private readonly tail: CacheNode<K, V>;
  size = 0;

  constructor() {
    this.head = { key: null as K, value: null as V, frequency: 0 };
    this.tail = { key: null as K, value: null as V, frequency: 0 };
    this.head.next = this.tail;
    this.tail.prev = this.head;
  }

  append(node: CacheNode<K, V>) {
    node.prev = this.tail.prev;
    node.next = this.tail;
    this.tail.prev!.next = node;
    this.tail.prev = node;
    this.size += 1;
  }

  remove(node: CacheNode<K, V>) {
    if (!node.prev || !node.next) {
      return;
    }

    node.prev.next = node.next;
    node.next.prev = node.prev;
    node.prev = undefined;
    node.next = undefined;
    this.size -= 1;
  }

  removeLeastRecent() {
    const node = this.head.next;

    if (!node || node === this.tail) {
      return undefined;
    }

    this.remove(node);
    return node;
  }
}

export class LfuCache<K, V> {
  private readonly nodes = new Map<K, CacheNode<K, V>>();
  private readonly frequencies = new Map<number, FrequencyList<K, V>>();
  private minimumFrequency = 0;

  constructor(private readonly capacity: number) {}

  get(key: K) {
    const node = this.nodes.get(key);

    if (!node) {
      return undefined;
    }

    this.touch(node);
    return node.value;
  }

  set(key: K, value: V) {
    if (this.capacity <= 0) {
      return;
    }

    const existing = this.nodes.get(key);

    if (existing) {
      existing.value = value;
      this.touch(existing);
      return;
    }

    if (this.nodes.size >= this.capacity) {
      const list = this.frequencies.get(this.minimumFrequency);
      const victim = list?.removeLeastRecent();

      if (victim) {
        this.nodes.delete(victim.key);
      }
    }

    const node: CacheNode<K, V> = {
      key,
      value,
      frequency: 1,
    };

    this.getFrequencyList(1).append(node);
    this.nodes.set(key, node);
    this.minimumFrequency = 1;
  }

  private touch(node: CacheNode<K, V>) {
    const currentFrequency = node.frequency;
    const currentList = this.frequencies.get(currentFrequency);

    currentList?.remove(node);

    if (currentList?.size === 0 && this.minimumFrequency === currentFrequency) {
      this.minimumFrequency += 1;
    }

    node.frequency += 1;
    this.getFrequencyList(node.frequency).append(node);
  }

  private getFrequencyList(frequency: number) {
    const existing = this.frequencies.get(frequency);

    if (existing) {
      return existing;
    }

    const created = new FrequencyList<K, V>();
    this.frequencies.set(frequency, created);
    return created;
  }
}
