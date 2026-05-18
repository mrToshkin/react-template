import { type Roles } from '@shared/constants';

export interface User {
  id: number;
  login: string;
  name: string;
  role: Roles;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken?: string;
}

export interface LoginCredentials {
  login: string;
  password: string;
}
