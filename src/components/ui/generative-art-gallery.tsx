"use client";

import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Eye, ExternalLink, Globe } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface GalleryProject {
  id: string | number;
  title: string;
  category: string;
  description?: string;
  image: string;
  galleryImages: string[];
  link?: string;
  brandName?: string;
  brandIconBg?: string;
  clientName?: string;
  clientRole?: string;
  clientAvatar?: string;
  metric?: string;
  gradient?: string;
}

const DEFAULT_PROJECTS: GalleryProject[] = [
  {
    id: "food-studio",
    title: "Food Studio — Storefront E-commerce & Click and Collect",
    category: "Site E-commerce & Restauration",
    description: "Plateforme e-commerce moderne taillée pour la commande en ligne : menu interactif, sélection d'ingrédients sur-mesure et tunnel de conversion optimisé.",
    image: "/images/services/food-studio-storefront.png",
    galleryImages: [
      "/images/services/food-studio-storefront.png",
      "/images/services/food-studio-menu.png",
      "/images/services/food-studio-order.png"
    ],
    brandName: "Food Studio",
    brandIconBg: "bg-red-600",
    clientName: "Alexandre T.",
    clientRole: "Fondateur Food Studio",
    metric: "Commandes +65%",
    clientAvatar: "/images/avatars/client-portrait-1.jpg",
    link: "/portfolio"
  },
  {
    id: "arise-growth",
    title: "Arise — Dashboard SaaS & Analytics Utilisateurs",
    category: "Cockpit Métier & Analyse Prédictive",
    description: "Application web SaaS temps réel avec suivi de l'acquisition, sources de trafic détaillées et indicateurs de performance clés.",
    image: "/images/services/saas-dashboard-dark.png",
    galleryImages: [
      "/images/services/saas-dashboard-dark.png",
      "/images/services/saas-analytics-growth.png",
      "/images/services/saas-stats-growth.png",
      "/images/services/saas-world-map.png"
    ],
    brandName: "Arise SaaS",
    brandIconBg: "bg-blue-600",
    clientName: "David C.",
    clientRole: "Head of Product",
    metric: "Rétention 87%",
    clientAvatar: "/images/avatars/client-portrait-2.jpg",
    link: "/portfolio"
  },
  {
    id: "vira-fintech",
    title: "Vira — Dashboard Bancaire & Gestion Multi-Cartes",
    category: "FinTech & Application Web",
    description: "Interface bancaire ultra-fluide pour le suivi de trésorerie, la gestion multi-devises et le contrôle instantané des cartes bancaires.",
    image: "/images/services/fintech-dashboard.png",
    galleryImages: [
      "/images/services/fintech-dashboard.png",
      "/images/services/fintech-cards.png",
      "/images/services/fintech-login.png"
    ],
    brandName: "Vira",
    brandIconBg: "bg-blue-500",
    clientName: "John C.",
    clientRole: "Managing Director",
    metric: "Flux 86K€",
    clientAvatar: "/images/avatars/client-portrait-3.jpg",
    link: "/portfolio"
  },
  {
    id: "aniq-ui",
    title: "Aniq-ui — E-commerce & Studio IA",
    category: "Dashboard SaaS & Assistant IA",
    description: "Plateforme de gestion e-commerce haute performance avec suivi des commandes en temps réel, analytics et studio IA de génération de photos mannequin sur-mesure.",
    image: "/images/portfolio/aniq-ui-overview.png",
    galleryImages: [
      "/images/portfolio/aniq-ui-overview.png",
      "/images/portfolio/aniq-ui-orders.png",
      "/images/portfolio/aniq-ui-ai-product.png"
    ],
    brandName: "Aniq-ui",
    brandIconBg: "bg-slate-900",
    clientName: "Sami B.",
    clientRole: "Co-Founder & CPO Aniq-ui",
    metric: "Conversion +42%",
    clientAvatar: "/images/avatars/client-portrait-1.jpg",
    link: "/portfolio"
  },
  {
    id: "cygnus",
    title: "Centre Optique Emy Paul",
    category: "Site E-commerce & Prise de RDV",
    description: "Plateforme digitale complète avec catalogue montures, prise de rendez-vous en ligne et SEO local à Grenoble.",
    image: "/images/portfolio/Accueil-emypaul.opticafe.fr-emypaul.opticafe.fr_.png",
    galleryImages: [
      "/images/portfolio/Accueil-emypaul.opticafe.fr-emypaul.opticafe.fr_.png",
      "/images/portfolio/he75ojuxofe.jpg",
      "/images/portfolio/Capture-decran-2026-04-14-120629.png"
    ],
    brandName: "Emy Paul",
    brandIconBg: "bg-emerald-800",
    clientName: "Emy Paul",
    clientRole: "Fondatrice Centre Optique",
    metric: "RDV en ligne x3",
    clientAvatar: "/images/avatars/client-portrait-2.jpg",
    gradient: "from-[#084826] via-[#157a44] to-[#2cb269]",
    link: "/portfolio"
  },
  {
    id: "orion",
    title: "Sinai Happy Care",
    category: "Portail Médical & Services de Santé",
    description: "Application web responsive dédiée aux soins et à la réservation de prestations de santé.",
    image: "/images/portfolio/Sinaihappycare-sinaihappycare.com_.png",
    galleryImages: [
      "/images/portfolio/Sinaihappycare-sinaihappycare.com_.png",
      "/images/portfolio/Capture-decran-2026-04-14-120629.png",
      "/images/portfolio/Capture-decran-2026-06-16-163553.png"
    ],
    brandName: "Sinai Happy Care",
    brandIconBg: "bg-cyan-900",
    clientName: "Dr. K. Sinai",
    clientRole: "Directeur Médical Fondateur",
    metric: "Score SEO 100/100",
    clientAvatar: "/images/avatars/client-portrait-3.jpg",
    gradient: "from-[#021f2d] via-[#053d56] to-[#09668f]",
    link: "/portfolio"
  },
  {
    id: "draco",
    title: "Cockpit SEO & Data Intelligence",
    category: "Dashboard SaaS & CRM Métier",
    description: "Application web haute vélocité avec métriques en temps réel, gestion de leads et génération IA.",
    image: "/images/portfolio/Capture-decran-2026-04-14-120331.png",
    galleryImages: [
      "/images/portfolio/Capture-decran-2026-04-14-120331.png",
      "/images/portfolio/Capture-decran-2026-04-14-120629.png",
      "/images/portfolio/aniq-ui-overview.png"
    ],
    brandName: "Cockpit SEO",
    brandIconBg: "bg-indigo-900",
    clientName: "Julien R.",
    clientRole: "Head of Growth & Co-Founder",
    metric: "Trafic organique x4",
    clientAvatar: "/images/avatars/client-portrait-1.jpg",
    gradient: "from-[#190e2e] via-[#2f1854] to-[#51258d]",
    link: "/portfolio"
  },
  {
    id: "lyra",
    title: "EPBOMI Europe Portal",
    category: "Portail Institutionnel & Événements",
    description: "Refonte complète, calendrier interactif, gestion multilingue et référencement naturel.",
    image: "/images/portfolio/FireShot-Capture-008-Accueil-Epbomi-Europe-epbomi-europe.org-1.png",
    galleryImages: [
      "/images/portfolio/FireShot-Capture-008-Accueil-Epbomi-Europe-epbomi-europe.org-1.png",
      "/images/portfolio/Capture-decran-2026-06-16-163553.png",
      "/images/portfolio/Capture-decran-2026-04-14-120331.png"
    ],
    brandName: "EPBOMI Europe",
    brandIconBg: "bg-slate-800",
    clientName: "Jean M.",
    clientRole: "Coordinateur Général Europe",
    metric: "Portée multilingue",
    clientAvatar: "/images/avatars/client-portrait-2.jpg",
    gradient: "from-[#141b2b] via-[#243049] to-[#3a4c72]",
    link: "/portfolio"
  },
  {
    id: "vela",
    title: "Opticafé Expérience Client",
    category: "Web App & Conversion Visiteurs",
    description: "Tunnel d'acquisition personnalisé avec animations légères et synchronisation CRM.",
    image: "/images/portfolio/he75ojuxofe.jpg",
    galleryImages: [
      "/images/portfolio/he75ojuxofe.jpg",
      "/images/portfolio/Accueil-emypaul.opticafe.fr-emypaul.opticafe.fr_.png"
    ],
    brandName: "Opticafé",
    brandIconBg: "bg-amber-900",
    clientName: "Marc L.",
    clientRole: "Directeur Réseau & Expérience",
    metric: "+180 leads qualifiés",
    clientAvatar: "/images/avatars/client-portrait-3.jpg",
    gradient: "from-[#2b1605] via-[#4d280b] to-[#794114]",
    link: "/portfolio"
  }
];

