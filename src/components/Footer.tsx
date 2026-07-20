'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  Sparkles, 
  MessageSquare, 
  Mail,
  ShieldCheck
} from 'lucide-react';
import { LiquidMetalButton } from './ui/liquid-metal-button';

export function Footer() {
  return (
    <footer className="relative bg-[#FAF6EE] dark:bg-[#030407] border-t border-orange-500/15 dark:border-white/10 pt-20 pb-12 text-zinc-700 dark:text-zinc-400 text-sm font-sans overflow-hidden transition-colors duration-400">
      {/* Glow d'arrière-plan d'ambiance orange/ambre */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-orange-500/10 dark:bg-orange-600/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-[400px] h-[250px] bg-amber-400/10 dark:bg-amber-500/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Motif de grille subtil adaptatif */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000005_1px,transparent_1px),linear-gradient(to_bottom,#00000005_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Bannière CTA intégrée ultra-premium */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl p-8 md:p-12 mb-20 overflow-hidden bg-white/90 dark:bg-gradient-to-b dark:from-zinc-900/90 dark:to-zinc-950/90 border border-orange-500/30 backdrop-blur-xl shadow-xl dark:shadow-2xl shadow-orange-500/10"
        >
          {/* Lignes de lumière en arrière-plan */}
          <div className="absolute top-0 right-0 -mt-12 -mr-12 w-64 h-64 bg-orange-500/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-64 h-64 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-2xl text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-600 dark:text-orange-400 text-xs font-semibold uppercase tracking-wider mb-4">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Accélération IA & SEO 2026</span>
              </div>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-zinc-900 dark:text-white tracking-tight leading-tight font-sans">
                Prêt à décupler la croissance de votre entreprise ?
              </h3>
              <p className="mt-3 text-zinc-600 dark:text-zinc-300 text-sm sm:text-base leading-relaxed font-sans">
                Rejoignez plus de 500+ leaders du marché qui utilisent WebModernSEO pour automatiser leur acquisition organique et dominer leur secteur.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0">
              <LiquidMetalButton
                label="Démarrer l'essai gratuit de 14 jours"
                onClick={() => {
                  const el = document.getElementById('contact');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
              />
            </div>
          </div>
        </motion.div>

        {/* Grille Principale du Footer */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-10 pb-16 border-b border-zinc-200 dark:border-white/10">
          
          {/* Colonne Marque & Newsletter (Spans 2 cols) */}
          <div className="md:col-span-2 space-y-6">
            <Link href="/" className="inline-flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-orange-600 via-orange-500 to-amber-400 flex items-center justify-center text-black font-black shadow-lg shadow-orange-500/30">
                <span className="text-sm tracking-tighter text-black font-black">WM</span>
              </div>
              <span className="text-2xl font-extrabold tracking-tight text-zinc-900 dark:text-white font-sans">
                WebModern<span className="text-orange-500">SEO</span>
              </span>
            </Link>
            
            <p className="text-zinc-600 dark:text-zinc-400 text-xs leading-relaxed max-w-sm font-sans">
              La plateforme de référence en ingénierie SEO et automatisation par IA pour SaaS et entreprises en forte croissance.
            </p>

            {/* Newsletter */}
            <div className="pt-2">
              <label className="text-xs text-zinc-700 dark:text-zinc-300 block mb-2.5 font-semibold uppercase tracking-wider font-sans">
                Newsletter Stratégique Hebdomadaire
              </label>
              <form onSubmit={(e) => e.preventDefault()} className="flex items-center gap-2 max-w-sm">
                <div className="relative w-full">
                  <Mail className="w-4 h-4 text-zinc-400 dark:text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    placeholder="votre.email@entreprise.com"
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white dark:bg-zinc-900/90 border border-zinc-300 dark:border-zinc-800 text-zinc-900 dark:text-white text-xs placeholder:text-zinc-400 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all font-sans shadow-sm"
                  />
                </div>
                <button 
                  type="submit"
                  className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-black font-extrabold text-xs hover:scale-105 hover:shadow-lg hover:shadow-orange-500/30 transition-all shrink-0 font-sans"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </div>

            {/* Statut du système */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-medium">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>Tous les systèmes sont opérationnels (99.99%)</span>
            </div>
          </div>

          {/* Produit */}
          <div>
            <h4 className="text-zinc-900 dark:text-white font-bold text-xs uppercase tracking-wider mb-5 font-sans">Produit</h4>
            <ul className="space-y-3 text-xs">
              <li>
                <Link href="#features" className="hover:text-orange-500 transition-colors">
                  Moteur IA & SEO
                </Link>
              </li>
              <li>
                <Link href="#results" className="hover:text-orange-500 transition-colors">
                  Télémétrie en Direct
                </Link>
              </li>
              <li>
                <Link href="#work" className="hover:text-orange-500 transition-colors">
                  Cas d'Études Clients
                </Link>
              </li>
              <li>
                <Link href="#pricing" className="hover:text-orange-500 transition-colors">
                  Formules Tarifaires
                </Link>
              </li>
              <li>
                <a href="#" className="hover:text-orange-500 transition-colors flex items-center gap-1.5">
                  <span>Changelog v2.4</span>
                  <span className="px-1.5 py-0.5 rounded text-[10px] bg-orange-500/20 text-orange-600 dark:text-orange-400 font-semibold">Nouveau</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Solutions */}
          <div>
            <h4 className="text-zinc-900 dark:text-white font-bold text-xs uppercase tracking-wider mb-5 font-sans">Solutions</h4>
            <ul className="space-y-3 text-xs">
              <li>
                <a href="#" className="hover:text-orange-500 transition-colors">
                  Scale-ups SaaS
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-500 transition-colors">
                  Entreprises B2B
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-500 transition-colors">
                  Fintech & IA
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-500 transition-colors">
                  Tech E-Commerce
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-500 transition-colors">
                  Agences SEO & Média
                </a>
              </li>
            </ul>
          </div>

          {/* Ressources */}
          <div>
            <h4 className="text-zinc-900 dark:text-white font-bold text-xs uppercase tracking-wider mb-5 font-sans">Ressources</h4>
            <ul className="space-y-3 text-xs">
              <li>
                <a href="#" className="hover:text-orange-500 transition-colors">
                  Documentation API
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-500 transition-colors">
                  Guide SEO & IA 2026
                </a>
              </li>
              <li>
                <Link href="#blog" className="hover:text-orange-500 transition-colors">
                  Blog & Articles
                </Link>
              </li>
              <li>
                <a href="#" className="hover:text-orange-500 transition-colors">
                  Communauté Discord
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-500 transition-colors">
                  Centre d'Aide
                </a>
              </li>
            </ul>
          </div>

          {/* Entreprise */}
          <div>
            <h4 className="text-zinc-900 dark:text-white font-bold text-xs uppercase tracking-wider mb-5 font-sans">Entreprise</h4>
            <ul className="space-y-3 text-xs">
              <li>
                <a href="#" className="hover:text-orange-500 transition-colors">
                  À Propos
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-500 transition-colors flex items-center gap-1.5">
                  <span>Carrières</span>
                  <span className="px-1.5 py-0.5 rounded text-[10px] bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-semibold">On recrute</span>
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-500 transition-colors">
                  Presse & Kit Média
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-500 transition-colors">
                  Partenaires
                </a>
              </li>
              <li>
                <Link href="#contact" className="hover:text-orange-500 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Pied de page bas : Copyright, liens et réseaux sociaux */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-zinc-500 gap-6 font-sans">
          <p>© {new Date().getFullYear()} WebModernSEO SAS. Tous droits réservés.</p>
          
          <div className="flex flex-wrap items-center justify-center gap-6">
            <a href="#" className="hover:text-zinc-900 dark:hover:text-zinc-300 transition-colors">
              Politique de Confidentialité
            </a>
            <a href="#" className="hover:text-zinc-900 dark:hover:text-zinc-300 transition-colors">
              Mentions Légales
            </a>
            <a href="#" className="hover:text-zinc-900 dark:hover:text-zinc-300 transition-colors">
              Gestion des Cookies
            </a>
            <a href="#" className="hover:text-zinc-900 dark:hover:text-zinc-300 transition-colors flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-zinc-400" />
              <span>Conformité SOC2</span>
            </a>
          </div>

          {/* Réseaux sociaux */}
          <div className="flex items-center gap-3">
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Twitter"
              className="w-8 h-8 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-zinc-600 dark:text-zinc-400 hover:text-orange-500 hover:border-orange-500/40 hover:scale-110 transition-all shadow-sm"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="w-8 h-8 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-zinc-600 dark:text-zinc-400 hover:text-orange-500 hover:border-orange-500/40 hover:scale-110 transition-all shadow-sm"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
              </svg>
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="w-8 h-8 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-zinc-600 dark:text-zinc-400 hover:text-orange-500 hover:border-orange-500/40 hover:scale-110 transition-all shadow-sm"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.72a1.47 1.47 0 1 0 0 2.94 1.47 1.47 0 0 0 0-2.94z"/>
              </svg>
            </a>
            <a
              href="https://discord.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Discord"
              className="w-8 h-8 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-zinc-600 dark:text-zinc-400 hover:text-orange-500 hover:border-orange-500/40 hover:scale-110 transition-all shadow-sm"
            >
              <MessageSquare className="w-4 h-4" />
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
