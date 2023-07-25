import { isClient } from '@shared/lib/environment';

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
