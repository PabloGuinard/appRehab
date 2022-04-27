import React from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from '@react-navigation/native';
import Home from './stacks/Home';
import Profile from './stacks/Profile';
import Challenge from './stacks/Challenge';

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

async function updateDataFromApi(json, typeData, isMot){
    let oldData
    try{
        oldData = await AsyncStorage.getItem(typeData + "All")
    } catch{}
    oldData = JSON.parse(oldData)
    //set new data in "All" & normal
    json.forEach(element => {
        let index = oldData.findIndex(checkData, element.id)
        oldData[index] = element
        if(!isMot)
            setStorage(typeData + index, JSON.stringify(element))
    });
    setStorage(typeData + "All", JSON.stringify(oldData))
}

async function deleteDataFromApi(json, typeData, isMot){
    let oldData
    let oldDataLength = 0
    try{
        oldData = await AsyncStorage.getItem(typeData + "All")
        oldDataLength = await AsyncStorage.getItem(typeData + "Length")
    }catch{}
    oldData = JSON.parse(oldData)
    json.forEach(element => {
        let index = oldData.findIndex(checkData, element.id)
        if(index !== -1){
            //delete in normal
            if(!isMot){
                let elementId = oldData[index].id
                deleteIndexFromStorage(typeData, elementId, oldDataLength)
            }
            oldData.splice(index, 1)
            oldDataLength--
        }
    })
    oldData = JSON.stringify(oldData)
    await setStorage(typeData + "All", oldData)
    await setStorage(typeData + "Length", oldDataLength.toString())
}

