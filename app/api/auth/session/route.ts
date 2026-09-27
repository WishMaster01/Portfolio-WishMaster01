import { apiSuccess } from "@/lib/server/api";
import { validateSession } from "@/lib/server/auth";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const auth = await validateSession(request);

  if (!auth) {
    return apiSuccess({
      authenticated: false,
      user: null,
    });
  }

  return apiSuccess({
    authenticated: true,
    user: auth.user,
  });
}
