import AsyncStorage from '@react-native-async-storage/async-storage';

export type UatSession = {
  id:string; participantCode:string; startedAt:string; completedAt?:string|null;
  consented:boolean; onboardingCompleted:boolean; assessmentStarted:boolean; assessmentCompleted:boolean; surveyCompleted?:boolean;
  birthRoot?:number|null; observedOperator?:number|null; clarity?:string|null;
};
export type FeedbackKind='confusing'|'bug'|'wrong'|'helpful'|'other';
export type UatFeedback={id:string;sessionId?:string|null;participantCode?:string|null;screen:string;kind:FeedbackKind;message:string;createdAt:string};
export type UatSurvey={id:string;sessionId:string;participantCode:string;createdAt:string;comprehension:number;resultFit:number;usefulness:number;trustInMethod:number;wouldUseAgain:boolean;strongestValue:string;biggestFriction:string;};

// Keep the established session/feedback keys so V0.10 can read V0.8/V0.9 local records.
const SESSION_KEY='paa:uat:session:v08';
const SESSIONS_KEY='paa:uat:sessions:v08';
const FEEDBACK_KEY='paa:uat:feedback:v08';
const SURVEY_KEY='paa:uat:surveys:v10';

export function makeId(prefix:string){return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2,7)}`;}
export function normalizeParticipantCode(value:string){return value.trim().toUpperCase().replace(/[^A-Z0-9_-]/g,'').slice(0,24)}
async function arr<T>(key:string):Promise<T[]>{const raw=await AsyncStorage.getItem(key);if(!raw)return[];try{const x=JSON.parse(raw);return Array.isArray(x)?x:[]}catch{return[]}}
export async function loadCurrentSession():Promise<UatSession|null>{const raw=await AsyncStorage.getItem(SESSION_KEY);if(!raw)return null;try{return JSON.parse(raw) as UatSession}catch{return null}}
export async function saveCurrentSession(s:UatSession){await AsyncStorage.setItem(SESSION_KEY,JSON.stringify(s));const all=await arr<UatSession>(SESSIONS_KEY);await AsyncStorage.setItem(SESSIONS_KEY,JSON.stringify([s,...all.filter(x=>x.id!==s.id)]));}
export async function patchCurrentSession(patch:Partial<UatSession>){const s=await loadCurrentSession();if(!s)return null;const next={...s,...patch};await saveCurrentSession(next);return next;}
export async function startUatSession(participantCode:string){const clean=normalizeParticipantCode(participantCode);const s:UatSession={id:makeId('uat'),participantCode:clean,startedAt:new Date().toISOString(),consented:true,onboardingCompleted:true,assessmentStarted:false,assessmentCompleted:false,surveyCompleted:false};await saveCurrentSession(s);return s;}
export async function loadUatSessions(){return arr<UatSession>(SESSIONS_KEY)}
export async function saveFeedback(f:Omit<UatFeedback,'id'|'createdAt'>){const all=await arr<UatFeedback>(FEEDBACK_KEY);const item:UatFeedback={...f,id:makeId('fb'),createdAt:new Date().toISOString()};await AsyncStorage.setItem(FEEDBACK_KEY,JSON.stringify([item,...all]));return item}
export async function loadFeedback(){return arr<UatFeedback>(FEEDBACK_KEY)}
export async function saveSurvey(s:Omit<UatSurvey,'id'|'createdAt'>){const all=await arr<UatSurvey>(SURVEY_KEY);const item:UatSurvey={...s,id:makeId('survey'),createdAt:new Date().toISOString()};await AsyncStorage.setItem(SURVEY_KEY,JSON.stringify([item,...all.filter(x=>x.sessionId!==s.sessionId)]));await patchCurrentSession({surveyCompleted:true});return item}
export async function loadSurveys(){return arr<UatSurvey>(SURVEY_KEY)}
export function uatMetrics(sessions:UatSession[],surveys:UatSurvey[]=[]){const started=sessions.length;const onboarding=sessions.filter(x=>x.onboardingCompleted).length;const assessmentStarted=sessions.filter(x=>x.assessmentStarted).length;const completed=sessions.filter(x=>x.assessmentCompleted).length;const surveyed=surveys.length;const avg=(key:keyof Pick<UatSurvey,'comprehension'|'resultFit'|'usefulness'|'trustInMethod'>)=>surveyed?surveys.reduce((sum,s)=>sum+Number(s[key]||0),0)/surveyed:0;return{started,onboarding,assessmentStarted,completed,surveyed,onboardingRate:started?onboarding/started:0,completionRate:assessmentStarted?completed/assessmentStarted:0,surveyRate:completed?surveyed/completed:0,avgComprehension:avg('comprehension'),avgResultFit:avg('resultFit'),avgUsefulness:avg('usefulness'),avgTrust:avg('trustInMethod'),reuseRate:surveyed?surveys.filter(x=>x.wouldUseAgain).length/surveyed:0}}
export function exportUatCsv(sessions:UatSession[],feedback:UatFeedback[],surveys:UatSurvey[]=[]){const esc=(v:unknown)=>`"${String(v??'').replace(/"/g,'""')}"`;const header=['record_type','participant_code','session_id','started_at','completed_at','assessment_started','assessment_completed','survey_completed','birth_root','observed_operator','clarity','screen','feedback_kind','feedback_message','feedback_at','comprehension','result_fit','usefulness','trust_in_method','would_use_again','strongest_value','biggest_friction','survey_at'];const rows:string[]=[];sessions.forEach(s=>rows.push(['session',s.participantCode,s.id,s.startedAt,s.completedAt,s.assessmentStarted,s.assessmentCompleted,s.surveyCompleted,s.birthRoot,s.observedOperator,s.clarity,'','','','','','','','','','','',''].map(esc).join(',')));feedback.forEach(f=>rows.push(['feedback',f.participantCode,f.sessionId,'','','','','','','','',f.screen,f.kind,f.message,f.createdAt,'','','','','','','',''].map(esc).join(',')));surveys.forEach(s=>rows.push(['survey',s.participantCode,s.sessionId,'','','','','','','','','','','','','',s.comprehension,s.resultFit,s.usefulness,s.trustInMethod,s.wouldUseAgain,s.strongestValue,s.biggestFriction,s.createdAt].map(esc).join(',')));return[header.join(','),...rows].join('\n')}
