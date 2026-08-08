type ListNode<K, V> = {
  key: K;
  value: V;
  previous?: ListNode<K, V>;
  next?: ListNode<K, V>;
};

export class LruCache<K, V> {
  private readonly store = new Map<K, ListNode<K, V>>();
  private head?: ListNode<K, V>;
  private tail?: ListNode<K, V>;

  constructor(private readonly capacity: number) {}

  get(key: K) {
    const node = this.store.get(key);

    if (!node) {
      return undefined;
    }

    this.moveToFront(node);
    return node.value;
  }

  set(key: K, value: V) {
    const existing = this.store.get(key);

    if (existing) {
      existing.value = value;
      this.moveToFront(existing);
      return;
    }

    const node: ListNode<K, V> = { key, value };
    this.store.set(key, node);
    this.insertAtFront(node);

    if (this.store.size > this.capacity) {
      this.evictLeastRecentlyUsed();
    }
  }

  private insertAtFront(node: ListNode<K, V>) {
    node.previous = undefined;
    node.next = this.head;

    if (this.head) {
      this.head.previous = node;
    }

    this.head = node;

    if (!this.tail) {
      this.tail = node;
    }
  }

  private moveToFront(node: ListNode<K, V>) {
    if (this.head === node) {
      return;
    }

    this.detach(node);
    this.insertAtFront(node);
  }

  private detach(node: ListNode<K, V>) {
    if (node.previous) {
      node.previous.next = node.next;
    }

    if (node.next) {
      node.next.previous = node.previous;
    }

    if (this.tail === node) {
      this.tail = node.previous;
    }

    if (this.head === node) {
      this.head = node.next;
    }

    node.previous = undefined;
    node.next = undefined;
  }

  private evictLeastRecentlyUsed() {
    if (!this.tail) {
      return;
    }

    const key = this.tail.key;
    this.detach(this.tail);
    this.store.delete(key);
  }
}
