import {
  routes,
  chainFeatures,
  chainAuth,
  chain,
} from '@client/shared/routing';
import { MainLayout } from '@client/layouts/main-layout';
import { createLazyRoute } from '@client/shared/lib/effector-router-lazy';

export const HomeRoute = createLazyRoute({
  view: () => import('./home-screen'),
  // TODO: example with feature not available for current region.
  route: chain(
    chainAuth(),
    chainFeatures({ feature: 'feature-a' }),
  )(routes.home),
  layout: MainLayout,
});
