import React from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import Header from '../modules/Header';
import Categories from '../modules/Categories'
import NavigBar from '../modules/NavigBar';


const MainPage = ({navigation}) => {
    return (
        <View style={{flex: 1}}>
            <View style={styles.statusbar}/>
            <View style={{flex: 1}}>
                <Header/>
            </View>
            <View style={{flex: 7}}>
                <Categories navigation={navigation}/>
            </View>
            <View style={{flex: 1}}>
                <NavigBar navigation={navigation} root={'MainPage'}/>
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

export default MainPage;