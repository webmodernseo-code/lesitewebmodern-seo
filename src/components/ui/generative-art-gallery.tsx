"use client";

import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Eye } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface GalleryProject {
  id: string | number;
  title: string;
  image: string;
  galleryImages: string[];
  slideUrls?: string[];
  brandName?: string;
  brandIconBg?: string;
}

// Les 6 projets distincts et dissociés, sans mélange
const DEFAULT_PROJECTS: GalleryProject[] = [
  // 1. Le site pour la nourriture (Fast-Food blanc Food Studio)
  {
    id: "food-studio",
    title: "Food Studio — Fast-Food",
    image: "/images/services/food-studio-storefront.png",
    galleryImages: [
      "/images/services/food-studio-storefront.png",
      "/images/services/food-studio-menu.png",
      "/images/services/food-studio-order.png"
    ],
    slideUrls: [
      "foodstudio.fr",
      "foodstudio.fr/menu",
      "foodstudio.fr/commande"
    ],
    brandName: "Food Studio"
  },

  // 2. Le site sombre avec du bleu (Landing page SaaS)
  {
    id: "saas-landing-blue",
    title: "SaaS Analytics & Growth",
    image: "/images/services/saas-stats-growth.png",
    galleryImages: [
      "/images/services/saas-stats-growth.png",
      "/images/services/saas-world-map.png",
      "/images/services/saas-dashboard-dark.png",
      "/images/services/saas-analytics-growth.png"
    ],
    slideUrls: [
      "saas-analytics.io",
      "saas-analytics.io/world",
      "saas-analytics.io/dashboard",
      "saas-analytics.io/metrics"
    ],
    brandName: "SaaS Analytics"
  },

  // 3. Le site e-commerce Magasin
  {
    id: "magasin-ecommerce",
    title: "Magasin — E-commerce Prêt-à-porter",
    image: "/images/portfolio/magasin-hero-storefront.png",
    galleryImages: [
      "/images/portfolio/magasin-hero-storefront.png",
      "/images/portfolio/magasin-categories.png",
      "/images/portfolio/magasin-catalog-grid.png",
      "/images/portfolio/magasin-product-detail.png"
    ],
    slideUrls: [
      "magasin.com",
      "magasin.com/collections",
      "magasin.com/catalogue",
      "magasin.com/produits/denim-shirt"
    ],
    brandName: "Magasin"
  },

  // 4. Le dashboard sombre Aniq-ui (dissocié de l'e-commerce)
  {
    id: "aniq-ui-dashboard",
    title: "Aniq-ui — Dashboard Sombre & Studio IA",
    image: "/images/portfolio/aniq-ui-overview.png",
    galleryImages: [
      "/images/portfolio/aniq-ui-overview.png",
      "/images/portfolio/aniq-ui-orders.png",
      "/images/portfolio/aniq-ui-ai-product.png",
      "/images/portfolio/aniq-ui-ai-studio.png"
    ],
    slideUrls: [
      "app.aniq-ui.com/dashboard",
      "app.aniq-ui.com/orders",
      "app.aniq-ui.com/products",
      "app.aniq-ui.com/ai-studio"
    ],
    brandName: "Aniq-ui"
  },

  // 5. Le site DigiPro (dissocié d'Emy Paul Opticafé)
  {
    id: "digipro-platform",
    title: "DigiPro — Plateforme de Services Digitaux",
    image: "/images/portfolio/Capture-decran-2026-04-14-120629.png",
    galleryImages: [
      "/images/portfolio/Capture-decran-2026-04-14-120629.png"
    ],
    slideUrls: [
      "digiproo.com"
    ],
    brandName: "digiproo.com"
  },

  // 6. Le site Emy Paul Opticafé (dissocié de DigiPro)
  {
    id: "emypaul-opticafe",
    title: "Centre Optique Emy Paul & Opticafé",
    image: "/images/portfolio/Accueil-emypaul.opticafe.fr-emypaul.opticafe.fr_.png",
    galleryImages: [
      "/images/portfolio/Accueil-emypaul.opticafe.fr-emypaul.opticafe.fr_.png",
      "/images/portfolio/he75ojuxofe.jpg"
    ],
    slideUrls: [
      "emypaul.opticafe.fr",
      "opticafe.fr"
    ],
    brandName: "emypaul.opticafe.fr"
  }
];

