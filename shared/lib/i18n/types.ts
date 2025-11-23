export type Locale = 'en' | 'ru' | 'ar' | 'fr';

export interface LocaleConfig {
  code: Locale;
  name: string;
  dir: 'ltr' | 'rtl';
}

export const locales: LocaleConfig[] = [
  { code: 'en', name: 'English', dir: 'ltr' },
  { code: 'ru', name: 'Русский', dir: 'ltr' },
  { code: 'ar', name: 'العربية', dir: 'rtl' },
  { code: 'fr', name: 'Français', dir: 'ltr' },
];

export const defaultLocale: Locale = 'en';

