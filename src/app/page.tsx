import React from 'react';
import { HeaderPublic } from '@/components/public/HeaderPublic';
import { HeroPublic } from '@/components/public/HeroPublic';
import { ServicesPublic } from '@/components/public/ServicesPublic';
import { AboutPublic } from '@/components/public/AboutPublic';
import { AvisPublic } from '@/components/public/AvisPublic';
import { CtaPublic } from '@/components/public/CtaPublic';
import { FaqPublic } from '@/components/public/FaqPublic';
import { FooterPublic } from '@/components/public/FooterPublic';

export const metadata = {
  title: "webmodernseo.co — Agence Web et Référencement Naturel Premium SEO",
  description: "Création de sites internet modernes sous WordPress, stratégies de référencement naturel SEO avancées et automatisation de leads pour votre business.",
};

export default function Home() {
  return (
    <div className="relative min-h-screen bg-[#FDFBF7] dark:bg-[#050609] text-black dark:text-white transition-colors duration-400 overflow-x-hidden font-sans">
      {/* En-tête public */}
      <HeaderPublic />

      {/* Corps du site vitrine */}
      <main className="w-full relative z-10 pt-16">
        {/* Section Hero */}
        <section id="hero" className="w-full">
          <HeroPublic />
        </section>

        {/* Section Services */}
        <section id="services" className="w-full">
          <ServicesPublic />
        </section>

        {/* Section À Propos */}
        <section id="apropos" className="w-full">
          <AboutPublic />
        </section>

        {/* Section Témoignages */}
        <section id="temoignages" className="w-full">
          <AvisPublic />
        </section>

        {/* Section Appel à l'action (CTA) */}
        <section id="cta" className="w-full">
          <CtaPublic />
        </section>

        {/* Section FAQ */}
        <section id="faq" className="w-full">
          <FaqPublic />
        </section>
      </main>

      {/* Pied de page public */}
      <FooterPublic />
    </div>
  );
}
