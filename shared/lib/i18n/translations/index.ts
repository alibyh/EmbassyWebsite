import { en } from './en';
import { ru } from './ru';
import { ar } from './ar';
import type { Locale } from '../types';

export const translations = {
  en,
  ru,
  ar,
};

export function getTranslation(locale: Locale) {
  return translations[locale] || translations.en;
}

