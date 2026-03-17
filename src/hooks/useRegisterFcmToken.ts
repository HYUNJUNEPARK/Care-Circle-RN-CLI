import { Platform } from 'react-native';
import { sendTokenToServer } from '../network/apis/fcmApis';
import messaging from '@react-native-firebase/messaging';
/**
 * FCM 토큰을 발급받아 서버에 등록하는 커스텀 훅
 *
 * - 앱 최초 실행 시 또는 필요 시 호출하여 토큰을 서버에 등록
 * - 토큰이 없거나 등록 실패 시 콘솔에 에러 출력
 */
function useRegisterFcmToken() {
    const registerToken = async (userId: string | null = null) => {
        try {
            await messaging().registerDeviceForRemoteMessages();

            const fcmToken = await messaging().getToken();

            if (fcmToken) {
                await sendTokenToServer(userId, fcmToken, Platform.OS);
            } else {
                console.warn('FCM 토큰을 가져오지 못했습니다.');
            }
        } catch (error) {
            console.error('FCM 토큰 등록 실패:', error);
        }
    };

    return {
        registerToken,
    }
}

export default useRegisterFcmToken;