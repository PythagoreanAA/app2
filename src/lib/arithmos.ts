export function digitSum(value: string | number): number {
  return String(value).replace(/\D/g, '').split('').reduce((sum, d) => sum + Number(d), 0);
}

export function reduceToEnnead(value: number): number {
  if (value <= 0) return 0;
  let n = value;
  while (n > 9) n = digitSum(n);
  return n;
}

export function birthRoot(isoDate: string): { raw: number; root: number } {
  const raw = digitSum(isoDate);
  return { raw, root: reduceToEnnead(raw) };
}

/**
 * Polar counterpart within the ennead.
 *
 * Rule: n + polarity(n) = 10, so each operator is paired with the one whose
 * ordinal position mirrors it across the sequence — the term that performs
 * the structurally opposite move in a transformation (POSIT vs CULMINATE,
 * DISTINGUISH vs MAGNIFY, RELATE vs TEST, BOUND vs RESTORE). 5 (BREACH) has
 * no complement: it sits at the exact midpoint of the sequence and names the
 * crossing itself, not a position on either side of it.
 *
 * This is a structural claim about the operator sequence, not a numerological
 * assertion about the digit 10. State it as a hypothesis to be used, not a fact
 * to be assumed: Zayin should ask whether the paired operator actually behaves
 * as a rival in recorded episodes, and the confusion ledger in Anamnesis is
 * where that gets checked against real classification friction.
 */
export function polarity(n: number): number | null {
  if (n < 1 || n > 9) return null;
  if (n === 5) return null;
  return 10 - n;
}
