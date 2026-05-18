import { type FC } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { RouterProvider } from 'react-router-dom';

import { ErrorFallback } from '@shared/ui';

import { AppThemeProvider, AuthProvider, QueryProvider } from './providers';
import { router } from './router';

import styles from './styles.module.scss';

export const App: FC = () => (
  <div className={styles.root}>
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <QueryProvider>
        <AppThemeProvider>
          <AuthProvider>
            <RouterProvider router={router} />
          </AuthProvider>
        </AppThemeProvider>
      </QueryProvider>
    </ErrorBoundary>
  </div>
);
