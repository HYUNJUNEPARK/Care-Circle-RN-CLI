import messaging from '@react-native-firebase/messaging';

/**
 * FCM Token 발급
 *
 * - device를 Firebase Cloud Messaging에 등록
 * - token 생성
 */
export async function getFcmToken(): Promise<string | null> {
  try {
    await messaging().registerDeviceForRemoteMessages();

    const token = await messaging().getToken();

    console.log('FCM Token:', token);

    return token;
  } catch (error) {
    console.error('FCM token error:', error);
    return null;
  }
}