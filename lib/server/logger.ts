/**
 * Production Structured Logger for WishMaster01 Portfolio
 * Provides level-based logging with automatic PII and secret redaction.
 */

export type LogLevel = "debug" | "info" | "warn" | "error";

const SENSITIVE_KEYS = new Set([
  "password",
  "passwordhash",
  "token",
  "sessiontoken",
  "secret",
  "authorization",
  "cookie",
  "apikey",
  "api_key",
  "privatekey",
  "email",
  "bearer",
]);

function redactSensitiveData(obj: unknown, depth = 0): unknown {
  if (depth > 5 || obj === null || obj === undefined) {
    return obj;
  }

  if (typeof obj === "string") {
    // Redact bearer tokens or potential JWTs
    if (obj.toLowerCase().startsWith("bearer ")) {
      return "Bearer [REDACTED]";
    }
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => redactSensitiveData(item, depth + 1));
  }

  if (typeof obj === "object") {
    const sanitized: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(obj)) {
      const lowerKey = key.toLowerCase().replace(/[-_]/g, "");
      if (SENSITIVE_KEYS.has(lowerKey)) {
        sanitized[key] = "[REDACTED]";
      } else {
        sanitized[key] = redactSensitiveData(value, depth + 1);
      }
    }
    return sanitized;
  }

  return obj;
}

export type StructuredLogPayload = {
  timestamp: string;
  level: LogLevel;
  message: string;
  requestId?: string;
  route?: string;
  method?: string;
  status?: number;
  latencyMs?: number;
  error?: {
    name?: string;
    message: string;
    stack?: string;
  };
  context?: Record<string, unknown>;
};

class StructuredLogger {
  private isProduction = process.env.NODE_ENV === "production";

  private format(level: LogLevel, message: string, meta?: Record<string, unknown>): StructuredLogPayload {
    const cleanMeta = meta ? (redactSensitiveData(meta) as Record<string, unknown>) : {};

    const requestId = typeof cleanMeta.requestId === "string" ? cleanMeta.requestId : undefined;
    const route = typeof cleanMeta.route === "string" ? cleanMeta.route : undefined;
    const method = typeof cleanMeta.method === "string" ? cleanMeta.method : undefined;
    const status = typeof cleanMeta.status === "number" ? cleanMeta.status : undefined;
    const latencyMs = typeof cleanMeta.latencyMs === "number" ? cleanMeta.latencyMs : undefined;

    let errorObj: StructuredLogPayload["error"];
    if (cleanMeta.error instanceof Error) {
      errorObj = {
        name: cleanMeta.error.name,
        message: cleanMeta.error.message,
        stack: this.isProduction ? undefined : cleanMeta.error.stack,
      };
      delete cleanMeta.error;
    } else if (cleanMeta.error && typeof cleanMeta.error === "object") {
      errorObj = cleanMeta.error as StructuredLogPayload["error"];
      delete cleanMeta.error;
    }

    return {
      timestamp: new Date().toISOString(),
      level,
      message,
      requestId,
      route,
      method,
      status,
      latencyMs,
      error: errorObj,
      context: Object.keys(cleanMeta).length > 0 ? cleanMeta : undefined,
    };
  }

  debug(message: string, meta?: Record<string, unknown>) {
    if (!this.isProduction) {
      console.debug(JSON.stringify(this.format("debug", message, meta)));
    }
  }

  info(message: string, meta?: Record<string, unknown>) {
    console.info(JSON.stringify(this.format("info", message, meta)));
  }

  warn(message: string, meta?: Record<string, unknown>) {
    console.warn(JSON.stringify(this.format("warn", message, meta)));
  }

  error(message: string, error?: unknown, meta?: Record<string, unknown>) {
    const errorMeta = {
      ...meta,
      error: error instanceof Error ? error : typeof error === "string" ? new Error(error) : undefined,
    };
    console.error(JSON.stringify(this.format("error", message, errorMeta)));
  }

  logRequest(params: {
    requestId?: string;
    route: string;
    method: string;
    status: number;
    latencyMs: number;
    error?: unknown;
  }) {
    const level: LogLevel = params.status >= 500 ? "error" : params.status >= 400 ? "warn" : "info";
    const payload = this.format(level, `${params.method} ${params.route} ${params.status} (${params.latencyMs}ms)`, {
      requestId: params.requestId,
      route: params.route,
      method: params.method,
      status: params.status,
      latencyMs: params.latencyMs,
      error: params.error,
    });

    if (level === "error") {
      console.error(JSON.stringify(payload));
    } else if (level === "warn") {
      console.warn(JSON.stringify(payload));
    } else {
      console.info(JSON.stringify(payload));
    }
  }
}

export const logger = new StructuredLogger();
