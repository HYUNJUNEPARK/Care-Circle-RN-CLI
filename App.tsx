import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './src/navigator/StackNavigator';
import { TextModalProvider } from './src/components/modals/TextModalProvider';
import { AuthProvider } from './src/auth/AuthProvider';
import { StatusBar } from 'react-native';
import { useFcmHandler } from './src/hooks/useFcmHandler';
import { navigationRef } from './src/navigator/navigationRef';
import { processPendingNavigation } from './src/utils/fcmNavigation';

function App() {
  //const isDarkMode = useColorScheme() === 'dark';

  // FCM 초기화 및 리스너 등록
  useFcmHandler();

  return (
    <TextModalProvider>
      <AuthProvider>
        <SafeAreaProvider>
          {/* <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} /> */}
          <StatusBar barStyle={'dark-content'} />
          {/* useFcmHandler는 NavigationContainer 외부(App.tsx)에서 호출되므로 useNavigation()을 직접 쓸 수 없음. 외부에서도 네비게이션을 사용할 수 있는 ref 를 연결 */}
          <NavigationContainer ref={navigationRef} onReady={processPendingNavigation}>
            <StackNavigator />
          </NavigationContainer>
        </SafeAreaProvider>
      </AuthProvider>
    </TextModalProvider>
  );
}

export default App;
