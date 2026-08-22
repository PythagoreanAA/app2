import { useEffect, useMemo, useState } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Body, Button, C, Eyebrow, H1, Page } from '@/components/ui';
import { SCENARIOS } from '@/data/scenarios';

const DRAFT_KEY = 'paa:assessment:draft';

export default function Assessment(){
  const {birth}=useLocalSearchParams<{birth:string}>();
  const router=useRouter();
  const [i,setI]=useState(0);
  const [answers,setAnswers]=useState<number[]>([]);
  const [restored,setRestored]=useState(false);

  // Resume an interrupted run: a 36-item instrument that discards progress
  // on backgrounding produces truncated, non-random attrition — a real
  // threat to whatever signal this instrument has, not a convenience issue.
  useEffect(()=>{
    AsyncStorage.getItem(DRAFT_KEY).then(raw=>{
      if(raw){
        try{
          const draft=JSON.parse(raw) as {birth:string; answers:number[]};
          if(draft.birth===String(birth??'') && draft.answers.length<SCENARIOS.length){
            setAnswers(draft.answers);
            setI(draft.answers.length);
          }
        }catch{}
      }
      setRestored(true);
    });
  },[]);

  useEffect(()=>{
    if(!restored) return;
    AsyncStorage.setItem(DRAFT_KEY, JSON.stringify({birth:String(birth??''), answers}));
  },[answers,restored]);

  const q=SCENARIOS[i];
  const progress=useMemo(()=>`${i+1} / ${SCENARIOS.length}`,[i]);
  const pct=((i+1)/SCENARIOS.length)*100;

  const choose=(op:number)=>{
    const next=[...answers,op];
    if(i===SCENARIOS.length-1){
      AsyncStorage.removeItem(DRAFT_KEY);
      router.replace({pathname:'/profile',params:{birth:birth??'0',answers:next.join(',')}});
    }else{
      setAnswers(next);
      setI(i+1);
    }
  };

  const goBack=()=>{
    if(i===0) return;
    setAnswers(answers.slice(0,-1));
    setI(i-1);
  };

  if(!restored) return null;

  return <SafeAreaView style={{flex:1,backgroundColor:C.bg}}><ScrollView><Page>
    <View style={s.meta}><Eyebrow>BEHAVIORAL OPERATOR INSTRUMENT · V0.8 RC1</Eyebrow><Text style={s.progress}>{progress}</Text></View>
    <View style={s.track}><View style={[s.fill,{width:`${pct}%`}]} /></View>
    <Text style={s.domain}>{q.domain.toUpperCase()}</Text>
    <H1>{q.prompt}</H1>
    <Body muted>Choose the transformation you would genuinely attempt first—not the answer you admire most. There are no “good” operators.</Body>
    <View style={{gap:10}}>{q.options.map(o=><Pressable key={o.operator} accessibilityRole="button" onPress={()=>choose(o.operator)} style={s.option}>
      <Text style={s.num}>{o.operator}</Text><Text style={s.text}>{o.text}</Text>
    </Pressable>)}</View>
    {i>0 && <Pressable onPress={goBack} style={s.backRow}><Text style={s.backText}>← Revise previous answer</Text></Pressable>}
    <Button secondary label="This question is confusing" onPress={()=>router.push({pathname:'/feedback',params:{screen:`assessment-question-${i+1}`}})} />
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
  text:{flex:1,fontSize:16,lineHeight:23,color:C.ink},
  backRow:{alignSelf:'flex-start',paddingVertical:6},
  backText:{fontSize:13,fontWeight:'700',color:C.muted}
});