async function deleteIndexFromStorage(typeData, elementId, dataLength){
    let element
    for (let cpt = 0; cpt < dataLength; cpt++) {
        try{
            element = await AsyncStorage.getItem(typeData + cpt)
            element = JSON.parse(element)
            if(element.id === elementId){
                let tmp
                for(cpt; cpt < dataLength - 1; cpt++){
                    try{
                        tmp = await AsyncStorage.getItem(typeData + (cpt + 1))
                    }catch{}
                    await setStorage(typeData + cpt, tmp)
                }
                AsyncStorage.removeItem(typeData + cpt)
                return
            }
        }catch{}
    }
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

async function logDataType(dataType){
    console.log('length : ');
    let tmp = await AsyncStorage.getItem(dataType + "Length")
    console.log(tmp);
    console.log('all : ');
    tmp = await AsyncStorage.getItem(dataType + "All")
    console.log(tmp);
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
    const url = 'http://10.39.20.156/api/api.php?timestamp=' + timestamp
    //const url = 'https://apprehab.000webhostapp.com/api/api.php?timestamp=' + timestamp
    //const response = await fetch(url)
    console.log(url)
    await setStorage('timestampLastConnection', Math.floor(new Date().getTime() / 1000).toString())
    //const json = await response.json();
    const json = "{\"news\":{\"categories\":[{\"id\":\"1\",\"nom\":\"Cr\u00e9ativit\u00e9\"},{\"id\":\"3\",\"nom\":\"Cognition\"},{\"id\":\"4\",\"nom\":\"Sport\"},{\"id\":\"5\",\"nom\":\"Psycho-\u00e9ducation\"},{\"id\":\"6\",\"nom\":\"Relaxation\"},{\"id\":\"10\",\"nom\":\"Culture & Infos\"}],\"themes\":[{\"id\":\"9\",\"nom\":\"On poursuit les pr\u00e9sentations\",\"parentId\":\"1\"},{\"id\":\"10\",\"nom\":\"J'ai le smile !\",\"parentId\":\"1\"},{\"id\":\"11\",\"nom\":\"C'est la rentr\u00e9e !\",\"parentId\":\"1\"},{\"id\":\"12\",\"nom\":\"Quand la cr\u00e9a voyage...\",\"parentId\":\"1\"},{\"id\":\"13\",\"nom\":\"En ao\u00fbt...\",\"parentId\":\"1\"},{\"id\":\"14\",\"nom\":\"Votre biblioth\u00e8que estivale\",\"parentId\":\"1\"},{\"id\":\"15\",\"nom\":\"La sant\u00e9 pour tous !\",\"parentId\":\"4\"},{\"id\":\"16\",\"nom\":\"Le plein d'activit\u00e9s dans les valises\",\"parentId\":\"3\"},{\"id\":\"17\",\"nom\":\"A vos podcasts\",\"parentId\":\"5\"},{\"id\":\"18\",\"nom\":\"Nature et bien \u00eatre\",\"parentId\":\"6\"},{\"id\":\"19\",\"nom\":\"Sortie automnales\",\"parentId\":\"10\"}],\"exercices\":[{\"id\":\"13\",\"nom\":\"Frigo Magic\",\"parentId\":\"8\"},{\"id\":\"14\",\"nom\":\"Le monde de la chocolaterie\",\"parentId\":\"8\"}],\"items\":[{\"id\":\"11\",\"nom\":\"Halloween, c'est la qu\u00eate des bonbons des enfants dans leur quartier mais c'est aussi la confection de recettes diverses et vari\u00e9es et surtout tr\u00e8s cr\u00e9atives. \r\nDominique, que nous surnommons EtcheDom nous livre ici quelques exemples trouv\u00e9s sur internet.\r\n                        \r\n                        \r\n                            \r\n                            \r\n                            \r\n                            \",\"typeItem\":\"Texte\",\"parentId\":\"11\"},{\"id\":\"13\",\"nom\":\"Cette application vous propose des id\u00e9es de recettes pour vos repas avec les produits qui sont disponibles dans votre frigo et dans les placards de votre cuisine.\r\n                            \",\"typeItem\":\"Texte\",\"parentId\":\"11\"},{\"id\":\"14\",\"nom\":\"\/database\/images\/canva Id\u00e9es cuisine pour Halloween 2021-10-13.jpg\",\"typeItem\":\"Image\",\"parentId\":\"11\"},{\"id\":\"16\",\"nom\":\"https:\/\/www.yummyblog.fr\/recettes\/recette-halloween-horrible\/\",\"typeItem\":\"Lien\",\"parentId\":\"11\"},{\"id\":\"17\",\"nom\":\"\/database\/images\/giphy.gif\",\"typeItem\":\"Image\",\"parentId\":\"11\"},{\"id\":\"22\",\"nom\":\"Cette application vous propose des id\u00e9es de recettes pour vos repas avec les produits qui sont disponibles dans votre frigo et dans les placards de votre cuisine.\r\n                            \r\n                            \",\"typeItem\":\"Texte\",\"parentId\":\"13\"},{\"id\":\"23\",\"nom\":\"Comment faire une fois sur l\u2019application Frigo Magic ?\",\"typeItem\":\"Texte\",\"parentId\":\"13\"},{\"id\":\"24\",\"nom\":\"http:\/\/localhost\/index.php\",\"typeItem\":\"Lien\",\"parentId\":\"13\"},{\"id\":\"25\",\"nom\":\"Bonjour,\r\n\r\nPour ce lundi de P\u00e2ques, nous vous avons \u00e9labor\u00e9 un programme avec diff\u00e9rentes activit\u00e9s \u00e0 essayer \u00e0 votre domicile autour de la th\u00e9matique du... chocolat ! Quelle surprise !\",\"typeItem\":\"Texte\",\"parentId\":\"14\"},{\"id\":\"26\",\"nom\":\"Il fallait forc\u00e9ment qu\u2019on vous parle de recettes pour cette occasion particuli\u00e8re et de recettes au chocolat bien \u00e9videmment ! Nous vous proposons des Truffes au chocolat (c\u2019est presque comme des \u0153ufs en chocolat).\",\"typeItem\":\"Texte\",\"parentId\":\"14\"},{\"id\":\"27\",\"nom\":\"https:\/\/www.marmiton.org\/recettes\/recette_truffes-au-chocolat_15660.aspx\",\"typeItem\":\"Lien\",\"parentId\":\"14\"},{\"id\":\"28\",\"nom\":\"\/database\/images\/dessert-813278_1280.jpg\",\"typeItem\":\"Image\",\"parentId\":\"14\"}],\"mots\":[{\"id\":\"5\",\"nom\":\"Attention soutenue\",\"definition\":\"Capacit\u00e9 \u00e0 maintenir son attention sur du long terme et de fa\u00e7on stable. \"},{\"id\":\"6\",\"nom\":\"Cognition sociale\",\"definition\":\"Ensemble des processus cognitifs (aussi appel\u00e9s \u00ab capacit\u00e9s cognitives \u00bb) permettant de comprendre les autres et d'interagir avec eux. La sph\u00e8re de la cognition sociale comprend 4 domaines : la perception \u00e9motionnelle, la perception et connaissances sociales, la th\u00e9orie de l\u2019esprit et les biais attributionnels. \"},{\"id\":\"7\",\"nom\":\"Contr\u00f4le inhibiteur\",\"definition\":\"Capacit\u00e9 \u00e0 faire abstraction (ou \u00e0 supprimer) des pens\u00e9es, des actions ou des informations qui sont inappropri\u00e9es pour la situation ou la t\u00e2che en cours. Il peut s'agir de pens\u00e9es\/actions\/informations automatiques, distrayantes ou qui ne sont plus utiles pour la situation donn\u00e9e. Cette capacit\u00e9 nous permet de s\u00e9lectionner des informations coh\u00e9rentes en vue d\u2019un objectif. L\u2019inhibition fait partie des fonctions ex\u00e9cutives (cf. d\u00e9finition ci-apr\u00e8s) qui sont des comp\u00e9tences cognitives permettant de r\u00e9agir dans des situations impr\u00e9vues, peu connues ou complexes et nous y adapter. \"},{\"id\":\"8\",\"nom\":\"Flexibilit\u00e9 cognitive\",\"definition\":\"Capacit\u00e9 \u00e0 r\u00e9orienter son attention et son action pour s'adapter \u00e0 un changement ou \u00e0 une situation diff\u00e9rente. Cette capacit\u00e9 permet de passer d'une activit\u00e9 \u00e0 une autre (c'est-\u00e0-dire d'alterner entre plusieurs activit\u00e9s) spontan\u00e9ment ou \u00e0 la demande de quelqu'un d'autre. La flexibilit\u00e9 fait partie des fonctions ex\u00e9cutives (cf. d\u00e9finition ci-apr\u00e8s) qui sont des comp\u00e9tences cognitives permettant de r\u00e9agir dans des situations impr\u00e9vues, peu connues ou complexes et de nous y adapter. \"},{\"id\":\"9\",\"nom\":\"Fonctions ex\u00e9cutives\",\"definition\":\"Terme qui regroupe plusieurs fonctions cognitives \u00e9labor\u00e9es : la planification, le contr\u00f4le inhibiteur, la flexibilit\u00e9, l\u2019initiation et la planification (certains auteurs en rajoutent d'autres). Les fonctions ex\u00e9cutives interviennent quand une situation nouvelle, impr\u00e9vue et \/ ou complexe se d\u00e9roule. Dans ce type de situation, nous ne pouvons plus nous laisser porter par nos automatismes et nous devons mettre en place une autre fa\u00e7on de proc\u00e9der pour nous adapter \u00e0 la situation. Les fonctions ex\u00e9cutives nous permettent donc de nous adapter aux situations pour lesquelles il n'y a pas de solution toute faite. \"},{\"id\":\"10\",\"nom\":\"Initiation\",\"definition\":\"Capacit\u00e9 \u00e0 amorcer, \u00e0 mettre en route une action. \"},{\"id\":\"11\",\"nom\":\"M\u00e9moire \u00e0 court terme\",\"definition\":\"Capacit\u00e9 \u00e0 retenir des informations pendant un tr\u00e8s court laps de temps.\"}]},\"presentation\":\"L'App'Rehab a \u00e9t\u00e9 cr\u00e9\u00e9e en mars 2022 et a pour objectif de base de vous soutenir, toutes et tous. A l'\u00e9poque, nous avions d\u00e9cid\u00e9 de vous accompagner quotidiennement en vous proposant de nombreuses activit\u00e9s \u00e0 r\u00e9aliser chez vous. Nous vous avons donc propos\u00e9 diff\u00e9rents outils de cr\u00e9ativit\u00e9 et bien d'autres th\u00e9matiques encore. Il nous semblait fondamental de faire en sorte que le programme de R\u00e9hab que vous aviez engag\u00e9 en d\u00e9but d'ann\u00e9e au sein du DSRPS puisse continuer.\"}"
    json = JSON.parse(json)
    if(json.nothing == undefined){
        //add new content
        const news = json.news
        console.log(json);
        if(news != undefined){
            if(news.categories != undefined)
                await setDataFromApi(news.categories, "categorie")
            if(news.themes != undefined)
                await setDataFromApi(news.themes, "theme")
            if(news.exercices != undefined)
                await setDataFromApi(news.exercices, "exercice")
            if(news.items != undefined)
                await setDataFromApi(news.items, "item")
            if(news.mots != undefined){
                await concatOldNewData(news.mots, "mot")
                await setStorage("motLength", news.mots.length.toString())
            }
        }
    
        //update content
        const modified = json.modified
        if(modified != undefined){
            if(modified.categories != undefined)
            await updateDataFromApi(modified.categories, "categorie", false)
            if(modified.themes != undefined)
            await updateDataFromApi(modified.themes, "theme", false)
            if(modified.exercices != undefined)
                updateDataFromApi(modified.exercices, "exercice", false)
            if(modified.items != undefined)
            await updateDataFromApi(modified.items, "item", false)
            if(modified.mots != undefined)
            await updateDataFromApi(modified.mots, "mot", true)
        }

        //delete content
        const deleted = json.deleted
        if(deleted != undefined){
            if(deleted.categories != undefined)
                await deleteDataFromApi(deleted.categories, "categorie", false)
            if(deleted.themes != undefined)
                await deleteDataFromApi(deleted.themes, "theme", false)
            if(deleted.exercices != undefined)
                await deleteDataFromApi(deleted.exercices, "exercice", false)
            if(deleted.items != undefined)
                await deleteDataFromApi(deleted.items, "item", false)
            if(deleted.mots != undefined)
                await deleteDataFromApi(deleted.mots, "mot", true)
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
    
    logCurrentStorage()
    await logDataType("exercice")
}

const Stack = createStackNavigator()
global.mainColor = '#88bd28'

export default class App extends React.Component {
  render() {
    AsyncStorage.clear()
    initialisation()
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