import axios from "axios";
import auth from '../../auth/firebaseAuth';
import { NETWORK_TIME_OUT } from "../config/networkConfig";
import { SERVER_URL } from "../../consts/url";
import { getIdToken as getAuthIdToken } from '@react-native-firebase/auth';

const privateAxios = axios.create({
  baseURL: SERVER_URL,
  timeout: NETWORK_TIME_OUT,
});

// Firebase 현재 로그인한 사용자의 ID Token 가져오기
async function getIdToken(): Promise<string | null> {
  const user = auth.currentUser;
  if (user) {
    //const idToken = await user.getIdToken();
    const idToken = await getAuthIdToken(user);
    return idToken;
  }
  return null;
}

// 요청 인터셉터: Firebase ID Token을 Bearer로 자동 첨부
privateAxios.interceptors.request.use(
  async (config) => {
    const idToken = await getIdToken();
    if (idToken) {
      config.headers = config.headers ?? {};
      config.headers.Authorization = `Bearer ${idToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 응답 인터셉터
privateAxios.interceptors.response.use(
  res => res,
    async error => {
        console.log('Axios interceptors error:', error);
        return Promise.reject(error)
    }
);

export default privateAxios;