import { createRoutesView } from '@client/shared/lib/effector-router/react';

import { HomeRoute } from './home';
import { PersonalRootRoute } from './personal/root';
import { NotFoundScreen } from './not-found';
import { PersonalEditorRoute } from './personal/editor';

export const Screens = createRoutesView({
  routes: [HomeRoute, PersonalRootRoute, PersonalEditorRoute],
  otherwise: NotFoundScreen,
});
