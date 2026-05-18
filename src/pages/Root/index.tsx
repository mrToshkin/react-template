import { type ReactElement } from 'react';
import { Outlet } from 'react-router-dom';

import { Nav } from '@widgets/Nav';

import styles from './styles.module.scss';

const RootPage = (): ReactElement => (
  <div className={styles.root}>
    <Nav />
    Root Layout
    <Outlet />
  </div>
);

export default RootPage;
