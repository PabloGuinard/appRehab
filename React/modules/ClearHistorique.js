import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, Text, StyleSheet, StatusBar } from "react-native";

async function setStorage(key: string, value: string){
    if(typeof value === Object){
        value = JSON.stringify(value)
    }
    try {
        await AsyncStorage.setItem(key, value)
    }catch (error){
    }
}

async function clear(){
    setStorage("historique", "")
}

const ClearHistorique = (params) => {
    return (
        <View style={styles.item} backgroundColor={mainColor} onStartShouldSetResponder={() => {clear(), params.navigation.goBack()}}>
            <Text style={styles.title}>Réinitialiser l'historique</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    item: {
      padding: 20,
      borderRadius: 15,
      justifyContent: 'center',
      textAlign: 'center',
      marginHorizontal: 10,
      marginVertical: -1,
    },
    title: {
      fontSize: 15,
      fontWeight: 'bold',
      color: 'white',
      textAlign: 'center'
    },
});

export default ClearHistorique;