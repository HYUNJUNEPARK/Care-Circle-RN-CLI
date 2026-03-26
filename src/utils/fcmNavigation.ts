import { navigationRef } from '../navigator/navigationRef';
import { WEB_URL } from '../consts/url';
import { FcmActionType, FcmScreenType, isFcmActionType, isFcmScreenType } from '../types/local/fcmTypes';

/**
 * FCM 알림 클릭 시 화면 이동을 처리하는 공통 유틸리티 함수
 * 포그라운드, 백그라운드, 앱 종료 상태에서 모두 사용 가능
 * @returns true: 네비게이션 처리 완료, false: 처리되지 않음
 */
export function handleFcmNotificationNavigation(
  actionRaw: string | undefined,
  screenRaw: string | undefined,
  contentId: string | undefined,
): boolean {
  const action: FcmActionType | undefined = isFcmActionType(actionRaw) ? actionRaw : undefined;
  const screen: FcmScreenType | undefined = isFcmScreenType(screenRaw) ? screenRaw : undefined;

  if (action === 'OPEN_WEBVIEW' && screen && contentId) {
    let url = '';
    switch (screen) {
      case 'ANNOUNCEMENT':
        url = `${WEB_URL}/announcements/${contentId}`;
        break;
      case 'COLUMN':
        url = `${WEB_URL}/columns/${contentId}`;
        break;
      default:
        break;
    }
    if (url && navigationRef.isReady()) {
      navigationRef.navigate('WebviewViewer', { uri: url });
      return true;
    }
  }
  return false;
}
