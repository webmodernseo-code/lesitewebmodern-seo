'use client';

import React from 'react';

export type RevealVariant = 'up' | 'left' | 'right' | 'scale';

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: 'div' | 'section';
  id?: string;
  variant?: RevealVariant;
}

/**
 * Composant de conteneur affichant directement le contenu sans effet d'apparition masquant.
 */
export function Reveal({ children, className = '', as = 'div', id }: RevealProps) {
  const Tag = as;

  return (
    <Tag id={id} className={className}>
      {children}
    </Tag>
  );
}
