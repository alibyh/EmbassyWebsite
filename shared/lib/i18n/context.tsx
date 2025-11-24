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
  isLocaleReady: boolean;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export function I18nProvider({ children }: { children: React.ReactNode }) {
  // Always start with default locale to match SSR/static generation
  const [locale, setLocaleState] = useState<Locale>(defaultLocale);
  const [isLocaleReady, setIsLocaleReady] = useState(false);

  // After mount, load locale from localStorage and update
  useEffect(() => {
    console.log('[I18nProvider] useEffect: Starting locale initialization');
    
    // Use requestAnimationFrame to ensure this runs after initial render
    requestAnimationFrame(() => {
      try {
        const savedLocale = localStorage.getItem('locale') as Locale;
        console.log('[I18nProvider] localStorage.getItem("locale"):', savedLocale);
        
        if (savedLocale && locales.find(l => l.code === savedLocale)) {
          console.log('[I18nProvider] Setting locale to saved locale:', savedLocale);
          setLocaleState(savedLocale);
          const localeConfig = locales.find(l => l.code === savedLocale);
          if (localeConfig) {
            document.documentElement.dir = localeConfig.dir;
            document.documentElement.lang = savedLocale;
            console.log('[I18nProvider] Updated document attributes:', { dir: localeConfig.dir, lang: savedLocale });
          }
        } else {
          console.log('[I18nProvider] No valid saved locale, using default:', defaultLocale);
          // Ensure default locale is set
          const localeConfig = locales.find(l => l.code === defaultLocale);
          if (localeConfig) {
            document.documentElement.dir = localeConfig.dir;
            document.documentElement.lang = defaultLocale;
            console.log('[I18nProvider] Updated document attributes to default:', { dir: localeConfig.dir, lang: defaultLocale });
          }
        }
        
        // Mark locale as ready after a microtask to ensure state updates
        Promise.resolve().then(() => {
          console.log('[I18nProvider] Locale ready, setting isLocaleReady to true');
          setIsLocaleReady(true);
        });
      } catch (error) {
        console.error('[I18nProvider] Error loading locale:', error);
        setIsLocaleReady(true); // Still mark as ready to prevent infinite loading
      }
    });
  }, []);

  // Update document attributes when locale changes (after initial load)
  useEffect(() => {
    if (isLocaleReady) {
      console.log('[I18nProvider] Locale changed to:', locale);
      const localeConfig = locales.find(l => l.code === locale);
      if (localeConfig) {
        document.documentElement.dir = localeConfig.dir;
        document.documentElement.lang = locale;
        console.log('[I18nProvider] Updated document attributes:', { dir: localeConfig.dir, lang: locale });
      }
      // Save locale to localStorage
      try {
        localStorage.setItem('locale', locale);
        console.log('[I18nProvider] Saved locale to localStorage:', locale);
      } catch (error) {
        console.error('[I18nProvider] Error saving locale:', error);
      }
    }
  }, [locale, isLocaleReady]);

  const setLocale = (newLocale: Locale) => {
    console.log('[I18nProvider] setLocale called with:', newLocale);
    setLocaleState(newLocale);
  };

  const t = getTranslation(locale);
  const dir = locales.find(l => l.code === locale)?.dir || 'ltr';

  // Only log in development and when locale is ready to avoid console spam
  if (process.env.NODE_ENV === 'development' && isLocaleReady) {
    console.log('[I18nProvider] Render - locale:', locale, 'isLocaleReady:', isLocaleReady);
  }

  // Show loading placeholder until locale is ready
  if (!isLocaleReady) {
    return (
      <I18nContext.Provider value={{ locale, setLocale, t, dir, isLocaleReady: false }}>
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'var(--color-white)',
          zIndex: 9999
        }}>
          <div style={{
            textAlign: 'center',
            color: 'var(--color-text)',
            fontFamily: 'var(--font-primary)'
          }}>
            <div style={{
              width: '40px',
              height: '40px',
              border: '3px solid var(--color-cream)',
              borderTop: '3px solid var(--color-green)',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
              margin: '0 auto 1rem'
            }} />
            <div>Loading...</div>
          </div>
        </div>
      </I18nContext.Provider>
    );
  }

  return (
    <I18nContext.Provider value={{ locale, setLocale, t, dir, isLocaleReady: true }}>
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

