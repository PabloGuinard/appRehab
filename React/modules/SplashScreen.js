import React from "react";
import { Image, StyleSheet } from 'react-native';
import { View } from "react-native-animatable";

class SplashScreen extends React.Component {
    render() {
      return (
            <View style={styles.view}>
                <Image source={require('../assets/splash.png')} style={styles.splash}/>
            </View>
      );
    }
  }

  const styles = StyleSheet.create({
    splash: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain'
    },
    view: {
        width: '100%',
        height: '100%',
        backgroundColor: "#008c3c"
    }
  })

  export default SplashScreen