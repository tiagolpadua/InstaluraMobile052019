import React, { Component } from 'react';
import {
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
  View,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('screen');

export default class Post extends Component {
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

  adicionaComentario = () => {
    const { valorComentario } = this.state;
    console.warn(valorComentario);
    this.inputComentario.clear(); // para limpar o campo de texto
  };

  like = () => {
    const { foto } = this.state;

    let novaLista = [];
    if (!foto.likeada) {
      novaLista = [...foto.likers, { login: 'meuUsuario' }];
    } else {
      novaLista = foto.likers.filter(liker => liker.login !== 'meuUsuario');
    }

    const fotoAtualizada = {
      ...foto,
      likeada: !foto.likeada,
      likers: novaLista,
    };
    this.setState({ foto: fotoAtualizada });
  };

  render() {
    const { foto } = this.state;

    return (
      <View>
        <View style={styles.cabecalho}>
          <Image source={{ uri: foto.urlPerfil }} style={styles.fotoDePerfil} />
          <Text>{foto.loginUsuario}</Text>
        </View>
        <Image source={{ uri: foto.urlFoto }} style={styles.foto} />

        <View style={styles.rodape}>
          <TouchableOpacity onPress={this.like}>
            <Image style={styles.botaoDeLike} source={Post.carregaIcone(foto.likeada)} />
          </TouchableOpacity>
        </View>
        {Post.exibeLikes(foto.likers)}
        {Post.exibeLegenda(foto)}

        {foto.comentarios.map(comentario => (
          <View style={styles.comentario} key={comentario.id}>
            <Text style={styles.tituloComentario}>{comentario.login}</Text>
            <Text>{comentario.texto}</Text>
          </View>
        ))}

        <View style={styles.novoComentario}>
          <TextInput
            style={styles.input}
            placeholder="Adicione um comentário..."
            ref={input => {
              this.inputComentario = input;
            }}
            onChangeText={texto => this.setState({ valorComentario: texto })}
          />

          <TouchableOpacity onPress={this.adicionaComentario}>
            <Image style={styles.icone} source={require('../../resources/img/send.png')} />
          </TouchableOpacity>
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
