import { AppRegistry, YellowBox } from 'react-native';
import Login from './src/screens/Login';

YellowBox.ignoreWarnings(['Require cycle:']);

AppRegistry.registerComponent('InstaluraMobile', () => Login);
