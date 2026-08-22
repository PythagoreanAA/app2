import React from 'react';
import { Pressable, StyleSheet, Text, View, ViewStyle } from 'react-native';

export const C = {
  bg:'#F4F1EA', surface:'#FBFAF7', ink:'#10233A', muted:'#667485', lapis:'#173A67', lapis2:'#0E2749',
  teal:'#138A90', tealSoft:'#DCEFF0', gold:'#A27B2C', goldSoft:'#EFE5CC', wine:'#64284C', wineSoft:'#F1E5EC',
  line:'#D8DCE0', white:'#FFFFFF', success:'#2D725B', successSoft:'#E1EFE9', danger:'#9A4A43', dangerSoft:'#F5E6E3'
};

export function Page({ children, style }: { children: React.ReactNode; style?: ViewStyle }) {
  return <View style={[s.page, style]}>{children}</View>;
}
export function Eyebrow({ children, tone='teal' }: { children: React.ReactNode; tone?:'teal'|'gold'|'muted'|'light' }) {
  const color=tone==='gold'?C.gold:tone==='muted'?C.muted:tone==='light'?'#D9E7F5':C.teal;
  return <Text style={[s.eyebrow,{color}]}>{children}</Text>;
}
export function H1({ children, light=false }: { children: React.ReactNode; light?:boolean }) { return <Text style={[s.h1,light&&{color:C.white}]}>{children}</Text>; }
export function H2({ children, light=false }: { children: React.ReactNode; light?:boolean }) { return <Text style={[s.h2,light&&{color:C.white}]}>{children}</Text>; }
export function Body({ children, muted=false, light=false }: { children: React.ReactNode; muted?: boolean; light?:boolean }) {
  return <Text style={[s.body, muted && {color:C.muted}, light && {color:'#E8EFF6'}]}>{children}</Text>;
}
export function Card({ children, style }: { children: React.ReactNode; style?:ViewStyle }) { return <View style={[s.card,style]}>{children}</View>; }
export function Button({ label, onPress, secondary=false, disabled=false }: { label:string; onPress:()=>void; secondary?:boolean; disabled?:boolean }) {
  return <Pressable disabled={disabled} accessibilityRole="button" accessibilityLabel={label} onPress={onPress} style={({pressed})=>[
    s.button, secondary&&s.buttonSecondary, disabled&&{opacity:.45}, pressed&&!disabled&&{opacity:.84}
  ]}><Text style={[s.buttonText,secondary&&{color:C.lapis}]}>{label}</Text></Pressable>
}
export function Pill({ label, tone='teal' }: { label:string; tone?:'teal'|'gold'|'wine'|'muted'|'success'|'danger' }) {
  const map:any={teal:[C.tealSoft,C.teal],gold:[C.goldSoft,C.gold],wine:[C.wineSoft,C.wine],muted:['#E8EBEE',C.muted],success:[C.successSoft,C.success],danger:[C.dangerSoft,C.danger]};
  return <View style={[s.pill,{backgroundColor:map[tone][0]}]}><Text style={[s.pillText,{color:map[tone][1]}]}>{label}</Text></View>;
}
export function ProgressBar({value}:{value:number}){return <View style={s.track}><View style={[s.fill,{width:`${Math.max(0,Math.min(1,value))*100}%`}]} /></View>}
export function Metric({label,value,detail}:{label:string;value:string|number;detail?:string}){return <Card style={{flex:1,minWidth:145}}><Eyebrow tone="muted">{label}</Eyebrow><Text style={s.metric}>{value}</Text>{detail?<Text style={s.metricDetail}>{detail}</Text>:null}</Card>}
export function OperatorBadge({n,verb,compact=false}:{n:number;verb:string;compact?:boolean}){return <View style={[s.operatorBadge,compact&&{paddingVertical:7,paddingHorizontal:10}]}><Text style={[s.operatorN,compact&&{fontSize:18}]}>{n}</Text><Text style={[s.operatorVerb,compact&&{fontSize:11}]}>{verb}</Text></View>}
export function NavCard({eyebrow,title,body,meta,onPress}:{eyebrow:string;title:string;body:string;meta?:string;onPress:()=>void}){
 return <Pressable onPress={onPress} style={({pressed})=>[s.navCard,pressed&&{opacity:.82}]}>
   <Eyebrow>{eyebrow}</Eyebrow><Text style={s.navTitle}>{title}</Text><Text style={s.navBody}>{body}</Text>
   <View style={s.navBottom}>{meta?<Text style={s.navMeta}>{meta}</Text>:<View/>}<Text style={s.arrow}>→</Text></View>
 </Pressable>
}
export function SectionTitle({eyebrow,title,body}:{eyebrow?:string;title:string;body?:string}){return <View style={{gap:6}}>{eyebrow?<Eyebrow>{eyebrow}</Eyebrow>:null}<H2>{title}</H2>{body?<Body muted>{body}</Body>:null}</View>}

