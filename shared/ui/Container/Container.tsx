import React from 'react';
import styles from './Container.module.css';

export interface ContainerProps {
  children: React.ReactNode;
  size?: 'narrow' | 'default' | 'wide' | 'fluid' | 'content';
  className?: string;
}

export const Container: React.FC<ContainerProps> = ({
  children,
  size = 'default',
  className = '',
}) => {
  const containerClasses = [
    styles.container,
    size !== 'default' && styles[size],
    className,
  ].filter(Boolean).join(' ');

  return <div className={containerClasses}>{children}</div>;
};
