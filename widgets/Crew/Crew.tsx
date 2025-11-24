'use client';

import React from 'react';
import { Container } from '@/shared/ui/Container';
import { useI18n } from '@/shared/lib/i18n';
import { getAssetPath } from '@/shared/lib/utils/paths';
import { mockCrew, CrewMember } from '@/entities/crew';
import styles from './Crew.module.css';

const EmailIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2.66667 3.33333H13.3333C14.2538 3.33333 15 4.07953 15 5V11C15 11.9205 14.2538 12.6667 13.3333 12.6667H2.66667C1.74619 12.6667 1 11.9205 1 11V5C1 4.07953 1.74619 3.33333 2.66667 3.33333Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M15 5L8 9L1 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
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
  
  // Get translated position, bio, and name
  const getTranslatedPosition = (position: string): string => {
    const positionMap: Record<string, keyof typeof t.crew.positions> = {
      'Ambassador': 'ambassador',
      'Deputy Head of Mission': 'deputyHead',
      'Consul General': 'consulGeneral',
      'Cultural Attaché': 'culturalAttache',
      'Economic Counselor': 'economicCounselor',
    };
    const key = positionMap[position];
    return key ? t.crew.positions[key] : position;
  };

  const getTranslatedBio = (position: string): string => {
    const bioMap: Record<string, keyof typeof t.crew.bios> = {
      'Ambassador': 'ambassador',
      'Deputy Head of Mission': 'deputyHead',
      'Consul General': 'consulGeneral',
      'Cultural Attaché': 'culturalAttache',
      'Economic Counselor': 'economicCounselor',
    };
    const key = bioMap[position];
    return key ? t.crew.bios[key] : '';
  };

  const getTranslatedName = (position: string): string => {
    const nameMap: Record<string, keyof typeof t.crew.names> = {
      'Ambassador': 'ambassador',
      'Deputy Head of Mission': 'deputyHead',
      'Consul General': 'consulGeneral',
      'Cultural Attaché': 'culturalAttache',
      'Economic Counselor': 'economicCounselor',
    };
    const key = nameMap[position];
    return key ? t.crew.names[key] : ambassador.name;
  };
  
  return (
    <div className={styles.ambassadorCard}>
      <div className={styles.ambassadorBadge}>
        {t.crew.ambassador.badge}
      </div>
      <div className={styles.ambassadorContent}>
        {ambassador.photo && !imageError ? (
          <img 
            src={getAssetPath(ambassador.photo)} 
            alt={getTranslatedName(ambassador.position)}
            className={styles.ambassadorPhoto}
            onError={() => setImageError(true)}
          />
        ) : (
          <div className={styles.ambassadorPhoto}>
            <PlaceholderPhoto name={getTranslatedName(ambassador.position)} isAmbassador />
          </div>
        )}
        <div className={styles.ambassadorInfo}>
          <h3 className={styles.ambassadorName}>{getTranslatedName(ambassador.position)}</h3>
          <p className={styles.ambassadorPosition}>{getTranslatedPosition(ambassador.position)}</p>
          {ambassador.bio && (
            <p className={styles.ambassadorBio}>{getTranslatedBio(ambassador.position) || ambassador.bio}</p>
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
  const { t } = useI18n();
  const [imageError, setImageError] = React.useState(false);
  
  // Get translated position, bio, and name
  const getTranslatedPosition = (position: string): string => {
    const positionMap: Record<string, keyof typeof t.crew.positions> = {
      'Ambassador': 'ambassador',
      'Deputy Head of Mission': 'deputyHead',
      'Consul General': 'consulGeneral',
      'Cultural Attaché': 'culturalAttache',
      'Economic Counselor': 'economicCounselor',
    };
    const key = positionMap[position];
    return key ? t.crew.positions[key] : position;
  };

  const getTranslatedBio = (position: string): string => {
    const bioMap: Record<string, keyof typeof t.crew.bios> = {
      'Ambassador': 'ambassador',
      'Deputy Head of Mission': 'deputyHead',
      'Consul General': 'consulGeneral',
      'Cultural Attaché': 'culturalAttache',
      'Economic Counselor': 'economicCounselor',
    };
    const key = bioMap[position];
    return key ? t.crew.bios[key] : '';
  };

  const getTranslatedName = (position: string): string => {
    const nameMap: Record<string, keyof typeof t.crew.names> = {
      'Ambassador': 'ambassador',
      'Deputy Head of Mission': 'deputyHead',
      'Consul General': 'consulGeneral',
      'Cultural Attaché': 'culturalAttache',
      'Economic Counselor': 'economicCounselor',
    };
    const key = nameMap[position];
    return key ? t.crew.names[key] : member.name;
  };
  
  return (
    <div className={styles.memberCard}>
      {member.photo && !imageError ? (
        <img 
          src={getAssetPath(member.photo)} 
          alt={getTranslatedName(member.position)}
          className={styles.memberPhoto}
          onError={() => setImageError(true)}
        />
      ) : (
        <div className={styles.memberPhoto}>
          <PlaceholderPhoto name={getTranslatedName(member.position)} />
        </div>
      )}
      <h4 className={styles.memberName}>{getTranslatedName(member.position)}</h4>
      <p className={styles.memberPosition}>{getTranslatedPosition(member.position)}</p>
      {member.bio && (
        <p className={styles.memberBio}>{getTranslatedBio(member.position) || member.bio}</p>
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
      <Container size="content">
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

