import React from "react"
import { StyleSheet, Dimensions, Image, StatusBar, SafeAreaView } from 'react-native';

const Header = () =>{
    return (
        <SafeAreaView style={{flex: 1}}> 
            <Image style={styles.imgBanner} source={require('../assets/pictures/banner.png')}></Image>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    imgBanner: {
        width: Dimensions.get('window').width,
        height: '100%',
        justifyContent: 'center',
        alignItems: "center",
        resizeMode: 'contain',
    },
});

export default Header;