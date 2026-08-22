import { useCallback, useMemo, useState } from 'react';
import { useFocusEffect, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Alert, ScrollView, Share, StyleSheet, Text, TextInput, View } from 'react-native';
import { Body, Button, C, Card, Eyebrow, H1, H2, Metric, Page, Pill } from '@/components/ui';
import { OPERATORS } from '@/data/operators';
import { exportUatCsv, loadFeedback, loadSurveys, loadUatSessions, prepareForNextTester, UatFeedback, UatSession, UatSurvey, uatMetrics } from '@/lib/uat';
import { birthBehaviorAgreement, confusionMatrix, exportResearchCsv, loadParticipants, loadTrials, makeResearchId, ResearchParticipant, ResearchTrial, researchMetrics, saveParticipant } from '@/lib/research';

export default function Research(){
 const router=useRouter(); const [uatSessions,setUatSessions]=useState<UatSession[]>([]); const [feedback,setFeedback]=useState<UatFeedback[]>([]); const [surveys,setSurveys]=useState<UatSurvey[]>([]); const [participants,setParticipants]=useState<ResearchParticipant[]>([]); const [trials,setTrials]=useState<ResearchTrial[]>([]); const [code,setCode]=useState(''); const [birth,setBirth]=useState(''); const [observed,setObserved]=useState('');
 const refresh=useCallback(()=>{Promise.all([loadParticipants(),loadTrials(),loadUatSessions(),loadFeedback(),loadSurveys()]).then(([p,t,u,f,s])=>{setParticipants(p);setTrials(t);setUatSessions(u);setFeedback(f);setSurveys(s)})},[]);
 useFocusEffect(useCallback(()=>{refresh()},[refresh]));
 const metrics=researchMetrics(trials); const um=uatMetrics(uatSessions,surveys); const matrix=useMemo(()=>confusionMatrix(trials),[trials]); const agreement=birthBehaviorAgreement(participants);
 const add=async()=>{const b=Number(birth);const o=Number(observed);if(!code.trim())return;await saveParticipant({id:makeResearchId('p'),code:code.trim().toUpperCase(),createdAt:new Date().toISOString(),birthRoot:b>=1&&b<=9?b:null,observedOperator:o>=1&&o<=9?o:null});setCode('');setBirth('');setObserved('');refresh();};
 const shareResearch=async()=>Share.share({message:exportResearchCsv(participants,trials),title:'PAA V0.10 anonymized research export'});
 const shareUat=async()=>Share.share({message:exportUatCsv(uatSessions,feedback,surveys),title:'PAA V0.10 UAT export'});
 const nextTester=()=>Alert.alert('Prepare for next tester?','This clears the current tester session, unfinished assessment draft, and latest profile from this device. Historical UAT sessions, feedback, surveys, and research records remain available for export.',[{text:'Cancel',style:'cancel'},{text:'Prepare device',style:'destructive',onPress:async()=>{await prepareForNextTester();router.replace('/onboarding')}}]);
 return <SafeAreaView style={{flex:1,backgroundColor:C.bg}}><ScrollView><Page>
   <Pill label="V0.10 · RESEARCHER VIEW" tone="gold"/><Eyebrow>RESEARCH ENGINE</Eyebrow><H1>Make the theory answer to records.</H1>
   <Body muted>This screen is for study administration. Participant experience metrics and model-performance metrics remain separate so commercial enthusiasm cannot overwrite evidence.</Body>

   <Card><Eyebrow>SHARED-DEVICE CONTROL</Eyebrow><H2>One tester leaves no residue for the next.</H2><Body muted>Use this after a participant finishes. It clears only current-session cues and drafts; historical study records remain intact.</Body><Button label="Prepare device for next tester" onPress={nextTester}/></Card>

   <Card><Eyebrow>UAT COHORT HEALTH</Eyebrow><H2>{um.completed}/{um.assessmentStarted} core readings completed</H2><Body muted>{uatSessions.length} sessions · {um.surveyed} final surveys · {feedback.length} issue reports.</Body><View style={s.metrics}><Metric label="COMPLETION" value={`${um.assessmentStarted?Math.round(um.completionRate*100):0}%`} detail="among assessment starters"/><Metric label="SURVEY RETURN" value={`${um.completed?Math.round(um.surveyRate*100):0}%`} detail="among completed readings"/></View><Button secondary label="Export UAT dataset" onPress={shareUat}/></Card>

   <Eyebrow>PRODUCT ACCEPTANCE · 1–5</Eyebrow>
   <View style={s.metrics}><Metric label="COMPREHENSION" value={um.avgComprehension.toFixed(1)} detail="did testers understand it?"/><Metric label="RESULT FIT" value={um.avgResultFit.toFixed(1)} detail="did the result describe behavior?"/><Metric label="USEFULNESS" value={um.avgUsefulness.toFixed(1)} detail="did it offer practical value?"/><Metric label="METHOD TRUST" value={um.avgTrust.toFixed(1)} detail="did the process feel credible?"/></View>
   <Card><Eyebrow>RETURN INTENT</Eyebrow><H2>{um.surveyed?Math.round(um.reuseRate*100):0}% would voluntarily use PAA again</H2><Body muted>Return intent is a product signal, not evidence that PAA's numerical hypotheses are valid.</Body></Card>

   {surveys.slice(0,3).map(s=><Card key={s.id}><Eyebrow>TESTER {s.participantCode} · FINAL UAT</Eyebrow><Body>Comprehension {s.comprehension}/5 · Fit {s.resultFit}/5 · Usefulness {s.usefulness}/5 · Trust {s.trustInMethod}/5</Body>{s.strongestValue?<Body muted>Value: {s.strongestValue}</Body>:null}{s.biggestFriction?<Body muted>Friction: {s.biggestFriction}</Body>:null}</Card>)}
   {feedback.slice(0,3).map(f=><Card key={f.id}><Eyebrow>ISSUE · {f.kind.toUpperCase()} · {f.screen}</Eyebrow><Body>{f.message}</Body><Body muted>{f.participantCode??'anonymous'} · {new Date(f.createdAt).toLocaleDateString()}</Body></Card>)}

   <Eyebrow>MODEL EVIDENCE</Eyebrow>
   <View style={s.metrics}><Metric label="ALL TRIALS" value={metrics.total} detail={`${metrics.open} unresolved`}/><Metric label="EXACT ACCURACY" value={`${metrics.resolved?Math.round(metrics.exactAccuracy*100):0}%`} detail={`${metrics.exact}/${metrics.resolved} resolved`}/></View>
   <Card><Eyebrow>BLINDED SUBSET</Eyebrow><H2>{metrics.blindedResolved?Math.round(metrics.blindedAccuracy*100):0}% exact</H2><Body muted>{metrics.blindedResolved} resolved blinded trials. This is the harder subset because the forecast was committed before outcome knowledge.</Body></Card>
   <Card><Eyebrow>BIRTH GLYPH ↔ OBSERVED BEHAVIOR</Eyebrow><H2>{agreement.eligible?Math.round(agreement.rate*100):0}% agreement</H2><Body muted>{agreement.matches}/{agreement.eligible} participants have both fields recorded. Agreement is descriptive and is not evidence of causation by itself.</Body></Card>

   <Card><Eyebrow>ADD RESEARCH PARTICIPANT</Eyebrow><Body muted>Use an anonymous study code. Birth root and observed operator are optional.</Body><TextInput value={code} onChangeText={setCode} autoCapitalize="characters" placeholder="Participant code" placeholderTextColor={C.muted} style={s.input}/><TextInput value={birth} onChangeText={setBirth} placeholder="Birth root 1–9 (optional)" placeholderTextColor={C.muted} keyboardType="numeric" style={s.input}/><TextInput value={observed} onChangeText={setObserved} placeholder="Observed operator 1–9 (optional)" placeholderTextColor={C.muted} keyboardType="numeric" style={s.input}/><Button label="Create participant" onPress={add}/></Card>
   {participants.map(p=><Card key={p.id}><Eyebrow>PARTICIPANT {p.code}</Eyebrow><Body>Birth root: {p.birthRoot??'—'} · Observed: {p.observedOperator??'—'}</Body><Button secondary label="New blinded trial" onPress={()=>router.push({pathname:'/trial',params:{participantId:p.id}})}/></Card>)}

   <Card><Eyebrow>TRIAL LEDGER</Eyebrow><Body muted>Open trials can be resolved only after the outcome is observed. Resolved trials remain frozen for cohort analysis.</Body></Card>
   {trials.map(t=>{const p=participants.find(x=>x.id===t.participantId);const op=OPERATORS[t.predictedOperator-1];return <Card key={t.id}><Eyebrow>{t.resolvedAt?'RESOLVED':'OPEN'} · {p?.code??'UNKNOWN'} · {t.blinded?'BLINDED':'UNBLINDED'}</Eyebrow><H2>{t.predictedOperator} · {op.verb}</H2><Body muted>Source: {t.predictionSource} · Confidence {t.confidence}/5{t.actualOperator?` · Observed ${t.actualOperator}`:''}</Body>{!t.resolvedAt&&<Button secondary label="Resolve trial" onPress={()=>router.push({pathname:'/trial',params:{id:t.id,participantId:t.participantId}})}/>}</Card>})}

   <Card><Eyebrow>9 × 9 CONFUSION MATRIX</Eyebrow><Body muted>Rows are predicted operators; columns are observed operators. Off-diagonal cells reveal systematic confusions instead of hiding them inside an aggregate accuracy score.</Body><ScrollView horizontal><View><View style={s.matrixRow}><Text style={s.matrixHead}>P\A</Text>{OPERATORS.map(o=><Text key={o.n} style={s.matrixHead}>{o.n}</Text>)}</View>{matrix.map((row,r)=><View key={r} style={s.matrixRow}><Text style={s.matrixHead}>{r+1}</Text>{row.map((v,c)=><Text key={c} style={[s.cell,v>0&&{fontWeight:'800',color:r===c?C.teal:C.wine}]}>{v}</Text>)}</View>)}</View></ScrollView></Card>
   <Button label="Export model-research CSV" onPress={shareResearch}/><Button secondary label="Prospective prediction ledger" onPress={()=>router.push('/predictions')}/><Button secondary label="Return home" onPress={()=>router.replace('/')}/>
 </Page></ScrollView></SafeAreaView>
}
const s=StyleSheet.create({metrics:{flexDirection:'row',flexWrap:'wrap',gap:10},input:{backgroundColor:C.white,borderWidth:1,borderColor:C.line,borderRadius:14,padding:14,fontSize:16,color:C.ink},matrixRow:{flexDirection:'row'},matrixHead:{width:40,paddingVertical:8,textAlign:'center',fontWeight:'800',color:C.ink},cell:{width:40,paddingVertical:8,textAlign:'center',color:C.muted}});
