'use client';

import React from 'react';
import { Container } from '@/shared/ui/Container';
import { Button } from '@/shared/ui/Button';
import { useI18n } from '@/shared/lib/i18n';
import { getAssetPath } from '@/shared/lib/utils/paths';
import styles from './Hero.module.css';

const ArrowRightIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4.16667 10H15.8333M15.8333 10L10 4.16667M15.8333 10L10 15.8333" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const PhoneIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M18.3333 14.1V16.6C18.3343 16.8321 18.2867 17.0618 18.1937 17.2744C18.1008 17.487 17.9644 17.6779 17.7934 17.8349C17.6224 17.9919 17.4205 18.1112 17.2006 18.1855C16.9808 18.2599 16.7478 18.2876 16.5167 18.2667C13.9523 17.988 11.489 17.1118 9.32499 15.7083C7.31151 14.4289 5.60443 12.7218 4.32499 10.7083C2.91663 8.53438 2.04019 6.05916 1.76666 3.48334C1.74583 3.25292 1.77324 3.02064 1.84708 2.80135C1.92093 2.58207 2.03963 2.38064 2.19562 2.2098C2.35162 2.03896 2.54149 1.90247 2.75314 1.80879C2.9648 1.71511 3.19369 1.66655 3.42499 1.66668H5.92499C6.32953 1.66269 6.72148 1.80593 7.02812 2.06965C7.33476 2.33336 7.53505 2.69958 7.59166 3.10001C7.69717 3.90006 7.89286 4.68562 8.17499 5.44168C8.28712 5.73998 8.31137 6.06411 8.24491 6.37565C8.17844 6.68719 8.02404 6.97344 7.79999 7.20001L6.74166 8.25834C7.92795 10.3446 9.65536 12.072 11.7417 13.2583L12.8 12.2C13.0266 11.976 13.3128 11.8216 13.6244 11.7551C13.9359 11.6886 14.26 11.7129 14.5583 11.825C15.3144 12.1072 16.1 12.3028 16.9 12.4083C17.3048 12.4655 17.6745 12.6694 17.9388 12.9813C18.203 13.2932 18.3435 13.6914 18.3333 14.1Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const Hero: React.FC = () => {
  const { t } = useI18n();
  
  return (
    <section className={styles.hero}>
      <img 
        src={getAssetPath('/assets/MR.avif')} 
        alt="Mauritanian Flag" 
        className={styles.backgroundImage}
        loading="eager"
        decoding="async"
      />
      <div className={styles.backgroundAnimation}>
        <div className={styles.wave} />
        <div className={styles.wave} />
      </div>
      
      <Container className={styles.content}>
        <div className={styles.textContent}>
          <div className={styles.badge}>
            <span className={styles.badgeIcon} />
            {t.hero.badge}
          </div>
          
          <h1 className={styles.title}>
            {t.hero.title}
          </h1>
          
          <p className={styles.subtitle}>
            {t.hero.subtitle}
          </p>
          
          <div className={styles.actions}>
            <Button 
              variant="primary" 
              size="large"
              icon={<ArrowRightIcon />}
            >
              {t.hero.consularServices}
            </Button>
            <Button 
              variant="secondary" 
              size="large"
              icon={<PhoneIcon />}
              iconPosition="left"
            >
              {t.hero.emergencyContact}
            </Button>
          </div>
        </div>
      </Container>
      
      <div className={styles.decorativeElement} />
    </section>
  );
};
