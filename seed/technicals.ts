import type { opsTechnicals } from "@/lib/db/schema";

type TechnicalSeed = typeof opsTechnicals.$inferInsert;

const TECH_RUBRIC = {
  dimensions: [
    { key: "structure", label: "Structure", weight: 0.25, guidance: "Organized, MECE answer." },
    { key: "metrics", label: "Right metrics / logic", weight: 0.3, guidance: "Names the correct levers and measures." },
    { key: "practicality", label: "Practicality", weight: 0.25, guidance: "Implementable, sequenced, realistic." },
    { key: "change_mgmt", label: "Stakeholder handling", weight: 0.2, guidance: "Brings people along." },
  ],
};

export const OPS_TECHNICALS: TechnicalSeed[] = [
  {
    id: "t-salesforce-reorg",
    prompt: "How would you measure the effectiveness of a salesforce reorganization?",
    idealAnswer:
      "Pair **leading and lagging** indicators against a **baseline** and, where possible, a control. Leading: ramp time, pipeline coverage, activity/coverage ratios. Lagging: win rate, rep productivity (revenue/FTE), quota attainment distribution, regretted attrition. Compare cohorts (reorganized vs not), control for market/seasonality, and watch for short-term disruption before the productivity lift. Tie back to the EBITDA thesis.",
    rubric: TECH_RUBRIC,
    tags: ["sales", "metrics"],
  },
  {
    id: "t-skeptical-ceo-procurement",
    prompt:
      "A skeptical CEO won't commit to a procurement initiative. How do you land it?",
    idealAnswer:
      "Co-own the diagnosis using **their** spend data, quantify the prize, pilot one category to de-risk and prove it, tie savings to their incentives, and keep the board as a gentle forcing function rather than the opening move. Persuade with evidence and a small win, not a benchmark dump.",
    rubric: TECH_RUBRIC,
    tags: ["procurement", "influence"],
  },
  {
    id: "t-cost-vs-growth",
    prompt:
      "How do you decide whether to prioritize cost takeout or growth levers in a given PortCo?",
    idealAnswer:
      "Depends on the thesis, hold timeline, and risk. Cost is faster, more certain, and self-funding — favor it early and when growth is structurally hard. Growth compounds and supports multiple at exit but is slower and riskier. Usually sequence quick cost/cash wins to fund growth investment, sizing each by ROI, speed, and management capacity. Avoid cutting into growth muscle.",
    rubric: TECH_RUBRIC,
    tags: ["prioritization"],
  },
  {
    id: "t-pricing-implementation",
    prompt:
      "Walk me through how you'd implement a pricing initiative at a PortCo without losing volume.",
    idealAnswer:
      "Segment SKUs/customers by **price elasticity**, lead with low-elasticity lines and key-value-item protection, close discount leakage with governance and approval workflows, add escalation clauses, and pilot before broad rollout. Track pocket-price realization and volume by segment, and arm sales with value messaging to defend increases.",
    rubric: TECH_RUBRIC,
    tags: ["pricing"],
  },
  {
    id: "t-working-capital",
    prompt:
      "How would you free up cash from working capital, and why does it matter for returns?",
    idealAnswer:
      "Attack the cash conversion cycle: reduce **DSO** (collections discipline, terms enforcement, billing accuracy), reduce **DIO** (SKU rationalization, demand planning, safety-stock optimization), and extend **DPO** (renegotiate supplier terms). It matters because freed cash pays down debt, shrinking net debt at exit and transferring enterprise value to equity — without touching EBITDA.",
    rubric: TECH_RUBRIC,
    tags: ["working-capital"],
  },
  {
    id: "t-100-day-design",
    prompt: "How do you design a 100-day plan for a newly acquired company?",
    idealAnswer:
      "Validate the value-creation thesis quickly, stand up governance and a KPI/reporting cadence so you can see, capture quick high-confidence wins to build credibility and cash, and scope/resource the big structural initiatives for the rest of the hold. Assign owners and run-rate targets to each initiative. Don't boil the ocean; protect management bandwidth.",
    rubric: TECH_RUBRIC,
    tags: ["100-day", "value-creation"],
  },
  {
    id: "t-kpi-set",
    prompt:
      "A PortCo has no operational KPIs. What's the minimum KPI set you'd install first?",
    idealAnswer:
      "A small, decision-driving set tied to the thesis: commercial (win rate, pipeline coverage, pocket-price realization), operational (productivity/throughput, on-time/quality), financial (gross margin by segment, cash conversion cycle, EBITDA vs plan), and people (regretted attrition). Pair leading and lagging indicators; resist a 50-metric dashboard nobody acts on.",
    rubric: TECH_RUBRIC,
    tags: ["kpis", "metrics"],
  },
  {
    id: "t-integration-synergies",
    prompt:
      "How do you make sure add-on acquisition synergies actually materialize?",
    idealAnswer:
      "Plan integration before close, standardize the operating spine (systems, back office, KPIs) rather than just stacking revenue, assign owners and tracked synergy targets with milestones, sequence migrations to avoid disruption, and report run-rate vs plan. Most synergy misses are integration-execution failures, not bad theses.",
    rubric: TECH_RUBRIC,
    tags: ["m&a", "integration"],
  },
  {
    id: "t-underperforming-initiative",
    prompt:
      "An initiative you championed is tracking below its target mid-hold. What do you do?",
    idealAnswer:
      "Diagnose the shortfall honestly (scope, resourcing, adoption, or thesis error), decide whether to fix, re-scope, or kill, reallocate to higher-ROI levers if needed, and communicate transparently to the deal team and board. Protect credibility by acting on the data rather than defending sunk effort.",
    rubric: TECH_RUBRIC,
    tags: ["execution"],
  },
  {
    id: "t-board-reporting",
    prompt:
      "How should a portfolio-ops lead report value-creation progress to the board?",
    idealAnswer:
      "Tie everything to the value-creation plan: run-rate EBITDA/cash captured vs target by initiative, leading indicators for in-flight work, risks and decisions needed, and a clear ask. Keep it crisp and honest about misses — boards fund teams they trust, and trust comes from straight talk plus a path forward.",
    rubric: TECH_RUBRIC,
    tags: ["governance", "reporting"],
  },
];
