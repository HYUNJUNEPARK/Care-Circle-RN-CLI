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
          <NavigationContainer>
            <StackNavigator />
          </NavigationContainer>
        </SafeAreaProvider>
      </AuthProvider>
    </TextModalProvider>
  );
}

export default App;
