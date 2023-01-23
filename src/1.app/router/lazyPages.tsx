import React, { lazy, LazyExoticComponent, ReactElement, Suspense } from 'react';

import { ROUTES } from '6.shared/constants';

type LazyComp = LazyExoticComponent<() => ReactElement>;
type LazyPages = Record<keyof typeof ROUTES, () => ReactElement>;

const PAGES_COMPS: Record<keyof typeof ROUTES, LazyComp> = {
  Root: lazy(() => import('2.pages/Root')),
  Second: lazy(() => import('2.pages/Second')),
};

export const LAZY_PAGES = (() =>
  (Object.entries(PAGES_COMPS) as [keyof typeof ROUTES, LazyComp][]).reduce((acc, [page, Comp]) => {
    acc[page] = () => (
      <Suspense fallback="Loading">
        <Comp />
      </Suspense>
    );
    return acc;
  }, {} as LazyPages))();
