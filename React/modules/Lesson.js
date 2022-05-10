import React from 'react';
import {SafeAreaView, View, StyleSheet, Dimensions, FlatList, Image, Text, Linking, Platform} from 'react-native';
import ModalRate from './ModalRate';
import YoutubePlayer from 'react-native-youtube-iframe';
import HTMLView from 'react-native-htmlview';
import { TapGestureHandler } from 'react-native-gesture-handler';

function printObject(item, params) {
  switch (item.type){
    case 'Texte':
      return <ItemTexte data={item.data}/>
    case 'Lien':
      return <ItemURL data={item.data}/>
    case 'Image':
      // const source = ({uri:'https://apprehab.000webhostapp.com/'+ item.data + '?' + new Date()});
      const source = ({uri:'http://10.39.20.77/'+ item.data + '?' + new Date()});
      return <ItemImage data={source}/>
    case 'Video':
      return <ItemVideo data={item.data}/>
    case 'Button':
      return <ModalRate id={params.content[0].id}/>
  } 
}

function getComponents(text){
  global.key = -1
  let tmp = parseText(text)
  return tmp
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

function findClosingTag(text, tag){
  let closingTag = '</' + tag.text.substr(1)
  for (let cpt = tag.close; cpt < text.length; cpt++) {
    let tmp = text.substr(cpt, closingTag.length)
    if(tmp === closingTag)
      return findTag(text, cpt)
  }
}

function parseText(text){
  //get tags
  let tags = []
  for (let char = 0; char < text.length; char++) {
    if(text[char] === '<'){
      tags.push(findTag(text, char))
      tags.push(findClosingTag(text, tags[tags.length -1]))
      char = tags[tags.length - 1].close - 1
    }
  }
  if(tags.length === 0){
    global.key++
    return <Text key={global.key}>{text}</Text>
  }
  //get tags 's children
  let children = []
  for(let cpt = 0; cpt < tags.length; cpt += 2){
    children.push(tagToComponent(tags[cpt], parseText(text.substr(tags[cpt].close, tags[cpt + 1].open - tags[cpt].close))))
  }
  
  let result = []
  let tmp

  let char = 0
  for(let cpt = 0; cpt < tags.length; cpt +=2){
    tmp = text.substr(char, tags[cpt].open - char)
    if(tmp !== ''){
      global.key++
      result.push(<Text key={global.key}>{tmp}</Text>)
    }
    result.push(children[cpt / 2])
    char = tags[cpt + 1].close
  }
  if(char !== text.length){
    tmp = text.substr(char)
    global.key++
    result.push(<Text key={global.key}>{tmp}</Text>)
  }
  result = <Text>{result}</Text>
  return result
}

function tagToComponent(tag, text){
  let stylePerso
  switch (tag.text[1]) {
    case 'g':
      stylePerso = {fontWeight: 'bold'}
      break;
    case 'i':
      stylePerso = {fontStyle: 'italic'}
      break;
    case 's':
      stylePerso = {textDecorationLine: 'underline'}
      break;
    case '#':
      stylePerso = {color: tag.text.substr(1, tag.length - 2)}
      break
    case 'p':
      stylePerso = {fontSize: (Number)(tag.text.substr(2, tag.length - 3))}
      break
  }
  global.key++
  return <Text key={global.key} style={stylePerso}>{text}</Text>
}

const ItemTexte = (item) => (
  getComponents(item.data)
);

const ItemURL = (item) => (
  <View style={styles.itemContentExercise}>
    <Text style={styles.url} onPress={() => Linking.openURL(item.data)}>{item.data}</Text>
  </View>
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

const styleByPlatform = Platform.select({
  ios: {
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
      height: Dimensions.get('window').height/3
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
  },
  android: {
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
      height: Dimensions.get('window').height/3
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
  }
});

const styles = StyleSheet.create(styleByPlatform);
  
export default Lesson;