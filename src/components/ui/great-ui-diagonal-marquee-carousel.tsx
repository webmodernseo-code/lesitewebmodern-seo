"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface CardItem {
  id: string | number;
  url: string;
  title: string;
}

export interface DiagonalMarqueeCarouselProps {
  cards?: CardItem[];
  angle?: number;
  baseSpeed?: number;
  alternateDirections?: boolean;
  rowCount?: number;
  pauseOnHover?: boolean;
  dimCards?: boolean;
  rowGap?: number;
  speedStep?: number;
  className?: string;
  cardClassName?: string;
  fadeClassName?: string;
}

const DEFAULT_CARDS: CardItem[] = [
  {
    id: 'aniq-overview',
    url: '/images/portfolio/aniq-ui-overview.png',
    title: 'Aniq-ui Analytics Dashboard',
  },
  {
    id: 'aniq-orders',
    url: '/images/portfolio/aniq-ui-orders.png',
    title: 'Aniq-ui Orders Management',
  },
  {
    id: 'aniq-ai-product',
    url: '/images/portfolio/aniq-ui-ai-product.png',
    title: 'Aniq-ui AI Product Studio',
  },
  {
    id: 'emypaul',
    url: '/images/portfolio/Accueil-emypaul.opticafe.fr-emypaul.opticafe.fr_.png',
    title: 'Centre Optique Emy Paul',
  },
  {
    id: 'sinai',
    url: '/images/portfolio/Sinaihappycare-sinaihappycare.com_.png',
    title: 'Sinai Happy Care',
  },
  {
    id: 'epbomi',
    url: '/images/portfolio/FireShot-Capture-008-Accueil-Epbomi-Europe-epbomi-europe.org-1.png',
    title: 'EPBOMI Europe Portal',
  },
  {
    id: 'opticafe',
    url: '/images/portfolio/he75ojuxofe.jpg',
    title: 'Opticafé Client Experience',
  },
  {
    id: 'cockpit-seo',
    url: '/images/portfolio/Capture-decran-2026-04-14-120331.png',
    title: 'Cockpit SEO SaaS Platform',
  },
];

const Card = ({ card, className, dimmed }: { card: CardItem; className?: string; dimmed: boolean }) => {
  return (
    <div
      className={cn(
        "group relative shrink-0 cursor-pointer overflow-hidden rounded-xl border border-black/[0.08] bg-white shadow-2xs transition-all duration-300 hover:shadow-md hover:border-black/20",
        className,
      )}
    >
      <img
        src={card.url}
        alt={card.title}
        className="h-full w-full object-cover object-top"
        loading="lazy"
      />
      {dimmed && <div className="absolute inset-0 bg-black/40" />}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent p-2 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
        <p className="truncate text-xs font-medium text-white">{card.title}</p>
      </div>
    </div>
  );
};

const MarqueeRow = ({
  cards,
  speed,
  direction,
  cardClassName,
  pauseOnHover,
  dimCards,
}: {
  cards: CardItem[];
  speed: number;
  direction: 1 | -1;
  cardClassName?: string;
  pauseOnHover: boolean;
  dimCards: boolean;
}) => {
  const animationClass =
    direction === -1 ? "animate-marquee-left" : "animate-marquee-right";

  return (
    <div className="flex w-full py-0.5">
      <div
        className={cn(
          "flex shrink-0",
          pauseOnHover && "cursor-pointer hover:[animation-play-state:paused]",
          animationClass,
        )}
        style={{ "--speed": `${speed}s` } as React.CSSProperties}
      >
        <div className="flex shrink-0">
          {cards.map((card, idx) => (
            <div key={`${card.id}-${idx}`} className="shrink-0 pr-3 sm:pr-5 lg:pr-6">
              <Card card={card} className={cardClassName} dimmed={dimCards} />
            </div>
          ))}
        </div>
        <div className="flex shrink-0">
          {cards.map((card, idx) => (
            <div key={`${card.id}-${idx}-copy`} className="shrink-0 pr-3 sm:pr-5 lg:pr-6">
              <Card card={card} className={cardClassName} dimmed={dimCards} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default function DiagonalMarqueeCarousel({
  cards = DEFAULT_CARDS,
  angle = 0,
  baseSpeed = 80,
  alternateDirections = true,
  rowCount = 2,
  pauseOnHover = true,
  dimCards = false,
  rowGap = 12,
  speedStep = 0,
  className = "",
  cardClassName = "",
  fadeClassName = "",
}: DiagonalMarqueeCarouselProps) {
  const rotationStyle = angle !== 0 ? {
    transform: `rotate(${angle}deg)`,
  } : undefined;

  const rowCards = [...cards, ...cards, ...cards];
  const rowCardsReverse = [...rowCards].reverse();
  const rows = Array.from({ length: Math.max(1, Math.min(rowCount, 5)) });

  return (
    <div
      className={cn(
        "relative flex w-full items-center justify-center overflow-hidden",
        className,
      )}
    >
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes marquee-left {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-50%, 0, 0); }
        }
        @keyframes marquee-right {
          0% { transform: translate3d(-50%, 0, 0); }
          100% { transform: translate3d(0, 0, 0); }
        }
        .animate-marquee-left {
          animation: marquee-left var(--speed) linear infinite;
        }
        .animate-marquee-right {
          animation: marquee-right var(--speed) linear infinite;
        }
      `,
        }}
      />
      <div
        className={cn(
          "absolute z-0 flex flex-col",
          angle !== 0 ? "w-[220vw]" : "w-full"
        )}
        style={{ ...rotationStyle, gap: `${rowGap}px` }}
      >
        {rows.map((_, index) => (
          <MarqueeRow
            key={index}
            cards={index % 2 === 0 ? rowCards : rowCardsReverse}
            speed={baseSpeed + index * speedStep}
            direction={index % 2 === 1 && alternateDirections ? 1 : -1}
            cardClassName={cardClassName}
            pauseOnHover={pauseOnHover}
            dimCards={dimCards}
          />
        ))}
      </div>

      {fadeClassName !== "hidden" && fadeClassName !== "none" && (
        <>
          <div
            className={cn(
              "pointer-events-none absolute inset-x-0 top-0 z-10 h-1/4 bg-gradient-to-b from-white to-transparent dark:from-neutral-950",
              fadeClassName,
            )}
          />
          <div
            className={cn(
              "pointer-events-none absolute inset-x-0 bottom-0 z-10 h-1/4 bg-gradient-to-t from-white to-transparent dark:from-neutral-950",
              fadeClassName,
            )}
          />
        </>
      )}
    </div>
  );
}
