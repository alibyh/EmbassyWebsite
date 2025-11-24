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
    { label: t.header.home, href: '/EmbassyWebsite/' },
    { label: t.header.services, href: '/EmbassyWebsite/services' },
    { label: t.header.announcements, href: '/EmbassyWebsite/#announcements' },
    { label: t.header.emergency, href: '/EmbassyWebsite/emergency' },
    { label: t.header.about, href: '/EmbassyWebsite/about' },
    { label: t.header.crew, href: '/EmbassyWebsite/crew' },
    { label: t.header.location, href: '/EmbassyWebsite/location' },
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
        <Container size="content" className={styles.container}>
          <a href="/EmbassyWebsite/" className={styles.logo}>
            <div className={styles.logoIcon}>
              <LogoIcon />
            </div>
            <span className={styles.logoText}>
              <span className={styles.logoMain}>Mauritania</span>
              <span className={styles.logoSub} suppressHydrationWarning>{t.header.embassyInMoscow}</span>
            </span>
          </a>

          <nav className={styles.nav}>
            <ul className={styles.navList}>
              {navItems.map((item) => (
                <li key={item.label} className={styles.navItem}>
                  <a
                    href={item.href}
                    className={styles.navLink}
                    onClick={(e) => {
                      // Handle anchor links on same page (for announcements)
                      if (item.href.includes('#') && window.location.pathname === '/EmbassyWebsite/') {
                        e.preventDefault();
                        const hash = item.href.split('#')[1];
                        const targetElement = document.getElementById(hash);
                        if (targetElement) {
                          targetElement.scrollIntoView({ behavior: 'smooth' });
                        }
                      }
                    }}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>

            <div className={styles.actions}>
              <LanguageSwitcher />
              <Button 
                variant="primary" 
                size="small"
                onClick={(e) => {
                  e.preventDefault();
                  const emergencySection = document.getElementById('emergency');
                  if (emergencySection) {
                    emergencySection.scrollIntoView({ behavior: 'smooth' });
                  } else {
                    window.location.href = '/EmbassyWebsite/emergency';
                  }
                }}
                suppressHydrationWarning
              >
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

      <div 
        className={`${styles.mobileNavOverlay} ${isMobileMenuOpen ? styles.open : ''}`}
        onClick={(e) => {
          // Only close if clicking directly on overlay, not on child elements
          if (e.target === e.currentTarget) {
            e.stopPropagation();
            setIsMobileMenuOpen(false);
          }
        }}
        onTouchStart={(e) => {
          // Prevent touch events from propagating to nav items
          if (e.target === e.currentTarget) {
            e.stopPropagation();
          }
        }}
        aria-hidden="true"
      />

      <div className={`${styles.mobileNav} ${isMobileMenuOpen ? styles.open : ''}`}>
        <ul className={styles.mobileNavList}>
          {navItems.map((item) => {
            // Capture href in closure to prevent it from changing
            const itemHref = item.href;
            
            const handleNavClick = (e: React.MouseEvent<HTMLButtonElement>) => {
              e.preventDefault();
              e.stopPropagation();
              
              // Close menu immediately
              setIsMobileMenuOpen(false);
              
              // Handle anchor links on same page (for announcements)
              if (itemHref.includes('#') && window.location.pathname === '/EmbassyWebsite/') {
                // Use setTimeout to ensure menu closes before scrolling
                setTimeout(() => {
                  const hash = itemHref.split('#')[1];
                  const targetElement = document.getElementById(hash);
                  if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                  }
                }, 200);
              } else {
                // For regular navigation links, navigate immediately
                // Use a small delay to ensure menu state update doesn't interfere
                setTimeout(() => {
                  // Use the captured href value
                  if (itemHref && itemHref !== '#') {
                    window.location.href = itemHref;
                  }
                }, 50);
              }
            };

            return (
              <li key={item.label} className={styles.mobileNavItem}>
                <button
                  type="button"
                  className={styles.mobileNavLink}
                  onClick={handleNavClick}
                  onTouchStart={(e) => {
                    // Stop touch event propagation on mobile
                    e.stopPropagation();
                  }}
                  suppressHydrationWarning
                >
                  {item.label}
                </button>
              </li>
            );
          })}
        </ul>
        <div className={styles.mobileActions}>
          <LanguageSwitcher />
          <Button 
            variant="primary" 
            size="medium"
            onClick={(e) => {
              e.preventDefault();
              setIsMobileMenuOpen(false);
              const emergencySection = document.getElementById('emergency');
              if (emergencySection) {
                emergencySection.scrollIntoView({ behavior: 'smooth' });
              } else {
                window.location.href = '/EmbassyWebsite/emergency';
              }
            }}
            suppressHydrationWarning
          >
            {t.common.contactUs}
          </Button>
        </div>
      </div>

      <div 
        className={`${styles.mobileNavOverlay} ${isMobileMenuOpen ? styles.open : ''}`}
        onClick={(e) => {
          // Only close if clicking directly on overlay, not on child elements
          if (e.target === e.currentTarget) {
            e.stopPropagation();
            setIsMobileMenuOpen(false);
          }
        }}
        onTouchStart={(e) => {
          // Prevent touch events from propagating to nav items
          if (e.target === e.currentTarget) {
            e.stopPropagation();
          }
        }}
        aria-hidden="true"
      />
    </>
  );
};
