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

const Card = ({ card, className }: { card: CardItem; className?: string }) => {
  return (
    <div
      className={cn(
        "group relative h-[300px] w-[400px] shrink-0 cursor-pointer overflow-hidden rounded-xl shadow-2xl",
        className,
      )}
    >
      <img
        src={card.url}
        alt={card.title}
        className="h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-black/40" />
    </div>
  );
};

const MarqueeRow = ({
  cards,
  speed,
  direction,
  cardClassName,
}: {
  cards: CardItem[];
  speed: number;
  direction: 1 | -1;
  cardClassName?: string;
}) => {
  const animationClass =
    direction === -1 ? "animate-marquee-left" : "animate-marquee-right";

  return (
    <div className="flex w-full overflow-hidden">
      <div
        className={cn(
          "flex shrink-0 cursor-pointer hover:[animation-play-state:paused]",
          animationClass,
        )}
        style={{ "--speed": `${speed}s` } as React.CSSProperties}
      >
        <div className="flex shrink-0">
          {cards.map((card, idx) => (
            <div key={`${card.id}-${idx}`} className="shrink-0 pr-8">
              <Card card={card} className={cardClassName} />
            </div>
          ))}
        </div>
        <div className="flex shrink-0">
          {cards.map((card, idx) => (
            <div key={`${card.id}-${idx}-copy`} className="shrink-0 pr-8">
              <Card card={card} className={cardClassName} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default function DiagonalMarqueeCarousel({
  cards = DEFAULT_CARDS,
  angle = -25,
  baseSpeed = 120,
  alternateDirections = true,
  className = "",
  cardClassName = "",
  fadeClassName = "",
}: DiagonalMarqueeCarouselProps) {
  const rotationStyle = {
    transform: `rotate(${angle}deg)`,
  };

  const rowCards = [...cards, ...cards, ...cards];
  const rowCardsReverse = [...rowCards].reverse();

  return (
    <div
      className={cn(
        "relative flex h-screen w-full items-center justify-center overflow-hidden",
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
        className="absolute z-0 flex w-[200vw] flex-col gap-8"
        style={rotationStyle}
      >
        <MarqueeRow
          cards={rowCards}
          speed={baseSpeed}
          direction={-1}
          cardClassName={cardClassName}
        />
        <MarqueeRow
          cards={rowCardsReverse}
          speed={baseSpeed + 25}
          direction={alternateDirections ? 1 : -1}
          cardClassName={cardClassName}
        />
        <MarqueeRow
          cards={rowCards}
          speed={baseSpeed + 15}
          direction={-1}
          cardClassName={cardClassName}
        />
        <MarqueeRow
          cards={rowCardsReverse}
          speed={baseSpeed + 35}
          direction={alternateDirections ? 1 : -1}
          cardClassName={cardClassName}
        />
        <MarqueeRow
          cards={rowCards}
          speed={baseSpeed + 20}
          direction={-1}
          cardClassName={cardClassName}
        />
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
