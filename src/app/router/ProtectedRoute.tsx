import { type FC, type PropsWithChildren } from 'react';
import { Navigate } from 'react-router-dom';

import { selectIsAuthenticated, useAuthStore } from '@entities/auth';

import { ROUTES } from '@shared/constants';

export const ProtectedRoute: FC<PropsWithChildren> = ({ children }) => {
  const isAuthenticated = useAuthStore(selectIsAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.Login} replace />;
  }

  return <>{children}</>;
};
