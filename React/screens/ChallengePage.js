import React from 'react';
import {View, StyleSheet, StatusBar, ScrollView, useWindowDimensions } from "react-native";
import ChallengePicture from '../modules/ChallengePicture';
import NavigBar from '../modules/NavigBar';
import AsyncStorage from "@react-native-async-storage/async-storage";
import RenderHTML from 'react-native-render-html';
import Header from '../modules/Header';

function getComponents(text){
  if(text !== undefined)
    text = translateToHTML5(text)
  const {width} = useWindowDimensions()
  const source = {
    html: text
  }
  console.log(source.html);
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


const ChallengePage = ({navigation}) => {
  const challengeText = global.challengeText
  return (
      <View style={{flex: 1}}>
          <View style={styles.statusbar}/>
          <View style={{flex: 1}}>
              <Header/>
          </View>
          <View style={{flex: 7}}>
            <ScrollView>
              <ChallengePicture navigation={navigation}/>
              <ItemTexte data={challengeText}/>
            </ScrollView>
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

export default ChallengePage;