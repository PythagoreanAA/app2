import AsyncStorage from '@react-native-async-storage/async-storage';

export type PredictionVerdict = 'exact' | 'rival' | 'miss' | 'ambiguous';

export type PredictionRecord = {
  id: string;
  createdAt: string;
  situation: string;
  predictedOperator: number;
  rivalOperator: number | null;
  confidence: 1 | 2 | 3 | 4 | 5;
  warrant: string;
  resolvedAt?: string | null;
  actualOperator?: number | null;
  outcomeNote?: string;
  ambiguous?: boolean;
};

const KEY = 'paa:predictions:v05';

export async function loadPredictions(): Promise<PredictionRecord[]> {
  const raw = await AsyncStorage.getItem(KEY);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw) as PredictionRecord[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export async function commitPrediction(record: PredictionRecord): Promise<void> {
  const current = await loadPredictions();
  await AsyncStorage.setItem(KEY, JSON.stringify([record, ...current]));
}

export async function resolvePrediction(id: string, actualOperator: number | null, outcomeNote: string, ambiguous = false): Promise<void> {
  const current = await loadPredictions();
  const next = current.map((record) => record.id === id && !record.resolvedAt
    ? { ...record, actualOperator, outcomeNote, ambiguous, resolvedAt: new Date().toISOString() }
    : record
  );
  await AsyncStorage.setItem(KEY, JSON.stringify(next));
}

export function predictionVerdict(record: PredictionRecord): PredictionVerdict | 'open' {
  if (!record.resolvedAt) return 'open';
  if (record.ambiguous || !record.actualOperator) return 'ambiguous';
  if (record.actualOperator === record.predictedOperator) return 'exact';
  if (record.rivalOperator && record.actualOperator === record.rivalOperator) return 'rival';
  return 'miss';
}

export function predictionStats(records: PredictionRecord[]) {
  const resolved = records.filter((r) => r.resolvedAt && !r.ambiguous && r.actualOperator);
  const exact = resolved.filter((r) => predictionVerdict(r) === 'exact').length;
  const rival = resolved.filter((r) => predictionVerdict(r) === 'rival').length;
  const miss = resolved.filter((r) => predictionVerdict(r) === 'miss').length;
  const ambiguous = records.filter((r) => predictionVerdict(r) === 'ambiguous').length;
  const byConfidence = [1,2,3,4,5].map((confidence) => {
    const subset = resolved.filter((r) => r.confidence === confidence);
    const hits = subset.filter((r) => predictionVerdict(r) === 'exact').length;
    return { confidence, total: subset.length, exact: hits, accuracy: subset.length ? hits / subset.length : 0 };
  });
  return { total: records.length, open: records.filter((r) => !r.resolvedAt).length, resolved: resolved.length, exact, rival, miss, ambiguous, exactAccuracy: resolved.length ? exact / resolved.length : 0, byConfidence };
}

export function makePredictionId(){
  return `pred-${Date.now()}-${Math.random().toString(36).slice(2,8)}`;
}
