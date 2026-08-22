import AsyncStorage from '@react-native-async-storage/async-storage';
export type StoredProfile={birthRoot:number|null;primary:number;top:Array<{operator:number;rate:number;selections:number}>;clarity:string;answered:number;createdAt:string};
const KEY='paa:latest-profile:v07';
export async function saveLatestProfile(p:StoredProfile){await AsyncStorage.setItem(KEY,JSON.stringify(p));}
export async function loadLatestProfile():Promise<StoredProfile|null>{const raw=await AsyncStorage.getItem(KEY);if(!raw)return null;try{return JSON.parse(raw) as StoredProfile}catch{return null}}
