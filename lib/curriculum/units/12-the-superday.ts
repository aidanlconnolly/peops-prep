import type { Unit } from "../types";

export const UNIT_THE_SUPERDAY: Unit = {
  slug: "the-superday",
  stage: 5,
  order: 3,
  icon: "🎯",
  title: "The Superday",
  tagline: "Put it all together — what the gauntlet looks like and how to run it.",
  lessons: [
    // ── Lesson 1: what a Superday is ──────────────────────────────────────────
    {
      slug: "sd-what-it-is",
      title: "What a Superday is",
      summary: "The chained, timed final-round gauntlet.",
      estMinutes: 7,
      pages: [
        {
          type: "read",
          heading: "Everything you've learned, in one day",
          body: [
            "A Superday is the final-round gauntlet: several back-to-back interviews in one sitting, usually 2:1 (two interviewers, one candidate), spanning behavioral, case, and technical. It's designed to test not just whether you know the material, but whether you can perform it under fatigue and pressure.",
            "A Capstone-style Superday chains the surfaces you've trained: an <strong>initial screen</strong> (motivation + resume), a <strong>first round</strong> (a behavioral + an operational case), the <strong>Superday technical block</strong> (a returns / paper-LBO drill + 2–3 operational technicals), and a <strong>final</strong> (fit + strategic thinking).",
            "Each station rewards the same fundamentals: structure, prioritization, quantification, and influence. There are no new skills on a Superday — just the ones you've built, performed in sequence without a reset.",
          ],
          keyIdea:
            "A Superday chains screen → behavioral + case → returns + technicals → fit, 2:1 and timed. No new skills — your fundamentals, performed under pressure.",
        },
        {
          type: "framework",
          heading: "The four rounds",
          items: [
            { term: "Initial screen", detail: "Motivation + resume walkthrough. Why ops, why this firm." },
            { term: "First round", detail: "One behavioral (STAR, influence) + one operational case (diagnose → prioritize)." },
            { term: "Superday technical block", detail: "A returns / paper-LBO drill + 2–3 operational technicals (measuring, landing change, cost vs growth)." },
            { term: "Final", detail: "Fit + strategic thinking — where ops value creation is heading, and why this seat." },
          ],
        },
        {
          type: "mcq",
          heading: "Check your understanding",
          questions: [
            {
              q: "A Superday is best described as…",
              options: [
                "a single 30-minute screen",
                "a chained, timed sequence of back-to-back rounds",
                "a written exam",
                "a networking event",
              ],
              correct: 1,
              fb: "It's the full gauntlet in one sitting, usually 2:1.",
            },
            {
              q: "The technical block typically includes…",
              options: [
                "a coding test",
                "a returns/paper-LBO drill + operational technicals",
                "an essay",
                "a group game",
              ],
              correct: 1,
              fb: "Returns math + operational technicals are the technical core.",
            },
            {
              q: "What new skills does a Superday require beyond your prep?",
              options: [
                "Several brand-new frameworks",
                "None — it's your fundamentals performed under pressure",
                "Advanced accounting",
                "Coding",
              ],
              correct: 1,
              fb: "No new skills — just the ones you've built, in sequence.",
            },
          ],
        },
        {
          type: "check",
          heading: "Lesson check",
          questions: [
            { q: "A Superday is usually run…", options: ["1:1 only", "2:1, back-to-back", "by email", "as a group"], correct: 1 },
            { q: "The first round pairs…", options: ["two cases", "a behavioral + an operational case", "two technicals", "a resume chat + essay"], correct: 1 },
            { q: "The final round tests…", options: ["typing speed", "fit + strategic thinking", "accounting", "coding"], correct: 1 },
          ],
        },
      ],
    },

    // ── Lesson 2: running the gauntlet ────────────────────────────────────────
    {
      slug: "sd-running-it",
      title: "Running the gauntlet",
      summary: "How to perform across a long, high-pressure day.",
      estMinutes: 6,
      pages: [
        {
          type: "read",
          heading: "Consistency beats brilliance",
          body: [
            "The hardest part of a Superday isn't any single question — it's <strong>consistency under fatigue</strong>. A brilliant case answer followed by a sloppy behavioral nets out worse than four solid, structured rounds. Pace yourself and reset between stations.",
            "Carry the same operating system into every room: <strong>structure first</strong> (frame before you dive), <strong>prioritize</strong> (a ranked two or three, not a list), <strong>quantify</strong> (a number whenever you can), and show <strong>influence</strong> (bring management along). Interviewers compare notes — a consistent signal across rounds is what gets you the offer.",
            "Manage your energy: brief pauses to think are fine and read as composure, not weakness. End each answer cleanly with a recommendation. And in the final, have a genuine point of view on where operational value creation is heading — that's the differentiator at the partner round.",
          ],
          keyIdea:
            "Be consistent, not occasionally brilliant. Same OS every room: structure → prioritize → quantify → influence. Pace yourself; end on a recommendation.",
        },
        {
          type: "insight",
          heading: "What the interviewers are really testing",
          body:
            "Across a Superday, the panel is triangulating a single question: <strong>would I want this person in the room with a CEO?</strong> They're watching for structure under pressure, judgment in prioritization, numeracy, and the maturity to influence without arrogance. A consistent, composed signal across rounds beats one dazzling answer and three uneven ones.",
        },
        {
          type: "read",
          heading: "Now run a full mock",
          body: [
            "You've trained every station — the operating model, returns, diagnostics, influence, behaviorals, technicals, and firm intel. The last step is to perform them in sequence under the clock.",
            "Go to the <strong>Mock Superday</strong> and run the full chain: motivation → behavioral + case → paper-LBO + technicals → fit. It's AI-graded and ends in a scorecard with your top three things to fix. Run it, fix the gaps, and run it again.",
          ],
          keyIdea: "Finish the journey in the Mock Superday — the full chain, AI-graded, with a scorecard and top-3 fixes.",
        },
        {
          type: "check",
          heading: "Lesson check",
          questions: [
            { q: "The hardest part of a Superday is…", options: ["any one question", "consistency under fatigue", "the dress code", "the commute"], correct: 1 },
            { q: "The operating system to carry into every room is…", options: ["improvise", "structure → prioritize → quantify → influence", "talk fast", "avoid recommendations"], correct: 1 },
            { q: "Where do you run a full timed mock in this app?", options: ["Drills", "the Mock Superday", "Review", "Firms"], correct: 1 },
          ],
        },
      ],
    },
  ],

  checkpoint: {
    passingPct: 80,
    questions: [
      { q: "A Superday is…", options: ["a 30-minute screen", "a chained, timed sequence of back-to-back rounds", "an exam", "a mixer"], correct: 1 },
      { q: "It's usually run…", options: ["1:1", "2:1, back-to-back", "by email", "as a group"], correct: 1 },
      { q: "The first round pairs…", options: ["two cases", "a behavioral + an operational case", "two technicals", "resume + essay"], correct: 1 },
      { q: "The technical block has…", options: ["a coding test", "a returns/paper-LBO drill + operational technicals", "an essay", "a game"], correct: 1 },
      { q: "The final round tests…", options: ["typing", "fit + strategic thinking", "accounting", "coding"], correct: 1 },
      { q: "A Superday requires which new skills?", options: ["many new frameworks", "none — your fundamentals under pressure", "accounting", "coding"], correct: 1 },
      { q: "The hardest part is…", options: ["one question", "consistency under fatigue", "dress code", "commute"], correct: 1 },
      { q: "Carry which OS into every room?", options: ["improvise", "structure → prioritize → quantify → influence", "talk fast", "no recommendation"], correct: 1 },
      { q: "Brief pauses to think read as…", options: ["weakness", "composure", "rudeness", "confusion"], correct: 1 },
      { q: "Run a full timed mock in…", options: ["Drills", "the Mock Superday", "Review", "Firms"], correct: 1 },
    ],
  },
};
