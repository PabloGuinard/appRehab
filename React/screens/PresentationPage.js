import React from 'react';
import NavigBar from '../modules/NavigBar';
import { View, Text, Dimensions, StyleSheet, Image, StatusBar} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

const PresentationPage=({navigation})=>{
    const TextPresentation = global.presentation;
    return(
        <View style={{flex:1}}>
            <View style={{flex: 6}}>
                <View style={styles.logos}>
                    <Image style={styles.im1} source={require("../assets/pictures/logo-dispositifs.png")} />
                    <Image style={styles.im2} source={require("../assets/pictures/logo-lyon-1.png")} />
                </View>
                <Text style={styles.data}>{TextPresentation}</Text>
            </View>
            <View style={{flex:1}}>
                <NavigBar navigation={navigation}/>
            </View>
        </View>
    )
}

const styleByPlatform = Platform.select({
    ios: {
        data: {
            marginHorizontal: 15,
            fontSize: 20,
            textAlign: 'justify',
          },
          im1: {
            marginTop: StatusBar.currentHeight,
            maxWidth: Dimensions.get('window').width/1.1,
            maxHeight: Dimensions.get('window').height/4.8
          },
    
          im2: {
            marginTop: StatusBar.currentHeight,
            maxWidth: Dimensions.get('window').width,
            maxHeight: Dimensions.get('window').height/10,
          }
    },
    android: {
        logos: {
            marginTop: StatusBar.currentHeight,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-evenly'
        },
        data: {
            marginTop: 10,
            marginHorizontal: 15,
            fontSize: 20,
            textAlign: 'justify',
        },
        im1: {
            maxWidth: Dimensions.get('window').width / 2.2,
            maxHeight: Dimensions.get('window').height / 6,
            resizeMode: 'contain',
        },

        im2: {
            maxWidth: Dimensions.get('window').width / 2.2,
            maxHeight: Dimensions.get('window').height/ 10,
            resizeMode: 'contain',
        }
    }
});
  
const styles = StyleSheet.create(styleByPlatform);

export default PresentationPage;