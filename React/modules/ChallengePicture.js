import React from 'react';

import { StyleSheet, Dimensions, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

const source = {uri:'http://srvrehab/database/challenge/challenge.jpg'+ '?' + new Date()};

const ChallengePicture = () => {
  return (
    <ScrollView style={styles.container} contentContainerStyle={{alignItems: 'center'}}>
      <Image source={source} style={styles.im} borderColor={mainColor}/>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    width: '100%',
  },

  im: {
    width: Dimensions.get('window').width - 20,
    height: Dimensions.get('window').height * 5 / 7,
    resizeMode: 'contain'
  },
});

export default ChallengePicture;