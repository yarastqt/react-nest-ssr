import { HomeRoute } from './home';
import { NotFoundScreen } from './not-found';
import { PersonalEditorRoute } from './personal/editor';
import { PersonalRootRoute } from './personal/root';
import { PersonalUserRoute } from './personal/user';
import { createRoutesView } from 'atomic-router-react';

export const Screens = createRoutesView({
  routes: [
    HomeRoute,
    PersonalEditorRoute,
    PersonalRootRoute,
    PersonalUserRoute,
  ],
  otherwise: NotFoundScreen,
});
