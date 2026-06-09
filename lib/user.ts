/**
 * Auth seam. v1 is a single local user; every per-user query keys off this id.
 * To add real auth later (Clerk/NextAuth), swap the body to read the session —
 * call sites don't change.
 */
export const LOCAL_USER_ID = "me";

export function currentUserId(): string {
  return LOCAL_USER_ID;
}
