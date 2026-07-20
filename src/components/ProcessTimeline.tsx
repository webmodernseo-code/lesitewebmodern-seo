'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Compass, Cpu, Layers, Rocket } from 'lucide-react';

const STEPS = [
  {
    icon: Compass,
    title: 'Audit de Télémétrie & SEO',
    description: 'Nous réalisons un audit complet à 360° de votre tunnel de vente, de votre référencement naturel et de vos analytics pour identifier immédiatement les leviers de croissance à fort impact.',
  },
  {
    icon: Cpu,
    title: 'Blueprint Stratégique IA & Conversion',
    description: 'Conception sur-mesure de l\'architecture de croissance combinant attribution multi-canaux, copywriting haute conversion et segmentation d\'audience intelligente.',
  },
  {
    icon: Layers,
    title: 'Déploiement Systémique Rapide (7j)',
    description: 'Notre squad d\'ingénieurs déploie les scripts de suivi, les séquences de reciblage automatisé et les landing pages optimisées en seulement 7 jours ouvrés.',
  },
  {
    icon: Rocket,
    title: 'Optimisation & Scaling x10',
    description: 'Tests A/B multivariés quotidiens et montée en puissance budgétaire pour garantir la réduction constante de votre coût d\'acquisition client mois après mois.',
  },
];

export function ProcessTimeline() {
  return (
    <section id="process" className="py-24 bg-[#FAF8F5] dark:bg-[#050609] relative transition-colors duration-400">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-orange-600 dark:text-orange-400 uppercase tracking-widest mb-3">
            <Sparkles className="w-4 h-4" />
            <span>Exécution Structurée WebModernSEO</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-zinc-900 dark:text-white leading-tight">
            Notre Processus Éprouvé <br />
            <span className="orange-gradient-text">Vers le Succès</span>
          </h2>
          <p className="mt-4 text-zinc-600 dark:text-zinc-300 text-base">
            Un cadre clair en 4 étapes conçu pour éliminer les risques et maximiser la vitesse de conversion.
          </p>
        </div>

        {/* Ligne chronologique */}
        <div className="relative">
          {/* Ligne centrale orange */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-orange-500 via-amber-500 to-transparent -translate-x-1/2 shadow-[0_0_15px_rgba(249,115,22,0.5)]" />

          <div className="space-y-12 md:space-y-16">
            {STEPS.map((s, idx) => {
              const Icon = s.icon;
              const isEven = idx % 2 === 0;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className={`flex flex-col md:flex-row items-center ${
                    isEven ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  <div className="w-full md:w-1/2 p-4">
                    <div className="card-theme card-theme-hover rounded-2xl p-8 border border-zinc-200 dark:border-zinc-800/80 relative">
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-10 h-10 rounded-xl bg-orange-500/15 border border-orange-500/30 flex items-center justify-center text-orange-500 dark:text-orange-400">
                          <Icon className="w-5 h-5" />
                        </div>
                        <span className="text-xs font-extrabold tracking-wider text-orange-600 dark:text-orange-400 bg-orange-500/10 px-2.5 py-1 rounded-full border border-orange-500/20">
                          ÉTAPE 0{idx + 1}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">{s.title}</h3>
                      <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">{s.description}</p>
                    </div>
                  </div>

                  {/* Nœud central */}
                  <div className="hidden md:flex w-10 h-10 rounded-full bg-black border-2 border-orange-500 items-center justify-center text-orange-400 text-xs font-extrabold shrink-0 z-10 shadow-lg shadow-orange-500/30 my-4 md:my-0">
                    {idx + 1}
                  </div>

                  <div className="w-full md:w-1/2" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
