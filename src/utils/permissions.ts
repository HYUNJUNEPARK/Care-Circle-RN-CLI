import { PermissionsAndroid, Platform } from 'react-native';

/**
 * Android 13(API 33)+ 알림 권한 요청
 *
 * Android 13부터는 POST_NOTIFICATIONS 권한을 런타임에 요청해야 알림이 표시됨
 */
export async function requestNotificationPermission(): Promise<boolean> {
  if (Platform.OS !== 'android') return true;

  // Android 13 미만은 권한 필요 없음
  if (Platform.Version < 33) return true;

  const result = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
  );

  return result === PermissionsAndroid.RESULTS.GRANTED;
}