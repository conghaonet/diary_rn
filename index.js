import { AppRegistry } from 'react-native';

// import App from './App';
// AppRegistry.registerComponent('diary_rn', () => App);

import Root from './src/Root';
//关闭提示：Remote debugger is in a background tab which may cause apps to perform slowly……
console.ignoredYellowBox = ['Remote debugger'];
AppRegistry.registerComponent('diary_rn', () => Root);

