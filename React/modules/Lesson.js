import React from 'react';
import {SafeAreaView, View, StyleSheet, Dimensions, FlatList, Image, Text, Linking, Platform, useWindowDimensions} from 'react-native';
import ModalRate from './ModalRate';
import YoutubePlayer from 'react-native-youtube-iframe';
import HTMLView from 'react-native-htmlview';
import { TapGestureHandler } from 'react-native-gesture-handler';
import RenderHTML from 'react-native-render-html';

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
  console.log(text);
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
  /* global.key = -1
  let tmp = parseText(replaceLineBreaks(text))
  return tmp */
}

function replaceLineBreaks(text){
  text = text.replace(/<div>/gi,'<br>').replace(/<\/div>/gi,'')
  for (let cpt = 0; cpt < text.length; cpt++){
    if(text.substr(cpt, 4) === '<br>'){
      text = text.substr(0, cpt) + '\r\n' + text.substr(cpt + 4)
    }
  }
  return text
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
  console.log("\n\n\n\n" + text);
  return text
}

function findSecondStyleInTag(tag, isColor){
  console.log(tag.text);
  if(isColor){
    if(tag.text.length !== 22){
      console.log("; color: " + tag.text.substr(22, 7));
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

function findClosingTag(text, tag){
  let closingTag = '</' + tag.text.substr(1)
  if(tag.text.substr(0, 5) === "<font")
    closingTag = "</font"
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
    case 'b':
      stylePerso = {fontWeight: 'bold'}
      break;
    case 'i':
      stylePerso = {fontStyle: 'italic'}
      break;
    case 'u':
      stylePerso = {textDecorationLine: 'underline'}
      break;
    case 'f':
      if(tag.text.substr(0, 12) === '<font size="'){
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
        if(tag.text.length === 15)
          stylePerso = {fontSize: fontSize}
        else{
          
        }
      } else if(tag.text.substr(0, 13) === '<font color="'){
        stylePerso = {color: tag.text.substr(13, 7)}
      }
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