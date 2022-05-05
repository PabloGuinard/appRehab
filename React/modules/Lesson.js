import React from 'react';
import {SafeAreaView, View, StyleSheet, Dimensions, FlatList, Image, Text, Linking, Platform} from 'react-native';
import ModalRate from './ModalRate';
import YoutubePlayer from 'react-native-youtube-iframe';
import HTMLView from 'react-native-htmlview';

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

function test(text){
  let result = "<View style={styles.itemContentExercise}><Text style={style.data}>"
  for (let cpt = 0; cpt < text.length; cpt++) {
    if(text[cpt] === '<'){
      let tag = ''
      while (text[cpt] !== '>') {
        tag += text[cpt]
        cpt++
      }
      tag += '>'
      switch(tag[1]){
        case 'g':
          result += <Text style={{fontWeight: 'bold'}}/>
          break
        case 's':
          result += <Text style={{textDecorationLine: 'underline'}}/>
          break
        case 'i':
          result += <Text style={{fontStyle: 'italic'}}/>
          break
        case 'p':
          
          break
        case '#':
          
          break
        case '/':
          result += <Text/>
          break
      }
    }
    else{
      result += text[cpt]
    }
  }
  result += "</Text></View>"
  return result
}

function parseText(text){
  let tags = []
  let rawText = ""
  for (let cpt = 0; cpt < text.length; cpt++) {
    if(text[cpt] === '<'){
      let tag = ''
      let pos = cpt
      while (text[cpt] !== '>') {
        tag += text[cpt]
        cpt++
      }
      tag += '>'
      if(tag[1] !== '/')
        tags.push({
          tag: tag,
          pos: pos
        })
    }
    else{
      rawText += text[cpt]
    }
  }
  let closingTagsPos = []
  for (let cpt = tags.length - 1; cpt > -1; cpt--) {
    //find closing tag
    let closingTag = '</' + tags[cpt].tag.substr(1,  tags[cpt].tag.length)
    let closingTagPos = -1
    let index = tags[cpt].pos
    while(closingTagPos === -1 && index <= text.length - closingTag.length){
      let tmp = ""
      for(let i = index; i < closingTag.length + index; i++){
        tmp +=text[i]
      }
      if(closingTag === tmp)
        closingTagPos = index
      index++
    }
    closingTagsPos.push({
      tag: closingTag,
      pos: closingTagPos
    })
  }
  console.log(closingTagsPos);
  return null
}

const ItemTexte = (item) => (
  parseText(item.data)
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