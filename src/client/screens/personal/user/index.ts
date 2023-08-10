import { scopeBind } from 'effector';

import { routes } from '@client/shared/routing';
import { MainLayout } from '@client/layouts/main-layout';
import { loadable } from '@client/shared/lib/react-loadable';
import { getScope } from '@client/shared/config';
import { isClient } from '@shared/lib/environment';

export const PersonalUserRoute = {
  view: loadable(async () => {
    const screen = await import('./personal-user-screen');

    // TODO: Надо придумать фабрику
    if (isClient) {
      const scope = getScope();
      const params = scope.getState(routes.personal.user.$params);
      const query = scope.getState(routes.personal.user.$query);

      scopeBind(routes.personal.user.opened, { scope })({ params, query });
    }

    return screen;
  }),
  route: routes.personal.user,
  layout: MainLayout,
};
