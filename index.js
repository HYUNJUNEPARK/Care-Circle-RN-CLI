/**
 * @format
 */

import { AppRegistry } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import App from './App';
import { name as appName } from './app.json';

/**
 * 앱이 백그라운드에 있을 때 수신된 메시지를 처리하는 핸들러를 설정합니다.
 */
messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Background message handled:', remoteMessage);
});

AppRegistry.registerComponent(appName, () => App);
