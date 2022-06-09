import React from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from '@react-navigation/native';
import Home from './stacks/Home';
import Profile from './stacks/Profile';
import Challenge from './stacks/Challenge';
import SplashScreen from './modules/SplashScreen';

async function setStorage(key: string, value: string){
    if(typeof value === Object){
        value = JSON.stringify(value)
    }
    try {
        await AsyncStorage.setItem(key, value)
    }catch (error){
    }
}

async function updateDataFromApi(json, typeData){
    let allData = JSON.parse(await AsyncStorage.getItem(typeData + "All"))
    json.forEach(newElement => {
        let index = allData.findIndex(checkData, newElement.id)
        allData[index] = newElement
    })
    await setStorage(typeData + "All", JSON.stringify(allData))
}

async function deleteDataFromApi(json, typeData){
    let allData = JSON.parse(await AsyncStorage.getItem(typeData + "All"))
    json.forEach(toDelete => {
        let index = allData.findIndex(checkData, toDelete.id)
        if(index !== -1){
            allData.splice(index, 1)
        }
    })
    await setStorage(typeData + "All", JSON.stringify(allData))
}

function checkData(element){
    return this == element.id
}

function logCurrentStorage() {
    AsyncStorage.getAllKeys().then((keyArray) => {
        AsyncStorage.multiGet(keyArray).then((keyValArray) => {
        let myStorage: any = {};
        for (let keyVal of keyValArray) {
            myStorage[keyVal[0]] = keyVal[1]
        }

        console.log('CURRENT STORAGE: ', myStorage);
        })
    });
}

async function initGlobals(){
    // global.dns = 'http://srvrehab'
    global.dns = 'http://10.39.20.77'
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
    let allData = JSON.parse(await AsyncStorage.getItem(typeData + "All"))
    if(allData === null){
        allData = json
    }
    else {
        allData = allData.concat(json)
    }
    await setStorage(typeData + "All", JSON.stringify(allData))
}

const initHistoriqueAndLastConnexion = async () => {
    let timestamp = await AsyncStorage.getItem("timestampLastConnection")
    if(timestamp === null)
        await setStorage("timestampLastConnection", "0")
}

const getAllDataFromApi = async () => {

    //fetch data from API
    let timestamp = 2
    try {
        timestamp = await AsyncStorage.getItem('timestampLastConnection')
    }catch (error){}
    const url = global.dns + '/api/api.php?timestamp=' + timestamp
    const response = await fetch(url)
    console.log(url)
    await setStorage('timestampLastConnection', Math.floor(new Date().getTime() / 1000).toString())
    const json = await response.json();
    if(json.nothing == undefined){
        //add new content
        const news = json.news
        if(news != undefined){
            global.isNewContent = true
            if(news.categories != undefined)
                await concatOldNewData(news.categories, "categorie")
            if(news.themes != undefined){
                news.themes.forEach(theme => { theme.isNew = 1})
                await concatOldNewData(news.themes, "theme")
            }
            if(news.exercices != undefined){
                news.exercices.forEach(exercice => { exercice.isNew = 1})
                await concatOldNewData(news.exercices, "exercice")
            }
            if(news.items != undefined)
                await concatOldNewData(news.items, "item")
            if(news.mots != undefined){
                await concatOldNewData(news.mots, "mot")
            }
        }
    
        //update content
        const modified = json.modified
        if(modified != undefined){
            if(modified.categories != undefined)
            await updateDataFromApi(modified.categories, "categorie")
            if(modified.themes != undefined)
            await updateDataFromApi(modified.themes, "theme")
            if(modified.exercices != undefined)
                updateDataFromApi(modified.exercices, "exercice")
            if(modified.items != undefined)
            await updateDataFromApi(modified.items, "item")
            if(modified.mots != undefined)
            await updateDataFromApi(modified.mots, "mot")        }

        //delete content
        const deleted = json.deleted
        if(deleted != undefined){
            if(deleted.categories != undefined)
                await deleteDataFromApi(deleted.categories, "categorie")
            if(deleted.themes != undefined)
                await deleteDataFromApi(deleted.themes, "theme")
            if(deleted.exercices != undefined)
                await deleteDataFromApi(deleted.exercices, "exercice")
            if(deleted.items != undefined)
                await deleteDataFromApi(deleted.items, "item")
            if(deleted.mots != undefined)
                await deleteDataFromApi(deleted.mots, "mot")
        }
    
        //update presentation
        if(json.presentation !== undefined){
            try {
                toString = JSON.stringify(json.presentation)
                await setStorage('presentation', toString)
            } catch(error){}
        }
    
        //update text in challenge
        if(json.challenge !== undefined){
            global.challengeText = json.challenge
        }
    } else {
        global.isNewContent = false
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
    
    //logCurrentStorage()
}

const Stack = createStackNavigator()
global.mainColor = '#88bd28'

export default class App extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            isLoading: true
        }
    }

    async componentDidMount(){
        // await AsyncStorage.clear()
        await initialisation()
        this.setState({isLoading: false})
    }

  render() {
    if(this.state.isLoading)
        return <SplashScreen/>
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