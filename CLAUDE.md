# CLAUDE.md

Guidance for Claude Code when working in **PeOps Prep**.

## What this is

A Duolingo-style web app for **private equity portfolio-operations / value-creation interview prep** (KKR Capstone, Bain Capital Portfolio Group, Vista/VCG, Blackstone PortOps, Apollo APPS, Carlyle, CD&R, TPG Ops). Per-user email/password auth (jose JWT + bcryptjs, `proxy.ts` route guard), port **5550**.

The app has eight surfaces (nav tabs):

| Tab | Route | What it is |
|---|---|---|
| **Dashboard** | `/` | Readiness score, "Continue learning" next-lesson card, due-today, streak, mastery-by-domain, weak areas, readiness trend. |
| **Learn** | `/learn` | The **structured learning journey** — a zig-zag roadmap of units → lessons that unlock as you pass unit checkpoints. |
| **Review** | `/review` | FSRS spaced-repetition flashcards (the `concepts` deck). |
| **Drills** | `/drills` | Multi-format quiz engine + the interactive paper-LBO step-walker (return-attribution waterfall). |
| **Cases** | `/cases` | Operational PortCo cases with exhibits; a 5-stage workbench, AI-graded. |
| **Behavioral** | `/behavioral` | STAR-graded behavioral + ops-technical practice (tabs) + a "My stories" library. |
| **Mock Superday** | `/superday` | Chained, timed, AI-graded mock interview ending in a scorecard. |
| **Firms** | `/firms` | Firm profiles + a firm quiz. |
| **Mentor** | `/mentor` | Streaming AI coach. |

Closely mirrors the sibling app **`../foundry`** (same stack) and adapts the lesson system from **`../language-tutor`**; reuse their patterns when extending.

## Stack

Next.js 16 (App Router), React 19, TypeScript strict, **Tailwind v4 + shadcn/ui** (Base UI primitives; tokens in `app/globals.css` via `@theme inline` — no `tailwind.config.ts`), **Turso (libSQL) + Drizzle ORM**, `ts-fsrs` (spaced repetition), Anthropic SDK (`claude-sonnet-4-6` smart / `claude-haiku-4-5` cheap), `recharts`, `framer-motion`, `lucide-react`, `next-themes`, `@dnd-kit`, `zod`.

> ⚠️ Next.js 16 has breaking changes vs. older versions (see `AGENTS.md`). When a Next API behaves unexpectedly, check `node_modules/next/dist/docs/` and how `../foundry` does it.

## Commands

```bash
# node is at /opt/homebrew/bin/node — prefix npm/npx
PATH=/opt/homebrew/bin:$PATH npm run dev      # dev server on 5550
PATH=/opt/homebrew/bin:$PATH npm run build    # TS strict check + Next build
PATH=/opt/homebrew/bin:$PATH npm run lint

# DB — source env first (local dev uses file:local.db)
set -a && source .env.local && set +a
PATH=/opt/homebrew/bin:$PATH npm run db:push   # drizzle-kit push (schema → DB)
PATH=/opt/homebrew/bin:$PATH npm run db:studio # drizzle-kit studio (GUI)
PATH=/opt/homebrew/bin:$PATH npm run seed      # load seed content (tsx scripts/seed.ts)
```

The Anthropic key is **server-side only** (`lib/anthropic.ts`); AI features degrade gracefully when it's absent (`hasAnthropicKey()`).

## Directory map

```
app/                       # routes (all dynamic pages use `export const dynamic = "force-dynamic"`)
  page.tsx                 # dashboard
  learn/                   # roadmap + [unit]/[lesson] + [unit]/checkpoint
  review/ drills/ cases/ behavioral/ superday/ firms/ mentor/ browse/
  api/grade/ api/mentor/   # the only Route Handlers (AI)
components/
  AppShell.tsx             # nav (desktop rail + mobile bottom bar + mobile hamburger menu)
  lesson/                  # LessonPlayer, CheckpointRunner, TeachingPages, ExercisePages
  curriculum/Roadmap.tsx   # zig-zag roadmap
  quiz/ lbo/ grade/ cases/ behavioral/ stories/ mentor/ review/ dashboard/
lib/
  curriculum/              # the learning-journey content + helpers (see below)
  content/                 # seed-content types (concepts/questions/cases/firms/…)
  actions/                 # "use server" actions (curriculum, review, quiz, stories, dashboard)
  db/ (schema, client, queries)  srs.ts  returns.ts  lbo-deals.ts  superday.ts
  grading/ (ai.ts, quiz.ts)  anthropic.ts  user.ts
seed/                      # typed seed data → scripts/seed.ts loads it into the DB
```

