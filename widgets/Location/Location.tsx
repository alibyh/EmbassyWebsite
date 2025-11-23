'use client';

import React, { useState } from 'react';
import { Container } from '@/shared/ui/Container';
import { useI18n } from '@/shared/lib/i18n';
import { getAssetPath } from '@/shared/lib/utils/paths';
import styles from './Location.module.css';

export const Location: React.FC = () => {
  const { t } = useI18n();
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  const embassyPhotos = [
    getAssetPath('/assets/embassy1.webp'),
    getAssetPath('/assets/embassy2.webp'),
    getAssetPath('/assets/embassy3.webp'),
    getAssetPath('/assets/embassy4.webp'),
  ];

  // Embassy address: г. Москва, ул. Донская, дом 18/7, офис 131-132
  // Using Google Maps embed URL - this format avoids the mapsjs API call
  // To get exact embed: Go to Google Maps, search "ул. Донская, 18/7, Москва", click Share > Embed a map
  const mapUrl = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2245.373535625!2d37.6172999!3d55.755826!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTXCsDQ1JzIxLjAiTiAzN8KwMzcnMDIuMyJF!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus';

  return (
    <section className={styles.section} id="location">
      <Container size="content">
        <div className={styles.header}>
          <div className={styles.sectionBadge}>{t.location.badge}</div>
          <h2 className={styles.title}>{t.location.title}</h2>
          <p className={styles.description}>{t.location.description}</p>
        </div>

        <div className={styles.content}>
          <div className={styles.mapContainer}>
            <iframe
              src={mapUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Embassy Location"
              className={styles.map}
            />
          </div>

          <div className={styles.photosContainer}>
            <h3 className={styles.photosTitle}>{t.location.photosTitle}</h3>
            <div className={styles.photosGrid}>
              {embassyPhotos.map((photo, index) => (
                <div
                  key={index}
                  className={styles.photoWrapper}
                  onClick={() => setSelectedPhoto(photo)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setSelectedPhoto(photo);
                    }
                  }}
                  aria-label={`${t.location.embassyPhoto} ${index + 1}`}
                >
                  <img
                    src={photo}
                    alt={`${t.location.embassyPhoto} ${index + 1}`}
                    className={styles.photo}
                    loading="lazy"
                  />
                  <div className={styles.photoOverlay}>
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M15 15L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.addressInfo}>
          <div className={styles.addressCard}>
            <div className={styles.addressIcon}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.364 3.63604C20.0518 5.32387 21 7.61305 21 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className={styles.addressDetails}>
              <h4 className={styles.addressTitle}>{t.location.addressTitle}</h4>
              <p className={styles.addressText}>{t.location.address}</p>
              <p className={styles.addressText}>{t.location.city}</p>
            </div>
          </div>
        </div>
      </Container>

      {/* Photo Lightbox Modal */}
      {selectedPhoto && (
        <div
          className={styles.lightbox}
          onClick={() => setSelectedPhoto(null)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Escape') {
              setSelectedPhoto(null);
            }
          }}
          aria-label="Close photo viewer"
        >
          <div className={styles.lightboxContent} onClick={(e) => e.stopPropagation()}>
            <button
              className={styles.lightboxClose}
              onClick={() => setSelectedPhoto(null)}
              aria-label="Close"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <img
              src={selectedPhoto}
              alt={t.location.embassyPhoto}
              className={styles.lightboxImage}
            />
          </div>
        </div>
      )}
    </section>
  );
};

