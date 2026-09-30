'use client';

import React from 'react';
import DiagonalMarqueeCarousel, { CardItem } from '@/components/ui/great-ui-diagonal-marquee-carousel';

export function HomePortfolioMarquee({ cards }: { cards?: CardItem[] }) {
  return (
    <section className="w-full relative overflow-hidden bg-white py-12 sm:py-16" aria-label="Aperçu de nos réalisations">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 mb-8 text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-black/[0.08] bg-black/[0.03] px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.08em] text-[#5c5c64]">
          <span className="text-brand-orange" aria-hidden="true">✦</span>
          Réalisations &amp; Projets Web
        </span>
        <h2 className="mt-4 font-display text-2xl font-bold tracking-tight text-black sm:text-3xl md:text-4xl">
          Des sites internet conçus pour <span className="text-brand-orange">convertir</span>
        </h2>
      </div>

      <div className="relative w-full h-[520px] sm:h-[620px] lg:h-[720px] overflow-hidden">
        <DiagonalMarqueeCarousel 
          cards={cards}
          angle={-12}
          baseSpeed={90}
          className="h-full w-full"
          cardClassName="h-[220px] w-[320px] sm:h-[260px] sm:w-[380px] lg:h-[300px] lg:w-[440px] rounded-2xl border border-black/10 shadow-lg"
          fadeClassName="h-1/5 from-white via-white/80 to-transparent"
        />
      </div>
    </section>
  );
}

export default HomePortfolioMarquee;
