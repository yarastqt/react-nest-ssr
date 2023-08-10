import { routes } from '@client/shared/routing';
import { MainLayout } from '@client/shared/layout/main-layout';

import { PersonalUserScreen } from './personal-user-screen';

export const PersonalUserRoute = {
  view: PersonalUserScreen,
  route: routes.personal.user,
  layout: MainLayout,
};
