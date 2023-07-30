import { createHistoryRouter, createRoute } from 'atomic-router';

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
    // {
    //   path: '/user/:userId',
    //   route: routes.personal.root,
    // },
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
