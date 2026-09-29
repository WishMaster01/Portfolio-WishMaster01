/**
 * Unified Cache & Redis Client
 * Connects to Redis via Upstash REST or standard HTTP if configured,
 * with automatic fallback to high-efficiency in-memory TTL caching.
 */

export interface CacheClient {
  get<T>(key: string): Promise<T | null>;
  set<T>(key: string, value: T, ttlSeconds?: number): Promise<void>;
  del(key: string): Promise<void>;
  has(key: string): Promise<boolean>;
  incr(key: string, ttlSeconds?: number): Promise<number>;
}

type MemoryCacheEntry = {
  value: unknown;
  expiresAt?: number;
};

class InMemoryCacheClient implements CacheClient {
  private readonly store = new Map<string, MemoryCacheEntry>();

  async get<T>(key: string): Promise<T | null> {
    const entry = this.store.get(key);
    if (!entry) return null;

    if (entry.expiresAt && Date.now() > entry.expiresAt) {
      this.store.delete(key);
      return null;
    }

    return entry.value as T;
  }

  async set<T>(key: string, value: T, ttlSeconds?: number): Promise<void> {
    const expiresAt = ttlSeconds ? Date.now() + ttlSeconds * 1000 : undefined;
    this.store.set(key, { value, expiresAt });

    // Clean up stale entries if cache grows past 1,000 items
    if (this.store.size > 1000) {
      const now = Date.now();
      for (const [k, v] of this.store.entries()) {
        if (v.expiresAt && now > v.expiresAt) {
          this.store.delete(k);
        }
      }
    }
  }

  async del(key: string): Promise<void> {
    this.store.delete(key);
  }

  async has(key: string): Promise<boolean> {
    const item = await this.get(key);
    return item !== null;
  }

  async incr(key: string, ttlSeconds?: number): Promise<number> {
    const current = (await this.get<number>(key)) ?? 0;
    const next = current + 1;
    await this.set(key, next, ttlSeconds);
    return next;
  }
}

class UpstashRedisClient implements CacheClient {
  constructor(
    private readonly url: string,
    private readonly token: string,
  ) {}

  private async execute<T>(command: string, ...args: (string | number)[]): Promise<T | null> {
    try {
      const endpoint = `${this.url}/${[command, ...args.map(encodeURIComponent)].join("/")}`;
      const res = await fetch(endpoint, {
        headers: { Authorization: `Bearer ${this.token}` },
        cache: "no-store",
      });

      if (!res.ok) return null;
      const data = await res.json();
      return data.result as T;
    } catch {
      return null;
    }
  }

  async get<T>(key: string): Promise<T | null> {
    const raw = await this.execute<string>("GET", key);
    if (!raw) return null;
    try {
      return JSON.parse(raw) as T;
    } catch {
      return raw as unknown as T;
    }
  }

  async set<T>(key: string, value: T, ttlSeconds?: number): Promise<void> {
    const str = typeof value === "string" ? value : JSON.stringify(value);
    if (ttlSeconds) {
      await this.execute("SETEX", key, ttlSeconds, str);
    } else {
      await this.execute("SET", key, str);
    }
  }

  async del(key: string): Promise<void> {
    await this.execute("DEL", key);
  }

  async has(key: string): Promise<boolean> {
    const res = await this.execute<number>("EXISTS", key);
    return res === 1;
  }

  async incr(key: string, ttlSeconds?: number): Promise<number> {
    const count = await this.execute<number>("INCR", key);
    if (count === 1 && ttlSeconds) {
      await this.execute("EXPIRE", key, ttlSeconds);
    }
    return count ?? 1;
  }
}

function createCacheClient(): CacheClient {
  const upstashUrl = process.env.UPSTASH_REDIS_REST_URL;
  const upstashToken = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (upstashUrl && upstashToken) {
    return new UpstashRedisClient(upstashUrl, upstashToken);
  }

  return new InMemoryCacheClient();
}

export const cacheClient = createCacheClient();
