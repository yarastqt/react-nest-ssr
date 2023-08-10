import { routes, chainFeatures } from '@client/shared/routing';
import { MainLayout } from '@client/shared/layout/main-layout';

import { PersonalRootScreen } from './personal-root-screen';

// TODO: make async route (loadable/component)
// https://github.com/sanyuan0704/vite-plugin-chunk-split
export const PersonalRootRoute = {
  view: PersonalRootScreen,
  route: chainFeatures({ feature: 'feature-a' })(routes.personal.root),
  layout: MainLayout,
};
