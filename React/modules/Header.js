import React from "react"
import { StyleSheet, Dimensions, Image, StatusBar, SafeAreaView } from 'react-native';

const Header = () =>{
    return (
        <SafeAreaView style={styles.container}> 
        <Image style={styles.imgBanner} source={require('../assets/pictures/logo-dispositifs-1.png')}></Image>
            <Image style={styles.imgBanner} source={require('../assets/pictures/banner.png')}></Image>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    imgBanner: {
        width: Dimensions.get('window').width / 2.2,
        height: '100%',
        justifyContent: 'center',
        alignItems: "center",
        resizeMode: 'contain',
    },
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    }
});

export default Header;