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
    for(let cpt = cptData; cpt < cptData + json.length; cpt++){
        const toString = JSON.stringify(json[cpt])
        await setStorage(typeData + cpt, toString)
        cptJson++
    }
    await setStorage(typeData + "Length", (cptData + json.length).toString())
    concatOldNewData(json, typeData)
}

async function updateDataFromApi(json, typeData){
    let oldData
    try{
        oldData = await AsyncStorage.getItem(typeData + "All")
    } catch{}
    oldData = JSON.parse(oldData)
    //set new data in "All" & normal
    json.forEach(element => {
        console.log(element);
        let index = oldData.findIndex(checkData, element.id)
        oldData[index] = element
        setStorage(typeData + index, JSON.stringify(element))
    });
    setStorage(typeData + "All", JSON.stringify(oldData))
}

function checkData(element){
    return this == element.id
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
    const url = 'http://10.39.20.77/api/api.php?timestamp=1650639178'// + timestamp
    const response = await fetch(url)
    console.log(url)
    await setStorage('timestampLastConnection', Math.floor(new Date().getTime() / 1000).toString())
    const json = await response.json();

    if(json.nothing == undefined){
        //add new content
        const news = json.news;
        if(news != undefined){
            if(news.categories != undefined)
                setDataFromApi(news.categories, "categorie")
            if(news.themes != undefined)
                setDataFromApi(news.themes, "theme")
            if(news.exercices != undefined)
                setDataFromApi(news.exercices, "exercice")
            if(news.items != undefined)
                setDataFromApi(news.items, "item")
            if(news.mots != undefined)
                concatOldNewData(news.mots, "mot")
        }
    
        //update content
        const modified = json.modified;
        if(modified != undefined){
            if(modified.categories != undefined)
                updateDataFromApi(modified.categories, "categorie")
            if(modified.themes != undefined)
                updateDataFromApi(modified.themes, "theme")
            if(modified.exercices != undefined)
                updateDataFromApi(modified.exercices, "exercice")
            if(modified.items != undefined)
                updateDataFromApi(modified.items, "item")
            if(modified.mots != undefined)
                //concatOldNewData(modified.mots, "mot")
                ;
        }
    
        //update presentation
        if(json.presentation != undefined){
            try {
                toString = JSON.stringify((json.presentation))
                await setStorage('presentation', toString)
            } catch(error){}
        }
    } else {
        console.log("nothing new");
    }
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