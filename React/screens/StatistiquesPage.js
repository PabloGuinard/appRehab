import React from 'react';
import { View, SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import CategoriePref from '../modules/CategoriePref';
import NumActivite from '../modules/NumActivites'
import NavigBar from '../modules/NavigBar';

const StatistiquesPage = ({navigation}) => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.statusbar}/>
      <View style={{flex: 8}}>
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
  statusbar: {
      flex: 1,
      maxHeight: StatusBar.currentHeight,
  }
})
  
export default StatistiquesPage;