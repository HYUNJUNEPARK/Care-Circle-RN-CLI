/**
 * https://github.com/facebook/react-native
 */
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './src/navigator/StackNavigator';
import { TextModalProvider } from './src/components/modals/TextModalProvider';
import { AuthProvider } from './src/auth/AuthProvider';
import { Alert, StatusBar, Platform } from 'react-native';
import messaging, { FirebaseMessagingTypes } from '@react-native-firebase/messaging';
import { useEffect } from 'react';
import { requestNotificationPermission } from './src/utils/permissions';
import { sendTokenToServer } from './src/network/apis/fcmApis';
import { getFcmToken } from './src/utils/fcm';

function App() {
  //const isDarkMode = useColorScheme() === 'dark';

  useEffect(() => {
    /**
     * FCM 초기화
     *
     * - 권한 요청
     * - 토큰 발급
     * - 서버 전달
     * - 메시지 리스너 등록
     */
    const initFCM = async () => {
      try {
        const permissionGranted = await requestNotificationPermission();
        if (!permissionGranted) {
          Alert.alert('알림 권한이 거부되었습니다.');
          return;
        }

        /**
         * FCM 토큰 발급
         */
        const token = await getFcmToken();
        if (token) {
          console.log('FCM token:', token);
          await sendTokenToServer(token, Platform.OS);
        }

        /**
         * 앱이 foreground 상태일 때 메시지 수신
         */
        const unsubscribeOnMessage = messaging().onMessage(
          async (remoteMessage: FirebaseMessagingTypes.RemoteMessage) => {
            console.log('Foreground message:', remoteMessage);

            Alert.alert(
              remoteMessage?.notification?.title ?? '알림',
              remoteMessage?.notification?.body ?? '메시지가 도착했습니다.',
            );
          },
        );

        /**
         * 백그라운드 상태에서 알림을 눌러 앱이 열린 경우
         */
        const unsubscribeOpened = messaging().onNotificationOpenedApp(
          (remoteMessage: FirebaseMessagingTypes.RemoteMessage) => {
            console.log(
              'Notification caused app to open from background:',
              remoteMessage,
            );
          },
        );

        /**
         * 앱이 완전히 종료된 상태에서
         * 알림을 눌러 앱이 실행된 경우
         */
        const initialMessage = await messaging().getInitialNotification();
        if (initialMessage) {
          console.log('Notification caused app to open from quit state:', initialMessage);
        }

        /**
         * FCM 토큰 갱신 이벤트
         *
         * - 앱 재설치
         * - 데이터 삭제
         * - 보안 정책 변경
         * 등으로 토큰이 변경될 수 있음
         */
        const unsubscribeTokenRefresh = messaging().onTokenRefresh(
          async (newToken: string) => {
            console.log('New FCM token:', newToken);

            // 서버에 새로운 토큰 전송
            await sendTokenToServer(newToken, Platform.OS);
          },
        );

        /**
         * 컴포넌트 unmount 시 리스너 제거
         */
        return () => {
          unsubscribeOnMessage();
          unsubscribeOpened();
          unsubscribeTokenRefresh();
        };
      } catch (error) {
        console.error('FCM init error:', error);
      }
    };

    initFCM();
  }, []);

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
