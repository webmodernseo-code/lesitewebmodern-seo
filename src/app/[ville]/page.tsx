import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { HeaderPublic } from '@/components/public/HeaderPublic';
import { FooterPublic } from '@/components/public/FooterPublic';
import { JsonLd } from '@/components/JsonLd';
import { VILLES_DATA } from '@/lib/villes-data';
import { buildBreadcrumbSchema, buildLocalBusinessSchema, SITE_URL } from '@/lib/schema';
import Link from 'next/link';
import { CheckCircle2, ArrowRight, MapPin, Sparkles, Zap, ShieldCheck } from 'lucide-react';

interface VillePageProps {
  params: {
    ville: string;
  };
}

export async function generateStaticParams() {
  return Object.keys(VILLES_DATA).map((ville) => ({
    ville,
  }));
}

export async function generateMetadata({ params }: VillePageProps): Promise<Metadata> {
  const villeData = VILLES_DATA[params.ville.toLowerCase()];
  if (!villeData) return {};

  return {
    title: villeData.titreSEO,
    description: villeData.descriptionSEO,
    alternates: { canonical: `/${villeData.slug}` },
    openGraph: {
      title: villeData.titreSEO,
      description: villeData.descriptionSEO,
      url: `https://webmodernseo.co/${villeData.slug}`,
      siteName: 'WebModernSEO',
      locale: 'fr_FR',
      type: 'website',
    },
  };
}

export default function VillePage({ params }: VillePageProps) {
  const villeData = VILLES_DATA[params.ville.toLowerCase()];

  if (!villeData) {
    notFound();
  }

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Accueil', url: SITE_URL },
    { name: `SEO ${villeData.nom}`, url: `${SITE_URL}/${villeData.slug}` },
  ]);

  const localBusinessSchema = buildLocalBusinessSchema({
    name: `WebModernSEO ${villeData.nom}`,
    description: villeData.descriptionSEO,
    address: {
      addressLocality: villeData.nom,
      postalCode: villeData.codePostal,
      addressRegion: villeData.region,
    },
  });

  return (
    <div className="relative min-h-screen bg-white text-black overflow-x-hidden font-sans">
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={localBusinessSchema} />
      
      <HeaderPublic />

      <main className="w-full pt-28 pb-20">
        {/* Section En-tête Local */}
        <section className="container max-w-6xl mx-auto px-4 sm:px-6 mb-16 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-700 text-xs font-semibold uppercase tracking-wider mb-6">
            <MapPin className="w-3.5 h-3.5 text-amber-600" />
            Expertise SEO & Web à {villeData.nom} ({villeData.codePostal})
          </div>

          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-black leading-tight mb-6">
            Création de Site Internet & Référencement SEO à <span className="text-[#ff4d00]">{villeData.nom}</span>
          </h1>

          <p className="text-lg md:text-xl text-[#5c5c64] max-w-3xl mx-auto leading-relaxed mb-10">
            {villeData.introText}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/reservation"
              className="inline-flex items-center gap-2 bg-[#ff4d00] hover:bg-[#ff7e47] text-white font-bold px-8 py-4 rounded-xl transition-all shadow-lg shadow-orange-500/20"
            >
              <Sparkles className="w-5 h-5" />
              Audit gratuit à {villeData.nom}
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 border border-zinc-200 hover:border-zinc-300 text-black font-semibold px-8 py-4 rounded-xl bg-white transition-all"
            >
              Nous contacter <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        {/* Grille de métriques locales */}
        <section className="container max-w-5xl mx-auto px-4 mb-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {villeData.statsLocal.map((stat, idx) => (
              <div key={idx} className="p-8 rounded-2xl bg-zinc-50 border border-zinc-200/80 text-center">
                <div className="text-3xl md:text-4xl font-extrabold text-[#ff4d00] mb-2">{stat.value}</div>
                <div className="text-sm font-medium text-[#5c5c64]">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Avantages Spécifiques */}
        <section className="container max-w-5xl mx-auto px-4 mb-20">
          <div className="p-8 md:p-12 rounded-3xl bg-white border border-zinc-200/80 shadow-xl shadow-black/5">
            <h2 className="text-2xl md:text-3xl font-extrabold text-black mb-8">
              Pourquoi choisir WebModernSEO pour votre projet à {villeData.nom} ?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {villeData.avantagesLocaux.map((avantage, idx) => (
                <div key={idx} className="flex gap-4 items-start">
                  <CheckCircle2 className="w-6 h-6 text-[#ff4d00] flex-shrink-0 mt-1" />
                  <p className="text-sm md:text-base text-zinc-700 font-medium leading-relaxed">
                    {avantage}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <FooterPublic />
    </div>
  );
}
