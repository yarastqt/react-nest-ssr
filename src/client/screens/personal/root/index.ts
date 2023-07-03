import { createRouteView } from '@client/shared/lib/effector-router/react';
import { routes } from '@client/shared/routing';
import { MainLayout } from '@client/shared/layout/main-layout';

import { PersonalRootScreen } from './personal-root.screen';

export const PersonalRootRoute = {
  view: createRouteView({
    route: routes.personal.root,
    view: PersonalRootScreen,
  }),
  route: routes.personal.root,
  layout: MainLayout,
};
