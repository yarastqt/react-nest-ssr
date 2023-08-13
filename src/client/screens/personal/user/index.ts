import { routes } from '@client/shared/routing';
import { MainLayout } from '@client/layouts/main-layout';
import { createLazyRoute } from '@client/shared/lib/effector-router-lazy';

export const PersonalUserRoute = createLazyRoute({
  view: () => import('./personal-user-screen'),
  route: routes.personal.user,
  layout: MainLayout,
});
