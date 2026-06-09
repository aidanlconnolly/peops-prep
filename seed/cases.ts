import type { cases } from "@/lib/db/schema";

type CaseSeed = typeof cases.$inferInsert;

/** Standard ops-case rubric weights — tuned per case but this is the default shape. */
const STANDARD_RUBRIC = {
  dimensions: [
    { key: "structure", label: "Structure", weight: 0.2, guidance: "Clear, MECE framing of the situation." },
    { key: "prioritization", label: "Prioritization", weight: 0.25, guidance: "Sequences the highest-ROI levers; not boil-the-ocean." },
    { key: "quantification", label: "Quantification", weight: 0.2, guidance: "Sizes the prize with the numbers given." },
    { key: "feasibility", label: "Feasibility", weight: 0.2, guidance: "Realistic given timeline, capacity, data." },
    { key: "change_mgmt", label: "Change management", weight: 0.15, guidance: "Brings management along; influence without authority." },
  ],
};

export const CASES: CaseSeed[] = [
  {
    id: "case-industrial-distributor",
    slug: "industrial-distributor",
    title: "Industrial distributor, post-close",
    sector: "Industrial distribution",
    companyContext:
      "A $200M-revenue industrial distributor just acquired by your fund. EBITDA margin is **12%** vs peers at **16–18%**. Pricing is fragmented and discretionary at the branch level, the cash conversion cycle is **95 days**, and there are **no commercial KPIs** — no win-rate, quote-to-order, or rep-productivity tracking. Management is tenured and proud of service levels.",
    prompt:
      "Walk through your approach: (1) **frame** the situation, (2) **diagnose** the 2–3 root issues, (3) **prioritize** the value-creation levers, (4) draft a **100-day plan**, and (5) name the **metrics** you'd track.",
    rubric: STANDARD_RUBRIC,
    exhibits: [
      {
        title: "P&L vs peer benchmark (% of revenue)",
        kind: "table",
        columns: ["Line", "Company", "Peer median"],
        rows: [
          ["Gross margin", "24%", "27%"],
          ["SG&A", "12%", "10%"],
          ["EBITDA margin", "12%", "17%"],
        ],
        note: "~300 bps of the gap is gross margin (pricing/discount leakage), ~200 bps is SG&A.",
      },
      {
        title: "Working capital",
        kind: "table",
        columns: ["Metric", "Company", "Peer median"],
        rows: [
          ["DSO (days)", "62", "45"],
          ["DIO (days)", "58", "40"],
          ["DPO (days)", "25", "35"],
          ["Cash conversion cycle", "95", "50"],
        ],
      },
    ],
    modelAnswer:
      "**Frame:** the 500 bps EBITDA gap splits ~300 bps gross margin and ~200 bps SG&A, with a large working-capital drag on cash (not EBITDA). **Diagnose:** (1) undisciplined branch-level pricing and discount leakage; (2) bloated, slow working capital (95 vs 50-day cycle); (3) no commercial visibility (no KPIs) masking sales effectiveness. **Prioritize:** pricing discipline first (fast, drops to EBITDA, ~150–300 bps of the gross-margin gap) and working-capital takeout (cash to pay down debt, no EBITDA risk) — the two highest-ROI early levers. SG&A productivity and commercial KPI build follow. **100-day plan:** install a pricing governance floor + discount approval workflow; stand up a weekly commercial KPI dashboard; launch DSO collections and inventory SKU-rationalization sprints; renegotiate top-vendor terms toward 35-day DPO. **Metrics:** pocket-price realization, discount leakage %, gross margin by branch, DSO/DIO/DPO and cash conversion cycle, win rate, quote-to-order, revenue/FTE. **Change-mgmt:** co-own the diagnosis with branch managers using their data; protect service levels explicitly to win the tenured team.",
    difficulty: 3,
  },
  {
    id: "case-saas-margin",
    slug: "saas-go-to-market",
    title: "B2B SaaS with stalled growth",
    sector: "Software (B2B SaaS)",
    companyContext:
      "A $120M-ARR vertical SaaS business. Net revenue retention has slipped from **115% to 102%**, CAC payback has crept to **22 months**, and sales rep productivity varies 4x between top and bottom quartiles. Gross margin is healthy at 78%. The sponsor underwrote continued 20%+ growth.",
    prompt:
      "How do you diagnose the growth slowdown and what value-creation levers would you prioritize to restore the underwriting case? Specify the metrics you'd track.",
    rubric: STANDARD_RUBRIC,
    exhibits: [
      {
        title: "Growth & efficiency",
        kind: "table",
        columns: ["Metric", "Now", "At entry"],
        rows: [
          ["Net revenue retention", "102%", "115%"],
          ["Gross retention", "88%", "92%"],
          ["CAC payback (months)", "22", "14"],
          ["New logo ARR growth", "8%", "18%"],
        ],
      },
    ],
    modelAnswer:
      "Decompose growth into new-logo vs expansion vs churn. The NRR drop (115%→102%) and gross-retention slip point to a **retention/expansion problem**, not just top-of-funnel. Prioritize: (1) churn root-cause + customer-success motion and product adoption; (2) expansion/cross-sell playbook to rebuild NRR; (3) salesforce effectiveness — close the 4x productivity spread via coverage, enablement, and comp before hiring more reps (which would worsen CAC payback). Metrics: NRR/GRR by cohort, logo and dollar churn, expansion ARR %, ramp time, pipeline coverage, rep productivity distribution, CAC payback. Change-mgmt: partner with the CRO; use the productivity data to drive enablement, not blame.",
    difficulty: 3,
  },
  {
    id: "case-consumer-cost",
    slug: "consumer-products-cost",
    title: "Consumer products margin compression",
    sector: "Consumer packaged goods",
    companyContext:
      "A $350M-revenue CPG maker whose EBITDA margin fell from 15% to 11% over two years as input costs rose and the team held list prices flat to protect volume. Procurement is decentralized across three plants; there is meaningful SKU complexity (4,000 SKUs, long tail <1% of revenue).",
    prompt:
      "Frame the margin compression, prioritize levers to recover it, and outline how you'd land price increases without losing the volume management fears.",
    rubric: STANDARD_RUBRIC,
    exhibits: [
      {
        title: "Margin walk (EBITDA % of revenue)",
        kind: "table",
        columns: ["Driver", "bps impact"],
        rows: [
          ["Entry EBITDA margin", "15.0%"],
          ["Input cost inflation", "-500 bps"],
          ["Price increases taken", "+150 bps"],
          ["Volume/mix", "-40 bps"],
          ["Productivity", "+30 bps"],
          ["Current EBITDA margin", "11.0%"],
        ],
      },
    ],
    modelAnswer:
      "The walk shows ~500 bps of input inflation only partly recovered by 150 bps of pricing — a **price-realization gap**, plus decentralized procurement and SKU complexity. Prioritize: (1) targeted, elasticity-informed pricing (not flat list increases) with pack-price architecture to protect key-value items; (2) procurement consolidation across the three plants (spend pooling, supplier renegotiation); (3) SKU rationalization to cut the long tail and complexity cost. Land price by segmenting SKUs/customers by elasticity, leading with low-elasticity lines, adding escalation clauses, and piloting before rollout. Metrics: price realization, elasticity by segment, gross margin by SKU/plant, procurement savings vs baseline, SKU count and complexity cost.",
    difficulty: 2,
  },
  {
    id: "case-healthcare-services",
    slug: "healthcare-services-roll-up",
    title: "Healthcare services roll-up integration",
    sector: "Healthcare services",
    companyContext:
      "A multi-site outpatient services platform that has made 6 add-ons in 18 months. Integration is lagging: each clinic runs its own scheduling and billing systems, back-office headcount scales linearly with sites, and there's no standardized clinical or revenue-cycle KPI set. The thesis relies on integration synergies and multiple arbitrage at exit.",
    prompt:
      "Diagnose why the synergies aren't landing and prioritize the integration levers. What metrics prove the platform is actually scaling?",
    rubric: STANDARD_RUBRIC,
    exhibits: [
      {
        title: "Integration status",
        kind: "table",
        columns: ["Function", "Standardized?", "Back-office FTEs / site"],
        rows: [
          ["Scheduling", "No", "2.1"],
          ["Revenue cycle / billing", "No", "3.4"],
          ["Procurement", "Partial", "—"],
          ["Clinical KPIs", "No", "—"],
        ],
      },
    ],
    modelAnswer:
      "Synergies aren't landing because the platform bought revenue but never **integrated the operating spine** — systems, back office, and KPIs remain site-specific, so cost scales linearly and there's no comparability. Prioritize: (1) standardize on one scheduling + revenue-cycle platform and centralize billing (the biggest FTE-leverage and cash-collection win); (2) shared-services back office to break the linear FTE/site relationship; (3) a common clinical + revenue-cycle KPI set to manage the platform as one entity. Metrics: back-office FTEs/site, days in AR, denial rate, clean-claim rate, utilization per provider, cost per visit, integration milestone completion. Change-mgmt: respect clinical autonomy while standardizing the administrative layer; sequence migrations to avoid disrupting patient care.",
    difficulty: 3,
  },
];
