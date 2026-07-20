'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowUpRight } from 'lucide-react';

const PORTFOLIO_ITEMS = [
  {
    image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80',
    category: 'Scale-up Fintech',
    title: 'Acquisition Multi-Canaux & SEO pour PayPulse',
    metric: '+380% Croissance MRR',
  },
  {
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    category: 'Infrastructure IA',
    title: 'Architecture de Funnel Enterprise pour HyperData',
    metric: 'LTV Multipliée par 4.8x',
  },
  {
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
    category: 'Plateforme SaaS',
    title: 'Expansion Internationale & SEO pour CloudCore',
    metric: '+14.2M € ARR Ajoutés',
  },
  {
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80',
    category: 'Tech E-Commerce',
    title: 'Optimisation de la Rétention pour LuxaGlobal',
    metric: '-62% Taux de Churn',
  },
];

export function PortfolioGrid() {
  return (
    <section id="work" className="py-24 bg-stone-50/90 dark:bg-[#07090E] relative border-t border-b border-zinc-200 dark:border-white/5 transition-colors duration-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-orange-600 dark:text-orange-400 uppercase tracking-widest mb-3">
            <Sparkles className="w-4 h-4" />
            <span>Success Stories Éprouvées</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-zinc-900 dark:text-white leading-tight">
            Cas d'Études & <span className="orange-gradient-text">Projets Réalisés</span>
          </h2>
          <p className="mt-4 text-zinc-600 dark:text-zinc-300 text-base">
            Découvrez comment WebModernSEO transforme des entreprises ambitieuses en leaders incontestés de leur secteur.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {PORTFOLIO_ITEMS.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="card-theme card-theme-hover rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800/80 group cursor-pointer"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover filter brightness-90 group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 dark:from-[#0D0F17] via-transparent to-transparent" />
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/10 text-xs font-semibold text-orange-400">
                  {item.category}
                </div>
                <div className="absolute bottom-4 right-4 px-3 py-1 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 text-black text-xs font-extrabold shadow-lg">
                  {item.metric}
                </div>
              </div>

              <div className="p-6 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-zinc-900 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-300 transition-colors">
                    {item.title}
                  </h3>
                </div>
                <div className="w-9 h-9 rounded-full bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center text-zinc-700 dark:text-zinc-300 group-hover:bg-orange-500 group-hover:text-black transition-colors">
                  <ArrowUpRight className="w-5 h-5" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
