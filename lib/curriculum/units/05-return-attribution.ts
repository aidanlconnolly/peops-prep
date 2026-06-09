import type { Unit } from "../types";

export const UNIT_RETURN_ATTRIBUTION: Unit = {
  slug: "return-attribution",
  stage: 2,
  order: 2,
  icon: "💧",
  title: "Return attribution",
  tagline: "Decompose a deal's equity gain into the three levers — and read what it tells you.",
  lessons: [
    // ── Lesson 1: the value-creation bridge ───────────────────────────────────
    {
      slug: "ra-value-creation-bridge",
      title: "The value-creation bridge",
      summary: "Splitting the equity gain into EBITDA growth, multiple, and debt paydown.",
      estMinutes: 9,
      pages: [
        {
          type: "read",
          heading: "Where did the return actually come from?",
          body: [
            "Two deals can both return 2.75x and be completely different stories. A <strong>return attribution</strong> (or value-creation bridge) decomposes the equity gain into its three sources so you — and the LPs — can see what really drove it.",
            "The bridge has three pieces. <strong>EBITDA growth</strong> = entry multiple × (exit EBITDA − entry EBITDA). <strong>Multiple expansion</strong> = exit EBITDA × (exit multiple − entry multiple). <strong>Debt paydown</strong> = entry net debt − exit net debt. These three sum to the total equity gain (exit equity − entry equity).",
            "The attribution is the credibility test for an operations thesis: a deal where most of the gain came from EBITDA growth and debt paydown is underwrite-able and repeatable; one that leaned on multiple expansion was, in part, lucky.",
          ],
          keyIdea:
            "Equity gain = EBITDA growth + multiple expansion + debt paydown. The mix tells you whether the return was earned or market-given.",
        },
        {
          type: "framework",
          heading: "The three attribution components",
          items: [
            { term: "EBITDA growth", detail: "entry multiple × (exit EBITDA − entry EBITDA). The operations-driven lever." },
            { term: "Multiple expansion", detail: "exit EBITDA × (exit multiple − entry multiple). Market-given; zero in a flat-multiple deal." },
            { term: "Debt paydown (+ FCF)", detail: "entry net debt − exit net debt. Cash used to repay acquisition debt." },
          ],
        },
        {
          type: "worked",
          heading: "Decompose the classic deal",
          intro: "Entry 10.0x on $100M EBITDA ($1,000M EV), $600M debt. Exit 10.0x on $150M EBITDA, net debt $400M. Entry equity $400M, exit equity $1,100M — a $700M gain.",
          steps: [
            { label: "EBITDA growth", detail: "10.0x × ($150M − $100M) = +$500M." },
            { label: "Multiple expansion", detail: "$150M × (10.0x − 10.0x) = $0M (flat multiple)." },
            { label: "Debt paydown", detail: "$600M − $400M = +$200M." },
            { label: "Total", detail: "$500M + $0M + $200M = $700M = the full equity gain. ✓" },
          ],
          takeaway: "100% of this return is EBITDA growth + debt paydown — a clean, underwrite-able, ops-driven deal.",
        },
        {
          type: "numeric",
          heading: "Attribute the gain",
          prompt:
            "Entry 9.0x on $40M EBITDA, $216M debt. Exit 11.0x on $60M EBITDA, net debt $180M. What is the EBITDA-growth component of the equity gain ($M)?",
          fields: [{ key: "ebitda", label: "EBITDA growth", value: 180, unit: "$M", tol: 1 }],
          worked:
            "EBITDA growth = entry multiple × ΔEBITDA = 9.0x × ($60M − $40M) = 9 × 20 = $180M. (Multiple expansion = $60M × 2.0x = $120M; debt paydown = $216M − $180M = $36M.)",
        },
        {
          type: "check",
          heading: "Lesson check",
          questions: [
            {
              q: "The three attribution components sum to…",
              options: ["the exit EV", "the total equity gain", "the entry equity", "the debt"],
              correct: 1,
            },
            {
              q: "EBITDA growth contribution = …",
              options: [
                "exit EBITDA × exit multiple",
                "entry multiple × (exit EBITDA − entry EBITDA)",
                "exit net debt − entry net debt",
                "MOIC × hold years",
              ],
              correct: 1,
            },
            {
              q: "In a flat-multiple deal, the multiple-expansion component is…",
              options: ["the largest", "negative", "zero", "equal to debt paydown"],
              correct: 2,
            },
          ],
        },
      ],
    },

    // ── Lesson 2: reading attribution ─────────────────────────────────────────
    {
      slug: "ra-reading-attribution",
      title: "Reading attribution",
      summary: "What the mix of levers tells you about a deal — and an ops team.",
      estMinutes: 7,
      pages: [
        {
          type: "read",
          heading: "The mix is the message",
          body: [
            "Once you can build the bridge, the skill is reading it. The <em>shape</em> of the attribution tells you how the return was made and how much credit the operations team can claim.",
            "A deal dominated by <strong>EBITDA growth</strong> is an operations win — the business genuinely got bigger and better, and it's repeatable. A deal that leaned heavily on <strong>multiple expansion</strong> rode the market; it's real money but not a process you can reliably repeat, and it's the riskiest thing to have underwritten. <strong>Debt paydown</strong> sits in between — controllable to the extent ops generated the cash.",
            "In an interview, if you're handed a deal's return, decomposing it and commenting on the mix (\"most of this was multiple expansion, so I'd discount the team's operational claim\") signals real fluency.",
          ],
          keyIdea:
            "EBITDA-growth-heavy = repeatable ops win. Multiple-expansion-heavy = market-given and risky to underwrite.",
        },
        {
          type: "compare",
          heading: "Two 2.5x deals, very different stories",
          columns: ["Operations-driven", "Financial-engineering / market"],
          rows: [
            { dim: "Main driver", a: "EBITDA growth", b: "Multiple expansion" },
            { dim: "Repeatable?", a: "Yes — a process", b: "No — market timing" },
            { dim: "Underwrite risk", a: "Lower (controllable)", b: "Higher (not controllable)" },
            { dim: "Ops team credit", a: "High", b: "Low" },
          ],
        },
        {
          type: "mcq",
          heading: "Check your understanding",
          questions: [
            {
              q: "A deal's 3.0x return is 70% multiple expansion. The best read is…",
              options: [
                "A strong, repeatable operations win",
                "Largely market-given — discount the operational claim and the repeatability",
                "Entirely from debt paydown",
                "Impossible to interpret",
              ],
              correct: 1,
              fb: "Heavy multiple expansion means the return rode the market, not a repeatable process.",
            },
            {
              q: "Which attribution mix best supports an operations team's track record?",
              options: [
                "Mostly multiple expansion",
                "Mostly EBITDA growth",
                "Entirely debt paydown",
                "Negative EBITDA growth",
              ],
              correct: 1,
              fb: "EBITDA-growth-driven returns are the repeatable, ops-credited kind.",
            },
            {
              q: "Why is multiple expansion the riskiest lever to underwrite?",
              options: [
                "It's illegal",
                "You don't control the market or the exit multiple",
                "It lowers EBITDA",
                "It only works with leverage",
              ],
              correct: 1,
              fb: "You can't control whether you'll exit at a higher multiple than you paid.",
            },
          ],
        },
        {
          type: "check",
          heading: "Lesson check",
          questions: [
            {
              q: "An EBITDA-growth-dominated return is best described as…",
              options: ["lucky", "a repeatable operations win", "purely financial", "market-timed"],
              correct: 1,
            },
            {
              q: "Handed a deal's return in an interview, a strong move is to…",
              options: [
                "Quote the MOIC and stop",
                "Decompose it into the three levers and comment on the mix",
                "Assume it was all multiple expansion",
                "Ignore the attribution",
              ],
              correct: 1,
            },
            {
              q: "Debt paydown is controllable to the extent that…",
              options: [
                "the market rises",
                "operations generates the free cash flow to repay debt",
                "the multiple expands",
                "interest rates fall",
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
        q: "Return attribution decomposes the equity gain into…",
        options: [
          "revenue, cost, tax",
          "EBITDA growth, multiple expansion, debt paydown",
          "debt, equity, fees",
          "price, volume, mix",
        ],
        correct: 1,
      },
      {
        q: "EBITDA-growth contribution = …",
        options: [
          "exit EBITDA × exit multiple",
          "entry multiple × (exit EBITDA − entry EBITDA)",
          "entry net debt − exit net debt",
          "exit equity ÷ entry equity",
        ],
        correct: 1,
      },
      {
        q: "Multiple-expansion contribution = …",
        options: [
          "exit EBITDA × (exit multiple − entry multiple)",
          "entry multiple × ΔEBITDA",
          "net debt change",
          "MOIC − 1",
        ],
        correct: 0,
      },
      {
        q: "Debt-paydown contribution = …",
        options: ["exit EV − entry EV", "entry net debt − exit net debt", "EBITDA × 5", "fees"],
        correct: 1,
      },
      {
        q: "The three components sum to…",
        options: ["exit EV", "total equity gain", "entry equity", "the multiple"],
        correct: 1,
      },
      {
        q: "Entry 9.0x, ΔEBITDA +$20M. EBITDA-growth component?",
        options: ["$120M", "$180M", "$200M", "$36M"],
        correct: 1,
      },
      {
        q: "A 70%-multiple-expansion return is best read as…",
        options: ["a repeatable ops win", "largely market-given and risky to underwrite", "all debt paydown", "uninterpretable"],
        correct: 1,
      },
      {
        q: "Which mix most supports an ops team's track record?",
        options: ["mostly multiple expansion", "mostly EBITDA growth", "all debt paydown", "negative growth"],
        correct: 1,
      },
      {
        q: "In a flat-multiple deal, multiple expansion contributes…",
        options: ["the most", "zero", "a negative amount equal to debt", "half"],
        correct: 1,
      },
      {
        q: "The credibility value of an attribution is that it shows whether a return was…",
        options: ["legal", "earned (ops) vs market-given", "taxed", "leveraged"],
        correct: 1,
      },
    ],
  },
};
