import type { Unit } from "../types";

export const UNIT_PAPER_LBO: Unit = {
  slug: "paper-lbo",
  stage: 2,
  order: 1,
  icon: "🧮",
  title: "The paper LBO",
  tagline: "Build a deal from sources & uses to IRR — the math you'll be asked to do cold.",
  lessons: [
    // ── Lesson 1: sources & uses ──────────────────────────────────────────────
    {
      slug: "plbo-sources-uses",
      title: "Sources & uses",
      summary: "How a deal is funded — and how to find the equity check.",
      estMinutes: 9,
      pages: [
        {
          type: "read",
          heading: "Every deal balances sources and uses",
          body: [
            "A <strong>sources & uses</strong> table is the first thing you build in any LBO. It answers two questions: what does the deal cost (uses), and where does the money come from (sources)? The two sides must equal.",
            "<strong>Uses</strong> are what you're paying for: the purchase enterprise value, any existing debt you refinance, and transaction & financing fees.",
            "<strong>Sources</strong> are how you fund it: new debt tranches, sponsor equity, often a management rollover, and sometimes a seller note. The sponsor equity is the <em>plug</em> — it's whatever's left after the debt and other sources are set, so that sources equal uses.",
          ],
          keyIdea:
            "Sources = Uses. Set the debt, add fees, and the sponsor equity is the plug that balances the table.",
        },
        {
          type: "framework",
          heading: "What's in a sources & uses",
          items: [
            { term: "Uses — purchase EV", detail: "EBITDA × entry multiple. The headline price of the business." },
            { term: "Uses — refinance debt", detail: "Existing debt you pay off at close (if any)." },
            { term: "Uses — fees", detail: "Transaction + financing fees added to the cost." },
            { term: "Sources — debt tranches", detail: "New acquisition debt (term loan, bonds), sized off a leverage multiple of EBITDA." },
            { term: "Sources — sponsor equity", detail: "The plug: EV + fees − debt − other sources." },
            { term: "Sources — management rollover", detail: "Management reinvests some proceeds, reducing the sponsor's check." },
          ],
        },
        {
          type: "order",
          heading: "Build the sources & uses",
          intro: "Order the steps.",
          items: [
            {
              tokens: [
                "Determine purchase enterprise value",
                "Set leverage / debt tranches",
                "Add fees & financing costs",
                "Solve for sponsor equity (the plug)",
                "Add management rollover",
              ],
              label: "Sources & uses build",
            },
          ],
        },
        {
          type: "numeric",
          heading: "Find the equity check",
          prompt:
            "A business with $80M EBITDA is bought at 9.0x. Debt is set at 5.0x EBITDA. Ignoring fees and rollover, how much sponsor equity is required ($M)?",
          fields: [{ key: "equity", label: "Sponsor equity", value: 320, unit: "$M", tol: 1 }],
          worked:
            "EV = $80M × 9.0x = $720M. Debt = $80M × 5.0x = $400M. Equity plug = $720M − $400M = $320M (4.0x of EBITDA).",
        },
        {
          type: "check",
          heading: "Lesson check",
          questions: [
            {
              q: "In a sources & uses, the sponsor equity is…",
              options: [
                "Set first, before the debt",
                "The plug that balances sources to uses",
                "Always equal to the debt",
                "Irrelevant",
              ],
              correct: 1,
            },
            {
              q: "Which is a USE of funds?",
              options: ["New term loan", "Sponsor equity", "Purchase enterprise value", "Management rollover"],
              correct: 2,
            },
            {
              q: "EV $600M, debt $360M, fees $20M, no rollover. Sponsor equity?",
              options: ["$240M", "$260M", "$220M", "$360M"],
              correct: 1,
            },
          ],
        },
      ],
    },

    // ── Lesson 2: entry to exit ───────────────────────────────────────────────
    {
      slug: "plbo-entry-to-exit",
      title: "Entry to exit",
      summary: "The full paper-LBO flow from entry equity to MOIC.",
      estMinutes: 10,
      pages: [
        {
          type: "read",
          heading: "The five-step paper LBO",
          body: [
            "A paper LBO is the same flow every time. You build the two bookends — entry equity and exit equity — then take the ratio for MOIC and annualize for IRR.",
            "<strong>Entry equity</strong> = EV − debt raised (the plug). <strong>Exit EV</strong> = exit EBITDA × exit multiple. <strong>Exit equity</strong> = exit EV − net debt at exit (after the debt has been paid down with free cash flow). <strong>MOIC</strong> = exit equity ÷ entry equity. <strong>IRR</strong> ≈ MOIC^(1/years) − 1.",
            "The whole thing is just \"what did I put in, what did I get out, how long did it take.\" Everything else is plugging EBITDA, the multiple, and net debt into those five steps.",
          ],
          keyIdea:
            "Entry equity → exit EV → exit equity → MOIC → IRR. Build the bookends first, then the multiple, then annualize.",
        },
        {
          type: "framework",
          heading: "The five steps",
          items: [
            { term: "1. Entry equity", detail: "Entry EV − debt raised (from sources & uses)." },
            { term: "2. Exit EV", detail: "Exit EBITDA × exit multiple." },
            { term: "3. Exit equity", detail: "Exit EV − net debt at exit." },
            { term: "4. MOIC", detail: "Exit equity ÷ entry equity." },
            { term: "5. IRR", detail: "≈ MOIC^(1/years) − 1; sanity-check with the 5-year anchors." },
          ],
        },
        {
          type: "worked",
          heading: "A full paper LBO",
          intro: "Entry EV $1,000M at 10.0x ($100M EBITDA), 60% debt. EBITDA grows to $150M; exit at 10.0x; net debt paid to $400M; 5-year hold.",
          steps: [
            { label: "Entry equity", detail: "Debt = 60% × $1,000M = $600M. Equity = $1,000M − $600M = $400M." },
            { label: "Exit EV", detail: "$150M × 10.0x = $1,500M." },
            { label: "Exit equity", detail: "$1,500M − $400M net debt = $1,100M." },
            { label: "MOIC", detail: "$1,100M ÷ $400M = 2.75x." },
            { label: "IRR", detail: "2.75x over 5 years ≈ ~22% (between the 2.5x→20% and 3.0x→25% anchors)." },
          ],
          takeaway: "Memorize this shape. Most paper LBOs are this exact flow with different inputs.",
        },
        {
          type: "numeric",
          heading: "Run the numbers",
          prompt:
            "Entry EV $1,000M, 60% debt. EBITDA $100M → $150M; exit 10.0x; net debt $400M at exit; 5-year hold. MOIC and approx IRR?",
          fields: [
            { key: "moic", label: "MOIC", value: 2.75, unit: "x", tol: 0.05 },
            { key: "irr", label: "Approx IRR", value: 22, unit: "%", tolPct: 0.15 },
          ],
          worked:
            "Exit equity $1,100M ÷ entry equity $400M = 2.75x. Over 5 years, 2.75x ≈ ~22% IRR.",
        },
        {
          type: "check",
          heading: "Lesson check",
          questions: [
            {
              q: "Exit equity is…",
              options: [
                "Exit EV × the multiple",
                "Exit EV − net debt at exit",
                "Entry equity × 2",
                "EBITDA ÷ debt",
              ],
              correct: 1,
            },
            {
              q: "MOIC is…",
              options: ["exit EV ÷ entry EV", "exit equity ÷ entry equity", "debt ÷ equity", "EBITDA growth %"],
              correct: 1,
            },
            {
              q: "Entry equity $200M, exit equity $500M, 5-year hold. MOIC?",
              options: ["1.5x", "2.0x", "2.5x", "3.0x"],
              correct: 2,
            },
          ],
        },
      ],
    },

    // ── Lesson 3: speed & sanity checks ───────────────────────────────────────
    {
      slug: "plbo-sanity-checks",
      title: "Speed & sanity checks",
      summary: "Rule of 72, the 5-year anchors, and stating IRR instantly.",
      estMinutes: 7,
      pages: [
        {
          type: "read",
          heading: "You won't have a calculator",
          body: [
            "Paper LBOs are done out loud, fast, without Excel. The trick is to convert MOIC and hold period into an IRR in your head — and to sanity-check it so you don't say something absurd.",
            "<strong>Rule of 72</strong>: years to double ≈ 72 ÷ IRR%. Invert it — a 2.0x over 5 years means doubling in 5 years, so IRR ≈ 72 ÷ 5 ≈ ~15%.",
            "Better still, memorize the <strong>5-year anchors</strong>: 2.0x ≈ 15%, 2.5x ≈ 20%, 3.0x ≈ 25%, 4.0x ≈ 32%. With these, you can state an IRR the instant you have the MOIC and a ~5-year hold.",
          ],
          keyIdea:
            "Rule of 72: years to double ≈ 72 ÷ IRR%. 5-year anchors: 2.0x≈15%, 2.5x≈20%, 3.0x≈25%, 4.0x≈32%.",
        },
        {
          type: "read",
          heading: "Adjust for the hold",
          body: [
            "The anchors assume a ~5-year hold. A shorter hold means a <strong>higher</strong> IRR for the same MOIC (the money came back faster); a longer hold means lower. If a 2.5x comes back in 3 years instead of 5, the IRR is well above 20% — closer to ~36%.",
          ],
          keyIdea: "2.5x in 3 years ≈ 36% IRR; 2.5x in 7 years ≈ 14% IRR. Same MOIC, very different IRR.",
        },
        {
          type: "numeric",
          heading: "State the IRR",
          prompt: "A deal returns a 4.0x MOIC over a 5-year hold. Approximately what IRR? (use the anchors)",
          fields: [{ key: "irr", label: "Approx IRR", value: 32, unit: "%", tolPct: 0.12 }],
          worked: "4.0x over 5 years ≈ ~32% IRR (4^(1/5) − 1 = 31.9%).",
        },
        {
          type: "check",
          heading: "Lesson check",
          questions: [
            {
              q: "Rule of 72: at a 12% IRR, money doubles in about…",
              options: ["3 years", "6 years", "9 years", "12 years"],
              correct: 1,
            },
            {
              q: "The 5-year anchor for a 3.0x MOIC is about…",
              options: ["~15%", "~20%", "~25%", "~32%"],
              correct: 2,
            },
            {
              q: "Same 2.5x MOIC — which hold gives the higher IRR?",
              options: ["7 years", "5 years", "3 years", "They're equal"],
              correct: 2,
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
        q: "In a sources & uses, sponsor equity is…",
        options: ["set first", "the plug that balances the table", "always 50%", "a use of funds"],
        correct: 1,
      },
      {
        q: "Which is a SOURCE of funds?",
        options: ["Purchase EV", "Transaction fees", "New term loan", "Refinanced debt"],
        correct: 2,
      },
      {
        q: "EV $720M (9.0x on $80M), debt 5.0x. Sponsor equity?",
        options: ["$280M", "$320M", "$400M", "$360M"],
        correct: 1,
      },
      {
        q: "The five paper-LBO steps end with…",
        options: ["entry equity", "exit EV", "MOIC then IRR", "the multiple"],
        correct: 2,
      },
      {
        q: "Exit equity = …",
        options: ["exit EV − net debt at exit", "exit EV × multiple", "entry equity + debt", "EBITDA × 10"],
        correct: 0,
      },
      {
        q: "Entry equity $400M, exit equity $1,100M. MOIC?",
        options: ["2.0x", "2.5x", "2.75x", "3.0x"],
        correct: 2,
      },
      {
        q: "Rule of 72: years to double ≈ 72 ÷ ___.",
        options: ["MOIC", "IRR%", "leverage", "EBITDA"],
        correct: 1,
      },
      {
        q: "5-year anchor for a 2.0x MOIC?",
        options: ["~10%", "~15%", "~25%", "~32%"],
        correct: 1,
      },
      {
        q: "A 3.0x over 5 years is approximately…",
        options: ["~15% IRR", "~20% IRR", "~25% IRR", "~40% IRR"],
        correct: 2,
      },
      {
        q: "For a fixed MOIC, a shorter hold produces a ___ IRR.",
        options: ["lower", "higher", "identical", "negative"],
        correct: 1,
      },
    ],
  },
};
