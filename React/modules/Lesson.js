import React from 'react';
import {SafeAreaView, View, StyleSheet, Dimensions, FlatList, Image, Text, Linking, Platform, useWindowDimensions} from 'react-native';
import ModalRate from './ModalRate';
import YoutubePlayer from 'react-native-youtube-iframe';
import HTMLView from 'react-native-htmlview';
import { TapGestureHandler } from 'react-native-gesture-handler';
import RenderHTML from 'react-native-render-html';
import style from 'react-native-modal-picker/style';

function printObject(item, params) {
  switch (item.type){
    case 'Texte':
      return <ItemTexte data={item.data}/>
    case 'Image':
      // const source = ({uri:'https://apprehab.000webhostapp.com/'+ item.data + '?' + new Date()});
      const source = ({uri:'http://10.39.20.77/'+ item.data + '?' + new Date()});
      return <ItemImage data={source}/>
    case 'Video':
      return <ItemVideo data={getIdFromUrl(item.data)}/>
    case 'Button':
      return <ModalRate id={params.content[0].id}/>
  } 
}

function getIdFromUrl(url){
  let regex = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/
  let match = url.match(regex)
  return (match&&match[7].length == 11) ? match[7] : false
}

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
        let fontSize = 18
        switch (tag.text[12]){
          case '2':
            fontSize = 15
            break
          case '5':
            fontSize = 25
            break
          case '6':
            fontSize = 30
            break
        }
        text = text.substr(0, tag.open) + '<span style="font-size: ' + fontSize + 'px' + findSecondStyleInTag(tag, true) + '">' + text.substr(tag.close)
      }
      else if(tag.text.substr(0, 12) === "<font color="){
        text = text.substr(0, tag.open) + '<span style="color: ' + tag.text.substr(13, 7) + findSecondStyleInTag(tag, false) + '">' + text.substr(tag.close)
      }
    }
  }
  return '<span style="font-size: 18px; margin: 10px">' + text + '</span>'
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
      let fontSize = 18
        switch (tag.text[28]){
          case '2':
            fontSize = 15
            break
          case '5':
            fontSize = 25
            break
          case '6':
            fontSize = 30
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

const ItemImage = (item) => (
  <View style={styles.itemContentExercise}>
    <Image source={item.data} style={styles.im}/>
  </View>
);

const ItemVideo = (item) => (
  <YoutubePlayer
    height={250}
    play={false}
    videoId={item.data}
  />
)

const Lesson = (params) => {
  const renderItem =({item}) => (
    printObject(item, params)    
  );
  return(
    <SafeAreaView style={styles.container} >
      <FlatList
        data={params.content[0].content}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />      
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  data: {
    marginHorizontal: 15,
    fontSize: 20,
    textAlign: 'justify',
  },
  im: {
    maxWidth: Dimensions.get('window').width,
    height: Dimensions.get('window').height/3,
    margin: 10
  },
  
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },

  url: {
    color: 'blue',
    marginHorizontal: 15,
    fontSize: 20,
    textAlign: 'justify',
    textDecorationLine: 'underline'
  },
});
  
export default Lesson;