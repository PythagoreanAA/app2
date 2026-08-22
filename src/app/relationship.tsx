import { useState } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView, Pressable, StyleSheet, Text, View } from 'react-native';
import { Body, Button, C, Card, Eyebrow, H1, H2, OperatorBadge, Page, Pill } from '@/components/ui';
import { OPERATORS } from '@/data/operators';

function relationText(a:number,b:number){
 if(a===b)return {title:'Shared operation, doubled force',body:`Both sides may reach first for ${OPERATORS[a-1].verb}. Agreement can feel immediate, but the shared distortion can also go unchallenged. The useful question is who supplies the missing counter-operation when ${a} is insufficient.`};
 const A=OPERATORS[a-1],B=OPERATORS[b-1];
 return {title:`${A.verb} meets ${B.verb}`,body:`The field is not “compatible” or “incompatible.” One side tends to transform through ${A.movement}; the other through ${B.movement}. Friction becomes informative when you ask which transformation the situation actually requires, and whether one operator is being applied to the wrong object.`};
}
export default function Relationship(){const params=useLocalSearchParams<{a?:string;b?:string}>();const router=useRouter();const [a,setA]=useState(Number(params.a)||1);const [b,setB]=useState(Number(params.b)||6);const A=OPERATORS[a-1],B=OPERATORS[b-1],r=relationText(a,b);return <SafeAreaView style={{flex:1,backgroundColor:C.bg}}><ScrollView><Page>
 <Eyebrow>RELATIONSHIP FIELD</Eyebrow><H1>Compare operations, not personalities.</H1><Body muted>This is not a compatibility percentage. It asks what each operator tends to do to a shared situation and where those transformations cooperate, compete, or require sequence.</Body>
 <Card><Eyebrow>OPERATOR A</Eyebrow><View style={s.picker}>{OPERATORS.map(o=><Pressable key={o.n} onPress={()=>setA(o.n)} style={[s.num,a===o.n&&s.numOn]}><Text style={[s.numText,a===o.n&&s.numTextOn]}>{o.n}</Text></Pressable>)}</View><OperatorBadge n={A.n} verb={A.verb}/><Body muted>{A.movement}</Body></Card>
 <Card><Eyebrow>OPERATOR B</Eyebrow><View style={s.picker}>{OPERATORS.map(o=><Pressable key={o.n} onPress={()=>setB(o.n)} style={[s.num,b===o.n&&s.numOn]}><Text style={[s.numText,b===o.n&&s.numTextOn]}>{o.n}</Text></Pressable>)}</View><OperatorBadge n={B.n} verb={B.verb}/><Body muted>{B.movement}</Body></Card>
 <Card><Pill label="DYAD READING" tone="gold"/><H2>{r.title}</H2><Body>{r.body}</Body></Card>
 <Card><Eyebrow>ZAYIN</Eyebrow><H2>Do not confuse role with essence.</H2><Body muted>A person may invoke a different operator in another domain. Before calling this a stable dyad, look for repeated episodes where the same transformation conflict recurs across contexts.</Body></Card>
 <Card><Eyebrow>XIPHOS</Eyebrow><H2>Which operator does the object require?</H2><Body>If the object is a broken relationship, RESTORE may be warranted. If it is a false claim, TEST may be warranted. The operator that feels most natural is not automatically the operator the situation needs.</Body></Card>
 <Button secondary label="Return home" onPress={()=>router.replace('/')}/>
 </Page></ScrollView></SafeAreaView>}
const s=StyleSheet.create({picker:{flexDirection:'row',flexWrap:'wrap',gap:7},num:{width:34,height:34,borderRadius:12,borderWidth:1,borderColor:C.line,alignItems:'center',justifyContent:'center',backgroundColor:C.white},numOn:{backgroundColor:C.lapis,borderColor:C.lapis},numText:{fontWeight:'900',color:C.lapis},numTextOn:{color:C.white}});
