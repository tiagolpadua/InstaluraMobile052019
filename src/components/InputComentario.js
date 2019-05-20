import React, { Component } from 'react';
import { StyleSheet, View, Image, TouchableOpacity, TextInput } from 'react-native';

export default class InputComentario extends Component {
  constructor() {
    super();
    this.state = {
      valorComentario: '',
    };
  }

  render() {
    return (
      <View style={styles.novoComentario}>
        <TextInput
          style={styles.input}
          placeholder="Adicione um comentário..."
          ref={input => {
            this.inputComentario = input;
          }}
          onChangeText={texto => this.setState({ valorComentario: texto })}
          underlineColorAndroid="transparent"
        />

        <TouchableOpacity
          onPress={() => {
            const { valorComentario } = this.state;
            const { comentarioCallback } = this.props;
            comentarioCallback(valorComentario, this.inputComentario);
            this.setState({ valorComentario: '' });
          }}
        >
          <Image style={styles.icone} source={require('../../resources/img/send.png')} />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
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
    width: 30,
    height: 30,
  },
});
