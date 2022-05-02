import React from 'react';
import { SafeAreaView, StyleSheet, Dimensions, FlatList, Text, Image } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";

async function setStorage(key: string, value: string){
  if(typeof value === Object){
    value = JSON.stringify(value)
  }
  try {
    await AsyncStorage.setItem(key, value)
  }catch (error){}
}
const ROW_1 = [
  {
    id: '01',
    title: 'Créativité',
    color: '#ac569d',
    icon: require('../assets/icones/creativite.png'),
  },
  {
    id: '02',
    title: 'Sport',
    color: '#f39205',
    icon: require('../assets/icones/sport.png'),
  },
];

const ROW_2 = [
  {
    id: '03',
    title: 'Cognition',
    color: '#ece652',
    icon: require('../assets/icones/cognition.png'),
  },
  {
    id: '04',
    title: 'Psycho-éducation',
    color: '#4bc2ee',
    icon: require('../assets/icones/psycho-education.png'),
  },
];

const ROW_3 = [
  {
    id: '05',
    title: 'Relaxation',
    color: '#99cda2',
    icon: require('../assets/icones/relaxation.png'),
  },
  {
    id: '06',
    title: 'Culture & Infos',
    color: '#dd0712',
    icon: require('../assets/icones/culture.png'),
  },
];

async function navigation(params){
  //increase cpt for stats
  let toIncrease = await AsyncStorage.getItem("nbTimes" + params.title)
  if(toIncrease === null)
    toIncrease = -1
  toIncrease++
  await setStorage("nbTimes" + params.title, toIncrease.toString())
  
  //find matching categorie id
  let categoriesArray = JSON.parse(await AsyncStorage.getItem("categorieAll"))
  let index = categoriesArray.findIndex(categorie => categorie.nom === params.title)
  let matchingId = categoriesArray[index].id
  //find all matching themes
  let themesArray = JSON.parse(await AsyncStorage.getItem("themeAll"))
  themesArray = themesArray.filter(theme => theme.parentId === matchingId)
  let DATA = []
  themesArray.reverse()
  themesArray.forEach(theme => {
    DATA.push({
      id: theme.id,
      title: theme.nom,
      link: "ExercisesPage"
    })
  })
  params.nav.navigate('ThemesPage', {DATA:{DATA}, color:params.color});
};

const Item = (item) => (
  <SafeAreaView style={styles.item} backgroundColor={item.color} onStartShouldSetResponder={() => {navigation(item)}}>
    <Image
      style={styles.icon}
      source={item.icon}  
    />
    <Text style={styles.title}>{item.title}</Text>
  </SafeAreaView>
);

const Categories = ({navigation}) => {
  const renderItem = ({item}) => (
    <Item title={item.title} icon={item.icon} color={item.color} nav={navigation}/>
  );
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={ROW_1}
        horizontal={true}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
      <FlatList
        data={ROW_2}
        horizontal={true}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
      <FlatList
        data={ROW_3}
        horizontal={true}
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
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 20,
    },
    item: {
      flex: 1,
      width: Dimensions.get('window').height/5.1,
      height: Dimensions.get('window').height/5.1,
      marginHorizontal: Dimensions.get('window').width/25,
      marginVertical : Dimensions.get('window').height/35,
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
    },
    title: {
      fontSize: Dimensions.get('window').width/22,
      fontWeight: 'bold',
      color: 'white',
    },
    icon: {
      width: Dimensions.get('window').width/2.5,
      height: Dimensions.get('window').width/2.5,
      margin: -20,
    },
  },
  android: {
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 20,
    },
    item: {
      flex: 1,
      width: Dimensions.get('window').height/4.7,
      height: Dimensions.get('window').height/4.7,
      marginHorizontal: Dimensions.get('window').width/25,
      marginVertical : Dimensions.get('window').height/35,
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
    },
    title: {
      fontSize: Dimensions.get('window').width/24,
      fontWeight: 'bold',
      color: 'white',
    },
    icon: {
      width: Dimensions.get('window').width/2.5,
      height: Dimensions.get('window').width/2.5,
      margin: -20,
    },
  }
});

const styles = StyleSheet.create(styleByPlatform);

export default Categories;