// Carte Réalisation au format navigateur épuré (Zéro description, que des images brutes avec défilement)
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

  const currentUrl = item.slideUrls && item.slideUrls[currentImgIndex]
    ? item.slideUrls[currentImgIndex]
    : (item.brandName ? `${item.brandName.toLowerCase().replace(/\s+/g, '')}.com` : "webmodernseo.co");

  return (
    <div className="relative w-full rounded-[20px] bg-[#0d0e14] border border-zinc-800/90 shadow-xl overflow-hidden flex flex-col group transition-all duration-300 hover:border-zinc-700">
      {/* 1. Cadre du site : Barre supérieure type navigateur web */}
      <div className="flex items-center justify-between px-3.5 py-2.5 bg-zinc-900 border-b border-zinc-800 text-zinc-300 select-none">
        {/* Contrôles fenêtre style macOS */}
        <div className="flex items-center gap-1.5 shrink-0">
          <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56] inline-block" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e] inline-block" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f] inline-block" />
        </div>

        {/* Barre d'adresse URL dynamique liée à l'image active */}
        <div className="flex items-center gap-1.5 text-[11px] text-zinc-300 font-mono bg-black/60 px-3 py-0.5 rounded-full border border-zinc-800 max-w-[200px] truncate shadow-inner">
          <span className="truncate">{currentUrl}</span>
        </div>

        {/* Compteur d'images si le projet en contient plusieurs */}
        <div className="flex items-center gap-1 shrink-0">
          {images.length > 1 && (
            <span className="text-[10px] font-mono font-semibold text-zinc-400 bg-black/50 px-2 py-0.5 rounded-md border border-zinc-800">
              {currentImgIndex + 1}/{images.length}
            </span>
          )}
        </div>
      </div>

      {/* 2. Écran du site avec image brute bord-à-bord (sans aucune marge ni description) */}
      <div
        onClick={() => onOpenProject(item)}
        className="relative w-full aspect-[16/10] overflow-hidden bg-zinc-950 cursor-pointer group/screen"
      >
        <img
          src={images[currentImgIndex]}
          alt={`${item.title} - écran ${currentImgIndex + 1}`}
          className="w-full h-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.015]"
          loading="lazy"
        />

        {/* Survol discret pour inciter à agrandir */}
        <div className="absolute inset-0 bg-black/25 opacity-0 group-hover/screen:opacity-100 transition-opacity duration-200 flex items-center justify-center pointer-events-none">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/95 text-gray-900 text-xs font-semibold shadow-lg backdrop-blur-md">
            <Eye className="w-3.5 h-3.5 text-blue-600" />
            Agrandir
          </span>
        </div>

        {/* Boutons de navigation incrustés au bas à droite s'il y a plusieurs images */}
        {images.length > 1 && (
          <div className="absolute bottom-2.5 right-2.5 flex items-center gap-1.5 z-20">
            <button
              onClick={handlePrevImage}
              className="w-8 h-8 rounded-full bg-black/80 hover:bg-black text-white flex items-center justify-center shadow-lg transition-all border border-white/20 active:scale-95"
              aria-label="Image précédente"
            >
              <ChevronLeft className="w-4 h-4 stroke-[2.5]" />
            </button>
            <button
              onClick={handleNextImage}
              className="w-8 h-8 rounded-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center shadow-lg transition-all border border-white/20 active:scale-95"
              aria-label="Image suivante"
            >
              <ChevronRight className="w-4 h-4 stroke-[2.5]" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// Modale Carrousel Lightbox plein écran
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
      const count = project.galleryImages?.length || 1;
      if (e.key === 'ArrowLeft') {
        setCurrentIndex((prev) => (prev > 0 ? prev - 1 : count - 1));
      }
      if (e.key === 'ArrowRight') {
        setCurrentIndex((prev) => (prev < count - 1 ? prev + 1 : 0));
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
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-3 sm:p-6"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-label={`Galerie du projet ${project.title}`}
      >
        <div
          className="relative w-full max-w-5xl bg-zinc-950 border border-zinc-800 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[95vh]"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header modal */}
          <div className="flex items-center justify-between px-5 py-3.5 border-b border-zinc-800 bg-zinc-900/90 text-white">
            <span className="text-sm font-semibold tracking-wide text-zinc-200">
              {project.title}
            </span>

            <button
              onClick={onClose}
              className="p-2 rounded-full text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors focus:outline-none"
              aria-label="Fermer la galerie"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Affichage de l'image brute agrandie */}
          <div className="relative w-full h-[360px] sm:h-[500px] lg:h-[600px] bg-black flex items-center justify-center overflow-hidden">
            <img
              src={images[currentIndex]}
              alt={`${project.title} - vue ${currentIndex + 1}`}
              className="max-h-full max-w-full object-contain"
            />

            {/* Navigation flèches */}
            {images.length > 1 && (
              <>
                <button
                  onClick={handlePrev}
                  className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 sm:p-3 rounded-full bg-black/70 hover:bg-black text-white backdrop-blur-md border border-white/20 transition-all shadow-lg active:scale-95"
                  aria-label="Image précédente"
                >
                  <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
                <button
                  onClick={handleNext}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 sm:p-3 rounded-full bg-black/70 hover:bg-black text-white backdrop-blur-md border border-white/20 transition-all shadow-lg active:scale-95"
                  aria-label="Image suivante"
                >
                  <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
              </>
            )}

            {/* Compteur d'images en bas */}
            <div className="absolute bottom-3 right-4 pointer-events-none">
              <span className="text-xs font-mono font-semibold text-white bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/15">
                {currentIndex + 1} / {images.length}
              </span>
            </div>
          </div>

          {/* Miniatures simples si plusieurs images */}
          {images.length > 1 && (
            <div className="px-5 py-3 bg-zinc-900 border-t border-zinc-800 flex items-center gap-2 overflow-x-auto">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={cn(
                    "relative w-14 h-9 rounded-md overflow-hidden border-2 shrink-0 transition-all duration-200 bg-zinc-800",
                    currentIndex === idx
                      ? "border-blue-600 scale-105 shadow-sm"
                      : "border-zinc-700 opacity-60 hover:opacity-100"
                  )}
                >
                  <img src={img} alt="miniature" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
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
  subtitle = "Parcourez les captures d'écran directement dans chaque cadre ou cliquez pour agrandir.",
}: GenerativeArtGalleryProps) {
  const [selectedProject, setSelectedProject] = useState<GalleryProject | null>(null);

  return (
    <section className={cn("relative w-full py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-[#fafbfc] border-t border-gray-200/70 text-gray-900 font-sans overflow-hidden", className)}>
      <div className="relative z-10 max-w-7xl mx-auto flex flex-col items-center">
        {/* En-tête de section */}
        <div className="text-center mb-10 sm:mb-14">
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

        {/* Grille exactement 3 par ligne sur desktop (lg:grid-cols-3) */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7">
          {projects.map((item) => (
            <ShowcaseProjectCard
              key={item.id || item.title}
              item={item}
              onOpenProject={(proj) => setSelectedProject(proj)}
            />
          ))}
        </div>
      </div>

      {/* Modale Lightbox Carrousel au clic */}
      {selectedProject && (
        <ProjectCarouselModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
}
