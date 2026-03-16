import publicAxios from "../axios/publicAxios";
import { FcmTokenResponse } from "../../types/remote/Fcm";

const fcmApiUrl = `/api/fcm`;

/**
 * 발급된 FCM Token을 Node 서버로 전송
 *
 * 서버는 이 token을 저장해두고
 * 특정 사용자에게 push 알림을 보낼 때 사용
 */
export async function sendTokenToServer(fcmToken: string, platform: string): Promise<void> {
  try {
    const res = await publicAxios.post<FcmTokenResponse>(
        `${fcmApiUrl}/register`,
        {
            fcmToken: fcmToken,
            platform: platform,

        },
        {}
    );
  } catch (error) {
    console.error('sendTokenToServer:', error);
  }
}
