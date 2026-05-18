import axios from 'axios';

let _accessToken: string | null = null;
export const setApiToken = (token: string | null): void => {
  _accessToken = token;
};

type LogoutCallback = () => void;
let _logoutCallback: LogoutCallback | null = null;
export const setLogoutCallback = (fn: LogoutCallback | null): void => {
  _logoutCallback = fn;
};

export const apiInstance = axios.create({
  baseURL: '/api',
  headers: { 'Content-Type': 'application/json' },
  timeout: 15_000,
});

apiInstance.interceptors.request.use(config => {
  if (_accessToken) {
    config.headers.Authorization = `Bearer ${_accessToken}`;
  }
  return config;
});

apiInstance.interceptors.response.use(
  response => response,
  (error: unknown) => {
    if (axios.isAxiosError(error) && error.response?.status === 402) {
      setApiToken(null);
      _logoutCallback?.();
    }
    return Promise.reject(error);
  },
);
