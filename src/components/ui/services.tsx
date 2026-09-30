'use client';

import React from 'react';
import { cn } from '@/lib/utils';

export interface ServiceItem {
  title: string;
  description?: string;
  image: string;
  overlayImage: string;
  tag?: string;
  href?: string;
}

const DEFAULT_SERVICES: ServiceItem[] = [
  {
    title: "Création Web & Next.js",
    description: "Sites vitrines ultra-rapides et applications web sur-mesure optimisées pour la conversion.",
    image: "https://cdn.21st.dev/assets/mirror/00/0075b65d41fca0904bd9a586c21c5cd4f13205aa4873d58d4b876262b3e5c664.png",
    overlayImage: "https://cdn.21st.dev/assets/mirror/b1/b199a356519c9ae1e92a1d7ebe8c41d8f55aa94c1b9cc0583c443644b1997cb8.png",
    tag: "Next.js 14",
    href: "/services/creation-web",
  },
  {
    title: "Référencement SEO & SXO",
    description: "Positionnement en 1ère page Google, optimisation sémantique et acquisition de trafic qualifié.",
    image: "https://cdn.21st.dev/assets/mirror/8a/8a05f191e80c3572b29a25abadb94c8c7dafb95eab9560a73252eaefab3b0d67.png",
    overlayImage: "https://cdn.21st.dev/assets/mirror/bf/bfb31dcaa33c807b58eff4bc68a6401f9eb0d47ed3d9359e87dc593f99088afe.png",
    tag: "Google Rank #1",
    href: "/services/referencement-seo",
  },
  {
    title: "Design UI/UX & Branding",
    description: "Identités visuelles marquantes, chartes graphiques complètes et interfaces intuitives.",
    image: "https://cdn.21st.dev/assets/mirror/5d/5dc6886ceeb2ef769d3afef85dd576af4cfb6794f59528677823cd88041b7bdf.png",
    overlayImage: "https://cdn.21st.dev/assets/mirror/77/779add1d4f85ce6a0dc20b6c1905ba0b052b7b92814703ed0aca2bd1d6b8061a.png",
    tag: "Figma & Design System",
    href: "/services",
  },
  {
    title: "Acquisition & Automatisation",
    description: "Publicités ciblées Meta Ads, Google Ads et flux de prospection automatisés avec l'IA.",
    image: "https://cdn.21st.dev/assets/mirror/f4/f4ee66d52172030b33772c6099caadec71c79e1b9272a9bae2b1e1ba409c4488.png",
    overlayImage: "https://cdn.21st.dev/assets/mirror/3e/3ebdddb7f0a352418e58e3a72737d6a27c454f577ada3da9a53d3b790ca59a8c.png",
    tag: "Meta Ads & n8n",
    href: "/services/acquisition-clients",
  }
];

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
  subtitle = "Des solutions digitales complètes pour transformer vos visiteurs en clients fidèles.",
}: ServicesSectionProps) {
  return (
    <section className={cn("w-full py-16 sm:py-20 lg:py-24 px-4 sm:px-6 bg-white font-sans", className)}>
      <div className="max-w-6xl mx-auto">
        {/* En-tête de section */}
        <div className="text-center mb-12 sm:mb-16">
          <span className="inline-flex items-center gap-2 rounded-full border border-black/[0.08] bg-black/[0.03] px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.08em] text-[#5c5c64] mb-4">
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

        {/* Grille des services */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
          {services.map((service, index) => {
            const CardWrapper = service.href ? 'a' : 'div';
            return (
              <CardWrapper
                key={index}
                href={service.href}
                className="group relative bg-[#f8f9fa] border border-gray-200/80 rounded-3xl p-6 sm:p-8 flex flex-col h-[340px] sm:h-[380px] transition-all duration-300 hover:bg-white hover:shadow-xl hover:border-brand-orange/30 hover:-translate-y-1 cursor-pointer overflow-hidden"
              >
                {/* Badge Tag */}
                {service.tag && (
                  <div className="self-start mb-2">
                    <span className="inline-block text-[11px] font-semibold tracking-wide uppercase px-2.5 py-1 rounded-full bg-white border border-gray-200 text-gray-700 shadow-2xs">
                      {service.tag}
                    </span>
                  </div>
                )}

                {/* Conteneur d'images avec effet de superposition et rotation 3D */}
                <div className="relative flex-grow flex items-center justify-center my-2">
                  {/* Image d'arrière-plan */}
                  <img
                    src={service.image}
                    alt={`${service.title} illustration`}
                    className="absolute w-44 sm:w-52 h-auto rounded-xl shadow-md transform -rotate-6 transition-all duration-500 ease-out group-hover:rotate-[-12deg] group-hover:scale-105"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.onerror = null;
                      target.src = 'https://cdn.21st.dev/assets/mirror/30/30250990bb2d78ef3d4e4c44b952a1b22c78a0a622afaedbe444d7f2143c783e.svg';
                    }}
                  />
                  {/* Image de premier plan */}
                  <img
                    src={service.overlayImage}
                    alt={`${service.title} aperçu`}
                    className="absolute w-44 sm:w-52 h-auto rounded-xl shadow-xl transform rotate-3 transition-all duration-500 ease-out group-hover:rotate-[8deg] group-hover:scale-108"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.onerror = null;
                      target.src = 'https://cdn.21st.dev/assets/mirror/11/11e4179fcd829c41a53db65ab04e003033b85e0f43cf2b619a6cde35c8d311f2.svg';
                    }}
                  />
                </div>

                {/* Titre & Description du service */}
                <div className="mt-auto z-10 pt-4 border-t border-gray-100 flex items-center justify-between">
                  <div>
                    <h3 className="text-left text-lg sm:text-xl font-bold text-gray-900 group-hover:text-brand-orange transition-colors">
                      {service.title}
                    </h3>
                    {service.description && (
                      <p className="text-xs sm:text-sm text-gray-500 mt-1 line-clamp-1">
                        {service.description}
                      </p>
                    )}
                  </div>
                  <div className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center shrink-0 ml-3 text-gray-400 group-hover:text-brand-orange group-hover:border-brand-orange group-hover:translate-x-0.5 transition-all">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </CardWrapper>
            );
          })}
        </div>
      </div>
    </section>
  );
}
