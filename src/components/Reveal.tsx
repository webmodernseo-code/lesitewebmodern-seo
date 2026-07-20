'use client';

import React, { useEffect, useRef, useState } from 'react';

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  /** Délai en ms avant le déclenchement de l'animation une fois l'élément visible. */
  delay?: number;
  /** Élément HTML à rendre (par défaut "div"). */
  as?: 'div' | 'section';
  id?: string;
}

/**
 * Anime légèrement l'apparition d'un bloc lorsqu'il entre dans le viewport
 * (IntersectionObserver, sans dépendance externe). Ne jamais utiliser sur le
 * contenu du premier écran (candidat LCP) : uniquement pour des sections plus
 * bas dans la page. Un filet de sécurité force l'affichage après 1.2s dans tous
 * les cas (JS lent, crawler, navigateur sans IntersectionObserver, saut direct
 * en bas de page) pour qu'aucun contenu ne reste invisible.
 */
export function Reveal({ children, className = '', delay = 0, as = 'div', id }: RevealProps) {
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
    // Filet de sécurité : garantit que le contenu apparaît même si l'observer
    // ne se déclenche jamais (ex: redimensionnement instantané sans scroll réel).
    const fallback = setTimeout(() => setVisible(true), 1200);

    return () => {
      observer.disconnect();
      clearTimeout(fallback);
    };
  }, []);

  const Tag = as;

  return (
    <Tag
      ref={ref as never}
      id={id}
      className={`transition-all duration-700 ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'} ${className}`}
      style={{ transitionDelay: visible ? `${delay}ms` : '0ms' }}
    >
      {children}
    </Tag>
  );
}
