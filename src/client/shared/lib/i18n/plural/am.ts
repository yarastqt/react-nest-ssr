import { IPluralForms } from '..';

export default (count: number, params: IPluralForms): string => {
  if (!count || count === 1) {
    return params.one;
  }

  return params.many || '';
};
