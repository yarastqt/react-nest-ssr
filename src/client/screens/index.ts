import { createRoutesView } from '@client/shared/lib/effector-router/react';

import { HomeRoute } from './home';
import { PersonalRootRoute } from './personal/root';
import { NotFoundScreen } from './not-found';

export const Screens = createRoutesView({
  routes: [HomeRoute, PersonalRootRoute],
  otherwise: NotFoundScreen,
});
