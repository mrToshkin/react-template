import React, { FC } from 'react';

import { NavLink } from 'react-router-dom';

import { ROUTES } from '6.shared/constants';

export const Nav: FC = () => (
  <nav>
    <ul>
      <li>
        <NavLink to={ROUTES.Root}>Root</NavLink>
      </li>
      <li>
        <NavLink to={ROUTES.Second}>Second</NavLink>
      </li>
    </ul>
  </nav>
);
