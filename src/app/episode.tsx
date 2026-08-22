import { useState } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Alert, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { Body, Button, C, Card, Eyebrow, H1, H2, Page } from '@/components/ui';
import { OPERATORS } from '@/data/operators';
import {
  EPISODE_DOMAINS,
  EpisodeDomain,
  EvidenceEffect,
  makeEpisodeId,
  saveEpisode,
} from '@/lib/episodes';

const fields = [
  ['condition', 'CONDITION', 'What was happening before you acted?'],
  ['object', 'OBJECT', 'What person, claim, structure, relationship, problem, or opportunity were you acting upon?'],
  ['action', 'ACTION', 'What did you actually do? Describe behavior, not motive.'],
  ['transformation', 'TRANSFORMATION', 'What changed because of the action? What was the before → after movement?'],
  ['result', 'RESULT', 'What happened next? Include consequences you did not intend.'],
] as const;

type FieldKey = typeof fields[number][0];

export default function EpisodeCapture() {
  const router = useRouter();
  const params = useLocalSearchParams<{operator?: string}>();
  const [values, setValues] = useState<Record<FieldKey, string>>({ condition:'', object:'', action:'', transformation:'', result:'' });
  const [operator, setOperator] = useState<number | null>(()=>{const n=Number(params.operator);return n>=1&&n<=9?n:null;});
  const [competingOperator, setCompetingOperator] = useState<number | null>(null);
  const [confidence, setConfidence] = useState<1|2|3|4|5>(3);
  const [domain, setDomain] = useState<EpisodeDomain>('Other');
  const [testedOperator, setTestedOperator] = useState<number | null>(null);
  const [evidenceEffect, setEvidenceEffect] = useState<EvidenceEffect>('ambiguous');
  const [saving, setSaving] = useState(false);

  const complete = fields.every(([key]) => values[key].trim().length >= 3) && operator !== null;

  const choosePrimary = (n: number) => {
    setOperator(n);
    if (competingOperator === n) setCompetingOperator(null);
  };

  const chooseCompetitor = (n: number) => {
    if (operator === n) return;
    setCompetingOperator(competingOperator === n ? null : n);
  };

  const submit = async () => {
    if (!complete || operator === null) {
      Alert.alert('Complete the episode', 'Record each stage and choose the operator that best describes the transformation.');
      return;
    }
    try {
      setSaving(true);
      await saveEpisode({
        id: makeEpisodeId(),
        createdAt: new Date().toISOString(),
        ...values,
        operator,
        competingOperator,
        confidence,
        domain,
        testedOperator,
        evidenceEffect: testedOperator ? evidenceEffect : 'ambiguous',
      });
      router.replace('/episodes');
    } finally {
      setSaving(false);
    }
  };

  return <SafeAreaView style={{flex:1,backgroundColor:C.bg}}><ScrollView keyboardShouldPersistTaps="handled"><Page>
    <Eyebrow>ANAMNESIS · ZAYIN V0.7</Eyebrow>
    <H1>Record the event. Then force the interpretation to compete.</H1>
    <Body muted>A PAA classification is stronger when it survives an alternative reading. Observation first; operator second; counter-operator third.</Body>

    <Card>
      <Eyebrow>DOMAIN</Eyebrow>
      <Body muted>Context can impersonate character. Tag where the episode occurred so later analysis can separate stable tendencies from environmental demands.</Body>
      <View style={s.chips}>{EPISODE_DOMAINS.map(item => <Pressable key={item} onPress={()=>setDomain(item)} style={[s.chip,domain===item&&s.chipActive]}><Text style={[s.chipText,domain===item&&s.chipTextActive]}>{item}</Text></Pressable>)}</View>
    </Card>

    {fields.map(([key,label,helper]) => <Card key={key}>
      <Eyebrow>{label}</Eyebrow>
      <Body muted>{helper}</Body>
      <TextInput
        value={values[key]}
        onChangeText={(text)=>setValues(v=>({...v,[key]:text}))}
        multiline
        placeholder="Write the observable episode here…"
        placeholderTextColor={C.muted}
        style={s.input}
      />
    </Card>)}

    <Card>
      <Eyebrow>PRIMARY OPERATOR</Eyebrow>
      <H2>What transformation best explains the before → after movement?</H2>
      <Body muted>Choose the operation performed on the object—not the mood, virtue, intention, or identity of the actor.</Body>
      <View style={s.operatorGrid}>
        {OPERATORS.map(op => <Pressable key={op.n} onPress={()=>choosePrimary(op.n)} style={[s.opChoice, operator===op.n && s.opChoiceActive]}>
          <Text style={[s.opNumber, operator===op.n && s.opActiveText]}>{op.n}</Text>
          <Text style={[s.opVerb, operator===op.n && s.opActiveText]}>{op.verb}</Text>
          <Text style={[s.opMove, operator===op.n && s.opActiveSub]}>{op.movement}</Text>
        </Pressable>)}
      </View>
    </Card>

    <Card>
      <Eyebrow>COMPETING OPERATOR · XIPHOS</Eyebrow>
      <H2>If the primary reading is wrong, what is the strongest rival?</H2>
      <Body muted>Do not choose a weak strawman. Select the operator that could most plausibly explain the same event. Leave blank only when no serious rival exists.</Body>
      <View style={s.compactGrid}>
        {OPERATORS.map(op => <Pressable key={op.n} disabled={operator===op.n} onPress={()=>chooseCompetitor(op.n)} style={[s.compactChoice,operator===op.n&&s.disabled,competingOperator===op.n&&s.compactActive]}>
          <Text style={[s.compactNumber,competingOperator===op.n&&s.compactActiveText]}>{op.n}</Text>
          <Text style={[s.compactVerb,competingOperator===op.n&&s.compactActiveText]}>{op.verb}</Text>
        </Pressable>)}
      </View>
    </Card>

    <Card>
      <Eyebrow>CLASSIFICATION CONFIDENCE</Eyebrow>
      <View style={s.confRow}>{([1,2,3,4,5] as const).map(n=><Pressable key={n} onPress={()=>setConfidence(n)} style={[s.conf,confidence===n&&s.confActive]}><Text style={[s.confText,confidence===n&&{color:C.white}]}>{n}</Text></Pressable>)}</View>
      <Body muted>Confidence belongs to the classification, not to how strongly you felt during the event.</Body>
    </Card>

    <Card>
      <Eyebrow>HYPOTHESIS TEST · ZAYIN</Eyebrow>
      <H2>Did this episode test an operator you currently suspect is dominant?</H2>
      <Body muted>Optional. Choose the operator under examination, then record whether this episode supports it, contradicts it, or remains ambiguous.</Body>
      <View style={s.compactGrid}>
        {OPERATORS.map(op => <Pressable key={op.n} onPress={()=>setTestedOperator(testedOperator===op.n?null:op.n)} style={[s.compactChoice,testedOperator===op.n&&s.testActive]}>
          <Text style={[s.compactNumber,testedOperator===op.n&&s.testActiveText]}>{op.n}</Text>
          <Text style={[s.compactVerb,testedOperator===op.n&&s.testActiveText]}>{op.verb}</Text>
        </Pressable>)}
      </View>
      {testedOperator!==null && <View style={s.effectRow}>
        {([
          ['supports','SUPPORTS'],
          ['contradicts','CONTRADICTS'],
          ['ambiguous','AMBIGUOUS'],
        ] as const).map(([value,label])=><Pressable key={value} onPress={()=>setEvidenceEffect(value)} style={[s.effect,evidenceEffect===value&&s.effectActive]}><Text style={[s.effectText,evidenceEffect===value&&s.effectTextActive]}>{label}</Text></Pressable>)}
      </View>}
    </Card>

    <Card>
      <Eyebrow>FINAL BLADE</Eyebrow>
      <Body>If an informed observer saw only the event and not your birth glyph, self-concept, or prior profile, would the primary operator still beat the competing operator?</Body>
    </Card>

    <Button label={saving?'Saving…':'Save behavioral episode'} onPress={submit} />
    <Button secondary label="Cancel" onPress={()=>router.back()} />
  </Page></ScrollView></SafeAreaView>
}

