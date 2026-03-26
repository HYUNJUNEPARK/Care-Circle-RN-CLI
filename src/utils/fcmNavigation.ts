import { navigationRef } from '../navigator/navigationRef';
import { WEB_URL } from '../consts/url';
import { FcmActionType, FcmScreenType, isFcmActionType, isFcmScreenType } from '../types/local/fcmTypes';

/**
 * 앱 종료 상태에서 알림 클릭으로 앱이 실행될 때,
 * NavigationContainer가 아직 마운트되지 않아 navigationRef가 준비되지 않은 경우
 * 보류된 네비게이션 정보를 저장해두었다가, 나중에 처리할 수 있도록 합니다.
 */
let pendingNavigation: { uri: string } | null = null;

/**
 * 보류 중인 네비게이션이 있으면 실행하고 초기화합니다.
 * NavigationContainer의 onReady 콜백에서 호출해야 합니다.
 */
export function processPendingNavigation(): void {
  if (pendingNavigation && navigationRef.isReady()) {
    navigationRef.navigate('WebviewViewer', pendingNavigation);
    pendingNavigation = null;
  }
}

/**
 * FCM 알림 클릭 시 화면 이동을 처리하는 공통 유틸리티 함수
 * - navigationRef가 준비된 경우: 즉시 네비게이션
 * - navigationRef가 준비되지 않은 경우 (앱 종료 상태): 보류 후 나중에 처리
 * @returns true: 네비게이션 처리(또는 보류) 완료, false: 처리되지 않음
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
    if (url) {
      if (navigationRef.isReady()) {
        navigationRef.navigate('WebviewViewer', { uri: url });
      } else {
        // 앱 종료 상태에서 실행된 경우 — NavigationContainer가 준비되면 처리
        pendingNavigation = { uri: url };
      }
      return true;
    }
  }
  return false;
}
