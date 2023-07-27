import { createEvent, createStore } from 'effector';
import { getScope } from './scope';

export const appStarted = createEvent();

// TOOD: rename to locale?
export const $language = createStore('ru');

// TODO: move to i18n lib
export function getLocale() {
  if (!$language.sid) {
    throw new Error('Cannot get locale, because $locale.sid is null');
  }

  const locale = window.__EFFECTOR_SCOPE__[$language.sid];

  return locale as string;
}
