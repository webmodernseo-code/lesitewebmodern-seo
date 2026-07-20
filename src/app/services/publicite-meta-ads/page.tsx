import React from 'react';
import Link from 'next/link';
import { HeaderPublic } from '@/components/public/HeaderPublic';
import { FooterPublic } from '@/components/public/FooterPublic';
import { Reveal } from '@/components/Reveal';
import { CheckCircle2, ArrowRight, Sparkles, Target, LineChart, Palette, Gauge } from 'lucide-react';

const AVANTAGES = [
  {
    icon: Target,
    title: 'Ciblage précis',
    text: "Audiences construites sur vos vrais clients (lookalike, retargeting, intérêts) plutôt qu'un ciblage générique qui gaspille votre budget.",
  },
  {
    icon: Gauge,
    title: 'Tracking fiable',
    text: "Pixel Meta et Conversions API installés correctement dès le premier jour pour mesurer chaque lead et chaque vente, pas des estimations approximatives.",
  },
  {
    icon: Palette,
    title: 'Créations qui convertissent',
    text: "Visuels et angles publicitaires pensés pour arrêter le scroll et déclencher l'action, testés en continu (A/B testing).",
  },
  {
    icon: LineChart,
    title: 'Optimisation du coût par acquisition',
    text: "Ajustement hebdomadaire des budgets et audiences sur les campagnes qui performent, coupe rapide de celles qui ne rentabilisent pas.",
  },
];

const ETAPES = [
  { step: '01', title: 'Audit & stratégie', text: "Analyse de votre offre, de votre audience et de vos objectifs pour définir la structure de campagne la plus rentable." },
  { step: '02', title: 'Tracking & installation', text: "Mise en place du pixel Meta, de la Conversions API et des événements de conversion pour un suivi fiable dès le lancement." },
  { step: '03', title: 'Création des campagnes', text: "Rédaction des accroches, sélection des visuels et construction des audiences de test." },
  { step: '04', title: 'Optimisation continue', text: "Suivi hebdomadaire des performances, arbitrages budgétaires et itérations créatives pour baisser le coût par lead." },
];

export default function PubliciteMetaAdsPage() {
  return (
    <div className="relative min-h-screen bg-white text-black overflow-x-hidden font-sans">
      <HeaderPublic />

      <main className="w-full pt-28 pb-20">
        {/* En-tête */}
        <section className="container max-w-[1400px] mx-auto px-4 sm:px-6 mb-16 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-700 text-xs font-semibold uppercase tracking-wider mb-6">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            Facebook Ads & Instagram Ads
          </div>

          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-black leading-tight mb-6">
            Publicité <span className="text-[#ff4d00]">Meta Ads</span> qui génère de vrais clients
          </h1>

          <p className="text-lg md:text-xl text-[#5c5c64] max-w-3xl mx-auto leading-relaxed mb-10">
            Nous concevons et pilotons vos campagnes Facebook Ads et Instagram Ads pour transformer votre budget publicitaire en prospects qualifiés et en ventes, avec un tracking fiable et une optimisation continue du coût par acquisition.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/reservation"
              className="inline-flex items-center gap-2 bg-[#ff4d00] hover:bg-[#ff7e47] text-white font-bold px-8 py-4 rounded-xl transition-all shadow-lg shadow-orange-500/20"
            >
              <Sparkles className="w-5 h-5" />
              Audit gratuit de mes campagnes
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 border border-zinc-200 hover:border-zinc-300 text-black font-semibold px-8 py-4 rounded-xl bg-white transition-all"
            >
              Nous contacter <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        {/* Avantages */}
        <Reveal as="section" className="container max-w-[1400px] mx-auto px-4 mb-20">
          <h2 className="text-2xl md:text-3xl font-extrabold text-black mb-8 text-center">
            Une gestion Meta Ads pilotée par la donnée
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {AVANTAGES.map((item) => (
              <div key={item.title} className="p-8 rounded-2xl bg-zinc-50 border border-zinc-200/80 flex gap-4 items-start">
                <item.icon className="w-6 h-6 text-[#ff4d00] flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-black mb-1">{item.title}</h3>
                  <p className="text-sm text-[#5c5c64] leading-relaxed">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Méthode */}
        <Reveal as="section" className="container max-w-[1400px] mx-auto px-4 mb-20" delay={100}>
          <div className="p-8 md:p-12 rounded-3xl bg-white border border-zinc-200/80 shadow-xl shadow-black/5">
            <h2 className="text-2xl md:text-3xl font-extrabold text-black mb-8">
              Notre méthode, étape par étape
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {ETAPES.map((etape) => (
                <div key={etape.step} className="flex gap-4 items-start">
                  <span className="text-2xl font-black text-[#ff4d00]/30 flex-shrink-0">{etape.step}</span>
                  <div>
                    <h3 className="font-bold text-black mb-1">{etape.title}</h3>
                    <p className="text-sm text-zinc-700 leading-relaxed">{etape.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Cross-liens vers services complémentaires */}
        <Reveal as="section" className="container max-w-[1400px] mx-auto px-4 mb-4" delay={150}>
          <div className="p-8 rounded-2xl bg-zinc-50 border border-zinc-200/80 text-center">
            <CheckCircle2 className="w-6 h-6 text-[#0FAC71] mx-auto mb-3" />
            <p className="text-sm md:text-base text-zinc-700 leading-relaxed max-w-2xl mx-auto">
              Pour maximiser le retour de vos campagnes Meta Ads, votre site doit convertir. Découvrez aussi nos services de{' '}
              <Link href="/services/creation-web" className="text-[#ff4d00] font-semibold underline">création de site internet</Link>{' '}
              et de{' '}
              <Link href="/services/referencement-seo" className="text-[#ff4d00] font-semibold underline">référencement SEO</Link>{' '}
              pour construire une acquisition complète, payante et organique.
            </p>
          </div>
        </Reveal>
      </main>

      <FooterPublic />
    </div>
  );
}
