import { createEffect, createStore, sample } from 'effector';

import { routes } from '@client/shared/routing';

export const $params = routes.personal.user.$params;
export const $user = createStore<{ id: string; login: string } | null>(null);

const getUserFx = createEffect((id: string) => {
  return Promise.resolve({ id, login: 'yarastqt' });
});

sample({
  clock: [routes.personal.user.opened, routes.personal.user.updated],
  fn: ({ params }) => params.userId,
  target: getUserFx,
});

sample({
  clock: getUserFx.doneData,
  target: $user,
});
