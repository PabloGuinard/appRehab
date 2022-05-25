import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

const Item1 = () => (
    <View style={styles.item} backgroundColor={mainColor}>
        <Text style={styles.title}>J'ai ouvert {global.amountExercicesStartedMonth} activités durant les 30 derniers jours.</Text>
    </View>
)

const Item2 = () => (
    <View style={styles.item} backgroundColor={mainColor}>
        <Text style={styles.title}>J'ai terminé {global.amountExercicesEndedMonth} activités durant les 30 derniers jours.</Text>
    </View>
)

const NumActivites = () => {
    return (
        <View>
            <Item1/>
            <Item2/>
        </View>
    )    
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    item: {
      padding: 30,
      borderRadius: 15,
      justifyContent: 'center',
      textAlign: 'center',
      marginHorizontal: 10,
      marginVertical: 10
    },
    title: {
      fontSize: 15,
      color: 'white',
      textAlign: 'justify'
    },
});

export default NumActivites;