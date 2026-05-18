import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { setApiToken } from '@shared/api';

import { type AuthTokens, type User } from './types';

export interface AuthState {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  login: (user: User, tokens: AuthTokens) => void;
  logout: () => void;
  setToken: (token: string) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    set => ({
      user: null,
      accessToken: null,
      isAuthenticated: false,
      login: (user, tokens) => {
        setApiToken(tokens.accessToken);
        set({ user, accessToken: tokens.accessToken, isAuthenticated: true });
      },
      logout: () => {
        setApiToken(null);
        set({ user: null, accessToken: null, isAuthenticated: false });
      },
      setToken: token => {
        setApiToken(token);
        set({ accessToken: token });
      },
    }),
    {
      name: 'auth-storage',
      onRehydrateStorage: () => state => {
        if (state?.accessToken) {
          setApiToken(state.accessToken);
        }
      },
    },
  ),
);

export const selectIsAuthenticated = (s: AuthState) => s.isAuthenticated;
export const selectUser = (s: AuthState) => s.user;
export const selectUserRole = (s: AuthState) => s.user?.role ?? null;
export const selectLogin = (s: AuthState) => s.login;
export const selectLogout = (s: AuthState) => s.logout;
