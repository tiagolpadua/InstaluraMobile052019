// https://reactnavigation.org/docs/en/getting-started.html

import { AppRegistry } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import Login from './src/screens/Login';
import Feed from './src/components/Feed';

const RootStack = createStackNavigator(
  {
    Login,
    Feed,
  },
  {
    initialRouteName: 'Login',
  }
);

const AppContainer = createAppContainer(RootStack);

AppRegistry.registerComponent('InstaluraMobile', () => AppContainer);