## Architecture

- **Auth:** per-user email/password (jose JWT in an httpOnly `__session` cookie + bcryptjs). `lib/auth.ts` (session create/read/delete + `requireAuth()`), `lib/actions/auth.ts` (register/login/logout/changePassword), `proxy.ts` (route guard → `/login`; `/login` + `/register` public), `app/{login,register,account}`. The seam `lib/user.ts` `currentUserId()` is now **async** — it returns `requireAuth()` — so every call site `await`s it. Accounts live in the `users` table; every per-user table keys `userId` off `users.id`.
- **DB:** `lib/db/schema.ts` (Drizzle), `lib/db/client.ts` (lazy Turso+Drizzle init via Proxy — prevents Vercel build-time failures). All backend logic is in `lib/actions/*.ts` (`"use server"`); the only `app/api/` Route Handlers are the AI ones (`/api/grade`, `/api/mentor` streaming).
- **Two content systems:**
  1. **Seed content** (`seed/` → DB tables `topics, concepts, questions, cases, behavioralPrompts, opsTechnicals, firms`) drives Review, Drills, Cases, Behavioral, Firms. Edit the typed files in `seed/` then `npm run seed`.
  2. **Curriculum** (`lib/curriculum/`, in code, not DB) drives the Learn journey — see below.
- **Learning journey** (`lib/curriculum/`): `types.ts` defines a discriminated-union `LessonPage` — teaching pages (`read`, `framework`, `worked`, `compare`, `insight`) and exercises (`mcq`, `fill`, `order`, `numeric`, `check`); **there is no `tip` type**. Structure is Stage → Unit → Lesson → pages. `components/lesson/LessonPlayer.tsx` steps pages (each reports `done` to gate Next; teaching auto-done, exercises gate on attempt) → `markLessonDone`. `CheckpointRunner` gates unit completion at the unit's `passingPct`. `Roadmap.tsx` renders the zig-zag with unlock logic (lesson → prev done; unit → checkpoint passed; stage → all prior-stage units complete). Progress in DB tables **`peops_lesson_progress` / `peops_checkpoint_attempts`** (`lib/actions/curriculum.ts`). **5 stages, 12 units, 32 lessons** are authored. To extend: add a unit file under `lib/curriculum/units/`, register in `units/index.ts`, and add/confirm its outline entry in `stages.ts`.
- **FSRS:** `lib/srs.ts` wraps `ts-fsrs`. Per-user scheduling in `fsrsCards` (`fsrsDue` integer ms for cheap `WHERE due <= now`; `fsrsState` JSON blob).
- **Returns math:** `lib/returns.ts` (pure, unit-testable) underpins the paper-LBO walker (`lib/lbo-deals.ts`) and the numeric quiz grader.
- **AI grading:** `lib/grading/ai.ts` `gradeFreeResponse` uses a **forced tool call** for strict JSON, validated with `zod`, against weighted rubrics from the DB. `/api/grade` resolves the rubric and records an attempt. `/api/mentor` streams chat.
- **Dashboard:** `lib/actions/dashboard.ts` aggregates attempts + FSRS maturity + free-response scores + curriculum progress into mastery-by-domain, a weighted readiness score, streak, weak areas, and the next-step "Continue learning" card (`getNextStep`).
- **Theme:** dark default via `next-themes`; emerald primary, ink-blue/teal charts. Tokens in `app/globals.css`.
- **PRACTICE_LINKS** (`lib/curriculum`): maps each unit to its practice surface; surfaced on lesson/checkpoint completion screens to connect Learn → Drills/Cases/Behavioral/Firms/Superday.

## Deployment

Live on **Vercel** at **https://peops-prep.vercel.app** (auto-deploys from `main`; project `peops-prep`, team `aidan-s-projects1`). Prod runs on its **own dedicated Turso database** `peops-prep` (`libsql://peops-prep-aidanlconnolly...`, 14 tables). Required Vercel env: `ANTHROPIC_API_KEY`, `TURSO_DATABASE_URL`, `TURSO_AUTH_TOKEN`, `AUTH_SECRET`. Prod also needs the `users` table created and existing `user_id='me'` rows reassigned to your real account id after you register. Any new dynamic page needs `export const dynamic = "force-dynamic"`. Firm comp figures are approximate — re-verify before an interview.
