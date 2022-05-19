import React from 'react';
import { View, SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import CategoriePref from '../modules/CategoriePref';
import NumActivite from '../modules/NumActivites'
import NavigBar from '../modules/NavigBar';

const StatistiquesPage = ({navigation}) => {
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={{flex: 6}}>
          <CategoriePref title={global.catPref}/>
          <NumActivite/>
      </View>
      <View style={{flex: 1}}>
        <NavigBar navigation={navigation} route={'ProfilePage'}/>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {
    marginTop: StatusBar.currentHeight - 10,
    flex: 1
  },
})
  
export default StatistiquesPage;