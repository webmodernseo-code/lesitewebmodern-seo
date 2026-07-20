'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Cpu, Target, Zap, Shield, BarChart, Users } from 'lucide-react';

const FEATURES = [
  {
    icon: Cpu,
    title: 'Moteur de Croissance SEO & IA',
    description: 'Algorithmes prédictifs propriétaires WebModernSEO qui analysent l\'intention de recherche et ajustent automatiquement l\'allocation budgétaire.',
  },
  {
    icon: Target,
    title: 'Ciblage de Précision B2B',
    description: 'Atteignez les décideurs d\'entreprise à forte valeur grâce à des campagnes hyper-segmentées basées sur des données firmographiques en direct.',
  },
  {
    icon: Zap,
    title: 'Exécution Ultra-Rapide (7j)',
    description: 'Déployez nos playbooks de croissance éprouvés en moins de 7 jours ouvrés, sans friction opérationnelle ni dette technique.',
  },
  {
    icon: Shield,
    title: 'Sécurité de Niveau Bancaire',
    description: 'Infrastructure de données certifiée SOC2 Type II garantissant la protection intégrale de vos registres clients et données de télémétrie.',
  },
  {
    icon: BarChart,
    title: 'Attribution Multi-Touch en Temps Réel',
    description: 'Moteur d\'attribution avancé retraçant chaque point de contact utilisateur, du premier clic SEO jusqu\'au contrat signé.',
  },
  {
    icon: Users,
    title: 'Squad d\'Experts Dédiée WebModernSEO',
    description: 'Accès direct à nos estrategues seniors en croissance, rédacteurs de contenu haute conversion et ingénieurs de performance attribués à votre marque.',
  },
];

export function FeaturesGrid() {
  return (
    <section id="features" className="py-24 relative transition-colors duration-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-orange-600 dark:text-orange-400 uppercase tracking-widest mb-3">
            <Sparkles className="w-4 h-4" />
            <span>Capacités Inégalées</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-zinc-900 dark:text-white leading-tight">
            Ce qui fait notre <br />
            <span className="orange-gradient-text">Différence Unique</span>
          </h2>
          <p className="mt-4 text-zinc-600 dark:text-zinc-300 text-base">
            Tout ce dont vous avez besoin pour dépasser les plafonds de croissance traditionnels et bâtir un système de revenus prédictif.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURES.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="card-theme card-theme-hover rounded-2xl p-8 relative group"
              >
                <div className="w-12 h-12 rounded-xl bg-orange-500/10 dark:bg-orange-500/20 border border-orange-500/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                </div>
                <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-3 group-hover:text-orange-600 dark:group-hover:text-orange-300 transition-colors">
                  {feat.title}
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {feat.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
