import type { Unit } from "../types";

export const UNIT_STAR_AND_STORIES: Unit = {
  slug: "star-and-stories",
  stage: 4,
  order: 2,
  icon: "⭐",
  title: "STAR & your stories",
  tagline: "Structure behavioral answers and build a reusable bank of anecdotes the mentor can draw on.",
  lessons: [
    // ── Lesson 1: STAR ────────────────────────────────────────────────────────
    {
      slug: "ss-star",
      title: "STAR structure",
      summary: "The structure that keeps behavioral answers tight and evidence-led.",
      estMinutes: 7,
      pages: [
        {
          type: "read",
          heading: "Situation, Task, Action, Result",
          body: [
            "<strong>STAR</strong> is the standard structure for a behavioral answer: <strong>Situation</strong> (brief context), <strong>Task</strong> (your specific objective), <strong>Action</strong> (what <em>you</em> did), and <strong>Result</strong> (the quantified outcome).",
            "The most common mistake is spending too long on Situation and Task. Keep those to ~20% — just enough to set the stage. The interview is listening for your <strong>Actions</strong>, so that's where the time goes, and it should be \"I\" not \"we.\"",
            "Always close on a <strong>quantified Result</strong> — a number, a percentage, an outcome — plus, ideally, a sentence on what you learned. For ops roles, weave in the resistance you handled and the influence you used, since that's the competency being probed.",
          ],
          keyIdea:
            "STAR: keep S/T tight (~20%), make Action 'I'-led and detailed, close on a quantified Result. For ops, surface the influence and resistance you handled.",
        },
        {
          type: "framework",
          heading: "The four parts",
          items: [
            { term: "Situation (~10%)", detail: "Brief context — where, when, the stakes. Don't over-set the scene." },
            { term: "Task (~10%)", detail: "Your specific objective or the problem you owned." },
            { term: "Action (~60%)", detail: "What YOU did, step by step. 'I', not 'we'. This is the substance." },
            { term: "Result (~20%)", detail: "The quantified outcome + a brief learning. Numbers land." },
          ],
        },
        {
          type: "mcq",
          heading: "Check your understanding",
          questions: [
            {
              q: "In a STAR answer, the bulk of your time should go to…",
              options: ["Situation", "Task", "Action", "Background"],
              correct: 2,
              fb: "Action is the substance — that's what's being evaluated.",
            },
            {
              q: "The most common STAR mistake is…",
              options: [
                "Quantifying the result",
                "Over-spending on Situation and Task",
                "Using 'I'",
                "Mentioning influence",
              ],
              correct: 1,
              fb: "Keep S/T to ~20%; the interview wants your actions.",
            },
            {
              q: "A strong Result is…",
              options: [
                "vague and modest",
                "quantified, with a brief learning",
                "left implicit",
                "about the team only",
              ],
              correct: 1,
              fb: "Close on a number plus what you learned.",
            },
          ],
        },
        {
          type: "check",
          heading: "Lesson check",
          questions: [
            { q: "STAR stands for…", options: ["Situation, Task, Action, Result", "Story, Theme, Answer, Recap", "Setup, Tension, Arc, Resolution", "Scope, Time, Ask, Reply"], correct: 0 },
            { q: "Action should be framed as…", options: ["'we'", "'I'", "passive voice", "hypothetical"], correct: 1 },
            { q: "For an ops role, weave in…", options: ["your GPA", "the influence and resistance you handled", "your hobbies", "stock picks"], correct: 1 },
          ],
        },
      ],
    },

    // ── Lesson 2: story bank ──────────────────────────────────────────────────
    {
      slug: "ss-story-bank",
      title: "Your story bank",
      summary: "Pre-building reusable anecdotes mapped to competencies.",
      estMinutes: 7,
      pages: [
        {
          type: "read",
          heading: "Prepare stories, not answers",
          body: [
            "You can't predict every behavioral question, but you can predict the <strong>competencies</strong> they probe: influence without authority, driving change, commitment to ops, conflict, leadership, and failure. Build one or two strong stories for each, and most questions become a matter of selecting and angling the right one.",
            "A good ops story bank draws on real experience. Your BCG work is rich here — a federal shipyard-throughput project (driving operational change with no authority over the yard), buyside/sellside diligence (forming and defending a thesis), and an arbitrage modeling build (analytical rigor under pressure). Each can be angled to multiple competencies.",
            "PeOps Prep has a <strong>\"My stories\" library</strong> in the Behavioral section — save your anecdotes there, tagged to competencies, so they're sharp and reusable, and so the AI mentor can reference them when it grades you.",
          ],
          keyIdea:
            "Prepare stories by competency, not answers by question. One strong story can serve several competencies if you angle it.",
        },
        {
          type: "framework",
          heading: "Competencies to cover",
          items: [
            { term: "Influence without authority", detail: "Drove change through people who didn't report to you." },
            { term: "Driving change", detail: "Delivered an uncomfortable, data-led message and moved a decision." },
            { term: "Commitment to ops", detail: "Why PE operations, and why not a deal seat." },
            { term: "Conflict", detail: "A substantive disagreement with a senior stakeholder, resolved." },
            { term: "Leadership", detail: "Led a team through ambiguity or pressure." },
            { term: "Failure / learning", detail: "A real failure you owned and changed behavior from." },
          ],
        },
        {
          type: "insight",
          heading: "What the interviewer is really testing",
          body:
            "A polished story bank shows preparation and self-awareness — but the tell of a strong candidate is <strong>specificity and ownership</strong>. \"I\" not \"we\", a real number, and an honest learning. Save your anecdotes in the <em>Behavioral → My stories</em> library and rehearse them out loud until S/T is tight and the Action is sharp.",
        },
        {
          type: "check",
          heading: "Lesson check",
          questions: [
            { q: "The smart way to prep behaviorals is to…", options: ["memorize an answer per question", "build stories by competency", "wing it", "avoid numbers"], correct: 1 },
            { q: "A single strong story can…", options: ["only serve one question", "be angled to several competencies", "never be reused", "replace STAR"], correct: 1 },
            { q: "Where do you store reusable anecdotes in this app?", options: ["the Drills tab", "Behavioral → My stories", "the Firms tab", "nowhere"], correct: 1 },
          ],
        },
      ],
    },

    // ── Lesson 3: why ops not deal ────────────────────────────────────────────
    {
      slug: "ss-why-ops",
      title: "Why ops, not deal",
      summary: "The commitment question every ops interview asks.",
      estMinutes: 6,
      pages: [
        {
          type: "read",
          heading: "The commitment question",
          body: [
            "\"Why PE operations, and why not a deal-side seat?\" is asked in nearly every ops interview, because firms want to know your interest is genuine, not a fallback from a missed investing role.",
            "The strong answer ties your trajectory to the work: you want to <strong>build value inside companies, not just price and structure them</strong>. Consulting taught you to diagnose and drive change with management — the exact muscle ops uses — and PE-ops is where that skill compounds, with real ownership of outcomes over a hold.",
            "Be honest about the trade-off, which signals you understand the role: less modeling and structuring, more time in the weeds of operations and the management relationship. Framing the trade-off as a feature, not a concession, is what lands.",
          ],
          keyIdea:
            "Want to build value, not just price it. Consulting → diagnosis + driving change → ops compounds it. Own the trade-off (less modeling, more operations) as a feature.",
        },
        {
          type: "insight",
          heading: "What the interviewer is really testing",
          body:
            "They're filtering for <strong>genuine fit and self-awareness</strong>. A red flag is an answer that sounds like a deal-side pitch with 'operations' swapped in. A green flag connects specific past experience (e.g. an operational project where you drove change) to why the ops seat is the natural next step — and acknowledges the modeling trade-off without apology.",
        },
        {
          type: "mcq",
          heading: "Check your understanding",
          questions: [
            {
              q: "A strong 'why ops not deal' answer centers on…",
              options: [
                "wanting to price and structure deals",
                "wanting to build value inside companies",
                "avoiding hard work",
                "the higher pay",
              ],
              correct: 1,
              fb: "Ops is about building value operationally, not pricing/structuring.",
            },
            {
              q: "The trade-off to acknowledge is…",
              options: [
                "less operations, more modeling",
                "less modeling/structuring, more operations and management",
                "no trade-off exists",
                "less pay forever",
              ],
              correct: 1,
              fb: "Owning the trade-off as a feature signals real understanding.",
            },
            {
              q: "A red flag in this answer is…",
              options: [
                "connecting past operational experience",
                "sounding like a deal-side pitch with 'ops' swapped in",
                "acknowledging the modeling trade-off",
                "specificity",
              ],
              correct: 1,
              fb: "If it reads as a fallback from investing, you've failed the fit test.",
            },
          ],
        },
        {
          type: "check",
          heading: "Lesson check",
          questions: [
            { q: "The commitment question is asked because firms want…", options: ["to fill time", "genuine, non-fallback interest", "your GPA", "a stock pitch"], correct: 1 },
            { q: "Consulting maps to ops because it taught you to…", options: ["build LBO models", "diagnose and drive change with management", "raise debt", "trade"], correct: 1 },
            { q: "The trade-off should be framed as…", options: ["a concession to apologize for", "a feature you're choosing", "irrelevant", "a secret"], correct: 1 },
          ],
        },
      ],
    },
  ],

  checkpoint: {
    passingPct: 80,
    questions: [
      { q: "STAR stands for…", options: ["Situation, Task, Action, Result", "Story, Theme, Answer, Recap", "Setup, Tension, Arc, Resolution", "Scope, Time, Ask, Reply"], correct: 0 },
      { q: "The bulk of a STAR answer should be…", options: ["Situation", "Task", "Action", "Background"], correct: 2 },
      { q: "Action should be framed in…", options: ["'we'", "'I'", "passive voice", "the conditional"], correct: 1 },
      { q: "A strong Result is…", options: ["vague", "quantified with a brief learning", "implicit", "team-only"], correct: 1 },
      { q: "Prep behaviorals by…", options: ["answer per question", "stories by competency", "improvisation", "avoiding numbers"], correct: 1 },
      { q: "A single strong story can…", options: ["serve one question only", "be angled to several competencies", "never be reused", "replace STAR"], correct: 1 },
      { q: "Reusable anecdotes live in…", options: ["Drills", "Behavioral → My stories", "Firms", "nowhere"], correct: 1 },
      { q: "'Why ops not deal' centers on…", options: ["pricing deals", "building value inside companies", "avoiding work", "pay"], correct: 1 },
      { q: "The ops trade-off is…", options: ["more modeling", "less modeling, more operations & management", "none", "less pay forever"], correct: 1 },
      { q: "A red flag is an answer that…", options: ["connects real experience", "sounds like a deal pitch with 'ops' swapped in", "owns the trade-off", "is specific"], correct: 1 },
    ],
  },
};
