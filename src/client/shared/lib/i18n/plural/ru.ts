import { IPluralForms } from '..';

export default (count: number, params: IPluralForms): string => {
  const lastNumber = count % 10;
  const lastNumbers = count % 100;

  if (!count) {
    return params.none || '';
  }
  if (lastNumber === 1 && lastNumbers !== 11) {
    return params.one;
  }
  if (
    lastNumber >= 2 &&
    lastNumber <= 4 &&
    lastNumbers !== 12 &&
    lastNumbers !== 13 &&
    lastNumbers !== 14
  ) {
    return params.some;
  }

  return params.many || '';
};
