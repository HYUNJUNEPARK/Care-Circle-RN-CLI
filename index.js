import { AppRegistry } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import notifee, { AndroidImportance } from '@notifee/react-native';
import App from './App';
import { name as appName } from './app.json';
import { EventType } from '@notifee/react-native';
import { handleFcmNotificationNavigation } from './src/utils/fcmNavigation';

/**
 * 앱이 백그라운드에 있을 때 수신된 메시지를 처리하는 핸들러를 설정합니다.
 */
messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('백그라운드 메시지 수신 remoteMessage:', remoteMessage);

  const { data } = remoteMessage;

  await notifee.displayNotification({
    title: data?.title ?? '',
    body: data?.body ?? '',
    android: {
      channelId: 'default',
      importance: AndroidImportance.HIGH,
      // 앱 아이콘 (흰색 단색 아이콘 권장)
      smallIcon: 'ic_launcher',
      // 알림 클릭 시 data 전달용
      pressAction: { id: data?.action },
    },
    data: {
      screen: data?.screen ?? 'DEFAULT',
      contentId: data?.contentId ?? '',
      ...(data ?? {}),
    },
  });
});

/**
 * 백그라운드 상태에서 notifee 알림 클릭 이벤트 핸들러
 * 반드시 setBackgroundMessageHandler 외부(최상위)에서 등록해야 합니다.
 * 내부에 등록하면 메시지 수신 시마다 중복 등록되는 버그가 발생합니다.
 */
notifee.onBackgroundEvent(async ({ type, detail }) => {
  console.log('백그라운드 메시지 이벤트 Type:', type); //DISMISSED = 0, PRESS = 1, ACTION_PRESS = 2, DELIVERED = 3,

  //알림에 추가된 특정 액션 버튼(예: "확인", "답장" 등)을 클릭했을 때 발생
  if (type === EventType.ACTION_PRESS) {
    console.log('백그라운드 메시지 클릭 EventType.ACTION_PRESS', detail);
  }

  //사용자가 알림 전체(알림 본문 영역)를 클릭했을 때 발생(알림 자체를 눌렀을 때 트리거)
  if (type === EventType.PRESS) {
    const action = detail.pressAction?.id;
    const screen = detail.notification?.data?.screen;
    const contentId = detail.notification?.data?.contentId;

    console.log(`백그라운드 알림 클릭\n  action: ${action}\n  screen: ${screen}\n  contentId: ${contentId}`);

    handleFcmNotificationNavigation(action, screen?.toString(), contentId?.toString());
  }
});

AppRegistry.registerComponent(appName, () => App);
