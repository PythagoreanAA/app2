import AsyncStorage from '@react-native-async-storage/async-storage';

export type PredictionSource = 'birth' | 'boi' | 'researcher' | 'other';

export type ResearchParticipant = {
  id: string;
  code: string;
  createdAt: string;
  birthRoot?: number | null;
  observedOperator?: number | null;
};

export type ResearchTrial = {
  id: string;
  participantId: string;
  createdAt: string;
  predictedOperator: number;
  predictionSource: PredictionSource;
  confidence: 1 | 2 | 3 | 4 | 5;
  blinded: boolean;
  rationale?: string;
  actualOperator?: number | null;
  resolvedAt?: string | null;
  ambiguous?: boolean;
  note?: string;
};

const PARTICIPANTS_KEY = 'paa:research:participants:v06';
const TRIALS_KEY = 'paa:research:trials:v06';

async function loadArray<T>(key:string):Promise<T[]> {
  const raw = await AsyncStorage.getItem(key);
  if (!raw) return [];
  try { const parsed = JSON.parse(raw) as T[]; return Array.isArray(parsed) ? parsed : []; } catch { return []; }
}

export const loadParticipants = () => loadArray<ResearchParticipant>(PARTICIPANTS_KEY);
export const loadTrials = () => loadArray<ResearchTrial>(TRIALS_KEY);

export async function saveParticipant(record:ResearchParticipant){
  const current = await loadParticipants();
  await AsyncStorage.setItem(PARTICIPANTS_KEY, JSON.stringify([record, ...current.filter(p=>p.id!==record.id)]));
}

export async function saveTrial(record:ResearchTrial){
  const current = await loadTrials();
  await AsyncStorage.setItem(TRIALS_KEY, JSON.stringify([record, ...current.filter(t=>t.id!==record.id)]));
}

export async function resolveTrial(id:string, actualOperator:number|null, ambiguous:boolean, note:string){
  const current=await loadTrials();
  const next=current.map(t=>t.id===id && !t.resolvedAt ? {...t,actualOperator,ambiguous,note,resolvedAt:new Date().toISOString()} : t);
  await AsyncStorage.setItem(TRIALS_KEY,JSON.stringify(next));
}

export function makeResearchId(prefix:string){return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2,7)}`;}

export function researchMetrics(trials:ResearchTrial[]){
  const resolved=trials.filter(t=>t.resolvedAt && !t.ambiguous && t.actualOperator);
  const exact=resolved.filter(t=>t.actualOperator===t.predictedOperator).length;
  const blinded=resolved.filter(t=>t.blinded);
  const blindedExact=blinded.filter(t=>t.actualOperator===t.predictedOperator).length;
  return {
    total:trials.length,
    open:trials.filter(t=>!t.resolvedAt).length,
    resolved:resolved.length,
    exact,
    exactAccuracy:resolved.length?exact/resolved.length:0,
    blindedResolved:blinded.length,
    blindedAccuracy:blinded.length?blindedExact/blinded.length:0,
  };
}

export function confusionMatrix(trials:ResearchTrial[]){
  const matrix=Array.from({length:9},()=>Array(9).fill(0) as number[]);
  trials.filter(t=>t.resolvedAt && !t.ambiguous && t.actualOperator).forEach(t=>{
    const r=t.predictedOperator-1; const c=(t.actualOperator as number)-1;
    if(r>=0&&r<9&&c>=0&&c<9) matrix[r][c]+=1;
  });
  return matrix;
}

export function birthBehaviorAgreement(participants:ResearchParticipant[]){
  const eligible=participants.filter(p=>p.birthRoot&&p.observedOperator);
  const matches=eligible.filter(p=>p.birthRoot===p.observedOperator).length;
  return {eligible:eligible.length,matches,rate:eligible.length?matches/eligible.length:0};
}

function csvEscape(value:unknown){
  const s=String(value??'');
  return `"${s.replace(/"/g,'""')}"`;
}

export function exportResearchCsv(participants:ResearchParticipant[],trials:ResearchTrial[]){
  const byId=new Map(participants.map(p=>[p.id,p]));
  const header=['participant_code','birth_root','observed_operator','trial_id','created_at','prediction_source','predicted_operator','confidence','blinded','actual_operator','ambiguous','resolved_at','rationale','note'];
  const rows=trials.map(t=>{
    const p=byId.get(t.participantId);
    return [p?.code,p?.birthRoot,p?.observedOperator,t.id,t.createdAt,t.predictionSource,t.predictedOperator,t.confidence,t.blinded,t.actualOperator,t.ambiguous,t.resolvedAt,t.rationale,t.note].map(csvEscape).join(',');
  });
  return [header.join(','),...rows].join('\n');
}
