import { createNavigationContainerRef } from '@react-navigation/native';
/**
 * NavigationContainer 외부에서도 네비게이션을 사용할 수 있는 ref 생성
 */
export const navigationRef = createNavigationContainerRef<any>();
