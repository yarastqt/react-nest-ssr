import { createEvent, createStore } from 'effector';
import { Language } from '../lib/i18n';

export const appStarted = createEvent();

export const $locale = createStore('ru');

// TODO: move to i18n lib
export function getLocale() {
  if (!$locale.sid) {
    throw new Error('Cannot get locale, because $locale.sid is null');
  }

  const locale = window.__EFFECTOR_SCOPE__[$locale.sid];

  return locale as Language;
}
