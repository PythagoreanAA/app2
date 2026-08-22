import React from 'react';
import { Pressable, StyleSheet, Text, View, ViewStyle } from 'react-native';

export const C = { bg:'#F7F5F0', ink:'#10233A', muted:'#647386', lapis:'#173A67', teal:'#148C91', gold:'#A27B2C', wine:'#5A2546', line:'#D9DEE4', white:'#FFFFFF' };

export function Page({ children, style }: { children: React.ReactNode; style?: ViewStyle }) {
  return <View style={[s.page, style]}>{children}</View>;
}
export function Eyebrow({ children }: { children: React.ReactNode }) { return <Text style={s.eyebrow}>{children}</Text>; }
export function H1({ children }: { children: React.ReactNode }) { return <Text style={s.h1}>{children}</Text>; }
export function H2({ children }: { children: React.ReactNode }) { return <Text style={s.h2}>{children}</Text>; }
export function Body({ children, muted=false }: { children: React.ReactNode; muted?: boolean }) { return <Text style={[s.body, muted && {color:C.muted}]}>{children}</Text>; }
export function Card({ children }: { children: React.ReactNode }) { return <View style={s.card}>{children}</View>; }
export function Button({ label, onPress, secondary=false }: { label:string; onPress:()=>void; secondary?:boolean }) {
  return <Pressable onPress={onPress} style={[s.button, secondary && s.buttonSecondary]}><Text style={[s.buttonText, secondary && {color:C.lapis}]}>{label}</Text></Pressable>
}

const s = StyleSheet.create({
  page:{ flex:1, backgroundColor:C.bg, padding:24, gap:16 },
  eyebrow:{ fontSize:12, fontWeight:'700', letterSpacing:2.1, color:C.teal },
  h1:{ fontSize:38, lineHeight:42, fontWeight:'700', color:C.ink, letterSpacing:-1.2 },
  h2:{ fontSize:24, lineHeight:30, fontWeight:'700', color:C.ink },
  body:{ fontSize:17, lineHeight:25, color:C.ink },
  card:{ backgroundColor:C.white, borderRadius:20, padding:18, gap:9, borderWidth:1, borderColor:C.line },
  button:{ minHeight:54, borderRadius:16, paddingHorizontal:18, alignItems:'center', justifyContent:'center', backgroundColor:C.lapis },
  buttonSecondary:{ backgroundColor:'transparent', borderWidth:1, borderColor:C.lapis },
  buttonText:{ color:C.white, fontSize:16, fontWeight:'700' }
});
