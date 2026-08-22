import { useCallback, useState } from 'react';
import { useFocusEffect, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Body, Button, C, Card, Eyebrow, H1, H2, Page } from '@/components/ui';
import { OPERATORS } from '@/data/operators';
import { loadPredictions, predictionStats, predictionVerdict, PredictionRecord } from '@/lib/predictions';

export default function Predictions(){
  const router=useRouter();
  const [records,setRecords]=useState<PredictionRecord[]>([]);
  const refresh=useCallback(()=>{loadPredictions().then(setRecords)},[]);
  useFocusEffect(useCallback(()=>{refresh();},[refresh]));
  const stats=predictionStats(records);
  return <SafeAreaView style={{flex:1,backgroundColor:C.bg}}><ScrollView><Page>
    <Eyebrow>PROSPECTIVE PREDICTION · V0.7</Eyebrow>
    <H1>Freeze the forecast before reality answers.</H1>
    <Body muted>A committed prediction cannot be edited after the fact. Once resolved, the app computes exact hit, rival hit, miss, or genuine ambiguity.</Body>
    <View style={s.grid}>
      <Card><Eyebrow>EXACT</Eyebrow><Text style={s.big}>{stats.resolved?Math.round(stats.exactAccuracy*100):0}%</Text><Body muted>{stats.exact}/{stats.resolved} scorable</Body></Card>
      <Card><Eyebrow>OPEN</Eyebrow><Text style={s.big}>{stats.open}</Text><Body muted>awaiting outcome</Body></Card>
    </View>
    <Button label="Commit a new prediction" onPress={()=>router.push('/prediction')} />
    {records.map(record=>{
      const verdict=predictionVerdict(record); const pred=OPERATORS[record.predictedOperator-1]; const actual=record.actualOperator?OPERATORS[record.actualOperator-1]:null;
      return <Card key={record.id}>
        <Eyebrow>{verdict.toUpperCase()} · CONFIDENCE {record.confidence}/5</Eyebrow>
        <H2>{record.predictedOperator} · {pred?.verb}</H2>
        <Body>{record.situation}</Body>
        {actual?<Body muted>Observed: {record.actualOperator} · {actual.verb}</Body>:<Body muted>Prediction is frozen and unresolved.</Body>}
        {record.rivalOperator?<Body muted>Frozen rival: {record.rivalOperator} · {OPERATORS[record.rivalOperator-1]?.verb}</Body>:null}
        {verdict==='open'&&<Button secondary label="Resolve this prediction" onPress={()=>router.push({pathname:'/prediction',params:{id:record.id}})} />}
      </Card>
    })}
    <Button secondary label="Return home" onPress={()=>router.replace('/')} />
  </Page></ScrollView></SafeAreaView>
}
const s=StyleSheet.create({grid:{gap:12},big:{fontSize:42,fontWeight:'800',color:C.gold}});
