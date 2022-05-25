import React from 'react';
import { SafeAreaView, View, StyleSheet, FlatList, Text } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";

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
        const motsArray = JSON.parse(await AsyncStorage.getItem('motAll'))
        
        motsArray.sort((a, b) => {
            a = a.nom.toLowerCase()
            b = b.nom.toLowerCase()
            if(a < b)
                return -1
            if(a > b)
                return 1
            return 0
        });
        motsArray.forEach(mot => {
            DATA[DATA.length] = {
                id: mot.id,
                title: mot.nom,
                link: 'LessonPage',
            }
        })
    }  
    else if(params.title === 'Historique'){
        let historiqueArray = JSON.parse(await AsyncStorage.getItem("historique"))
        let cptId = 0
        if(historiqueArray !== null){
            historiqueArray.forEach(item => {
                DATA.push({
                    id: cptId,
                    title: item.title,
                    color: item.color,
                    link: item.link
                })
                cptId++
            })
            DATA.reverse()
        }
    } 
    else if (params.link === 'ExercisesPage') {
        //find parent
        let themesArray = JSON.parse(await AsyncStorage.getItem('themeAll'))
        let parentIndex = themesArray.findIndex(checkTitle, params.title)
        let parent = themesArray[parentIndex]
        themesArray[parentIndex].isNew = 0
        await setStorage('themeAll', JSON.stringify(themesArray))

        let exercicesArray = JSON.parse(await AsyncStorage.getItem('exerciceAll'))
        exercicesArray = exercicesArray.filter(exercice => exercice.parentId === parent.id)
        exercicesArray.reverse()
        exercicesArray.forEach(exercice => {
            DATA[DATA.length] = {
                id: exercice.id,
                title: exercice.nom,
                link: 'LessonPage'
            }
        })
    } 
    else if (params.link === 'LessonPage') {
        if (params.color === mainColor) {
            let motsArray = JSON.parse(await AsyncStorage.getItem('motAll'))
            let index = motsArray.findIndex(checkTitle, params.title)
            let content = []
            content[0] = {
                type: 'Texte',
                data: motsArray[index].definition,
                id: motsArray[index].id
            }
            DATA[0] = {
                id: motsArray[index].id,
                title: motsArray[index].nom,
                content: content
            }
        }
        else {
            //add to historique
            let data = {
                title: params.title,
                color: params.color,
                link: 'LessonPage'
            }
            let historiqueArray = JSON.parse(await AsyncStorage.getItem("historique"))
            if(historiqueArray === null)
                historiqueArray = Array()
            let index = historiqueArray.findIndex(item => item.title === data.title)
            if(index !== -1)
                historiqueArray.splice(index, 1)
            historiqueArray.push(data)
            await setStorage("historique", JSON.stringify(historiqueArray))
            //increase amount exercices started
            let toIncrease = await AsyncStorage.getItem("amountExercicesStartedMonth")
            if (toIncrease === null) {
                toIncrease = -1;
            }
            toIncrease++;
            await setStorage("amountExercicesStartedMonth", toIncrease.toString())
            global.amountExercicesStartedMonth = toIncrease
            
            //find parent
            let exercicesArray = JSON.parse(await AsyncStorage.getItem("exerciceAll"))
            let parentIndex = exercicesArray.findIndex(checkTitle, params.title)
            let parent = exercicesArray[parentIndex]
            //find matching items
            let itemsArray = JSON.parse(await AsyncStorage.getItem("itemAll"))
            itemsArray = itemsArray.filter(item => item.parentId === parent.id)
            let content = []
            itemsArray.forEach(item => {
                content.push({
                    type: item.typeItem,
                    data: item.nom,
                    id: item.id
                })
            })
            content.push({
                type: 'Button',
                data: '',
                id: ''
            })
            DATA[0] = {
                id: parent.id,
                title: parent.nom,
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
    <View style={styles.fullItem}>
        <View style={styles.item} backgroundColor={item.color} onMoveShouldSetResponder={() => true} onResponderRelease={() => {navigation(item)}}>
            <Text style={styles.title}>{item.title}</Text>
        </View>
    </View>
)

const ItemList = (props) => {
    const renderItem = ({item}) => (
        checkColor(props, item),
        <Item title={item.title} color={color} link={item.link} isNew={item.isNew} nav={props.navigation}/>
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
        padding: 15,
        marginHorizontal: 15,
        borderRadius: 15,
        alignSelf: 'stretch',
        margin: 8
    },
    title: {
        fontSize: 15,
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold'
    },
    fullItem: {
        alignItems: 'flex-end'
    }
});

export default ItemList;