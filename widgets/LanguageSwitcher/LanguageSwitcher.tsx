'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useI18n } from '@/shared/lib/i18n';
import { locales } from '@/shared/lib/i18n/types';
import styles from './LanguageSwitcher.module.css';

const GlobeIcon = () => (
  <svg className={styles.icon} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 14.6667C11.6819 14.6667 14.6667 11.6819 14.6667 8C14.6667 4.3181 11.6819 1.33333 8 1.33333C4.3181 1.33333 1.33333 4.3181 1.33333 8C1.33333 11.6819 4.3181 14.6667 8 14.6667Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M1.33333 8H14.6667M8 1.33333C9.66667 3.2 10.6667 5.53333 10.6667 8C10.6667 10.4667 9.66667 12.8 8 14.6667C6.33333 12.8 5.33333 10.4667 5.33333 8C5.33333 5.53333 6.33333 3.2 8 1.33333Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ChevronIcon = () => (
  <svg className={styles.icon} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const CheckIcon = () => (
  <svg className={styles.checkIcon} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M13.3333 4L6 11.3333L2.66667 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const LanguageSwitcher: React.FC = () => {
  const { locale, setLocale } = useI18n();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const currentLocale = locales.find(l => l.code === locale);

  const handleLocaleChange = (newLocale: typeof locale) => {
    setLocale(newLocale);
    setIsOpen(false);
  };

  return (
    <div className={styles.switcher} ref={dropdownRef}>
      <button
        className={styles.button}
        onClick={() => setIsOpen(!isOpen)}
        data-open={isOpen}
        aria-label="Change language"
      >
        <GlobeIcon />
        <span>{currentLocale?.name}</span>
        <ChevronIcon />
      </button>

      <div className={styles.dropdown} data-open={isOpen}>
        {locales.map((l) => (
          <div
            key={l.code}
            className={styles.option}
            onClick={() => handleLocaleChange(l.code)}
            data-active={locale === l.code}
          >
            <span>{l.name}</span>
            {locale === l.code && <CheckIcon />}
          </div>
        ))}
      </div>
    </div>
  );
};

