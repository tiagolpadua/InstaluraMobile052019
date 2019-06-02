import React, { Component } from 'react';
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import InputComentario from './InputComentario';
import Likes from './Likes';

const { width } = Dimensions.get('screen');

export default class Post extends Component {
  static exibeLegenda(foto) {
    if (foto.comentario === '') return null;

    return (
      <View style={styles.comentario}>
        <Text style={styles.tituloComentario}>{foto.loginUsuario}</Text>
        <Text>{foto.comentario}</Text>
      </View>
    );
  }

  constructor(props) {
    super(props);
    const { foto } = this.props;
    this.state = {
      foto,
    };
  }

  adicionaComentario = (valorComentario, inputComentario) => {
    const { foto } = this.state;
    if (valorComentario === '') return;

    const novaLista = [
      ...foto.comentarios,
      {
        id: valorComentario,
        login: 'meuUsuario',
        texto: valorComentario,
      },
    ];

    const fotoAtualizada = {
      ...foto,
      comentarios: novaLista,
    };

    this.setState({ foto: fotoAtualizada });
    inputComentario.clear();
  };

  render() {
    const { foto, likeCallback } = this.props;

    return (
      <View>
        <View style={styles.cabecalho}>
          <Image source={{ uri: foto.urlPerfil }} style={styles.fotoDePerfil} />
          <Text>{foto.loginUsuario}</Text>
        </View>
        <Image source={{ uri: foto.urlFoto }} style={styles.foto} />

        <View style={styles.rodape}>
          <Likes foto={foto} likeCallback={likeCallback} />
          {Post.exibeLegenda(foto)}

          {foto.comentarios.map(comentario => (
            <View style={styles.comentario} key={comentario.id}>
              <Text style={styles.tituloComentario}>{comentario.login}</Text>
              <Text>{comentario.texto}</Text>
            </View>
          ))}

          <InputComentario comentarioCallback={this.adicionaComentario} />
        </View>
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
  rodape: {
    margin: 10,
  },
  botaoDeLike: {
    marginBottom: 10,
    height: 40,
    width: 40,
  },
  likes: {
    fontWeight: 'bold',
  },
  comentario: {
    flexDirection: 'row',
  },
  tituloComentario: {
    fontWeight: 'bold',
    marginRight: 5,
  },
  novoComentario: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  input: {
    flex: 1,
    height: 40,
  },
  icone: {
    height: 30,
    width: 30,
  },
});
