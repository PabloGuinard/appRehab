import React from 'react';
import ItemList from '../modules/ItemList';
import NavigBar from '../modules/NavigBar';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";


class HistoriquePage extends React.Component{
  constructor(props){
    super(props)
    this.DATA = props.route.params
    this.navigation = props.navigation
    this.state = {
      data: Array()
    }
  }

  async componentDidMount(){
    let data = JSON.parse(await AsyncStorage.getItem('historique'))
    let id = 0
    if(data.length !== null){
      data.forEach(element => {
        element.isNew = 0
        element.id = id
        id++
      });
    }
    this.setState({data: data})
  }

  async clear(){
    this.setStorage("historique", "")
    this.setState({data: Array()})
  }
  
  async setStorage(key: string, value: string){
    if(typeof value === Object){
        value = JSON.stringify(value)
    }
    try {
        await AsyncStorage.setItem(key, value)
    }catch (error){
    }
  }



  render(){

    return (
      <View style={{flex: 1}}>
        <View style={styles.statusbar}/>
        <View style={{flex: 7}}>
          <ItemList navigation={this.navigation} DATA={this.state.data} color={null}/>
        </View>
        <View style={{flex: 1}}>
          <View style={styles.item} backgroundColor={mainColor} onStartShouldSetResponder={() => {this.clear()}}>
              <Text style={styles.title}>Réinitialiser l'historique</Text>
          </View>
        </View>
        <View style={{flex: 1}}>
          <NavigBar navigation={this.navigation}/>
        </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
    statusbar: {
        flex: 1,
        maxHeight: StatusBar.currentHeight,
    },
    item: {
      padding: 20,
      borderRadius: 15,
      justifyContent: 'center',
      textAlign: 'center',
      marginHorizontal: 10,
      elevation: 5
    },
    title: {
      fontSize: 15,
      fontWeight: 'bold',
      color: 'white',
      textAlign: 'center'
    }
})

export default HistoriquePage;