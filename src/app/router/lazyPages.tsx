import { type LazyExoticComponent, type ReactElement } from 'react';
import { lazy, Suspense } from 'react';
import { type ROUTES } from '@shared/constants';
import { getEntries } from '@shared/lib';

type LazyComp = LazyExoticComponent<() => ReactElement>;
type LazyPages = Record<keyof typeof ROUTES, () => ReactElement>;

const PAGES_COMPS: Record<keyof typeof ROUTES, LazyComp> = {
  Root: lazy(() => import('@pages/Root')),
  Second: lazy(() => import('@pages/Second')),
};

export const LAZY_PAGES = (() =>
  getEntries(PAGES_COMPS).reduce((acc, [page, Comp]) => {
    acc[page] = () => (
      <Suspense fallback="Loading">
        <Comp />
      </Suspense>
    );
    return acc;
  }, {} as LazyPages))();
