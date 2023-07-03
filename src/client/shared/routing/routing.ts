import {
  createHistoryRouter,
  createRoute,
  createRouterControls,
} from 'atomic-router';
import { sample } from 'effector';
import { createBrowserHistory, createMemoryHistory } from 'history';

import { appStarted } from '../../shared/config';

export const routes = {
  home: createRoute(),
  personal: {
    root: createRoute(),
  },
};

export const controls = createRouterControls();

export const router = createHistoryRouter({
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
  controls,
});

sample({
  clock: appStarted,
  fn: () =>
    typeof window === 'undefined'
      ? createMemoryHistory()
      : createBrowserHistory(),
  target: router.setHistory,
});
