// import { i18nRaw, i18n } from 'i18n';

import {
  getI18nLang,
  i18n as _i18n,
  loadKeysetChunk,
} from '@client/shared/lib/i18n/async';
import { isClient } from '@shared/lib/environment';

// type KeysetType = typeof import('./ru')['ru'];

export let i18n = _i18n({} as any);
// export let i18nRaw = i18nRawFactory<KeysetType>(undefined, module.id);

if (isClient) {
  //   // на клиенте грузим только один нужный язык
  //   // при этом сервер в момент SSR заранее допушит нужные бандлы на клиента
  const language = getI18nLang();
  // const language = 'en';

  // console.log('>>> language', language);

  loadKeysetChunk(import(`./${language}`)).then((mod) => {
    // const res = _i18n(mod[language]);

    // console.log('>>> res', res('поддержка'));
    i18n = _i18n(mod[language]);

    console.log('>>> a', i18n('Поддержка'));
  });

  // import('./en').then((mod: any) => {
  //   _i18n(mod[language], 'home');
  // });

  //   import(
  //     /*
  //       webpackInclude: /\.ts$/,
  //       webpackExclude: /index\.ts$/,
  //       webpackChunkName: "lang-helpdesk-bae20c25-[request]-[index]",
  //       webpackMode: "lazy",
  //     */
  //     `./${lang}.ts`
  //   ).then((mod) => {
  //     i18n = i18nFactory(
  //       {
  //         [lang]: mod[lang],
  //       } as Keyset<KeysetType>,
  //       module.id,
  //     );
  //     i18nRaw = i18nRawFactory(
  //       {
  //         [lang]: mod[lang],
  //       } as Keyset<KeysetType>,
  //       module.id,
  //     );
  //   });
} else {
  // const modules = import.meta.glob(['!./index.ts', './*.ts']);
  // console.log('>>> modules', modules);
  //   // на сервере загружаем сразу все языковые кисеты (включаются в общий бандл кода)
  //   const loadLangFiles = require.context(`./`, false, /\/[a-z]{2}\.ts/, 'eager');
  //   Promise.all(loadLangFiles.keys().map((keysetFile) => loadLangFiles(keysetFile))).then((mods) => {
  //     i18n = i18nFactory(Object.assign({}, ...mods) as Keyset<KeysetType>, module.id);
  //     i18nRaw = i18nRawFactory(Object.assign({}, ...mods) as Keyset<KeysetType>, module.id);
  //   });
}
