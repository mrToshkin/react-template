import React, { ReactElement } from 'react';

import styles from './styles.scss';

export const ErrorPage = (): ReactElement => <div className={styles.Root}>Not Found 404</div>;

export default ErrorPage;
