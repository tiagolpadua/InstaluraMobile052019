import React, { Component } from 'react';
import { AsyncStorage, FlatList, Platform, StyleSheet } from 'react-native';
import Post from './Post';
import InstaluraFetchService from '../services/InstaluraFetchService';
import Notificacao from '../api/Notificacao.android';

export default class Feed extends Component {
  static navigationOptions = {
    title: 'Instalura',
  };

  constructor() {
    super();
    this.state = {
      fotos: [],
    };
  }

  componentDidMount() {
    InstaluraFetchService.get('/fotos').then(json => this.setState({ fotos: json }));
  }

  adicionaComentario = (idFoto, valorComentario, inputComentario) => {
    if (valorComentario === '') return;

    const foto = this.buscaPorId(idFoto);

    const novoComentario = {
      texto: valorComentario,
    };

    InstaluraFetchService.post(`/fotos/${idFoto}/comment`, novoComentario)
      .then(comentario => [...foto.comentarios, comentario])
      .then(novaLista => {
        const fotoAtualizada = {
          ...foto,
          comentarios: novaLista,
        };
        this.atualizaFotos(fotoAtualizada);
        inputComentario.clear();
      });
  };

  like = idFoto => {
    const foto = this.buscaPorId(idFoto);
    const { fotos: listaOriginal } = this.state;
    AsyncStorage.getItem('usuario')
      .then(usuarioLogado => {
        let novaLista = [];
        if (!foto.likeada) {
          novaLista = [...foto.likers, { login: usuarioLogado }];
        } else {
          novaLista = foto.likers.filter(liker => {
            return liker.login !== usuarioLogado;
          });
        }
        return novaLista;
      })
      .then(novaLista => {
        const fotoAtualizada = {
          ...foto,
          likeada: !foto.likeada,
          likers: novaLista,
        };
        this.atualizaFotos(fotoAtualizada);

        InstaluraFetchService.post(`/fotos/${idFoto}/likexx`).catch(() => {
          this.setState({ fotos: listaOriginal });
          Notificacao.exibe('Ops..', 'Algo deu errado!');
        });
      });
  };

  atualizaFotos = fotoAtualizada => {
    const { fotos } = this.state;
    const fotosAtualizadas = fotos.map(f => (f.id === fotoAtualizada.id ? fotoAtualizada : f));
    this.setState({ fotos: fotosAtualizadas });
  };

  buscaPorId(idFoto) {
    const { fotos } = this.state;
    return fotos.find(f => f.id === idFoto);
  }

  render() {
    const { fotos } = this.state;
    return (
      <FlatList
        style={styles.container}
        keyExtractor={item => `${item.id}`}
        data={fotos}
        renderItem={({ item }) => (
          <Post foto={item} likeCallback={this.like} comentarioCallback={this.adicionaComentario} />
        )}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: Platform.OS === 'ios' ? 20 : 0,
  },
});
