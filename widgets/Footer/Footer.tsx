'use client';

import React, { useState } from 'react';
import { Container } from '@/shared/ui/Container';
import { useI18n } from '@/shared/lib/i18n';
import { LoginModal } from '@/widgets/LoginModal';
import { useAuth } from '@/shared/lib/auth';
import { Button } from '@/shared/ui/Button';
import styles from './Footer.module.css';

const LogoIcon = () => (
  <svg width="24" height="24" viewBox="0 0 3000 2000" xmlns="http://www.w3.org/2000/svg">
    <path fill="#d01c1f" d="M0 0H3000V2000H0z"/>
    <path fill="#00a95c" d="M0 400H3000V1600H0z"/>
    <path fill="#ffd700" d="M1299 744h153l48-144 48 144h153l-126 92 51 146-126-90-126 90 51-146zM750 670a 760.092776 628 0 0 0 1500 0 750 730 0 0 1-1500 0z"/>
  </svg>
);

const TwitterIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M19 3.01001C18.1429 3.66525 17.1767 4.17135 16.15 4.51001C15.6512 3.94265 14.9939 3.54233 14.2628 3.36277C13.5318 3.18322 12.7632 3.23253 12.0621 3.50368C11.361 3.77483 10.7597 4.25638 10.3406 4.88234C9.92154 5.5083 9.70467 6.24708 9.71703 7.00001V7.83334C8.28027 7.87005 6.85656 7.54972 5.5821 6.90115C4.30764 6.25259 3.22249 5.29543 2.42703 4.12168C2.42703 4.12168 -0.72297 11.0117 6.16703 14.1617C4.56703 15.2417 2.63703 15.7817 0.707031 15.6617C7.59703 19.9017 15.987 15.6617 15.987 7.00001C15.9865 6.78988 15.9664 6.58031 15.927 6.37334C16.8284 5.48282 17.4754 4.35963 17.797 3.12668L19 3.01001Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const FacebookIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M15 1.66667H12.5C11.3949 1.66667 10.3351 2.10566 9.55372 2.88705C8.77232 3.66845 8.33333 4.72827 8.33333 5.83334V8.33334H5.83333V11.6667H8.33333V18.3333H11.6667V11.6667H14.1667L15 8.33334H11.6667V5.83334C11.6667 5.61233 11.7545 5.40037 11.9107 5.24409C12.067 5.08781 12.279 5.00001 12.5 5.00001H15V1.66667Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const LinkedInIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M13.3333 6.66667C14.6594 6.66667 15.9312 7.19346 16.8689 8.13114C17.8065 9.06882 18.3333 10.3406 18.3333 11.6667V17.5H15V11.6667C15 11.2246 14.8244 10.8007 14.5118 10.4882C14.1993 10.1756 13.7754 10 13.3333 10C12.8913 10 12.4674 10.1756 12.1548 10.4882C11.8423 10.8007 11.6667 11.2246 11.6667 11.6667V17.5H8.33333V11.6667C8.33333 10.3406 8.86012 9.06882 9.7978 8.13114C10.7355 7.19346 12.0072 6.66667 13.3333 6.66667Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M5 7.5H1.66667V17.5H5V7.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M3.33333 5C4.25381 5 5 4.25381 5 3.33333C5 2.41286 4.25381 1.66667 3.33333 1.66667C2.41286 1.66667 1.66667 2.41286 1.66667 3.33333C1.66667 4.25381 2.41286 5 3.33333 5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const InstagramIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2.5" y="2.5" width="15" height="15" rx="4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M13.75 9.375C13.8519 10.0918 13.7244 10.8215 13.3858 11.4603C13.0471 12.099 12.5148 12.6149 11.8651 12.9336C11.2153 13.2522 10.4818 13.3581 9.76916 13.2372C9.05654 13.1163 8.39986 12.7747 7.89115 12.2589C7.38245 11.7431 7.04669 11.0796 6.93287 10.3631C6.81906 9.64661 6.93217 8.91065 7.25704 8.2585C7.58192 7.60634 8.10326 7.07197 8.74631 6.73208C9.38936 6.39218 10.1234 6.26489 10.8437 6.36875C11.5777 6.47472 12.2581 6.81536 12.7844 7.34431C13.3107 7.87327 13.6545 8.55631 13.7625 9.29375" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M14.375 5.625H14.3833" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const Footer: React.FC = () => {
  const { t } = useI18n();
  const { user, signOut } = useAuth();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const currentYear = new Date().getFullYear();

  const handleLoginClick = () => {
    if (user) {
      signOut();
    } else {
      setIsLoginModalOpen(true);
    }
  };

  return (
    <>
    <footer className={styles.footer}>
      <Container>
        <div className={styles.content}>
          <div className={styles.about}>
            <div className={styles.logo}>
              <div className={styles.logoIcon}>
                <LogoIcon />
              </div>
              Mauritania Embassy
            </div>
            <p className={styles.description}>
              {t.footer.description}
            </p>
            <div className={styles.socialLinks}>
              <a href="#" className={styles.socialLink} aria-label="Twitter">
                <TwitterIcon />
              </a>
              <a href="#" className={styles.socialLink} aria-label="Facebook">
                <FacebookIcon />
              </a>
              <a href="#" className={styles.socialLink} aria-label="LinkedIn">
                <LinkedInIcon />
              </a>
              <a href="#" className={styles.socialLink} aria-label="Instagram">
                <InstagramIcon />
              </a>
            </div>
          </div>

          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>{t.footer.services.title}</h3>
            <ul className={styles.links}>
              <li><a href="#" className={styles.link}>{t.footer.services.passports}</a></li>
              <li><a href="#" className={styles.link}>{t.footer.services.visas}</a></li>
              <li><a href="#" className={styles.link}>{t.footer.services.notary}</a></li>
              <li><a href="#" className={styles.link}>{t.footer.services.legal}</a></li>
            </ul>
          </div>

          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>{t.footer.information.title}</h3>
            <ul className={styles.links}>
              <li><a href="#" className={styles.link}>{t.footer.information.about}</a></li>
              <li><a href="#" className={styles.link}>{t.footer.information.news}</a></li>
              <li><a href="#" className={styles.link}>{t.footer.information.events}</a></li>
              <li><a href="#" className={styles.link}>{t.footer.information.contact}</a></li>
            </ul>
          </div>

          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>{t.footer.resources.title}</h3>
            <ul className={styles.links}>
              <li><a href="#" className={styles.link}>{t.footer.resources.travel}</a></li>
              <li><a href="#" className={styles.link}>{t.footer.resources.forms}</a></li>
              <li><a href="#" className={styles.link}>{t.footer.resources.faq}</a></li>
              <li><a href="#" className={styles.link}>{t.footer.resources.appointments}</a></li>
            </ul>
          </div>
        </div>

        <div className={styles.bottom}>
          <p className={styles.copyright}>
            © {currentYear} {t.footer.copyright}
          </p>
          <div className={styles.bottomRight}>
          <ul className={styles.bottomLinks}>
            <li><a href="#" className={styles.bottomLink}>{t.footer.legal.privacy}</a></li>
            <li><a href="#" className={styles.bottomLink}>{t.footer.legal.terms}</a></li>
            <li><a href="#" className={styles.bottomLink}>{t.footer.legal.accessibility}</a></li>
          </ul>
            <Button
              variant="ghost"
              size="small"
              onClick={handleLoginClick}
              className={styles.adminButton}
            >
              {user ? 'Sign Out' : 'Admin Login'}
            </Button>
          </div>
        </div>
      </Container>
    </footer>
    <LoginModal
      isOpen={isLoginModalOpen}
      onClose={() => setIsLoginModalOpen(false)}
    />
    </>
  );
};
