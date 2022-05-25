import { View, StyleSheet, Dimensions, Pressable, Image, Text, Modal } from 'react-native';
import StarRating from '../modules/StarRating';
import React, { useState } from 'react';
import CommentTextInput from '../modules/CommentSection';
import AsyncStorage from "@react-native-async-storage/async-storage";

let isEnded

async function setStorage(key: string, value: string){
  if(typeof value === Object){
    value = JSON.stringify(value)
  }
  try {
    await AsyncStorage.setItem(key, value)
  }catch (error){
  }
}

async function isEndedFunction(exerciceId){
  try {
    isEnded = await AsyncStorage.getItem('exerciceEnded' + exerciceId)
  } catch (e) {}
}

async function sendComment(rate: string, comment: string, exerciceId: string) {
  // let url = 'https://apprehab.000webhostapp.com/api/apiTraitement.php?rate=' + rate + '&comment='
  let url = 'http://10.39.20.77/api/apiTraitement.php?rate=' + rate + '&comment='
      + comment + '&exerciceId=' + exerciceId
  await fetch(url)
}

const ModalRate = (params) => {
  isEnded = false
  global.comment = "Aucun commentaire"
  isEndedFunction(params.id)

  function closeSendComment(rate, comment, exerciceId){
    closeModal(exerciceId)
    sendComment(rate, comment, exerciceId)
  }

  function closeModal(exerciceId){
    setModalVisible(!modalVisible)
    setStorage('exerciceEnded' + exerciceId, 'true')
    global.amountExercicesEndedMonth++
    setStorage('amountExercicesEndedMonth', global.amountExercicesEndedMonth.toString())
  }

  function closeModalBis(){
    setModalVisibleBis(!modalVisibleBis)
  }

  function openModal(){
    if(!isEnded){
      setModalVisible(true)
     } else{
      setModalVisibleBis(true)
     }
  }

  let modalAlreadyEndedVisible = false
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibleBis, setModalVisibleBis] = useState(false);
  return (
    <View width={'100%'} marginTop={20}>
      <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Pressable flexDirection={'row-reverse'} onPress={()=>closeModal(params.id)}>
              <Image source={require('../assets/icones/cross.png')}
                     style={styles.cross}
              />
            </Pressable>
            <StarRating/>
            <CommentTextInput/>
            <Pressable
                style={styles.button}
                backgroundColor={global.mainColor}
                onPress={() => closeSendComment(global.rate, global.comment, params.id)}>
              <Text style={styles.textStyle}>Envoyer</Text>
            </Pressable>
          </View>
        </View>
        <View style={styles.background}/>
      </Modal>
      <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisibleBis}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Pressable flexDirection={'row-reverse'} onPress={()=>closeModalBis()}>
              <Image source={require('../assets/icones/cross.png')}
                     style={styles.cross}
              />

            </Pressable>
            <View backgroundColor={global.mainColor} style={styles.textContainer}>
              <Text style={styles.modalText}>Exercice déjà terminé !</Text>
            </View>
          </View>
        </View>
      </Modal>
      <View style={{width: '100%', alignContent: 'stretch', marginBottom: 20}}>
        <Pressable
          style={[styles.button]}
          marginHorizontal={15}
          backgroundColor={mainColor}
          onPress={() => openModal()}
        >
          <Text style={styles.textStyle}>Finir l'exercice</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styleByPlatform = Platform.select({
});

const styles = StyleSheet.create({
  background: {
    backgroundColor: 'black',
    opacity: 0.5,
    width: '100%',
    height: '100%',
    position: 'absolute'
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    alignItems: 'stretch',
    zIndex: 2
  },
  modalView: {
    margin: 30,
    backgroundColor: "white",
    borderRadius: 15,
    padding: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    alignItems: 'stretch',
    justifyContent: 'flex-end',
  },
  button: {
    borderRadius: 15,
    padding: 15,
    elevation: 2,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 15,
  },
  modalText: {
    textAlign: "center",
    color: 'white',
    fontWeight: 'bold'
  },
  textContainer: {
    marginTop: 10,
    marginBottom: 15,
    padding: 15,
    borderRadius: 15,
  },
  cross: {
    width: 30,
    height: 30,
    marginBottom: 5
  }
});

export default ModalRate;