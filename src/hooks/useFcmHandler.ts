import { useEffect } from 'react';
import { FirebaseMessagingTypes } from '@react-native-firebase/messaging';
import messaging from '@react-native-firebase/messaging';
import notifee, { AndroidImportance } from '@notifee/react-native';
import { EventType } from '@notifee/react-native';

/**
 * FCM 초기화 및 Foreground 메시지 리스너 등록 커스텀 훅
 */
export function useFcmHandler() {
  useEffect(() => {
    //const messagingInstance = getMessaging();

    const initFcmHandler = async () => {
      try {
        // const permissionGranted = await requestNotificationPermission();
        // if (!permissionGranted) {
        //   Alert.alert('알림 권한이 거부되었습니다.');
        //   return;
        // }

        // FCM 토큰 발급
        // const fcmToken = await getFcmToken();
        // if (fcmToken) {
        //   console.log('FCM token:', fcmToken);
        //   await sendTokenToServer(fcmToken, Platform.OS);
        // }

        // Foreground 메시지 수신
        // const unsubscribeOnMessage = onMessage(
        //   messagingInstance,
        //   async (remoteMessage) => {
        //     console.log('포그라운드 상태에서 메시지 수신:', remoteMessage);
        //     Alert.alert(
        //       remoteMessage?.notification?.title ?? '알림',
        //       remoteMessage?.notification?.body ?? '메시지가 도착했습니다.',
        //     );
        //   }
        // );
        const unsubscribeOnMessage = messaging().onMessage(async remoteMessage => {
          console.log('포그라운드 상태에서 메시지 수신:', remoteMessage);

          const { data } = remoteMessage;
          const title = (data?.title as string) ?? remoteMessage.notification?.title ?? '알림';
          const body = (data?.body as string) ?? remoteMessage.notification?.body ?? '메시지가 도착했습니다.';

          // 채널 생성 (Android 필수)
          const channelId = await notifee.createChannel({
            id: 'default',
            name: '기본 알림',
            importance: AndroidImportance.HIGH,
          });

          // 로컬 알림 표시
          await notifee.displayNotification({
            title: title,
            body: body,
            data: { //커스텀 데이터 전달
              screen: data?.screen ?? 'NONE', // 알림 클릭 시 이동할 화면 정보
            },
            android: {
              channelId: channelId,
              smallIcon: 'ic_launcher', // android/app/src/main/res/drawable에 아이콘 추가 필요
              pressAction: { // 알림 클릭 시 전달할 데이터
                id: data?.action.toString() ?? 'NONE',
                // launchActivity: 'default',              // 실행할 Activity (기본값: 앱 메인 Activity)
                // launchActivityFlags: [                  // Activity 실행 플래그

                // ],
                // mainComponent: 'MyHeadlessComponent',  // Headless JS 컴포넌트 이름
              },
            },
          });
        });

        // 포그라운드 알림 클릭 이벤트
        const unsubscribeNotifee = notifee.onForegroundEvent(({ type, detail }) => {
          console.log('포그라운드 알림 Type:', type); //DISMISSED = 0, PRESS = 1, ACTION_PRESS = 2, DELIVERED = 3,
          if (type === EventType.PRESS) {
            console.log(`포그라운드 알림 클릭 EventType.PRESS: ${detail.pressAction?.id} screen: ${detail.notification?.data?.screen}`);
            // 원하는 화면으로 네비게이션 처리
          }
        });

        // 백그라운드에서 알림 클릭 시
        const unsubscribeOpened = messaging().onNotificationOpenedApp((remoteMessage: FirebaseMessagingTypes.RemoteMessage) => {
          console.log('백그라운드 상태에서 알림 클릭 시 remoteMessage:', remoteMessage);
        },
        );

        // 앱 종료 상태에서 알림 클릭 시
        const initialMessage = await messaging().getInitialNotification();
        if (initialMessage) {
          console.log('앱 종료 상태에서 알림 클릭 시 initialMessage:', initialMessage);
        }

        /*
         * FCM 토큰 갱신 이벤트
         * FCM 토큰은 앱 설치 시 발급되지만, 다음과 같은 상황에서 변경될 수 있음
         * - 앱 재설치
         * - 데이터 삭제
         * - 보안 정책 변경
         * 등으로 토큰이 변경될 수 있음 
         */
        const unsubscribeTokenRefresh = messaging().onTokenRefresh(
          async (newToken: string) => {
            console.log('FCM 토큰 갱신:', newToken);
            // await sendTokenToServer(newToken, Platform.OS);
          },
        );

        // 언마운트 시 리스너 해제
        return () => {
          unsubscribeNotifee();
          unsubscribeOnMessage();
          unsubscribeOpened();
          unsubscribeTokenRefresh();
        };
      } catch (error) {
        console.error('FCM init error:', error);
      }
    };

    initFcmHandler();
  }, []);
}
