import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Body, C, Card, Eyebrow, H1, H2, Page } from '@/components/ui';
import { OPERATORS } from '@/data/operators';
export default function Operators(){return <SafeAreaView style={{flex:1,backgroundColor:C.bg}}><ScrollView><Page><Eyebrow>THE ENNEAD</Eyebrow><H1>Nine operators. Nine transformations.</H1><Body muted>Read each number first as an operation on a field, not as a personality adjective.</Body>{OPERATORS.map(o=><Card key={o.n}><View style={s.top}><Text style={s.n}>{o.n}</Text><View style={{flex:1}}><H2>{o.verb}</H2><Body muted>{o.movement}</Body></View></View><Body>{o.strength}</Body><Body muted>Distortion: {o.distortion}</Body><Text style={s.q}>ZAYIN · {o.question}</Text></Card>)}</Page></ScrollView></SafeAreaView>}
const s=StyleSheet.create({top:{flexDirection:'row',alignItems:'center',gap:14},n:{fontSize:34,fontWeight:'800',color:C.gold,width:42},q:{fontSize:14,lineHeight:21,fontWeight:'700',color:C.wine}});
