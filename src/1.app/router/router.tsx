import React from 'react';

import { createBrowserRouter, RouteObject } from 'react-router-dom';

import ErrorPage from '2.pages/Error';
import { Roles, ROUTES } from '6.shared/constants';

import { LAZY_PAGES } from './lazyPages';

export const ROUTES_BY_ROLE = {
  [Roles.admin]: [ROUTES.Root, ROUTES.Second],
  [Roles.user]: [ROUTES.Root],
};

const route = (routeKey: keyof typeof ROUTES): Pick<RouteObject, 'path' | 'element'> => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const Page = LAZY_PAGES[routeKey];
  return {
    path: ROUTES[routeKey],
    element: <Page />,
  };
};

export const router = createBrowserRouter([
  {
    ...route('Root'),
    errorElement: <ErrorPage />,
    children: [route('Second')],
  },
]);
