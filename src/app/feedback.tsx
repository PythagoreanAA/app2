import {useState} from 'react';
import {useLocalSearchParams,useRouter} from 'expo-router';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Pressable,ScrollView,StyleSheet,Text,TextInput} from 'react-native';
import {Body,Button,C,Eyebrow,H1,Page} from '@/components/ui';
import {FeedbackKind,loadCurrentSession,saveFeedback} from '@/lib/uat';
const K:Array<[FeedbackKind,string]>=[['confusing','Something was confusing'],['bug','Something did not work'],['wrong','A reading felt wrong'],['helpful','Something was especially useful'],['other','Something else']];
export default function Feedback(){
 const router=useRouter();const {screen='unknown'}=useLocalSearchParams<{screen:string}>();const [kind,setKind]=useState<FeedbackKind>('confusing');const [message,setMessage]=useState('');const [done,setDone]=useState(false);
 const submit=async()=>{const s=await loadCurrentSession();await saveFeedback({sessionId:s?.id,participantCode:s?.participantCode,screen:String(screen),kind,message:message.trim()});setDone(true)};
 return <SafeAreaView style={{flex:1,backgroundColor:C.bg}}><ScrollView><Page><Eyebrow>UAT FEEDBACK</Eyebrow><H1>{done?'Captured. Thank you.':'Tell us where the instrument resisted you.'}</H1>{done?<><Body muted>Negative feedback is not a failed test. It is exactly what this release candidate is designed to expose.</Body><Button label="Return" onPress={()=>router.back()}/></>:<><Body muted>Screen: {screen}. Be concrete. “I disliked it” is less useful than “answers 2 and 6 felt like the same action.”</Body>{K.map(([k,l])=><Pressable key={k} onPress={()=>setKind(k)} style={[s.choice,kind===k&&s.active]}><Text style={s.choiceText}>{l}</Text></Pressable>)}<TextInput multiline value={message} onChangeText={setMessage} placeholder="What happened? What did you expect instead?" placeholderTextColor={C.muted} style={s.input}/><Button disabled={!message.trim()} label="Submit feedback" onPress={submit}/><Button secondary label="Cancel" onPress={()=>router.back()}/></>}</Page></ScrollView></SafeAreaView>
}
const s=StyleSheet.create({choice:{backgroundColor:C.surface,borderWidth:1,borderColor:C.line,borderRadius:14,padding:14},active:{borderColor:C.gold,backgroundColor:C.goldSoft},choiceText:{fontSize:15,fontWeight:'700',color:C.ink},input:{minHeight:130,textAlignVertical:'top',backgroundColor:C.white,borderWidth:1,borderColor:C.line,borderRadius:14,padding:14,fontSize:16,color:C.ink}})
