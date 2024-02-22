import { ComponentType } from 'react';
import { RouteParams } from 'atomic-router';

import { loadable } from '@client/shared/lib/react-loadable';
import { isClient } from '@shared/lib/environment';
import { getScope } from '@client/shared/config';
import { scopeBind } from 'effector';
import { RouteRecord } from 'atomic-router-react'

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
    view: loadable<Props, Component>(async () => {
      const view = await config.view();

      if (isClient) {
        if (Array.isArray(config.route)) {
          throw new Error('...');
        }

        const scope = getScope();
        const params = scope.getState(config.route.$params);
        const query = scope.getState(config.route.$query);

        scopeBind(config.route.opened, { scope })({ params, query });
      }

      return view;
    }),
  };
}
