import React, { FC } from 'react';

import { RouterProvider } from 'react-router-dom';

import { router } from './router';
import styles from './styles.scss';

export const App: FC = () => (
  <div className={styles.Root}>
    <RouterProvider router={router} fallbackElement="loading..." />
  </div>
);
