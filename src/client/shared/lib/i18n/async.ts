import { isClient } from '@shared/lib/environment';

// import { i18n as _i18n } from './index';

export { getI18nLang, i18n } from './index';

const waitingSet = new Set();

// export function loadKeysetChunk(keyset: any, chunkId: string) {
//   if (isClient) {
//     waitingSet.add(chunkId);
//   }

//   return _i18n(keyset);
// }

export function loadKeysetChunk(chunk: Promise<any>) {
  if (isClient) {
    waitingSet.add(chunk);
  }

  // return _i18n(keyset);
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