// Carte Réalisation inspirée du format premium demandé
const ShowcaseProjectCard = ({
  item,
  onOpenProject
}: {
  item: GalleryProject;
  onOpenProject: (item: GalleryProject) => void;
}) => {
  const images = item.galleryImages && item.galleryImages.length > 0 ? item.galleryImages : [item.image];
  const [currentImgIndex, setCurrentImgIndex] = useState(0);

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImgIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImgIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
  };

  return (
    <div className="relative w-full rounded-[20px] sm:rounded-[26px] bg-[#0d0e14] border border-zinc-800/90 shadow-2xl shadow-black/25 overflow-hidden group transition-all duration-300 hover:border-zinc-700 hover:shadow-3xl flex flex-col">
      {/* 1. Cadre du site : Barre supérieure de navigation type navigateur web (aucun espace perdu) */}
      <div className="flex items-center justify-between px-3.5 py-2.5 bg-zinc-900/95 border-b border-zinc-800/80 backdrop-blur-md">
        {/* Contrôles fenêtre style macOS */}
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]/90 inline-block" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]/90 inline-block" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]/90 inline-block" />
        </div>

        {/* Barre d'adresse URL / Marque au centre */}
        <div className="flex items-center gap-2 text-[11px] text-zinc-300 font-mono bg-black/50 px-3 py-1 rounded-full border border-zinc-800 max-w-[200px] sm:max-w-xs truncate shadow-inner">
          <div
            className={cn(
              "w-3.5 h-3.5 rounded-full text-white flex items-center justify-center text-[8px] font-bold shrink-0",
              item.brandIconBg || "bg-brand-orange"
            )}
          >
            {item.brandName ? item.brandName.slice(0, 1).toUpperCase() : "W"}
          </div>
          <span className="truncate">{item.brandName || item.title}</span>
        </div>

        {/* Compteur discret de captures */}
        <div className="flex items-center gap-2">
          {images.length > 1 && (
            <span className="text-[10px] font-mono font-semibold text-zinc-400 bg-black/40 px-2 py-0.5 rounded-md border border-zinc-800">
              {currentImgIndex + 1}/{images.length}
            </span>
          )}
        </div>
      </div>

      {/* 2. Écran du site bord-à-bord (aucun espace ni marge vide autour du cadre) */}
      <div
        onClick={() => onOpenProject(item)}
        className="relative w-full aspect-[16/10] sm:aspect-[16/9.5] overflow-hidden bg-zinc-950 cursor-pointer group/screen"
      >
        <img
          src={images[currentImgIndex]}
          alt={`${item.title} - capture ${currentImgIndex + 1}`}
          className="w-full h-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.02]"
          loading="lazy"
        />

        {/* Reflet de vitre subtil */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

        {/* Badge métrique discret en haut à gauche */}
        {item.metric && (
          <div className="absolute top-3 left-3 pointer-events-none">
            <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-white bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/15 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              {item.metric}
            </span>
          </div>
        )}

        {/* Indication au survol pour agrandir */}
        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover/screen:opacity-100 transition-opacity duration-200 flex items-center justify-center pointer-events-none">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/95 text-gray-900 text-xs font-semibold shadow-lg backdrop-blur-md">
            <Eye className="w-3.5 h-3.5 text-blue-600" />
            Agrandir la capture
          </span>
        </div>

        {/* 3. Boutons de navigation incrustés directement dans le cadre en bas à droite (zéro espace perdu) */}
        {images.length > 1 && (
          <div className="absolute bottom-3 right-3 flex items-center gap-2 z-20">
            <button
              onClick={handlePrevImage}
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-blue-600 hover:bg-blue-700 active:scale-95 text-white flex items-center justify-center shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-blue-400 border border-white/20"
              aria-label="Capture précédente"
            >
              <ChevronLeft className="w-4 h-4 sm:w-4.5 sm:h-4.5 stroke-[2.5]" />
            </button>
            <button
              onClick={handleNextImage}
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-blue-600 hover:bg-blue-700 active:scale-95 text-white flex items-center justify-center shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-blue-400 border border-white/20"
              aria-label="Capture suivante"
            >
              <ChevronRight className="w-4 h-4 sm:w-4.5 sm:h-4.5 stroke-[2.5]" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// Modal Carousel Lightbox
const ProjectCarouselModal = ({
  project,
  onClose
}: {
  project: GalleryProject | null;
  onClose: () => void;
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setCurrentIndex(0);
  }, [project]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (!project) return;
      if (e.key === 'ArrowLeft') {
        setCurrentIndex((prev) => (prev > 0 ? prev - 1 : project.galleryImages.length - 1));
      }
      if (e.key === 'ArrowRight') {
        setCurrentIndex((prev) => (prev < project.galleryImages.length - 1 ? prev + 1 : 0));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [project, onClose]);

  if (!project) return null;

  const images = project.galleryImages && project.galleryImages.length > 0 ? project.galleryImages : [project.image];

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
  };

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-md p-4 sm:p-6"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-label={`Galerie du projet ${project.title}`}
      >
        <div
          className="relative w-full max-w-5xl bg-white border border-gray-200 rounded-3xl overflow-hidden shadow-2xl flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header modal */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200/80 bg-gray-50/70">
            <div>
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                {project.category}
              </span>
              <h3 className="text-xl font-bold font-display text-gray-900 mt-0.5">
                {project.title}
              </h3>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full text-gray-500 hover:text-gray-900 hover:bg-gray-200/70 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-600"
              aria-label="Fermer la galerie"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Main Carousel Display */}
          <div className="relative w-full h-[360px] sm:h-[480px] lg:h-[540px] bg-gray-900 flex items-center justify-center overflow-hidden group">
            <img
              src={images[currentIndex]}
              alt={`${project.title} - vue ${currentIndex + 1}`}
              className="max-h-full max-w-full object-contain transition-transform duration-300 hover:scale-102"
            />

            {/* Navigation Arrows */}
            {images.length > 1 && (
              <>
                <button
                  onClick={handlePrev}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/90 hover:bg-blue-600 text-gray-900 hover:text-white backdrop-blur-md border border-gray-200 transition-all duration-200 shadow-lg"
                  aria-label="Image précédente"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={handleNext}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/90 hover:bg-blue-600 text-gray-900 hover:text-white backdrop-blur-md border border-gray-200 transition-all duration-200 shadow-lg"
                  aria-label="Image suivante"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}

            {/* Counter badge */}
            <div className="absolute bottom-4 right-4 bg-black/75 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/15 text-xs font-semibold text-white">
              {currentIndex + 1} / {images.length}
            </div>
          </div>

          {/* Footer & Thumbnails */}
          <div className="px-6 py-4 bg-white border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-600 max-w-xl text-center sm:text-left">
              {project.description || "Aperçu détaillé des maquettes et fonctionnalités développées."}
            </p>

            {/* Thumbnails preview */}
            {images.length > 1 && (
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={cn(
                      "relative w-14 h-10 rounded-lg overflow-hidden border-2 shrink-0 transition-all duration-200 bg-gray-100",
                      currentIndex === idx
                        ? "border-blue-600 scale-105 shadow-md shadow-blue-600/20"
                        : "border-gray-200 opacity-60 hover:opacity-100"
                    )}
                  >
                    <img src={img} alt="miniature" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </AnimatePresence>
  );
};

export interface GenerativeArtGalleryProps {
  projects?: GalleryProject[];
  className?: string;
  badge?: string;
  title?: string;
  subtitle?: string;
}

export default function GenerativeArtGallery({
  projects = DEFAULT_PROJECTS,
  className = "",
  badge = "Nos Réalisations Récentes",
  title = "Des projets créés pour inspirer et convertir",
  subtitle = "Parcourez les captures d'écran directement dans les cartes ou cliquez pour agrandir chaque réalisation.",
}: GenerativeArtGalleryProps) {
  const [selectedProject, setSelectedProject] = useState<GalleryProject | null>(null);

  return (
    <section className={cn("relative w-full py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-[#fafbfc] border-t border-gray-200/70 text-gray-900 font-sans overflow-hidden", className)}>
      <div className="relative z-10 max-w-7xl mx-auto flex flex-col items-center">
        {/* En-tête de section */}
        <div className="text-center mb-12 sm:mb-16">
          <span className="inline-flex items-center gap-2 rounded-full border border-black/[0.08] bg-black/[0.03] px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.08em] text-[#5c5c64] mb-4 shadow-2xs">
            <Eye className="w-3.5 h-3.5 text-brand-orange" />
            {badge}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display tracking-tight text-gray-900 mb-4">
            {title}
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* Grille 2 colonnes fidèle au mockup fourni */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {projects.map((item) => (
            <ShowcaseProjectCard
              key={item.id || item.title}
              item={item}
              onOpenProject={(proj) => setSelectedProject(proj)}
            />
          ))}
        </div>
      </div>

      {/* Modal Lightbox Carrousel au clic */}
      {selectedProject && (
        <ProjectCarouselModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
}
