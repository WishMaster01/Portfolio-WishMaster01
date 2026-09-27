export type FixedWindowOptions = {
  algorithm?: "fixed-window";
  limit: number;
  windowMs: number;
};

export type SlidingWindowOptions = {
  algorithm: "sliding-window";
  limit: number;
  windowMs: number;
};

export type TokenBucketOptions = {
  algorithm: "token-bucket";
  capacity: number;
  refillTokens: number;
  refillIntervalMs: number;
};

export type RateLimitOptions =
  | FixedWindowOptions
  | SlidingWindowOptions
  | TokenBucketOptions;

type FixedWindowState = {
  kind: "fixed-window";
  count: number;
  resetAt: number;
};

type SlidingWindowState = {
  kind: "sliding-window";
  timestamps: number[];
};

type TokenBucketState = {
  kind: "token-bucket";
  tokens: number;
  lastRefillAt: number;
};

type RateLimitState = FixedWindowState | SlidingWindowState | TokenBucketState;

export type RateLimitResult = {
  allowed: boolean;
  remaining: number;
  resetAt: number;
};

export const RATE_LIMIT_PRESETS = {
  chat: {
    algorithm: "sliding-window" as const,
    limit: 12,
    windowMs: 60 * 1000, // 12 requests / min
  },
  contact: {
    algorithm: "token-bucket" as const,
    capacity: 5,
    refillTokens: 1,
    refillIntervalMs: 3 * 60 * 1000, // 1 token per 3 min, max burst 5
  },
  newsletter: {
    algorithm: "sliding-window" as const,
    limit: 8,
    windowMs: 15 * 60 * 1000, // 8 requests / 15 min
  },
  dsa: {
    algorithm: "sliding-window" as const,
    limit: 6,
    windowMs: 60 * 1000, // 6 code executions / min
  },
  auth: {
    algorithm: "sliding-window" as const,
    limit: 5,
    windowMs: 15 * 60 * 1000, // 5 login attempts / 15 min
  },
  admin: {
    algorithm: "sliding-window" as const,
    limit: 60,
    windowMs: 60 * 1000, // 60 requests / min
  },
  recruiterAnalytics: {
    algorithm: "sliding-window" as const,
    limit: 30,
    windowMs: 60 * 1000,
  },
  publicApi: {
    algorithm: "sliding-window" as const,
    limit: 100,
    windowMs: 60 * 1000,
  },
} as const;

export function getClientIp(request: Request): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() ?? "unknown";
  }

  return (
    request.headers.get("x-real-ip") ??
    request.headers.get("cf-connecting-ip") ??
    "unknown"
  );
}

const buckets = new Map<string, RateLimitState>();

function checkFixedWindow(
  key: string,
  options: FixedWindowOptions,
): RateLimitResult {
  const now = Date.now();
  const existing = buckets.get(key);

  if (!existing || existing.kind !== "fixed-window" || existing.resetAt <= now) {
    buckets.set(key, {
      kind: "fixed-window",
      count: 1,
      resetAt: now + options.windowMs,
    });

    return {
      allowed: true,
      remaining: options.limit - 1,
      resetAt: now + options.windowMs,
    };
  }

  if (existing.count >= options.limit) {
    return {
      allowed: false,
      remaining: 0,
      resetAt: existing.resetAt,
    };
  }

  existing.count += 1;

  return {
    allowed: true,
    remaining: Math.max(0, options.limit - existing.count),
    resetAt: existing.resetAt,
  };
}

function checkSlidingWindow(
  key: string,
  options: SlidingWindowOptions,
): RateLimitResult {
  const now = Date.now();
  const existing = buckets.get(key);
  const timestamps =
    existing?.kind === "sliding-window"
      ? existing.timestamps.filter((timestamp) => now - timestamp < options.windowMs)
      : [];

  if (timestamps.length >= options.limit) {
    const oldestTimestamp = timestamps[0] ?? now;

    buckets.set(key, {
      kind: "sliding-window",
      timestamps,
    });

    return {
      allowed: false,
      remaining: 0,
      resetAt: oldestTimestamp + options.windowMs,
    };
  }

  timestamps.push(now);
  buckets.set(key, {
    kind: "sliding-window",
    timestamps,
  });

  return {
    allowed: true,
    remaining: Math.max(0, options.limit - timestamps.length),
    resetAt: (timestamps[0] ?? now) + options.windowMs,
  };
}

function checkTokenBucket(
  key: string,
  options: TokenBucketOptions,
): RateLimitResult {
  const now = Date.now();
  const existing = buckets.get(key);
  const state: TokenBucketState =
    existing?.kind === "token-bucket"
      ? existing
      : {
          kind: "token-bucket",
          tokens: options.capacity,
          lastRefillAt: now,
        };

  const elapsed = now - state.lastRefillAt;
  const refillSteps = Math.floor(elapsed / options.refillIntervalMs);

  if (refillSteps > 0) {
    state.tokens = Math.min(
      options.capacity,
      state.tokens + refillSteps * options.refillTokens,
    );
    state.lastRefillAt += refillSteps * options.refillIntervalMs;
  }

  if (state.tokens < 1) {
    buckets.set(key, state);

    return {
      allowed: false,
      remaining: 0,
      resetAt: state.lastRefillAt + options.refillIntervalMs,
    };
  }

  state.tokens -= 1;
  buckets.set(key, state);

  return {
    allowed: true,
    remaining: Math.floor(state.tokens),
    resetAt:
      state.tokens >= 1
        ? now
        : state.lastRefillAt + options.refillIntervalMs,
  };
}

/**
 * Perform rate-limit check against in-memory bucket store.
 */
export function checkRateLimit(
  key: string,
  options: RateLimitOptions,
): RateLimitResult {
  if (options.algorithm === "sliding-window") {
    return checkSlidingWindow(key, options);
  }

  if (options.algorithm === "token-bucket") {
    return checkTokenBucket(key, options);
  }

  return checkFixedWindow(key, options);
}

/**
 * Async rate limiter with Upstash / Redis distributed cluster support.
 * Falls back to high-performance local memory when Redis is not configured.
 */
export async function checkRateLimitAsync(
  key: string,
  options: RateLimitOptions,
): Promise<RateLimitResult> {
  const upstashUrl = process.env.UPSTASH_REDIS_REST_URL;
  const upstashToken = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (upstashUrl && upstashToken && options.algorithm !== "token-bucket") {
    try {
      const windowSec = Math.ceil(options.windowMs / 1000);
      const redisKey = `ratelimit:${key}`;

      const res = await fetch(`${upstashUrl}/pipeline`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${upstashToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify([
          ["INCR", redisKey],
          ["EXPIRE", redisKey, windowSec, "NX"],
          ["TTL", redisKey],
        ]),
        cache: "no-store",
      });

      if (res.ok) {
        const data = (await res.json()) as Array<{ result: number }>;
        const count = data[0]?.result ?? 1;
        const ttl = data[2]?.result ?? windowSec;
        const resetAt = Date.now() + Math.max(1, ttl) * 1000;

        if (count > options.limit) {
          return {
            allowed: false,
            remaining: 0,
            resetAt,
          };
        }

        return {
          allowed: true,
          remaining: Math.max(0, options.limit - count),
          resetAt,
        };
      }
    } catch {
      // Fallback to in-memory on network failure
    }
  }

  return checkRateLimit(key, options);
}
