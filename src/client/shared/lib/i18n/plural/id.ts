import { IPluralForms } from '..';

export default (count: number, params: IPluralForms): string => {
  if (!count) {
    return params.none || '';
  }

  return params.some;
};
