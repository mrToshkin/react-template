import { apiInstance } from '@shared/api';

import { type AuthTokens, type LoginCredentials, type User } from '../model/types';

export interface LoginResponse {
  user: User;
  tokens: AuthTokens;
}

export const authApi = {
  login: (credentials: LoginCredentials) =>
    apiInstance.post<LoginResponse>('/auth/login', credentials).then(r => r.data),

  logout: () => apiInstance.post('/auth/logout').then(r => r.data),

  getMe: () => apiInstance.get<User>('/auth/me').then(r => r.data),
};
