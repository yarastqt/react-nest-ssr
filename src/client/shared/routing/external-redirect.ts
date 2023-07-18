import { createEvent, createStore, sample } from 'effector';

export const $externalRedirectPath = createStore<string | null>(null);

export const externalRedirect = createEvent<string>();

sample({
  clock: externalRedirect,
  target: $externalRedirectPath,
});
