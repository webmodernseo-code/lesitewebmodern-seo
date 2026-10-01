import React from 'react';
import { BubbleBackground, RotatingWord } from '@/components/public/HeroEffects';
import DiagonalMarqueeCarousel from '@/components/ui/great-ui-diagonal-marquee-carousel';

const HERO_WORDS = ['visibilité', 'trafic', 'notoriété', 'chiffre d’affaires'] as const;

export const HeroPublic: React.FC = () => {
  return (
    <section className="w-full overflow-hidden bg-white py-3 sm:py-6">
      <div className="relative mx-3 max-w-[1440px] overflow-hidden rounded-[24px] bg-gradient-to-b from-brand-sable/60 to-white sm:mx-6 sm:rounded-[32px] xl:mx-auto">
        <BubbleBackground />

        <div className="relative z-10 mx-auto flex flex-col items-center px-4 pt-12 pb-6 text-center sm:pt-16 sm:pb-8">
          <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-black/[0.08] bg-black/[0.03] px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.08em] text-[#5c5c64]">
            <span className="text-[#0FAC71]" aria-hidden="true">✦</span>
            Agence Web &amp; SEO — Grenoble
          </span>

          <h1 className="mb-6 max-w-4xl font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-black sm:text-5xl md:text-6xl">
            <span className="block">On développe votre</span>
            <RotatingWord words={HERO_WORDS} />
          </h1>

          <p className="mb-9 max-w-xl text-base leading-relaxed text-[#5c5c64] sm:text-lg">
            Agence basée à Grenoble : création de sites internet sur-mesure (Next.js), référencement naturel (SEO)
            haute performance, publicité Meta Ads et automatisations intelligentes pour générer des leads en continu.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="/contact"
              className="inline-flex items-center gap-3 rounded-full border border-black bg-black py-2.5 pl-2.5 pr-6 text-base font-semibold text-white shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#1a1a20] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2"
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-orange">
                <svg width="10" height="10" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 3L10 8L5 13" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M9 3L14 8L9 13" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              Prendre un RDV offert
            </a>

            <a
              href="/#services"
              className="inline-flex items-center gap-3 rounded-full border border-black/10 py-2.5 pl-2.5 pr-6 text-base font-semibold text-black transition-all duration-300 hover:-translate-y-0.5 hover:bg-black/[0.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2"
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-orange text-white">
                <svg width="10" height="10" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M11.596 8.697l-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z" />
                </svg>
              </span>
              Découvrir nos services
            </a>
          </div>

          {/* Cadre vitrine du carrousel de réalisations intégré au Hero */}
          <div className="mt-8 w-full max-w-[1200px] px-1 sm:mt-10 sm:px-2">
            <div className="relative w-full overflow-hidden rounded-2xl border border-black/[0.08] bg-white/70 py-2.5 sm:py-3.5 shadow-xs backdrop-blur-xs sm:rounded-3xl">
              {/* Fondus latéraux gauche et droite pour fluidifier l'entrée/sortie des slides */}
              <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 sm:w-16 bg-gradient-to-r from-white via-white/80 to-transparent" />
              <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 sm:w-16 bg-gradient-to-l from-white via-white/80 to-transparent" />

              <DiagonalMarqueeCarousel
                angle={0}
                baseSpeed={85}
                rowCount={2}
                pauseOnHover={false}
                dimCards={false}
                rowGap={10}
                speedStep={0}
                className="h-[210px] w-full sm:h-[265px] lg:h-[315px]"
                cardClassName="h-[96px] w-[160px] rounded-lg border border-black/[0.08] bg-white shadow-2xs sm:h-[120px] sm:w-[200px] sm:rounded-xl lg:h-[145px] lg:w-[240px]"
                fadeClassName="hidden"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
