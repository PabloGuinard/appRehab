import React from 'react';
import { View, StatusBar, StyleSheet } from 'react-native';
import ItemList from '../modules/ItemList';
import NavigBar from '../modules/NavigBar';
import ThemeSelected from '../modules/ThemeSelected';

const ExercisesPage = ({route, navigation}) => {
    const title = route.params.title;
    const DATA = route.params;
    const color = route.params.color;

    return (
        <View style={styles.safeAreaView}>
            <View style={{flex: 1}}>
                <ThemeSelected navigation={navigation} title={title} color={color}/>
            </View>
            <View style={{flex: 7}}>
                <ItemList navigation={navigation} DATA={DATA.DATA.DATA} color={color}/>
            </View>
            <View style={{flex: 1}}>
                <NavigBar navigation={navigation}/>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    safeAreaView: {
      marginTop: StatusBar.currentHeight,
      flex: 1
    },
  })

export default ExercisesPage;