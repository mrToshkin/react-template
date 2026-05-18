import { Roles } from './roles';
import { ROUTES } from './routes';

export const ROUTES_BY_ROLE: Record<Roles, (typeof ROUTES)[keyof typeof ROUTES][]> = {
  [Roles.admin]: [ROUTES.Root, ROUTES.Second],
  [Roles.user]: [ROUTES.Root],
};
