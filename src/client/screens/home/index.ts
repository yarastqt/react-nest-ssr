import { routes, chainFeatures, chainAuth } from '@client/shared/routing';
import { MainLayout } from '@client/shared/layout/main-layout';

import { HomeScreen } from './home.screen';

export const HomeRoute = {
  view: HomeScreen,
  // TODO: example with feature not available for current region.
  route: chainAuth(chainFeatures(routes.home, { feature: 'feature-a' })),
  layout: MainLayout,
};
