import { useMemo } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Body, Button, C, Card, Eyebrow, H1, H2, Page } from '@/components/ui';
import { OPERATORS } from '@/data/operators';
import { scoreAnswers, signalClarity } from '@/lib/boi';

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

 return <SafeAreaView style={{flex:1,backgroundColor:C.bg}}><ScrollView><Page>
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
   </Card>

   {op&&<Card>
     <Eyebrow>ZAYIN</Eyebrow><H2>Cut confirmation bias.</H2>
     <Body>Do not ask, “Where can I see {primary} in myself?” Ask for episodes where the opposite transformation happened first.</Body>
   </Card>}

   {op&&<Card>
     <Eyebrow>XIPHOS</Eyebrow><H2>What would falsify this reading?</H2>
     <Body>{op.question}</Body>
     <Body muted>The next instrument layer should collect concrete episodes as CONDITION → OBJECT → ACTION → TRANSFORMATION → RESULT and allow counterexamples to alter the profile.</Body>
   </Card>}

   <Card>
     <Eyebrow>INSTRUMENT STATUS</Eyebrow>
     <Body>This is BOI V0.2: a balanced forced-choice research prototype. Its scores are descriptive signals, not validated psychological measurements. Reliability, test–retest stability, construct discrimination, and predictive validity still have to be earned experimentally.</Body>
   </Card>

   <Button label="Record a real episode now" onPress={()=>router.push('/episode')} />
   <Button secondary label="Open Anamnesis record" onPress={()=>router.push('/episodes')} />
   <Button secondary label="Run the test again" onPress={()=>router.replace({pathname:'/assessment',params:{birth:birth??'0'}})} />
   <Button secondary label="Return home" onPress={()=>router.replace('/')} />
 </Page></ScrollView></SafeAreaView>
}

const s=StyleSheet.create({
  grid:{gap:12},
  big:{fontSize:50,fontWeight:'800',color:C.gold},
  rankRow:{flexDirection:'row',gap:12,paddingVertical:10,borderBottomWidth:1,borderBottomColor:C.line},
  rank:{fontSize:16,fontWeight:'800',color:C.gold,width:20},
  rankTitle:{fontSize:16,fontWeight:'800',color:C.ink},
  small:{fontSize:13,color:C.muted,marginTop:2}
});
