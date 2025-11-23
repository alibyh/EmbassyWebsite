'use client';

import React from 'react';
import { Container } from '@/shared/ui/Container';
import { useI18n } from '@/shared/lib/i18n';
import styles from './EmergencyContacts.module.css';

const AlertIcon = () => (
  <svg className={styles.alertIcon} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 5.33333V8M8 10.6667H8.00667M14.6667 8C14.6667 11.6819 11.6819 14.6667 8 14.6667C4.3181 14.6667 1.33333 11.6819 1.33333 8C1.33333 4.3181 4.3181 1.33333 8 1.33333C11.6819 1.33333 14.6667 4.3181 14.6667 8Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const PhoneIcon = () => (
  <svg className={styles.cardIcon} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M22 16.92V19.92C22.0011 20.1985 21.9441 20.4742 21.8325 20.7293C21.7209 20.9845 21.5573 21.2136 21.3521 21.4019C21.1468 21.5901 20.9046 21.7335 20.6407 21.8227C20.3769 21.9119 20.0974 21.9451 19.82 21.92C16.7428 21.5856 13.787 20.5341 11.19 18.85C8.77382 17.3147 6.72533 15.2662 5.18999 12.85C3.49997 10.2412 2.44824 7.27099 2.11999 4.18C2.095 3.90347 2.12787 3.62476 2.21649 3.36162C2.30512 3.09849 2.44756 2.85669 2.63476 2.65162C2.82196 2.44655 3.0498 2.28271 3.30379 2.17052C3.55777 2.05833 3.83233 2.00026 4.10999 2H7.10999C7.59524 1.99522 8.06572 2.16708 8.43369 2.48353C8.80166 2.79999 9.04201 3.23945 9.10999 3.72C9.23662 4.68007 9.47144 5.62273 9.80999 6.53C9.94454 6.88792 9.97366 7.27691 9.89384 7.65088C9.81403 8.02485 9.62886 8.36811 9.35999 8.64L8.08999 9.91C9.51355 12.4135 11.5864 14.4864 14.09 15.91L15.36 14.64C15.6319 14.3711 15.9751 14.186 16.3491 14.1061C16.7231 14.0263 17.1121 14.0555 17.47 14.19C18.3773 14.5286 19.3199 14.7634 20.28 14.89C20.7658 14.9585 21.2094 15.2032 21.5265 15.5775C21.8437 15.9518 22.0122 16.4296 22 16.92Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const MailIcon = () => (
  <svg className={styles.infoIcon} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3.33333 3.33334H16.6667C17.5833 3.33334 18.3333 4.08334 18.3333 5.00001V15C18.3333 15.9167 17.5833 16.6667 16.6667 16.6667H3.33333C2.41666 16.6667 1.66666 15.9167 1.66666 15V5.00001C1.66666 4.08334 2.41666 3.33334 3.33333 3.33334Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M18.3333 5L10 10.8333L1.66666 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const LocationIcon = () => (
  <svg className={styles.infoIcon} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.5 8.33334C17.5 14.1667 10 19.1667 10 19.1667C10 19.1667 2.5 14.1667 2.5 8.33334C2.5 6.34422 3.29018 4.43656 4.6967 3.03003C6.10322 1.6235 8.01088 0.833344 10 0.833344C11.9891 0.833344 13.8968 1.6235 15.3033 3.03003C16.7098 4.43656 17.5 6.34422 17.5 8.33334Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M10 10.8333C11.3807 10.8333 12.5 9.71406 12.5 8.33334C12.5 6.95263 11.3807 5.83334 10 5.83334C8.61929 5.83334 7.5 6.95263 7.5 8.33334C7.5 9.71406 8.61929 10.8333 10 10.8333Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ContactPhoneIcon = () => (
  <svg className={styles.infoIcon} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M18.3333 14.1V16.6C18.3343 16.8321 18.2867 17.0618 18.1937 17.2744C18.1008 17.487 17.9644 17.6779 17.7934 17.8349C17.6224 17.9919 17.4205 18.1112 17.2006 18.1855C16.9808 18.2599 16.7478 18.2876 16.5167 18.2667C13.9523 17.988 11.489 17.1118 9.32499 15.7083C7.31151 14.4289 5.60443 12.7218 4.32499 10.7083C2.91663 8.53438 2.04019 6.05916 1.76666 3.48334C1.74583 3.25292 1.77324 3.02064 1.84708 2.80135C1.92093 2.58207 2.03963 2.38064 2.19562 2.2098C2.35162 2.03896 2.54149 1.90247 2.75314 1.80879C2.9648 1.71511 3.19369 1.66655 3.42499 1.66668H5.92499C6.32953 1.66269 6.72148 1.80593 7.02812 2.06965C7.33476 2.33336 7.53505 2.69958 7.59166 3.10001C7.69717 3.90006 7.89286 4.68562 8.17499 5.44168C8.28712 5.73998 8.31137 6.06411 8.24491 6.37565C8.17844 6.68719 8.02404 6.97344 7.79999 7.20001L6.74166 8.25834C7.92795 10.3446 9.65536 12.072 11.7417 13.2583L12.8 12.2C13.0266 11.976 13.3128 11.8216 13.6244 11.7551C13.9359 11.6886 14.26 11.7129 14.5583 11.825C15.3144 12.1072 16.1 12.3028 16.9 12.4083C17.3048 12.4655 17.6745 12.6694 17.9388 12.9813C18.203 13.2932 18.3435 13.6914 18.3333 14.1Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

interface ContactCardData {
  title: string;
  subtitle: string;
  urgent?: boolean;
  phone: string;
  email: string;
  address?: string;
  availability: string;
  available24?: boolean;
}

export const EmergencyContacts: React.FC = () => {
  const { t } = useI18n();

  const contacts: ContactCardData[] = [
    {
      title: t.emergency.hotline.title,
      subtitle: t.emergency.hotline.subtitle,
      urgent: true,
      phone: '+7 (495) 123-45-67',
      email: 'emergency@mauritania-embassy.ru',
      availability: t.emergency.hotline.availability,
      available24: true,
    },
    {
      title: t.emergency.consular.title,
      subtitle: t.emergency.consular.subtitle,
      phone: '+7 (495) 234-56-78',
      email: 'consular@mauritania-embassy.ru',
      address: 'Prospekt Mira 36, Moscow, 129090, Russia',
      availability: t.emergency.consular.availability,
    },
    {
      title: t.emergency.visa.title,
      subtitle: t.emergency.visa.subtitle,
      phone: '+7 (495) 345-67-89',
      email: 'visa@mauritania-embassy.ru',
      address: 'Prospekt Mira 36, Moscow, 129090, Russia',
      availability: t.emergency.visa.availability,
    },
  ];

  return (
    <section className={styles.section} id="emergency">
      <div className={styles.backgroundPattern} />
      <Container size="content" className={styles.content}>
        <div className={styles.header}>
          <div className={styles.alertBadge}>
            <AlertIcon />
            {t.emergency.badge}
          </div>
          <h2 className={styles.title}>{t.emergency.title}</h2>
          <p className={styles.description}>
            {t.emergency.description}
          </p>
        </div>

        <div className={styles.grid}>
          {contacts.map((contact, index) => (
            <div key={index} className={`${styles.contactCard} ${contact.urgent ? styles.urgent : ''}`}>
              <div className={styles.cardHeader}>
                <div className={styles.cardIconWrapper}>
                  <PhoneIcon />
                </div>
                <div className={styles.cardTitleGroup}>
                  <h3 className={styles.cardTitle}>{contact.title}</h3>
                  <p className={styles.cardSubtitle}>{contact.subtitle}</p>
                </div>
              </div>

              <div className={styles.contactInfo}>
                <div className={styles.infoItem}>
                  <ContactPhoneIcon />
                  <div className={styles.infoContent}>
                    <div className={styles.infoLabel}>{t.emergency.labels.phone}</div>
                    <div className={styles.infoValue}>{contact.phone}</div>
                  </div>
                </div>

                <div className={styles.infoItem}>
                  <MailIcon />
                  <div className={styles.infoContent}>
                    <div className={styles.infoLabel}>{t.emergency.labels.email}</div>
                    <div className={styles.infoValue}>{contact.email}</div>
                  </div>
                </div>

                {contact.address && (
                  <div className={styles.infoItem}>
                    <LocationIcon />
                    <div className={styles.infoContent}>
                      <div className={styles.infoLabel}>{t.emergency.labels.address}</div>
                      <div className={styles.infoValue}>{contact.address}</div>
                    </div>
                  </div>
                )}
              </div>

              <div className={styles.availability}>
                <div className={styles.availabilityTitle}>{t.emergency.labels.availability}</div>
                <div className={styles.availabilityTime}>{contact.availability}</div>
                {contact.available24 && (
                  <div className={styles.availabilityBadge}>
                    <span className={styles.statusDot} />
                    {t.emergency.hotline.availableNow}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};
