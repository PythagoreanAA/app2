import { useCallback, useState } from 'react';
import { useFocusEffect, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Body, Button, C, Card, Eyebrow, H1, H2, Page } from '@/components/ui';
import { OPERATORS } from '@/data/operators';
import {
  deleteEpisode,
  EpisodeRecord,
  loadEpisodes,
  mostCommonConfusions,
  summarizeDomains,
  summarizeEpisodes,
} from '@/lib/episodes';

export default function Episodes(){
  const router=useRouter();
  const [episodes,setEpisodes]=useState<EpisodeRecord[]>([]);
  const refresh=useCallback(()=>{ loadEpisodes().then(setEpisodes); },[]);
  useFocusEffect(useCallback(()=>{ refresh(); },[refresh]));
  const summary=summarizeEpisodes(episodes);
  const top=summary.filter(x=>x.count>0).slice(0,3);
  const domains=summarizeDomains(episodes).sort((a,b)=>b.episodes-a.episodes).slice(0,6);
  const confusions=mostCommonConfusions(episodes).slice(0,4);
  const counterexamples=episodes.filter(ep=>ep.testedOperator&&ep.evidenceEffect==='contradicts');
  const contested=episodes.filter(ep=>ep.competingOperator).length;

  const remove=(episode:EpisodeRecord)=>{
    Alert.alert('Delete this episode?','This removes the observation from the local behavioral record.',[
      {text:'Cancel',style:'cancel'},
      {text:'Delete',style:'destructive',onPress:async()=>{await deleteEpisode(episode.id);refresh();}},
    ]);
  };

  return <SafeAreaView style={{flex:1,backgroundColor:C.bg}}><ScrollView><Page>
    <Eyebrow>ANAMNESIS RECORD · ZAYIN V0.4</Eyebrow>
    <H1>A profile that cannot record contradiction is not an instrument.</H1>
    <Body muted>This record separates recurring operators from context, preserves rival classifications, and gives counterevidence equal standing with confirmation.</Body>

    <Button label="Record an actual episode" onPress={()=>router.push('/episode')} />

    {episodes.length===0 ? <Card>
      <Eyebrow>NO EPISODES YET</Eyebrow>
      <H2>Begin with one event you remember clearly.</H2>
      <Body>Record the condition, object, action, transformation, and result before choosing an operator. Then name the strongest competing classification.</Body>
    </Card> : <>
      <Card>
        <Eyebrow>LONGITUDINAL SIGNAL · PROVISIONAL</Eyebrow>
        {top.map((item,index)=>{
          const op=OPERATORS[item.operator-1];
          return <View key={item.operator} style={s.rankRow}>
            <Text style={s.rank}>{index+1}</Text>
            <View style={{flex:1}}><Text style={s.rankTitle}>{item.operator} · {op.verb}</Text><Text style={s.small}>{item.count} episode{item.count===1?'':'s'} · weighted {item.weighted} · {item.counterevidence} explicit counterexample{item.counterevidence===1?'':'s'}</Text></View>
          </View>
        })}
        <Body muted>{episodes.length} total episodes · {contested} with a serious competing classification. Frequency remains evidence, not essence.</Body>
      </Card>

      {domains.length>0 && <Card>
        <Eyebrow>CONTEXT MAP</Eyebrow>
        <H2>Does the operator travel across domains?</H2>
        {domains.map(item=>{
          const op=OPERATORS[item.operator-1];
          return <View key={item.domain} style={s.contextRow}>
            <View style={{flex:1}}><Text style={s.contextTitle}>{item.domain}</Text><Text style={s.small}>{item.episodes} episode{item.episodes===1?'':'s'}</Text></View>
            <Text style={s.badge}>{item.operator} · {op.verb}</Text>
          </View>
        })}
        <Body muted>A pattern that appears only at work may describe the job. A pattern that survives across unrelated domains is a stronger candidate for a stable behavioral tendency.</Body>
      </Card>}

      {confusions.length>0 && <Card>
        <Eyebrow>XIPHOS · CLASSIFICATION FRICTION</Eyebrow>
        <H2>Where does the grammar blur?</H2>
        {confusions.map(pair=>{
          const a=OPERATORS[pair.primary-1];
          const b=OPERATORS[pair.competitor-1];
          return <View key={`${pair.primary}-${pair.competitor}`} style={s.contextRow}>
            <Text style={s.contextTitle}>{pair.primary} {a.verb} ↔ {pair.competitor} {b.verb}</Text>
            <Text style={s.badge}>{pair.count}×</Text>
          </View>
        })}
        <Body muted>Repeated ambiguity is not noise to hide. It identifies operator boundaries that need sharper discriminators in the PAA canon.</Body>
      </Card>}

      {counterexamples.length>0 && <Card>
        <Eyebrow>ZAYIN · COUNTEREVIDENCE LEDGER</Eyebrow>
        <H2>{counterexamples.length} recorded contradiction{counterexamples.length===1?'':'s'}</H2>
        {counterexamples.slice(0,5).map(ep=>{
          const tested=OPERATORS[(ep.testedOperator??1)-1];
          const actual=OPERATORS[ep.operator-1];
          return <View key={ep.id} style={s.counterRow}>
            <Text style={s.counterTitle}>Against {ep.testedOperator} · {tested.verb}</Text>
            <Text style={s.small}>Observed instead: {ep.operator} · {actual.verb} · {ep.domain}</Text>
          </View>
        })}
        {counterexamples.length>5 && <Body muted>+ {counterexamples.length-5} more counterexamples in the record.</Body>}
      </Card>}

      <Eyebrow>RECORDED EPISODES · {episodes.length}</Eyebrow>
      {episodes.map(ep=>{
        const op=OPERATORS[ep.operator-1];
        const rival=ep.competingOperator ? OPERATORS[ep.competingOperator-1] : null;
        const tested=ep.testedOperator ? OPERATORS[ep.testedOperator-1] : null;
        const date=new Date(ep.createdAt).toLocaleDateString();
        return <Pressable key={ep.id} onLongPress={()=>remove(ep)}>
          <Card>
            <View style={s.header}><Eyebrow>{date} · {ep.domain??'Other'}</Eyebrow><Text style={s.badge}>{ep.operator} · {op.verb}</Text></View>
            {rival&&<Text style={s.rival}>RIVAL: {ep.competingOperator} · {rival.verb}</Text>}
            <Text style={s.label}>CONDITION</Text><Body>{ep.condition}</Body>
            <Text style={s.label}>ACTION</Text><Body>{ep.action}</Body>
            <Text style={s.label}>TRANSFORMATION</Text><Body>{ep.transformation}</Body>
            <Text style={s.label}>RESULT</Text><Body>{ep.result}</Body>
            {tested&&<Body muted>Hypothesis test: {ep.testedOperator} · {tested.verb} → {String(ep.evidenceEffect).toUpperCase()}</Body>}
            <Body muted>Classification confidence: {ep.confidence}/5 · Long-press to delete.</Body>
          </Card>
        </Pressable>
      })}
    </>}

    <Card>
      <Eyebrow>XIPHOS</Eyebrow>
      <H2>A stable operator must survive two cuts.</H2>
      <Body>First: it should recur beyond a single context. Second: competing explanations and explicit counterexamples should fail to explain the record better. Otherwise the apparent “essence” may be only circumstance plus confirmation bias.</Body>
    </Card>

    <Button secondary label="Return home" onPress={()=>router.replace('/')} />
  </Page></ScrollView></SafeAreaView>
}

const s=StyleSheet.create({
  header:{flexDirection:'row',justifyContent:'space-between',alignItems:'center',gap:12},
  badge:{fontSize:12,fontWeight:'800',color:C.gold},
  rival:{fontSize:11,fontWeight:'900',letterSpacing:1.2,color:C.teal,marginTop:-2},
  label:{fontSize:10,fontWeight:'800',letterSpacing:1.6,color:C.teal,marginTop:4},
  rankRow:{flexDirection:'row',gap:12,paddingVertical:10,borderBottomWidth:1,borderBottomColor:C.line},
  rank:{fontSize:16,fontWeight:'800',color:C.gold,width:20},
  rankTitle:{fontSize:16,fontWeight:'800',color:C.ink},
  small:{fontSize:13,color:C.muted,marginTop:2},
  contextRow:{flexDirection:'row',alignItems:'center',justifyContent:'space-between',gap:12,paddingVertical:9,borderBottomWidth:1,borderBottomColor:C.line},
  contextTitle:{fontSize:14,fontWeight:'800',color:C.ink},
  counterRow:{paddingVertical:9,borderBottomWidth:1,borderBottomColor:C.line},
  counterTitle:{fontSize:14,fontWeight:'800',color:C.ink},
});
