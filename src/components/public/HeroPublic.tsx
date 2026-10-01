import React from 'react';
import { BubbleBackground, RotatingWord } from '@/components/public/HeroEffects';
import DiagonalMarqueeCarousel from '@/components/ui/great-ui-diagonal-marquee-carousel';

const HERO_WORDS = ['visibilité', 'trafic', 'notoriété', 'chiffre d’affaires'] as const;

export const HeroPublic: React.FC = () => {
  return (
    <section className="w-full overflow-hidden bg-white py-1 sm:py-3">
      <div className="relative mx-2.5 max-w-[1440px] overflow-hidden rounded-[20px] bg-gradient-to-b from-brand-sable/60 to-white sm:mx-6 sm:rounded-[32px] xl:mx-auto">
        <BubbleBackground />

        <div className="relative z-10 mx-auto flex flex-col items-center px-4 pt-6 pb-2 text-center sm:pt-10 sm:pb-4">
          <span className="mb-3.5 inline-flex items-center gap-2 rounded-full border border-black/[0.08] bg-black/[0.03] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.08em] text-[#5c5c64] sm:mb-4 sm:px-3.5 sm:py-1.5 sm:text-xs">
            <span className="text-[#0FAC71]" aria-hidden="true">✦</span>
            Agence Web &amp; SEO — Grenoble
          </span>

          <h1 className="mb-3 max-w-4xl font-display text-3xl font-extrabold leading-[1.08] tracking-tight text-black sm:mb-4 sm:text-4xl md:text-5xl lg:text-[3.25rem] sm:leading-[1.05]">
            <span className="block">On développe votre</span>
            <RotatingWord words={HERO_WORDS} />
          </h1>

          <p className="mb-5 max-w-xl text-sm leading-relaxed text-[#5c5c64] sm:mb-6 sm:text-base">
            Agence basée à Grenoble : création de sites internet sur-mesure (Next.js), référencement naturel (SEO)
            haute performance, publicité Meta Ads et automatisations intelligentes pour générer des leads en continu.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <a
              href="/contact"
              className="inline-flex items-center gap-2.5 rounded-full border border-black bg-black py-2 pl-2 pr-5 text-sm font-semibold text-white shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#1a1a20] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2 sm:gap-3 sm:py-2.5 sm:pl-2.5 sm:pr-6 sm:text-base"
            >
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-orange sm:h-7 sm:w-7">
                <svg width="10" height="10" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 3L10 8L5 13" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M9 3L14 8L9 13" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              Prendre un RDV offert
            </a>

            <a
              href="/#services"
              className="inline-flex items-center gap-2.5 rounded-full border border-black/10 py-2 pl-2 pr-5 text-sm font-semibold text-black transition-all duration-300 hover:-translate-y-0.5 hover:bg-black/[0.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2 sm:gap-3 sm:py-2.5 sm:pl-2.5 sm:pr-6 sm:text-base"
            >
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-orange text-white sm:h-7 sm:w-7">
                <svg width="10" height="10" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M11.596 8.697l-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z" />
                </svg>
              </span>
              Découvrir nos services
            </a>
          </div>
        </div>

        {/* Slider étendu jusqu'aux extrémités du Hero */}
        <div className="relative z-10 w-full mt-3 pb-3 sm:mt-5 sm:pb-5">
          <div className="relative w-full overflow-hidden border-y border-black/[0.06] bg-white/60 py-2 sm:py-2.5 backdrop-blur-xs">
            <DiagonalMarqueeCarousel
              angle={0}
              baseSpeed={85}
              rowCount={2}
              pauseOnHover={false}
              dimCards={false}
              rowGap={10}
              speedStep={0}
              className="h-[225px] w-full sm:h-[275px] lg:h-[320px]"
              cardClassName="h-[105px] w-[170px] rounded-lg border border-black/[0.08] bg-white shadow-2xs sm:h-[130px] sm:w-[210px] sm:rounded-xl lg:h-[150px] lg:w-[245px]"
              fadeClassName="hidden"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
