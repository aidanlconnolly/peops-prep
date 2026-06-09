/**
 * Pure LBO / returns math. No React, no DB — unit-testable and reused by the
 * paper-LBO walker and the numeric quiz grader.
 *
 * Conventions: all $ values in millions, multiples as turns of EBITDA.
 */

export type LboInputs = {
  entryEbitda: number;
  entryMultiple: number;
  /** Debt as a fraction of entry EV (e.g. 0.6 = 60% debt). */
  leveragePct: number;
  exitEbitda: number;
  exitMultiple: number;
  /** Net debt remaining at exit (after paydown). */
  exitNetDebt: number;
  holdYears: number;
  /** Optional financing/transaction fees added to uses (default 0). */
  fees?: number;
};

export type LboResult = {
  entryEv: number;
  entryDebt: number;
  entryEquity: number;
  exitEv: number;
  exitEquity: number;
  moic: number;
  irr: number; // as a percentage, e.g. 22.3
  attribution: {
    ebitdaGrowth: number;
    multipleExpansion: number;
    debtPaydown: number;
  };
};

/** Annualized IRR implied by a cash multiple over a hold, as a percentage. */
export function irrFromMoic(moic: number, years: number): number {
  if (moic <= 0 || years <= 0) return 0;
  return (Math.pow(moic, 1 / years) - 1) * 100;
}

/** Rule-of-72 estimate of years to double at a given IRR%. */
export function rule72Years(irrPct: number): number {
  if (irrPct <= 0) return Infinity;
  return 72 / irrPct;
}

export function computeLbo(inp: LboInputs): LboResult {
  const fees = inp.fees ?? 0;
  const entryEv = inp.entryEbitda * inp.entryMultiple;
  const entryDebt = entryEv * inp.leveragePct;
  // Equity plug funds the rest of EV plus fees.
  const entryEquity = entryEv - entryDebt + fees;

  const exitEv = inp.exitEbitda * inp.exitMultiple;
  const exitEquity = exitEv - inp.exitNetDebt;

  const moic = entryEquity > 0 ? exitEquity / entryEquity : 0;
  const irr = irrFromMoic(moic, inp.holdYears);

  // Value-creation bridge — these three sum to (exitEquity - entryEquity)
  // when fees are 0; with fees, the residual sits in the equity base.
  const ebitdaGrowth =
    inp.entryMultiple * (inp.exitEbitda - inp.entryEbitda);
  const multipleExpansion =
    inp.exitEbitda * (inp.exitMultiple - inp.entryMultiple);
  const debtPaydown = entryDebt - inp.exitNetDebt;

  return {
    entryEv,
    entryDebt,
    entryEquity,
    exitEv,
    exitEquity,
    moic,
    irr,
    attribution: { ebitdaGrowth, multipleExpansion, debtPaydown },
  };
}

/** Round to n decimals (returns a number, not a string). */
export function round(n: number, decimals = 2): number {
  const f = Math.pow(10, decimals);
  return Math.round(n * f) / f;
}
