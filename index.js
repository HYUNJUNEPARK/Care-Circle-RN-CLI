/**
 * @format
 */

import { AppRegistry } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import notifee, { AndroidImportance } from '@notifee/react-native';
import App from './App';
import { name as appName } from './app.json';
import { EventType } from '@notifee/react-native';

/**
 * 앱이 백그라운드에 있을 때 수신된 메시지를 처리하는 핸들러를 설정합니다.
 */
messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('백그라운드 메시지 수신:', remoteMessage);

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
    data: data ?? {},
  });

  notifee.onBackgroundEvent(async ({ type, detail }) => {
    console.log('백그라운드 메시지 이벤트 Type:', type); //DISMISSED = 0, PRESS = 1, ACTION_PRESS = 2, DELIVERED = 3,
    //알림에 추가된 특정 액션 버튼(예: "확인", "답장" 등)을 클릭했을 때 발생
    if (type === EventType.ACTION_PRESS) {
      console.log('백그라운드 메시지 클릭', detail);
    }

    //사용자가 알림 전체(알림 본문 영역)를 클릭했을 때 발생(알림 자체를 눌렀을 때 트리거)
    if (type === EventType.PRESS) {
      console.log('백그라운드 메시지 클릭 PressAction', detail.pressAction?.id);
    }
  });
});

AppRegistry.registerComponent(appName, () => App);
