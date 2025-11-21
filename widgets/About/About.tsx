'use client';

import React from 'react';
import { Container } from '@/shared/ui/Container';
import { useI18n } from '@/shared/lib/i18n';
import styles from './About.module.css';

const BuildingIcon = () => (
  <svg className={styles.placeholderIcon} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 21H21M3 10H21M3 7L12 3L21 7M4 10V21M20 10V21M8 14V17M12 14V17M16 14V17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const About: React.FC = () => {
  const { t } = useI18n();
  
  return (
    <section className={styles.section} id="about">
      <Container>
        <div className={styles.content}>
          <div className={styles.textContent}>
            <div className={styles.sectionBadge}>{t.about.badge}</div>
            <h2 className={styles.title}>
              {t.about.title}
            </h2>
            <p className={styles.description}>
              {t.about.description1}
            </p>
            <p className={styles.description}>
              {t.about.description2}
            </p>

            <div className={styles.stats}>
              <div className={styles.stat}>
                <div className={styles.statValue}>1960</div>
                <div className={styles.statLabel}>{t.about.stats.independence}</div>
              </div>
              <div className={styles.stat}>
                <div className={styles.statValue}>24/7</div>
                <div className={styles.statLabel}>{t.about.stats.emergency}</div>
              </div>
              <div className={styles.stat}>
                <div className={styles.statValue}>1000+</div>
                <div className={styles.statLabel}>{t.about.stats.citizens}</div>
              </div>
              <div className={styles.stat}>
                <div className={styles.statValue}>12+</div>
                <div className={styles.statLabel}>{t.about.stats.services}</div>
              </div>
            </div>
          </div>

          <div className={styles.imageContent}>
            <div className={styles.imageWrapper}>
              <BuildingIcon />
            </div>
            <div className={styles.decorativeCircle} />
            <div className={styles.decorativeCircle} />
          </div>
        </div>
      </Container>
    </section>
  );
};

