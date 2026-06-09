import type { Unit } from "../types";

export const UNIT_OPERATIONAL_TECHNICALS: Unit = {
  slug: "operational-technicals",
  stage: 5,
  order: 1,
  icon: "⚙️",
  title: "Operational technicals",
  tagline: "The scenario questions: measuring initiatives, landing change, prioritizing levers.",
  lessons: [
    // ── Lesson 1: measuring an initiative ─────────────────────────────────────
    {
      slug: "ot-measuring",
      title: "Measuring an initiative",
      summary: "Leading vs lagging indicators, against a baseline.",
      estMinutes: 8,
      pages: [
        {
          type: "read",
          heading: "If you can't measure it, you can't manage it",
          body: [
            "Operational technicals are scenario questions like \"how would you measure the effectiveness of a salesforce reorganization?\" The structure of a good answer is always the same: pair <strong>leading and lagging</strong> indicators, measure against a <strong>baseline</strong> (and a control where possible), and tie it back to the EBITDA thesis.",
            "<strong>Lagging</strong> indicators confirm results after the fact — revenue, win rate, EBITDA. <strong>Leading</strong> indicators predict them and let you course-correct — pipeline coverage, ramp time, activity ratios. A good KPI set pairs both, so you're not flying blind between lagging readouts.",
            "The trap is listing metrics with no baseline. \"Win rate\" means nothing without \"vs what, controlled for what.\" Always anchor to a before-state and isolate the initiative's effect from market noise.",
          ],
          keyIdea:
            "Pair leading + lagging indicators, measure vs a baseline (and control), and tie to the EBITDA thesis. Metrics without a baseline are noise.",
        },
        {
          type: "framework",
          heading: "Leading vs lagging",
          items: [
            { term: "Lagging — confirm", detail: "Revenue, win rate, EBITDA, quota attainment. Tell you what happened." },
            { term: "Leading — predict", detail: "Pipeline coverage, ramp time, activity/coverage ratios. Let you course-correct early." },
            { term: "Baseline", detail: "The before-state you measure change against." },
            { term: "Control", detail: "An unchanged cohort to isolate the initiative from market noise." },
          ],
        },
        {
          type: "worked",
          heading: "Measuring a salesforce reorg",
          intro: "How to answer the classic technical.",
          steps: [
            { label: "Leading", detail: "Ramp time, pipeline coverage, activity per rep, coverage ratios." },
            { label: "Lagging", detail: "Win rate, revenue per FTE, quota-attainment distribution, regretted attrition." },
            { label: "Baseline & control", detail: "Compare reorganized cohorts vs not; control for market and seasonality." },
            { label: "Watch the dip", detail: "Expect a short-term disruption before the productivity lift — don't kill it early." },
          ],
          takeaway: "Leading + lagging, baseline + control, expect the J-curve, tie to EBITDA. That's the whole answer.",
        },
        {
          type: "mcq",
          heading: "Check your understanding",
          questions: [
            {
              q: "Which is a LEADING indicator?",
              options: ["Win rate", "EBITDA", "Pipeline coverage", "Revenue per FTE"],
              correct: 2,
              fb: "Pipeline coverage predicts future results; the others confirm past ones.",
            },
            {
              q: "Metrics without a baseline are…",
              options: ["actionable", "noise", "leading indicators", "always lagging"],
              correct: 1,
              fb: "'Win rate' means nothing without 'vs what, controlled for what.'",
            },
            {
              q: "After a reorg you should expect…",
              options: [
                "an immediate productivity jump",
                "a short-term disruption before the lift",
                "no change ever",
                "lower attrition instantly",
              ],
              correct: 1,
              fb: "There's usually a J-curve dip before the gain — don't kill it early.",
            },
          ],
        },
        {
          type: "check",
          heading: "Lesson check",
          questions: [
            { q: "A good KPI set pairs…", options: ["two lagging metrics", "leading and lagging indicators", "only leading", "revenue and tax"], correct: 1 },
            { q: "A control group helps you…", options: ["raise EBITDA", "isolate the initiative from market noise", "skip the baseline", "lower DSO"], correct: 1 },
            { q: "Every measurement answer should tie back to…", options: ["the brand", "the EBITDA thesis", "headcount", "the logo"], correct: 1 },
          ],
        },
      ],
    },

    // ── Lesson 2: landing change & prioritizing ───────────────────────────────
    {
      slug: "ot-landing-prioritizing",
      title: "Landing change & prioritizing",
      summary: "Cost vs growth, and bringing a resistant team along.",
      estMinutes: 7,
      pages: [
        {
          type: "read",
          heading: "Two technicals you'll always get",
          body: [
            "Beyond measurement, two operational technicals come up constantly. <strong>\"Cost or growth first?\"</strong> — it depends on the thesis, hold, and risk: cost is faster, more certain, and self-funding, so favor it early when growth is structurally hard; growth compounds and supports the exit multiple but is slower and riskier. Usually you sequence quick cost/cash wins to fund growth investment.",
            "<strong>\"How do you land an initiative with a resistant team?\"</strong> — this is the influence playbook applied: co-own the diagnosis with their data, quantify the prize, pilot small, tie to incentives, keep governance as a gentle backstop. (You drilled this in Stage 4.)",
            "The meta-skill in all operational technicals is the same: a structured, prioritized answer that names the trade-off, picks a path with a reason, and shows you'd bring management along — not a laundry list.",
          ],
          keyIdea:
            "Cost vs growth: usually quick cost/cash wins first to fund growth. Landing change = the influence playbook. Always structure, prioritize, and name the trade-off.",
        },
        {
          type: "mcq",
          heading: "Check your understanding",
          questions: [
            {
              q: "When should you generally favor cost over growth levers first?",
              options: [
                "Never — growth always first",
                "When cost is fast/certain/self-funding and growth is structurally hard",
                "Only at exit",
                "When the CEO says so",
              ],
              correct: 1,
              fb: "Cost is faster and self-funding; sequence it to fund growth investment.",
            },
            {
              q: "Landing an initiative with a resistant team uses…",
              options: [
                "an immediate board mandate",
                "the influence playbook (co-own, quantify, pilot, incentives, backstop)",
                "a benchmark dump",
                "dropping the initiative",
              ],
              correct: 1,
              fb: "It's the same influence-without-authority sequence.",
            },
            {
              q: "The meta-skill in any operational technical is…",
              options: [
                "listing every possible lever",
                "a structured, prioritized answer that names the trade-off",
                "the longest answer",
                "avoiding a recommendation",
              ],
              correct: 1,
              fb: "Structure and prioritization beat a laundry list.",
            },
          ],
        },
        {
          type: "read",
          heading: "Practice these for real",
          body: [
            "Reading about technicals only gets you so far — the skill is generating a structured answer under pressure.",
            "Head to <strong>Behavioral → Ops technicals</strong> to type answers to real scenario prompts and get AI feedback against a rubric, and to <strong>Drills</strong> for the scenario-judgment questions. Then put it together in the <strong>Mock Superday</strong>.",
          ],
          keyIdea: "Practice: Behavioral → Ops technicals (AI-graded), Drills (scenarios), then the Mock Superday.",
        },
        {
          type: "check",
          heading: "Lesson check",
          questions: [
            { q: "Cost levers are generally…", options: ["slower and riskier", "faster, more certain, self-funding", "only for exit", "never used"], correct: 1 },
            { q: "Growth levers tend to…", options: ["be instant and certain", "compound and support the exit multiple, but slower/riskier", "lower EBITDA", "avoid management"], correct: 1 },
            { q: "Where do you practice ops technicals with AI feedback?", options: ["Firms", "Behavioral → Ops technicals", "Review", "Dashboard"], correct: 1 },
          ],
        },
      ],
    },
  ],

  checkpoint: {
    passingPct: 80,
    questions: [
      { q: "A good KPI set pairs…", options: ["two lagging metrics", "leading and lagging indicators", "only leading", "revenue and tax"], correct: 1 },
      { q: "Which is a leading indicator?", options: ["win rate", "EBITDA", "pipeline coverage", "revenue per FTE"], correct: 2 },
      { q: "Metrics without a baseline are…", options: ["actionable", "noise", "leading", "lagging"], correct: 1 },
      { q: "A control group lets you…", options: ["raise EBITDA", "isolate the initiative from market noise", "skip baselines", "lower DSO"], correct: 1 },
      { q: "After a reorg, expect…", options: ["instant jump", "a J-curve dip before the lift", "no change", "instant lower attrition"], correct: 1 },
      { q: "Measurement answers tie back to…", options: ["the brand", "the EBITDA thesis", "headcount", "the logo"], correct: 1 },
      { q: "Favor cost over growth first when…", options: ["never", "cost is fast/certain/self-funding and growth is hard", "only at exit", "the CEO says so"], correct: 1 },
      { q: "Landing change with a resistant team uses…", options: ["a board mandate first", "the influence playbook", "a benchmark dump", "dropping it"], correct: 1 },
      { q: "Growth levers are generally…", options: ["instant and certain", "slower/riskier but compounding", "EBITDA-reducing", "management-free"], correct: 1 },
      { q: "The meta-skill is…", options: ["listing every lever", "a structured, prioritized, trade-off-naming answer", "the longest answer", "no recommendation"], correct: 1 },
    ],
  },
};
