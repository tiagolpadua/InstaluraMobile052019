import React, { Component } from 'react';
import { FlatList, Image, Text, View, Dimensions } from 'react-native';

const { width } = Dimensions.get('screen');

export default class Feed extends Component {
  render() {
    const fotos = [
      { id: 1, usuario: 'rafael' },
      { id: 2, usuario: 'alberto' },
      { id: 3, usuario: 'vitor' },
    ];

    return (
      <FlatList
        keyExtractor={item => item.id}
        data={fotos}
        renderItem={({ item }) => (
          <View>
            <Text>{item.usuario}</Text>
            <Image
              source={require('../../resources/img/alura.png')}
              style={{ width, height: width }}
            />
          </View>
        )}
      />
    );
  }
}
