import { createRoutesView } from '../shared/lib/effector-router/react';

import { HomeRoute } from './home';
import { PersonalRootRoute } from './personal/root';

export const Screens = createRoutesView({
  routes: [HomeRoute, PersonalRootRoute],
});
