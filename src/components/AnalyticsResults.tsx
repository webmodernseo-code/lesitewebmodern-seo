'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, ArrowUpRight, ShieldCheck } from 'lucide-react';

export function AnalyticsResults() {
  return (
    <section className="py-24 bg-[#FAF8F5] dark:bg-[#050609] relative transition-colors duration-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Graphiques visuels de gauche */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="card-theme rounded-2xl p-6 border border-zinc-200 dark:border-zinc-800 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-zinc-700 dark:text-zinc-300 font-medium">Croissance du Pipeline Trimestriel</span>
                <span className="px-2.5 py-1 rounded-full bg-orange-500/15 text-orange-600 dark:text-orange-400 text-xs font-bold border border-orange-500/30">
                  +410% de Croissance
                </span>
              </div>
              <div className="text-4xl font-extrabold text-zinc-900 dark:text-white">12,8M €</div>
              <div className="w-full bg-zinc-200 dark:bg-zinc-800 rounded-full h-3 overflow-hidden">
                <div className="bg-gradient-to-r from-orange-500 via-amber-500 to-orange-400 h-3 rounded-full w-[88%]" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="card-theme rounded-xl p-5 border border-zinc-200 dark:border-zinc-800">
                <div className="text-xs text-zinc-500 dark:text-zinc-400">ROAS Moyen Réalisé</div>
                <div className="text-3xl font-extrabold text-zinc-900 dark:text-white mt-1">6.4x</div>
                <div className="text-xs text-emerald-600 dark:text-emerald-400 mt-1">Audit Indépendant Vérifié</div>
              </div>
              <div className="card-theme rounded-xl p-5 border border-zinc-200 dark:border-zinc-800">
                <div className="text-xs text-zinc-500 dark:text-zinc-400">Coût Par Acquisition (CPA)</div>
                <div className="text-3xl font-extrabold text-zinc-900 dark:text-white mt-1">-54.2%</div>
                <div className="text-xs text-emerald-600 dark:text-emerald-400 mt-1">Gain d'Optimisation</div>
              </div>
            </div>
          </motion.div>

          {/* Contenu textuel de droite */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-orange-600 dark:text-orange-400 uppercase tracking-widest mb-3">
              <TrendingUp className="w-4 h-4" />
              <span>Impact Éprouvé WebModernSEO</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-zinc-900 dark:text-white leading-tight">
              Nos Résultats <br />
              <span className="orange-gradient-text">En Action</span>
            </h2>
            <p className="mt-4 text-zinc-600 dark:text-zinc-300 text-base leading-relaxed">
              Nous ne promettons pas seulement la croissance : nous l'ingénions. Les portefeuilles de nos clients enregistrent une expansion continue soutenue par une transparence totale des données en direct.
            </p>

            <div className="mt-8 space-y-4">
              <div className="p-4 rounded-xl bg-white/80 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 flex items-start gap-4 shadow-sm">
                <ShieldCheck className="w-6 h-6 text-orange-500 dark:text-orange-400 shrink-0 mt-1" />
                <div>
                  <h4 className="text-zinc-900 dark:text-white font-bold text-base">Seuils de ROI Garantis</h4>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1">
                    Nous lions nos primes de performance à des KPI stricts pour aligner nos objectifs avec la rentabilité de votre entreprise.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <a
                href="#pricing"
                className="inline-flex items-center gap-2 text-orange-400 font-bold hover:text-orange-300 transition-colors group"
              >
                <span>Consulter les études de cas</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
