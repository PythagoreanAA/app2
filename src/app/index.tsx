import { useCallback, useState } from 'react';
import { useFocusEffect, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Body, Button, C, Card, Eyebrow, H1, H2, Metric, NavCard, OperatorBadge, Page, Pill, Tetractys } from '@/components/ui';
import { loadEpisodes } from '@/lib/episodes';
import { loadPredictions, predictionStats } from '@/lib/predictions';
import { loadLatestProfile, StoredProfile } from '@/lib/profileStore';
import { OPERATORS } from '@/data/operators';
import { loadCurrentSession, UatSession } from '@/lib/uat';

export default function Home(){
 const router=useRouter(); const [episodeCount,setEpisodeCount]=useState(0); const [openPredictions,setOpenPredictions]=useState(0); const [profile,setProfile]=useState<StoredProfile|null>(null); const [uat,setUat]=useState<UatSession|null>(null);
 useFocusEffect(useCallback(()=>{Promise.all([loadEpisodes(),loadPredictions(),loadLatestProfile(),loadCurrentSession()]).then(([episodes,predictions,p,u])=>{setEpisodeCount(episodes.length);setOpenPredictions(predictionStats(predictions).open);setProfile(p);setUat(u);});},[]));
 const op=profile?OPERATORS[profile.primary-1]:null;
 const uatTarget=!uat?'/onboarding':uat.assessmentCompleted&&!uat.surveyCompleted?'/uat-complete':uat.surveyCompleted?'/checkin':'/birth';
 const uatTitle=!uat?'Start the guided field test':uat.surveyCompleted?`Tester ${uat.participantCode} · UAT complete`:uat.assessmentCompleted?'Finish the final UAT survey':`Tester ${uat.participantCode} · continue`;
 const uatBody=!uat?'Begin here. The guided flow explains the method, protects the assessment from cueing, and tells you what feedback matters.':uat.surveyCompleted?'Your core field test is complete. Continue only if you want to observe lived episodes or test future predictions.':uat.assessmentCompleted?'Your reading is complete; one short product survey remains. Your ratings will not alter your result.':'Your UAT session is active. Continue the core reading before exploring the laboratory.';
 return <SafeAreaView style={{flex:1,backgroundColor:C.bg}}><ScrollView contentContainerStyle={{paddingBottom:28}}><Page>
   <View style={s.hero}>
     <View style={s.heroTop}><Pill label="PAA · V0.10 UAT" tone="gold"/><Tetractys size={72} dot={7} rowGap={7} light/></View>
     <Eyebrow tone="light">PYTHAGOREAN ARITHMOSOPHIC ANAMNESIS</Eyebrow>
     <H1 light>Read number as action. Test the reading against life.</H1>
     <Body light>PAA treats 1–9 as a grammar of transformation, then separates numerical hypothesis, behavioral evidence, lived observation, and prospective prediction.</Body>
   </View>

   <NavCard eyebrow="USER ACCEPTANCE TEST" title={uatTitle} body={uatBody} meta={uat?.surveyCompleted?'FIELD TEST COMPLETE':uat?.assessmentCompleted?'1 STEP REMAINS':'GUIDED'} onPress={()=>router.push(uatTarget as any)}/>

   {profile&&op?<Card>
     <View style={s.rowBetween}><View style={{gap:5,flex:1}}><Eyebrow>YOUR LATEST SIGNAL</Eyebrow><H2>{profile.primary} · {op.verb}</H2><Body muted>{profile.clarity} behavioral signal · {new Date(profile.createdAt).toLocaleDateString()}</Body></View><OperatorBadge n={op.n} verb={op.verb} compact/></View>
     <Body>{op.strength}</Body>
     <Text onPress={()=>router.push('/episodes')} style={s.textLink}>Test this signal against lived episodes →</Text>
   </Card>:<Card><Eyebrow>FIRST READING</Eyebrow><H2>Start with a hypothesis, not a verdict.</H2><Body muted>Calculate a birth glyph, then run the blinded Behavioral Operator Instrument to see whether independent choices converge or diverge.</Body></Card>}

   <View style={s.metrics}><Metric label="ANAMNESIS" value={episodeCount} detail="lived episodes recorded"/><Metric label="OPEN TESTS" value={openPredictions} detail="predictions awaiting reality"/></View>

   <Eyebrow>THREE PATHS</Eyebrow>
   <NavCard eyebrow="01 · DISCOVER" title="Discover your operator pattern" body="Birth glyph → blinded behavioral scenarios → convergence or divergence." meta="CORE READING" onPress={()=>router.push('/birth')}/>
   <NavCard eyebrow="02 · OBSERVE" title="Record what actually happened" body="Capture a lived transformation without forcing it to match your preferred story." meta={`${episodeCount} records`} onPress={()=>router.push('/checkin')}/>
   <NavCard eyebrow="03 · TEST" title="Put a forecast at risk" body="Commit an operator prediction before the outcome and score it afterward." meta={`${openPredictions} open`} onPress={()=>router.push('/predictions')}/>

   <Eyebrow>EXPLORE</Eyebrow>
   <View style={s.twoCol}><NavCard eyebrow="ENNEAD" title="Nine operators" body="Structure, strength, distortion, rival, and Zayin question." onPress={()=>router.push('/operators')}/><NavCard eyebrow="DYAD" title="Relationship field" body="Compare two operators without reducing either person to a compatibility score." onPress={()=>router.push('/relationship')}/></View>
   <NavCard eyebrow="RESEARCHER" title="Open the evidence dashboard" body="UAT acceptance metrics, participant records, blinded trials, confusion matrix, and export." onPress={()=>router.push('/research')}/>
   <Button secondary label="Report confusion or a problem" onPress={()=>router.push({pathname:'/feedback',params:{screen:'home'}})} />
   <Text style={s.note}>V0.10 UAT · experimental interpretive framework · not a clinical, diagnostic, employment-screening, or validated psychological instrument.</Text>
 </Page></ScrollView></SafeAreaView>
}
const s=StyleSheet.create({hero:{backgroundColor:C.lapis2,borderRadius:28,padding:22,gap:11,marginTop:4},heroTop:{flexDirection:'row',alignItems:'flex-start',justifyContent:'space-between'},rowBetween:{flexDirection:'row',alignItems:'center',justifyContent:'space-between',gap:12},metrics:{flexDirection:'row',flexWrap:'wrap',gap:10},twoCol:{gap:10},textLink:{fontSize:13,fontWeight:'800',color:C.lapis,marginTop:2},note:{fontSize:11,lineHeight:17,color:C.muted,textAlign:'center',paddingVertical:6}});
