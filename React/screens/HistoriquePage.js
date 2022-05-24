import React from 'react';
import ItemList from '../modules/ItemList';
import NavigBar from '../modules/NavigBar';
import { View, StyleSheet, StatusBar } from 'react-native';
import ClearHistorique from '../modules/ClearHistorique';

const HistoriquePage = ({route, navigation}) => {
  const DATA = route.params;
  return (
    <View style={{flex: 1}}>
      <View style={styles.statusbar}/>
      <View style={{flex: 7}}>
        <ItemList navigation={navigation} DATA={DATA.DATA.DATA} color={null}/>
      </View>
      <View style={{flex: 1}}>
        <ClearHistorique navigation={navigation}/>
      </View>
      <View style={{flex: 1}}>
        <NavigBar navigation={navigation}/>
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

export default HistoriquePage;