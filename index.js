// https://reactnavigation.org/docs/en/getting-started.html

import { AppRegistry } from 'react-native';
import { createAppContainer, createStackNavigator } from 'react-navigation';
import Feed from './src/components/Feed';
import Login from './src/screens/Login';
import AluraLingua from './src/components/AluraLingua';

const RootStack = createStackNavigator(
  {
    Login,
    Feed,
    AluraLingua,
    PerfilUsuario: Feed,
  },
  {
    initialRouteName: 'Login',
  }
);

const AppContainer = createAppContainer(RootStack);

AppRegistry.registerComponent('InstaluraMobile', () => AppContainer);
