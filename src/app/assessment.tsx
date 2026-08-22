import { useMemo, useState } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Body, C, Eyebrow, H1, Page } from '@/components/ui';
import { SCENARIOS } from '@/data/scenarios';

export default function Assessment(){
  const {birth}=useLocalSearchParams<{birth:string}>();
  const router=useRouter();
  const [i,setI]=useState(0);
  const [answers,setAnswers]=useState<number[]>([]);
  const q=SCENARIOS[i];
  const progress=useMemo(()=>`${i+1} / ${SCENARIOS.length}`,[i]);
  const pct=((i+1)/SCENARIOS.length)*100;

  const choose=(op:number)=>{
    const next=[...answers,op];
    if(i===SCENARIOS.length-1){
      router.replace({pathname:'/profile',params:{birth:birth??'0',answers:next.join(',')}});
    }else{
      setAnswers(next);
      setI(i+1);
    }
  };

  return <SafeAreaView style={{flex:1,backgroundColor:C.bg}}><ScrollView><Page>
    <View style={s.meta}><Eyebrow>BEHAVIORAL OPERATOR INSTRUMENT · V0.2</Eyebrow><Text style={s.progress}>{progress}</Text></View>
    <View style={s.track}><View style={[s.fill,{width:`${pct}%`}]} /></View>
    <Text style={s.domain}>{q.domain.toUpperCase()}</Text>
    <H1>{q.prompt}</H1>
    <Body muted>Choose the transformation you would genuinely attempt first—not the answer you admire most. There are no “good” operators.</Body>
    <View style={{gap:10}}>{q.options.map(o=><Pressable key={o.operator} onPress={()=>choose(o.operator)} style={s.option}>
      <Text style={s.num}>{o.operator}</Text><Text style={s.text}>{o.text}</Text>
    </Pressable>)}</View>
    <Body muted>This research prototype measures repeated choice patterns. It is not yet a validated psychological assessment.</Body>
  </Page></ScrollView></SafeAreaView>
}

const s=StyleSheet.create({
  meta:{flexDirection:'row',justifyContent:'space-between',alignItems:'center',gap:12},
  progress:{color:C.muted,fontWeight:'700'},
  track:{height:5,backgroundColor:C.line,borderRadius:99,overflow:'hidden'},
  fill:{height:'100%',backgroundColor:C.gold,borderRadius:99},
  domain:{fontSize:12,fontWeight:'800',letterSpacing:2,color:C.gold},
  option:{backgroundColor:C.white,borderWidth:1,borderColor:C.line,borderRadius:18,padding:16,flexDirection:'row',gap:14,alignItems:'flex-start'},
  num:{fontSize:20,fontWeight:'800',color:C.gold,width:24},
  text:{flex:1,fontSize:16,lineHeight:23,color:C.ink}
});
