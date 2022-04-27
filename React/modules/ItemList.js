import React from 'react';
import {SafeAreaView, View, StyleSheet, FlatList, Text} from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";

export function forceUpdate(){
}

function checkTitle(element){
    return this == element.nom
}

async function setStorage(key: string, value: string){
    if(typeof value === Object){
        value = JSON.stringify(value)
    }
    try {
        await AsyncStorage.setItem(key, value)
    }catch (error){
    }
}

async function navigation(params) {
    let DATA = []
    if (params.title === 'Lexique') {
        let tmp
        tmp = await AsyncStorage.getItem('motAll')
        const motsArray = await JSON.parse(tmp)
        for (let cpt = 0; cpt < motsArray.length; cpt++) {
            DATA[DATA.length] = {
                id: motsArray[cpt].id,
                title: motsArray[cpt].nom,
                link: 'LessonPage',
            }
        }
    }  
    else if(params.title === 'Historique'){
        let tmp
        try {
            tmp = await AsyncStorage.getItem('nbItemsHistorique')
        }catch (error){}
        let historiqueLength = tmp
        if(historiqueLength === null){
            DATA = {};
        }else {
            for (let cpt = 0; cpt < historiqueLength; cpt++){
                let tmp
                try {
                    tmp = await AsyncStorage.getItem('itemHistorique' + cpt)
                }catch (error){}
                tmp = JSON.parse(tmp)
                DATA[DATA.length] = {
                    id: cpt,
                    title: tmp.title,
                    color: tmp.color,
                    link: tmp.link
                }
            }
            DATA.reverse()
        }
    } 
    else if (params.link === 'ExercisesPage') {
        let cpt = 0;
        let idTheme = -1;
        //find parent theme
        tmp = await AsyncStorage.getItem('themeAll')
        let themesArray = JSON.parse(tmp)
        themeId = themesArray.findIndex(checkTitle, params.title)
        console.log(themeId);



        while (idTheme === -1) {
            let tmp
            try {
                tmp = await AsyncStorage.getItem('theme' + cpt)
            }catch (error){}
            let theme = JSON.parse(tmp)
            if (theme.nom === params.title) {
                idTheme = theme.id
            }
            cpt++
        }
        let tmp
        try {
            tmp = await AsyncStorage.getItem('exerciceAll')
        }catch (error){}
        let allExercices = JSON.parse(tmp)
        let matchExercices = []
        for (cpt = 0; cpt < allExercices.length; cpt++) {
            if (allExercices[cpt].parentId === idTheme) {
                matchExercices[matchExercices.length] = allExercices[cpt];
            }
        }
        for (cpt = 0; cpt < matchExercices.length; cpt++) {
            DATA[DATA.length] = {
                id: matchExercices[cpt].id,
                title: matchExercices[cpt].nom,
                link: 'LessonPage'
            }
        }
    } 
    else if (params.link === 'LessonPage') {
        if (params.color === mainColor) {
            let tmp
            try {
                tmp = await AsyncStorage.getItem('motAll')
            }catch (error){}
            let allMots = JSON.parse(tmp)
            for (let cpt = 0; cpt < allMots.length; cpt++) {
                if (allMots[cpt].nom === params.title) {
                    let content = [];
                    content[0] = {
                        type: 'Texte',
                        data: allMots[cpt].definition,
                        id: allMots[cpt].id
                    }
                    DATA[0] = {
                        id: allMots[cpt].id,
                        title: allMots[cpt].nom,
                        content: content
                    };
                }
            }
        }
    else {
        let tmp
            try {
                tmp = await AsyncStorage.getItem('nbItemsHistorique')
            }catch (error){}
            let nbItemsHistorique = tmp
            let data
            if(params.color === global.mainColor){
                data = {
                    title: params.title,
                    color: params.color,
                    link: 'LexiquePage'
                }
            } else {
                data = {
                    title: params.title,
                    color: params.color,
                    link: 'LessonPage'
                }}
            await setStorage('itemHistorique' + nbItemsHistorique, JSON.stringify(data))
            tmp = Number(nbItemsHistorique)
            tmp++
            nbItemsHistorique = tmp.toString()
            await setStorage('nbItemsHistorique', nbItemsHistorique)
            try {
                tmp = await AsyncStorage.getItem("amountExercicesStartedMonth")
            }catch (error){}
            let toIncrease = Number(tmp)
            if (toIncrease === null) {
                toIncrease = -1;
            }
            toIncrease++;
            toIncrease = toIncrease.toString()
            await setStorage("amountExercicesStartedMonth", toIncrease)
            global.amountExercicesStartedMonth = toIncrease
            let idExercice = -1;
            let matchExercice;
            let cpt = 0;
            while (idExercice === -1) {
                try {
                    tmp = await AsyncStorage.getItem('exercice' + cpt)
                }catch (error){}
                matchExercice = JSON.parse(tmp)
                if (matchExercice.nom === params.title) {
                    idExercice = matchExercice
                }
                cpt++
            }
            try {
                tmp = await AsyncStorage.getItem('itemAll')
            }catch (error){}
            let allItems = JSON.parse(tmp)
            let content = [];
            for (cpt = 0; cpt < allItems.length; cpt++) {
                if (allItems[cpt].parentId === matchExercice.id) {
                    content[content.length] = {
                        type: allItems[cpt].typeItem,
                        data: allItems[cpt].nom,
                        id: allItems[cpt].id
                    }
                }
            }
            content[content.length] = {
                type: 'Button',
                data: '',
                id: ''
            }
            DATA[0] = {
                id: matchExercice.id,
                title: matchExercice.nom,
                content: content
            }
        }
    }
    
    params.nav.navigate(params.link, {DATA: {DATA}, color: params.color, title: params.title});
}

let color = '';

function checkColor(props, item) {
    if (props.color === null) {
        color = item.color
    }
    else {
        color = props.color
    }
}

const Item = (item) => (
    <View style={styles.item} backgroundColor={item.color} onMoveShouldSetResponder={() => true} onResponderRelease={() => {navigation(item)}}>
        <Text style={styles.title}>{item.title}</Text>
    </View>
)

const ItemList = (props) => {
    const renderItem = ({item}) => (
        checkColor(props, item),
        <Item title={item.title} color={color} link={item.link} nav={props.navigation}/>
    )

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={props.DATA}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 30,
    },
    item: {
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 5,
    },
    title: {
        fontSize: 25,
        color: 'white',
        fontWeight: 'bold',
    },
});

export default ItemList;