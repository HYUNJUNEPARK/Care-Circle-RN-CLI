import publicAxios from '../axios/publicAxios';
import { CustomTokenResponse, CustomToken } from '../../types/remote/Token';

const tokenApiUrl = `/api/token`;

/**
 * 커스텀 토큰 발급 요청
 */
export async function getCustomToken(idToken: string): Promise<string> {
    const res = await publicAxios.post<CustomTokenResponse>(
        `${tokenApiUrl}/custom-token`,
        {},
        {
            headers: {
                'Authorization': `Bearer ${idToken}`
            }   
        }
    );

    const resData = res.data;
    if(!resData.success) {
        throw new Error(`Custom token request failed`);
    }

    const customTokenData: CustomToken = resData.data;
    const customToken = customTokenData.customToken;
    return customToken;
}