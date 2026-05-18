import { type FC, type PropsWithChildren, useEffect } from 'react';

import { selectLogout, useAuthStore } from '@entities/auth';

import { setLogoutCallback } from '@shared/api';
import { ROUTES } from '@shared/constants';

import { router } from '../router';

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const logout = useAuthStore(selectLogout);

  useEffect(() => {
    setLogoutCallback(() => {
      logout();
      void router.navigate(ROUTES.Login, { replace: true });
    });

    return () => setLogoutCallback(null);
  }, [logout]);

  return <>{children}</>;
};
