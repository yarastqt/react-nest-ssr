import { getLocale } from '@client/shared/config';
import { KeysetDictionary } from '@client/shared/lib/i18n';
import {
  getI18nLang,
  i18n as _i18n,
  loadKeysetChunk,
  setI18nLang,
} from '@client/shared/lib/i18n/async';
import { isClient } from '@shared/lib/environment';

type KeysetType = typeof import('./ru')['ru'];

export let i18n = _i18n({} as any);
// export let i18nRaw = i18nRawFactory<KeysetType>(undefined, module.id);

// TODO: проверить как будет с динамическим импортом
// TODO: разобраться с ошибкой в терминале

if (isClient) {
  // const language = getI18nLang();
  // TODO: rename locale
  const language = getLocale();

  loadKeysetChunk(import(`./${language}.ts`)).then((keyset) => {
    i18n = _i18n({ [language]: keyset[language] });

    // const a = i18n('Поддержка');
    // console.log('>>> a', a);
  });
} else {
  // @ts-expect-error (TODO: Enable import meta API)
  const modules = import.meta.glob(['!./index.ts', './*.ts'], { eager: true });
  const keysets: KeysetDictionary = {};

  for (const keyset of Object.values(modules)) {
    Object.assign(keysets, keyset);
  }

  i18n = _i18n(keysets);
}
