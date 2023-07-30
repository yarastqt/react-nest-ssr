import { createEvent, createStore } from 'effector';
import { Language } from '../lib/i18n';

export const appStarted = createEvent();

export const $locale = createStore('ru');

// TODO: move to i18n lib
// TODO: как-то по другому назвать, т.к. это получение локали на этапе старта
export function getLocale() {
  if (!$locale.sid) {
    throw new Error('Cannot get locale, because $locale.sid is null');
  }

  // TODO: Локально можно прокидывать не в effector-скоуп дополнительно.
  const locale = window.__EFFECTOR_SCOPE__[$locale.sid];

  return locale as Language;
}
