'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { ArrowUpRight, Globe, Sparkles, ShieldCheck, Zap } from 'lucide-react';

export interface ServiceItem {
  title: string;
  category: string;
  description: string;
  image: string;
  tag: string;
  href: string;
  frameLabel?: string;
  features?: string[];
}

const DEFAULT_SERVICES: ServiceItem[] = [
  {
    title: "Création Web & E-commerce Next.js",
    category: "Storefront & Application",
    description: "Sites e-commerce et vitrines ultra-rapides, parcours d'achat fluides et architecture taillée pour convertir.",
    image: "/images/services/c2k8vbhynwm.jpg",
    tag: "Next.js 14",
    href: "/services/creation-web",
    frameLabel: "Création de Site Internet",
    features: ["Score PageSpeed 98+", "Tunnel d'achat optimisé", "Paiements sécurisés"]
  },
  {
    title: "Référencement SEO & SXO Prédictif",
    category: "Visibilité & Acquisition",
    description: "Stratégie sémantique avancée, structure technique irréprochable et conquête de la 1ère page Google.",
    image: "/images/services/c_ry4rm1_b4.jpg",
    tag: "Google Rank #1",
    href: "/services/referencement-seo",
    frameLabel: "Référencement SEO & GÉO",
    features: ["Audit sémantique profond", "Netlinking qualifié", "Balisage Schema.org"]
  },
  {
    title: "Acquisition Clients & Meta Ads",
    category: "Growth & Automation",
    description: "Campagnes publicitaires rentables, reciblage intelligent et synchronisation automatique avec votre CRM.",
    image: "/images/services/upsef48wagk.jpg",
    tag: "Meta Ads & n8n",
    href: "/services/acquisition-clients",
    frameLabel: "Acquisition de Nouveaux Clients",
    features: ["Ciblage ultra-précis", "Flux automatisés n8n", "Génération de leads 24/7"]
  }
];

// Composant de Cadre Écran / Device Mockup Frame (comme sur la référence)
const DeviceMockupFrame = ({
  image,
  title,
  frameLabel
}: {
  image: string;
  title: string;
  frameLabel?: string;
}) => {
  return (
    <div className="relative w-full rounded-[22px] sm:rounded-[26px] bg-[#0d0e12] border border-zinc-800/90 p-2 sm:p-3 shadow-2xl shadow-black/25 transition-transform duration-500 group-hover:scale-[1.015] overflow-hidden">
      {/* Barre supérieure du cadre (Navigation Mockup) */}
      <div className="flex items-center justify-between px-3 py-2 mb-1.5 border-b border-zinc-800/60 bg-zinc-900/40 rounded-t-xl">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]/80 inline-block" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]/80 inline-block" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]/80 inline-block" />
        </div>

        <div className="hidden sm:flex items-center gap-4 text-[11px] text-zinc-400 font-medium">
          <span className="text-zinc-200 uppercase tracking-wider font-bold">STORE</span>
          <span>COLLECTION</span>
          <span>SERVICES</span>
        </div>

        <div className="flex items-center gap-2 text-[10px] text-zinc-400 font-mono bg-black/40 px-2 py-0.5 rounded-md border border-zinc-800">
          <Globe className="w-3 h-3 text-brand-orange" />
          <span>webmodernseo.co</span>
        </div>
      </div>

      {/* Surface de l'écran avec visuel du projet */}
      <div className="relative w-full aspect-[16/10] sm:aspect-[16/9.5] rounded-[14px] sm:rounded-[16px] overflow-hidden bg-zinc-950 border border-zinc-800/50">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.onerror = null;
            target.src = '/portfolio/webmodernseo-home-showcase.png';
          }}
        />

        {/* Gradient subtil en bas de l'écran mockup */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent pointer-events-none" />

        {/* Bandeau d'information inférieur intégré à l'écran */}
        <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-white z-10">
          <div className="flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-brand-orange" />
            <span>{frameLabel || "Aperçu Réalisation"}</span>
          </div>

          <span className="text-[11px] text-zinc-300 font-medium bg-black/40 backdrop-blur-sm px-2.5 py-0.5 rounded-md hidden sm:inline-block">
            Production Ready
          </span>
        </div>
      </div>
    </div>
  );
};

export interface ServicesSectionProps {
  services?: ServiceItem[];
  className?: string;
  badge?: string;
  title?: string;
  subtitle?: string;
}

export default function ServicesSection({
  services = DEFAULT_SERVICES,
  className = "",
  badge = "Nos Services d'Excellence",
  title = "Comment propulsons-nous votre entreprise ?",
  subtitle = "Des cadres et architectures sur-mesure pour transformer vos visiteurs en clients fidèles.",
}: ServicesSectionProps) {
  return (
    <section className={cn("w-full py-16 sm:py-20 lg:py-24 px-4 sm:px-6 bg-white font-sans", className)}>
      <div className="max-w-7xl mx-auto">
        {/* En-tête de section */}
        <div className="text-center mb-12 sm:mb-16">
          <span className="inline-flex items-center gap-2 rounded-full border border-black/[0.08] bg-black/[0.03] px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.08em] text-[#5c5c64] mb-4 shadow-2xs">
            <span className="text-brand-orange" aria-hidden="true">✦</span>
            {badge}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-gray-900 mb-3 sm:mb-4 tracking-tight">
            {title}
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* Grille des services avec cadres écrans stylisés */}
        <div className={cn(
          "grid gap-6 sm:gap-8",
          services.length === 3 ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1 lg:grid-cols-2"
        )}>
          {services.map((service, index) => {
            const CardWrapper = service.href ? 'a' : 'div';
            return (
              <CardWrapper
                key={index}
                href={service.href}
                className="group relative bg-[#fafbfc] border border-gray-200/90 rounded-3xl p-5 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:bg-white hover:shadow-2xl hover:border-brand-orange/40 hover:-translate-y-1 cursor-pointer overflow-hidden"
              >
                {/* En-tête de la carte */}
                <div className="flex items-center justify-between mb-4">
                  <span className="inline-block text-[11px] font-bold tracking-wide uppercase px-3 py-1 rounded-full bg-white border border-gray-200 text-gray-800 shadow-2xs">
                    {service.tag}
                  </span>

                  <div className="w-9 h-9 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-500 group-hover:text-white group-hover:bg-brand-orange group-hover:border-brand-orange group-hover:scale-105 transition-all shadow-xs">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>

                {/* Cadre Mockup d'écran du Portfolio */}
                <div className="my-2">
                  <DeviceMockupFrame
                    image={service.image}
                    title={service.title}
                    frameLabel={service.frameLabel}
                  />
                </div>

                {/* Titre & Description du service */}
                <div className="mt-5 pt-4 border-t border-gray-100">
                  <h3 className="text-xl sm:text-2xl font-bold font-display text-gray-900 group-hover:text-brand-orange transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1.5 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Micro-features du service */}
                  {service.features && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {service.features.map((feat, fIdx) => (
                        <span
                          key={fIdx}
                          className="inline-flex items-center gap-1.5 text-xs text-gray-700 bg-gray-100/80 px-2.5 py-1 rounded-lg border border-gray-200/60"
                        >
                          <ShieldCheck className="w-3.5 h-3.5 text-brand-orange shrink-0" />
                          {feat}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </CardWrapper>
            );
          })}
        </div>
      </div>
    </section>
  );
}
