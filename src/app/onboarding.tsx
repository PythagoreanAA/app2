import {useState} from 'react';
import {useRouter} from 'expo-router';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Pressable,ScrollView,StyleSheet,Text,TextInput,View} from 'react-native';
import {Body,Button,C,Card,Eyebrow,H1,H2,Page,Pill} from '@/components/ui';
import {startUatSession} from '@/lib/uat';

export default function Onboarding(){
 const router=useRouter();const [code,setCode]=useState('');const [step,setStep]=useState(0);const [consent,setConsent]=useState(false);
 const slides=[
  {e:'WELCOME TO THE FIELD TEST',t:'PAA asks what number does—not merely what number means.',b:'You will receive a numerical hypothesis, answer behavioral scenarios independently, and then compare the two. Agreement is interesting. Disagreement is equally valuable.'},
  {e:'THE RULE',t:'Do not try to make the reading true.',b:'Choose what you would genuinely attempt first. The assessment hides operator labels so prior knowledge cannot steer the score. If two answers feel identical or a result feels wrong, report it.'},
  {e:'BEFORE YOU BEGIN',t:'Test the instrument—not yourself.',b:'PAA is experimental and non-diagnostic. This UAT build stores your tester code, answers, records, and feedback locally on this device unless you deliberately export research data. Use an anonymous code, not identifying information.'},
 ];
 const x=slides[step];
 const begin=async()=>{if(!code.trim()||!consent)return;await startUatSession(code);router.replace('/birth')};
 return <SafeAreaView style={{flex:1,backgroundColor:C.bg}}><ScrollView><Page>
  <View style={s.top}><Pill label={`UAT · ${step+1}/3`} tone="gold"/><Eyebrow>RELEASE CANDIDATE</Eyebrow></View>
  <Eyebrow>{x.e}</Eyebrow><H1>{x.t}</H1><Body muted>{x.b}</Body>
  {step===2?<Card><Eyebrow>ANONYMOUS TESTER CODE</Eyebrow><H2>Give this session a code.</H2><Body muted>Use the code your researcher gave you, or invent one such as P014. Do not enter your name, email, phone number, birth date, or other identifying information here.</Body><TextInput value={code} onChangeText={setCode} autoCapitalize="characters" placeholder="P014" placeholderTextColor={C.muted} style={s.input}/><Pressable accessibilityRole="checkbox" accessibilityState={{checked:consent}} onPress={()=>setConsent(!consent)} style={s.consent}><View style={[s.box,consent&&s.boxOn]}>{consent?<Text style={s.tick}>✓</Text>:null}</View><Text style={s.consentText}>I understand this is experimental, non-diagnostic UAT and I voluntarily consent to participate.</Text></Pressable><Button disabled={!code.trim()||!consent} label="Begin field test" onPress={begin}/></Card>:<Button label="Continue" onPress={()=>setStep(step+1)}/>}
  {step>0&&<Button secondary label="Back" onPress={()=>setStep(step-1)}/>}
 </Page></ScrollView></SafeAreaView>
}
const s=StyleSheet.create({top:{gap:8},input:{backgroundColor:C.white,borderWidth:1,borderColor:C.line,borderRadius:14,padding:15,fontSize:18,color:C.ink},consent:{flexDirection:'row',gap:12,alignItems:'flex-start',paddingVertical:4},box:{width:24,height:24,borderRadius:6,borderWidth:1,borderColor:C.line,alignItems:'center',justifyContent:'center',backgroundColor:C.white},boxOn:{backgroundColor:C.lapis,borderColor:C.lapis},tick:{color:C.white,fontWeight:'900'},consentText:{flex:1,fontSize:14,lineHeight:20,color:C.ink}})
