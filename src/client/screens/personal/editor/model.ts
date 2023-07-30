import { $$router, routes, externalRedirect } from '@client/shared/routing';
import { $user } from '@client/shared/user';
import { sample } from 'effector';

sample({
  clock: routes.personal.editor.opened,
  source: { query: $$router.$query, user: $user },
  filter: ({ query, user }) => query.login !== user?.login,
  fn: () => 'https://www.google.ru/',
  target: externalRedirect,
});
