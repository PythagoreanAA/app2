import { useEffect, useState } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { Body, Button, C, Card, Eyebrow, H1, H2, Page } from '@/components/ui';
import { OPERATORS } from '@/data/operators';
import { commitPrediction, loadPredictions, makePredictionId, PredictionRecord, resolvePrediction } from '@/lib/predictions';

function OpPicker({value,onChange,exclude}:{value:number|null;onChange:(n:number)=>void;exclude?:number|null}){
 return <View style={s.ops}>{OPERATORS.map(op=><Pressable key={op.n} disabled={exclude===op.n} onPress={()=>onChange(op.n)} style={[s.op,value===op.n&&s.opActive,exclude===op.n&&{opacity:.25}]}><Text style={[s.opText,value===op.n&&{color:C.white}]}>{op.n}</Text></Pressable>)}</View>
}

export default function Prediction(){
 const {id}=useLocalSearchParams<{id?:string}>(); const router=useRouter();
 const [existing,setExisting]=useState<PredictionRecord|null>(null);
 const [situation,setSituation]=useState(''); const [pred,setPred]=useState<number|null>(null); const [rival,setRival]=useState<number|null>(null); const [confidence,setConfidence]=useState<1|2|3|4|5>(3); const [warrant,setWarrant]=useState('');
 const [actual,setActual]=useState<number|null>(null); const [note,setNote]=useState(''); const [ambiguous,setAmbiguous]=useState(false);
 useEffect(()=>{if(id)loadPredictions().then(rows=>setExisting(rows.find(r=>r.id===id)||null));},[id]);
 if(id&&existing){return <SafeAreaView style={{flex:1,backgroundColor:C.bg}}><ScrollView><Page>
   <Eyebrow>RESOLVE FROZEN PREDICTION</Eyebrow><H1>Reality now gets the last word.</H1>
   <Card><Eyebrow>FROZEN FORECAST</Eyebrow><H2>{existing.predictedOperator} · {OPERATORS[existing.predictedOperator-1].verb}</H2><Body>{existing.situation}</Body><Body muted>Rival: {existing.rivalOperator??'none'} · Confidence {existing.confidence}/5</Body><Body muted>Warrant: {existing.warrant||'—'}</Body></Card>
   <Eyebrow>ACTUAL OPERATOR</Eyebrow><OpPicker value={actual} onChange={n=>{setActual(n);setAmbiguous(false)}} />
   <Pressable onPress={()=>{setAmbiguous(!ambiguous);if(!ambiguous)setActual(null)}} style={[s.amb,ambiguous&&s.ambActive]}><Text style={{color:ambiguous?C.white:C.ink,fontWeight:'700'}}>Evidence is genuinely ambiguous</Text></Pressable>
   <TextInput value={note} onChangeText={setNote} placeholder="Outcome notes" placeholderTextColor={C.muted} multiline style={[s.input,{minHeight:100}]} />
   <Button label="Freeze outcome and score" onPress={async()=>{if(!ambiguous&&!actual)return;await resolvePrediction(existing.id,actual,note,ambiguous);router.replace('/predictions')}} />
 </Page></ScrollView></SafeAreaView>}
 return <SafeAreaView style={{flex:1,backgroundColor:C.bg}}><ScrollView><Page>
   <Eyebrow>COMMIT PROSPECTIVE PREDICTION</Eyebrow><H1>Predict first. Interpret later.</H1>
   <Body muted>Describe an unresolved situation. Once committed, the prediction itself is immutable.</Body>
   <TextInput value={situation} onChangeText={setSituation} placeholder="What unresolved event or decision are you forecasting?" placeholderTextColor={C.muted} multiline style={[s.input,{minHeight:110}]} />
   <Eyebrow>PRIMARY PREDICTION</Eyebrow><OpPicker value={pred} onChange={setPred} />
   <Eyebrow>STRONGEST RIVAL</Eyebrow><OpPicker value={rival} onChange={setRival} exclude={pred} />
   <Eyebrow>CONFIDENCE</Eyebrow><View style={s.ops}>{[1,2,3,4,5].map(n=><Pressable key={n} onPress={()=>setConfidence(n as any)} style={[s.op,confidence===n&&s.opActive]}><Text style={[s.opText,confidence===n&&{color:C.white}]}>{n}</Text></Pressable>)}</View>
   <TextInput value={warrant} onChangeText={setWarrant} placeholder="Why this operator rather than its rival?" placeholderTextColor={C.muted} multiline style={[s.input,{minHeight:100}]} />
   <Button label="Commit and freeze prediction" onPress={async()=>{if(!situation.trim()||!pred)return;await commitPrediction({id:makePredictionId(),createdAt:new Date().toISOString(),situation:situation.trim(),predictedOperator:pred,rivalOperator:rival,confidence,warrant:warrant.trim()});router.replace('/predictions')}} />
 </Page></ScrollView></SafeAreaView>
}
const s=StyleSheet.create({input:{backgroundColor:C.white,borderWidth:1,borderColor:C.line,borderRadius:16,padding:15,fontSize:16,color:C.ink,textAlignVertical:'top'},ops:{flexDirection:'row',flexWrap:'wrap',gap:8},op:{width:44,height:44,borderRadius:22,borderWidth:1,borderColor:C.line,alignItems:'center',justifyContent:'center',backgroundColor:C.white},opActive:{backgroundColor:C.lapis,borderColor:C.lapis},opText:{fontWeight:'800',color:C.ink},amb:{padding:14,borderWidth:1,borderColor:C.line,borderRadius:14,backgroundColor:C.white},ambActive:{backgroundColor:C.wine,borderColor:C.wine}});
