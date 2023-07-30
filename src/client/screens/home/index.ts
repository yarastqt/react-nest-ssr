import {
  routes,
  chainFeatures,
  chainAuth,
  chain,
} from '@client/shared/routing';
import { MainLayout } from '@client/shared/layout/main-layout';

import { HomeScreen } from './home.screen';

export const HomeRoute = {
  view: HomeScreen,
  // TODO: example with feature not available for current region.
  route: chain(
    chainAuth(),
    chainFeatures({ feature: 'feature-a' }),
  )(routes.home),
  layout: MainLayout,
};
