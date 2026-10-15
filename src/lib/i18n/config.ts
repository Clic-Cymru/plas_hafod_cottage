export const defaultLocale = 'en' as const;
export const locales = ['en', 'cy'] as const;

export type Locale = (typeof locales)[number];

export interface LocaleInfo {
  code: Locale;
  label: string;
  nativeLabel: string;
  flag: string;
  pathPrefix: string;
}

export const localeDetails: Record<Locale, LocaleInfo> = {
  en: {
    code: 'en',
    label: 'English',
    nativeLabel: 'English',
    flag: '🇬🇧',
    pathPrefix: '',
  },
  cy: {
    code: 'cy',
    label: 'Welsh',
    nativeLabel: 'Cymraeg',
    flag: '🏴󠁧󠁢󠁷󠁬󠁳󠁿',
    pathPrefix: '/cy',
  },
};
