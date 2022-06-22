import React from 'react';
import { Pressable, Text, StyleSheet, View, Modal, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from 'expo-linear-gradient';


class ResetButton extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            isModalVisible: false,
            isButtonVisible: true,
            text: 'Si vous avez un problème, vous pouvez réinitialiser l\'app. Vous devrez ensuite la fermer puis la relancer.'
        }
    }

    async resetAppData(){
        await AsyncStorage.clear()
        this.setState({
            isButtonVisible: false,
            text: 'L\'app a été réinitialisée. Veuillez la fermer puis la relancer pour continuer à l\'utiliser'
        })
    }

    render(){
        return(
            <Pressable style={styles.background} onPress={()=>{this.setState({isModalVisible: true})}}>
                <Text style={styles.textBefore}>Un problème ?</Text>
                <View width={'100%'}>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={this.state.isModalVisible}
                    >
                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                                <Pressable flexDirection={'row-reverse'}
                                style={[!this.state.isButtonVisible && {display: 'none'}]}
                                onPress={() => {this.setState({isModalVisible: false})}}>
                                    <Image source={require('../assets/icones/cross.png')}
                                        style={styles.cross}
                                    />
                                </Pressable>
                                <Text style={styles.text}>
                                    {this.state.text}
                                </Text>
                                <Pressable
                                    backgroundColor={global.mainColor}
                                    onPress={() => this.resetAppData()}
                                    style={[!this.state.isButtonVisible && {display: 'none'}, styles.button]}
                                    >
                                    <Text style={styles.textStyle}>Réinitialiser</Text>
                                </Pressable>
                            </View>
                        </View>
                        <LinearGradient
                            style={styles.gradient}
                            colors={['transparent', 'black']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 0, y: 1 }} />
                    </Modal>
                </View>
            </Pressable>
        )
    }
}

const styles = StyleSheet.create({
    background: {
        width: '100%',
        marginBottom: 10
    },
    textBefore: {
        textAlign: 'center',
        fontWeight: 'bold',
        textDecorationLine: 'underline',
        color: 'blue'
    },
    gradient: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        opacity: 0.7
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        alignItems: 'stretch',
        zIndex: 2,
        height: 500
    },
    modalView: {
        margin: 30,
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
        backgroundColor: 'white'
    },
    cross: {
        width: 30,
        height: 30,
        marginBottom: 5
    },
    text: {
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 10
    },
    button: {
      borderRadius: 15,
      padding: 15,
      textAlign: 'center',
      elevation: 2,
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center'
    }
})

export default ResetButton