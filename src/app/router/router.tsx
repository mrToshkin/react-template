import { type RouteObject } from 'react-router-dom';
import { createBrowserRouter } from 'react-router-dom';

import ErrorPage from '@pages/Error';

import { ROUTES } from '@shared/constants';

import { LAZY_PAGES } from './lazyPages';
import { ProtectedRoute } from './ProtectedRoute';

const route = (routeKey: keyof typeof ROUTES): Pick<RouteObject, 'path' | 'element'> => {
  const Page = LAZY_PAGES[routeKey];
  return {
    path: ROUTES[routeKey],
    element: <Page />,
  };
};

const protectedRoute = (
  routeKey: keyof typeof ROUTES,
): Pick<RouteObject, 'path' | 'element'> => {
  const Page = LAZY_PAGES[routeKey];
  return {
    path: ROUTES[routeKey],
    element: (
      <ProtectedRoute>
        <Page />
      </ProtectedRoute>
    ),
  };
};

export const router = createBrowserRouter([
  route('Login'),
  {
    ...protectedRoute('Root'),
    errorElement: <ErrorPage />,
    children: [route('Second')],
  },
]);
