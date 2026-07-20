import React from 'react';
import Link from 'next/link';
import { HeaderPublic } from '@/components/public/HeaderPublic';
import { FooterPublic } from '@/components/public/FooterPublic';
import { Reveal } from '@/components/Reveal';
import { CheckCircle2, ArrowRight, Sparkles, Zap, ShieldCheck, Search, PackageSearch } from 'lucide-react';

const AVANTAGES = [
  {
    icon: Zap,
    title: 'Vitesse Next.js',
    text: "Un catalogue produit qui charge instantanément, même sur mobile : moins d'abandons de panier, plus de conversions.",
  },
  {
    icon: ShieldCheck,
    title: 'Paiement sécurisé',
    text: "Intégration de solutions de paiement fiables (Stripe et équivalents), conformes aux standards de sécurité en vigueur.",
  },
  {
    icon: Search,
    title: 'SEO produit natif',
    text: "Fiches produits structurées avec balisage Schema.org (Product, Offer) pour apparaître dans les résultats enrichis Google.",
  },
  {
    icon: PackageSearch,
    title: 'Gestion de catalogue simplifiée',
    text: "Une interface d'administration claire pour ajouter, modifier et organiser vos produits sans compétence technique.",
  },
];

const ETAPES = [
  { step: '01', title: 'Cadrage & catalogue', text: "Analyse de votre catalogue produit, de vos flux de commande et de vos contraintes logistiques." },
  { step: '02', title: 'Design & parcours d\'achat', text: "Conception d'un tunnel d'achat court et clair, du produit au paiement, pensé pour réduire l'abandon de panier." },
  { step: '03', title: 'Développement Next.js', text: "Construction de la boutique avec fiches produits optimisées SEO, paiement sécurisé et performance maximale." },
  { step: '04', title: 'Mise en ligne & suivi', text: "Lancement, suivi des premières commandes et ajustements pour maximiser le taux de conversion." },
];

export default function CreationSiteEcommercePage() {
  return (
    <div className="relative min-h-screen bg-white text-black overflow-x-hidden font-sans">
      <HeaderPublic />

      <main className="w-full pt-28 pb-20">
        {/* En-tête */}
        <section className="container max-w-[1400px] mx-auto px-4 sm:px-6 mb-16 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-700 text-xs font-semibold uppercase tracking-wider mb-6">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            Boutique en ligne Next.js
          </div>

          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-black leading-tight mb-6">
            Création de Site <span className="text-[#ff4d00]">E-commerce</span> Performant
          </h1>

          <p className="text-lg md:text-xl text-[#5c5c64] max-w-3xl mx-auto leading-relaxed mb-10">
            Nous concevons des boutiques en ligne Next.js sur-mesure : rapides, sécurisées et optimisées pour le référencement de vos fiches produits, afin de transformer vos visiteurs en clients.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/reservation"
              className="inline-flex items-center gap-2 bg-[#ff4d00] hover:bg-[#ff7e47] text-white font-bold px-8 py-4 rounded-xl transition-all shadow-lg shadow-orange-500/20"
            >
              <Sparkles className="w-5 h-5" />
              Diagnostic gratuit de mon projet
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
            Une boutique en ligne pensée pour vendre
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
              Une fois votre boutique en ligne, générez du trafic qualifié grâce à notre{' '}
              <Link href="/services/referencement-seo" className="text-[#ff4d00] font-semibold underline">référencement SEO</Link>{' '}
              et nos campagnes{' '}
              <Link href="/services/publicite-meta-ads" className="text-[#ff4d00] font-semibold underline">Meta Ads</Link>{' '}
              pour accélérer vos ventes dès le lancement.
            </p>
          </div>
        </Reveal>
      </main>

      <FooterPublic />
    </div>
  );
}
