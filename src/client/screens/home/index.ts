import { routes } from '@client/shared/routing';
import { MainLayout } from '@client/shared/layout/main-layout';
import { chainFeatures } from '@client/shared/features';

import { HomeScreen } from './home.screen';

export const HomeRoute = {
  view: HomeScreen,
  // TODO: chainAuth
  route: chainFeatures(routes.home, { feature: 'feature-a' }),
  layout: MainLayout,
};
