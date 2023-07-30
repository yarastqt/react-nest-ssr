import { getSharedLocale } from '@client/shared/config';
import {
  I18nOptions,
  I18nRaw,
  KeysetDictionary,
} from '@client/shared/lib/i18n';
import {
  i18n as _i18n,
  i18nRaw as _i18nRaw,
  loadKeysetChunk,
} from '@client/shared/lib/i18n/async';
import { isClient } from '@shared/lib/environment';

type KeysetType = typeof import('./locale-ru')['ru'];

// TODO: выделить тип
export let i18n = _i18n({}) as (
  key: keyof KeysetType,
  options?: I18nOptions,
) => string;
export let i18nRaw = _i18nRaw({}) as (
  key: keyof KeysetType,
  options?: I18nOptions,
) => I18nRaw;

// TODO: проверить как будет с динамическим импортом

if (isClient) {
  const locale = getSharedLocale();

  loadKeysetChunk(import(`./locale-${locale}.ts`)).then((keyset) => {
    i18n = _i18n({ [locale]: keyset[locale] });
    i18nRaw = _i18nRaw({ [locale]: keyset[locale] });
  });
} else {
  // @ts-expect-error (TODO: Enable import meta API)
  const modules = import.meta.glob(['./locale-*.ts'], { eager: true });
  const keysets: KeysetDictionary = {};

  for (const keyset of Object.values(modules)) {
    Object.assign(keysets, keyset);
  }

  i18n = _i18n(keysets);
  i18nRaw = _i18nRaw(keysets);
}
