'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowUpRight, Calendar } from 'lucide-react';

const ARTICLES = [
  {
    title: 'Le Playbook Unit Economics SaaS 2026 : Passer de 1M € à 10M € de ARR',
    category: 'Stratégie de Croissance',
    date: '18 Janvier 2026',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80',
  },
  {
    title: 'Pourquoi la Recherche Payante Classique S\'éteint (Et Comment le SEO IA Gagne)',
    category: 'Marketing par IA',
    date: '12 Janvier 2026',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80',
  },
  {
    title: 'Ingénierie d\'Attribution Multi-Touch : Débloquer le Vrai ROI du Funnel B2B',
    category: 'Télémétrie & Analytics',
    date: '05 Janvier 2026',
    image: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=600&q=80',
  },
  {
    title: 'SaaS SEO & Content Engineering : Automatiser la Génération de Leads Qualifiés',
    category: 'Ingénierie SEO',
    date: '02 Janvier 2026',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80',
  },
];

export function BlogSection() {
  return (
    <section className="py-24 bg-[#07090E] relative border-t border-b border-white/5 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-orange-400 uppercase tracking-widest mb-3">
            <Sparkles className="w-4 h-4" />
            <span>Leader d'Opinion WebModernSEO</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white leading-tight">
            Derniers Articles & <span className="orange-gradient-text">Insights</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {ARTICLES.map((art, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="card-dark card-dark-hover rounded-2xl overflow-hidden border border-zinc-800/80 group cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={art.image}
                    alt={art.title}
                    className="w-full h-full object-cover filter brightness-90 group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/10 text-xs font-semibold text-orange-400">
                    {art.category}
                  </div>
                </div>

                <div className="p-5">
                  <div className="flex items-center gap-2 text-xs text-zinc-400 mb-2.5">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{art.date}</span>
                  </div>
                  <h3 className="text-sm font-bold text-white group-hover:text-orange-300 transition-colors leading-snug">
                    {art.title}
                  </h3>
                </div>
              </div>

              <div className="px-5 pb-5 pt-0 flex items-center gap-1.5 text-xs font-semibold text-orange-400 group-hover:text-orange-300">
                <span>Lire l'analyse</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
