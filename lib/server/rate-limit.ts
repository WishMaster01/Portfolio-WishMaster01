type FixedWindowOptions = {
  algorithm?: "fixed-window";
  limit: number;
  windowMs: number;
};

type SlidingWindowOptions = {
  algorithm: "sliding-window";
  limit: number;
  windowMs: number;
};

type TokenBucketOptions = {
  algorithm: "token-bucket";
  capacity: number;
  refillTokens: number;
  refillIntervalMs: number;
};

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

type RateLimitResult = {
  allowed: boolean;
  remaining: number;
  resetAt: number;
};

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

export function checkRateLimit(
  key: string,
  options: FixedWindowOptions | SlidingWindowOptions | TokenBucketOptions,
) {
  if (options.algorithm === "sliding-window") {
    return checkSlidingWindow(key, options);
  }

  if (options.algorithm === "token-bucket") {
    return checkTokenBucket(key, options);
  }

  return checkFixedWindow(key, options);
}
