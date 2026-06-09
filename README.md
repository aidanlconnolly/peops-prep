# PeOps Prep

A Duolingo-style web app for **private-equity portfolio-operations / value-creation interview prep** (KKR Capstone, Bain Capital Portfolio Group, Vista VCG, Blackstone Portfolio Operations, Apollo APPS, Carlyle, CD&R, TPG Ops).

Spaced-repetition flashcards, a multi-format quiz engine, an interactive paper-LBO walker, AI-graded operational cases and behaviorals, a chained **mock Superday** simulator with a scorecard, firm intel, an AI mentor, and a readiness dashboard.

## Stack

Next.js 16 (App Router) · React 19 · TypeScript (strict) · Tailwind v4 + **shadcn/ui** · Turso (libSQL) + Drizzle ORM · `ts-fsrs` (FSRS spaced repetition) · Anthropic SDK (`claude-sonnet-4-6`) · recharts · framer-motion · dnd-kit · zod.

## Features

- **Learn** — FSRS spaced-repetition flashcards (Again/Hard/Good/Easy with real interval scheduling).
- **Drills** — composable quiz runner (multiple-choice, numeric with tolerance bands, drag-to-order, fill-in, scenario), timed sessions, and an interactive paper-LBO step-walker ending in a return-attribution waterfall.
- **Cases** — operational PortCo cases with exhibits; a 5-stage workbench AI-graded against a weighted rubric.
- **Behavioral** — STAR-graded behavioral + ops-technical practice, plus a "my stories" library.
- **Mock Superday** — the full Capstone-style chain (initial screen → first round → superday technical block → final), AI-graded, with a scorecard, per-round breakdown, and top-3 fixes.
- **Firms** — profiles (model, interview process, comp, accessibility) + a firm quiz.
- **Mentor** — a streaming AI coach that can generate cases, drill weak areas, explain concepts, and run mock rounds.
- **Dashboard** — readiness score, mastery-by-domain, weak-area surfacing, streak, and a readiness trend.

## Develop

```bash
# node is at /opt/homebrew/bin/node
PATH=/opt/homebrew/bin:$PATH npm install
PATH=/opt/homebrew/bin:$PATH npm run dev      # http://localhost:5550

# Database (Turso/libSQL via Drizzle) — source env first
set -a && source .env.local && set +a
PATH=/opt/homebrew/bin:$PATH npm run db:push  # apply schema
PATH=/opt/homebrew/bin:$PATH npm run seed     # load curriculum
```

Local dev uses `TURSO_DATABASE_URL=file:local.db`. See `.env.local.example`.

## Environment

| Var | Purpose |
|---|---|
| `ANTHROPIC_API_KEY` | AI grading + mentor (server-side only; features degrade gracefully without it) |
| `TURSO_DATABASE_URL` | libSQL URL — `file:local.db` for dev, a Turso URL for prod |
| `TURSO_AUTH_TOKEN` | Turso token (any value for a local file DB) |

## Architecture notes

- **Single local user** (`lib/user.ts`, `userId = "me"`) — an auth seam; swap the body for real auth without touching call sites.
- **AI grading** (`lib/grading/ai.ts`) uses a forced tool call for strict JSON, validated with zod, against weighted rubrics stored in the DB.
- **Returns math** (`lib/returns.ts`) is pure and unit-testable; the paper-LBO walker and numeric grader both build on it.
- **FSRS** (`lib/srs.ts`) stores per-user scheduling in `fsrs_cards` (`fsrs_due` integer for cheap due queries, `fsrs_state` JSON).
- Content lives in typed seed files under `seed/` and is loaded by `scripts/seed.ts`.

Firm comp figures are approximate and move every cycle — re-verify before an interview.
