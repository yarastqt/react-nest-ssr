import bePlural from './plural/be';
import enPlural from './plural/en';
import idPlural from './plural/id';
import kkPlural from './plural/kk';
import ruPlural from './plural/ru';
import trPlural from './plural/tr';
import ttPlural from './plural/tt';
import ukPlural from './plural/uk';
import uzPlural from './plural/uz';
import dePlural from './plural/de';
import esPlural from './plural/es';
import hyPlural from './plural/hy';
import kaPlural from './plural/ka';
import kyPlural from './plural/ky';
import srPlural from './plural/sr';
import frPlural from './plural/fr';
import lvPlural from './plural/lv';
import ltPlural from './plural/lt';
import roPlural from './plural/ro';
import fiPlural from './plural/fi';
import azPlural from './plural/az';
import zhPlural from './plural/zh';
import hePlural from './plural/he';
import etPlural from './plural/et';
import noPlural from './plural/no';
import svPlural from './plural/sv';
import ptPlural from './plural/pt';
import ptBrPlural from './plural/pt-BR';
import arPlural from './plural/ar';
import swPlural from './plural/sw';
import urPlural from './plural/ur';
import amPlural from './plural/am';
import { assert } from '@shared/lib/assert';

export interface IPluralForms {
  one: string;
  some: string;
  many?: string;
  none?: string;
}

export type KeysetKey = string | IPluralForms;

export type Keyset = Record<string, KeysetKey>;

export type KeysetDictionary = Record<string, Keyset>;

export type I18nBaseOptions = Record<
  string,
  string | object | number | undefined
>;

export type I18nPluralOptions = I18nBaseOptions & {
  count: number;
};

export type I18nOptions = I18nBaseOptions | I18nPluralOptions;

export type I18nRaw = Array<string | object | number | undefined>;

export type Language =
  | 'be'
  | 'en'
  | 'kk'
  | 'ru'
  | 'tr'
  | 'tt'
  | 'uk'
  | 'id'
  | 'uz'
  | 'es'
  | 'de'
  | 'hy'
  | 'ka'
  | 'ky'
  | 'sr'
  | 'fr'
  | 'lv'
  | 'lt'
  | 'ro'
  | 'fi'
  | 'az'
  | 'zh'
  | 'he'
  | 'et'
  | 'no'
  | 'sv'
  | 'pt'
  | 'pt-BR'
  | 'ar'
  | 'sw'
  | 'ur'
  | 'am';

export type PluralFunction = (count: number, params: IPluralForms) => string;

export type PluralMap = Record<Language, PluralFunction>;

type Keys<O> = keyof O;
type Values<O> = O[keyof O];

export type ExtractKeyFromDictionary<D extends KeysetDictionary> = Values<{
  [K in Keys<D>]: Keys<D[K]>;
}>;

export type I18nFunction<D extends KeysetDictionary = KeysetDictionary> = (
  key: ExtractKeyFromDictionary<D>,
  options?: I18nOptions,
) => string;

export type I18nRawFunction<D extends KeysetDictionary = KeysetDictionary> = (
  key: ExtractKeyFromDictionary<D>,
  options?: I18nOptions,
) => I18nRaw;

const pluralMap: PluralMap = {
  be: bePlural,
  en: enPlural,
  id: idPlural,
  kk: kkPlural,
  ru: ruPlural,
  tr: trPlural,
  tt: ttPlural,
  uk: ukPlural,
  uz: uzPlural,
  de: dePlural,
  es: esPlural,
  hy: hyPlural,
  ka: kaPlural,
  ky: kyPlural,
  sr: srPlural,
  fr: frPlural,
  lv: lvPlural,
  lt: ltPlural,
  ro: roPlural,
  fi: fiPlural,
  az: azPlural,
  zh: zhPlural,
  he: hePlural,
  et: etPlural,
  no: noPlural,
  sv: svPlural,
  pt: ptPlural,
  'pt-BR': ptBrPlural,
  ar: arPlural,
  sw: swPlural,
  ur: urPlural,
  am: amPlural,
};

let _langs: Language[] = ['ru'];

function generateText(template: string, options: I18nBaseOptions): I18nRaw {
  const res = [];
  const len = template.length;
  let pos = 0;

  while (pos < len) {
    const p1 = template.indexOf('{', pos);
    if (p1 === -1) {
      // нет открывающих фигурных скобок - копируем весь остаток строки
      res.push(template.substring(pos));
      return res;
    }

    const p2 = template.indexOf('}', p1);
    if (p2 === -1) {
      res.push(template.substring(pos));
      // edge case: не хватает закрывающей фигурной скобки - копируем весь остаток строки
      // чтобы быть полностью совместимым с оригинальной реализацией, надо сделать
      // res.push(
      //     template.substring(pos, p1),
      //     template.substring(p1 + 1)
      // );
      return res;
    }

    res.push(
      template.substring(pos, p1),
      options[template.substring(p1 + 1, p2)],
    );
    pos = p2 + 1;
  }

  return res;
}

function generateTextWithPlural(
  plural: IPluralForms,
  options: I18nPluralOptions,
): I18nRaw {
  const lang =
    _langs.find((lang) => Boolean(pluralMap[lang])) || getDefLang(_langs[0]);
  const pluralizer = pluralMap[lang];
  const template: string = pluralizer(options.count, plural);

  return generateText(template, options);
}

function tr(dictionary: KeysetDictionary, key: string): KeysetKey {
  let keyset;

  for (const lang of _langs) {
    keyset = dictionary[lang];
    if (keyset && key in keyset) return keyset[key];
  }

  return key;
}

function _i18n(
  dictionary: KeysetDictionary,
  key: string,
  options: I18nOptions = {},
): I18nRaw {
  const translation = tr(dictionary, key);

  if (typeof translation === 'string') {
    return generateText(translation, options);
  }
  return generateTextWithPlural(translation, options as I18nPluralOptions);
}

export function i18n(keyset: KeysetDictionary): I18nFunction {
  return (key, options = {}) => _i18n(keyset, key, options).join('');
}

export function i18nRaw(keyset: KeysetDictionary): I18nRawFunction {
  return (key, options = {}) => _i18n(keyset, key, options);
}

export function getDefLang(lang: Language): Language {
  return ['tr', 'id', 'fi', 'lt', 'pl', 'et', 'lv'].indexOf(lang) === -1
    ? 'ru'
    : 'en';
}

export function setI18nLang(lang: Language | Language[]) {
  _langs = typeof lang === 'string' ? [lang, getDefLang(lang), 'ru'] : lang;
}

export function getI18nLang() {
  return _langs[0];
}

export function getI18nLangs() {
  return _langs;
}

export function getSharedLocale() {
  const locale = window.__SHARED_DATA__.locale;

  assert(locale, 'Locale not provided from server data.');

  return locale as Language;
}

export function resolveI18nLang(
  languages: string[],
  requestLang: Language,
  requestTld: string,
) {
  let language = requestLang;

  if (languages.indexOf(language) === -1) {
    switch (requestTld) {
      case 'com':
        language = 'en';
        break;
      case 'com.tr':
        language = 'tr';
        break;
      default:
        language = 'ru';
    }
  }

  return language;
}

export { $locale } from './effector';
