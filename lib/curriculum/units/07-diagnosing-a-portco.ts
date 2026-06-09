import type { Unit } from "../types";

export const UNIT_DIAGNOSING_A_PORTCO: Unit = {
  slug: "diagnosing-a-portco",
  stage: 3,
  order: 2,
  icon: "🩺",
  title: "Diagnosing a PortCo",
  tagline: "Frame, benchmark, and prioritize — the case skill the operational interview tests.",
  lessons: [
    // ── Lesson 1: diagnose before you act ─────────────────────────────────────
    {
      slug: "dx-diagnose-before-act",
      title: "Diagnose before you act",
      summary: "The cardinal rule of the operational case.",
      estMinutes: 7,
      pages: [
        {
          type: "read",
          heading: "Action before diagnosis is the classic trap",
          body: [
            "Hand a candidate a struggling PortCo and the weak instinct is to jump straight to a solution — \"cut 10% of headcount,\" \"raise prices 5%.\" The strong move is the opposite: <strong>diagnose before you act</strong>.",
            "Diagnosis means decomposing the problem and benchmarking it against peers before committing to any move. If a company's margin lags peers by 600 bps, the first job is to find <em>where</em> those bps live — gross margin or SG&A, which lines — not to guess at a fix.",
            "This isn't slow. You can diagnose and capture quick wins in parallel. But leading with an action you can't yet justify is how you cut the wrong muscle and lose management's trust.",
          ],
          keyIdea:
            "Decompose and benchmark before recommending a move. Action-before-diagnosis is the single most common case failure.",
        },
        {
          type: "insight",
          heading: "What the interviewer is really testing",
          body:
            "The case isn't really about the answer — it's about your <strong>process</strong>. They want to see you structure the problem, ask for the right data, benchmark, and only then prioritize. A candidate who says \"first I'd decompose the margin gap against peers to size each driver\" has already passed the bar that the \"I'd cut costs\" candidate failed.",
        },
        {
          type: "mcq",
          heading: "Check your understanding",
          questions: [
            {
              q: "A PortCo's EBITDA margin lags peers by 600 bps at similar scale. Best FIRST move?",
              options: [
                "Cut headcount 10%",
                "Raise prices 5% across the board",
                "Decompose the cost base line-by-line vs benchmark",
                "Refinance the debt",
              ],
              correct: 2,
              fb: "Locate where the bps live before acting. Action-before-diagnosis is the trap.",
            },
            {
              q: "Why is 'refinance the debt' a wrong answer to an EBITDA-margin gap?",
              options: [
                "Debt is always optimal",
                "Interest sits below EBITDA — it can't explain an EBITDA-margin gap",
                "Refinancing is illegal",
                "It raises EBITDA",
              ],
              correct: 1,
              fb: "Interest is below the EBITDA line, so it can't be the cause of a margin gap.",
            },
            {
              q: "Diagnosing and capturing quick wins can be done…",
              options: ["never together", "in parallel", "only after a year", "only by the deal team"],
              correct: 1,
              fb: "You don't have to finish a perfect diagnosis before banking quick wins.",
            },
          ],
        },
        {
          type: "check",
          heading: "Lesson check",
          questions: [
            {
              q: "The cardinal rule of the operational case is…",
              options: ["act fast, diagnose later", "diagnose before you act", "always cut cost", "defer everything"],
              correct: 1,
            },
            {
              q: "The case mostly tests your…",
              options: ["final answer", "structured process", "Excel speed", "vocabulary"],
              correct: 1,
            },
            {
              q: "Decomposing a margin gap means splitting it into…",
              options: [
                "debt and equity",
                "gross margin and SG&A drivers vs benchmark",
                "revenue and net income",
                "assets and liabilities",
              ],
              correct: 1,
            },
          ],
        },
      ],
    },

    // ── Lesson 2: the margin-gap framework ────────────────────────────────────
    {
      slug: "dx-margin-gap-framework",
      title: "The margin-gap framework",
      summary: "How to attack a peer margin gap systematically.",
      estMinutes: 9,
      pages: [
        {
          type: "read",
          heading: "Decompose, locate, size, prioritize",
          body: [
            "When a company's margin lags peers, work it top-down through the P&L. Split the gap into <strong>gross margin</strong> (price, mix, input cost, productivity) and <strong>SG&A</strong> (sales, G&A, overhead). Locate which lines hold the bps, size each driver, then prioritize by ROI and feasibility.",
            "A concrete read: a distributor at 24% gross margin vs a 27% peer and 12% SG&A vs 10% peer has a ~500 bps EBITDA gap — about 300 bps in gross margin (likely pricing leakage) and 200 bps in SG&A. That immediately points you at pricing discipline first.",
            "The framework's power is that it converts a vague \"margins are low\" into a sized, ranked list of specific drivers — each of which maps to a lever you already know.",
          ],
          keyIdea:
            "Split the gap into gross margin and SG&A, locate the bps line-by-line vs benchmark, size each, then prioritize by ROI and feasibility.",
        },
        {
          type: "framework",
          heading: "Decomposing the P&L gap",
          items: [
            { term: "Gross margin — price", detail: "List-to-pocket leakage, discount discipline, escalation clauses." },
            { term: "Gross margin — mix", detail: "Product/customer/channel mix shifting toward lower-margin business." },
            { term: "Gross margin — input cost", detail: "Procurement and materials cost vs benchmark." },
            { term: "Gross margin — productivity", detail: "Labor and process efficiency in cost of goods." },
            { term: "SG&A — sales", detail: "Salesforce cost and effectiveness." },
            { term: "SG&A — G&A / overhead", detail: "Corporate and back-office cost; shared-services opportunity." },
          ],
        },
        {
          type: "worked",
          heading: "Walking a margin gap",
          intro: "Distributor at 12% EBITDA margin vs 17% peer — a 500 bps gap.",
          steps: [
            { label: "Gross margin", detail: "24% vs 27% peer → ~300 bps of the gap, concentrated in pricing/discount leakage." },
            { label: "SG&A", detail: "12% vs 10% peer → ~200 bps, in overhead and an unproductive salesforce." },
            { label: "Prioritize", detail: "Pricing discipline first (fast, ~150–300 bps of the gross-margin gap, drops to EBITDA), then SG&A productivity." },
            { label: "Pair it", detail: "Run working-capital takeout alongside for cash — no EBITDA risk while pricing ramps." },
          ],
          takeaway: "A 500 bps 'mystery' becomes two sized, ranked drivers that each map to a known lever.",
        },
        {
          type: "mcq",
          heading: "Check your understanding",
          questions: [
            {
              q: "A gross-margin gap vs peers most often points first at…",
              options: ["interest expense", "pricing / discount leakage", "the tax rate", "depreciation"],
              correct: 1,
              fb: "Undisciplined pricing is the usual first suspect in a gross-margin gap.",
            },
            {
              q: "After decomposing the gap, you prioritize by…",
              options: [
                "alphabetical order",
                "ROI and feasibility",
                "whatever is largest on the page",
                "management's least favorite",
              ],
              correct: 1,
              fb: "Size each driver, then rank by ROI and feasibility.",
            },
            {
              q: "Pairing pricing with a working-capital push is smart because…",
              options: [
                "both raise EBITDA",
                "working capital frees cash with no EBITDA risk while pricing ramps",
                "they are the same lever",
                "it avoids diagnosis",
              ],
              correct: 1,
              fb: "Working capital is a no-EBITDA-risk cash win that complements the slower pricing ramp.",
            },
          ],
        },
        {
          type: "check",
          heading: "Lesson check",
          questions: [
            {
              q: "The margin-gap framework splits the gap into…",
              options: ["debt and equity", "gross margin and SG&A", "revenue and tax", "fixed and variable only"],
              correct: 1,
            },
            {
              q: "Gross-margin drivers include…",
              options: [
                "price, mix, input cost, productivity",
                "interest and taxes",
                "debt tranches",
                "the exit multiple",
              ],
              correct: 0,
            },
            {
              q: "The framework's value is converting 'margins are low' into…",
              options: [
                "a single guess",
                "a sized, ranked list of specific drivers",
                "a refinancing plan",
                "a headcount cut",
              ],
              correct: 1,
            },
          ],
        },
      ],
    },

    // ── Lesson 3: prioritization ──────────────────────────────────────────────
    {
      slug: "dx-prioritization",
      title: "Prioritization",
      summary: "Choosing and sequencing the levers that matter.",
      estMinutes: 7,
      pages: [
        {
          type: "read",
          heading: "The answer is a ranking, not a list",
          body: [
            "Once you've diagnosed and sized the drivers, the case is won or lost on <strong>prioritization</strong>. A list of ten initiatives signals you can't choose; a ranked two or three with a reason signals judgment.",
            "Score each lever on four dimensions: <strong>impact</strong> (EBITDA/cash $), <strong>speed-to-value</strong>, <strong>feasibility / risk</strong>, and <strong>management capacity</strong> to absorb it. Lead with the fast, high-confidence, high-ROI items — the quick wins — then sequence the structural plays.",
            "Always close a case the same way: name your top two levers, why they're first (fast, high-ROI, feasible), what you'd track, and how you'd bring management along. That structure is the answer the interviewer is listening for.",
          ],
          keyIdea:
            "Score by impact × speed × feasibility × management capacity. Lead with quick high-ROI wins, then structural plays. Name your top two and why.",
        },
        {
          type: "framework",
          heading: "The prioritization lens",
          items: [
            { term: "Impact", detail: "How many EBITDA or cash dollars does it move?" },
            { term: "Speed-to-value", detail: "How fast does it land — weeks, months, or the whole hold?" },
            { term: "Feasibility / risk", detail: "How confident are we, and what could go wrong?" },
            { term: "Management capacity", detail: "Can the team absorb it without dropping the others? Bandwidth is finite." },
          ],
        },
        {
          type: "order",
          heading: "Sequence the case",
          intro: "Order the operational-case workflow.",
          items: [
            {
              tokens: [
                "Frame the situation and size the gap",
                "Diagnose the 2–3 root drivers vs benchmark",
                "Prioritize the highest-ROI levers",
                "Draft a 100-day plan with owners",
                "Name the metrics you'd track",
              ],
              label: "Operational-case flow",
            },
          ],
        },
        {
          type: "check",
          heading: "Lesson check",
          questions: [
            {
              q: "A strong case answer is…",
              options: [
                "the longest list of initiatives",
                "a ranked top 2–3 with reasons",
                "only cost cuts",
                "a single number",
              ],
              correct: 1,
            },
            {
              q: "The prioritization lens scores levers on…",
              options: [
                "impact × speed × feasibility × management capacity",
                "headcount only",
                "alphabetical order",
                "the exit multiple",
              ],
              correct: 0,
            },
            {
              q: "The biggest risk of too many parallel initiatives is…",
              options: [
                "too much cash",
                "overloading management capacity",
                "finishing early",
                "lowering the multiple",
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
        q: "The cardinal rule of the operational case is…",
        options: ["act first", "diagnose before you act", "always cut cost", "defer everything"],
        correct: 1,
      },
      {
        q: "Margin lags peers by 600 bps — best first move?",
        options: ["cut headcount 10%", "raise prices 5%", "decompose the cost base vs benchmark", "refinance"],
        correct: 2,
      },
      {
        q: "'Refinance the debt' can't explain an EBITDA-margin gap because…",
        options: ["it's illegal", "interest sits below EBITDA", "it raises EBITDA", "it lowers DSO"],
        correct: 1,
      },
      {
        q: "The margin-gap framework splits the gap into…",
        options: ["debt and equity", "gross margin and SG&A", "revenue and tax", "assets and liabilities"],
        correct: 1,
      },
      {
        q: "A gross-margin gap most often points first at…",
        options: ["interest", "pricing / discount leakage", "the tax rate", "depreciation"],
        correct: 1,
      },
      {
        q: "After sizing the drivers, prioritize by…",
        options: ["alphabetical order", "ROI and feasibility", "page position", "management's least favorite"],
        correct: 1,
      },
      {
        q: "The prioritization lens is…",
        options: [
          "impact × speed × feasibility × management capacity",
          "headcount only",
          "revenue only",
          "random",
        ],
        correct: 0,
      },
      {
        q: "A strong case answer is a…",
        options: ["ten-item list", "ranked top 2–3 with reasons", "single cost cut", "refinancing"],
        correct: 1,
      },
      {
        q: "You should lead with…",
        options: ["the biggest structural play", "quick, high-confidence, high-ROI wins", "everything at once", "nothing"],
        correct: 1,
      },
      {
        q: "The operational-case flow ends with…",
        options: ["framing", "naming the metrics you'd track", "diagnosis", "sourcing"],
        correct: 1,
      },
    ],
  },
};
