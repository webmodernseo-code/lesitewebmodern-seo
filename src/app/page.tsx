import React from 'react';
import dynamic from 'next/dynamic';
import { HeaderPublic } from '@/components/public/HeaderPublic';
import { HeroPublic } from '@/components/public/HeroPublic';
import { PartenairesPublic } from '@/components/public/PartenairesPublic';
import GenerativeArtGallery from '@/components/ui/generative-art-gallery';
import { AboutPublic } from '@/components/public/AboutPublic';
import { CtaPublic } from '@/components/public/CtaPublic';
import { FaqPublic } from '@/components/public/FaqPublic';
import { FooterPublic } from '@/components/public/FooterPublic';
import { JsonLd } from '@/components/JsonLd';
import { Reveal } from '@/components/Reveal';
import { StaggerReveal } from '@/components/StaggerReveal';
import { buildOrganizationSchema, buildFaqSchema } from '@/lib/schema';

// Chargé dynamiquement pour alléger le bundle initial
const TestimonialsSection = dynamic(
  () => import('@/components/ui/testimonial-v2').then((mod) => mod.TestimonialsSection),
  { ssr: true }
);

export default function Home() {
  return (
    <div className="relative min-h-screen bg-white text-black overflow-x-hidden font-sans">
      <JsonLd data={buildOrganizationSchema()} />
      <JsonLd data={buildFaqSchema()} />

      {/* En-tête public */}
      <HeaderPublic />

      {/* Corps du site vitrine */}
      <main className="w-full relative z-10 pt-16">
        {/* Section Hero avec Carrousel */}
        <section id="hero" className="w-full">
          <HeroPublic />
        </section>

        {/* Section Partenaires & Confiance */}
        <section id="partenaires" className="w-full">
          <PartenairesPublic />
        </section>

        {/* Section Projets & Créations immersives */}
        <section id="creations" className="w-full">
          <GenerativeArtGallery />
        </section>

        {/* Section À Propos */}
        <Reveal as="section" id="apropos" className="w-full" variant="right">
          <AboutPublic />
        </Reveal>

        {/* Section Témoignages */}
        <section id="temoignages" className="w-full">
          <TestimonialsSection />
        </section>

        {/* Section Appel à l'action (CTA) */}
        <Reveal as="section" id="cta" className="w-full" variant="scale">
          <CtaPublic />
        </Reveal>

        {/* Section FAQ */}
        <Reveal as="section" id="faq" className="w-full" variant="up">
          <StaggerReveal selector=".wms-faq-item" variant="up" step={80}>
            <FaqPublic />
          </StaggerReveal>
        </Reveal>
      </main>

      {/* Pied de page public */}
      <FooterPublic />
    </div>
  );
}
