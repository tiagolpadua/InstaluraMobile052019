import React, { Component } from 'react';
import { StyleSheet, FlatList, Dimensions } from 'react-native';
import Post from './Post';

const { width } = Dimensions.get('screen');

export default class Feed extends Component {
  constructor() {
    super();
    this.state = {
      fotos: [],
    };
  }

  componentDidMount() {
    fetch('https://instalura-api.herokuapp.com/api/public/fotos/rafael')
      .then(resposta => resposta.json())
      .then(json => this.setState({ fotos: json }));
  }

  render() {
    const { fotos } = this.state;
    return (
      <FlatList
        style={styles.container}
        keyExtractor={item => `${item.id}`}
        data={fotos}
        renderItem={({ item }) => <Post foto={item} />}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
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
