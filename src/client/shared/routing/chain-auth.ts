import {
  RouteInstance,
  RouteParams,
  RouteParamsAndQuery,
  chainRoute,
} from 'atomic-router';
import { createEvent, sample } from 'effector';

import { $user } from '@client/shared/user';

import { externalRedirect } from './external-redirect';

export function chainAuth<Params extends RouteParams>() {
  return (route: RouteInstance<Params>) => {
    const sessionCheckStarted = createEvent<RouteParamsAndQuery<Params>>();

    const isAuthenticated = sample({
      clock: sessionCheckStarted,
      source: $user,
      filter: Boolean,
    });

    sample({
      clock: sessionCheckStarted,
      source: $user,
      filter: (user) => user === null,
      fn: () => 'https://passport.yandex.ru/auth',
      target: externalRedirect,
    });

    return chainRoute({
      route,
      beforeOpen: sessionCheckStarted,
      openOn: isAuthenticated,
    });
  };
}
