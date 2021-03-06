import React from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import ThemeSelected from '../modules/ThemeSelected';
import Lesson from '../modules/Lesson';
import NavigBar from '../modules/NavigBar';
import StarRating from '../modules/StarRating';

const LessonPage = ({route, navigation}) => {
    const title = route.params.title;
    const color = route.params.color;
    const content = route.params.DATA.DATA;
        
    return (
        <View style={styles.safeAreaView}>
            <View style={{flex: 1}}>
                <ThemeSelected navigation={navigation} title={title} color={color}/>
            </View>
            <View style={{flex: 7}}>
                <Lesson content={content} color={color}/>
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

export default LessonPage;