const s=StyleSheet.create({
  input:{minHeight:112,borderWidth:1,borderColor:C.line,borderRadius:14,padding:14,fontSize:16,lineHeight:23,color:C.ink,backgroundColor:C.bg,textAlignVertical:'top'},
  chips:{flexDirection:'row',flexWrap:'wrap',gap:8,marginTop:4},
  chip:{paddingHorizontal:11,paddingVertical:8,borderRadius:999,borderWidth:1,borderColor:C.line},
  chipActive:{backgroundColor:C.lapis,borderColor:C.lapis},
  chipText:{fontSize:12,fontWeight:'700',color:C.ink},
  chipTextActive:{color:C.white},
  operatorGrid:{gap:9},
  opChoice:{borderWidth:1,borderColor:C.line,borderRadius:14,padding:13,backgroundColor:C.bg},
  opChoiceActive:{borderColor:C.lapis,backgroundColor:C.lapis},
  opNumber:{fontSize:13,fontWeight:'800',color:C.gold},
  opVerb:{fontSize:17,fontWeight:'800',color:C.ink,marginTop:2},
  opMove:{fontSize:13,color:C.muted,marginTop:2},
  opActiveText:{color:C.white},
  opActiveSub:{color:'#DDE8F5'},
  compactGrid:{flexDirection:'row',flexWrap:'wrap',gap:8,marginTop:4},
  compactChoice:{minWidth:'30%',flexGrow:1,borderWidth:1,borderColor:C.line,borderRadius:12,padding:10,backgroundColor:C.bg},
  compactActive:{backgroundColor:C.gold,borderColor:C.gold},
  testActive:{backgroundColor:C.teal,borderColor:C.teal},
  disabled:{opacity:.28},
  compactNumber:{fontSize:11,fontWeight:'800',color:C.gold},
  compactVerb:{fontSize:12,fontWeight:'800',color:C.ink,marginTop:2},
  compactActiveText:{color:C.white},
  testActiveText:{color:C.white},
  confRow:{flexDirection:'row',gap:9},
  conf:{width:44,height:44,borderRadius:22,borderWidth:1,borderColor:C.lapis,alignItems:'center',justifyContent:'center'},
  confActive:{backgroundColor:C.lapis},
  confText:{fontSize:16,fontWeight:'800',color:C.lapis},
  effectRow:{gap:8,marginTop:14},
  effect:{borderWidth:1,borderColor:C.line,borderRadius:12,paddingVertical:11,paddingHorizontal:12},
  effectActive:{backgroundColor:C.lapis,borderColor:C.lapis},
  effectText:{fontSize:11,fontWeight:'900',letterSpacing:1,color:C.ink,textAlign:'center'},
  effectTextActive:{color:C.white},
});
