/**
 * Auth seam. Resolves the current user from the signed session cookie.
 * Throws if unauthenticated — every route is guarded by proxy.ts, so call
 * sites (server actions + the AI route handlers) only run when a session
 * exists. Was a single hardcoded id in v1; now backed by real auth.
 */
import { requireAuth } from "@/lib/auth";

export async function currentUserId(): Promise<string> {
  return requireAuth();
}
