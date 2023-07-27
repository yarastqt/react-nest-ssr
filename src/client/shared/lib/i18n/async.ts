import { getLocale } from '@client/shared/config';
import { isClient } from '@shared/lib/environment';

import { setI18nLang } from './index';

export { getI18nLang, i18n, setI18nLang } from './index';

const waitingSet = new Set();

// TODO: импорт спрятать сюда.
export function loadKeysetChunk(chunk: Promise<any>) {
  if (isClient) {
    waitingSet.add(chunk);
  }

  return chunk;
}

// TODO: Можно сюда пробросить язык.
export async function waitForReadyTranslations() {
  const locale = getLocale();

  // TODO: указать тип (язык лучше указывать в APP для прозрачности)
  setI18nLang(locale as any);

  return new Promise<void>((resolve) => {
    setTimeout(() => {
      if (waitingSet.size === 0) {
        return resolve();
      }

      Promise.all(waitingSet.values()).then(() => {
        resolve();
      });
    }, 0);
  });
}
