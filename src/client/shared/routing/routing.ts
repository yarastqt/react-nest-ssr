import { createHistoryRouter, createRoute } from 'atomic-router';
import { sample } from 'effector';
import { createBrowserHistory } from 'history';

import { appStarted } from '@client/shared/config';

export const routes = {
  home: createRoute(),
  personal: {
    root: createRoute(),
    editor: createRoute(),
  },
  notFound: createRoute(),
};

// TODO: сделать пример с роутером и параметрами
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
    {
      path: '/personal/editor',
      route: routes.personal.editor,
    },
  ],
  notFoundRoute: routes.notFound,
  // TODO: гидрация должна работать если запускать appStarted от скоупа.
  // hydrate: true,
});

sample({
  clock: appStarted,
  // TODO: use import.meta.env.SSR
  filter: () => typeof window !== 'undefined',
  fn: () => createBrowserHistory(),
  target: $$router.setHistory,
});
