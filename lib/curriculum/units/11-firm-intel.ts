import type { Unit } from "../types";

export const UNIT_FIRM_INTEL: Unit = {
  slug: "firm-intel",
  stage: 5,
  order: 2,
  icon: "🏢",
  title: "Firm intel",
  tagline: "Know the models, the processes, and where you fit across the major ops groups.",
  lessons: [
    // ── Lesson 1: the models recapped ─────────────────────────────────────────
    {
      slug: "fi-models",
      title: "The models, recapped",
      summary: "Centralized, embedded, and operator-led — with the firm map.",
      estMinutes: 7,
      pages: [
        {
          type: "read",
          heading: "Know which model you're walking into",
          body: [
            "By now you know the structural question: where do the operators sit? It shapes every behavioral answer — how you'd drive change, prioritize, and work with a deal team depends on the model. Knowing a target firm's model before the interview is table stakes.",
            "<strong>Centralized</strong>: one pooled fund-level team serving all PortCos (KKR Capstone, Bain Capital Portfolio Group, Vista VCG, Blackstone Portfolio Operations, Apollo APPS). <strong>Embedded</strong>: operators sit inside sector deal teams (Carlyle, TPG Operations). <strong>Operator-led</strong>: senior operating partners are integral to the thesis itself (CD&R).",
            "A centralized shop will probe how you drive change without budget authority across ten PortCos; an embedded shop will probe how you keep PE-owner discipline while 'going native' in one company. Same competencies, different framing.",
          ],
          keyIdea:
            "Centralized (Capstone, Blackstone) · Embedded (Carlyle, TPG) · Operator-led (CD&R). Know your target's model — it frames every answer.",
        },
        {
          type: "compare",
          heading: "The three models",
          columns: ["Centralized", "Embedded"],
          rows: [
            { dim: "Where talent sits", a: "Pooled, fund-level", b: "Inside sector/deal teams" },
            { dim: "Examples", a: "KKR Capstone, Blackstone PortOps, Vista VCG", b: "Carlyle, TPG Operations" },
            { dim: "Strength", a: "Cross-portfolio scale & playbooks", b: "Sector depth & deal-team alignment" },
            { dim: "They'll probe", a: "Driving change across many PortCos", b: "Keeping PE discipline while embedded" },
          ],
        },
        {
          type: "mcq",
          heading: "Check your understanding",
          questions: [
            {
              q: "Which set is centralized?",
              options: [
                "Carlyle, TPG",
                "KKR Capstone, Blackstone Portfolio Operations, Vista VCG",
                "CD&R only",
                "None",
              ],
              correct: 1,
              fb: "Pooled fund-level teams: Capstone, Blackstone PortOps, Vista VCG.",
            },
            {
              q: "CD&R is best known for the…",
              options: ["centralized model", "embedded model", "operator-led model", "advisor model"],
              correct: 2,
              fb: "CD&R's senior operating partners are central to the thesis itself.",
            },
            {
              q: "Knowing a firm's model matters because it…",
              options: [
                "changes the comp",
                "frames how you'd drive change, prioritize, and work with the deal team",
                "is required by law",
                "sets the dress code",
              ],
              correct: 1,
              fb: "Same competencies, different framing depending on the model.",
            },
          ],
        },
        {
          type: "check",
          heading: "Lesson check",
          questions: [
            { q: "Carlyle and TPG are…", options: ["centralized", "embedded", "operator-led", "advisor"], correct: 1 },
            { q: "A centralized shop will probe…", options: ["sector depth", "driving change across many PortCos", "going native", "nothing"], correct: 1 },
            { q: "Vista's VCG applies a…", options: ["random approach", "standardized software value-creation playbook", "deal-only model", "no playbook"], correct: 1 },
          ],
        },
      ],
    },

    // ── Lesson 2: process, comp & fit ─────────────────────────────────────────
    {
      slug: "fi-process-comp-fit",
      title: "Process, comp & fit",
      summary: "The interview rounds, comp shape, and finding your fit.",
      estMinutes: 7,
      pages: [
        {
          type: "read",
          heading: "What the process looks like",
          body: [
            "A Capstone-style process runs four stages: an <strong>initial screen</strong> (motivation + resume), a <strong>first round</strong> (a behavioral plus a consulting-style operational case), a <strong>Superday</strong> (a 2:1 technical block with a returns/modeling exercise and operational technicals), and a <strong>final</strong> (fit and strategic thinking with senior partners). Other firms vary, but the shape — screen → case + behavioral → technical day → fit — is common.",
            "On <strong>comp</strong>: junior ops comp is broadly competitive with deal-side at the associate level. The real divergence is carry at senior levels — ops carry pools tend to be smaller than deal carry. Treat published numbers as approximate and re-verify each cycle.",
            "On <strong>fit</strong>: as an ex-consultant lighter on heavy modeling, the centralized ops groups (Capstone, Bain Capital PG) play to your strengths — operational cases and behavioral are the core screen, and the modeling bar is lighter than an investment seat.",
          ],
          keyIdea:
            "Process: screen → case + behavioral → Superday technical block → fit. Junior comp ≈ deal-side; carry diverges at senior levels. Centralized groups fit an ex-consultant best.",
        },
        {
          type: "framework",
          heading: "The Capstone-style rounds",
          items: [
            { term: "Initial screen", detail: "Motivation + resume walkthrough. Why ops, why this firm." },
            { term: "First round", detail: "One behavioral + one consulting-style operational case." },
            { term: "Superday", detail: "2:1 technical block: returns/modeling exercise + 2–3 operational technicals." },
            { term: "Final", detail: "Fit and strategic thinking with senior partners." },
          ],
        },
        {
          type: "read",
          heading: "Go deeper in Firm Intel",
          body: [
            "This is the overview — the full profiles live in the <strong>Firms</strong> section: model, interview process by round, comp bands, recruiting timeline, MBA accessibility, and a 'fit for me' note for each of the eight major ops groups.",
            "Browse them there and test yourself with the <strong>firm quiz</strong>. Comp figures are approximate and move every cycle — re-verify before any real interview.",
          ],
          keyIdea: "Full firm profiles + a firm quiz are in the Firms section. Comp figures are approximate — re-verify each cycle.",
        },
        {
          type: "mcq",
          heading: "Check your understanding",
          questions: [
            {
              q: "A Capstone-style first round typically includes…",
              options: [
                "a coding test",
                "a behavioral plus a consulting-style operational case",
                "only a resume chat",
                "a written essay",
              ],
              correct: 1,
              fb: "Behavioral + operational case is the first-round staple.",
            },
            {
              q: "Junior ops comp vs deal-side is…",
              options: ["far lower", "broadly competitive", "always higher", "unpaid"],
              correct: 1,
              fb: "Junior comp is broadly competitive; carry diverges at senior levels.",
            },
            {
              q: "For an ex-consultant lighter on modeling, the best fit is…",
              options: [
                "a deal-side associate seat",
                "centralized ops groups where cases + behavioral are the core screen",
                "a quant desk",
                "credit underwriting",
              ],
              correct: 1,
              fb: "Centralized ops groups reward operational cases and behavioral; lighter modeling bar.",
            },
          ],
        },
        {
          type: "check",
          heading: "Lesson check",
          questions: [
            { q: "The Superday technical block centers on…", options: ["a resume chat", "returns/modeling + operational technicals", "an essay", "a group exercise"], correct: 1 },
            { q: "The real comp divergence vs deal-side shows up in…", options: ["base salary", "carry at senior levels", "the screen", "signing bonus"], correct: 1 },
            { q: "Full firm profiles and the firm quiz live in…", options: ["Drills", "the Firms section", "Review", "Mentor"], correct: 1 },
          ],
        },
      ],
    },
  ],

  checkpoint: {
    passingPct: 80,
    questions: [
      { q: "Centralized firms include…", options: ["Carlyle, TPG", "KKR Capstone, Blackstone PortOps, Vista VCG", "CD&R only", "none"], correct: 1 },
      { q: "Carlyle and TPG are…", options: ["centralized", "embedded", "operator-led", "advisor"], correct: 1 },
      { q: "CD&R is best known for the…", options: ["centralized model", "embedded model", "operator-led model", "advisor model"], correct: 2 },
      { q: "Knowing a firm's model matters because it…", options: ["sets comp", "frames how you'd drive change and work with the deal team", "is legally required", "sets dress code"], correct: 1 },
      { q: "A Capstone-style first round has…", options: ["a coding test", "a behavioral + a consulting-style case", "a resume chat only", "an essay"], correct: 1 },
      { q: "The Superday technical block has…", options: ["a resume chat", "returns/modeling + operational technicals", "an essay", "a group game"], correct: 1 },
      { q: "Junior ops comp vs deal-side is…", options: ["far lower", "broadly competitive", "always higher", "unpaid"], correct: 1 },
      { q: "Comp diverges from deal-side mainly in…", options: ["base", "carry at senior levels", "the screen", "bonus"], correct: 1 },
      { q: "Best fit for an ex-consultant lighter on modeling…", options: ["deal-side associate", "centralized ops groups", "quant desk", "credit"], correct: 1 },
      { q: "Full firm profiles + the firm quiz are in…", options: ["Drills", "the Firms section", "Review", "Mentor"], correct: 1 },
    ],
  },
};
