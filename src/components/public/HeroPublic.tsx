'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import { getCalApi } from '@calcom/embed-react';
import { BubbleBackground, RotatingWord } from '@/components/public/HeroEffects';
import { HeroSocialProof } from '@/components/public/HeroSocialProof';
import { HeroTiltedPortfolio } from '@/components/public/HeroTiltedPortfolio';

const HERO_WORDS = ['visibilité', 'trafic', 'notoriété', 'chiffre d’affaires'] as const;

// Logos partenaires et technologies
const PARTNERS = [
  { name: 'Meta', src: '/logo/meta.jpg', width: 56, height: 38 },
  { name: 'n8n', src: '/logo/n8n.jpg', width: 68, height: 38 },
  { name: 'o2switch', src: '/logo/o2switch.jpeg', width: 50, height: 50 },
  { name: 'WordPress', src: '/logo/wordpress.jpg', width: 52, height: 42 },
  { name: 'Yoast SEO', src: '/logo/Yoast-seo.jpg', width: 54, height: 42 },
] as const;

function PartnerLogosTrack({ duplicate = false }: { duplicate?: boolean }) {
  return (
    <div
      className="flex shrink-0 items-center gap-12 sm:gap-16 pr-12 sm:pr-16"
      aria-hidden={duplicate ? 'true' : undefined}
    >
      {/* Logos images */}
      {PARTNERS.map((partner) => (
        <span
          key={`${partner.name}-${duplicate ? 'dup' : 'orig'}`}
          className="flex shrink-0 items-center justify-center transition-transform hover:scale-105"
        >
          <Image
            src={partner.src}
            alt={duplicate ? '' : `${partner.name} logo`}
            width={partner.width}
            height={partner.height}
            className="max-h-[38px] sm:max-h-[44px] w-auto object-contain mix-blend-multiply opacity-80 hover:opacity-100 transition-opacity"
          />
        </span>
      ))}

      {/* Google Vectoriel Pur SVG */}
      <span className="flex shrink-0 items-center justify-center gap-1.5 opacity-80 hover:opacity-100 transition-opacity hover:scale-105">
        <svg className="h-6 w-auto" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
        </svg>
        <span className="text-xs font-bold text-gray-700 font-sans tracking-tight">Google Partner</span>
      </span>

      {/* Next.js Vectoriel Pur SVG */}
      <span className="flex shrink-0 items-center justify-center gap-1.5 opacity-80 hover:opacity-100 transition-opacity hover:scale-105">
        <svg className="h-5 w-auto" viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="90" cy="90" r="90" fill="black"/>
          <path d="M149.508 157.52L69.142 54H54V125.97H66.1136V69.3836L139.999 164.845C143.333 162.614 146.509 160.165 149.508 157.52Z" fill="white"/>
          <path d="M115.886 54H128V126H115.886V54Z" fill="white"/>
        </svg>
        <span className="text-xs font-bold text-gray-900 font-sans">Next.js 14</span>
      </span>
    </div>
  );
}

