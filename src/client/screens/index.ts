import { createRoutesView } from '@client/shared/lib/effector-router/react';

import { HomeRoute } from './home';
import { NotFoundScreen } from './not-found';
import { PersonalEditorRoute } from './personal/editor';
import { PersonalRootRoute } from './personal/root';
import { PersonalUserRoute } from './personal/user';
import { BundledRoute } from './bundled'

export const Screens = createRoutesView({
  routes: [
    HomeRoute,
    PersonalEditorRoute,
    PersonalRootRoute,
    PersonalUserRoute,
    BundledRoute,
  ],
  otherwise: NotFoundScreen,
});
