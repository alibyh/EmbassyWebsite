'use client';

import React from 'react';
import { Container } from '@/shared/ui/Container';
import { Button } from '@/shared/ui/Button';
import { useI18n } from '@/shared/lib/i18n';
import styles from './ConsularServices.module.css';

const PassportIcon = () => (
  <svg className={styles.icon} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9 11C10.6569 11 12 9.65685 12 8C12 6.34315 10.6569 5 9 5C7.34315 5 6 6.34315 6 8C6 9.65685 7.34315 11 9 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M3 21V19C3 17.9391 3.42143 16.9217 4.17157 16.1716C4.92172 15.4214 5.93913 15 7 15H11C12.0609 15 13.0783 15.4214 13.8284 16.1716C14.5786 16.9217 15 17.9391 15 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M16 3H22V9M16 21H22V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const VisaIcon = () => (
  <svg className={styles.icon} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="5" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M2 10H22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M6 15H6.01M10 15H14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const NotaryIcon = () => (
  <svg className={styles.icon} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M14 2V8H20M16 13H8M16 17H8M10 9H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const LegalIcon = () => (
  <svg className={styles.icon} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M2 17L12 22L22 17M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const CheckIcon = () => (
  <svg className={styles.checkIcon} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M16.6667 5L7.50004 14.1667L3.33337 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ArrowRightIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4.16667 10H15.8333M15.8333 10L10 4.16667M15.8333 10L10 15.8333" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

interface Service {
  icon: React.ReactNode;
  title: string;
  description: string;
  items: string[];
}

export const ConsularServices: React.FC = () => {
  const { t } = useI18n();

  const services: Service[] = [
    {
      icon: <PassportIcon />,
      title: t.services.passport.title,
      description: t.services.passport.description,
      items: t.services.passport.items,
    },
    {
      icon: <VisaIcon />,
      title: t.services.visa.title,
      description: t.services.visa.description,
      items: t.services.visa.items,
    },
    {
      icon: <NotaryIcon />,
      title: t.services.notary.title,
      description: t.services.notary.description,
      items: t.services.notary.items,
    },
    {
      icon: <LegalIcon />,
      title: t.services.legal.title,
      description: t.services.legal.description,
      items: t.services.legal.items,
    },
  ];

  return (
    <section className={styles.section} id="services">
      <Container size="content">
        <div className={styles.header}>
          <div className={styles.sectionBadge}>{t.services.badge}</div>
          <h2 className={styles.title}>{t.services.title}</h2>
          <p className={styles.description}>
            {t.services.description}
          </p>
        </div>

        <div className={styles.grid}>
          {services.map((service, index) => (
            <div key={index} className={styles.serviceCard}>
              <div className={styles.iconWrapper}>
                {service.icon}
              </div>
              <h3 className={styles.serviceTitle}>{service.title}</h3>
              <p className={styles.serviceDescription}>{service.description}</p>
              <ul className={styles.serviceList}>
                {service.items.map((item, itemIndex) => (
                  <li key={itemIndex} className={styles.serviceItem}>
                    <CheckIcon />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className={styles.ctaSection}>
          <h3 className={styles.ctaTitle}>{t.services.cta.title}</h3>
          <p className={styles.ctaDescription}>
            {t.services.cta.description}
          </p>
          <div className={styles.ctaActions}>
            <Button variant="primary" size="large" icon={<ArrowRightIcon />}>
              {t.services.cta.bookAppointment}
            </Button>
            <Button variant="outline" size="large">
              {t.services.cta.downloadForms}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
};
