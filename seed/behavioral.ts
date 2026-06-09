import type { behavioralPrompts } from "@/lib/db/schema";

type BehavioralSeed = typeof behavioralPrompts.$inferInsert;

const STAR_RUBRIC = {
  dimensions: [
    { key: "star", label: "STAR completeness", weight: 0.2, guidance: "Situation/Task tight; Action-heavy; quantified Result." },
    { key: "influence", label: "Influence / ownership", weight: 0.25, guidance: "Shows driving outcomes without line authority." },
    { key: "impact", label: "Quantified impact", weight: 0.2, guidance: "Concrete, credible numbers." },
    { key: "ops_relevance", label: "Ops relevance", weight: 0.2, guidance: "Maps to value-creation / PortCo work." },
    { key: "concision", label: "Concision", weight: 0.15, guidance: "Crisp, 2 minutes, no rambling." },
  ],
};

export const BEHAVIORAL_PROMPTS: BehavioralSeed[] = [
  {
    id: "b-influence-1",
    competency: "influence",
    prompt: "Tell me about a time you drove change without direct authority.",
    rubric: STAR_RUBRIC,
    exampleStrongAnswer:
      "Strong answers co-own a diagnosis with the people who own the work, quantify the prize with their data, pilot small, and tie the change to the stakeholder's own incentives — closing with a quantified result and what you'd do differently.",
  },
  {
    id: "b-commitment-1",
    competency: "ops_commitment",
    prompt:
      "Why PE operations specifically, and why not a deal-side seat?",
    rubric: STAR_RUBRIC,
    exampleStrongAnswer:
      "You want to build value inside companies, not only price and structure them. Tie consulting (diagnosis + driving change with management) to ops, and show you understand the trade-off vs deal (less modeling/structuring, more ownership of operational outcomes).",
  },
  {
    id: "b-drive-change-1",
    competency: "drive_change",
    prompt:
      "A management team is resisting your recommendation. Walk me through what you do.",
    rubric: STAR_RUBRIC,
    exampleStrongAnswer:
      "Understand the source of resistance, co-own the diagnosis with their data, de-risk with a pilot, quantify the prize, tie to incentives, and use governance only as a gentle backstop. End with the resolution and the relationship preserved.",
  },
  {
    id: "b-conflict-1",
    competency: "conflict",
    prompt:
      "Describe a conflict with a senior stakeholder and how you resolved it.",
    rubric: STAR_RUBRIC,
    exampleStrongAnswer:
      "Frame the substantive disagreement (not a personality clash), show you sought their view, found the shared objective, used data to converge, and preserved the working relationship — with a clear outcome.",
  },
  {
    id: "b-leadership-1",
    competency: "leadership",
    prompt:
      "Tell me about a time you led a team through an ambiguous, high-pressure situation.",
    rubric: STAR_RUBRIC,
    exampleStrongAnswer:
      "Show how you structured ambiguity, set priorities, delegated to strengths, kept the team motivated, and delivered — with a quantified result and what you learned about leading.",
  },
  {
    id: "b-failure-1",
    competency: "failure",
    prompt: "Tell me about a time you failed. What did you learn?",
    rubric: STAR_RUBRIC,
    exampleStrongAnswer:
      "Pick a real failure with genuine ownership (not a humblebrag), explain the root cause honestly, and show the concrete behavior change since. Self-awareness and growth beat a polished non-failure.",
  },
  {
    id: "b-influence-2",
    competency: "influence",
    prompt:
      "Tell me about a recommendation that was initially rejected. How did you get it adopted?",
    rubric: STAR_RUBRIC,
    exampleStrongAnswer:
      "Show you diagnosed why it was rejected (evidence gap, wrong stakeholder, bad timing), addressed that specifically, built a coalition or piloted, and got to adoption — with the outcome.",
  },
  {
    id: "b-drive-change-2",
    competency: "drive_change",
    prompt:
      "Describe a time you had to deliver an uncomfortable, data-driven message to a client or leader.",
    rubric: STAR_RUBRIC,
    exampleStrongAnswer:
      "Lead with how you made hard data land without defensiveness — grounding in their numbers, framing around the shared goal, and proposing a path forward, not just a problem.",
  },
  {
    id: "b-commitment-2",
    competency: "ops_commitment",
    prompt:
      "Walk me through your resume — why does this path make sense from where you've been?",
    rubric: STAR_RUBRIC,
    exampleStrongAnswer:
      "A tight, thesis-driven narrative: each step built diagnosis + execution skills (DD, ops projects), and PE-ops is the natural compounding of that. Avoid a chronological recitation; make it a story that lands on this role.",
  },
  {
    id: "b-leadership-2",
    competency: "leadership",
    prompt:
      "Tell me about a time you motivated people who didn't report to you to hit a deadline.",
    rubric: STAR_RUBRIC,
    exampleStrongAnswer:
      "Cross-functional influence: clarified the shared stakes, removed blockers, made the work visible, and recognized contribution — landing the deadline without authority.",
  },
  {
    id: "b-conflict-2",
    competency: "conflict",
    prompt:
      "Tell me about disagreeing with your own team's analysis. What did you do?",
    rubric: STAR_RUBRIC,
    exampleStrongAnswer:
      "Show intellectual honesty: you pressure-tested the analysis, raised it constructively, and the team converged on a better answer — process over ego.",
  },
  {
    id: "b-failure-2",
    competency: "failure",
    prompt:
      "Describe an initiative that didn't deliver the impact you expected. What would you change?",
    rubric: STAR_RUBRIC,
    exampleStrongAnswer:
      "Own the shortfall, attribute it to a specific cause (over-scoped, under-resourced, weak change-management), and translate it into a sharper approach you'd take now.",
  },
];
