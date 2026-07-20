'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, TrendingUp, ShieldCheck, Zap } from 'lucide-react';
import { LiquidMetalButton } from './ui/liquid-metal-button';

export function Hero() {
  return (
    <section className="relative pt-32 pb-20 md:pt-44 md:pb-32 overflow-hidden flex flex-col items-center justify-center text-center font-sans transition-colors duration-400">
      {/* Background Radial Glow Orange WebModernSEO */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-orange-500/15 dark:bg-orange-600/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[450px] h-[450px] bg-amber-400/20 dark:bg-amber-500/10 rounded-full blur-[110px] pointer-events-none" />

      {/* Grid Pattern overlay adaptatif */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Badge supérieur */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/10 dark:bg-zinc-900/90 border border-orange-500/30 text-orange-600 dark:text-orange-400 text-xs font-semibold uppercase tracking-wider mb-8 shadow-md dark:shadow-lg dark:shadow-orange-500/15"
        >
          <Sparkles className="w-3.5 h-3.5 text-orange-500 dark:text-orange-400" />
          <span>Plateforme de Croissance WebModernSEO</span>
        </motion.div>

        {/* Titre principal */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-zinc-900 dark:text-white leading-[1.1] font-sans"
        >
          DÉVELOPPEZ VOTRE ENTREPRISE <br />
          <span className="orange-gradient-text drop-shadow-[0_10px_35px_rgba(249,115,22,0.35)]">
            CROISSANCE x10
          </span>
        </motion.h1>

        {/* Sous-titre */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 text-lg sm:text-xl text-zinc-600 dark:text-zinc-300 max-w-2xl mx-auto leading-relaxed font-sans"
        >
          Multipliez votre chiffre d'affaires, automatisez vos workflows et dominez votre secteur grâce à notre architecture stratégique SEO & IA conçue pour les leaders du marché.
        </motion.p>

        {/* Bouton d'action WebGL Liquid Metal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 flex items-center justify-center gap-4"
        >
          <LiquidMetalButton
            label="Démarrer l'essai gratuit de 14 jours"
            onClick={() => {
              const el = document.getElementById('contact');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
          />
        </motion.div>

        {/* Statistiques en surbrillance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-3 gap-6 pt-10 border-t border-zinc-200 dark:border-white/10 max-w-3xl mx-auto"
        >
          <div className="flex items-center justify-center gap-3">
            <TrendingUp className="w-5 h-5 text-orange-500 dark:text-orange-400" />
            <div className="text-left">
              <div className="text-lg font-bold text-zinc-900 dark:text-white font-sans">+$42M</div>
              <div className="text-xs text-zinc-500 dark:text-zinc-400 font-sans">Revenus Générés</div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3">
            <Zap className="w-5 h-5 text-orange-500 dark:text-orange-400" />
            <div className="text-left">
              <div className="text-lg font-bold text-zinc-900 dark:text-white font-sans">99.8%</div>
              <div className="text-xs text-zinc-500 dark:text-zinc-400 font-sans">Automatisation SEO & Workflows</div>
            </div>
          </div>

          <div className="col-span-2 md:col-span-1 flex items-center justify-center gap-3">
            <ShieldCheck className="w-5 h-5 text-orange-500 dark:text-orange-400" />
            <div className="text-left">
              <div className="text-lg font-bold text-zinc-900 dark:text-white font-sans">500+</div>
              <div className="text-xs text-zinc-500 dark:text-zinc-400 font-sans">Entreprises Accompagnées</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
