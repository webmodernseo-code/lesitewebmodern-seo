import React from 'react';

// TODO(pre-launch): valeur fictive à remplacer par le vrai chiffre client avant mise en ligne — ne pas déployer en prod sans données réelles.
const HERO_PROOF_STAT = '1 482 leads générés ce mois pour nos clients';

export const HeroPublic: React.FC = () => {
  return (
    <section className="w-full bg-gradient-to-b from-brand-sable/60 to-white">
      <div className="mx-auto flex max-w-3xl flex-col items-center px-6 py-24 text-center sm:py-32">
        <span className="mb-6 block animate-fadeIn [animation-fill-mode:both] text-xs font-semibold uppercase tracking-[0.15em] text-brand-charcoal motion-reduce:animate-none">
          Agence Web &amp; SEO — Grenoble
        </span>

        <h1
          className="mb-6 font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-black sm:text-5xl md:text-6xl"
        >
          Attirez plus de clients avec{' '}
          <span className="bg-gradient-to-br from-brand-orangeLight to-brand-orange bg-clip-text text-transparent">
            webmoderne
          </span>
          <span className="ml-1 inline-block rounded-full bg-gradient-to-br from-[#0FAC71] to-[#1B9476] px-3 py-0.5 align-middle text-[0.55em] font-bold text-white">
            seo
          </span>
        </h1>

        <p
          className="mb-9 max-w-xl animate-fadeIn [animation-fill-mode:both] text-base leading-relaxed text-[#5c5c64] motion-reduce:animate-none sm:text-lg"
          style={{ animationDelay: '150ms' }}
        >
          Agence basée à Grenoble : création de sites internet sur-mesure (Next.js), référencement naturel (SEO)
          haute performance, publicité Meta Ads et automatisations intelligentes pour générer des leads en continu.
        </p>

        <div
          className="mb-8 flex animate-fadeIn [animation-fill-mode:both] flex-wrap items-center justify-center gap-4 motion-reduce:animate-none"
          style={{ animationDelay: '220ms' }}
        >
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

        <div
          className="inline-flex animate-fadeIn [animation-fill-mode:both] items-center gap-2 rounded-full border border-black/10 bg-white px-4 py-2 text-xs font-semibold text-black shadow-soft motion-reduce:animate-none"
          style={{ animationDelay: '320ms' }}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-[#22c55e]" aria-hidden="true" />
          {HERO_PROOF_STAT}
        </div>
      </div>
    </section>
  );
};
