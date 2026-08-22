import { OPERATOR_EXPOSURE, SCENARIOS } from '@/data/scenarios';

export type OperatorScore = {
  operator: number;
  selections: number;
  exposure: number;
  rate: number;
};

export function scoreAnswers(answerString?: string): OperatorScore[] {
  const counts = new Map<number, number>();
  (answerString || '')
    .split(',')
    .filter(Boolean)
    .map(Number)
    .forEach((n) => counts.set(n, (counts.get(n) || 0) + 1));

  return Array.from({ length: 9 }, (_, i) => i + 1)
    .map((operator) => {
      const selections = counts.get(operator) || 0;
      const exposure = OPERATOR_EXPOSURE[operator] || 1;
      return { operator, selections, exposure, rate: selections / exposure };
    })
    .sort((a, b) => b.rate - a.rate || b.selections - a.selections || a.operator - b.operator);
}

export function signalClarity(scores: OperatorScore[], answeredCount: number) {
  if (answeredCount < SCENARIOS.length) return 'INCOMPLETE';
  const first = scores[0]?.rate || 0;
  const second = scores[1]?.rate || 0;
  const gap = first - second;
  if (gap >= 0.25) return 'DISTINCT';
  if (gap >= 0.12) return 'EMERGING';
  return 'MIXED';
}
