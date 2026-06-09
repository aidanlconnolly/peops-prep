import type { Unit } from "../types";

export const UNIT_VALUE_CREATION_LEVERS: Unit = {
  slug: "value-creation-levers",
  stage: 3,
  order: 1,
  icon: "🔧",
  title: "Value-creation levers",
  tagline: "The operational toolkit — pricing, commercial, cost, procurement, working capital, M&A.",
  lessons: [
    // ── Lesson 1: the lever map ───────────────────────────────────────────────
    {
      slug: "vcl-lever-map",
      title: "The lever map",
      summary: "The full menu of operational value-creation levers.",
      estMinutes: 8,
      pages: [
        {
          type: "read",
          heading: "A menu, not a checklist",
          body: [
            "Operational value creation isn't one move — it's a menu of levers, and the art is choosing the right two or three for a given company. They split roughly into <strong>revenue levers</strong> (grow or improve the top line and margin) and <strong>cost & capital levers</strong> (take out cost or free up cash).",
            "Revenue: <strong>pricing</strong> (discipline, architecture, leakage), <strong>commercial excellence</strong> (salesforce effectiveness, churn, cross-sell), and <strong>M&A add-ons</strong> (scale and integration).",
            "Cost & capital: <strong>cost takeout</strong> (structural cost, footprint, SG&A), <strong>procurement</strong> (third-party spend), <strong>working capital</strong> (the cash conversion cycle), and increasingly <strong>digital / AI</strong> (productivity). Org design cuts across both.",
          ],
          keyIdea:
            "Revenue levers: pricing, commercial, M&A. Cost & capital levers: cost takeout, procurement, working capital, digital. Pick 2–3, don't run them all.",
        },
        {
          type: "framework",
          heading: "The lever map",
          items: [
            { term: "Pricing", detail: "Price discipline, pack/price architecture, discount-leakage control. Often the fastest, highest-ROI early lever." },
            { term: "Commercial excellence", detail: "Salesforce effectiveness, churn reduction, cross/up-sell, channel mix." },
            { term: "Cost takeout", detail: "Structural cost: headcount, footprint, SG&A, productivity." },
            { term: "Procurement", detail: "Third-party spend: supplier renegotiation, consolidation, demand management. Fast and less disruptive." },
            { term: "Working capital", detail: "Reduce the cash conversion cycle (DSO, DIO, DPO) to free cash for debt paydown." },
            { term: "Digital / AI", detail: "Automation and analytics-driven productivity across functions." },
            { term: "M&A add-ons", detail: "Buy-and-build for scale, multiple arbitrage, and synergies — integration is the hard part." },
          ],
        },
        {
          type: "mcq",
          heading: "Check your understanding",
          questions: [
            {
              q: "Which is a balance-sheet (cash) lever rather than a P&L (EBITDA) lever?",
              options: ["Pricing", "Working capital", "Cost takeout", "Commercial excellence"],
              correct: 1,
              fb: "Working capital frees cash; it doesn't change EBITDA directly.",
            },
            {
              q: "Which lever typically flows most directly to EBITDA with the least incremental cost?",
              options: ["A new ERP", "Disciplined pricing", "An add-on acquisition", "A new factory"],
              correct: 1,
              fb: "Price increases carry almost no incremental cost, so they drop nearly fully to EBITDA.",
            },
            {
              q: "The hardest part of an M&A add-on strategy is usually…",
              options: ["finding targets", "integration", "raising debt", "naming the platform"],
              correct: 1,
              fb: "Most synergy misses are integration-execution failures, not bad theses.",
            },
          ],
        },
        {
          type: "check",
          heading: "Lesson check",
          questions: [
            {
              q: "Procurement targets…",
              options: ["internal headcount", "third-party / supplier spend", "the exit multiple", "the debt"],
              correct: 1,
            },
            {
              q: "Working capital improvements help returns by…",
              options: ["raising EBITDA", "freeing cash to pay down debt", "expanding the multiple", "cutting taxes"],
              correct: 1,
            },
            {
              q: "The right approach to the lever menu is to…",
              options: ["run every lever at once", "pick the 2–3 highest-ROI for this company", "only ever cut cost", "wait and do nothing"],
              correct: 1,
            },
          ],
        },
      ],
    },

    // ── Lesson 2: pricing & working capital ───────────────────────────────────
    {
      slug: "vcl-pricing-working-capital",
      title: "Pricing & working capital",
      summary: "The two highest-ROI early levers, and the cash conversion cycle.",
      estMinutes: 10,
      pages: [
        {
          type: "read",
          heading: "The two levers that usually go first",
          body: [
            "On most lower-mid-market deals, the first two levers an operating team reaches for are <strong>pricing</strong> and <strong>working capital</strong>. Both are fast, high-ROI, and low-disruption — ideal quick wins.",
            "Pricing wins because most companies have <em>leakage</em>: a gap between list price and pocket price (what actually lands after discounts and rebates), undisciplined branch-level discounting, and no escalation clauses. Closing that gap drops almost entirely to EBITDA.",
            "Working capital wins because cash trapped in the business can be freed without touching EBITDA — and that cash pays down debt, lifting equity value. The metric is the <strong>cash conversion cycle</strong>: DSO + DIO − DPO.",
          ],
          keyIdea:
            "Pricing closes the list-to-pocket leakage (drops to EBITDA). Working capital frees trapped cash (pays down debt). Both are fast quick wins.",
        },
        {
          type: "worked",
          heading: "Pricing realization",
          intro: "Why pricing is so powerful — a leakage example.",
          steps: [
            { label: "List price", detail: "$100 per unit." },
            { label: "Pocket price", detail: "After volume discounts, rebates, and off-invoice terms, you actually realize $82." },
            { label: "The leakage", detail: "$18 of every $100 of list 'leaks' away — much of it undisciplined and recoverable." },
            { label: "The prize", detail: "Recovering even a third of the leakage adds $6/unit — and with little incremental cost, nearly all of it is EBITDA." },
          ],
          takeaway: "Pricing is rarely about raising list prices — it's about stopping the leakage between list and pocket.",
        },
        {
          type: "worked",
          heading: "The cash conversion cycle",
          intro: "How long cash is tied up in operations.",
          steps: [
            { label: "DSO — days sales outstanding", detail: "How long to collect receivables. Lower is better." },
            { label: "DIO — days inventory outstanding", detail: "How long inventory sits before sale. Lower is better." },
            { label: "DPO — days payable outstanding", detail: "How long you take to pay suppliers. Higher is better." },
            { label: "Cash cycle", detail: "DSO + DIO − DPO. A 62 + 58 − 25 = 95-day cycle vs a 45 + 40 − 35 = 50-day peer is 45 days of trapped cash to free." },
          ],
          takeaway: "Reduce DSO and DIO, extend DPO. Each freed day of cash goes to debt paydown.",
        },
        {
          type: "numeric",
          heading: "Compute the cash cycle",
          prompt: "DSO 62, DIO 58, DPO 25. What is the cash conversion cycle (days)?",
          fields: [{ key: "ccc", label: "Cash cycle", value: 95, unit: "d", tol: 0.5 }],
          worked: "DSO + DIO − DPO = 62 + 58 − 25 = 95 days.",
        },
        {
          type: "check",
          heading: "Lesson check",
          questions: [
            {
              q: "'Pocket price' is…",
              options: [
                "the list price",
                "what you actually realize after discounts and rebates",
                "the cost",
                "the competitor's price",
              ],
              correct: 1,
            },
            {
              q: "The cash conversion cycle is…",
              options: ["DSO + DIO + DPO", "DSO + DIO − DPO", "DSO − DIO − DPO", "DPO − DSO"],
              correct: 1,
            },
            {
              q: "To shorten the cash cycle you want to…",
              options: [
                "raise DSO and DIO",
                "lower DSO and DIO, and raise DPO",
                "lower DPO",
                "raise all three",
              ],
              correct: 1,
            },
          ],
        },
      ],
    },

    // ── Lesson 3: cost, procurement & commercial ──────────────────────────────
    {
      slug: "vcl-cost-procurement-commercial",
      title: "Cost, procurement & commercial",
      summary: "Distinguishing the cost levers and the growth lever.",
      estMinutes: 8,
      pages: [
        {
          type: "read",
          heading: "Two kinds of cost, one kind of growth",
          body: [
            "It's worth being precise about the cost levers, because interviewers test whether you conflate them. <strong>Cost takeout</strong> is internal and structural — headcount, footprint, SG&A, productivity. <strong>Procurement</strong> is third-party spend — renegotiating suppliers, consolidating vendors, managing demand and specs.",
            "Procurement is often the better first move: it's faster, less disruptive to the organization, and doesn't cut into growth muscle. Cost takeout is more powerful but riskier — cut the wrong thing and you damage the business.",
            "<strong>Commercial excellence</strong> is the growth counterweight: salesforce effectiveness, churn reduction, cross-sell. It compounds and supports the exit multiple, but it's slower and harder to underwrite than cost. The usual sequence is quick cost/cash wins first, funding investment in commercial growth.",
          ],
          keyIdea:
            "Cost takeout = internal/structural. Procurement = third-party spend (faster, safer). Commercial = growth (slower, compounding). Sequence cost/cash first to fund growth.",
        },
        {
          type: "compare",
          heading: "Cost takeout vs procurement",
          columns: ["Cost takeout", "Procurement"],
          rows: [
            { dim: "Targets", a: "Internal cost (headcount, footprint, SG&A)", b: "Third-party / supplier spend" },
            { dim: "Speed", a: "Slower, more planning", b: "Faster to capture" },
            { dim: "Disruption", a: "Higher — can hit the org", b: "Lower — mostly external" },
            { dim: "Risk", a: "Can cut growth muscle", b: "Limited operational risk" },
          ],
        },
        {
          type: "mcq",
          heading: "Check your understanding",
          questions: [
            {
              q: "Renegotiating supplier contracts and consolidating vendors is…",
              options: ["cost takeout", "procurement", "commercial excellence", "working capital"],
              correct: 1,
              fb: "Third-party spend = procurement.",
            },
            {
              q: "Compared with cost takeout, procurement is generally…",
              options: [
                "slower and more disruptive",
                "faster and less disruptive",
                "identical",
                "only about headcount",
              ],
              correct: 1,
              fb: "Procurement is faster and doesn't cut into the organization.",
            },
            {
              q: "The risk of aggressive cost takeout is…",
              options: [
                "too much cash",
                "cutting into growth muscle and damaging the business",
                "raising the multiple",
                "lowering DSO",
              ],
              correct: 1,
              fb: "Cut the wrong cost and you impair the very growth you're underwriting.",
            },
          ],
        },
        {
          type: "check",
          heading: "Lesson check",
          questions: [
            {
              q: "Cost takeout primarily targets…",
              options: ["supplier spend", "internal/structural cost", "the exit multiple", "receivables"],
              correct: 1,
            },
            {
              q: "Commercial excellence is best described as a ___ lever.",
              options: ["cash", "growth", "tax", "financing"],
              correct: 1,
            },
            {
              q: "A common sequence is…",
              options: [
                "growth investment first, then any quick wins",
                "quick cost/cash wins first, funding commercial growth",
                "only cost, never growth",
                "nothing until exit",
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
        q: "Which is a cash (balance-sheet) lever?",
        options: ["pricing", "working capital", "cost takeout", "commercial excellence"],
        correct: 1,
      },
      {
        q: "Which usually flows most directly to EBITDA with least incremental cost?",
        options: ["a new ERP", "disciplined pricing", "an add-on", "a new plant"],
        correct: 1,
      },
      {
        q: "'Pocket price' is…",
        options: ["list price", "realized price after discounts/rebates", "cost", "MSRP"],
        correct: 1,
      },
      {
        q: "Cash conversion cycle = …",
        options: ["DSO + DIO + DPO", "DSO + DIO − DPO", "DPO − DSO − DIO", "DSO − DPO"],
        correct: 1,
      },
      {
        q: "DSO 45, DIO 40, DPO 35. Cash cycle (days)?",
        options: ["50", "60", "120", "40"],
        correct: 0,
      },
      {
        q: "Procurement targets…",
        options: ["internal headcount", "third-party spend", "the multiple", "equity"],
        correct: 1,
      },
      {
        q: "Compared with cost takeout, procurement is generally…",
        options: ["slower/more disruptive", "faster/less disruptive", "identical", "riskier"],
        correct: 1,
      },
      {
        q: "Commercial excellence is a ___ lever.",
        options: ["cash", "growth", "financing", "tax"],
        correct: 1,
      },
      {
        q: "The risk of aggressive cost takeout is…",
        options: ["too much cash", "cutting growth muscle", "raising DPO", "expanding the multiple"],
        correct: 1,
      },
      {
        q: "The right approach to the lever menu is to…",
        options: ["run all levers at once", "pick the 2–3 highest-ROI for the company", "only cut cost", "do nothing"],
        correct: 1,
      },
    ],
  },
};
