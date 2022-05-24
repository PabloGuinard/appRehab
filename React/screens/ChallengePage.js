import React from 'react';
import {View} from "react-native";
import Header from '../modules/Header';
import ChallengePicture from '../modules/ChallengePicture';
import NavigBar from '../modules/NavigBar';
import AsyncStorage from "@react-native-async-storage/async-storage";

async function setStorage(key: string, value: string){
    if(typeof value === Object){
        value = JSON.stringify(value)
    }
    try {
        await AsyncStorage.setItem(key, value)
    }catch (error){}
}

const ChallengePage = ({navigation}) => {
    return (
        <View style={{flex: 1}}>
            <View style={{flex: 6}}>
                <ChallengePicture navigation={navigation}/>
            </View>
            <View style={{flex: 1}}>
                <NavigBar navigation={navigation}/>
            </View>
        </View>
    );
};

export default ChallengePage;