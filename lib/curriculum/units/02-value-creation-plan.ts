import type { Unit } from "../types";

export const UNIT_VALUE_CREATION_PLAN: Unit = {
  slug: "value-creation-plan",
  stage: 1,
  order: 2,
  icon: "🗺️",
  title: "The value-creation plan",
  tagline:
    "The 100-day plan, the EBITDA bridge, and how to sequence initiatives so they actually land.",
  lessons: [
    // ── Lesson 1: the 100-day plan ────────────────────────────────────────────
    {
      slug: "vcp-100-day-plan",
      title: "The 100-day plan",
      summary: "The prioritized roadmap for the first ~100 days post-close.",
      estMinutes: 9,
      pages: [
        {
          type: "read",
          heading: "The first 100 days set the cadence for the hold",
          body: [
            "The moment a deal closes, the clock starts. The <strong>100-day plan</strong> is the prioritized roadmap executed in roughly the first three months of ownership. It's the front end of the broader <em>value-creation plan</em> (VCP) — the thesis-linked set of initiatives for the entire hold.",
            "The 100 days aren't about doing everything. They're about three things: banking a few <strong>quick wins</strong> to build credibility and cash, standing up <strong>governance and KPIs</strong> so you can actually see the business, and <strong>scoping and resourcing</strong> the big structural initiatives that will play out over years.",
            "Done well, the 100-day plan earns the operating team the right to be in the room for the harder changes later. Done badly — boiling the ocean, no visible wins, management alienated — and the rest of the hold is an uphill fight.",
          ],
          keyIdea:
            "100-day plan = quick wins + governance/KPIs stood up + the big initiatives scoped and resourced. Not everything at once.",
        },
        {
          type: "framework",
          heading: "What goes into a 100-day plan",
          items: [
            { term: "Validate the thesis", detail: "Confirm where the EBITDA and cash upside actually is, with real data — quickly, before committing resources." },
            { term: "Governance & KPIs", detail: "Install a small KPI set and a weekly/monthly reporting cadence so the business is visible and decisions are data-driven." },
            { term: "Quick wins", detail: "Capture 2–3 fast, high-confidence wins (pricing leakage, an easy procurement renegotiation, a collections push) for credibility and cash." },
            { term: "Scope the big plays", detail: "Define, owner, resource, and milestone the structural initiatives (pricing system, cost program, commercial transformation, M&A) for the rest of the hold." },
            { term: "Management alignment", detail: "Bring the leadership team along — co-own the diagnosis, protect what's working, and set the operating rhythm together." },
          ],
        },
        {
          type: "worked",
          heading: "A 100-day sequence in practice",
          intro: "How the pieces typically phase across the first 100 days.",
          steps: [
            { label: "Days 0–15", detail: "Validate the thesis with the team; pull the data; identify the 2–3 quick wins and the big-ticket initiatives." },
            { label: "Days 15–45", detail: "Stand up the KPI dashboard and reporting cadence; launch the quick wins (e.g. a pricing-leakage fix and a collections sprint)." },
            { label: "Days 45–80", detail: "Show early results from quick wins; scope and resource the structural initiatives with named owners and run-rate targets." },
            { label: "Days 80–100", detail: "Lock the value-creation plan, present to the board, and set the operating rhythm for the hold." },
          ],
          takeaway:
            "Quick wins early fund credibility; structural plays are scoped, not rushed. The 100 days build the runway, not the whole house.",
        },
        {
          type: "order",
          heading: "Sequence the 100 days",
          intro: "Put the phases in a sensible order.",
          items: [
            {
              tokens: [
                "Validate the value-creation thesis",
                "Stand up governance, KPIs, and reporting",
                "Capture quick wins for credibility and cash",
                "Scope and resource the big structural initiatives",
              ],
              label: "First-100-days flow",
            },
          ],
        },
        {
          type: "check",
          heading: "Lesson check",
          questions: [
            {
              q: "The 100-day plan is best described as…",
              options: [
                "A plan to complete every initiative in 100 days",
                "The prioritized roadmap for the first ~100 days: quick wins, governance, and scoping the big plays",
                "The legal closing checklist",
                "The debt repayment schedule",
              ],
              correct: 1,
            },
            {
              q: "Why lead with quick wins?",
              options: [
                "They're the largest source of value",
                "They build credibility and cash to fund the harder, structural initiatives",
                "Regulators require them",
                "They replace the value-creation plan",
              ],
              correct: 1,
            },
            {
              q: "The big structural initiatives in the first 100 days should be…",
              options: [
                "Fully completed",
                "Scoped, resourced, and given owners — to execute over the hold",
                "Ignored",
                "Handed entirely to the lenders",
              ],
              correct: 1,
            },
          ],
        },
      ],
    },

    // ── Lesson 2: the EBITDA bridge ───────────────────────────────────────────
    {
      slug: "vcp-ebitda-bridge",
      title: "The EBITDA bridge",
      summary: "Decomposing how EBITDA grows from entry to exit.",
      estMinutes: 10,
      pages: [
        {
          type: "read",
          heading: "How EBITDA actually grows",
          body: [
            "When you underwrite EBITDA growing from, say, $100M to $150M, you can't just assert it. You decompose the walk — the <strong>EBITDA bridge</strong> — into its drivers, so the plan is credible and each piece has an owner.",
            "A bridge separates what's happening to the business: how much growth comes from selling more (<em>volume</em>), from charging more or a better mix (<em>price/mix</em>), how much is eaten by rising input costs (<em>cost inflation</em>), how much you claw back through efficiency (<em>productivity / cost-out</em>), and any one-time or run-rate adjustments.",
            "The bridge is the backbone of the value-creation plan: every initiative maps to a line on it. Pricing discipline shows up in price/mix; a procurement program offsets cost inflation; a cost-takeout shows up in productivity.",
          ],
          keyIdea:
            "An EBITDA bridge decomposes EBITDA growth into volume, price/mix, cost inflation, productivity/cost-out, and one-offs. Every initiative maps to a line.",
        },
        {
          type: "framework",
          heading: "Components of an EBITDA bridge",
          items: [
            { term: "Volume", detail: "More (or fewer) units sold at existing economics." },
            { term: "Price / mix", detail: "Higher prices or a richer product/customer mix. Pricing initiatives live here." },
            { term: "Cost inflation", detail: "Input-cost increases that erode margin (usually a drag)." },
            { term: "Productivity / cost-out", detail: "Efficiency, procurement, and structural cost reduction that claw margin back." },
            { term: "One-offs / run-rate", detail: "Non-recurring items removed, or annualizing a partial-year change to its full run-rate." },
          ],
        },
        {
          type: "worked",
          heading: "Walking a bridge",
          intro: "Entry EBITDA is $100M. Build to the exit number.",
          steps: [
            { label: "Start: entry EBITDA", detail: "$100M." },
            { label: "+ Volume", detail: "Organic growth adds +$20M → $120M." },
            { label: "+ Price / mix", detail: "Pricing discipline adds +$25M → $145M." },
            { label: "− Cost inflation", detail: "Input costs cost −$15M → $130M." },
            { label: "+ Productivity / cost-out", detail: "Procurement + efficiency add +$20M → $150M." },
            { label: "Exit EBITDA", detail: "$150M — a +$50M build, fully attributed to drivers." },
          ],
          takeaway:
            "Each + or − is an initiative with an owner. \"EBITDA grows $50M\" is a hand-wave; the bridge makes it a plan.",
        },
        {
          type: "numeric",
          heading: "Compute the bridge",
          prompt:
            "Entry EBITDA $80M. Volume +$10M, price/mix +$18M, cost inflation −$12M, productivity +$9M. What is exit EBITDA ($M)?",
          fields: [
            { key: "exit", label: "Exit EBITDA", value: 105, unit: "$M", tol: 0.5 },
          ],
          worked:
            "80 + 10 + 18 − 12 + 9 = $105M. Add the positive drivers (volume, price/mix, productivity), subtract cost inflation.",
        },
        {
          type: "check",
          heading: "Lesson check",
          questions: [
            {
              q: "Which bridge component is usually a drag on EBITDA?",
              options: ["Price/mix", "Productivity", "Cost inflation", "Volume"],
              correct: 2,
            },
            {
              q: "A pricing-discipline initiative shows up on the bridge under…",
              options: ["Volume", "Price/mix", "Cost inflation", "One-offs"],
              correct: 1,
            },
            {
              q: "The point of building an EBITDA bridge is to…",
              options: [
                "Hide where growth comes from",
                "Attribute EBITDA growth to specific, owned drivers so the plan is credible",
                "Avoid setting targets",
                "Replace the income statement",
              ],
              correct: 1,
            },
          ],
        },
      ],
    },

    // ── Lesson 3: quick wins & sequencing ─────────────────────────────────────
    {
      slug: "vcp-sequencing",
      title: "Quick wins & sequencing",
      summary: "Why order of operations matters as much as the initiatives themselves.",
      estMinutes: 7,
      pages: [
        {
          type: "read",
          heading: "Sequencing is a lever, not an afterthought",
          body: [
            "You can have the right initiatives and still fail by running them in the wrong order — or all at once. Management bandwidth is finite, and credibility is a currency you spend.",
            "The default sequence: lead with <strong>quick, high-confidence wins</strong>. They prove the diagnosis, generate cash that can self-fund larger initiatives, and earn the operating team trust. Then deploy that credibility on the <strong>structural plays</strong> (a pricing system, a cost transformation, a commercial overhaul) that take the rest of the hold.",
            "Prioritize by a simple lens: <em>impact</em> (EBITDA/cash $) × <em>speed-to-value</em> × <em>feasibility/risk</em> × <em>management capacity</em>. Sequence high-confidence, fast, high-ROI items first. Don't boil the ocean.",
          ],
          keyIdea:
            "Quick wins first → credibility + cash → fund the structural plays. Prioritize by impact × speed × feasibility × capacity.",
        },
        {
          type: "insight",
          heading: "What the interviewer is really testing",
          body:
            "On a case, candidates love to list ten initiatives. The interviewer wants to see <strong>prioritization and sequencing</strong>: which two levers first, why (fast, high-confidence, high-ROI), and how you'd protect management bandwidth. \"I'd do everything\" is a fail; \"pricing and working capital first, here's why\" is a pass.",
        },
        {
          type: "mcq",
          heading: "Check your understanding",
          questions: [
            {
              q: "You have a 90-day window and five credible levers. The best move is to…",
              options: [
                "Start with the largest, most structural initiative",
                "Run all five in parallel",
                "Lead with quick, high-confidence wins, then fund the bigger plays",
                "Wait 90 days to finish a perfect diagnosis first",
              ],
              correct: 2,
              fb: "Quick wins build credibility and cash; the structural plays follow.",
            },
            {
              q: "Which is the best prioritization lens for value-creation initiatives?",
              options: [
                "Whatever management likes most",
                "Impact × speed-to-value × feasibility × management capacity",
                "Alphabetical order",
                "Largest headcount first",
              ],
              correct: 1,
              fb: "Score by impact, speed, feasibility/risk, and the capacity to absorb change.",
            },
            {
              q: "Leading with quick wins matters because…",
              options: [
                "They are always the biggest source of value",
                "They build credibility and cash that fund harder change",
                "They let you skip the value-creation plan",
                "They impress the lenders",
              ],
              correct: 1,
              fb: "Credibility earned early is the currency you spend on harder change later.",
            },
          ],
        },
        {
          type: "check",
          heading: "Lesson check",
          questions: [
            {
              q: "The biggest risk of running every initiative at once is…",
              options: [
                "Too much cash",
                "Overloading management bandwidth and diluting focus",
                "Finishing too early",
                "Nothing — more is always better",
              ],
              correct: 1,
            },
            {
              q: "On an operational case, a strong answer demonstrates…",
              options: [
                "The longest possible list of initiatives",
                "Clear prioritization and sequencing of the highest-ROI levers",
                "Only cost cuts",
                "Deferring all decisions",
              ],
              correct: 1,
            },
            {
              q: "Quick wins are valuable mainly because they…",
              options: [
                "Replace structural initiatives",
                "Generate credibility and self-funding cash for the harder plays",
                "Avoid the need for KPIs",
                "Are required by regulators",
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
        q: "The 100-day plan focuses on…",
        options: [
          "Completing every initiative in 100 days",
          "Quick wins, governance/KPIs, and scoping the big plays",
          "Only refinancing the debt",
          "Exit preparation",
        ],
        correct: 1,
      },
      {
        q: "The front end of the broader value-creation plan is the…",
        options: ["exit memo", "100-day plan", "purchase agreement", "audit"],
        correct: 1,
      },
      {
        q: "An EBITDA bridge decomposes growth into…",
        options: [
          "Debt, equity, and fees",
          "Volume, price/mix, cost inflation, productivity, and one-offs",
          "Revenue and net income only",
          "Assets and liabilities",
        ],
        correct: 1,
      },
      {
        q: "Pricing initiatives appear on the bridge under…",
        options: ["volume", "price/mix", "cost inflation", "one-offs"],
        correct: 1,
      },
      {
        q: "Entry EBITDA $90M; +$15M volume, +$20M price/mix, −$10M cost inflation, +$5M productivity. Exit EBITDA?",
        options: ["$110M", "$115M", "$120M", "$130M"],
        correct: 2,
      },
      {
        q: "The default initiative sequence is…",
        options: [
          "Biggest structural play first",
          "Everything in parallel",
          "Quick wins first, then fund the structural plays",
          "Nothing until a perfect diagnosis",
        ],
        correct: 2,
      },
      {
        q: "The best prioritization lens is…",
        options: [
          "Headcount",
          "Impact × speed × feasibility × management capacity",
          "Management's preference",
          "Random",
        ],
        correct: 1,
      },
      {
        q: "The biggest risk of doing everything at once is…",
        options: [
          "Too much focus",
          "Overloading management bandwidth",
          "Excess cash",
          "Finishing early",
        ],
        correct: 1,
      },
    ],
  },
};
