import { routes } from '@client/shared/routing';
import { MainLayout } from '@client/shared/layout/main-layout';
import { chainFeatures } from '@client/shared/features';

import { PersonalRootScreen } from './personal-root.screen';

// TODO: make async route
export const PersonalRootRoute = {
  view: PersonalRootScreen,
  route: chainFeatures(routes.personal.root, { feature: 'feature-a' }),
  layout: MainLayout,
};
