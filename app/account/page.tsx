import Link from "next/link";
import { redirect } from "next/navigation";
import { LogOut } from "lucide-react";
import { getSession } from "@/lib/auth";
import { logoutAction } from "@/lib/actions/auth";
import { ChangePasswordForm } from "@/components/account/ChangePasswordForm";
import { Button } from "@/components/ui/button";

export const dynamic = "force-dynamic";

export default async function AccountPage() {
  const session = await getSession();
  if (!session) redirect("/login");

  return (
    <div className="mx-auto max-w-2xl">
      <Link
        href="/"
        className="mb-4 inline-block text-xs text-muted-foreground hover:underline"
      >
        ← Home
      </Link>
      <h1 className="mb-6 text-2xl font-bold tracking-tight">Account</h1>

      <section className="mb-10 flex items-center justify-between gap-4 rounded-xl border border-border bg-card px-4 py-3">
        <div className="min-w-0">
          <p className="text-xs uppercase tracking-wider text-muted-foreground">
            Signed in as
          </p>
          <p className="truncate text-sm font-medium">{session.email}</p>
        </div>
        <form action={logoutAction}>
          <Button type="submit" variant="outline" size="sm">
            <LogOut className="h-4 w-4" />
            Sign out
          </Button>
        </form>
      </section>

      <section className="max-w-sm">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          Change password
        </h2>
        <ChangePasswordForm />
      </section>
    </div>
  );
}
