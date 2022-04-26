import React from 'react';

import { SafeAreaView, StyleSheet, Dimensions, Image } from 'react-native';

// const source = {uri:'https://apprehab.000webhostapp.com/database/challenge/challenge.jpg'+ '?' + new Date()};
const source = {uri:'https://10.39.20.77/database/challenge/challenge.jpg'+ '?' + new Date()};

const ChallengePicture = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Image source={source} style={styles.im} borderColor={mainColor}/>
    </SafeAreaView>
  );
};

const styleByPlatform = Platform.select({
  ios: {
    container: {
      flex: 1,
      borderTopRightRadius: 10,
      borderTopLeftRadius: 10,
      marginTop: 35,
    },
  
    im: {
      borderWidth: 5,
      borderRadius: 5,
      marginHorizontal: 5,
      maxWidth: Dimensions.get('window').width,
      height: Dimensions.get('window').height-255,
    },
  },
  android: {
    container: {
      flex: 1,
      borderTopRightRadius: 10,
      borderTopLeftRadius: 10,
      marginTop: 35,
    },
  
    im: {
      borderWidth: 5,
      borderRadius: 5,
      marginHorizontal: 5,
      maxWidth: Dimensions.get('window').width,
      height: Dimensions.get('window').height-230,
    },
  }
});

const styles = StyleSheet.create(styleByPlatform);

export default ChallengePicture;