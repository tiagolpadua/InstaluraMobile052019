import React, { Component } from 'react';
import { Image, Text, View, Dimensions } from 'react-native';

const { width } = Dimensions.get('screen');

export default class Feed extends Component {
  render() {
    return (
      <View>
        <Text>rafael</Text>
        <Image source={require('../../resources/img/alura.png')} style={{ width, height: width }} />
      </View>
    );
  }
}
