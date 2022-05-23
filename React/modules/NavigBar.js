import React from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView, View, StyleSheet, Dimensions, FlatList, Image } from 'react-native';

let ROW = []

function checkRoot(params) {
  if (params == 'ProfilePage') {
    ROW = []
    ROW = [
      {
        id: '01',
        title: 'Challenge',
        icon: require('../assets/icones/challenge.png'),
        link: 'Challenge',
        isNew: 1
      },
      {
        id: '02',
        title: 'Accueil',
        icon: require('../assets/icones/accueil.png'),
        link: 'MainPage',
        isNew: 0
      },
      {
        id: '03',
        title:'Profile',
        icon: require('../assets/icones/profil.png'),
        link: 'ProfilePage',
        isNew: 0
      }
    ]
  }
  if (params == 'MainPage') {
    ROW = []
    ROW = [
      {
        id: '01',
        title: 'Challenge',
        icon: require('../assets/icones/challenge.png'),
        link: 'Challenge',
        isNew: 1
      },
      {
        id: '02',
        title: 'Accueil',
        icon: require('../assets/icones/accueil.png'),
        link: 'MainPage',
        isNew: 0
      },
      {
        id: '03',
        title:'Profile',
        icon: require('../assets/icones/profil.png'),
        link: 'Profile',
        isNew: 0
      }
    ]
  }
}

const Item = (item) => (
  <SafeAreaView style={styles.item} onStartShouldSetResponder={() => {item.nav.navigate(item.link, {routeName:item.route})}}>
    <View style={styles.fullItem}>
      <View style={styles.chip} opacity={item.isNew}/>
      <Image
        style={styles.icon}
        source={item.icon}
      />
    </View>
  </SafeAreaView>
);

const NavigBar = (params) => {
  checkRoot(params.root)
  const renderItem = ({ item }) => (
    <Item icon={item.icon} isNew={item.isNew} nav={params.navigation} route={params.route} link={item.link}/>
  );

  return (
    <SafeAreaView style={styles.container} backgroundColor={mainColor}>
      <FlatList
        data={ROW}
        horizontal={true}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  item: {
    flex: 1,
    width: Dimensions.get('window').width/3.1,
    height: Dimensions.get('window').height/10,
    margin: 2,
    marginTop: 7,
    padding: 0,
    borderRadius: 30,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  icon: {
    width:  Dimensions.get('window').width/5.8,
    height:  Dimensions.get('window').width/5.8
  },
  chip : {
      width: 20,
      height: 20,
      borderRadius: 10,
      backgroundColor: 'red',
      marginTop: 20,
      marginBottom: -20,
      zIndex: 2
  },
  fullItem: {
      alignItems: 'flex-end'
  }
});

export default NavigBar;