import React from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from '@react-navigation/native';
import Home from './stacks/Home';
import Profile from './stacks/Profile';
import Challenge from './stacks/Challenge';
import { log } from 'react-native-reanimated';

async function setStorage(key: string, value: string){
    if(typeof value === Object){
        value = JSON.stringify(value)
    }
    try {
        await AsyncStorage.setItem(key, value)
    }catch (error){
    }
}

async function setDataFromApi(json, typeData){
    let cptData = 0
    let cptJson = 0
    try{
        let tmp = await AsyncStorage.getItem(typeData + "sLength")
        if(tmp != null)
            cptData = tmp
    } catch{}
    console.log(typeData + " cptdata : " + cptData + "  json length : " + json.length);
    for(let cpt = cptData; cpt < cptData + json.length; cpt++){
        const toString = JSON.stringify(json[cpt])
        await setStorage(typeData + cpt, toString)
        cptJson++
    }
    await setStorage(typeData + "Length", (cptData + json.length).toString())
    concatOldNewData(json, typeData)
}

async function initGlobals(){
    global.amountExercicesStartedMonth = 0
    global.amountExercicesEndedMonth = 0
    let tmp
    try {
        tmp = await AsyncStorage.getItem('amountExercicesStartedMonth')
    }catch (e){}
    global.amountExercicesStartedMonth = Number(tmp)
    try {
        tmp = await AsyncStorage.getItem('amountExercicesEndedMonth')
    }catch (e){}
    global.AmountExercicesEndedMonth = Number(tmp)
    global.AmountExercicesEndedMonth = 0
}

async function concatOldNewData(json, typeData){
    let allData
    try{
        allData = await AsyncStorage.getItem(typeData + "All")
    } catch{}
    if(allData === null){
        allData = JSON.stringify(json)
    } else {
        allData = JSON.parse(allData)
        allData.slice(0, -1)
        allData = allData.concat(json)
        //allData = allData.concat("]")
        allData = JSON.stringify(allData)
        console.log("json");
        console.log(allData)
    }
    await setStorage(typeData + "All", allData)
}

const initHistoriqueAndLastConnexion = async () => {
    let tmp = null
    try {
        tmp = await AsyncStorage.getItem('nbItemsHistorique')
    }catch (e) {}
    if(tmp === null){
        await setStorage('nbItemsHistorique', '0')
    }
    tmp = null
    try {
        tmp = await AsyncStorage.getItem('timestampLastConnection')
    }catch (e) {}
    if(tmp === null){
        await setStorage('timestampLastConnection', '0')
    }
}

const getAllDataFromApi = async () => {

    //fetch data from API
    let timestamp = 2
    try {
        timestamp = await AsyncStorage.getItem('timestampLastConnection')
    }catch (error){}
    //const response = await fetch('https://apprehab.000webhostapp.com/api/api.php' + '?timestamp=' + new Date());
    const response = await fetch('http://10.39.20.77/api/api.php?timestamp=' + timestamp);
    console.log('http://10.39.20.77/api/api.php?timestamp=' + timestamp)
    await setStorage('timestampLastConnection', Math.floor(new Date().getTime() / 1000).toString())
    const json = await response.json();
    if(json.categories != undefined)
        setDataFromApi(json.categories, "categorie")
    if(json.themes != undefined)
        setDataFromApi(json.themes, "theme")
    if(json.exercices != undefined)
        setDataFromApi(json.exercices, "exercice")
    if(json.items != undefined)
        setDataFromApi(json.items, "item")
    if(json.mots != undefined)
        concatOldNewData(json.mots, "mot")
    try {
        toString = JSON.stringify((json.presentation))
        await setStorage('presentation', toString)
    } catch(error){}
};

async function setMonth(){
    let month
    try {
        month = await AsyncStorage.getItem("monthOfUpdate")
    } catch (e) {}
    if(month === null) {
        let date = "" + new Date().getMonth()
        await setStorage("monthOfUpdate", date)
    } else{
        let lastUpdate
        try {
            lastUpdate = await AsyncStorage.getItem("monthOfUpdate")
        }catch (e) {}
        if(lastUpdate !== ("" + new Date().getMonth())){
            await setStorage("amountExercicesStartedMonth", "0")
            await setStorage("amountExercicesEndedMonth", "0")
            let date = "" + new Date().getMonth()
            await setStorage("monthOfUpdate", date)
        }
    }
}

async function initialisation(){
    await setMonth()
    await initGlobals()
    await initHistoriqueAndLastConnexion()
    await getAllDataFromApi()
}

const Stack = createStackNavigator()
global.mainColor = '#88bd28'

export default class App extends React.Component {
  render() {
    //AsyncStorage.clear()
    initialisation();
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Home} options={{headerShown: false}}/>
          <Stack.Screen name="Profile" component={Profile} options={{headerShown: false}}/>
          <Stack.Screen name="Challenge" component={Challenge} options={{headerShown: false}}/>
        </Stack.Navigator>
      </NavigationContainer>
    );
  };
};