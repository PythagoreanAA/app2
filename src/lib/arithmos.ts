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
