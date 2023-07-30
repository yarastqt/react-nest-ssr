import { IPluralForms } from '..';

export default (count: number, params: IPluralForms): string => {
  if (!count) {
    return params.none || '';
  }
  if (count === 1) {
    return params.one;
  }

  return params.some;
};
