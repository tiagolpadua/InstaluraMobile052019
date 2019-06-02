import React, { Component } from 'react';
import { FlatList, Platform, StyleSheet } from 'react-native';
import Post from './Post';

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
    marginTop: Platform.OS === 'ios' ? 20 : 0,
  },
});
