import React from 'react';

import { StyleSheet, Dimensions, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

// const source = {uri:'https://apprehab.000webhostapp.com/database/challenge/challenge.jpg'+ '?' + new Date()};
const source = {uri:'http://10.39.20.77/database/challenge/challenge.jpg'+ '?' + new Date()};

const ChallengePicture = () => {
  return (
    <ScrollView style={styles.container}>
      <Image source={source} style={styles.im} borderColor={mainColor}/>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 35,
  },

  im: {
    borderWidth: 5,
    marginHorizontal: 5,
    width: Dimensions.get('window').width - 20,
    height: Dimensions.get('window').height,
    resizeMode: 'contain'
  },
});

export default ChallengePicture;