import axios from "axios";

const SERVER_BASE_URL = "http://magorosc.shop";
const AUTH_TOKEN = localStorage.getItem("authorization");

// const KAKAO_BASE_URL = `https://kauth.kakao.com`;

const instance = axios.create({
  baseURL: `${SERVER_BASE_URL}`,
  timeout: 3000,
});

instance.defaults.headers.common["Authorization"] = AUTH_TOKEN;
instance.defaults.headers.post["Content-Type"] = "application/json";

// TODO 인터셉터로 리프레시 토큰 처리  https://velog.io/@yiyb0603/React%EC%97%90%EC%84%9C-axios-%EC%BB%A4%EC%8A%A4%ED%85%80%ED%95%98%EA%B8%B0
// instance.interceptors.request.use(logger)

const apis = {
  sign_up: ({ email, username, password }) => {
    return instance.post(`/api/user/signup`, {
      email,
      username,
      password,
    });
  },
  sign_in: ({ email, password }) => {
    return instance.post(`/api/user/signin`, {
      email,
      password,
    });
  },
  sign_in_kakao: ({ code }) => {
    return instance.get(`/user/kakao/callback?code=${code}`);
  },
  sign_in_google: ({ code }) => {
    return instance.get(`/user/google/callback?code=${code}`);
  },
};

export default apis;
