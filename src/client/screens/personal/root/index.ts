import { routes } from '@client/shared/routing';
import { MainLayout } from '@client/shared/layout/main-layout';
import { chainFeatures } from '@client/shared/features';

import { PersonalRootScreen } from './personal-root.screen';

// TODO: make async route (loadable/component)
// https://github.com/sanyuan0704/vite-plugin-chunk-split
export const PersonalRootRoute = {
  view: PersonalRootScreen,
  // view: import('./personal-root.screen').then((m) => m.PersonalRootScreen),
  // view: lazy(() =>
  //   import('./personal-root.screen').then((m) => ({
  //     default: m.PersonalRootScreen,
  //   })),
  // ),
  route: chainFeatures(routes.personal.root, { feature: 'feature-a' }),
  layout: MainLayout,
};
