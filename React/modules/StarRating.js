import React, { Component } from 'react';
import { StyleSheet,View, Text, Image, TouchableOpacity } from 'react-native';
export default class StarRating extends Component {
  constructor() {
    super();
    global.rate = 5
    this.state = {
      Default_Rating: 5,
      Max_Rating: 5,
    };
  }
  UpdateRating(key) {
    this.setState({ Default_Rating: key });
    global.rate = key
  }
  render() {
    let React_Native_Rating_Bar = [];
    for (let i = 1; i <= this.state.Max_Rating; i++) {
      React_Native_Rating_Bar.push(
        <TouchableOpacity
          activeOpacity={0.7}
          key={i}
          onPress={this.UpdateRating.bind(this, i)}>
          <Image
            style={styles.StarImage}
            source={
              i <= this.state.Default_Rating
                  ? require('../assets/icones/star_filled.png')
                  : require('../assets/icones/star_corner.png')
            }
          />
        </TouchableOpacity>
      );
    }
    return (
      <View style={styles.container} backgroundColor={global.mainColor}>
        <Text style={styles.textStyle}>Avez-vous apprécié l'article ?</Text>
        <View style={styles.childView}>{React_Native_Rating_Bar}</View>
        <Text style={styles.textStyle}>
          {this.state.Default_Rating} / {this.state.Max_Rating}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 15,
    paddingVertical: 15
  },
  childView: {
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: 5,
    padding: 10
  },
  StarImage: {
    width: 40,
    height: 40,
    resizeMode: 'cover',
  },
  textStyle: {
    textAlign: 'center',
    fontSize: 15,
    color: 'white'
  }
});