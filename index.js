import { AppRegistry, Platform } from 'react-native';
import App from './components/App';

AppRegistry.registerComponent('Countdown', () => App);

if (Platform.OS === 'web') {
  const rootTag = document.getElementById('root') || document.getElementById('main');
  AppRegistry.runApplication('Countdown', { rootTag });
}
