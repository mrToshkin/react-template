import { type FC } from 'react';
import { NavLink } from 'react-router-dom';

import { LogoutButton } from '@features/auth';

import { selectUserRole, useAuthStore } from '@entities/auth';

import { Roles, ROUTES, ROUTES_BY_ROLE } from '@shared/constants';

const ROUTE_LABELS: Record<string, string> = {
  [ROUTES.Root]: 'Root',
  [ROUTES.Second]: 'Second',
};

export const Nav: FC = () => {
  const role = useAuthStore(selectUserRole);
  const allowedRoutes = ROUTES_BY_ROLE[role ?? Roles.user];

  return (
    <nav>
      <ul>
        {allowedRoutes.map(path => (
          <li key={path}>
            <NavLink to={path}>{ROUTE_LABELS[path] ?? path}</NavLink>
          </li>
        ))}
      </ul>
      <LogoutButton />
    </nav>
  );
};
