# CLAUDE.md

Guidance for Claude Code when working in **PeOps Prep**.

## What this is

A Duolingo-style web app for **private equity portfolio-operations / value-creation interview prep** (KKR Capstone, Bain Capital Portfolio Group, Vista/VCG, Blackstone PortOps, Apollo APPS, Carlyle, CD&R, TPG Ops). A **structured learning journey** ("Learn" — units → lessons → pages on a zig-zag roadmap that unlocks as you pass unit checkpoints), FSRS flashcard **Review**, multi-format quizzes, an interactive paper-LBO drill, AI-graded operational cases & behaviorals, a mock-Superday simulator, firm intel, and a readiness dashboard. Port **5550**.

**Learning journey** lives in `lib/curriculum/` (content model + units/stages), `components/lesson/` (LessonPlayer + page renderers), `components/curriculum/Roadmap.tsx`, and `lib/actions/curriculum.ts` (progress). Deep "Foundations" stage authored (3 units, 9 lessons); stages 2–5 are locked "soon" previews — expand by adding unit files under `lib/curriculum/units/` and listing them in `units/index.ts` + the built section of `stages.ts`. Adapted from the language-tutor's lesson system.

Deployed and **live** on **Vercel** at **https://peops-prep.vercel.app** (auto-deploys from `main`; project `peops-prep` under team `aidan-s-projects1`). `ANTHROPIC_API_KEY`, `TURSO_DATABASE_URL`, `TURSO_AUTH_TOKEN` are set in Vercel Production. Prod runs on its **own dedicated Turso database** `peops-prep` (`libsql://peops-prep-aidanlconnolly...`) — 14 tables. (It previously shared the language-tutor DB; that's been migrated away and the orphaned tables cleaned up.) Local dev uses `TURSO_DATABASE_URL=file:local.db`.

Closely mirrors the sibling app **`../foundry`** (same stack); reuse its patterns when extending.

## Stack

Next.js 16 (App Router), React 19, TypeScript strict, **Tailwind v4 + shadcn/ui** (Base UI primitives; tokens in `app/globals.css` via `@theme inline` — no `tailwind.config.ts`), **Turso (libSQL) + Drizzle ORM**, `ts-fsrs` (spaced repetition), Anthropic SDK (`claude-sonnet-4-6` smart / `claude-haiku-4-5` cheap), `recharts`, `framer-motion`, `lucide-react`, `next-themes`, `@dnd-kit`, `zod`.

> ⚠️ Next.js 16 has breaking changes vs. older versions (see `AGENTS.md`). When a Next API behaves unexpectedly, check `node_modules/next/dist/docs/` and how `../foundry` does it.

## Commands

```bash
# node is at /opt/homebrew/bin/node — prefix npm/npx
PATH=/opt/homebrew/bin:$PATH npm run dev      # dev server on 5550
PATH=/opt/homebrew/bin:$PATH npm run build    # TS strict check + Next build
PATH=/opt/homebrew/bin:$PATH npm run lint

# DB — source env first
set -a && source .env.local && set +a
PATH=/opt/homebrew/bin:$PATH npm run db:push   # apply schema to DB
PATH=/opt/homebrew/bin:$PATH npm run db:studio # GUI browser
PATH=/opt/homebrew/bin:$PATH npm run seed      # load seed content (tsx scripts/seed.ts)
```

Local dev uses `TURSO_DATABASE_URL=file:local.db`. Production uses a real Turso DB. The Anthropic key is **server-side only** (`lib/anthropic.ts`); AI features degrade gracefully when it's absent (`hasAnthropicKey()`).

## Architecture

- **Auth seam (no auth in v1):** `lib/user.ts` exports `currentUserId()` returning `"me"`. Every per-user query keys off it. Swap the body for real auth later without touching call sites.
- **DB:** `lib/db/schema.ts` (Drizzle), `lib/db/client.ts` (lazy Turso+Drizzle init via Proxy — prevents Vercel build-time failures).
- **FSRS:** `lib/srs.ts` wraps `ts-fsrs`. Per-user scheduling stored in `fsrsCards` (`fsrsDue` integer ms for cheap `WHERE due <= now`; `fsrsState` JSON blob).
- **AI:** Route Handlers under `app/api/` use `lib/anthropic.ts`. Free-response grading returns strict JSON validated with `zod`.
- **Theme:** dark default via `next-themes`; light toggle in the app shell. Emerald primary, ink-blue/teal charts.
- **Nav:** `components/AppShell.tsx` — left rail (desktop) / bottom bar (mobile). Tabs: Dashboard / Learn / Drills / Cases / Behavioral / Mock Superday / Firms / Mentor.

## Deployment

Vercel (auto-deploy from `main`). Required env: `ANTHROPIC_API_KEY`, `TURSO_DATABASE_URL`, `TURSO_AUTH_TOKEN`. Auth-gated/dynamic pages need `export const dynamic = "force-dynamic"` when added.
