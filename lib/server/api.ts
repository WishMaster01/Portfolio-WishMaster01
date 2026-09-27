import { NextResponse } from "next/server";
import type { ZodError } from "zod";

export type ApiSuccessResponse<T> = {
  success: true;
  data: T;
};

export type ApiErrorDetails = {
  code: string;
  message: string;
  fields?: Record<string, string[] | undefined>;
  details?: unknown;
};

export type ApiErrorResponse = {
  success: false;
  error: ApiErrorDetails;
  // Legacy compatibility fields
  message?: string;
};

export async function readJson<T = unknown>(request: Request): Promise<T | null> {
  try {
    return (await request.json()) as T;
  } catch {
    return null;
  }
}

export function apiSuccess<T>(
  data: T,
  init?: number | ResponseInit,
): NextResponse<ApiSuccessResponse<T>> {
  const responseInit: ResponseInit =
    typeof init === "number" ? { status: init } : (init ?? { status: 200 });

  return NextResponse.json(
    {
      success: true,
      data,
    },
    responseInit,
  );
}

export function apiError(
  code: string,
  message: string,
  status = 400,
  details?: unknown,
  extraHeaders?: Record<string, string>,
): NextResponse {
  const errorObj: ApiErrorDetails = {
    code,
    message,
  };

  if (details !== undefined) {
    if (typeof details === "object" && details !== null && !Array.isArray(details)) {
      errorObj.details = details;
    } else {
      errorObj.details = details;
    }
  }

  return NextResponse.json(
    {
      success: false,
      error: errorObj,
      // Legacy compatibility
      message,
    },
    {
      status,
      headers: extraHeaders,
    },
  );
}

export function validationError(error: ZodError): NextResponse {
  const fields = error.flatten().fieldErrors;
  return NextResponse.json(
    {
      success: false,
      error: {
        code: "VALIDATION_ERROR",
        message: "Validation failed.",
        fields,
      },
      // Backward compatibility with previous route format
      fields,
      message: "Validation failed. Please check the submitted fields.",
    },
    { status: 400 },
  );
}

export function notFound(entity = "Resource"): NextResponse {
  return apiError("NOT_FOUND", `${entity} not found.`, 404);
}

export function unauthorized(message = "Authentication required."): NextResponse {
  return apiError("UNAUTHORIZED", message, 401);
}

export function forbidden(message = "Access denied."): NextResponse {
  return apiError("FORBIDDEN", message, 403);
}

export function databaseUnavailable(
  message = "Database is not available. Please retry in a moment.",
): NextResponse {
  return apiError("DATABASE_UNAVAILABLE", message, 503);
}

export function rateLimited(
  retryAfterSeconds: number,
  message = "Too many requests. Please wait before trying again.",
): NextResponse {
  return apiError("RATE_LIMITED", message, 429, undefined, {
    "Retry-After": String(Math.max(1, Math.ceil(retryAfterSeconds))),
  });
}
