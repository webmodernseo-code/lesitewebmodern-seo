import React from 'react';
import dynamic from 'next/dynamic';
import { HeaderPublic } from '@/components/public/HeaderPublic';
import { HeroPublic } from '@/components/public/HeroPublic';
import { ServicesPublic } from '@/components/public/ServicesPublic';
import { AboutPublic } from '@/components/public/AboutPublic';
import { CtaPublic } from '@/components/public/CtaPublic';
import { FaqPublic } from '@/components/public/FaqPublic';
import { FooterPublic } from '@/components/public/FooterPublic';
import { JsonLd } from '@/components/JsonLd';
import { Reveal } from '@/components/Reveal';
import { buildOrganizationSchema, buildFaqSchema } from '@/lib/schema';

// Chargé uniquement quand la section devient visible : évite d'alourdir le bundle
// initial avec framer-motion pour un contenu qui n'est jamais visible au premier écran.
const TestimonialsSection = dynamic(
  () => import('@/components/ui/testimonial-v2').then((mod) => mod.TestimonialsSection),
  { ssr: true }
);

// Titre/description/canonical/OG hérités de src/app/layout.tsx (déjà corrects pour la home).

export default function Home() {
  return (
    <div className="relative min-h-screen bg-white text-black overflow-x-hidden font-sans">
      <JsonLd data={buildOrganizationSchema()} />
      <JsonLd data={buildFaqSchema()} />

      {/* En-tête public */}
      <HeaderPublic />

      {/* Corps du site vitrine */}
      <main className="w-full relative z-10 pt-16">
        {/* Section Hero */}
        <section id="hero" className="w-full">
          <HeroPublic />
        </section>

        {/* Section Services */}
        <Reveal as="section" id="services" className="w-full">
          <ServicesPublic />
        </Reveal>

        {/* Section À Propos */}
        <Reveal as="section" id="apropos" className="w-full">
          <AboutPublic />
        </Reveal>

        {/* Section Témoignages (remplacée par testimonial-v2) : anime déjà son
            apparition elle-même (framer-motion whileInView), pas de double Reveal ici. */}
        <section id="temoignages" className="w-full">
          <TestimonialsSection />
        </section>

        {/* Section Appel à l'action (CTA) */}
        <Reveal as="section" id="cta" className="w-full">
          <CtaPublic />
        </Reveal>

        {/* Section FAQ */}
        <Reveal as="section" id="faq" className="w-full">
          <FaqPublic />
        </Reveal>
      </main>

      {/* Pied de page public */}
      <FooterPublic />
    </div>
  );
}
