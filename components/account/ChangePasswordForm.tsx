"use client";

import { useActionState } from "react";
import { changePasswordAction } from "@/lib/actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function ChangePasswordForm() {
  const [state, action, isPending] = useActionState(changePasswordAction, null);

  return (
    <form action={action} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="current">Current password</Label>
        <Input
          id="current"
          name="current"
          type="password"
          required
          autoComplete="current-password"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="new">New password</Label>
        <Input
          id="new"
          name="new"
          type="password"
          required
          minLength={8}
          autoComplete="new-password"
          placeholder="At least 8 characters"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="confirm">Confirm new password</Label>
        <Input
          id="confirm"
          name="confirm"
          type="password"
          required
          minLength={8}
          autoComplete="new-password"
        />
      </div>
      {state && "error" in state && (
        <p className="rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
          {state.error}
        </p>
      )}
      {state && "ok" in state && (
        <p className="rounded-lg border border-primary/30 bg-primary/10 px-3 py-2 text-sm text-primary">
          {state.message}
        </p>
      )}
      <Button type="submit" disabled={isPending}>
        {isPending ? "Updating…" : "Update password"}
      </Button>
    </form>
  );
}
