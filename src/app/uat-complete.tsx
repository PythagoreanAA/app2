import {useEffect,useState} from 'react';
import {useRouter} from 'expo-router';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Pressable,ScrollView,StyleSheet,Text,TextInput,View} from 'react-native';
import {Body,Button,C,Card,Eyebrow,H1,H2,Page,Pill} from '@/components/ui';
import {loadCurrentSession,saveSurvey} from '@/lib/uat';

const SCALE=[1,2,3,4,5];
function Rating({label,value,onChange,low,high}:{label:string;value:number;onChange:(n:number)=>void;low:string;high:string}){
 return <Card><Eyebrow>{label}</Eyebrow><View style={s.scale}>{SCALE.map(n=><Pressable accessibilityRole="button" accessibilityLabel={`${label} ${n} of 5`} key={n} onPress={()=>onChange(n)} style={[s.rate,value===n&&s.rateActive]}><Text style={[s.rateText,value===n&&s.rateTextActive]}>{n}</Text></Pressable>)}</View><View style={s.ends}><Text style={s.end}>{low}</Text><Text style={s.end}>{high}</Text></View></Card>
}
export default function UatComplete(){
 const router=useRouter();const [sessionId,setSessionId]=useState('');const [participantCode,setParticipantCode]=useState('');
 const [comprehension,setComprehension]=useState(0);const [resultFit,setResultFit]=useState(0);const [usefulness,setUsefulness]=useState(0);const [trustInMethod,setTrust]=useState(0);const [wouldUseAgain,setReuse]=useState<boolean|null>(null);const [strongestValue,setStrongest]=useState('');const [biggestFriction,setFriction]=useState('');const [done,setDone]=useState(false);
 useEffect(()=>{loadCurrentSession().then(s=>{if(s){setSessionId(s.id);setParticipantCode(s.participantCode)}})},[]);
 const ready=!!sessionId&&comprehension>0&&resultFit>0&&usefulness>0&&trustInMethod>0&&wouldUseAgain!==null;
 const submit=async()=>{if(!ready)return;await saveSurvey({sessionId,participantCode,comprehension,resultFit,usefulness,trustInMethod,wouldUseAgain:!!wouldUseAgain,strongestValue:strongestValue.trim(),biggestFriction:biggestFriction.trim()});setDone(true)};
 if(done)return <SafeAreaView style={{flex:1,backgroundColor:C.bg}}><ScrollView><Page><Pill label="UAT COMPLETE" tone="success"/><Eyebrow>THANK YOU</Eyebrow><H1>You have finished the core field test.</H1><Body muted>Your ratings do not change your PAA result. They evaluate the product and method as experienced by you.</Body><Button label="Return to PAA" onPress={()=>router.replace('/')}/><Button secondary label="Record a lived episode" onPress={()=>router.replace('/checkin')}/></Page></ScrollView></SafeAreaView>;
 return <SafeAreaView style={{flex:1,backgroundColor:C.bg}}><ScrollView><Page><Pill label="V0.10 · FINAL UAT STEP" tone="gold"/><Eyebrow>PRODUCT INSTRUMENT</Eyebrow><H1>Now test PAA itself.</H1><Body muted>These questions are about your experience of the app. A low score is useful data. Do not reward the product for agreeing with you.</Body>
 <Rating label="COMPREHENSION" value={comprehension} onChange={setComprehension} low="I did not understand it" high="I understood it clearly"/>
 <Rating label="RESULT FIT" value={resultFit} onChange={setResultFit} low="Did not describe my behavior" high="Described it strongly"/>
 <Rating label="USEFULNESS" value={usefulness} onChange={setUsefulness} low="No practical value" high="Immediately useful"/>
 <Rating label="TRUST IN THE METHOD" value={trustInMethod} onChange={setTrust} low="I distrust the process" high="I trust how it reached the result"/>
 <Card><Eyebrow>RETURN INTENT</Eyebrow><H2>Would you voluntarily use PAA again?</H2><View style={s.row}><Pressable onPress={()=>setReuse(true)} style={[s.binary,wouldUseAgain===true&&s.rateActive]}><Text style={[s.binaryText,wouldUseAgain===true&&s.rateTextActive]}>YES</Text></Pressable><Pressable onPress={()=>setReuse(false)} style={[s.binary,wouldUseAgain===false&&s.rateActive]}><Text style={[s.binaryText,wouldUseAgain===false&&s.rateTextActive]}>NO</Text></Pressable></View></Card>
 <Card><Eyebrow>STRONGEST VALUE</Eyebrow><TextInput multiline value={strongestValue} onChangeText={setStrongest} placeholder="What, if anything, felt genuinely useful or distinctive?" placeholderTextColor={C.muted} style={s.input}/></Card>
 <Card><Eyebrow>BIGGEST FRICTION</Eyebrow><TextInput multiline value={biggestFriction} onChangeText={setFriction} placeholder="Where did the experience become confusing, tedious, unbelievable, or weak?" placeholderTextColor={C.muted} style={s.input}/></Card>
 <Button disabled={!ready} label="Submit final UAT response" onPress={submit}/><Button secondary label="Return without submitting" onPress={()=>router.back()}/><Body muted>Ratings are stored locally with your anonymous tester code until deliberately exported.</Body></Page></ScrollView></SafeAreaView>
}
const s=StyleSheet.create({scale:{flexDirection:'row',gap:8},rate:{flex:1,minHeight:46,borderRadius:13,borderWidth:1,borderColor:C.line,alignItems:'center',justifyContent:'center',backgroundColor:C.white},rateActive:{backgroundColor:C.lapis,borderColor:C.lapis},rateText:{fontWeight:'900',color:C.ink},rateTextActive:{color:C.white},ends:{flexDirection:'row',justifyContent:'space-between',gap:16},end:{fontSize:11,color:C.muted,flex:1},row:{flexDirection:'row',gap:10},binary:{flex:1,padding:15,borderWidth:1,borderColor:C.line,borderRadius:14,alignItems:'center',backgroundColor:C.white},binaryText:{fontWeight:'900',color:C.ink},input:{minHeight:100,textAlignVertical:'top',backgroundColor:C.white,borderWidth:1,borderColor:C.line,borderRadius:14,padding:14,fontSize:16,color:C.ink}})
