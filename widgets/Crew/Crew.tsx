'use client';

import React from 'react';
import { Container } from '@/shared/ui/Container';
import { useI18n } from '@/shared/lib/i18n';
import { mockCrew, CrewMember } from '@/entities/crew';
import styles from './Crew.module.css';

const EmailIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2.66667 3.33333H13.3333C14.2538 3.33333 15 4.07953 15 5V11C15 11.9205 14.2538 12.6667 13.3333 12.6667H2.66667C1.74619 12.6667 1 11.9205 1 11V5C1 4.07953 1.74619 3.33333 2.66667 3.33333Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M15 5L8 9L1 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const PersonIcon = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const PlaceholderPhoto: React.FC<{ name: string; isAmbassador?: boolean }> = ({ name, isAmbassador }) => {
  const initials = name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
  
  return (
    <div className={styles.placeholderPhoto}>
      {initials}
    </div>
  );
};

const AmbassadorCard: React.FC<{ ambassador: CrewMember }> = ({ ambassador }) => {
  const { t } = useI18n();
  const [imageError, setImageError] = React.useState(false);
  
  return (
    <div className={styles.ambassadorCard}>
      <div className={styles.ambassadorBadge}>
        {t.crew.ambassador.badge}
      </div>
      <div className={styles.ambassadorContent}>
        {ambassador.photo && !imageError ? (
          <img 
            src={ambassador.photo} 
            alt={ambassador.name}
            className={styles.ambassadorPhoto}
            onError={() => setImageError(true)}
          />
        ) : (
          <div className={styles.ambassadorPhoto}>
            <PlaceholderPhoto name={ambassador.name} isAmbassador />
          </div>
        )}
        <div className={styles.ambassadorInfo}>
          <h3 className={styles.ambassadorName}>{ambassador.name}</h3>
          <p className={styles.ambassadorPosition}>{ambassador.position}</p>
          {ambassador.bio && (
            <p className={styles.ambassadorBio}>{ambassador.bio}</p>
          )}
          {ambassador.email && (
            <a href={`mailto:${ambassador.email}`} className={styles.ambassadorEmail}>
              <EmailIcon />
              {ambassador.email}
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

const MemberCard: React.FC<{ member: CrewMember }> = ({ member }) => {
  const [imageError, setImageError] = React.useState(false);
  
  return (
    <div className={styles.memberCard}>
      {member.photo && !imageError ? (
        <img 
          src={member.photo} 
          alt={member.name}
          className={styles.memberPhoto}
          onError={() => setImageError(true)}
        />
      ) : (
        <div className={styles.memberPhoto}>
          <PlaceholderPhoto name={member.name} />
        </div>
      )}
      <h4 className={styles.memberName}>{member.name}</h4>
      <p className={styles.memberPosition}>{member.position}</p>
      {member.bio && (
        <p className={styles.memberBio}>{member.bio}</p>
      )}
      {member.email && (
        <a href={`mailto:${member.email}`} className={styles.memberEmail}>
          <EmailIcon />
          {member.email}
        </a>
      )}
    </div>
  );
};

export const Crew: React.FC = () => {
  const { t } = useI18n();
  
  const ambassador = mockCrew.find(member => member.isAmbassador);
  const crewMembers = mockCrew.filter(member => !member.isAmbassador);

  return (
    <section className={styles.section} id="crew">
      <Container>
        <div className={styles.header}>
          <div className={styles.sectionBadge}>{t.crew.badge}</div>
          <h2 className={styles.title}>{t.crew.title}</h2>
          <p className={styles.description}>{t.crew.description}</p>
        </div>

        <div className={styles.crewGrid}>
          {ambassador && <AmbassadorCard ambassador={ambassador} />}
          
          {crewMembers.map((member) => (
            <MemberCard key={member.id} member={member} />
          ))}
        </div>
      </Container>
    </section>
  );
};

