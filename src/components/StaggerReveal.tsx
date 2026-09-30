'use client';

import React from 'react';
import type { RevealVariant } from '@/components/Reveal';

interface StaggerRevealProps {
  children: React.ReactNode;
  selector?: string;
  variant?: RevealVariant;
  step?: number;
  className?: string;
  as?: 'div' | 'section';
  id?: string;
}

export function StaggerReveal({
  children,
  className = '',
  as = 'div',
  id,
}: StaggerRevealProps) {
  const Tag = as;

  return (
    <Tag id={id} className={className}>
      {children}
    </Tag>
  );
}
