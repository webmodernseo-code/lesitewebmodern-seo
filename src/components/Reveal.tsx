'use client';

import React, { useEffect, useRef, useState } from 'react';

export type RevealVariant = 'up' | 'left' | 'right' | 'scale';

const hiddenClasses: Record<RevealVariant, string> = {
  up: 'opacity-0 translate-y-6',
  left: 'opacity-0 -translate-x-8',
  right: 'opacity-0 translate-x-8',
  scale: 'opacity-0 translate-y-3 scale-[0.97]',
};

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  /** Délai en ms avant le déclenchement de l'animation une fois l'élément visible. */
  delay?: number;
  /** Élément HTML à rendre (par défaut "div"). */
  as?: 'div' | 'section';
  id?: string;
  variant?: RevealVariant;
}

/**
 * Anime légèrement l'apparition d'un bloc lorsqu'il entre dans le viewport
 * (IntersectionObserver, sans dépendance externe). Ne jamais utiliser sur le
 * contenu du premier écran (candidat LCP) : uniquement pour des sections plus
 * bas dans la page. Les navigateurs sans IntersectionObserver et les personnes
 * ayant demandé moins de mouvement voient immédiatement le contenu.
 */
export function Reveal({ children, className = '', delay = 0, as = 'div', id, variant = 'up' }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (typeof IntersectionObserver === 'undefined' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -80px 0px' }
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
    };
  }, []);

  const Tag = as;

  return (
    <Tag
      ref={ref as never}
      id={id}
      className={`transition-all duration-700 ease-out motion-reduce:transition-none motion-reduce:transform-none motion-reduce:opacity-100 ${
        visible
          ? 'opacity-100 translate-x-0 translate-y-0 scale-100'
          : hiddenClasses[variant]
      } ${className}`}
      style={{ transitionDelay: visible ? `${delay}ms` : '0ms' }}
    >
      {children}
    </Tag>
  );
}
