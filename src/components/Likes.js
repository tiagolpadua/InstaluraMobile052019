import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default class Likes extends Component {
  static propTypes = {
    foto: PropTypes.shape({
      urlPerfil: PropTypes.string.isRequired,
      loginUsuario: PropTypes.string.isRequired,
      urlFoto: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
      likeada: PropTypes.bool.isRequired,
      likers: PropTypes.arrayOf(
        PropTypes.shape({
          login: PropTypes.string.isRequired,
        })
      ).isRequired,
      comentarios: PropTypes.arrayOf(
        PropTypes.shape({
          login: PropTypes.string.isRequired,
          texto: PropTypes.string.isRequired,
        })
      ).isRequired,
    }).isRequired,
    likeCallback: PropTypes.func.isRequired,
  };

  static carregaIcone(likeada) {
    return likeada
      ? require('../../resources/img/s2-checked.png')
      : require('../../resources/img/s2.png');
  }

  static exibeLikes(likers) {
    if (likers.length <= 0) return null;

    return (
      <Text style={styles.likes}>
        {likers.length} {likers.length > 1 ? 'curtidas' : 'curtida'}
      </Text>
    );
  }

  render() {
    const { foto, likeCallback } = this.props;

    return (
      <View>
        <TouchableOpacity onPress={() => likeCallback(foto.id)}>
          <Image style={styles.botaoDeLike} source={Likes.carregaIcone(foto.likeada)} />
        </TouchableOpacity>

        {Likes.exibeLikes(foto.likers)}
      </View>
    );
  }
}

// código anterior omitido
const styles = StyleSheet.create({
  botaoDeLike: {
    marginBottom: 10,
    height: 40,
    width: 40,
  },
  likes: {
    fontWeight: 'bold',
  },
});
