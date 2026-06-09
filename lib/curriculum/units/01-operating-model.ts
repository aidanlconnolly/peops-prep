import type { Unit } from "../types";

export const UNIT_OPERATING_MODEL: Unit = {
  slug: "operating-model",
  stage: 1,
  order: 1,
  icon: "🏛️",
  title: "The operating-partner model",
  tagline:
    "Why operations now drives roughly half of PE returns — and how ops teams are actually structured.",
  lessons: [
    // ── Lesson 1 ──────────────────────────────────────────────────────────────
    {
      slug: "om-why-ops-wins",
      title: "Why operations wins",
      summary: "The shift from financial engineering to operational value creation.",
      estMinutes: 9,
      pages: [
        {
          type: "read",
          heading: "Returns used to come from the balance sheet",
          body: [
            "In the 1980s, the original LBO playbook was mostly financial. Buy a company with a lot of debt, let the cash flows pay the debt down, and the equity compounds — even if the business itself barely changes. Cheap, plentiful leverage did the heavy lifting.",
            "Through the 2000s, a second driver took over: <strong>multiple expansion</strong>. Buy at 7x EBITDA, ride a rising market, sell at 10x. That works beautifully — until it doesn't. You don't control the market, and underwriting a deal on \"we'll sell at a higher multiple than we paid\" is exactly the assumption that blows up in a downturn.",
            "Today, entry multiples are high and interest rates are no longer near zero. Both of the old levers are compressed. The one source of return a sponsor can actually <em>underwrite and control</em> is making the business worth more — growing EBITDA and the quality of that EBITDA. That is operational value creation, and it's why dedicated operations teams exist.",
          ],
          keyIdea:
            "Leverage and multiple expansion are borrowed or market-given. Operational EBITDA growth is earned — and it's the most defensible thing to underwrite today.",
        },
        {
          type: "framework",
          heading: "Three eras of PE value creation",
          intro: "A useful way to frame why the operating-partner role emerged.",
          items: [
            {
              term: "Financial engineering (1980s)",
              detail:
                "Leverage + debt paydown. Returns from the capital structure, not the operations. Minimal involvement in the business itself.",
            },
            {
              term: "Multiple expansion (1990s–2010s)",
              detail:
                "Buy low, sell high on rising markets and platform scale. Real, but market-dependent and not controllable — risky to underwrite.",
            },
            {
              term: "Operational value creation (today)",
              detail:
                "Grow EBITDA through pricing, commercial excellence, cost, working capital, and M&A integration. The underwrite-able, repeatable lever — and where ops teams live.",
            },
          ],
        },
        {
          type: "read",
          heading: "What an operating partner actually does",
          body: [
            "An operating partner (or portfolio-operations professional) is not a consultant who writes a deck and leaves. They own outcomes across the hold period, working <em>through</em> management rather than over them.",
            "The job has three moves. First, <strong>diagnose</strong> — find where the EBITDA and cash upside actually is, benchmarked against peers. Second, <strong>plan</strong> — build the value-creation plan with management: prioritized initiatives, each with an owner, a target, and a timeline. Third, <strong>drive execution</strong> — install KPIs and a cadence, lead the big initiatives (pricing, cost, commercial), and report progress to the deal team and board.",
            "Crucially, the operating partner usually has <strong>no line authority</strong>. They don't run the company. Their power is credibility: a sharp diagnosis, the prize quantified in the management team's own numbers, and a track record of quick wins.",
          ],
          keyIdea:
            "Diagnose → plan → drive execution. Influence comes from credibility, not control.",
        },
        {
          type: "insight",
          heading: "What the interviewer is really testing",
          body:
            "When they ask \"why does operations matter in PE?\", a weak answer says \"to make companies better.\" A strong answer connects it to <strong>returns</strong>: with multiples high and rates up, EBITDA growth is the only underwrite-able lever, ops teams drive ~half of value creation in recent deals, and that's the part a sponsor can actually de-risk. Always tie operations back to the return.",
        },
        {
          type: "mcq",
          heading: "Check your understanding",
          questions: [
            {
              q: "Why is operational value creation more central today than in the 1980s?",
              options: [
                "Leverage is cheaper than ever",
                "Entry multiples are high and rates are up, so EBITDA growth is the most underwrite-able lever",
                "Multiple expansion is now guaranteed",
                "Regulators require it",
              ],
              correct: 1,
              fb: "High entry multiples + higher rates compress the financial levers, leaving operational EBITDA growth as the controllable one.",
            },
            {
              q: "Which is NOT one of the operating partner's three core moves?",
              options: [
                "Diagnose the value-creation opportunity",
                "Build the value-creation plan with management",
                "Personally negotiate the purchase price and debt structure",
                "Drive execution via KPIs and initiatives",
              ],
              correct: 2,
              fb: "Pricing the deal and structuring the debt is the deal team's job. Ops owns diagnosis, the VCP, and execution.",
            },
            {
              q: "An operating partner's primary source of influence is…",
              options: [
                "Line authority over management",
                "Ownership of the board seats",
                "Credibility — diagnosis, quantified prize, quick wins",
                "Control of the company's bank accounts",
              ],
              correct: 2,
              fb: "Ops usually has no line authority. Influence is earned through credibility.",
            },
          ],
        },
        {
          type: "check",
          heading: "Lesson check",
          questions: [
            {
              q: "Roughly how much of value creation do operations drive in recent PE deals?",
              options: ["~10%", "~half", "~90%", "None — it's all leverage"],
              correct: 1,
            },
            {
              q: "Underwriting a deal primarily on multiple expansion is risky because…",
              options: [
                "Multiples never change",
                "You don't control the market and may not get a higher exit multiple",
                "It's illegal",
                "It always works",
              ],
              correct: 1,
            },
            {
              q: "The operating partner works…",
              options: [
                "Over management, by taking control",
                "Through management, via credibility and a shared plan",
                "Only with the lenders",
                "Independently of the company",
              ],
              correct: 1,
            },
          ],
        },
      ],
    },

    // ── Lesson 2 ──────────────────────────────────────────────────────────────
    {
      slug: "om-centralized-vs-embedded",
      title: "Centralized vs embedded",
      summary: "The two ways PE firms structure their operating teams.",
      estMinutes: 8,
      pages: [
        {
          type: "read",
          heading: "Two ways to organize an ops team",
          body: [
            "Every firm with a serious operations capability has to answer one structural question: where do the operators sit? There are two dominant models, plus hybrids.",
            "In a <strong>centralized</strong> model, the operators form one pooled, dedicated team at the fund level. They deploy into portfolio companies as needed, carry firm-wide playbooks, and serve the whole portfolio. Think of a flexible internal consulting bench.",
            "In an <strong>embedded</strong> model, operators sit inside sector deal teams. They're aligned to an industry and work shoulder-to-shoulder with the investors who source and own those deals. Less of a shared pool, more of a sector specialist.",
          ],
          keyIdea:
            "Centralized = one pooled team serving all PortCos. Embedded = operators sit inside sector deal teams.",
        },
        {
          type: "compare",
          heading: "Centralized vs embedded, side by side",
          columns: ["Centralized", "Embedded"],
          rows: [
            {
              dim: "Where talent sits",
              a: "One pooled team at the fund level",
              b: "Inside sector / deal teams",
            },
            {
              dim: "Examples",
              a: "KKR Capstone, Blackstone Portfolio Operations",
              b: "Carlyle, TPG Operations",
            },
            {
              dim: "Strength",
              a: "Cross-portfolio playbooks, scale, flexibility",
              b: "Deep sector context, tight deal-team alignment",
            },
            {
              dim: "Trade-off",
              a: "Less day-one sector depth",
              b: "Less cross-portfolio leverage / shared scale",
            },
          ],
        },
        {
          type: "framework",
          heading: "Where the major groups land",
          intro: "Models blur at the edges, but the canonical mapping:",
          items: [
            { term: "Centralized", detail: "KKR Capstone, Bain Capital Portfolio Group, Vista VCG, Blackstone Portfolio Operations, Apollo APPS." },
            { term: "Embedded / sector-aligned", detail: "Carlyle, TPG Operations." },
            { term: "Operator-led", detail: "CD&R — senior operating partners (often ex-CEOs) are central to the thesis itself, not a separate support function." },
          ],
        },
        {
          type: "mcq",
          heading: "Check your understanding",
          questions: [
            {
              q: "A pooled, dedicated team at the fund level that serves all portfolio companies is the…",
              options: ["Embedded model", "Centralized model", "Operator-led model", "Advisor model"],
              correct: 1,
              fb: "Centralized = one shared bench (Capstone, Blackstone PortOps).",
            },
            {
              q: "Which firms are the canonical examples of a centralized model?",
              options: [
                "Carlyle and TPG",
                "KKR Capstone and Blackstone Portfolio Operations",
                "CD&R only",
                "None — all PE is embedded",
              ],
              correct: 1,
              fb: "Capstone and Blackstone PortOps are the textbook centralized teams.",
            },
            {
              q: "The main advantage of the embedded model is…",
              options: [
                "Cross-portfolio purchasing scale",
                "Deep sector context and tight deal-team alignment",
                "It needs no operators",
                "It avoids management entirely",
              ],
              correct: 1,
              fb: "Embedded operators trade shared scale for sector depth and alignment.",
            },
          ],
        },
        {
          type: "check",
          heading: "Lesson check",
          questions: [
            {
              q: "Carlyle and TPG are usually described as which model?",
              options: ["Centralized", "Embedded / sector-aligned", "Operator-led", "Advisor"],
              correct: 1,
            },
            {
              q: "Which firm is most associated with the operator-led model?",
              options: ["KKR Capstone", "Vista", "CD&R", "Blackstone"],
              correct: 2,
            },
            {
              q: "A centralized team's key trade-off is…",
              options: [
                "Too much sector depth",
                "Less day-one sector depth than an embedded operator",
                "No playbooks",
                "It can't serve multiple PortCos",
              ],
              correct: 1,
            },
          ],
        },
      ],
    },

    // ── Lesson 3 ──────────────────────────────────────────────────────────────
    {
      slug: "om-ops-vs-deal-team",
      title: "Ops vs the deal team",
      summary: "Who owns what across the deal and the hold.",
      estMinutes: 7,
      pages: [
        {
          type: "read",
          heading: "Two roles, one outcome",
          body: [
            "The deal (investing) team and the operations team are partners, but they own different things. Confusing the two is a common interview stumble.",
            "The <strong>deal team</strong> sources opportunities, runs diligence, builds the model, negotiates price and structure, arranges the debt, and sits on the board. They own the <em>transaction</em> and the capital.",
            "The <strong>operations team</strong> owns the <em>value-creation plan and its execution</em> during the hold: the diagnosis, the KPIs, the initiatives (pricing, cost, commercial, working capital), and the management relationship. They make the underwriting case actually happen.",
            "The two overlap most during diligence — ops often pressure-tests the operational thesis before close — and at the board, where they jointly govern. But day to day, deal owns capital, ops owns operations.",
          ],
          keyIdea:
            "Deal team owns the transaction and the capital. Ops owns the value-creation plan and its execution.",
        },
        {
          type: "framework",
          heading: "Who owns what",
          items: [
            { term: "Sourcing & diligence", detail: "Deal team leads; ops pressure-tests the operational thesis." },
            { term: "Price, structure, debt", detail: "Deal team — full stop." },
            { term: "100-day plan & VCP", detail: "Operations team, built with management." },
            { term: "KPIs, cadence, reporting", detail: "Operations team installs and runs them." },
            { term: "Value-creation initiatives", detail: "Operations team leads (pricing, cost, commercial, working capital, M&A integration)." },
            { term: "Board governance", detail: "Shared — deal and ops jointly." },
            { term: "Exit", detail: "Deal team leads; ops supplies the value-creation story and proof." },
          ],
        },
        {
          type: "fill",
          heading: "Who owns it?",
          intro: "Fill in the team that owns each responsibility.",
          items: [
            { template: "Negotiating the purchase price and debt structure → the ___ team", answer: "deal", options: ["deal", "operations"] },
            { template: "Building the 100-day plan with management → the ___ team", answer: "operations", options: ["deal", "operations"] },
            { template: "Installing KPIs and a weekly reporting cadence → the ___ team", answer: "operations", options: ["deal", "operations"] },
            { template: "Leading the pricing and cost initiatives → the ___ team", answer: "operations", options: ["deal", "operations"] },
          ],
        },
        {
          type: "check",
          heading: "Lesson check",
          questions: [
            {
              q: "Which is owned by the operations team, not the deal team?",
              options: [
                "Arranging the acquisition debt",
                "Executing the value-creation plan during the hold",
                "Negotiating the purchase price",
                "Signing the purchase agreement",
              ],
              correct: 1,
            },
            {
              q: "Where do deal and ops teams most clearly share ownership?",
              options: ["Debt structuring", "Board governance", "Price negotiation", "Sourcing"],
              correct: 1,
            },
            {
              q: "At exit, the operations team's main contribution is…",
              options: [
                "Negotiating the sale price",
                "Supplying the value-creation story and proof of EBITDA growth",
                "Arranging the buyer's debt",
                "Nothing — ops is done at close",
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
        q: "Today's most underwrite-able source of PE returns is…",
        options: ["Cheap leverage", "Guaranteed multiple expansion", "Operational EBITDA growth", "Tax arbitrage"],
        correct: 2,
      },
      {
        q: "The operating partner's three core moves are…",
        options: [
          "Source, structure, exit",
          "Diagnose, plan, drive execution",
          "Lend, monitor, refinance",
          "Hire, fire, repeat",
        ],
        correct: 1,
      },
      {
        q: "An operating partner usually influences management through…",
        options: ["Line authority", "Credibility and a shared plan", "Ownership of payroll", "The lenders"],
        correct: 1,
      },
      {
        q: "A pooled fund-level team serving all PortCos is the ___ model.",
        options: ["embedded", "centralized", "operator-led", "advisor"],
        correct: 1,
      },
      {
        q: "Carlyle and TPG are usually described as…",
        options: ["centralized", "embedded / sector-aligned", "operator-led", "advisor"],
        correct: 1,
      },
      {
        q: "CD&R is best known for which model?",
        options: ["centralized", "embedded", "operator-led", "purely financial"],
        correct: 2,
      },
      {
        q: "Negotiating price and debt structure is owned by the…",
        options: ["operations team", "deal team", "management team", "lenders"],
        correct: 1,
      },
      {
        q: "Building and executing the value-creation plan is owned by the…",
        options: ["operations team", "deal team", "auditors", "board only"],
        correct: 0,
      },
      {
        q: "A strong answer to \"why operations in PE?\" always ties back to…",
        options: ["making companies nicer", "the return", "headcount", "the brand"],
        correct: 1,
      },
      {
        q: "Operations and deal teams share ownership most clearly at…",
        options: ["the debt arrangement", "board governance", "the purchase negotiation", "sourcing"],
        correct: 1,
      },
    ],
  },
};
