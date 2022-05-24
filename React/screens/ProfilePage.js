import React from 'react';
import { View, StyleSheet, StatusBar } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Header from '../modules/Header';
import ItemList from '../modules/ItemList';
import NavigBar from '../modules/NavigBar';

const DATA = [
  {
    id: '1',
    title: 'Statistiques',
    link: 'StatistiquesPage',
    isNew: 0,
  },
  {
    id: '2',
    title: 'Lexique',
    link: 'LexiquePage',
    isNew: 0
  },
  {
    id: '3',
    title: 'Historique',
    link: 'HistoriquePage',
    isNew: 0
  },
  {
    id:'4',
    title:'Qui sommes-nous ?',
    link: 'PresentationPage',
    isNew: 0
  }
];

async function setCatPref(){
  let catPref
  try {
    catPref = Number(await AsyncStorage.getItem("nbTimesCréativité"))
  }catch (e) {}
  global.catPref = "Créativité"
  let tmp
  try {
    tmp = Number(await AsyncStorage.getItem("nbTimesSport"))
  }catch (e) {}
  if(tmp > catPref) {
    global.catPref = "Sport"
    catPref = tmp
  }
  try {
    tmp = Number(await AsyncStorage.getItem("nbTimesCognition"))
  }catch (e) {}
  if(tmp > catPref) {
    global.catPref = "Cognition"
    catPref = tmp
  }
  try {
    tmp = Number(await AsyncStorage.getItem("nbTimesPsycho-éducation"))
  }catch (e){}
  if(tmp > catPref) {
    global.catPref = "Psycho-éducation"
    catPref = tmp
  }
  try {
    tmp = Number(await AsyncStorage.getItem("nbTimesRelaxation"))
  }catch (e) {}
  if(tmp > catPref) {
    global.catPref = "Relaxation"
    catPref = tmp
  }
  try {
    tmp = Number(await AsyncStorage.getItem("nbTimesCulture & Infos"))
  } catch (e) {}
  if(tmp > catPref) {
    global.catPref = "Culture & Infos"
  }
}

async function getNumberActivities(){
  let tmp
  try {
    tmp = await AsyncStorage.getItem("amountExercicesStartedMonth")
  } catch (e) {}
  if(tmp != null){
    global.amountExercicesStartedMonth = tmp
  }
}

async function getPresentation(){
  global.presentation = JSON.parse(await AsyncStorage.getItem('presentation'))
}

const ProfilePage = ({navigation}) => {
  setCatPref()
  getNumberActivities()
  getPresentation()
  return (
    <View style={{flex: 1}}>
    <View style={styles.statusbar}/>
      <View style={{flex: 1}}>
        <Header/>
      </View>
      <View style={{flex: 7}}>
        <ItemList navigation={navigation} DATA={DATA} color= {mainColor}/>
      </View>
      <View style={{flex: 1}}>
        <NavigBar navigation={navigation} root={'ProfilePage'}/>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    statusbar: {
        flex: 1,
        maxHeight: StatusBar.currentHeight,
    }
})

export default ProfilePage;