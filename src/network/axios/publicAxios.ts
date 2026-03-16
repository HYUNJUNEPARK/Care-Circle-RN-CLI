import axios from 'axios';
import { NETWORK_TIME_OUT } from "../config/networkConfig";
import { SERVER_URL } from "../../consts/url";

const publicAxios = axios.create({
  baseURL: SERVER_URL,
  timeout: NETWORK_TIME_OUT,
});

publicAxios.interceptors.request.use(
  async (config) => {
    console.log('Public API 요청:', config.method, config.baseURL, config.url);
    return config;
  },
  (error) => Promise.reject(error)
);

publicAxios.interceptors.response.use(
  res => {
    console.log('Public API 응답:', res.config.method, res.config.url, res.status, res.data);
    return res;
  },
    async error => {
        console.log('Public API interceptors error:', error);
        return Promise.reject(error)
    }
);

export default publicAxios;