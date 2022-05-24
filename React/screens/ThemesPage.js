import React from 'react';
import {Pressable, StyleSheet, TextInput, View, StatusBar, Image, Dimensions, Text} from 'react-native';
import ItemList from '../modules/ItemList';
import NavigBar from '../modules/NavigBar';

class ThemesPage extends React.Component{
    constructor(props) {
        super(props);
        this.data = props.route.params.DATA.DATA
        this.color = props.route.params.color
        this.navigation = props.navigation
        this.searchedText = ""
        this.state = {
            data : props.route.params.DATA.DATA
        }
    }

    filterThemes(data) {
        console.log("filtre");
        if (this.searchedText === "") {
            console.log("nul");
            return
        }
        let newData = Array()
        const regex = new RegExp('[.]*' + this.searchedText.toLowerCase() + '[.]*')
        for (let cpt = 0; cpt < data.length; cpt++) {
            if (regex.test(data[cpt]['title'].toLowerCase())) {
                newData[newData.length] = data[cpt]
            }
        }
        console.log(newData.length);
        this.setState({
            data: newData
        })
    }

    updateSearchedText(text) {
        this.searchedText = text
    }

    resetFilters() {
        this.setState({
            data : this.data
        })
    }
    render() {
        return (
            <View style={{flex: 1}}>
                <View style={styles.main_container}>
                    <TextInput style={styles.textinput} borderColor={this.color} onChangeText={(text) => {
                        this.updateSearchedText(text)
                    }}/>
                    <View style={styles.buttonsContainer}>
                        <Pressable style={styles.button} marginLeft={10} borderBottomLeftRadius={10} backgroundColor={this.color} onPress={() => {this.resetFilters()}}>
                            <Text style={styles.text}>ANNULER</Text>
                        </Pressable>
                        <View style={styles.break}></View>
                        <Pressable style={styles.button} backgroundColor={this.color} borderBottomRightRadius={10} onPress={() => {this.filterThemes(this.data)}}>
                            <Text style={styles.text}>RECHERCHER</Text>
                        </Pressable>
                    </View>
                </View>
                <View style={{flex: 5, marginTop: -50}}>
                    <ItemList navigation={this.navigation} DATA={this.state.data} color={this.color}/>
                </View>
                <View style={{flex: 1}}>
                    <NavigBar navigation={this.navigation}/>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        marginTop: StatusBar.currentHeight
    },
    textinput: {
        marginLeft: 10,
        marginRight: 10,
        height: 50,
        borderWidth: 5,
        paddingLeft: 5,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    button: {
        height: 50,
        width: Dimensions.get('window').width / 2 - 11,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontSize: 15,
        color: 'white'
    },
    buttonsContainer: {
        flexDirection: 'row'
    },
    break: {
        height: 50,
        width: 2,
        backgroundColor: 'black'
    }
})

export default ThemesPage;