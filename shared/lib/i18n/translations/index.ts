import { en } from './en';
import { ru } from './ru';
import { ar } from './ar';
import { fr } from './fr';
import type { Locale } from '../types';

export const translations = {
  en,
  ru,
  ar,
  fr,
};

export function getTranslation(locale: Locale) {
  return translations[locale] || translations.en;
}

