import type { Stage, UnitPreview } from "./types";

/** The learning journey's stages (sections of the roadmap). */
export const STAGES: Stage[] = [
  {
    number: 1,
    title: "Foundations",
    blurb: "Why operations wins, the value-creation plan, and returns fluency.",
  },
  {
    number: 2,
    title: "Returns & the paper LBO",
    blurb: "Build a paper LBO cold and decompose where the return comes from.",
  },
  {
    number: 3,
    title: "Operational diagnostics",
    blurb: "The value-creation levers and how to diagnose a PortCo.",
  },
  {
    number: 4,
    title: "Behavioral & influence",
    blurb: "Influence without authority, STAR structure, and your story bank.",
  },
  {
    number: 5,
    title: "The interview",
    blurb: "Operational technicals, firm intel, and the mock Superday.",
  },
];

/**
 * Full roadmap outline — every unit across all stages. Units whose slug is in
 * the built UNITS array are interactive; the rest render as locked "soon"
 * previews so the whole journey is visible.
 */
export const UNIT_OUTLINE: UnitPreview[] = [
  // Stage 1 — built
  { slug: "operating-model", stage: 1, order: 1, icon: "🏛️", title: "The operating-partner model", tagline: "Why ops drives ~half of returns, and how ops teams are structured." },
  { slug: "value-creation-plan", stage: 1, order: 2, icon: "🗺️", title: "The value-creation plan", tagline: "100-day plan, EBITDA bridge, and sequencing." },
  { slug: "returns-foundations", stage: 1, order: 3, icon: "📈", title: "Returns, conceptually", tagline: "Three levers, MOIC vs IRR, and leverage." },

  // Stage 2 — built
  { slug: "paper-lbo", stage: 2, order: 1, icon: "🧮", title: "The paper LBO", tagline: "Build a deal from sources & uses to IRR — the math you'll do cold." },
  { slug: "return-attribution", stage: 2, order: 2, icon: "💧", title: "Return attribution", tagline: "Decompose a deal's equity gain into the three levers." },

  // Stage 3 — built
  { slug: "value-creation-levers", stage: 3, order: 1, icon: "🔧", title: "Value-creation levers", tagline: "Pricing, commercial, cost, procurement, working capital, M&A." },
  { slug: "diagnosing-a-portco", stage: 3, order: 2, icon: "🩺", title: "Diagnosing a PortCo", tagline: "Frame, benchmark, prioritize — diagnose before you act." },

  // Stage 4 — preview
  { slug: "influence-without-authority", stage: 4, order: 1, icon: "🤝", title: "Influence without authority", tagline: "Co-own the diagnosis, pilot, tie to incentives." },
  { slug: "star-and-stories", stage: 4, order: 2, icon: "⭐", title: "STAR & your stories", tagline: "Structure behaviorals and build your anecdote bank." },

  // Stage 5 — preview
  { slug: "operational-technicals", stage: 5, order: 1, icon: "⚙️", title: "Operational technicals", tagline: "Measuring initiatives, landing change, prioritizing levers." },
  { slug: "firm-intel", stage: 5, order: 2, icon: "🏢", title: "Firm intel", tagline: "Models, processes, comp, and fit across the major ops groups." },
  { slug: "the-superday", stage: 5, order: 3, icon: "🎯", title: "The Superday", tagline: "Chain it all into a timed, scored mock." },
];
