import React from 'react';

export const CtaPublic: React.FC = () => {
  return (
    <section className="w-full bg-brand-charcoal">
      <div className="mx-auto flex max-w-3xl flex-col items-center px-6 py-20 text-center sm:py-24">
        <h2 className="mb-4 font-display text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl md:text-5xl">
          Prêt à attirer de <span className="text-brand-orange">nouveaux clients</span> ?
        </h2>
        <p className="mb-9 max-w-xl text-base font-medium leading-relaxed text-white/70 sm:text-lg">
          Propulsez votre visibilité sur Google et convertissez vos visiteurs en prospects qualifiés dès ce mois-ci.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href="/contact"
            className="inline-flex items-center gap-3 rounded-full bg-brand-orange py-2.5 pl-2.5 pr-6 text-base font-semibold text-black shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-orangeLight focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-brand-charcoal"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-brand-orange">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4.5 3L9.5 8L4.5 13" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M8.5 3L13.5 8L8.5 13" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            Lancer votre croissance
          </a>

          <a
            href="/#services"
            className="inline-flex items-center gap-3 rounded-full border border-white/20 py-2.5 pl-2.5 pr-6 text-base font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-brand-charcoal"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-orange text-white">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M3.5 2.5L9.5 6L3.5 9.5V2.5Z" />
              </svg>
            </span>
            Comment ça marche
          </a>
        </div>
      </div>
    </section>
  );
};
