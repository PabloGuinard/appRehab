import React from 'react';
import { View, StyleSheet, Dimensions, FlatList, Image } from 'react-native';

let ROW = []

function checkRoot(params) {
  if (params == 'ProfilePage') {
    ROW = []
    ROW = [
      {
        id: '01',
        title: 'Challenge',
        icon: require('../assets/icones/challenge.png'),
        link: 'Challenge'
      },
      {
        id: '02',
        title: 'Accueil',
        icon: require('../assets/icones/accueil.png'),
        link: 'MainPage'
      },
      {
        id: '03',
        title:'Profile',
        icon: require('../assets/icones/profil.png'),
        link: 'ProfilePage'
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
        link: 'Challenge'
      },
      {
        id: '02',
        title: 'Accueil',
        icon: require('../assets/icones/accueil.png'),
        link: 'MainPage'
      },
      {
        id: '03',
        title:'Profile',
        icon: require('../assets/icones/profil.png'),
        link: 'Profile'
      }
    ]
  }
}

const Item = (item) => (
  <View style={styles.item} onStartShouldSetResponder={() => {item.nav.navigate(item.link, {routeName:item.route})}}>
    <Image
      style={styles.icon}
      source={item.icon}
    />
  </View>
);

const NavigBar = (params) => {
  checkRoot(params.root)
  const renderItem = ({ item }) => (
    <Item icon={item.icon} nav={params.navigation} route={params.route} link={item.link}/>
  );

  return (
    <View style={styles.container} backgroundColor={mainColor}>
      <FlatList
        data={ROW}
        horizontal={true}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  item: {
    flex: 1,
    height: '100%',
    width: Dimensions.get('window').width / 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    height:  '80%',
    resizeMode: 'contain'
  }
});

export default NavigBar;