import React from 'react';
import styles from './Card.module.css';

export interface CardProps {
  children: React.ReactNode;
  variant?: 'default' | 'elevated' | 'flat' | 'outlined';
  padding?: 'compact' | 'normal' | 'spacious';
  hoverable?: boolean;
  clickable?: boolean;
  onClick?: () => void;
  className?: string;
}

export interface CardHeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export interface CardContentProps {
  children: React.ReactNode;
  className?: string;
}

export interface CardFooterProps {
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  padding = 'normal',
  hoverable = false,
  clickable = false,
  onClick,
  className = '',
}) => {
  const cardClasses = [
    styles.card,
    variant !== 'default' && styles[variant],
    styles[padding],
    hoverable && styles.hoverable,
    clickable && styles.clickable,
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={cardClasses} onClick={onClick}>
      {children}
    </div>
  );
};

export const CardHeader: React.FC<CardHeaderProps> = ({ title, subtitle, className = '' }) => (
  <div className={`${styles.header} ${className}`}>
    <h3 className={styles.title}>{title}</h3>
    {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
  </div>
);

export const CardContent: React.FC<CardContentProps> = ({ children, className = '' }) => (
  <div className={`${styles.content} ${className}`}>{children}</div>
);

export const CardFooter: React.FC<CardFooterProps> = ({ children, className = '' }) => (
  <div className={`${styles.footer} ${className}`}>{children}</div>
);
