import React from 'react';
import NavigBar from '../modules/NavigBar';
import { View, Text, Dimensions, StyleSheet, Image, StatusBar, useWindowDimensions} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import RenderHTML from 'react-native-render-html';

function getComponents(text){
  text = translateToHTML5(text)
  const {width} = useWindowDimensions()
  const source = {
    html: text
  }
  return (
    <RenderHTML
      contentWidth={width}
      source={source}
    />
  )
}

function translateToHTML5(text){
  text = text.replace(/<\/font>/gi, '</span>')

  for (let char = 0; char < text.length; char++) {
    if(text[char] === '<'){
      let tag = findTag(text, char)

      if(tag.text.substr(0, 11) === "<font size="){
        let fontSize = 15
        switch (tag.text[12]){
          case '2':
            fontSize = 12
            break
          case '5':
            fontSize = 20
            break
          case '6':
            fontSize = 25
            break
        }
        text = text.substr(0, tag.open) + '<span style="font-size: ' + fontSize + 'px' + findSecondStyleInTag(tag, true) + '">' + text.substr(tag.close)
      }
      else if(tag.text.substr(0, 12) === "<font color="){
        text = text.substr(0, tag.open) + '<span style="color: ' + tag.text.substr(13, 7) + findSecondStyleInTag(tag, false) + '">' + text.substr(tag.close)
      }
    }
  }
  return '<span style="font-size: 15px; margin: 10px">' + text + '</span>'
}

function findSecondStyleInTag(tag, isColor){
  if(isColor){
    if(tag.text.length !== 22){
        return "; color: " + tag.text.substr(22, 7)
    }
    return ""
  }
  else {
    if(tag.text.length !== 15){
      let fontSize = 15
        switch (tag.text[28]){
          case '2':
            fontSize = 12
            break
          case '5':
            fontSize = 20
            break
          case '6':
            fontSize = 25
            break
        }
      return "; font-size: " + fontSize + "px"
    }
    return ""
  }
}

function findTag(text, pos){
  let tmp = pos
  while(text[tmp] !== '>')
    tmp++
  tmp++
  let tag = {
    close: tmp,
    open: pos,
    length: tmp - pos,
    text: text.substr(pos, tmp - pos),
    isClosing: false
  }

  if(tag.text[1] === '/')
    tag.isClosing = true
  return tag
}

const ItemTexte = (item) => (
  getComponents(item.data)
);

const PresentationPage=({navigation})=>{
    const TextPresentation = global.presentation;
    return(
        <View style={{flex:1}}>
            <View style={styles.statusbar}/>
            <View style={{flex: 8}}>
                <ScrollView>
                    <View style={styles.logos}>
                        <Image style={styles.im1} source={require("../assets/pictures/logo-dispositifs.png")} />
                        <Image style={styles.im2} source={require("../assets/pictures/logo-lyon-1.png")} />
                    </View>
                    <ItemTexte data={TextPresentation}/>
                </ScrollView>
            </View>
            <View style={{flex:1}}>
                <NavigBar navigation={navigation}/>
            </View>
        </View>
    )
}
  
const styles = StyleSheet.create({
    logos: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
    data: {
        marginTop: 10,
        marginHorizontal: 15,
        fontSize: 15,
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
    },
    statusbar: {
        flex: 1,
        maxHeight: StatusBar.currentHeight,
    }
});

export default PresentationPage;