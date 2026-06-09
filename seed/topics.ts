import type { topics } from "@/lib/db/schema";

type TopicSeed = typeof topics.$inferInsert;

/** Topic ids ARE their slugs, so seed rows in other files can reference them. */
export const TOPICS: TopicSeed[] = [
  {
    id: "fundamentals-operating-model",
    slug: "fundamentals-operating-model",
    name: "Operating Model & Value Creation",
    domain: "fundamentals",
    description:
      "Why ops drives ~half of value creation today; the operating-partner model; centralized vs embedded.",
    order: 1,
  },
  {
    id: "fundamentals-value-plan",
    slug: "fundamentals-value-plan",
    name: "100-Day Plans & EBITDA Bridges",
    domain: "fundamentals",
    description:
      "The first-100-days roadmap, governance/KPIs, and decomposing EBITDA growth.",
    order: 2,
  },
  {
    id: "returns-lbo-math",
    slug: "returns-lbo-math",
    name: "LBO & Paper-LBO Math",
    domain: "returns",
    description: "Sources & uses, MOIC, IRR, Rule of 72, exit equity build.",
    order: 3,
  },
  {
    id: "returns-levers",
    slug: "returns-levers",
    name: "Return Levers & Attribution",
    domain: "returns",
    description:
      "EBITDA growth, multiple expansion, debt paydown — and decomposing a deal's return.",
    order: 4,
  },
  {
    id: "diagnostics-levers",
    slug: "diagnostics-levers",
    name: "Value-Creation Levers",
    domain: "diagnostics",
    description:
      "Pricing, commercial excellence, cost takeout, procurement, working capital, org, salesforce, digital, M&A.",
    order: 5,
  },
  {
    id: "diagnostics-frameworks",
    slug: "diagnostics-frameworks",
    name: "PortCo Diagnosis Frameworks",
    domain: "diagnostics",
    description: "How to frame, benchmark, and prioritize on an operational case.",
    order: 6,
  },
  {
    id: "technicals-scenarios",
    slug: "technicals-scenarios",
    name: "Operational Technicals",
    domain: "technicals",
    description:
      "Measuring initiatives, landing change with management, prioritizing levers.",
    order: 7,
  },
  {
    id: "behavioral-core",
    slug: "behavioral-core",
    name: "Behavioral & Influence",
    domain: "behavioral",
    description:
      "Influence without authority, STAR structure, commitment to the ops path.",
    order: 8,
  },
  {
    id: "firm-models",
    slug: "firm-models",
    name: "Firm Models & Process",
    domain: "firm",
    description: "How the major ops groups are structured and how they recruit.",
    order: 9,
  },
];
