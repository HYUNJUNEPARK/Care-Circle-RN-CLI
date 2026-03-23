/**
 * https://github.com/facebook/react-native
 */
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './src/navigator/StackNavigator';
import { TextModalProvider } from './src/components/modals/TextModalProvider';
import { AuthProvider } from './src/auth/AuthProvider';
import { StatusBar } from 'react-native';
import { useFcmHandler } from './src/hooks/useFcmHandler';
import { navigationRef } from './src/navigator/navigationRef';
import notifee, { AndroidImportance } from '@notifee/react-native';

/**
 * 앱 초기화 시 기본 알림 채널을 생성하는 함수
 * Android에서는 알림을 표시하기 위해 채널이 필요하므로, 앱이 시작될 때 기본 채널을 만들어줍니다.
 * 이 채널은 FCM에서 수신된 알림이 표시될 때 사용됩니다.
 * 채널 ID는 'default'로 설정하고, 중요도는 HIGH로 지정하여 알림이 눈에 띄게 표시되도록 합니다.
 * iOS에서는 채널 개념이 없으므로 이 함수는 Android에서만 효과가 있습니다.
 * 앱이 시작될 때 이 함수를 호출하여 채널을 생성하면, FCM에서 수신된 알림이 올바르게 표시될 수 있습니다.
 */
async function createDefaultChannel() {
  await notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
    importance: AndroidImportance.HIGH,
  });
}


function App() {
  //const isDarkMode = useColorScheme() === 'dark';

  // 앱 초기화 시 기본 알림 채널 생성
  createDefaultChannel();

  // FCM 초기화 및 리스너 등록
  useFcmHandler();

  return (
    <TextModalProvider>
      <AuthProvider>
        <SafeAreaProvider>
          {/* <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} /> */}
          <StatusBar barStyle={'dark-content'} />
          {/* useFcmHandler는 NavigationContainer 외부(App.tsx)에서 호출되므로 useNavigation()을 직접 쓸 수 없음. 외부에서도 네비게이션을 사용할 수 있는 ref 를 연결 */}
          <NavigationContainer ref={navigationRef}>
            <StackNavigator />
          </NavigationContainer>
        </SafeAreaProvider>
      </AuthProvider>
    </TextModalProvider>
  );
}

export default App;
