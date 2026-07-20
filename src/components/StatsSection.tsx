'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, BarChart3, Rocket, Activity, CheckCircle2 } from 'lucide-react';

export function StatsSection() {
  return (
    <section id="results" className="py-20 bg-stone-50/90 dark:bg-[#07090E]/80 relative border-t border-b border-zinc-200 dark:border-white/5 transition-colors duration-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Texte de gauche */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-orange-600 dark:text-orange-400 uppercase tracking-widest mb-3">
              <Rocket className="w-4 h-4" />
              <span>Accélération Mesurable</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white leading-tight">
              Découvrez votre voie vers une <br />
              <span className="orange-gradient-text">Croissance Exponentielle x10</span>
            </h2>
            <p className="mt-4 text-zinc-600 dark:text-zinc-300 text-base leading-relaxed">
              Nous combinons le SEO prédictif, l'intelligence artificielle et l'automatisation avancée pour aider les scale-ups et entreprises leaders à multiplier leur taux de conversion tout en réduisant leurs coûts d'acquisition de 50%.
            </p>

            <ul className="mt-8 space-y-3">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-orange-500 dark:text-orange-400 shrink-0 mt-0.5" />
                <span className="text-zinc-700 dark:text-zinc-300 text-sm">Pipelines de leads à haute conversion et attribution prédictive.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-orange-500 dark:text-orange-400 shrink-0 mt-0.5" />
                <span className="text-zinc-700 dark:text-zinc-300 text-sm">Segmentation d'audience par IA et reciblage automatisé.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-orange-500 dark:text-orange-400 shrink-0 mt-0.5" />
                <span className="text-zinc-700 dark:text-zinc-300 text-sm">Tableau de bord de télémétrie KPI en temps réel avec SLA 99.9%.</span>
              </li>
            </ul>

            <div className="mt-8">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 text-orange-400 font-bold hover:text-orange-300 transition-colors group"
              >
                <span>Explorer le Moteur de Revenu WebModernSEO</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>
          </motion.div>

          {/* Carte Widget Tableau de Bord (Droite) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            {/* Halo lumineux arrière */}
            <div className="absolute -inset-1 bg-gradient-to-r from-orange-600/30 to-amber-500/20 rounded-3xl blur-xl" />

            <div className="relative card-dark rounded-2xl p-6 border border-zinc-800 space-y-6">
              {/* En-tête de carte */}
              <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-orange-500/15 border border-orange-500/30 flex items-center justify-center">
                    <BarChart3 className="w-5 h-5 text-orange-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-sm">Télémétrie des Revenus</h3>
                    <p className="text-xs text-zinc-400">Performance Trimestrielle</p>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
                  +342.8% Annuel
                </span>
              </div>

              {/* Grille de stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800">
                  <span className="text-xs text-zinc-400">Revenu Récurrent Mensuel (MRR)</span>
                  <div className="text-2xl font-extrabold text-white mt-1">284 500 €</div>
                  <div className="flex items-center gap-1 text-emerald-400 text-xs mt-1">
                    <Activity className="w-3.5 h-3.5" />
                    <span>+18.4% ce mois-ci</span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800">
                  <span className="text-xs text-zinc-400">Valeur Vie Client (LTV)</span>
                  <div className="text-2xl font-extrabold text-white mt-1">14 280 €</div>
                  <div className="flex items-center gap-1 text-emerald-400 text-xs mt-1">
                    <Activity className="w-3.5 h-3.5" />
                    <span>Ratio LTV:CAC de 3.8x</span>
                  </div>
                </div>
              </div>

              {/* Barre de progression */}
              <div className="p-4 rounded-xl bg-zinc-900/40 border border-zinc-800 space-y-3">
                <div className="flex justify-between text-xs">
                  <span className="text-zinc-300 font-medium">Vitesse de Conversion SEO</span>
                  <span className="text-orange-400 font-bold">92% Optimal</span>
                </div>
                <div className="w-full bg-zinc-800 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 h-2 rounded-full"
                    style={{ width: '92%' }}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
