import { createEvent, createStore } from 'effector';

import { assert } from '@shared/lib/assert';
import { Language } from '@client/shared/lib/i18n';

export const appStarted = createEvent();

export const $locale = createStore('ru');

// TODO: move to i18n lib
export function getSharedLocale() {
  const locale = window.__SHARED_DATA__.locale;

  assert(locale, 'Locale not provided from server data.');

  return locale as Language;
}
