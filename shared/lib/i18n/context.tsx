'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Locale } from './types';
import { defaultLocale, locales } from './types';
import { getTranslation } from './translations';
import type { Translation } from './translations/en';

interface I18nContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: Translation;
  dir: 'ltr' | 'rtl';
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(defaultLocale);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Load saved locale from localStorage
    const savedLocale = localStorage.getItem('locale') as Locale;
    if (savedLocale && locales.find(l => l.code === savedLocale)) {
      setLocaleState(savedLocale);
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      // Save locale to localStorage
      localStorage.setItem('locale', locale);
      
      // Update document direction and lang
      const localeConfig = locales.find(l => l.code === locale);
      if (localeConfig) {
        document.documentElement.dir = localeConfig.dir;
        document.documentElement.lang = locale;
      }
    }
  }, [locale, mounted]);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
  };

  const t = getTranslation(locale);
  const dir = locales.find(l => l.code === locale)?.dir || 'ltr';

  if (!mounted) {
    // Return default during SSR
    return (
      <I18nContext.Provider value={{ locale: defaultLocale, setLocale, t: getTranslation(defaultLocale), dir: 'ltr' }}>
        {children}
      </I18nContext.Provider>
    );
  }

  return (
    <I18nContext.Provider value={{ locale, setLocale, t, dir }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within I18nProvider');
  }
  return context;
}

