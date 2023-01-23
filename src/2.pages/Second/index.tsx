import React, { ReactElement } from 'react';

import { IconReact, ImgReact } from '6.shared/uikit';

import styles from './styles.scss';

const SecondPage = (): ReactElement => (
  <div className={styles.Root}>
    <IconReact width="100px" height="100px" />
    <img src={ImgReact} alt="img react" width="200px" height="200px" />
    Second Page
  </div>
);

export default SecondPage;
