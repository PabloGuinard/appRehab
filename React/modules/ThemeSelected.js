import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';

const back = require('../assets/icones/back.png')

const Item = (item) =>(
  <View style={styles.itemTheme} backgroundColor={item.color} onStartShouldSetResponder={() => {item.nav.goBack()}}>
    <Image source={back}/>
    <Text style={styles.title}>{item.title}</Text>
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
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white',
    marginLeft: 20,
    marginEnd: 20
  },
});

export default ThemeSelected;