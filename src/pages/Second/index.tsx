import { type ReactElement } from 'react';

import { IconReact, ImgReact } from '@shared/assets';

import styles from './styles.module.scss';

const SecondPage = (): ReactElement => (
  <div className={styles.root}>
    <IconReact width="100px" height="100px" />
    <img src={ImgReact} alt="img react" width="200px" height="200px" />
    Second Page
  </div>
);

export default SecondPage;
