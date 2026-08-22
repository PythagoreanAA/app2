import { useState } from 'react';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView, StyleSheet, TextInput, View } from 'react-native';
import { Body, Button, C, Card, Eyebrow, H1, H2, Page } from '@/components/ui';
import { birthRoot } from '@/lib/arithmos';
import { OPERATORS } from '@/data/operators';

export default function Birth(){
  const router=useRouter(); const [date,setDate]=useState('1991-04-08');
  const calc=/^\d{4}-\d{2}-\d{2}$/.test(date)?birthRoot(date):null;
  const op=calc?OPERATORS[calc.root-1]:null;
  return <SafeAreaView style={{flex:1,backgroundColor:C.bg}}><ScrollView><Page>
    <Eyebrow>GLYPH READING</Eyebrow><H1>Begin with a numerical hypothesis.</H1>
    <Body muted>Enter your birth date as YYYY-MM-DD. V1 uses a simple digit-sum root into the ennead; calculation rules can later be versioned as the PAA canon develops.</Body>
    <TextInput value={date} onChangeText={setDate} autoCapitalize="none" keyboardType="numbers-and-punctuation" style={s.input}/>
    {calc&&op&&<Card><Eyebrow>BIRTH ROOT</Eyebrow><View style={s.row}><H1>{calc.root}</H1><View style={{flex:1}}><H2>{op.verb}</H2><Body muted>{op.movement}</Body></View></View><Body>{op.strength}</Body><Body muted>Raw digit sum: {calc.raw}. This is a hypothesis generator, not proof of personality.</Body></Card>}
    <Button label="Test it against behavior" onPress={()=>router.push({pathname:'/assessment',params:{birth:calc?.root??0}})} />
    <Button secondary label="See all nine operators" onPress={()=>router.push('/operators')} />
  </Page></ScrollView></SafeAreaView>
}
const s=StyleSheet.create({input:{backgroundColor:C.white,borderWidth:1,borderColor:C.line,borderRadius:16,paddingHorizontal:16,paddingVertical:15,fontSize:18,color:C.ink},row:{flexDirection:'row',gap:18,alignItems:'center'}});
