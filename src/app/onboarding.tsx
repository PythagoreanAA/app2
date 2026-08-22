import {useState} from 'react';
import {useRouter} from 'expo-router';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ScrollView,StyleSheet,TextInput,View} from 'react-native';
import {Body,Button,C,Card,Eyebrow,H1,H2,Page,Pill} from '@/components/ui';
import {startUatSession} from '@/lib/uat';

export default function Onboarding(){
 const router=useRouter();const [code,setCode]=useState('');const [step,setStep]=useState(0);
 const slides=[
  {e:'WELCOME TO THE FIELD TEST',t:'PAA asks what number does—not merely what number means.',b:'You will receive a numerical hypothesis, answer behavioral scenarios independently, and then compare the two. Agreement is interesting. Disagreement is equally valuable.'},
  {e:'THE RULE',t:'Do not try to make the reading true.',b:'Choose what you would genuinely attempt first. If a question is unclear, if two answers feel identical, or if a result feels wrong, report it. Those failures are research data.'},
  {e:'WHAT THIS IS',t:'An experimental interpretive framework.',b:'PAA is not a clinical, diagnostic, medical, or validated psychological instrument. This field test evaluates usability and the behavior of the model itself.'},
 ];
 const x=slides[step];
 const begin=async()=>{if(!code.trim())return;await startUatSession(code);router.replace('/birth')};
 return <SafeAreaView style={{flex:1,backgroundColor:C.bg}}><ScrollView><Page>
  <View style={s.top}><Pill label={`UAT · ${step+1}/3`} tone="gold"/><Eyebrow>V0.8 RELEASE CANDIDATE</Eyebrow></View>
  <Eyebrow>{x.e}</Eyebrow><H1>{x.t}</H1><Body muted>{x.b}</Body>
  {step===2?<Card><Eyebrow>ANONYMOUS TESTER CODE</Eyebrow><H2>Give this session a code.</H2><Body muted>Use the code your researcher gave you, or invent one such as P014. Do not enter your name, email, phone number, or other identifying information.</Body><TextInput value={code} onChangeText={setCode} autoCapitalize="characters" placeholder="P014" placeholderTextColor={C.muted} style={s.input}/><Button disabled={!code.trim()} label="I understand — begin" onPress={begin}/></Card>:<Button label="Continue" onPress={()=>setStep(step+1)}/>}
  {step>0&&<Button secondary label="Back" onPress={()=>setStep(step-1)}/>}
 </Page></ScrollView></SafeAreaView>
}
const s=StyleSheet.create({top:{gap:8},input:{backgroundColor:C.white,borderWidth:1,borderColor:C.line,borderRadius:14,padding:15,fontSize:18,color:C.ink}})
