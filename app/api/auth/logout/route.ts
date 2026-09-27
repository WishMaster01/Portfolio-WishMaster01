import { apiSuccess } from "@/lib/server/api";
import {
  AUTH_COOKIE_NAME,
  buildClearSessionCookie,
  destroySession,
  getCookieValue,
} from "@/lib/server/auth";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const cookieHeader = request.headers.get("cookie");
  const sessionToken = getCookieValue(cookieHeader, AUTH_COOKIE_NAME);

  if (sessionToken) {
    await destroySession(sessionToken);
  }

  const response = apiSuccess({ message: "Successfully logged out." });
  response.headers.set("Set-Cookie", buildClearSessionCookie());
  return response;
}
