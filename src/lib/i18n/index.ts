import { Locale, defaultLocale } from './config';
import { enDictionary } from './dictionaries/en';
import { cyDictionary } from './dictionaries/cy';

export * from './config';

export function getDictionary(locale: Locale = defaultLocale) {
  if (locale === 'cy') {
    return cyDictionary;
  }
  return enDictionary;
}
