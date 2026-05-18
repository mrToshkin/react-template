import { type FC } from 'react';
import { type FallbackProps } from 'react-error-boundary';

import styles from './styles.module.scss';

export const ErrorFallback: FC<FallbackProps> = ({ error, resetErrorBoundary }) => (
  <div className={styles.root} role="alert">
    <h2>Something went wrong</h2>
    <p>{error instanceof Error ? error.message : 'Unknown error'}</p>
    <button onClick={resetErrorBoundary}>Try again</button>
  </div>
);
