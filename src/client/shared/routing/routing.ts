import { createHistoryRouter, createRoute } from 'atomic-router';

export const routes = {
  home: createRoute(),
  personal: {
    root: createRoute(),
    editor: createRoute(),
    user: createRoute<{ userId: string }>(),
  },
  notFound: createRoute(),
};

export const $$router = createHistoryRouter({
  routes: [
    {
      path: '/',
      route: routes.home,
    },
    {
      path: '/personal/user/:userId',
      route: routes.personal.user,
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

export const routerPaths = $$router.routes.map((route) => route.path);
