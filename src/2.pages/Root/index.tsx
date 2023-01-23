import React, { ReactElement } from 'react';

import { Outlet } from 'react-router-dom';

import { Nav } from '4.components/Nav';

import styles from './styles.scss';

const RootPage = (): ReactElement => (
  <div className={styles.Root}>
    <Nav />
    Root Layout
    <Outlet />
  </div>
);

export default RootPage;
