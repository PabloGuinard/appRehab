import React, { useState } from 'react';
import { Modal, View, Text, Pressable, Image, StyleSheet } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';

const PopupNewContent = () => {
    function closeModal() {
        setModalVisible(false)
        global.isNewContent = false
    }
    const [modalVisible, setModalVisible] = useState(global.isNewContent);

    return (
        <View width={'100%'}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView} backgroundColor={global.mainColor}>
                        <Pressable flexDirection={'row-reverse'} onPress={() => closeModal()}>
                            <Image source={require('../assets/icones/cross_white.png')}
                                style={styles.cross}
                            />
                        </Pressable>
                        <Text style={styles.text}>Nouveau contenu disponible !</Text>
                    </View>
                </View>
                <LinearGradient
                    style={styles.gradient}
                    colors={['transparent', 'black']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 1 }} />
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
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
    },
    cross: {
        width: 30,
        height: 30,
        marginBottom: 5
    },
    text: {
        fontSize: 18,
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10
    }
});

export default PopupNewContent