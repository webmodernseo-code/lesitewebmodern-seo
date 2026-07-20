import React from 'react';
import { HeaderPublic } from '@/components/public/HeaderPublic';
import { FooterPublic } from '@/components/public/FooterPublic';
import { CalendlyWidget } from '@/components/public/CalendlyWidget';
import { Mail, Phone } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="relative min-h-screen bg-white text-black overflow-x-hidden font-sans">
      <HeaderPublic />

      <main className="w-full pt-32 pb-32 px-6 max-w-5xl mx-auto flex flex-col md:flex-row gap-12 items-start">
        {/* Colonne Gauche - Texte & Coordonnées */}
        <div className="w-full md:w-5/12 flex flex-col gap-6 md:sticky md:top-32">
          <div className="w-fit inline-block bg-[#ff4d00]/10 text-[#ff4d00] px-4 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-wider">
            Parlons SEO & Web
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-black leading-none">
            Prêt à faire décoller votre <span className="text-[#ff4d00]">visibilité</span> ?
          </h1>
          <p className="text-sm text-[#5c5c64] leading-relaxed">
            Création de site internet, stratégie SEO ou automatisation de leads : nous sommes là pour concrétiser vos objectifs.
          </p>

          {/* Carte Coordonnées - même style que la carte Calendly à droite */}
          <div className="bg-white border border-black/10 rounded-3xl shadow-sm p-6 space-y-4">
            <h2 className="text-xs font-bold text-black/50 uppercase tracking-widest">
              Nos coordonnées
            </h2>
            <a href="mailto:contact@webmodernseo.co" className="flex items-center gap-3 group">
              <div className="w-9 h-9 rounded-xl bg-zinc-50 border border-black/5 flex items-center justify-center text-[#ff4d00] shadow-sm shrink-0">
                <Mail className="w-4 h-4" />
              </div>
              <span className="font-semibold text-black text-sm group-hover:text-[#ff4d00] transition-colors">contact@webmodernseo.co</span>
            </a>
            <a href="tel:+33753887751" className="flex items-center gap-3 group">
              <div className="w-9 h-9 rounded-xl bg-zinc-50 border border-black/5 flex items-center justify-center text-[#ff4d00] shadow-sm shrink-0">
                <Phone className="w-4 h-4" />
              </div>
              <span className="font-semibold text-black text-sm group-hover:text-[#ff4d00] transition-colors">+33 7 53 88 77 51</span>
            </a>
            <div className="pt-3 border-t border-black/5 text-xs text-[#5c5c64]">
              Lundi - Vendredi, 9h00 - 18h00
            </div>
          </div>
        </div>

        {/* Colonne Droite - Widget Calendly intégré */}
        <div className="w-full md:w-7/12">
          <CalendlyWidget />
        </div>
      </main>

      <FooterPublic />
    </div>
  );
}
