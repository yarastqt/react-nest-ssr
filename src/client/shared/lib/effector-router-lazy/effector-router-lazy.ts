import { ComponentType } from 'react';
import { RouteParams, RouteParamsAndQuery } from 'atomic-router';

import { loadable } from '@client/shared/lib/react-loadable';
import { isClient } from '@shared/lib/environment';
import { EventCallable, scopeBind } from 'effector';
import { RouteRecord } from 'atomic-router-react';

interface LazyRouteConfig<
  Props,
  Params extends RouteParams,
  Component extends ComponentType,
> extends Omit<RouteRecord<Props, Params>, 'view'> {
  view: () => Promise<{ default: Component }>;
}

export function createLazyRoute<
  Props,
  Params extends RouteParams,
  Component extends ComponentType,
>(
  config: LazyRouteConfig<Props, Params, Component>,
): RouteRecord<Props, Params> {
  return {
    ...config,
    view: loadable<Props, Component>(async (scope) => {
      const view = await config.view();

      if (!scope) {
        throw new Error('Empty scope is not supported.');
      }

      if (isClient) {
        if (Array.isArray(config.route)) {
          throw new Error('Multiply routes are not supported.');
        }

        const params = scope.getState(config.route.$params);
        const query = scope.getState(config.route.$query);
        const opened = config.route.opened as EventCallable<
          RouteParamsAndQuery<Params>
        >;

        scopeBind(opened, { scope })({ params, query });
      }

      return view;
    }),
  };
}
