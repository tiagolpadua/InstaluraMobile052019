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
        style={{ marginTop: 20 }}
        keyExtractor={item => item.id}
        data={fotos}
        renderItem={({ item }) => (
          <View>
            <View>
              <Image
                source={require('../../resources/img/alura.png')}
                style={{ width: 40, height: 40 }}
              />
              <Text>{item.usuario}</Text>
            </View>
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
