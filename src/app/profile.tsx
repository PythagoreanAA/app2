import { useEffect, useMemo } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Body, Button, C, Card, Eyebrow, H1, H2, Page, Pill } from '@/components/ui';
import { OPERATORS } from '@/data/operators';
import { scoreAnswers, signalClarity } from '@/lib/boi';
import { polarity } from '@/lib/arithmos';
import { saveLatestProfile } from '@/lib/profileStore';
import { patchCurrentSession } from '@/lib/uat';

export default function Profile(){
 const {birth,answers}=useLocalSearchParams<{birth:string;answers:string}>();
 const router=useRouter();
 const scores=useMemo(()=>scoreAnswers(answers),[answers]);
 const answeredCount=useMemo(()=>(answers||'').split(',').filter(Boolean).length,[answers]);
 const primary=scores[0]?.operator||0;
 const op=OPERATORS[primary-1];
 const convergence=Number(birth)===primary;
 const clarity=signalClarity(scores,answeredCount);
 const top=scores.slice(0,3);
 useEffect(()=>{
   if(!primary || answeredCount===0) return;
   saveLatestProfile({birthRoot:Number(birth)||null,primary,top:top.map(x=>({operator:x.operator,rate:x.rate,selections:x.selections})),clarity,answered:answeredCount,createdAt:new Date().toISOString()});
   patchCurrentSession({assessmentCompleted:true,completedAt:new Date().toISOString(),birthRoot:Number(birth)||null,observedOperator:primary,clarity});
 },[primary,answeredCount,birth,clarity,answers]);

 return <SafeAreaView style={{flex:1,backgroundColor:C.bg}}><ScrollView><Page>
   <Pill label="V0.10 · CORE READING COMPLETE" tone="gold"/>
   <Eyebrow>CONVERGENCE READING</Eyebrow>
   <H1>Your number made a prediction. Your choices supplied independent evidence.</H1>
   <View style={s.grid}>
     <Card><Eyebrow>GLYPH</Eyebrow><Text style={s.big}>{birth||'—'}</Text><Body muted>Numerical hypothesis</Body></Card>
     <Card><Eyebrow>OBSERVED</Eyebrow><Text style={s.big}>{primary||'—'}</Text><Body muted>Highest behavioral signal</Body></Card>
   </View>

   {op&&<Card>
     <Eyebrow>{convergence?'CONVERGENCE':'DIVERGENCE'} · {clarity}</Eyebrow>
     <H2>{primary} · {op.verb}</H2>
     <Body>{op.strength}</Body>
     <Body muted>{convergence
       ? 'The current sample supports the birth-glyph hypothesis. This is convergence, not proof; later observations should still try to break the reading.'
       : 'The current sample does not match the birth-glyph hypothesis. PAA preserves the disagreement rather than inventing an explanation to rescue the glyph.'}</Body>
   </Card>}

   <Card>
     <Eyebrow>TOP OPERATOR SIGNALS</Eyebrow>
     {top.map((score,index)=>{
       const item=OPERATORS[score.operator-1];
       return <View key={score.operator} style={s.rankRow}>
         <Text style={s.rank}>{index+1}</Text>
         <View style={{flex:1}}><Text style={s.rankTitle}>{score.operator} · {item.verb}</Text><Text style={s.small}>{score.selections} selections · {Math.round(score.rate*100)}% of appearances</Text></View>
       </View>
     })}
     <Body muted>Each operator appeared in exactly 12 answer positions. Rates therefore compare like with like.</Body>
     <Body muted>{clarity==='DISTINCT'
       ? `A gap this size is worth treating as a real signal. Test it against lived episodes rather than simply retaking the instrument.`
       : clarity==='EMERGING'
       ? `The lead is real but not decisive. Record five or more episodes before trusting ${op?.verb ?? 'the top operator'} over the runner-up.`
       : clarity==='MIXED'
       ? `The top two operators are close enough that this instrument alone cannot separate them. Treat both as live hypotheses until Anamnesis episodes break the tie.`
       : `Answer every item before drawing a conclusion — a partial run cannot support any reading.`}</Body>
   </Card>

   {op&&<Card>
     <Eyebrow>ZAYIN</Eyebrow><H2>Cut confirmation bias.</H2>
     <Body>Do not ask, “Where can I see {primary} in myself?” That question always finds evidence. Ask instead for concrete episodes where {op.n} · {op.verb} did not go first.</Body>
     {(() => {
       const pole = polarity(primary);
       const rival = pole ? OPERATORS[pole-1] : null;
       return rival
         ? <Body muted>Its structural counterpart is {rival.n} · {rival.verb} ({rival.movement}). If your episodes keep producing that instead of {op.verb}, the reading is not converging — it is being overwritten.</Body>
         : <Body muted>{op.verb} has no structural counterpart on the ennead. Its failure mode is not a rival operator but episodes in which the expected transformation simply does not occur.</Body>;
     })()}
   </Card>}

   {op&&<Card>
     <Eyebrow>XIPHOS</Eyebrow><H2>What would falsify this reading?</H2>
     <Body>{op.question}</Body>
     <Body muted>Use CONDITION → OBJECT → ACTION → TRANSFORMATION → RESULT to record counterexamples as carefully as confirmations.</Body>
   </Card>}

   <Card>
     <Eyebrow>INSTRUMENT STATUS</Eyebrow>
     <Body>The balanced 36-item BOI is a research prototype. Scores are descriptive signals, not validated psychological measurements. Reliability, test–retest stability, construct discrimination, and predictive validity must be earned experimentally.</Body>
   </Card>

   <Button label="Complete the final UAT survey" onPress={()=>router.push('/uat-complete')} />
   <Button secondary label="Report a specific issue instead" onPress={()=>router.push({pathname:'/feedback',params:{screen:'profile-result'}})} />
   <Button secondary label="Record a real episode now" onPress={()=>router.push('/episode')} />
   <Button secondary label="Open Anamnesis record" onPress={()=>router.push('/episodes')} />
   <Button secondary label="Return home" onPress={()=>router.replace('/')} />
 </Page></ScrollView></SafeAreaView>
}

const s=StyleSheet.create({
  grid:{gap:12},big:{fontSize:50,fontWeight:'800',color:C.gold},rankRow:{flexDirection:'row',gap:12,paddingVertical:10,borderBottomWidth:1,borderBottomColor:C.line},rank:{fontSize:16,fontWeight:'800',color:C.gold,width:20},rankTitle:{fontSize:16,fontWeight:'800',color:C.ink},small:{fontSize:13,color:C.muted,marginTop:2}
});
