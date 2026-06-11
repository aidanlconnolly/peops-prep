"use client";

import { useActionState } from "react";
import Link from "next/link";
import { Gauge } from "lucide-react";
import { loginAction } from "@/lib/actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
  const [state, action, isPending] = useActionState(loginAction, null);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex flex-col items-center gap-3 text-center">
          <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary text-primary-foreground">
            <Gauge className="h-6 w-6" />
          </span>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Sign in</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              PE Ops Prep — interview training
            </p>
          </div>
        </div>

        <form action={action} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="you@example.com"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              placeholder="••••••••"
            />
          </div>
          {state?.error && (
            <p className="rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
              {state.error}
            </p>
          )}
          <Button type="submit" disabled={isPending} className="w-full">
            {isPending ? "Signing in…" : "Sign in"}
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          No account?{" "}
          <Link href="/register" className="font-medium text-foreground underline">
            Create one
          </Link>
        </p>
      </div>
    </main>
  );
}
