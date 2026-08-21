import React from 'react';

export const CtaPublic: React.FC = () => {
  return (
    <section className="w-full bg-white px-3 py-10 sm:px-6 sm:py-16">
      <div className="mx-auto flex max-w-[1400px] flex-col items-center rounded-[32px] border border-black/5 bg-gradient-to-br from-brand-sable via-white to-brand-sable px-6 py-16 text-center shadow-soft sm:px-10 sm:py-20">
        <h2 className="mb-4 font-display text-3xl font-extrabold leading-tight tracking-tight text-black sm:text-4xl md:text-5xl">
          Prêt à attirer de <span className="text-brand-orange">nouveaux clients</span> ?
        </h2>
        <p className="mb-9 max-w-xl text-base font-medium leading-relaxed text-[#5c5c64] sm:text-lg">
          Propulsez votre visibilité sur Google et convertissez vos visiteurs en prospects qualifiés dès ce mois-ci.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href="/contact"
            className="inline-flex items-center gap-3 rounded-full border border-black bg-black py-2.5 pl-2.5 pr-6 text-base font-semibold text-white shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:bg-black/85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-orange text-white">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4.5 3L9.5 8L4.5 13" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M8.5 3L13.5 8L8.5 13" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            Lancer votre croissance
          </a>

          <a
            href="/#services"
            className="inline-flex items-center gap-3 rounded-full border border-black/10 bg-white py-2.5 pl-2.5 pr-6 text-base font-semibold text-black transition-all duration-300 hover:-translate-y-0.5 hover:bg-black/[0.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
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
