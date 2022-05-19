import { View, StyleSheet, Dimensions, Pressable, Image, Text, Modal } from 'react-native';

const ModalNewContent = (params) => {
    
  const [modalVisible, setModalVisible] = useState(false);

return (
    <View style={styles.centeredView}>
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
        >
        <View style={styles.centeredView}>
            <View style={styles.modalView}>
            <Text style={styles.modalText}>Nouveau contenu diponible !</Text>
            <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => this.setModalVisible(!modalVisible)}>
                <Text style={styles.textStyle}>Fermer</Text>
            </Pressable>
            </View>
        </View>
        </Modal>
    </View>
    );
}

export default ModalNewContent