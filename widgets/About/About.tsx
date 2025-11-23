'use client';

import React from 'react';
import { Container } from '@/shared/ui/Container';
import { useI18n } from '@/shared/lib/i18n';
import { getAssetPath } from '@/shared/lib/utils/paths';
import styles from './About.module.css';

export const About: React.FC = () => {
  const { t } = useI18n();
  
  return (
    <section className={styles.section} id="about">
      <Container size="content">
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
              <img 
                src={getAssetPath('/assets/putinGhazwani.jpg')} 
                alt="Diplomatic Meeting" 
                className={styles.aboutImage}
                loading="lazy"
              />
            </div>
            <div className={styles.decorativeCircle} />
            <div className={styles.decorativeCircle} />
          </div>
        </div>
      </Container>
    </section>
  );
};

