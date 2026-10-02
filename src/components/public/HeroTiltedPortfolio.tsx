'use client';

import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface PortfolioMockup {
  id: string;
  title: string;
  url: string;
  tag: string;
  image: string;
}

const COLUMN_1: PortfolioMockup[] = [
  {
    id: 'food-studio',
    title: 'Food Studio — Fast-Food',
    url: 'foodstudio.fr',
    tag: 'Restauration & Click&Collect',
    image: '/images/services/food-studio-storefront.png',
  },
  {
    id: 'aniq-overview',
    title: 'Aniq-ui — Dashboard Sombre',
    url: 'app.aniq-ui.com',
    tag: 'Dashboard SaaS B2B',
    image: '/images/portfolio/aniq-ui-overview.png',
  },
  {
    id: 'epbomi-hero',
    title: 'EPBOMI Europe — Église',
    url: 'epbomi-europe.org',
    tag: 'Portail Institutionnel',
    image: '/images/portfolio/epbomi-hero.png',
  },
  {
    id: 'fintech-dash',
    title: 'Vira — FinTech Banking',
    url: 'app.vira.bank',
    tag: 'FinTech & Cartes',
    image: '/images/services/fintech-dashboard.png',
  },
  {
    id: 'food-order',
    title: 'Food Studio — Commande',
    url: 'foodstudio.fr/commande',
    tag: 'Tunnel de Vente',
    image: '/images/services/food-studio-order.png',
  },
];

const COLUMN_2: PortfolioMockup[] = [
  {
    id: 'saas-arise',
    title: 'Arise — Growth Analytics',
    url: 'arise.io/analytics',
    tag: 'Plateforme Analytics',
    image: '/images/services/saas-stats-growth.png',
  },
  {
    id: 'magasin-store',
    title: 'Magasin — Mode & Prêt-à-porter',
    url: 'magasin.com',
    tag: 'E-commerce Moderne',
    image: '/images/portfolio/magasin-hero-storefront.png',
  },
  {
    id: 'epbomi-dons',
    title: 'EPBOMI — Dons en Ligne',
    url: 'epbomi-europe.org/don',
    tag: 'Paiement Sécurisé',
    image: '/images/portfolio/epbomi-dons-en-ligne.png',
  },
  {
    id: 'aniq-orders',
    title: 'Aniq-ui — Commandes',
    url: 'app.aniq-ui.com/orders',
    tag: 'Gestion Logistique',
    image: '/images/portfolio/aniq-ui-orders.png',
  },
  {
    id: 'fintech-cards',
    title: 'Vira — Cartes Virtuelles',
    url: 'app.vira.bank/cards',
    tag: 'Néobanque',
    image: '/images/services/fintech-cards.png',
  },
];

function MockupCard({ item }: { item: PortfolioMockup }) {
  return (
    <div className="group relative w-full overflow-hidden rounded-xl sm:rounded-2xl border border-black/[0.08] bg-white p-1.5 sm:p-2 shadow-soft hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      {/* Barre style navigateur macOS */}
      <div className="flex items-center justify-between px-2.5 py-1.5 mb-1.5 rounded-lg bg-zinc-900 text-zinc-300 select-none">
        <div className="flex items-center gap-1.5 shrink-0">
          <span className="w-2 h-2 rounded-full bg-[#ff5f56] inline-block" />
          <span className="w-2 h-2 rounded-full bg-[#ffbd2e] inline-block" />
          <span className="w-2 h-2 rounded-full bg-[#27c93f] inline-block" />
        </div>
        <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-black/60 text-[9px] sm:text-[10px] font-mono text-zinc-300 max-w-[150px] truncate shadow-inner">
          <span className="truncate">{item.url}</span>
        </div>
        <div className="w-3" />
      </div>

      {/* Image de capture HD sans déformation */}
      <div className="relative w-full aspect-[16/10] overflow-hidden rounded-lg bg-zinc-950">
        <Image
          src={item.image}
          alt={item.title}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
          loading="lazy"
        />
        {/* Voile discret au survol avec libellé */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-2.5 sm:p-3 text-white">
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
  // Duplication pour une boucle infinie continue et fluide (10 items par colonne)
  const col1Items = [...COLUMN_1, ...COLUMN_1];
  const col2Items = [...COLUMN_2, ...COLUMN_2];

  return (
    <div
      className={cn(
        "relative w-full h-[480px] sm:h-[560px] lg:h-[620px] xl:h-[660px] overflow-hidden [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)] pointer-events-auto",
        className
      )}
    >
      {/* Conteneur avec inclinaison subtile 3D style premium */}
      <div className="relative w-full h-full transform -rotate-2 sm:-rotate-3 scale-[1.03] sm:scale-[1.05] origin-center grid grid-cols-2 gap-3 sm:gap-4.5 px-1">
        {/* Colonne 1 : Défilement vertical vers le haut */}
        <div className="flex flex-col gap-3.5 sm:gap-4.5 animate-hero-col-up hover:[animation-play-state:paused]">
          {col1Items.map((item, idx) => (
            <MockupCard key={`col1-${item.id}-${idx}`} item={item} />
          ))}
        </div>

        {/* Colonne 2 : Défilement vertical vers le bas ou vitesse décalée */}
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
