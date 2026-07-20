'use client';

import React from 'react';

const LOGOS = [
  'Microsoft',
  'Stripe',
  'Vercel',
  'Shopify',
  'Snowflake',
  'Salesforce',
  'HubSpot',
  'Linear',
];

export function LogosMarquee() {
  return (
    <section className="py-12 border-b border-zinc-200 dark:border-white/5 bg-[#FAF8F5] dark:bg-[#050609] transition-colors duration-400">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <p className="text-xs uppercase tracking-widest text-zinc-500 dark:text-zinc-400 font-semibold mb-8">
          PLUS DE 500 ENTREPRISES ET LEADERS DU MARCHÉ NOUS FONT CONFIANCE
        </p>

        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
          {LOGOS.map((logo, idx) => (
            <span
              key={idx}
              className="text-lg md:text-xl font-bold tracking-tight text-zinc-700 dark:text-zinc-300 hover:text-orange-500 dark:hover:text-orange-400 transition-colors"
            >
              {logo}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
