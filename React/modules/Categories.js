import React from 'react';
import { SafeAreaView, View, StyleSheet, Dimensions, FlatList, Text, Image } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";

const Item = (item) => (
  <SafeAreaView style={styles.item} backgroundColor={item.color} onStartShouldSetResponder={() => {navigation(item)}}>
    <View style={styles.chip} opacity={item.isNew}/>
    <Image
      style={styles.icon}
      source={item.icon}  
    />
    <Text style={styles.title}>{item.title}</Text>
  </SafeAreaView>
);

class Categories extends React.Component{
  constructor(props){
    super(props)
    this.nav = props.navigation
    this.state = {
      categories: [
        {
          id: 1,
          title: 'Créativité',
          color: '#ac569d',
          icon: require('../assets/icones/creativite.png'),
          isNew: 0
        },
        {
          id: 2,
          title: 'Sport',
          color: '#f39205',
          icon: require('../assets/icones/sport.png'),
          isNew: 0
        },
        {
          id: 3,
          title: 'Cognition',
          color: '#ece652',
          icon: require('../assets/icones/cognition.png'),
          isNew: 0
        },
        {
          id: 4,
          title: 'Psycho éducation',
          color: '#4bc2ee',
          icon: require('../assets/icones/psycho-education.png'),
          isNew: 0
        },
        {
          id: 5,
          title: 'Relaxation',
          color: '#99cda2',
          icon: require('../assets/icones/relaxation.png'),
          isNew: 0
        },
        {
          id: 6,
          title: 'Culture & Infos',
          color: '#dd0712',
          icon: require('../assets/icones/culture.png'),
          isNew: 0
        }
      ]
    }
  }

  async setStorage(key: string, value: string){
    if(typeof value === Object){
      value = JSON.stringify(value)
    }
    try {
      await AsyncStorage.setItem(key, value)
    }catch (error){}
  }
    
  async navigation(params){
    //increase cpt for stats
    let toIncrease = await AsyncStorage.getItem("nbTimes" + params.title)
    if(toIncrease === null)
      toIncrease = -1
    toIncrease++
    await this.setStorage("nbTimes" + params.title, toIncrease.toString())
    
    //find matching categorie id
    let categoriesArray = JSON.parse(await AsyncStorage.getItem("categorieAll"))
    let index = categoriesArray.findIndex(categorie => categorie.nom === params.title)
    let matchingId = categoriesArray[index].id
    //find all matching themes
    let themesArray = JSON.parse(await AsyncStorage.getItem("themeAll"))
    themesArray = themesArray.filter(theme => theme.parentId === matchingId)
    let DATA = []
    themesArray.reverse()

    //check new exercices in each theme
    let childrenArray = JSON.parse(await AsyncStorage.getItem('exerciceAll'))
    themesArray.forEach(theme => {
      for(let child of childrenArray){
        if(child.parentId === theme.id && child.isNew === 1){
          theme.isNew = 1
          break
        }
      }
    })

    themesArray.forEach(theme => {
      DATA.push({
        id: theme.id,
        title: theme.nom,
        link: "ExercisesPage",
        isNew: theme.isNew
      })
    })
    params.nav.navigate('ThemesPage', {DATA:{DATA}, color:params.color});
  };

  async checkChips(item){
    let children = JSON.parse(await AsyncStorage.getItem('themeAll'))
    children = children.filter(child => child.parentId == item.id)
    if(children.length > 0){
      let isNewChildren = 0
      children.forEach(child => {
        if(child.isNew === 1){
          isNewChildren = 1
        }
      })
      item.isNew = 1
    }
    let tmp = this.state.categories
    tmp[item.id - 1] = item
    this.setState({
      categories: tmp
    })
  }

  checkId(element){
    return this == element.parentId
  }

  renderItem = ({item}) => (
    // <Item title={item.title} icon={item.icon} color={item.color} nav={navigation} isNew={item.isNew}/>
    item.nav = this.nav,
    this.checkChips(item),
    <SafeAreaView style={styles.item} backgroundColor={item.color} onStartShouldSetResponder={() => {this.navigation(item)}}>
    <View style={styles.chip} opacity={item.isNew}/>
    <Image
      style={styles.icon}
      source={item.icon}  
    />
    <Text style={styles.title}>{item.title}</Text>
  </SafeAreaView>
  )
    render(){
      return (
        <SafeAreaView style={styles.container}>
          <FlatList
            data={this.state.categories.slice(0, 2)}
            contentContainerStyle={styles.flatlistContent}
            horizontal={true}
            renderItem={this.renderItem}
            keyExtractor={item => item.id}
          />
          <FlatList
            data={this.state.categories.slice(2, 4)}
            contentContainerStyle={styles.flatlistContent}
            horizontal={true}
            renderItem={this.renderItem}
            keyExtractor={item => item.id}
          />
          <FlatList
            data={this.state.categories.slice(4, 6)}
            contentContainerStyle={styles.flatlistContent}
            horizontal={true}
            renderItem={this.renderItem}
            keyExtractor={item => item.id}
          />
        </SafeAreaView>
      );
    }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  flatlistContent: {
    justifyContent: 'space-evenly',
  },
  item: {
    marginHorizontal: 10,
    flex: 1,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    aspectRatio: 1,
    height: '90%',
    marginTop: 8
    
  },
  title: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'white',
  },
  icon: {
    height: '100%',
    margin: -20,
    aspectRatio: 1
  },
  chip: {
      backgroundColor: 'red',
      width: 20,
      height: 20,
      borderRadius: 10,
      position: 'absolute',
      right: -8,
      top: -8,
      zIndex: 2
  }
});

export default Categories;