import type { Unit } from "../types";

export const UNIT_RETURNS_FOUNDATIONS: Unit = {
  slug: "returns-foundations",
  stage: 1,
  order: 3,
  icon: "📈",
  title: "Returns, conceptually",
  tagline:
    "The three levers, MOIC vs IRR, and why leverage amplifies — the fluency every ops interview assumes.",
  lessons: [
    // ── Lesson 1: the three levers ────────────────────────────────────────────
    {
      slug: "rf-three-levers",
      title: "The three levers",
      summary: "EBITDA growth, multiple expansion, and debt paydown.",
      estMinutes: 9,
      pages: [
        {
          type: "read",
          heading: "Every LBO return comes from three places",
          body: [
            "Strip an LBO down and the equity return is created by exactly three levers: <strong>EBITDA growth</strong>, <strong>multiple expansion</strong>, and <strong>debt paydown</strong>. Understanding which lever does what — and which you can control — is the foundation of returns fluency.",
            "<strong>EBITDA growth</strong> makes the business bigger; at a constant multiple, more EBITDA means more enterprise value, and the gain accrues to equity. This is the lever operations primarily drives.",
            "<strong>Multiple expansion</strong> means selling at a higher multiple than you bought. It's real but market-dependent and not controllable — the riskiest thing to underwrite.",
            "<strong>Debt paydown</strong> uses the company's free cash flow to pay down acquisition debt. As net debt falls, enterprise value transfers from lenders to equity, even with flat EBITDA and a flat multiple. Operations de-risks this by generating the cash.",
          ],
          keyIdea:
            "Three levers: EBITDA growth, multiple expansion, debt paydown. Ops drives EBITDA growth and de-risks debt paydown; multiple expansion is the least controllable.",
        },
        {
          type: "framework",
          heading: "The three levers at a glance",
          items: [
            { term: "EBITDA growth", detail: "Grow the business → more EV at a constant multiple. The underwrite-able, ops-driven lever." },
            { term: "Multiple expansion", detail: "Exit at a higher multiple than entry. Market-dependent, not controllable, risky to assume." },
            { term: "Debt paydown", detail: "Free cash flow repays acquisition debt → net debt falls → EV shifts to equity. Ops generates the cash that fuels it." },
          ],
        },
        {
          type: "worked",
          heading: "A flat-multiple deal",
          intro: "Exit at the same multiple you paid — so multiple expansion contributes zero. Where does the return come from?",
          steps: [
            { label: "Entry", detail: "Buy at 10x $100M EBITDA = $1,000M EV; 60% debt → $600M debt, $400M equity." },
            { label: "EBITDA growth", detail: "EBITDA grows to $150M. Exit at the SAME 10x → exit EV $1,500M." },
            { label: "Debt paydown", detail: "Free cash flow pays net debt down from $600M to $400M." },
            { label: "Exit equity", detail: "$1,500M EV − $400M net debt = $1,100M equity." },
            { label: "Return", detail: "$1,100M ÷ $400M = 2.75x — entirely from EBITDA growth + debt paydown. Multiple expansion contributed nothing." },
          ],
          takeaway:
            "In a flat-multiple deal, return = EBITDA growth + debt paydown. This is the disciplined way to underwrite — don't rely on a higher exit multiple.",
        },
        {
          type: "mcq",
          heading: "Check your understanding",
          questions: [
            {
              q: "In a deal where you exit at the same multiple you paid, the return comes from…",
              options: [
                "Multiple expansion only",
                "EBITDA growth and debt paydown",
                "Multiple expansion and EBITDA growth",
                "Tax savings",
              ],
              correct: 1,
              fb: "A flat multiple contributes zero; EBITDA growth and debt paydown do the work.",
            },
            {
              q: "Which lever is the LEAST controllable and riskiest to underwrite?",
              options: ["EBITDA growth", "Debt paydown", "Multiple expansion", "Working capital"],
              correct: 2,
              fb: "You don't control the market; assuming a higher exit multiple is the classic over-reach.",
            },
            {
              q: "Operations primarily drives which lever?",
              options: ["Multiple expansion", "EBITDA growth", "Interest rates", "The exit timing"],
              correct: 1,
              fb: "Ops grows EBITDA (and de-risks debt paydown by generating cash).",
            },
          ],
        },
        {
          type: "check",
          heading: "Lesson check",
          questions: [
            {
              q: "Debt paydown creates equity value by…",
              options: [
                "Raising EBITDA",
                "Reducing net debt so enterprise value shifts to equity",
                "Expanding the multiple",
                "Lowering taxes",
              ],
              correct: 1,
            },
            {
              q: "The three levers of LBO returns are…",
              options: [
                "Revenue, cost, tax",
                "EBITDA growth, multiple expansion, debt paydown",
                "Debt, equity, fees",
                "Price, volume, mix",
              ],
              correct: 1,
            },
            {
              q: "A disciplined underwrite avoids relying on…",
              options: ["EBITDA growth", "debt paydown", "multiple expansion", "free cash flow"],
              correct: 2,
            },
          ],
        },
      ],
    },

    // ── Lesson 2: MOIC vs IRR ─────────────────────────────────────────────────
    {
      slug: "rf-moic-vs-irr",
      title: "MOIC vs IRR",
      summary: "Cash multiple vs annualized return — and the Rule of 72.",
      estMinutes: 10,
      pages: [
        {
          type: "read",
          heading: "Two ways to measure a return",
          body: [
            "<strong>MOIC</strong> — multiple on invested capital — is exit equity ÷ entry equity. It's a gross cash-on-cash multiple and it ignores time: a 2.5x is a 2.5x whether it took three years or eight.",
            "<strong>IRR</strong> — internal rate of return — is the annualized, time-weighted return. It cares deeply about time. A 2.0x in 3 years (~26% IRR) is a better deal than a 2.5x in 7 years (~14% IRR), even though the second has a higher MOIC.",
            "Both matter. MOIC tells you how much money you made; IRR tells you how fast. Faster exits and early distributions lift IRR without changing MOIC much — which is why sponsors care about hold period and timing, not just the multiple.",
          ],
          keyIdea:
            "MOIC = total cash multiple (time-blind). IRR = annualized return (time-sensitive). Same MOIC + shorter hold = higher IRR.",
        },
        {
          type: "framework",
          heading: "The fluency you need cold",
          items: [
            { term: "MOIC", detail: "Exit equity ÷ entry equity. A 2.5–3.0x over ~5 years is a common target." },
            { term: "IRR", detail: "Annualized return. IRR ≈ MOIC^(1/years) − 1." },
            { term: "Rule of 72", detail: "Years to double ≈ 72 ÷ IRR%. Inverting lets you sanity-check IRR from a MOIC and hold period in your head." },
            { term: "5-year anchors", detail: "Memorize: 2.0x ≈ 15%, 2.5x ≈ 20%, 3.0x ≈ 25%, 4.0x ≈ 32%. These let you state an IRR instantly." },
          ],
        },
        {
          type: "worked",
          heading: "Why time changes everything",
          intro: "Two deals, different holds.",
          steps: [
            { label: "Deal A", detail: "2.0x MOIC over 3 years. IRR ≈ 2.0^(1/3) − 1 ≈ 26%." },
            { label: "Deal B", detail: "2.5x MOIC over 7 years. IRR ≈ 2.5^(1/7) − 1 ≈ 14%." },
            { label: "Compare", detail: "Deal B returns more total cash (2.5x vs 2.0x) but Deal A has the far higher IRR because the money came back faster." },
          ],
          takeaway:
            "Higher MOIC does not mean higher IRR. Always ask over what hold period.",
        },
        {
          type: "numeric",
          heading: "Returns math",
          prompt:
            "A deal returns a 3.0x MOIC over a 5-year hold. What is the approximate IRR? (use the 5-year anchors)",
          fields: [
            { key: "irr", label: "Approx IRR", value: 25, unit: "%", tolPct: 0.1 },
          ],
          worked:
            "3.0x over 5 years ≈ 25% IRR (3^(1/5) − 1 = 24.6%). Anchor it: 2.5x≈20%, 3.0x≈25%.",
        },
        {
          type: "check",
          heading: "Lesson check",
          questions: [
            {
              q: "MOIC differs from IRR because MOIC…",
              options: [
                "Is annualized",
                "Ignores time — it's a pure cash multiple",
                "Includes the multiple expansion only",
                "Is always lower",
              ],
              correct: 1,
            },
            {
              q: "Rule of 72: at a 24% IRR, money roughly doubles in…",
              options: ["1 year", "3 years", "6 years", "12 years"],
              correct: 1,
            },
            {
              q: "A 2.0x over 4 years vs a 2.0x over 6 years — which has the higher IRR?",
              options: ["The 6-year", "The 4-year", "They're equal", "Can't tell"],
              correct: 1,
            },
          ],
        },
      ],
    },

    // ── Lesson 3: leverage & debt paydown ─────────────────────────────────────
    {
      slug: "rf-leverage",
      title: "Why leverage amplifies",
      summary: "How debt magnifies equity returns — both ways.",
      estMinutes: 8,
      pages: [
        {
          type: "read",
          heading: "Debt is a fixed claim — equity gets the rest",
          body: [
            "Leverage amplifies equity returns because debt is a <strong>fixed claim</strong>. The lenders get their principal and interest back; everything above that — all the growth in enterprise value — accrues to equity.",
            "With more debt (a smaller equity check), a given percentage increase in enterprise value becomes a larger percentage increase in equity value. And as free cash flow pays the debt down, enterprise value transfers from lenders to equity even if the business is flat.",
            "It cuts both ways. The same fixed claim that magnifies gains magnifies losses: if EV falls, equity absorbs the hit first. That's why operations — generating reliable cash to service and pay down debt — is what makes leverage a feature rather than a landmine.",
          ],
          keyIdea:
            "Debt is fixed; equity captures all EV growth above it. More leverage magnifies equity returns — and losses. Cash generation is what de-risks it.",
        },
        {
          type: "worked",
          heading: "Leverage in action",
          intro: "Same business, two capital structures, same 50% EV growth.",
          steps: [
            { label: "Low leverage", detail: "$1,000M EV, 30% debt ($300M), $700M equity. EV grows 50% to $1,500M; equity = $1,200M → 1.71x." },
            { label: "High leverage", detail: "$1,000M EV, 60% debt ($600M), $400M equity. EV grows 50% to $1,500M; equity = $900M → 2.25x." },
            { label: "The point", detail: "Same business, same EV growth — the higher-levered structure returns 2.25x vs 1.71x because the fixed debt claim let equity capture more of the upside." },
          ],
          takeaway:
            "More leverage → higher equity multiple on the same EV growth. The flip side is more downside risk if EV falls.",
        },
        {
          type: "numeric",
          heading: "Returns math",
          prompt:
            "Buy for $500M EV with $300M debt. EBITDA is flat, but free cash flow pays $150M of debt down, and you exit at the same $500M EV. What is the MOIC on the $200M of entry equity?",
          fields: [
            { key: "moic", label: "MOIC", value: 1.75, unit: "x", tol: 0.02 },
          ],
          worked:
            "Exit equity = $500M EV − ($300M − $150M) net debt = $350M. MOIC = 350 ÷ 200 = 1.75x — entirely from debt paydown, zero EBITDA growth or multiple expansion.",
        },
        {
          type: "check",
          heading: "Lesson check",
          questions: [
            {
              q: "Leverage amplifies equity returns because…",
              options: [
                "Debt holders share the upside",
                "Debt is a fixed claim, so equity captures all EV growth above it",
                "Interest is tax-free",
                "It lowers EBITDA",
              ],
              correct: 1,
            },
            {
              q: "The downside of high leverage is…",
              options: [
                "Lower interest",
                "Equity absorbs losses first if enterprise value falls",
                "Too much cash",
                "There is no downside",
              ],
              correct: 1,
            },
            {
              q: "Operations makes leverage safer mainly by…",
              options: [
                "Refinancing constantly",
                "Generating reliable cash to service and pay down debt",
                "Raising the multiple",
                "Cutting all costs",
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
        q: "The three levers of LBO returns are…",
        options: [
          "Revenue, cost, tax",
          "EBITDA growth, multiple expansion, debt paydown",
          "Price, volume, mix",
          "Debt, equity, fees",
        ],
        correct: 1,
      },
      {
        q: "In a flat-multiple deal, the return comes from…",
        options: ["multiple expansion only", "EBITDA growth and debt paydown", "tax only", "nothing"],
        correct: 1,
      },
      {
        q: "The least controllable lever is…",
        options: ["EBITDA growth", "debt paydown", "multiple expansion", "cost-out"],
        correct: 2,
      },
      {
        q: "MOIC is…",
        options: [
          "the annualized return",
          "exit equity ÷ entry equity, ignoring time",
          "the same as IRR",
          "the debt multiple",
        ],
        correct: 1,
      },
      {
        q: "A 2.0x in 3 years vs a 2.5x in 7 years — the higher IRR belongs to…",
        options: ["the 2.5x/7-year", "the 2.0x/3-year", "they're equal", "can't tell"],
        correct: 1,
      },
      {
        q: "Rule of 72: years to double ≈ 72 ÷ ___.",
        options: ["MOIC", "IRR%", "EBITDA", "leverage"],
        correct: 1,
      },
      {
        q: "A 3.0x MOIC over 5 years is approximately what IRR?",
        options: ["~10%", "~15%", "~25%", "~40%"],
        correct: 2,
      },
      {
        q: "Leverage amplifies equity returns because debt is a…",
        options: ["variable claim", "fixed claim, so equity gets all EV growth above it", "form of equity", "tax"],
        correct: 1,
      },
      {
        q: "Buy at $500M EV / $300M debt; flat EBITDA + flat EV; pay down $150M of debt. MOIC on $200M equity?",
        options: ["1.0x", "1.5x", "1.75x", "2.5x"],
        correct: 2,
      },
      {
        q: "Operations makes leverage safer by…",
        options: [
          "raising the exit multiple",
          "generating reliable cash to service and pay down debt",
          "issuing more equity",
          "cutting the dividend",
        ],
        correct: 1,
      },
    ],
  },
};