export function Tetractys({ size = 140, dot = 13, rowGap = 14, light=false }: { size?: number; dot?: number; rowGap?: number; light?:boolean }) {
  const rows = [1, 2, 3, 4];
  return <View style={{ width:size, alignItems:'center', gap:rowGap }}>{rows.map((count,rowIndex)=><View key={rowIndex} style={{flexDirection:'row',gap:dot}}>{Array.from({length:count}).map((_,i)=><View key={i} style={{width:dot,height:dot,borderRadius:dot/2,backgroundColor:light?(rowIndex===3?'#E5C873':'#D7E5F5'):(rowIndex===3?C.gold:C.lapis)}}/>)}</View>)}</View>;
}

const s=StyleSheet.create({
  page:{flex:1,backgroundColor:C.bg,padding:20,gap:16},
  eyebrow:{fontSize:11,fontWeight:'800',letterSpacing:1.8},
  h1:{fontSize:36,lineHeight:40,fontWeight:'800',color:C.ink,letterSpacing:-1.25},
  h2:{fontSize:23,lineHeight:28,fontWeight:'800',color:C.ink,letterSpacing:-.35},
  body:{fontSize:16,lineHeight:24,color:C.ink},
  card:{backgroundColor:C.surface,borderRadius:22,padding:18,gap:9,borderWidth:1,borderColor:C.line},
  button:{minHeight:54,borderRadius:17,paddingHorizontal:18,alignItems:'center',justifyContent:'center',backgroundColor:C.lapis},
  buttonSecondary:{backgroundColor:'transparent',borderWidth:1,borderColor:C.lapis},
  buttonText:{color:C.white,fontSize:15,fontWeight:'800'},
  pill:{alignSelf:'flex-start',borderRadius:999,paddingHorizontal:10,paddingVertical:6},pillText:{fontSize:10,fontWeight:'900',letterSpacing:1},
  track:{height:6,backgroundColor:'#E2E4E5',borderRadius:99,overflow:'hidden'},fill:{height:'100%',backgroundColor:C.gold,borderRadius:99},
  metric:{fontSize:34,lineHeight:39,fontWeight:'900',color:C.ink,letterSpacing:-1},metricDetail:{fontSize:12,lineHeight:17,color:C.muted},
  operatorBadge:{alignSelf:'flex-start',flexDirection:'row',alignItems:'baseline',gap:8,backgroundColor:C.lapis2,borderRadius:16,paddingHorizontal:13,paddingVertical:10},
  operatorN:{fontSize:25,fontWeight:'900',color:'#E8C96F'},operatorVerb:{fontSize:12,fontWeight:'900',letterSpacing:1.15,color:C.white},
  navCard:{backgroundColor:C.surface,borderRadius:22,padding:18,gap:8,borderWidth:1,borderColor:C.line},navTitle:{fontSize:21,fontWeight:'800',color:C.ink},navBody:{fontSize:14,lineHeight:21,color:C.muted},navBottom:{flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginTop:2},navMeta:{fontSize:11,fontWeight:'800',color:C.gold},arrow:{fontSize:24,color:C.lapis,fontWeight:'800'}
});
