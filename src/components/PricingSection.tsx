'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Sparkles } from 'lucide-react';
import { LiquidMetalButton } from './ui/liquid-metal-button';

export function PricingSection() {
  const [annual, setAnnual] = useState(true);

  const PLANS = [
    {
      name: 'Starter Croissance',
      price: annual ? '1 490 €' : '1 890 €',
      period: '/mois',
      description: 'Idéal pour les startups en forte croissance recherchant une validation rapide du marché.',
      features: [
        'Audit complet de télémétrie & SEO',
        'Jusqu\'à 3 canaux d\'acquisition gérés',
        'Générateur de contenu IA WebModernSEO',
        'Optimisation de conversion hebdomadaire',
        'Support dédié par Email & Slack',
      ],
      popular: false,
      cta: 'Choisir le Plan Starter',
    },
    {
      name: 'Enterprise x10',
      price: annual ? '3 990 €' : '4 990 €',
      period: '/mois',
      description: 'Conçu pour les scale-ups & leaders visant une capitalisation ARR multipliée par 10.',
      features: [
        'Tout le contenu du Plan Starter',
        'Canaux d\'acquisition & SEO illimités',
        'Squad senior dédiée WebModernSEO',
        'Moteur d\'attribution multi-touch',
        'Ingénierie de tunnel de vente sur-mesure',
        'SLA prioritaire 24/7 & Canal Slack privé',
      ],
      popular: true,
      cta: 'Démarrer la Croissance x10',
    },
    {
      name: 'Dominance Sur-Mesure',
      price: 'Sur Devis',
      period: '',
      description: 'Architecture d\'accélération de revenus personnalisée pour grandes entreprises & Fortune 500.',
      features: [
        'Exécution stratégique clé en main',
        'Modèles d\'apprentissage automatique personnalisés',
        'Campagnes SEO & Marketing multi-langues',
        'Conseil exécutif dédié WebModernSEO',
        'SLA contractualisé avec ROI garanti',
      ],
      popular: false,
      cta: 'Contacter l\'Équipe Commerciale',
    },
  ];

  return (
    <section id="pricing" className="py-24 relative transition-colors duration-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-orange-600 dark:text-orange-400 uppercase tracking-widest mb-3">
            <Sparkles className="w-4 h-4" />
            <span>Investissement Transparent</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-zinc-900 dark:text-white leading-tight">
            Le Bon Plan <br />
            <span className="orange-gradient-text">Pour Votre Entreprise</span>
          </h2>
          <p className="mt-4 text-zinc-600 dark:text-zinc-300 text-base">
            Une tarification claire et prédictive structurée pour maximiser votre retour net sur investissement.
          </p>

          {/* Sélecteur de facturation */}
          <div className="mt-8 inline-flex items-center p-1.5 rounded-full bg-zinc-200/80 dark:bg-zinc-900 border border-zinc-300/80 dark:border-zinc-800">
            <button
              onClick={() => setAnnual(false)}
              className={`px-5 py-2 rounded-full text-xs font-bold transition-all ${
                !annual
                  ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-black shadow-md'
                  : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
              }`}
            >
              Facturation Mensuelle
            </button>
            <button
              onClick={() => setAnnual(true)}
              className={`px-5 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-2 ${
                annual
                  ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-black shadow-md'
                  : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
              }`}
            >
              <span>Facturation Annuelle</span>
              <span className="px-2 py-0.5 rounded-full bg-black/20 text-black text-[10px] font-extrabold">
                -20% ÉCONOMISÉS
              </span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {PLANS.map((plan, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className={`card-theme rounded-3xl p-8 border flex flex-col justify-between relative ${
                plan.popular
                  ? 'border-orange-500 shadow-2xl shadow-orange-500/15 bg-orange-50/40 dark:bg-gradient-to-b dark:from-[#141018] dark:to-[#0D0F17]'
                  : 'border-zinc-200 dark:border-zinc-800'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 text-black text-xs font-extrabold uppercase tracking-wider shadow-lg">
                  LE PLUS POPULAIRE
                </div>
              )}

              <div>
                <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">{plan.name}</h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-6">{plan.description}</p>

                <div className="flex items-baseline gap-1 mb-8">
                  <span className="text-4xl sm:text-5xl font-extrabold text-zinc-900 dark:text-white">{plan.price}</span>
                  <span className="text-sm text-zinc-500 dark:text-zinc-400">{plan.period}</span>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feat, fIdx) => (
                    <li key={fIdx} className="flex items-center gap-3 text-sm text-zinc-700 dark:text-zinc-300">
                      <div className="w-5 h-5 rounded-full bg-orange-500/15 border border-orange-500/30 flex items-center justify-center shrink-0">
                        <Check className="w-3.5 h-3.5 text-orange-500 dark:text-orange-400" />
                      </div>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex justify-center w-full mt-4">
                <LiquidMetalButton
                  label={plan.cta}
                  onClick={() => {
                    const el = document.getElementById('contact');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
