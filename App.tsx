/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { StatusBar, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './src/navigator/StackNavigator';
import { TextModalProvider } from './src/components/modals/TextModalProvider';
import { AuthProvider } from './src/auth/AuthProvider';

function App() {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <TextModalProvider>
      <AuthProvider>
        <SafeAreaProvider>
          <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
          <NavigationContainer>
            <StackNavigator />
          </NavigationContainer>
        </SafeAreaProvider>
      </AuthProvider>
    </TextModalProvider>
  );
}

export default App;
