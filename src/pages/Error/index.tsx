import { type ReactElement } from 'react';

import styles from './styles.module.scss';

export const ErrorPage = (): ReactElement => (
  <div className={styles.root}>Not Found 404</div>
);

export default ErrorPage;
