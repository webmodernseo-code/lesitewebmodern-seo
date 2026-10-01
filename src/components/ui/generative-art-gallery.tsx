"use client";

import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Eye, ExternalLink } from 'lucide-react';
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
    gradient: "from-[#021027] via-[#041d44] to-[#0a316c]",
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
    <div
      className={cn(
        "group relative w-full rounded-[26px] sm:rounded-[34px] overflow-hidden p-4 sm:p-6 shadow-xl flex flex-col justify-between transition-all duration-300 hover:shadow-2xl border border-white/15",
        `bg-gradient-to-br ${item.gradient || "from-[#021027] via-[#041d44] to-[#0a316c]"}`
      )}
    >
      {/* 1. Haut de carte : Badge Pilule Blanche Marque */}
      <div className="flex items-center justify-between w-full z-10">
        <div className="inline-flex items-center gap-2.5 rounded-full bg-white px-3.5 py-1.5 shadow-md">
          <div
            className={cn(
              "w-6 h-6 rounded-full text-white flex items-center justify-center text-[10px] font-bold shrink-0 shadow-2xs",
              item.brandIconBg || "bg-gray-900"
            )}
          >
            {item.brandName ? item.brandName.slice(0, 2).toUpperCase() : "WM"}
          </div>
          <span className="text-xs sm:text-sm font-bold text-gray-900 tracking-tight">
            {item.brandName || item.title}
          </span>
        </div>

        {/* Compteur discret de captures */}
        {images.length > 1 && (
          <span className="text-[11px] font-semibold text-white/90 bg-black/35 backdrop-blur-md px-3 py-1 rounded-full border border-white/15">
            {currentImgIndex + 1} / {images.length}
          </span>
        )}
      </div>

      {/* 2. Centre : Écran Mockup avec capture de réalisation */}
      <div
        onClick={() => onOpenProject(item)}
        className="relative my-4 sm:my-5 w-full aspect-[16/10] sm:aspect-[16/9.6] rounded-xl sm:rounded-[20px] overflow-hidden bg-black/60 border border-white/20 shadow-2xl backdrop-blur-xs flex items-center justify-center cursor-pointer group/screen transition-transform duration-300 hover:scale-[1.01]"
      >
        <img
          src={images[currentImgIndex]}
          alt={`${item.title} - capture ${currentImgIndex + 1}`}
          className="w-full h-full object-cover object-top transition-opacity duration-300"
          loading="lazy"
        />

        {/* Effet reflet de verre en biseau */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10" />

        {/* Indication au survol pour ouvrir en plein écran */}
        <div className="absolute inset-0 bg-black/35 opacity-0 group-hover/screen:opacity-100 transition-opacity duration-200 flex items-center justify-center">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/95 text-gray-900 text-xs font-semibold shadow-lg backdrop-blur-md">
            <Eye className="w-3.5 h-3.5 text-blue-600" />
            Agrandir la capture
          </span>
        </div>
      </div>

      {/* 3. Bas de carte : Pilule Fondateur/Métriques à gauche + 2 Boutons Flèches Bleues à droite */}
      <div className="flex items-center justify-between gap-3 w-full z-10 pt-1">
        {/* Pilule Fondateur & Métrique clé */}
        <div className="inline-flex items-center gap-2.5 sm:gap-3 rounded-full bg-white p-1.5 pr-4 sm:pr-5 shadow-lg max-w-[calc(100%-88px)] sm:max-w-none">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full overflow-hidden shrink-0 border border-gray-100 bg-gray-100 shadow-2xs">
            <img
              src={item.clientAvatar || "/images/avatars/client-portrait-1.jpg"}
              alt={item.clientName || item.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <span className="text-xs sm:text-sm font-bold text-gray-900 truncate">
                {item.clientName || item.title}
              </span>
              {item.metric && (
                <span className="text-[10px] sm:text-xs font-semibold text-blue-600 shrink-0">
                  {item.metric}
                </span>
              )}
            </div>
            <p className="text-[10px] sm:text-xs text-gray-500 font-medium truncate">
              {item.clientRole || item.category}
            </p>
          </div>
        </div>

        {/* Boutons de navigation (flèches bleues circulaires) */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handlePrevImage}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-blue-600 hover:bg-blue-700 active:scale-95 text-white flex items-center justify-center shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-blue-400"
            aria-label="Capture précédente"
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
          </button>
          <button
            onClick={handleNextImage}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-blue-600 hover:bg-blue-700 active:scale-95 text-white flex items-center justify-center shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-blue-400"
            aria-label="Capture suivante"
          >
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
          </button>
        </div>
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
