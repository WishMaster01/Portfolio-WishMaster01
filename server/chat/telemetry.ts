export type ChatTelemetryEvent = {
  provider: string;
  cached: boolean;
  success: boolean;
  fallbackFrom?: string;
  promptTokens?: number;
  completionTokens?: number;
  latencyMs: number;
  blocked?: boolean;
};

class ChatTelemetryCollector {
  private totalRequests = 0;
  private cacheHits = 0;
  private successfulRequests = 0;
  private failedRequests = 0;
  private fallbackCount = 0;
  private securityBlocks = 0;
  private totalPromptTokens = 0;
  private totalCompletionTokens = 0;
  private latencies: number[] = [];
  private providerCounts: Record<string, number> = {};

  public record(event: ChatTelemetryEvent): void {
    this.totalRequests++;

    if (event.cached) {
      this.cacheHits++;
    }

    if (event.blocked) {
      this.securityBlocks++;
    }

    if (event.success) {
      this.successfulRequests++;
    } else {
      this.failedRequests++;
    }

    if (event.fallbackFrom) {
      this.fallbackCount++;
    }

    if (event.promptTokens) {
      this.totalPromptTokens += event.promptTokens;
    }
    if (event.completionTokens) {
      this.totalCompletionTokens += event.completionTokens;
    }

    this.latencies.push(event.latencyMs);
    if (this.latencies.length > 200) {
      this.latencies.shift();
    }

    const providerKey = event.provider || "unknown";
    this.providerCounts[providerKey] = (this.providerCounts[providerKey] ?? 0) + 1;
  }

  public getSummary() {
    const sortedLatencies = [...this.latencies].sort((a, b) => a - b);
    const avgLatency =
      sortedLatencies.length > 0
        ? Math.round(sortedLatencies.reduce((a, b) => a + b, 0) / sortedLatencies.length)
        : 0;

    const p95Index = Math.floor(sortedLatencies.length * 0.95);
    const p95Latency = sortedLatencies.length > 0 ? sortedLatencies[p95Index] : 0;

    const cacheHitRate =
      this.totalRequests > 0
        ? Number(((this.cacheHits / this.totalRequests) * 100).toFixed(1))
        : 0;

    const fallbackRate =
      this.totalRequests > 0
        ? Number(((this.fallbackCount / this.totalRequests) * 100).toFixed(1))
        : 0;

    return {
      totalRequests: this.totalRequests,
      cacheHits: this.cacheHits,
      cacheHitRatePercent: cacheHitRate,
      successfulRequests: this.successfulRequests,
      failedRequests: this.failedRequests,
      fallbackCount: this.fallbackCount,
      fallbackRatePercent: fallbackRate,
      securityBlocks: this.securityBlocks,
      tokenUsage: {
        promptTokens: this.totalPromptTokens,
        completionTokens: this.totalCompletionTokens,
        totalTokens: this.totalPromptTokens + this.totalCompletionTokens,
      },
      latency: {
        averageMs: avgLatency,
        p95Ms: p95Latency,
      },
      providers: this.providerCounts,
    };
  }

  public reset(): void {
    this.totalRequests = 0;
    this.cacheHits = 0;
    this.successfulRequests = 0;
    this.failedRequests = 0;
    this.fallbackCount = 0;
    this.securityBlocks = 0;
    this.totalPromptTokens = 0;
    this.totalCompletionTokens = 0;
    this.latencies = [];
    this.providerCounts = {};
  }
}

export const chatTelemetry = new ChatTelemetryCollector();
