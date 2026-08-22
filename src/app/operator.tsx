import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Body, Button, C, Card, Eyebrow, H1, H2, OperatorBadge, Page, Pill } from '@/components/ui';
import { OPERATORS } from '@/data/operators';
import { polarity } from '@/lib/arithmos';
export default function OperatorDetail(){const {n}=useLocalSearchParams<{n:string}>();const router=useRouter();const num=Math.max(1,Math.min(9,Number(n)||1));const op=OPERATORS[num-1];const p=polarity(num);const rival=p?OPERATORS[p-1]:null;return <SafeAreaView style={{flex:1,backgroundColor:C.bg}}><ScrollView><Page>
 <View style={s.head}><OperatorBadge n={op.n} verb={op.verb}/><Pill label={op.title.toUpperCase()} tone="gold"/></View>
 <H1>{op.movement}</H1><Body muted>Read {op.n} first as a transformation performed on an object or field—not as a personality adjective.</Body>
 <Card><Eyebrow>ESSENCE OF THE OPERATION</Eyebrow><H2>{op.strength}</H2><Body muted>The question is not “am I a {op.n}?” but “when does this transformation actually occur, on what object, and with what result?”</Body></Card>
 <Card><Eyebrow>DISTORTION</Eyebrow><H2>When the operation outruns its warrant.</H2><Body>{op.distortion}</Body></Card>
 <Card><Eyebrow>ZAYIN · DISCRIMINATOR</Eyebrow><H2>{op.question}</H2><Body muted>A useful classification must survive a rival explanation. Collect concrete before → act → after evidence.</Body></Card>
 {rival?<Card><Eyebrow>STRUCTURAL COUNTERPART</Eyebrow><View style={s.rival}><OperatorBadge n={rival.n} verb={rival.verb} compact/><View style={{flex:1}}><Text style={s.rivalTitle}>{rival.movement}</Text><Text style={s.rivalBody}>Before trusting {op.n}, ask whether {rival.n} explains the episode better.</Text></View></View></Card>:<Card><Eyebrow>AXIS</Eyebrow><Body>{op.n} names the crossing itself; it has no simple polar counterpart in this ennead model.</Body></Card>}
 <Button label="Record an episode with this operator" onPress={()=>router.push({pathname:'/episode',params:{operator:op.n}})}/><Button secondary label="Compare in a relationship field" onPress={()=>router.push({pathname:'/relationship',params:{a:op.n}})}/><Button secondary label="Back to all operators" onPress={()=>router.back()}/>
 </Page></ScrollView></SafeAreaView>}
const s=StyleSheet.create({head:{gap:10,alignItems:'flex-start'},rival:{flexDirection:'row',gap:12,alignItems:'center'},rivalTitle:{fontSize:15,fontWeight:'800',color:C.ink},rivalBody:{fontSize:13,lineHeight:19,color:C.muted,marginTop:3}});
