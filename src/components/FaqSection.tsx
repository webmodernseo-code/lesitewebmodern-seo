'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, ChevronDown } from 'lucide-react';

const FAQS = [
  {
    q: 'Combien de temps faut-il pour obtenir des résultats mesurables ?',
    a: 'Nos optimisations initiales de télémétrie et SEO génèrent généralement des gains mesurables sur le coût par acquisition sous 14 jours. La vitesse maximale de scaling du tunnel x10 est atteinte entre le 2ème et le 4ème mois.',
  },
  {
    q: 'Qu\'est-ce qui différencie WebModernSEO d\'une agence marketing traditionnelle ?',
    a: 'Contrairement aux agences facturant à l\'heure sans garantie de résultats, nous déployons une infrastructure IA propriétaire et nous lions nos primes de succès à des étapes de croissance du chiffre d\'affaires (ARR) vérifiées.',
  },
  {
    q: 'Faut-il disposer d\'une équipe marketing interne existante ?',
    a: 'Non. Notre squad dédiée WebModernSEO peut fonctionner comme votre département de croissance autonome clé en main ou collaborer en parfaite synergie avec votre CMO et vos équipes produit.',
  },
  {
    q: 'Existe-t-il un engagement contractuel minimum ?',
    a: 'Nous proposons des sprints de croissance flexibles de 3 mois ainsi que des contrats d\'accompagnement annuel. Tous nos plans incluent une garantie de satisfaction de 30 jours.',
  },
  {
    q: 'Comment gérez-vous la confidentialité et la conformité RGPD / SOC2 ?',
    a: 'Toutes les opérations de télémétrie s\'effectuent au sein d\'environnements serveurs hautement sécurisés certifiés SOC2 Type II et conformes RGPD, sans revente ni partage de données tierces.',
  },
];

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-24 bg-[#050609] relative font-sans">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-orange-400 uppercase tracking-widest mb-3">
            <HelpCircle className="w-4 h-4" />
            <span>Vous Avez Des Questions ?</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white leading-tight">
            Foire Aux <span className="orange-gradient-text">Questions</span>
          </h2>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="card-dark rounded-2xl border border-zinc-800/80 overflow-hidden transition-colors"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 font-bold text-white hover:text-orange-300 transition-colors font-sans"
                >
                  <span className="text-base sm:text-lg">{faq.q}</span>
                  <div
                    className={`w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-orange-400 shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 bg-orange-500 text-black' : ''
                    }`}
                  >
                    <ChevronDown className="w-5 h-5" />
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="px-6 pb-6 text-sm text-zinc-400 leading-relaxed border-t border-zinc-800/40 pt-4 font-sans"
                    >
                      {faq.a}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
