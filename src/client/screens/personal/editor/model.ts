import { $$router, routes, externalRedirect } from '@client/shared/routing';
import { sample } from 'effector';

sample({
  clock: routes.personal.editor.opened,
  source: $$router.$query,
  // TODO: Добавить пример с загрузкой данных.
  filter: (query) => query.login !== 'fake',
  fn: () => 'https://www.google.ru/',
  target: externalRedirect,
});
