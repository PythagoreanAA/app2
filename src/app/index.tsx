import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Body, Button, C, Card, Eyebrow, H1, Page } from '@/components/ui';

export default function Home(){
  const router = useRouter();
  return <SafeAreaView style={{flex:1, backgroundColor:C.bg}}><ScrollView contentContainerStyle={{flexGrow:1}}><Page>
    <View style={s.mark}><Text style={s.markText}>1·2·3·4·5·6·7·8·9</Text></View>
    <Eyebrow>PYTHAGOREAN ARITHMOSOPHIC ANAMNESIS</Eyebrow>
    <H1>Number is not a label. It is a grammar of transformation.</H1>
    <Body muted>PAA turns numerical structure into testable hypotheses about how you distinguish, relate, order, cross, restore, test, amplify, and complete.</Body>
    <Card>
      <Eyebrow>THE METHOD</Eyebrow>
      <Body>Glyph → hypothesis → behavior → rival reading → counterexample → refinement.</Body>
      <Body muted>The app never asks you to believe a flattering description. It asks whether the proposed operator can survive contact with your life, rival classifications, and contradiction.</Body>
    </Card>
    <View style={{flex:1}} />
    <Button label="Begin with your birth glyph" onPress={()=>router.push('/birth')} />
    <Button secondary label="Record an actual behavioral episode" onPress={()=>router.push('/episode')} />
    <Button secondary label="Open your Anamnesis record" onPress={()=>router.push('/episodes')} />
    <Button secondary label="Explore the nine operators" onPress={()=>router.push('/operators')} />
    <Text style={s.note}>Experimental interpretive framework · not a clinical or diagnostic instrument.</Text>
  </Page></ScrollView></SafeAreaView>
}
const s=StyleSheet.create({mark:{width:142,height:142,borderRadius:71,borderWidth:1,borderColor:C.lapis,alignItems:'center',justifyContent:'center',marginTop:12,marginBottom:10},markText:{color:C.lapis,fontWeight:'700',fontSize:12,letterSpacing:1.1},note:{fontSize:12,lineHeight:18,color:C.muted,textAlign:'center'}});
