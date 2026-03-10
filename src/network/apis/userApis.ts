import privateAxios from '../axios/privateAxios';
import publicAxios from '../axios/publicAxios';
import type { UserInfo } from '../../types/local/UserInfo';
import type { RemoteUserInfo } from '../../types/remote/RemoteUserInfo';
import type { SignOutResponse } from '../../types/remote/SignOut';
import { converToUser } from '../../utils/formatter';

const userApiUrl = `/api/users`

/**
 * 서버와 사용자 동기화
 * firebase auth 인증 토큰을 이용하여 서버와 동기화 처리
 * 
 * @returns true 동기화 성공, false 동기화 실패
 */
// export async function syncMeToServer(): Promise<boolean> {
//     const res = await privateAxios.post(
//         `${userApiUrl}/sync`,
//         {},
//         {},
//     );
//     return Boolean(res.data.success);
// }

/**
 * 로그아웃
 */
export async function signOut(): Promise<SignOutResponse> {
    const res = await privateAxios.post(
        `${userApiUrl}/sign-out`
    );
    const data = (res.data) as SignOutResponse;
    return data;
}

/**
 * 이메일 유효성 체크
 */
export async function checkValidEmail(email: string) {
    return publicAxios.get(`${userApiUrl}/exists?email=${email}`);
}

/**
 * 로그인 사용자 정보 가져오기
 * //TODO syncMeToServer() 백단에서 기능 합쳐도 될듯 !
 */
export async function getLoginUserInfo(): Promise<UserInfo> {
    const res = await privateAxios.get(
        `${userApiUrl}/sign-in`,
    );
    const rUser = (res.data.data) as RemoteUserInfo
    const user = converToUser(rUser)
    return user;
}
/**
 * 닉네임 변경
 * @param nickname 새로운 닉네임
 * @returns 서버 응답 데이터
 */
export async function updateNickname(nickname: string): Promise<boolean> {
    const res = await privateAxios.patch(
        `${userApiUrl}/nickname`,
        { nickname }
    );

    return res.data.success;
}
