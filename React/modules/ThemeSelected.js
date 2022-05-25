import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';

const back = require('../assets/icones/back.png')

const Item = (item) =>(
  <View style={styles.itemTheme} backgroundColor={item.color} onStartShouldSetResponder={() => {item.nav.goBack()}}>
    <Image source={back}/>
    <View style={{width: '100%', alignItems: 'center', marginLeft: -50}}>
      <Text style={styles.title}>{item.title}</Text>
    </View>
  </View>
);

const ThemeSelected = (props) => {
  const renderItem = () => (
    <Item title={props.title} nav={props.navigation} color={props.color} />      
  );
  return(
    renderItem()
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemTheme: {
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    elevation: 5
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginLeft: 50,
    marginEnd: 20,
    textAlign: 'center'
  },
});

export default ThemeSelected;