import { createRouteView } from '@client/shared/lib/effector-router/react';
import { routes } from '@client/shared/routing';
import { MainLayout } from '@client/shared/layout/main-layout';

import { HomeScreen } from './home.screen';

export const HomeRoute = {
  view: createRouteView({
    route: routes.home,
    view: HomeScreen,
  }),
  route: routes.home,
  layout: MainLayout,
};
