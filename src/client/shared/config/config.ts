import { createEvent, createStore, sample } from 'effector';

// TODO: надо подумать как быть с серверным ивентом, как его сереализовать на клиенте.
interface AppStartedParams {
  language: string;
}

export const appStarted = createEvent();
export const serverStarted = createEvent<AppStartedParams>();

export const $language = createStore('ru');

sample({
  clock: serverStarted,
  fn: (payload) => payload.language,
  target: $language,
});
