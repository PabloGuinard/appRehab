import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

const Item = (item) => (
  <View style={styles.item} backgroundColor={item.color}>
    <Text style={styles.txt}>Ma catégorie préférée :</Text>
    <Text style={styles.title} color={item.color}>{item.title}</Text>
  </View>
);

const CategoriePref = (props) => {
  return (
    <Item title={props.title} color={mainColor}/>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    padding: 15,
    borderRadius: 15,
    justifyContent: 'center',
    textAlign: 'center',
    marginHorizontal: 10,
    marginVertical: 10
  },
  txt: {
    fontSize: 15,
    color: 'white',
  },
  title: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'white',
    },
});

export default CategoriePref;