import {
  createHistoryRouter,
  createRoute,
  createRouterControls,
} from 'atomic-router';
import { sample } from 'effector';
import { createBrowserHistory } from 'history';

import { appStarted } from '@client/shared/config';

export const routes = {
  home: createRoute(),
  personal: {
    root: createRoute(),
  },
  notFound: createRoute(),
};

export const $$controls = createRouterControls();

export const $$router = createHistoryRouter({
  routes: [
    {
      path: '/',
      route: routes.home,
    },
    {
      path: '/personal',
      route: routes.personal.root,
    },
  ],
  controls: $$controls,
  notFoundRoute: routes.notFound,
});

sample({
  clock: appStarted,
  // TODO: use import.meta.env.SSR
  filter: () => typeof window !== 'undefined',
  fn: () => createBrowserHistory(),
  target: $$router.setHistory,
});
