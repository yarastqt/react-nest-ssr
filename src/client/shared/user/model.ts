import { createEffect, createStore, sample } from 'effector';
import { appStarted } from '@client/shared/config';

export interface User {
  login: string;
}

export const $user = createStore<User | null>(null);

const fetchUserFx = createEffect(() => {
  return Promise.resolve({ login: 'yarastqt' });
});

sample({
  clock: appStarted,
  source: $user,
  filter: (user) => user === null,
  target: fetchUserFx,
});

sample({
  clock: fetchUserFx.doneData,
  target: $user,
});
