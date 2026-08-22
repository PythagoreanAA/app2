import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView, Pressable, StyleSheet, Text, View } from 'react-native';
import { Body, C, Card, Eyebrow, H1, OperatorBadge, Page, Pill } from '@/components/ui';
import { OPERATORS } from '@/data/operators';

const triads=[{range:'1–3',name:'Genesis of Relation',movement:'term → difference → relation'},{range:'4–6',name:'Transformation of Order',movement:'boundary → crossing → reintegration'},{range:'7–9',name:'Warrant of Becoming',movement:'examination → amplification → fulfillment'}];
export default function Operators(){const router=useRouter();return <SafeAreaView style={{flex:1,backgroundColor:C.bg}}><ScrollView><Page>
 <Eyebrow>THE ENNEAD</Eyebrow><H1>Nine operators. One grammar of transformation.</H1><Body muted>Tap any operator to inspect its structural movement, strength, distortion, rival reading, and falsifying question.</Body>
 <Card><Eyebrow>THE THREE MOVEMENTS</Eyebrow>{triads.map(t=><View key={t.range} style={s.triad}><Pill label={t.range} tone="gold"/><View style={{flex:1}}><Text style={s.triadName}>{t.name}</Text><Text style={s.small}>{t.movement}</Text></View></View>)}</Card>
 <View style={s.grid}>{OPERATORS.map(o=><Pressable key={o.n} onPress={()=>router.push({pathname:'/operator',params:{n:o.n}})} style={({pressed})=>[s.tile,pressed&&{opacity:.82}]}><OperatorBadge n={o.n} verb={o.verb}/><Text style={s.title}>{o.title}</Text><Text style={s.move}>{o.movement}</Text><Text style={s.arrow}>Explore →</Text></Pressable>)}</View>
 </Page></ScrollView></SafeAreaView>}
const s=StyleSheet.create({grid:{gap:10},tile:{backgroundColor:C.surface,borderWidth:1,borderColor:C.line,borderRadius:22,padding:17,gap:8},title:{fontSize:17,fontWeight:'800',color:C.ink},move:{fontSize:13,color:C.muted},arrow:{fontSize:12,fontWeight:'800',color:C.lapis,marginTop:2},triad:{flexDirection:'row',alignItems:'center',gap:12,paddingVertical:7,borderBottomWidth:1,borderBottomColor:C.line},triadName:{fontSize:15,fontWeight:'800',color:C.ink},small:{fontSize:12,color:C.muted,marginTop:2}});
