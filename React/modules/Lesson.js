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
  //find tags
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
  //find closing tags
  let closingTags = []
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
    closingTags.push({
      tag: closingTag,
      pos: closingTagPos
    })
  }
  closingTags.reverse()
  let index = 0
  let result = []
  console.log("\n\n\n\n\n\n\n\n\n\n\n");
  while(index < tags.length){
    result.push(createBalise(tags, closingTags, text, index))
    index = result[result.length - 1].start
    // console.log(index);
  }
  result.forEach(element => {
    console.log(element.balise.props.children);
  })
  let tmp = []
  result.forEach(element => {
    tmp.push(element.balise)
  });

  return tmp
}

function createBalise(tags, closingTags, text, start){
  let result
  //case children tags
  if(tags.length > start + 1){
    if(closingTags[start].pos > tags[start + 1].pos){
      let children = []
      let parentStart = start
      while(closingTags[start].pos > tags[start + 1].pos){
        start++
        children.push(createBalise(tags, closingTags, text, start))
      }
      result = {
        balise: tagToBalise(tags[parentStart], closingTags[parentStart], text.substr(tags[parentStart].pos + tags[parentStart].tag.length, closingTags[parentStart].pos - tags[parentStart].pos - tags[parentStart].tag.length)),
        // balise: tagToBalise(tags[parentStart], closingTags[parentStart], ["text", <Text key={1}> allo </Text>, "ciao"]),
        start: start + 1
      }
      return result
    }
  }
  result = {
    balise: tagToBalise(tags[start], closingTags[start], text.substr(tags[start].pos + tags[start].tag.length, closingTags[start].pos - tags[start].pos - tags[start].tag.length)),
    start: start + 1
  }
  return result
}

function tagToBalise(tag, closingTag, text){
  let stylePerso
  switch (tag.tag[1]) {
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
  //console.log("<Text style=" + stylePerso + ">" + text + "</Text>");
  return <Text style={stylePerso}>{text}</Text>
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