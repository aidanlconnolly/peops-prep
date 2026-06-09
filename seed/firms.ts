import type { firms } from "@/lib/db/schema";

type FirmSeed = typeof firms.$inferInsert;

/**
 * Firm intel. Comp figures are APPROXIMATE ranges and move every cycle — treat
 * as directional and re-verify before an interview. Structural facts (model,
 * accessibility) are the durable part.
 */
export const FIRMS: FirmSeed[] = [
  {
    id: "firm-kkr-capstone",
    slug: "kkr-capstone",
    name: "KKR Capstone",
    model: "centralized",
    mbaAccessibility:
      "High — consultant-native, runs a structured MBA summer program; tuition reimbursement has been offered for returning consultants.",
    interviewProcess: {
      rounds: [
        { name: "Initial screen", detail: "Motivation + resume walkthrough; why ops, why KKR." },
        { name: "First round", detail: "~2× 1:1 (≈1hr each): one behavioral, one consulting-style operational case." },
        { name: "Superday", detail: "Multiple 2:1 rounds with VPs/MDs + a returns/Excel modeling exercise." },
        { name: "Final", detail: "Fit + strategic thinking with senior partners." },
      ],
    },
    comp: {
      mbaIntern: "~$10–17k/mo (approx)",
      postMbaAssociateTotal: "~$250–400k+ total (approx)",
      note: "Junior comp ≈ deal-side; the divergence is carry at senior levels (ops carry pools are smaller than deal carry).",
    },
    recruitingNotes:
      "One of the original operating-partner platforms; large dedicated central team serving all PortCos. Consulting background is an asset; modeling bar is lighter than an investment seat.",
    fitForMe:
      "Top target. Operational case + behavioral play directly to BCG diagnosis and the shipyard-throughput ops experience; modeling bar is lighter than investment seats.",
    order: 1,
  },
  {
    id: "firm-bain-capital-pg",
    slug: "bain-capital-portfolio-group",
    name: "Bain Capital — Portfolio Group",
    model: "centralized",
    mbaAccessibility:
      "High — deeply consultant-native (Bain & Co. lineage); structured paths for ex-consultants and MBAs.",
    interviewProcess: {
      rounds: [
        { name: "Screen", detail: "Fit + motivation for portfolio operations." },
        { name: "Case rounds", detail: "Consulting-style operational cases; value-creation framing." },
        { name: "Superday", detail: "Multiple interviews with portfolio-group leaders; behavioral + case." },
      ],
    },
    comp: {
      postMbaAssociateTotal: "~$225–350k+ total (approx)",
      note: "Comp competitive with consulting-to-PE moves; carry concentrated at senior levels.",
    },
    recruitingNotes:
      "Dedicated portfolio-support team partnering with deal teams. Strong fit for ex-MBB consultants; emphasis on structured problem-solving and value-creation planning.",
    fitForMe:
      "Strong target — the case style is squarely consulting-shaped, matching the BCG toolkit.",
    order: 2,
  },
  {
    id: "firm-vista-vcg",
    slug: "vista-consulting-group",
    name: "Vista — Vista Consulting Group (VCG)",
    model: "centralized",
    mbaAccessibility:
      "Moderate–high, but software-specialized — best fit if you can speak SaaS metrics (NRR, CAC payback, rule of 40).",
    interviewProcess: {
      rounds: [
        { name: "Screen", detail: "Fit + why software / why Vista's playbook model." },
        { name: "Case", detail: "SaaS operational case; Vista's standardized best-practices lens." },
        { name: "Superday", detail: "Multiple rounds; behavioral + operational + metrics fluency." },
      ],
    },
    comp: {
      postMbaAssociateTotal: "~$200–325k+ total (approx)",
      note: "Playbook-driven model; strong professional development reputation.",
    },
    recruitingNotes:
      "Centralized consulting arm applying a standardized software value-creation playbook across the portfolio. Software/SaaS fluency is essential.",
    fitForMe:
      "Good if I lean into the SaaS case prep — strongest when I can speak NRR/CAC payback fluently.",
    order: 3,
  },
  {
    id: "firm-blackstone-portops",
    slug: "blackstone-portfolio-operations",
    name: "Blackstone — Portfolio Operations",
    model: "centralized",
    mbaAccessibility:
      "Moderate — prestigious, smaller team, often values prior operating or specialized functional depth alongside consulting.",
    interviewProcess: {
      rounds: [
        { name: "Screen", detail: "Fit + motivation; why centralized ops at scale." },
        { name: "Case / functional", detail: "Operational case, sometimes functional (procurement, pricing, healthcare benefits)." },
        { name: "Superday", detail: "Senior team interviews; behavioral + value-creation thinking." },
      ],
    },
    comp: {
      postMbaAssociateTotal: "~$250–400k+ total (approx)",
      note: "Top-of-market platform; leverages cross-portfolio scale (procurement, benefits, etc.).",
    },
    recruitingNotes:
      "Centralized group that drives cross-portfolio programs at massive scale (e.g., group purchasing, healthcare). Functional specialization is valued.",
    fitForMe:
      "Aspirational — competitive, but the diagnosis-and-execute skill set translates; lean on cross-portfolio scale interest.",
    order: 4,
  },
  {
    id: "firm-apollo-apps",
    slug: "apollo-apps",
    name: "Apollo — APPS (Apollo Portfolio Performance Solutions)",
    model: "centralized",
    mbaAccessibility:
      "Moderate — value-oriented house; functional and cross-portfolio purchasing focus alongside consulting backgrounds.",
    interviewProcess: {
      rounds: [
        { name: "Screen", detail: "Fit + motivation for value-creation at a value-oriented firm." },
        { name: "Case", detail: "Operational / cost-and-procurement-leaning case." },
        { name: "Superday", detail: "Multiple interviews; behavioral + operational." },
      ],
    },
    comp: {
      postMbaAssociateTotal: "~$225–375k+ total (approx)",
      note: "Strong cost/procurement and cross-portfolio purchasing programs.",
    },
    recruitingNotes:
      "Centralized performance-solutions group with notable strength in procurement and cost programs across a large portfolio.",
    fitForMe:
      "Good fit for the cost/procurement side of my toolkit; emphasize structured cost-takeout work.",
    order: 5,
  },
  {
    id: "firm-carlyle",
    slug: "carlyle",
    name: "Carlyle — Portfolio / Operations",
    model: "embedded",
    mbaAccessibility:
      "Moderate — operators often sit closer to sector deal teams; values sector knowledge plus operating credibility.",
    interviewProcess: {
      rounds: [
        { name: "Screen", detail: "Fit + sector interest." },
        { name: "Case + sector", detail: "Operational case with a sector lens; deal-team interaction." },
        { name: "Superday", detail: "Sector and ops leaders; behavioral + case." },
      ],
    },
    comp: {
      postMbaAssociateTotal: "~$200–350k+ total (approx)",
      note: "Embedded/sector-aligned model; closer collaboration with deal teams.",
    },
    recruitingNotes:
      "More embedded model — operators align to sectors and work tightly with deal teams rather than a fully pooled central bench.",
    fitForMe:
      "Fit depends on a sector angle; emphasize how DD work gives me deal-team fluency.",
    order: 6,
  },
  {
    id: "firm-cdr",
    slug: "clayton-dubilier-rice",
    name: "Clayton, Dubilier & Rice (CD&R)",
    model: "advisor",
    mbaAccessibility:
      "Lower for pure-junior entry — historically operator-led, with senior operating partners (often former CEOs) central to the model.",
    interviewProcess: {
      rounds: [
        { name: "Screen", detail: "Fit + understanding of the operator-led thesis model." },
        { name: "Case", detail: "Operational/strategic case; thesis and value-creation depth." },
        { name: "Superday", detail: "Interviews with investment and operating principals." },
      ],
    },
    comp: {
      postMbaAssociateTotal: "~$225–375k+ total (approx)",
      note: "Operator-led culture; senior operating partners are former operating executives.",
    },
    recruitingNotes:
      "Pioneer of the operator-led PE model — operating partners (often ex-CEOs) are integral to the investment thesis itself, not a separate support function.",
    fitForMe:
      "Prestigious but more operator-senior; useful to understand the model even if entry is harder at the junior level.",
    order: 7,
  },
  {
    id: "firm-tpg-ops",
    slug: "tpg-operations",
    name: "TPG — Operations Group",
    model: "embedded",
    mbaAccessibility:
      "Moderate — operators work closely with sector deal teams; values consulting plus sector/functional depth.",
    interviewProcess: {
      rounds: [
        { name: "Screen", detail: "Fit + motivation; why TPG's model." },
        { name: "Case", detail: "Operational case; value-creation prioritization." },
        { name: "Superday", detail: "Ops and deal-team interviews; behavioral + case." },
      ],
    },
    comp: {
      postMbaAssociateTotal: "~$200–350k+ total (approx)",
      note: "Embedded/sector-aligned ops group collaborating with deal teams.",
    },
    recruitingNotes:
      "Operations group embedded alongside sector deal teams; consulting backgrounds common, with an emphasis on practical value-creation execution.",
    fitForMe:
      "Solid target — embedded model rewards deal-team fluency and the consulting diagnosis skill set.",
    order: 8,
  },
];
