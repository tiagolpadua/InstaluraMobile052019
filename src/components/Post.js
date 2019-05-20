import React, { Component } from 'react';
import { StyleSheet, Image, Text, View, Dimensions } from 'react-native';

const { width } = Dimensions.get('screen');

export default class Post extends Component {
  render() {
    const { foto } = this.props;
    return (
      <View>
        <View style={styles.cabecalho}>
          <Image source={require('../../resources/img/alura.png')} style={styles.fotoDePerfil} />
          <Text>{foto.usuario}</Text>
        </View>
        <Image source={require('../../resources/img/alura.png')} style={styles.foto} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  cabecalho: {
    margin: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  fotoDePerfil: {
    marginRight: 10,
    borderRadius: 20,
    width: 40,
    height: 40,
  },
  foto: {
    width,
    height: width,
  },
});
