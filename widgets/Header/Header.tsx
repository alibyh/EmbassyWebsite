'use client';

import React, { useState, useEffect } from 'react';
import { Container } from '@/shared/ui/Container';
import { Button } from '@/shared/ui/Button';
import { LanguageSwitcher } from '@/widgets/LanguageSwitcher';
import { useI18n } from '@/shared/lib/i18n';
import styles from './Header.module.css';

const LogoIcon = () => (
  <svg width="24" height="24" viewBox="0 0 3000 2000" xmlns="http://www.w3.org/2000/svg">
    <path fill="#d01c1f" d="M0 0H3000V2000H0z"/>
    <path fill="#00a95c" d="M0 400H3000V1600H0z"/>
    <path fill="#ffd700" d="M1299 744h153l48-144 48 144h153l-126 92 51 146-126-90-126 90 51-146zM750 670a 760.092776 628 0 0 0 1500 0 750 730 0 0 1-1500 0z"/>
  </svg>
);

const MenuIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 12H21M3 6H21M3 18H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const CloseIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const Header: React.FC = () => {
  const { t } = useI18n();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { label: t.header.home, href: '#' },
    { label: t.header.services, href: '#services' },
    { label: t.header.announcements, href: '#announcements' },
    { label: t.header.emergency, href: '#emergency' },
    { label: t.header.about, href: '#about' },
    { label: t.header.crew, href: '#crew' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
        <Container className={styles.container}>
          <a href="#" className={styles.logo}>
            <div className={styles.logoIcon}>
              <LogoIcon />
            </div>
            <span className={styles.logoText}>
              <span className={styles.logoMain}>Mauritania</span>
              <span className={styles.logoSub}>Embassy in Moscow</span>
            </span>
          </a>

          <nav className={styles.nav}>
            <ul className={styles.navList}>
              {navItems.map((item) => (
                <li key={item.label} className={styles.navItem}>
                  <a href={item.href} className={styles.navLink}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>

            <div className={styles.actions}>
              <LanguageSwitcher />
              <Button variant="primary" size="small">
                {t.common.contactUs}
              </Button>
            </div>
          </nav>

          <button
            className={styles.mobileMenuButton}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </Container>
      </header>

      <div className={`${styles.mobileNav} ${isMobileMenuOpen ? styles.open : ''}`}>
        <ul className={styles.mobileNavList}>
          {navItems.map((item) => (
            <li key={item.label} className={styles.mobileNavItem}>
              <a
                href={item.href}
                className={styles.mobileNavLink}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        <div className={styles.mobileActions}>
          <LanguageSwitcher />
          <Button variant="primary" size="medium">
            {t.common.contactUs}
          </Button>
        </div>
      </div>
    </>
  );
};
