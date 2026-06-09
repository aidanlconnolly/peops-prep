"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  GraduationCap,
  Layers,
  Target,
  BookOpen,
  MessagesSquare,
  Gauge,
  Building2,
  Sparkles,
} from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

type NavItem = {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
};

const NAV: NavItem[] = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/learn", label: "Learn", icon: GraduationCap },
  { href: "/review", label: "Review", icon: Layers },
  { href: "/drills", label: "Drills", icon: Target },
  { href: "/cases", label: "Cases", icon: BookOpen },
  { href: "/behavioral", label: "Behavioral", icon: MessagesSquare },
  { href: "/superday", label: "Mock Superday", icon: Gauge },
  { href: "/firms", label: "Firms", icon: Building2 },
  { href: "/mentor", label: "Mentor", icon: Sparkles },
];

// Mobile bottom bar shows the five highest-frequency tabs.
const MOBILE = NAV.filter((n) =>
  ["/", "/learn", "/drills", "/cases", "/superday"].includes(n.href),
);

function isActive(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href + "/");
}

function Wordmark() {
  return (
    <Link href="/" className="flex items-center gap-2.5 px-1">
      <span className="grid h-7 w-7 place-items-center rounded-md bg-primary text-primary-foreground">
        <Gauge className="h-4 w-4" />
      </span>
      <span className="font-mono text-sm font-semibold tracking-[0.18em] text-foreground">
        PEOPS
      </span>
    </Link>
  );
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen md:pl-60">
      {/* Desktop left rail */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-60 flex-col border-r border-border bg-sidebar/70 backdrop-blur md:flex">
        <div className="px-4 py-5">
          <Wordmark />
        </div>
        <nav className="flex-1 space-y-1 px-3">
          {NAV.map((item) => (
            <RailLink
              key={item.href}
              item={item}
              active={isActive(pathname, item.href)}
            />
          ))}
        </nav>
        <div className="flex items-center justify-between border-t border-border px-4 py-3">
          <span className="text-xs text-muted-foreground">Interview prep</span>
          <ThemeToggle />
        </div>
      </aside>

      {/* Mobile top bar */}
      <header className="sticky top-0 z-30 flex items-center justify-between border-b border-border bg-background/80 px-4 py-3 backdrop-blur md:hidden">
        <Wordmark />
        <ThemeToggle />
      </header>

      {/* Content */}
      <main className="mx-auto w-full max-w-5xl px-4 pb-28 pt-6 sm:px-6 md:pb-12 md:pt-10">
        {children}
      </main>

      {/* Mobile bottom tab bar */}
      <nav className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-5 border-t border-border bg-sidebar/90 backdrop-blur md:hidden">
        {MOBILE.map((item) => {
          const active = isActive(pathname, item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center gap-1 py-2 text-[10px] ${
                active ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <Icon className="h-5 w-5" />
              {item.label === "Mock Superday" ? "Superday" : item.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}

function RailLink({ item, active }: { item: NavItem; active: boolean }) {
  const Icon = item.icon;
  return (
    <Link
      href={item.href}
      className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition ${
        active
          ? "bg-accent text-accent-foreground"
          : "text-muted-foreground hover:bg-secondary hover:text-foreground"
      }`}
    >
      <Icon className="h-4 w-4 shrink-0" />
      {item.label}
    </Link>
  );
}
