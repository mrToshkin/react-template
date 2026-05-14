import { type FC } from 'react';
import { RouterProvider } from 'react-router-dom';

import { router } from './router';

import styles from './styles.module.scss';

export const App: FC = () => (
  <div className={styles.root}>
    <RouterProvider router={router} />
  </div>
);
