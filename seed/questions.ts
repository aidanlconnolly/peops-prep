import type { questions } from "@/lib/db/schema";

type QuestionSeed = typeof questions.$inferInsert;

/**
 * Question bank across all five runner types: mc, numeric, order, fill, scenario.
 * `choices` hold display options for mc/scenario/order; `answer` is the typed key.
 */
export const QUESTIONS: QuestionSeed[] = [
  // ── Numeric: paper-LBO core ──
  {
    id: "q-paper-lbo-1",
    topicId: "returns-lbo-math",
    type: "numeric",
    prompt:
      "Entry EV **$1,000M** at 10.0x EBITDA, financed **60% debt / 40% equity**. EBITDA grows **$100M → $150M** over 5 years; exit at **10.0x**; net debt paid down to **$400M** at exit. What is the MOIC and approximate IRR?",
    choices: null,
    answer: {
      type: "numeric",
      fields: [
        { key: "moic", label: "MOIC", value: 2.75, tol: 0.05, unit: "x" },
        { key: "irr", label: "Approx IRR", value: 22, tolPct: 0.12, unit: "%" },
      ],
    },
    explanation:
      "Exit EV = $150M × 10.0x = **$1,500M**. Exit equity = $1,500M − $400M net debt = **$1,100M**. Entry equity = 40% × $1,000M = **$400M**. MOIC = 1,100 / 400 = **2.75x**. Over 5 years, 2.75x ≈ **~22% IRR** (between the 2.5x→20% and 3.0x→25% anchors; Rule of 72 sanity-checks it).",
    difficulty: 2,
    timeLimitSec: 240,
    tags: ["paper-lbo", "moic", "irr"],
  },
  {
    id: "q-paper-lbo-2",
    topicId: "returns-lbo-math",
    type: "numeric",
    prompt:
      "You buy a business for **$500M** EV with **$300M** of debt. Over the hold EBITDA is flat, but you pay down **$150M** of debt and exit at the same EV. What is the MOIC on the $200M of entry equity?",
    choices: null,
    answer: {
      type: "numeric",
      fields: [{ key: "moic", label: "MOIC", value: 1.75, tol: 0.02, unit: "x" }],
    },
    explanation:
      "Exit equity = $500M EV − ($300M − $150M) net debt = $500M − $150M = **$350M**. MOIC = 350 / 200 = **1.75x** — entirely from debt paydown, with zero EBITDA growth or multiple expansion.",
    difficulty: 2,
    timeLimitSec: 180,
    tags: ["paper-lbo", "debt-paydown"],
  },
  {
    id: "q-irr-anchor",
    topicId: "returns-lbo-math",
    type: "numeric",
    prompt:
      "A deal returns a **3.0x MOIC** over a **5-year** hold. Approximately what IRR is that?",
    choices: null,
    answer: {
      type: "numeric",
      fields: [{ key: "irr", label: "IRR", value: 25, tolPct: 0.08, unit: "%" }],
    },
    explanation:
      "3.0x over 5 years ≈ **~25% IRR** (3^(1/5) − 1 = 24.6%). Memorize the 5-year anchors: 2.0x≈15%, 2.5x≈20%, 3.0x≈25%, 4.0x≈32%.",
    difficulty: 2,
    timeLimitSec: 90,
    tags: ["irr", "anchors"],
  },
  {
    id: "q-entry-equity-num",
    topicId: "returns-lbo-math",
    type: "numeric",
    prompt:
      "A company with **$80M** EBITDA is bought at **9.0x**. Debt is **5.0x** EBITDA. Ignoring fees, how much sponsor equity is required ($M)?",
    choices: null,
    answer: {
      type: "numeric",
      fields: [{ key: "equity", label: "Sponsor equity", value: 320, tol: 1, unit: "$M" }],
    },
    explanation:
      "EV = $80M × 9.0x = $720M. Debt = $80M × 5.0x = $400M. Equity = $720M − $400M = **$320M** (4.0x of EBITDA).",
    difficulty: 2,
    timeLimitSec: 120,
    tags: ["sources-uses", "equity"],
  },
  // ── MC ──
  {
    id: "q-flat-multiple",
    topicId: "returns-levers",
    type: "mc",
    prompt:
      "In a deal where you exit at the **same multiple** you paid, which factors contribute to the equity return?",
    choices: [
      { id: "a", text: "EBITDA growth and debt paydown" },
      { id: "b", text: "Multiple expansion only" },
      { id: "c", text: "Multiple expansion and EBITDA growth" },
      { id: "d", text: "Debt paydown and multiple expansion" },
    ],
    answer: { type: "mc", correct: ["a"], multi: false },
    explanation:
      "A flat multiple means zero contribution from multiple expansion. Return comes from **EBITDA growth and debt paydown** — the two levers an ops team can actually underwrite.",
    difficulty: 1,
    timeLimitSec: 60,
    tags: ["levers", "multiple"],
  },
  {
    id: "q-ops-lever-fastest",
    topicId: "diagnostics-levers",
    type: "mc",
    prompt:
      "Which value-creation lever typically flows most directly to EBITDA with the least incremental cost?",
    choices: [
      { id: "a", text: "Headcount reduction" },
      { id: "b", text: "Disciplined pricing" },
      { id: "c", text: "A new ERP system" },
      { id: "d", text: "An add-on acquisition" },
    ],
    answer: { type: "mc", correct: ["b"], multi: false },
    explanation:
      "A price increase carries almost no incremental cost, so it drops nearly fully to EBITDA, and it's fast. ERP and add-ons are slow and capital/risk-heavy; headcount cuts help but disrupt.",
    difficulty: 2,
    timeLimitSec: 60,
    tags: ["pricing", "levers"],
  },
  {
    id: "q-centralized-model",
    topicId: "firm-models",
    type: "mc",
    prompt:
      "Which pairing correctly describes a **centralized** vs **embedded** ops model?",
    choices: [
      { id: "a", text: "Centralized: KKR Capstone / Blackstone PortOps; Embedded: Carlyle / TPG" },
      { id: "b", text: "Centralized: Carlyle / TPG; Embedded: KKR Capstone / Blackstone" },
      { id: "c", text: "Both Capstone and Carlyle are purely embedded" },
      { id: "d", text: "Centralized means operators are external advisors only" },
    ],
    answer: { type: "mc", correct: ["a"], multi: false },
    explanation:
      "A pooled, dedicated central team (Capstone, Blackstone PortOps) serves all PortCos; embedded models place operators inside sector deal teams (Carlyle, TPG).",
    difficulty: 2,
    timeLimitSec: 60,
    tags: ["operating-model", "firms"],
  },
  {
    id: "q-wc-lever",
    topicId: "diagnostics-levers",
    type: "mc",
    prompt:
      "Reducing a PortCo's cash conversion cycle primarily improves returns by which mechanism?",
    choices: [
      { id: "a", text: "Raising reported EBITDA directly" },
      { id: "b", text: "Expanding the exit multiple" },
      { id: "c", text: "Freeing cash to pay down debt, lifting exit equity" },
      { id: "d", text: "Lowering the cost of debt" },
    ],
    answer: { type: "mc", correct: ["c"], multi: false },
    explanation:
      "Working capital is a balance-sheet lever: freeing cash accelerates debt paydown, shrinking net debt at exit and transferring EV to equity. It doesn't change EBITDA.",
    difficulty: 2,
    timeLimitSec: 75,
    tags: ["working-capital"],
  },
  {
    id: "q-multi-select-ops",
    topicId: "fundamentals-operating-model",
    type: "mc",
    prompt:
      "Select ALL that are typically responsibilities of a portfolio-operations team (vs the deal team).",
    choices: [
      { id: "a", text: "Building the value-creation plan with management" },
      { id: "b", text: "Negotiating the purchase price and structure" },
      { id: "c", text: "Installing KPIs and a reporting cadence post-close" },
      { id: "d", text: "Leading pricing and cost initiatives during the hold" },
    ],
    answer: { type: "mc", correct: ["a", "c", "d"], multi: true },
    explanation:
      "Pricing/structure negotiation is the deal team's job. Ops owns the VCP, governance/KPIs, and execution of operational initiatives.",
    difficulty: 2,
    timeLimitSec: 75,
    tags: ["operating-model", "role"],
  },
  // ── Scenario MC ──
  {
    id: "q-margin-gap-scenario",
    topicId: "diagnostics-frameworks",
    type: "scenario",
    prompt:
      "A PortCo's EBITDA margin lags peers by **600 bps** despite similar scale. What is the best FIRST diagnostic move?",
    choices: [
      {
        id: "a",
        text: "Decompose the cost base line-by-line vs benchmark",
        rationale:
          "Correct. Isolate where the 600 bps actually live (gross margin vs SG&A, which lines) before committing to any action.",
      },
      {
        id: "b",
        text: "Cut headcount 10% to close the gap",
        rationale:
          "Action before diagnosis. You don't yet know the gap is a people-cost problem; you could cut the wrong muscle.",
      },
      {
        id: "c",
        text: "Raise prices 5% across the board",
        rationale:
          "Premature and blunt. The gap may be cost-side, and untargeted price increases risk volume and customer churn.",
      },
      {
        id: "d",
        text: "Refinance the debt to lower interest",
        rationale:
          "Interest sits below EBITDA — it can't explain an EBITDA-margin gap. Wrong part of the P&L entirely.",
      },
    ],
    answer: { type: "scenario", correct: "a" },
    explanation:
      "Diagnose before acting. Decompose the P&L against the benchmark to locate the bps, size each driver, then prioritize. Action-before-diagnosis is the classic case trap.",
    difficulty: 2,
    timeLimitSec: 90,
    tags: ["frameworks", "margin"],
  },
  {
    id: "q-resistant-mgmt-scenario",
    topicId: "technicals-scenarios",
    type: "scenario",
    prompt:
      "A PortCo CEO is skeptical of your procurement-savings thesis and won't commit. What's the best next move?",
    choices: [
      {
        id: "a",
        text: "Escalate to the board to mandate the initiative",
        rationale:
          "Burns trust early. Governance is a last-resort forcing function, not a first move; you need the CEO as an ally.",
      },
      {
        id: "b",
        text: "Co-own a diagnosis using their own spend data and pilot one category",
        rationale:
          "Correct. Quantify the prize with their data, de-risk with a small pilot, and let evidence build the case.",
      },
      {
        id: "c",
        text: "Drop the initiative and move to a different lever",
        rationale:
          "Abandons real value. The resistance is a process problem, not a sign the prize isn't there.",
      },
      {
        id: "d",
        text: "Hand the CEO a 40-page deck of vendor benchmarks",
        rationale:
          "Volume isn't persuasion. A pilot tied to their incentives lands better than an external benchmark dump.",
      },
    ],
    answer: { type: "scenario", correct: "b" },
    explanation:
      "Influence without authority: co-own the diagnosis with their data, quantify the prize, pilot small, tie it to their incentives, and keep the board as a gentle backstop — not the opening move.",
    difficulty: 3,
    timeLimitSec: 90,
    tags: ["influence", "change"],
  },
  {
    id: "q-sequencing-scenario",
    topicId: "diagnostics-frameworks",
    type: "scenario",
    prompt:
      "You have a 90-day window and five credible levers. How should you sequence them?",
    choices: [
      {
        id: "a",
        text: "Start with the largest, most structural initiative",
        rationale:
          "Big structural plays are slow and risky; leading with them delays proof and strains management capacity.",
      },
      {
        id: "b",
        text: "Run all five in parallel for maximum coverage",
        rationale:
          "Overloads management bandwidth and dilutes focus — the boil-the-ocean failure mode.",
      },
      {
        id: "c",
        text: "Lead with quick, high-confidence wins, then fund the bigger plays",
        rationale:
          "Correct. Early wins earn credibility and cash, which buys the right to pursue harder structural change.",
      },
      {
        id: "d",
        text: "Wait 90 days to finish a perfect diagnosis before acting",
        rationale:
          "Analysis paralysis. You can diagnose and capture quick wins simultaneously in the first 100 days.",
      },
    ],
    answer: { type: "scenario", correct: "c" },
    explanation:
      "Sequence by speed-to-value and confidence first. Quick wins build trust and self-fund the structural initiatives that take the rest of the hold.",
    difficulty: 2,
    timeLimitSec: 90,
    tags: ["prioritization", "100-day"],
  },
  // ── Ordering ──
  {
    id: "q-order-sources-uses",
    topicId: "returns-lbo-math",
    type: "order",
    prompt: "Order the steps of a **Sources & Uses** build.",
    choices: [
      { id: "rollover", text: "Add management rollover" },
      { id: "ev", text: "Determine purchase enterprise value" },
      { id: "plug", text: "Solve for sponsor equity (the plug)" },
      { id: "leverage", text: "Set leverage / debt tranches" },
      { id: "fees", text: "Add fees & financing costs" },
    ],
    answer: {
      type: "order",
      correct: ["ev", "leverage", "fees", "plug", "rollover"],
    },
    explanation:
      "Determine purchase EV → set leverage/debt tranches → add fees & financing costs → solve for sponsor equity (plug) → add management rollover. Sources must equal uses.",
    difficulty: 2,
    timeLimitSec: 120,
    tags: ["sources-uses"],
  },
  {
    id: "q-order-paper-lbo",
    topicId: "returns-lbo-math",
    type: "order",
    prompt: "Order the steps to solve a paper LBO from entry to return.",
    choices: [
      { id: "exitev", text: "Exit EV = exit EBITDA × exit multiple" },
      { id: "entryeq", text: "Entry equity = EV − debt raised" },
      { id: "moic", text: "MOIC = exit equity ÷ entry equity" },
      { id: "exiteq", text: "Exit equity = exit EV − net debt at exit" },
      { id: "irr", text: "Approximate IRR from MOIC and hold period" },
    ],
    answer: {
      type: "order",
      correct: ["entryeq", "exitev", "exiteq", "moic", "irr"],
    },
    explanation:
      "Entry equity → exit EV → exit equity → MOIC → approximate IRR. Build the bookends (entry and exit equity) first, then the multiple, then annualize.",
    difficulty: 2,
    timeLimitSec: 120,
    tags: ["paper-lbo"],
  },
  {
    id: "q-order-100-day",
    topicId: "fundamentals-value-plan",
    type: "order",
    prompt: "Order a sensible flow for the first 100 days post-close.",
    choices: [
      { id: "kpis", text: "Stand up governance, KPIs, and reporting cadence" },
      { id: "diagnose", text: "Diagnose and validate the value-creation thesis" },
      { id: "scope", text: "Scope and resource the big-ticket initiatives" },
      { id: "quickwins", text: "Capture quick wins to build credibility" },
    ],
    answer: {
      type: "order",
      correct: ["diagnose", "kpis", "quickwins", "scope"],
    },
    explanation:
      "Validate the thesis → install governance/KPIs so you can see → bank quick wins for credibility/cash → scope and resource the structural plays for the rest of the hold.",
    difficulty: 2,
    timeLimitSec: 120,
    tags: ["100-day"],
  },
  // ── Fill-in-the-blank ──
  {
    id: "q-fill-moic",
    topicId: "returns-lbo-math",
    type: "fill",
    prompt:
      "The acronym **MOIC** stands for Multiple on ______ Capital. (one word)",
    choices: null,
    answer: { type: "fill", accepted: ["invested", "invest"] },
    explanation: "MOIC = Multiple on **Invested** Capital.",
    difficulty: 1,
    timeLimitSec: 45,
    tags: ["moic"],
  },
  {
    id: "q-fill-three-levers",
    topicId: "returns-levers",
    type: "fill",
    prompt:
      "Besides EBITDA growth and debt paydown, the third lever of LBO returns is multiple ______. (one word)",
    choices: null,
    answer: { type: "fill", accepted: ["expansion", "expand", "rerating", "re-rating"] },
    explanation:
      "The three levers are EBITDA growth, debt paydown, and **multiple expansion** (a.k.a. re-rating).",
    difficulty: 1,
    timeLimitSec: 45,
    tags: ["levers"],
  },
  {
    id: "q-fill-dso",
    topicId: "diagnostics-levers",
    type: "fill",
    prompt:
      "Collecting receivables faster reduces **DSO** — Days Sales ______. (one word)",
    choices: null,
    answer: { type: "fill", accepted: ["outstanding"] },
    explanation: "DSO = Days Sales **Outstanding**, a core working-capital metric.",
    difficulty: 2,
    timeLimitSec: 45,
    tags: ["working-capital"],
  },
  {
    id: "q-fill-rule-72",
    topicId: "returns-lbo-math",
    type: "fill",
    prompt:
      "Years to double an investment ≈ ______ ÷ IRR%. (enter the number)",
    choices: null,
    answer: { type: "fill", accepted: ["72"] },
    explanation: "Rule of **72**: years to double ≈ 72 ÷ IRR%.",
    difficulty: 1,
    timeLimitSec: 30,
    tags: ["rule-of-72"],
  },

  // ── Firm intel ──
  {
    id: "q-firm-operator-led",
    topicId: "firm-models",
    type: "mc",
    prompt:
      "Which firm is most associated with pioneering the **operator-led** model, where operating partners (often former CEOs) are integral to the investment thesis?",
    choices: [
      { id: "a", text: "KKR Capstone" },
      { id: "b", text: "Clayton, Dubilier & Rice (CD&R)" },
      { id: "c", text: "Vista Equity Partners" },
      { id: "d", text: "Apollo" },
    ],
    answer: { type: "mc", correct: ["b"], multi: false },
    explanation:
      "CD&R pioneered the operator-led model — senior operating partners (often ex-CEOs) sit at the heart of the thesis, not in a separate support function.",
    difficulty: 2,
    timeLimitSec: 45,
    tags: ["firms", "models"],
  },
  {
    id: "q-firm-centralized-set",
    topicId: "firm-models",
    type: "mc",
    prompt: "Select ALL that run a primarily **centralized** ops model.",
    choices: [
      { id: "a", text: "KKR Capstone" },
      { id: "b", text: "Blackstone Portfolio Operations" },
      { id: "c", text: "Carlyle" },
      { id: "d", text: "TPG Operations" },
    ],
    answer: { type: "mc", correct: ["a", "b"], multi: true },
    explanation:
      "Capstone and Blackstone PortOps are centralized pooled teams; Carlyle and TPG lean embedded/sector-aligned.",
    difficulty: 2,
    timeLimitSec: 60,
    tags: ["firms", "models"],
  },
  {
    id: "q-firm-vista",
    topicId: "firm-models",
    type: "scenario",
    prompt:
      "You can speak fluently about NRR, CAC payback, and the Rule of 40. Which ops group best rewards that?",
    choices: [
      {
        id: "a",
        text: "Vista Consulting Group (VCG)",
        rationale: "Correct — Vista is software-specialized and applies a standardized SaaS value-creation playbook.",
      },
      {
        id: "b",
        text: "CD&R",
        rationale: "More diversified/industrial and operator-led; SaaS metrics aren't the core lens.",
      },
      {
        id: "c",
        text: "Apollo APPS",
        rationale: "Strong on cost/procurement across a value-oriented portfolio, not SaaS-specialized.",
      },
      {
        id: "d",
        text: "Carlyle",
        rationale: "Sector-aligned and embedded, not SaaS-playbook-driven.",
      },
    ],
    answer: { type: "scenario", correct: "a" },
    explanation:
      "Vista/VCG is the software specialist — fluency in SaaS metrics maps directly to its standardized playbook model.",
    difficulty: 2,
    timeLimitSec: 60,
    tags: ["firms"],
  },
  {
    id: "q-firm-blackstone",
    topicId: "firm-models",
    type: "mc",
    prompt:
      "Blackstone Portfolio Operations is especially known for driving value through what, leveraging its scale?",
    choices: [
      { id: "a", text: "Cross-portfolio programs (e.g. group purchasing, healthcare benefits)" },
      { id: "b", text: "High-frequency trading" },
      { id: "c", text: "Pure financial engineering" },
      { id: "d", text: "Founder-led product design" },
    ],
    answer: { type: "mc", correct: ["a"], multi: false },
    explanation:
      "Blackstone leverages its portfolio scale for cross-cutting programs like group purchasing and healthcare benefits.",
    difficulty: 2,
    timeLimitSec: 45,
    tags: ["firms"],
  },
  {
    id: "q-firm-mba-access",
    topicId: "firm-models",
    type: "scenario",
    prompt:
      "As an incoming MBA + ex-MBB consultant who is lighter on heavy LBO modeling, which seat plays MOST to your strengths?",
    choices: [
      {
        id: "a",
        text: "A centralized portfolio-ops group (e.g. KKR Capstone)",
        rationale: "Correct — operational cases + behavioral are the core screen, and the modeling bar is lighter than an investment seat.",
      },
      {
        id: "b",
        text: "A deal-side investing associate role",
        rationale: "Modeling- and structuring-intensive — exactly the area you're lighter on.",
      },
      {
        id: "c",
        text: "A quant trading desk",
        rationale: "Unrelated skill set.",
      },
      {
        id: "d",
        text: "A credit underwriting seat",
        rationale: "Heavy on financial structuring, not operational value creation.",
      },
    ],
    answer: { type: "scenario", correct: "a" },
    explanation:
      "Centralized ops groups screen on operational cases and behavioral fit; consulting diagnosis + execution is the edge, and modeling is lighter.",
    difficulty: 2,
    timeLimitSec: 60,
    tags: ["firms", "fit"],
  },
  {
    id: "q-firm-fill-capstone",
    topicId: "firm-models",
    type: "fill",
    prompt:
      "KKR's centralized portfolio-operations team is branded as KKR ______. (one word)",
    choices: null,
    answer: { type: "fill", accepted: ["capstone"] },
    explanation: "KKR's ops team is **Capstone**.",
    difficulty: 1,
    timeLimitSec: 30,
    tags: ["firms"],
  },
];
