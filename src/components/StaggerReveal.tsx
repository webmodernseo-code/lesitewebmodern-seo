'use client';

import React, { useEffect, useRef, useState } from 'react';
import type { RevealVariant } from '@/components/Reveal';

interface StaggerRevealProps {
  children: React.ReactNode;
  selector: string;
  variant?: RevealVariant;
  step?: number;
  className?: string;
  as?: 'div' | 'section';
  id?: string;
}

export function StaggerReveal({
  children,
  selector,
  variant = 'up',
  step = 100,
  className = '',
  as = 'div',
  id,
}: StaggerRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const items = Array.from(node.querySelectorAll<HTMLElement>(selector));
    items.forEach((item, index) => {
      item.classList.add('stagger-reveal-item');
      item.style.setProperty('--stagger-index', String(index));
    });

    let observer: IntersectionObserver | null = null;
    if (
      typeof IntersectionObserver === 'undefined' ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      setVisible(true);
    } else {
      observer = new IntersectionObserver(
        (entries) => {
          if (entries.some((entry) => entry.isIntersecting)) {
            setVisible(true);
            observer?.disconnect();
          }
        },
        { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
      );
      observer.observe(node);
    }

    const fallback = setTimeout(() => setVisible(true), 1200);

    return () => {
      observer?.disconnect();
      clearTimeout(fallback);
      items.forEach((item) => {
        item.classList.remove('stagger-reveal-item');
        item.style.removeProperty('--stagger-index');
      });
    };
  }, [selector]);

  const Tag = as;
  const style = { '--stagger-step': `${step}ms` } as React.CSSProperties;

  return (
    <Tag
      ref={ref as never}
      id={id}
      data-stagger-variant={variant}
      className={`stagger-reveal ${visible ? 'is-visible' : ''} ${className}`}
      style={style}
    >
      {children}
    </Tag>
  );
}