export const HeroPublic: React.FC = () => {
  useEffect(() => {
    (async function () {
      try {
        const cal = await getCalApi({ namespace: '30min' });
        cal('ui', {
          theme: 'light',
          cssVarsPerTheme: {
            dark: { 'cal-brand': '#c8724a' },
            light: { 'cal-brand': '#ff4d00' }
          },
          hideEventTypeDetails: false,
          layout: 'month_view'
        });
      } catch (err) {
        console.error('Erreur chargement Cal.com:', err);
      }
    })();
  }, []);

  return (
    <section className="w-full overflow-hidden bg-white py-2 sm:py-4">
      <div className="relative mx-2.5 max-w-[1440px] overflow-hidden rounded-[20px] bg-gradient-to-b from-brand-sable/50 via-white to-white sm:mx-6 sm:rounded-[32px] xl:mx-auto border border-black/[0.05] p-4 sm:p-8 lg:p-12">
        <BubbleBackground />

        {/* Grille 2 colonnes principale */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 xl:gap-12 items-center">
          {/* Colonne de gauche : Badge, Titre, Sous-titre, 2 Boutons, Images avec étoiles */}
          <div className="lg:col-span-6 xl:col-span-6 flex flex-col items-start text-left">
            {/* Badge */}
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-black/[0.08] bg-black/[0.03] px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.08em] text-[#5c5c64] shadow-2xs sm:text-xs">
              <span className="text-[#0FAC71]" aria-hidden="true">✦</span>
              Agence Web &amp; SEO — Grenoble &amp; France
            </span>

            {/* Titre principal H1 avec mot rotatif */}
            <h1 className="mb-4 font-display text-3xl font-extrabold leading-[1.08] tracking-tight text-black sm:text-4xl md:text-5xl lg:text-[3.25rem] xl:text-[3.5rem] sm:leading-[1.05]">
              <span className="block">On développe votre</span>
              <RotatingWord words={HERO_WORDS} />
            </h1>

            {/* Sous-titre descriptif */}
            <p className="mb-6 max-w-xl text-sm leading-relaxed text-[#5c5c64] sm:text-base lg:text-[1.05rem]">
              Création de sites internet sur-mesure (Next.js), référencement naturel (SEO)
              haute performance et automatisations intelligentes pour propulser votre croissance et générer des leads qualifiés en continu.
            </p>

            {/* Les deux boutons CTA */}
            <div className="mb-7 flex flex-wrap items-center gap-3 sm:gap-4">
              <button
                type="button"
                data-cal-namespace="30min"
                data-cal-link="jean-prosper-dsljpi/30min"
                data-cal-config='{"layout":"month_view","useSlotsViewOnSmallScreen":"true","theme":"light"}'
                className="inline-flex items-center gap-2.5 rounded-full border border-black bg-black py-2.5 pl-2.5 pr-6 text-sm font-semibold text-white shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#1a1a20] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2 sm:text-base cursor-pointer"
              >
                <span className="flex h-6 w-6 sm:h-7 sm:w-7 items-center justify-center rounded-full bg-brand-orange text-white">
                  <svg width="10" height="10" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 3L10 8L5 13" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M9 3L14 8L9 13" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                Prendre un RDV offert
              </button>

              <a
                href="/#creations"
                className="inline-flex items-center gap-2.5 rounded-full border border-black/10 bg-white/80 backdrop-blur-xs py-2.5 pl-2.5 pr-6 text-sm font-semibold text-black transition-all duration-300 hover:-translate-y-0.5 hover:bg-black/[0.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2 sm:text-base shadow-2xs"
              >
                <span className="flex h-6 w-6 sm:h-7 sm:w-7 items-center justify-center rounded-full bg-brand-orange text-white">
                  <svg width="10" height="10" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.596 8.697l-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z" />
                  </svg>
                </span>
                Voir nos réalisations
              </a>
            </div>

            {/* Images avec étoiles (Social Proof / avis clients) */}
            <div className="pt-1">
              <HeroSocialProof />
            </div>
          </div>

          {/* Colonne de droite : Slider 2 colonnes légèrement inclinées (effet premium) avec overflow-visible */}
          <div className="lg:col-span-6 xl:col-span-6 relative w-full flex items-center justify-center overflow-visible">
            <HeroTiltedPortfolio />
          </div>
        </div>

        {/* En bas des colonnes 1 et 2 : Slider infini des logos partenaires et technologies */}
        <div className="relative z-10 w-full mt-10 pt-8 sm:mt-12 sm:pt-10 border-t border-black/[0.06]">
          <p className="mb-5 text-center text-xs font-semibold uppercase tracking-[0.14em] text-[#5c5c64]/80">
            Technologies &amp; Partenaires clés
          </p>
          <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent_0%,black_15%,black_85%,transparent_100%)]">
            <div className="flex w-max animate-[partnerLogos_35s_linear_infinite] hover:[animation-play-state:paused] items-center">
              <PartnerLogosTrack />
              <PartnerLogosTrack duplicate />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroPublic;
