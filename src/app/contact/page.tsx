import React from 'react';
import { HeaderPublic } from '@/components/public/HeaderPublic';
import { FooterPublic } from '@/components/public/FooterPublic';
import { CalendlyWidget } from '@/components/public/CalendlyWidget';
import { Mail, Phone, CalendarClock } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="relative min-h-screen bg-[#FDFBF7] text-black overflow-x-hidden font-sans">
      <HeaderPublic />

      <main className="w-full pt-32 pb-32 px-6 max-w-5xl mx-auto flex flex-col md:flex-row gap-12 items-start">
        {/* Colonne Gauche - Texte & Coordonnées */}
        <div className="w-full md:w-5/12 flex flex-col gap-6 md:sticky md:top-32">
          <div className="order-1 w-fit inline-block bg-[#ff4d00]/10 text-[#ff4d00] px-4 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-wider">
            Parlons SEO & Web
          </div>
          <h1 className="order-2 text-3xl md:text-4xl font-extrabold tracking-tight text-black leading-none">
            Prêt à faire décoller votre <span className="text-[#ff4d00]">visibilité</span> ?
          </h1>
          <p className="order-3 text-sm text-[#5c5c64] leading-relaxed">
            Refonte WordPress, stratégie SEO ou automatisation de leads : nous sommes là pour concrétiser vos objectifs.
          </p>
          <a
            href="tel:+33753887751"
            className="order-5 md:order-4 self-start inline-flex items-center gap-2 bg-black hover:bg-black/90 text-white py-3 px-5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-sm"
          >
            <CalendarClock className="w-4 h-4" />
            Prendre RDV directement
          </a>
          <div className="order-4 md:order-5 space-y-3.5 text-sm">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-white border border-black/5 flex items-center justify-center text-[#ff4d00] shadow-sm">
                <Mail className="w-4 h-4" />
              </div>
              <span className="font-semibold text-black">contact@webmodernseo.co</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-white border border-black/5 flex items-center justify-center text-[#ff4d00] shadow-sm">
                <Phone className="w-4 h-4" />
              </div>
              <span className="font-semibold text-black">+33 (0)1 84 60 90 20</span>
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
