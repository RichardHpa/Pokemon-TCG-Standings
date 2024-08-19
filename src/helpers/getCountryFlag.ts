import { getEmojiFlag } from 'countries-list';

import type { TCountryCode } from 'countries-list';

export const getCountryFlag = (countryCode: TCountryCode | string) => {
  if (countryCode === 'UK') {
    return getEmojiFlag('GB');
  }
  const resolvedCode = countryCode as TCountryCode;

  return getEmojiFlag(resolvedCode);
};
