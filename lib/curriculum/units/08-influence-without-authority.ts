import type { Unit } from "../types";

export const UNIT_INFLUENCE_WITHOUT_AUTHORITY: Unit = {
  slug: "influence-without-authority",
  stage: 4,
  order: 1,
  icon: "🤝",
  title: "Influence without authority",
  tagline: "The defining skill of the operating partner — getting change to happen when you don't run the company.",
  lessons: [
    // ── Lesson 1 ──────────────────────────────────────────────────────────────
    {
      slug: "iwa-core-skill",
      title: "Why influence is the core skill",
      summary: "Operating partners have no line authority — credibility is the lever.",
      estMinutes: 7,
      pages: [
        {
          type: "read",
          heading: "You don't run the company",
          body: [
            "The single most important thing to understand about the operating-partner role is that you have <strong>no line authority</strong>. You don't manage the CEO, you can't fire anyone, and you don't control the budget. Yet your job is to make the business meaningfully better.",
            "That means everything you accomplish happens <em>through</em> other people — the management team — who don't report to you and may not have asked for your help. The lever isn't power; it's <strong>credibility</strong>.",
            "Credibility comes from three things: a sharp diagnosis grounded in the company's own data, a prize quantified in numbers management recognizes, and a track record of quick wins that prove you add value rather than create work. Get those, and management pulls you in. Skip them, and you're the fund's consultant they tolerate.",
          ],
          keyIdea:
            "No line authority → influence is everything. Credibility = sharp diagnosis + quantified prize + a track record of quick wins.",
        },
        {
          type: "insight",
          heading: "What the interviewer is really testing",
          body:
            "\"Tell me about a time you drove change without authority\" is the most predictable behavioral in PE-ops recruiting — because it <em>is</em> the job. They want a story where you had no formal power, co-owned a diagnosis, used data and a pilot to build the case, brought a skeptic along, and quantified the result. A story where you simply told people what to do is a fail.",
        },
        {
          type: "mcq",
          heading: "Check your understanding",
          questions: [
            {
              q: "An operating partner's main source of influence is…",
              options: [
                "Authority to fire management",
                "Credibility — diagnosis, quantified prize, quick wins",
                "Control of the company's bank accounts",
                "A seat on the lending committee",
              ],
              correct: 1,
              fb: "No line authority means influence runs through credibility.",
            },
            {
              q: "The most predictable PE-ops behavioral question is about…",
              options: [
                "Your GPA",
                "Driving change without authority",
                "Your favorite stock",
                "Excel shortcuts",
              ],
              correct: 1,
              fb: "It's the most-asked question because it IS the job.",
            },
            {
              q: "Which approach signals weak influence skills?",
              options: [
                "Co-owning the diagnosis with management's data",
                "Telling people what to do because the fund said so",
                "Piloting a change before scaling",
                "Quantifying the prize in their numbers",
              ],
              correct: 1,
              fb: "Mandating from authority you don't have is exactly the wrong move.",
            },
          ],
        },
        {
          type: "check",
          heading: "Lesson check",
          questions: [
            {
              q: "Operating partners typically have…",
              options: ["full line authority", "no line authority", "control of payroll", "the CEO's job"],
              correct: 1,
            },
            {
              q: "Credibility is built from…",
              options: [
                "title and tenure",
                "sharp diagnosis, quantified prize, and quick wins",
                "the size of the fund",
                "board votes",
              ],
              correct: 1,
            },
            {
              q: "Change in a PortCo happens…",
              options: ["by decree", "through management, via influence", "only at exit", "without management"],
              correct: 1,
            },
          ],
        },
      ],
    },

    // ── Lesson 2 ──────────────────────────────────────────────────────────────
    {
      slug: "iwa-playbook",
      title: "The influence playbook",
      summary: "The repeatable moves for landing change without authority.",
      estMinutes: 8,
      pages: [
        {
          type: "read",
          heading: "Five moves, in order",
          body: [
            "Influence without authority isn't charisma — it's a repeatable sequence. The same five moves work whether you're landing a pricing initiative or a procurement program.",
            "<strong>Co-own the diagnosis</strong> using their data, so the conclusion is theirs, not imposed. <strong>Quantify the prize</strong> in numbers they recognize. <strong>Pilot small</strong> to de-risk and produce proof. <strong>Tie it to their incentives</strong> so winning is their win. And keep <strong>governance</strong> — the board, the KPIs — as a gentle forcing function, never the opening move.",
            "Notice the order: you earn the right to use governance by first making the case collaboratively. Leading with \"the board wants this\" burns the trust you need.",
          ],
          keyIdea:
            "Co-own the diagnosis → quantify the prize → pilot small → tie to incentives → governance as a gentle backstop. In that order.",
        },
        {
          type: "framework",
          heading: "The five moves",
          items: [
            { term: "Co-own the diagnosis", detail: "Use management's own data so the conclusion is shared, not imposed." },
            { term: "Quantify the prize", detail: "Size the opportunity in EBITDA/cash dollars they recognize." },
            { term: "Pilot small", detail: "Run one category / one site to de-risk and generate proof." },
            { term: "Tie to incentives", detail: "Make the win their win — align it with how the team is measured and paid." },
            { term: "Governance as backstop", detail: "Use the board and KPIs as a gentle forcing function — never the opening move." },
          ],
        },
        {
          type: "order",
          heading: "Sequence the playbook",
          intro: "Order the five influence moves.",
          items: [
            {
              tokens: [
                "Co-own the diagnosis with their data",
                "Quantify the prize in their numbers",
                "Pilot small to de-risk and prove it",
                "Tie the win to their incentives",
                "Use governance as a gentle backstop",
              ],
              label: "Influence playbook",
            },
          ],
        },
        {
          type: "check",
          heading: "Lesson check",
          questions: [
            {
              q: "The first move in the influence playbook is…",
              options: [
                "Escalate to the board",
                "Co-own the diagnosis with their data",
                "Mandate the change",
                "Replace the CEO",
              ],
              correct: 1,
            },
            {
              q: "Governance (board / KPIs) should be used as…",
              options: [
                "the opening move",
                "a gentle forcing function, last",
                "a threat",
                "irrelevant",
              ],
              correct: 1,
            },
            {
              q: "Piloting small is valuable because it…",
              options: [
                "avoids the diagnosis",
                "de-risks the change and produces proof",
                "skips management",
                "raises the multiple",
              ],
              correct: 1,
            },
          ],
        },
      ],
    },

    // ── Lesson 3 ──────────────────────────────────────────────────────────────
    {
      slug: "iwa-skeptical-ceo",
      title: "Landing change with a skeptical CEO",
      summary: "The playbook applied to a resistant management team.",
      estMinutes: 8,
      pages: [
        {
          type: "read",
          heading: "Resistance is a process problem, not a dead end",
          body: [
            "A skeptical CEO who won't commit to your initiative is the classic ops scenario. The instinct to escalate (\"I'll get the board to mandate it\") is exactly wrong — it confirms you're an outsider imposing change and poisons the relationship you need for the rest of the hold.",
            "Treat resistance as a signal that you haven't yet made the case <em>with</em> them. Run the playbook: co-own the diagnosis using their spend data, quantify the prize, propose a small pilot in one category, and tie the result to how they're measured. Let evidence do the persuading.",
            "Keep the board in reserve. If, after a fair process, the prize is large and the resistance is purely inertia, governance can become the gentle forcing function — but you've earned the right to use it by trying collaboration first.",
          ],
          keyIdea:
            "Don't open with escalation. Co-own the diagnosis, pilot, quantify, tie to incentives — then keep governance as a last, gentle backstop.",
        },
        {
          type: "worked",
          heading: "A skeptical-CEO scenario",
          intro: "The CEO won't commit to a procurement savings program. Walk the moves.",
          steps: [
            { label: "Co-own", detail: "Sit with the CEO and pull their own spend data — surface the fragmentation together, so the gap is their finding." },
            { label: "Quantify", detail: "Size the prize from that data: e.g. ~$4M of addressable third-party spend at 8–12% savings." },
            { label: "Pilot", detail: "Propose one category (say, packaging) as a 60-day pilot — small, reversible, fast proof." },
            { label: "Tie to incentives", detail: "Frame the savings as flowing to the CEO's EBITDA target, not the fund's." },
            { label: "Backstop", detail: "Only if inertia persists after the pilot proves out, let the board gently make it a standing priority." },
          ],
          takeaway: "Co-own → quantify → pilot → incentives → (gentle) governance. Evidence and a small win beat a benchmark dump or an escalation.",
        },
        {
          type: "mcq",
          heading: "Check your understanding",
          questions: [
            {
              q: "A skeptical CEO won't commit to your procurement thesis. Best next move?",
              options: [
                "Escalate to the board to mandate it",
                "Co-own a diagnosis with their spend data and pilot one category",
                "Drop the initiative",
                "Hand them a 40-page benchmark deck",
              ],
              correct: 1,
              fb: "Co-own, quantify, pilot, tie to incentives. Escalation is a last resort.",
            },
            {
              q: "Opening with 'the board wants this' is a mistake because…",
              options: [
                "the board never wants anything",
                "it confirms you're imposing change and burns trust",
                "it's illegal",
                "it raises EBITDA",
              ],
              correct: 1,
              fb: "Leading with authority you've borrowed poisons the relationship.",
            },
            {
              q: "A pilot beats a benchmark deck because…",
              options: [
                "decks are expensive",
                "a small, real win is more persuasive than external comparisons",
                "pilots avoid the CEO",
                "benchmarks are always wrong",
              ],
              correct: 1,
              fb: "Proof from their own business persuades; a benchmark dump doesn't.",
            },
          ],
        },
        {
          type: "check",
          heading: "Lesson check",
          questions: [
            {
              q: "Resistance from management is best treated as…",
              options: [
                "a reason to quit the initiative",
                "a signal you haven't made the case with them yet",
                "grounds to escalate immediately",
                "proof the prize isn't there",
              ],
              correct: 1,
            },
            {
              q: "Governance becomes appropriate…",
              options: [
                "as the opening move",
                "only after a fair, collaborative process and a proven pilot",
                "never",
                "to threaten the CEO",
              ],
              correct: 1,
            },
            {
              q: "The most persuasive element with a skeptic is usually…",
              options: [
                "an external benchmark",
                "a small pilot that proves it in their own business",
                "the fund's reputation",
                "a longer deck",
              ],
              correct: 1,
            },
          ],
        },
      ],
    },
  ],

  checkpoint: {
    passingPct: 80,
    questions: [
      {
        q: "Operating partners typically have…",
        options: ["full authority", "no line authority", "control of payroll", "the CEO role"],
        correct: 1,
      },
      {
        q: "Influence runs on…",
        options: ["title", "credibility", "headcount", "the multiple"],
        correct: 1,
      },
      {
        q: "Credibility is built from…",
        options: ["tenure", "sharp diagnosis + quantified prize + quick wins", "fund size", "board votes"],
        correct: 1,
      },
      {
        q: "The first move in the influence playbook is…",
        options: ["escalate", "co-own the diagnosis with their data", "mandate", "pilot first"],
        correct: 1,
      },
      {
        q: "Governance (board/KPIs) should be used…",
        options: ["first", "as a gentle backstop, last", "as a threat", "never"],
        correct: 1,
      },
      {
        q: "Piloting small is valuable because it…",
        options: ["avoids diagnosis", "de-risks the change and produces proof", "skips management", "raises the multiple"],
        correct: 1,
      },
      {
        q: "A skeptical CEO who won't commit is best met with…",
        options: ["immediate escalation", "co-own + quantify + pilot + incentives", "dropping it", "a benchmark dump"],
        correct: 1,
      },
      {
        q: "Opening with 'the board wants this' is a mistake because…",
        options: ["boards want nothing", "it confirms you're imposing change and burns trust", "it's illegal", "it cuts EBITDA"],
        correct: 1,
      },
      {
        q: "Resistance is best read as…",
        options: ["a dead end", "a signal you haven't made the case with them yet", "grounds to escalate", "proof there's no prize"],
        correct: 1,
      },
      {
        q: "The most persuasive element with a skeptic is…",
        options: ["a benchmark", "a small pilot proving it in their own business", "fund reputation", "a longer deck"],
        correct: 1,
      },
    ],
  },
};
