'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface PortfolioMockup {
  id: string;
  title: string;
  tag: string;
  image: string;
}

const COLUMN_1: PortfolioMockup[] = [
  {
    id: 'food-studio',
    title: 'Food Studio',
    tag: 'Restauration & Commande',
    image: '/images/services/food-studio-storefront.png',
  },
  {
    id: 'aniq-overview',
    title: 'Aniq-ui Dashboard',
    tag: 'Dashboard SaaS B2B',
    image: '/images/portfolio/aniq-ui-overview.png',
  },
  {
    id: 'epbomi-hero',
    title: 'EPBOMI Europe',
    tag: 'Portail & Communauté',
    image: '/images/portfolio/epbomi-hero.png',
  },
  {
    id: 'saas-stats',
    title: 'SaaS Analytics',
    tag: 'Plateforme Croissance',
    image: '/images/services/saas-stats-growth.png',
  },
  {
    id: 'epbomi-histoire',
    title: 'EPBOMI — Histoire',
    tag: 'Page Mission & Histoire',
    image: '/images/portfolio/epbomi-histoire.png',
  },
];

const COLUMN_2: PortfolioMockup[] = [
  {
    id: 'epbomi-dons-en-ligne',
    title: 'EPBOMI — Dons',
    tag: 'Paiement Sécurisé',
    image: '/images/portfolio/epbomi-dons-en-ligne.png',
  },
  {
    id: 'food-menu',
    title: 'Food Studio — Menu',
    tag: 'Catalogue & Carte',
    image: '/images/services/food-studio-menu.png',
  },
  {
    id: 'aniq-orders',
    title: 'Aniq-ui — Commandes',
    tag: 'Gestion Logistique',
    image: '/images/portfolio/aniq-ui-orders.png',
  },
  {
    id: 'epbomi-rendezvous',
    title: 'EPBOMI — Rendez-vous',
    tag: 'Événements & Cultes',
    image: '/images/portfolio/epbomi-rendezvous.png',
  },
  {
    id: 'aniq-ai',
    title: 'Aniq-ui — IA Studio',
    tag: 'Intelligence Artificielle',
    image: '/images/portfolio/aniq-ui-ai-product.png',
  },
];

function MockupCard({ item }: { item: PortfolioMockup }) {
  return (
    <div className="group relative w-full overflow-hidden rounded-xl sm:rounded-2xl border border-black/[0.08] bg-white p-1 sm:p-1.5 shadow-soft hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      {/* Barre style macOS épurée SANS AUCUN nom de domaine */}
      <div className="flex items-center justify-between px-2.5 py-1.5 mb-1 rounded-lg bg-zinc-900 text-zinc-300 select-none">
        <div className="flex items-center gap-1.5 shrink-0">
          <span className="w-2 h-2 rounded-full bg-[#ff5f56] inline-block" />
          <span className="w-2 h-2 rounded-full bg-[#ffbd2e] inline-block" />
          <span className="w-2 h-2 rounded-full bg-[#27c93f] inline-block" />
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] font-semibold tracking-wide text-zinc-300 truncate max-w-[130px]">
            {item.title}
          </span>
        </div>
        <div className="w-2" />
      </div>

      {/* Image de capture HD sans compression ni déformation (ratio natif 16:9) */}
      <div className="relative w-full aspect-[16/9] overflow-hidden rounded-lg bg-zinc-950">
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
          style={{ imageRendering: '-webkit-optimize-contrast' }}
          loading="eager"
        />
        {/* Voile discret au survol */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-2 sm:p-2.5 text-white">
          <span className="text-[10px] font-semibold tracking-wide text-brand-orange uppercase">
            {item.tag}
          </span>
          <span className="text-xs font-bold truncate">
            {item.title}
          </span>
        </div>
      </div>
    </div>
  );
}

export function HeroTiltedPortfolio({ className }: { className?: string }) {
  // Duplication pour une boucle continue et fluide
  const col1Items = [...COLUMN_1, ...COLUMN_1];
  const col2Items = [...COLUMN_2, ...COLUMN_2];

  return (
    <div
      className={cn(
        "relative w-full h-[420px] sm:h-[460px] lg:h-[490px] xl:h-[510px] overflow-hidden [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)] pointer-events-auto px-4 sm:px-8 lg:px-10 my-auto",
        className
      )}
    >
      {/* Conteneur avec inclinaison 3D subtile style premium, decale avec marge de securite pour que l'extremite gauche soit 100% complete */}
      <div className="relative w-full h-full transform -rotate-2 sm:-rotate-3 translate-x-2 sm:translate-x-4 scale-[1.01] sm:scale-[1.02] origin-center grid grid-cols-2 gap-3 sm:gap-4.5 px-3 sm:px-4">
        {/* Colonne 1 : Défilement vertical vers le haut */}
        <div className="flex flex-col gap-3.5 sm:gap-4.5 animate-hero-col-up hover:[animation-play-state:paused]">
          {col1Items.map((item, idx) => (
            <MockupCard key={`col1-${item.id}-${idx}`} item={item} />
          ))}
        </div>

        {/* Colonne 2 : Défilement vertical vers le bas */}
        <div className="flex flex-col gap-3.5 sm:gap-4.5 animate-hero-col-down hover:[animation-play-state:paused]">
          {col2Items.map((item, idx) => (
            <MockupCard key={`col2-${item.id}-${idx}`} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default HeroTiltedPortfolio;
