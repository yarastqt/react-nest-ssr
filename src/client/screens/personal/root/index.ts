import { routes, chainFeatures } from '@client/shared/routing';
import { MainLayout } from '@client/layouts/main-layout';
import { createLazyRoute } from '@client/shared/lib/effector-router-lazy';

export const PersonalRootRoute = createLazyRoute({
  view: () => import('./personal-root-screen'),
  route: chainFeatures({ feature: 'feature-a' })(routes.personal.root),
  layout: MainLayout,
});
