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

function componentToString(component){
  console.log(component.props.children + "");
}

function getComponents(text){
  console.log("\n\n\n\n\n\n\n\n\n\n\n")
  global.key = -1
  let tmp = parseText(text)
  tmp.forEach(element => {
    //componentToString(element)
  });
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
      char = tags[tags.length - 1].close
    }
  }
  if(tags.length === 0)
    return text
  //get tags 's children
  let children = []
  for(let cpt = 0; cpt < tags.length; cpt += 2){
    children.push(tagToComponent(tags[cpt], parseText(text.substr(tags[cpt].close, tags[cpt + 1].open - tags[cpt].close))))
  }
  //console.log(JSON.stringify(text.substr(tags[1].close, tags[1 + 1].open - tags[1].close)));
  console.log('\n\n\n')
  //children.forEach(child => componentToString(child))
  
  let result = []
  let tmp

  let char = 0
  for(let cpt = 0; cpt < tags.length; cpt +=2){
    tmp = text.substr(char, tags[cpt].open - char)
    console.log(tmp);
    global.key++
    result.push(<Text key={global.key}>{tmp}</Text>)
    result.push(children[cpt / 2])
    char = tags[cpt + 1].close
  }
  if(char !== text.length){
    tmp = text.substr(char)
    global.key++
    console.log(tmp);
    result.push(<Text key={global.key}>{tmp}</Text>)
  }
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