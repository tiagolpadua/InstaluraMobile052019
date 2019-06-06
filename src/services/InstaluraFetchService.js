import { AsyncStorage } from 'react-native';

export default class InstaluraFetchService {
  static async get(recurso) {
    const uri = `https://instalura-api.herokuapp.com/api${recurso}`;
    const token = await AsyncStorage.getItem('token');
    const requestInfo = {
      headers: new Headers({
        'X-AUTH-TOKEN': token,
      }),
    };
    const resposta = await fetch(uri, requestInfo);
    return resposta.json();

    /*
    const jsonPromisse = AsyncStorage.getItem('token')
      .then(token => {
        return {
          headers: new Headers({
            'X-AUTH-TOKEN': token,
          }),
        };
      })
      .then(requestInfo => fetch(uri, requestInfo))
      .then(resposta => resposta.json());
    return jsonPromisse;
    */
  }
}
