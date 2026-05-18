import { type ReactElement } from 'react';
import { Navigate } from 'react-router-dom';
import Container from '@mui/material/Container';

import { LoginForm } from '@features/auth';

import { selectIsAuthenticated, useAuthStore } from '@entities/auth';

import { ROUTES } from '@shared/constants';

import styles from './styles.module.scss';

const LoginPage = (): ReactElement => {
  const isAuthenticated = useAuthStore(selectIsAuthenticated);

  if (isAuthenticated) {
    return <Navigate to={ROUTES.Root} replace />;
  }

  return (
    <div className={styles.root}>
      <Container maxWidth="xs">
        <LoginForm />
      </Container>
    </div>
  );
};

export default LoginPage;
