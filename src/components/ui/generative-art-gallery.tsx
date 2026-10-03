"use client";

import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Eye, Maximize2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface GalleryProject {
  id: string | number;
  title: string;
  category: string;
  image: string;
  galleryImages: string[];
}

// Les projets réels et authentiques sans AUCUN nom de domaine
const DEFAULT_PROJECTS: GalleryProject[] = [
  // 1. Les Épices de Sulson (E-Commerce Gastronomique)
  {
    id: "les-epices-de-sulson",
    title: "Les Épices de Sulson",
    category: "E-Commerce Gastronomique & Épicerie Fine",
    image: "/images/portfolio/sulson-storefront.png",
    galleryImages: [
      "/images/portfolio/sulson-storefront.png",
      "/images/portfolio/sulson-catalog.png",
      "/images/portfolio/sulson-product.png",
      "/images/portfolio/sulson-avis.png",
      "/images/portfolio/sulson-pack-4.jpg",
    ]
  },

  // 2. Food Studio (Fast-Food & Commande)
  {
    id: "food-studio",
    title: "Food Studio",
    category: "Restauration & Commande en ligne",
    image: "/images/services/food-studio-storefront.png",
    galleryImages: [
      "/images/services/food-studio-storefront.png",
      "/images/services/food-studio-menu.png",
      "/images/services/food-studio-order.png"
    ]
  },

  // 2. SaaS Analytics & Growth (Landing page)
  {
    id: "saas-landing-blue",
    title: "SaaS Analytics & Growth",
    category: "Plateforme SaaS & Visualisation",
    image: "/images/services/saas-stats-growth.png",
    galleryImages: [
      "/images/services/saas-stats-growth.png",
      "/images/services/saas-world-map.png"
    ]
  },

  // 3. Aniq-ui Dashboard (Dashboard B2B)
  {
    id: "aniq-ui-dashboard",
    title: "Aniq-ui Dashboard",
    category: "Interface SaaS & Studio IA",
    image: "/images/portfolio/aniq-ui-overview.png",
    galleryImages: [
      "/images/portfolio/aniq-ui-overview.png",
      "/images/portfolio/aniq-ui-orders.png",
      "/images/portfolio/aniq-ui-ai-product.png",
      "/images/portfolio/aniq-ui-ai-studio.png"
    ]
  },

  // 4. EPBOMI Europe (Église & Plateforme de Dons)
  {
    id: "epbomi-europe",
    title: "EPBOMI Europe",
    category: "Portail Institutionnel & Dons",
    image: "/images/portfolio/epbomi-hero.png",
    galleryImages: [
      "/images/portfolio/epbomi-hero.png",
      "/images/portfolio/epbomi-histoire.png",
      "/images/portfolio/epbomi-rendezvous.png",
      "/images/portfolio/epbomi-dons.png",
      "/images/portfolio/epbomi-dons-en-ligne.png",
      "/images/portfolio/epbomi-plateformes.png"
    ]
  },

  // 5. Sinai Happy Care (Services de Soins & Santé à Domicile)
  {
    id: "sinai-happy-care",
    title: "Sinai Happy Care",
    category: "Santé & Soins à Domicile",
    image: "/images/portfolio/Sinaihappycare-sinaihappycare.com_.png",
    galleryImages: [
      "/images/portfolio/Sinaihappycare-sinaihappycare.com_.png"
    ]
  },

  // 6. Centre Optique & Vision (Optométrie & Montures Créateurs)
  {
    id: "centre-optique-vision",
    title: "Centre Optique & Vision",
    category: "Optométrie & Lunetterie",
    image: "/images/portfolio/Accueil-emypaul.opticafe.fr-emypaul.opticafe.fr_.png",
    galleryImages: [
      "/images/portfolio/Accueil-emypaul.opticafe.fr-emypaul.opticafe.fr_.png",
      "/images/portfolio/he75ojuxofe.jpg"
    ]
  }
];

// Carte Réalisation Premium (Zéro déformation, qualité d'image haute fidélité, zéro nom de domaine)
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
    <div className="relative w-full rounded-2xl bg-white border border-gray-200/90 shadow-soft hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden group">
      {/* Barre supérieure style navigateur moderne épurée SANS AUCUN nom de domaine */}
      <div className="flex items-center justify-between px-3.5 py-2.5 bg-gray-50 border-b border-gray-200/70 select-none">
        {/* Contrôles fenêtre */}
        <div className="flex items-center gap-1.5 shrink-0">
          <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56] inline-block" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e] inline-block" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f] inline-block" />
        </div>

        {/* Titre du projet épuré au centre */}
        <span className="text-xs font-semibold text-gray-700 tracking-tight truncate max-w-[170px] sm:max-w-[200px]">
          {item.title}
        </span>

        {/* Compteur d'images si plusieurs captures */}
        <div className="flex items-center gap-1 shrink-0">
          {images.length > 1 && (
            <span className="text-[10px] font-mono font-bold text-gray-500 bg-white px-2 py-0.5 rounded-md border border-gray-200 shadow-2xs">
              {currentImgIndex + 1}/{images.length}
            </span>
          )}
        </div>
      </div>

      {/* Écran avec image brute HD en ratio natif 16:9 sans aucune compression floue */}
      <div
        onClick={() => onOpenProject(item)}
        className="relative w-full aspect-[16/9] overflow-hidden bg-zinc-950 cursor-pointer group/screen flex items-center justify-center"
      >
        <img
          src={images[currentImgIndex]}
          alt={`${item.title} - écran ${currentImgIndex + 1}`}
          className="w-full h-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.015]"
          style={{ imageRendering: '-webkit-optimize-contrast' }}
          loading="eager"
        />

        {/* Bouton d'agrandissement en plein écran au survol */}
        <div className="absolute inset-0 bg-black/25 opacity-0 group-hover/screen:opacity-100 transition-opacity duration-200 flex items-center justify-center pointer-events-none">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/95 text-gray-900 text-xs font-semibold shadow-lg backdrop-blur-md">
            <Maximize2 className="w-3.5 h-3.5 text-brand-orange" />
            Agrandir en HD
          </span>
        </div>

        {/* Boutons de pagination incrustés au bas à droite - En orange du site */}
        {images.length > 1 && (
          <div className="absolute bottom-2.5 right-2.5 flex items-center gap-1.5 z-20">
            <button
              onClick={handlePrevImage}
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-black/80 hover:bg-brand-orange text-white flex items-center justify-center shadow-lg transition-all border border-white/20 active:scale-95"
              aria-label="Image précédente"
            >
              <ChevronLeft className="w-4 h-4 stroke-[2.5]" />
            </button>
            <button
              onClick={handleNextImage}
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-brand-orange hover:bg-brand-orangeLight text-white flex items-center justify-center shadow-lg transition-all border border-brand-orange/40 active:scale-95"
              aria-label="Image suivante"
            >
              <ChevronRight className="w-4 h-4 stroke-[2.5]" />
            </button>
          </div>
        )}
      </div>

      {/* Pied de carte sobre et élégant */}
      <div className="flex items-center justify-between px-4 py-3 bg-white border-t border-gray-100">
        <div className="flex flex-col min-w-0 pr-2">
          <span className="text-sm font-bold text-gray-900 truncate">
            {item.title}
          </span>
          <span className="text-xs text-gray-500 font-medium truncate">
            {item.category}
          </span>
        </div>

        <button
          onClick={() => onOpenProject(item)}
          className="inline-flex items-center gap-1 text-xs font-semibold text-brand-orange hover:text-brand-orangeLight transition-colors shrink-0"
        >
          <Eye className="w-3.5 h-3.5" />
          Voir
        </button>
      </div>
    </div>
  );
};

// Visionneuse HD Plein Écran (Grand format haute fidélité, zéro nom de domaine)
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
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md pt-16 sm:pt-24 pb-4 px-3 sm:px-6"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-label={`Galerie du projet ${project.title}`}
      >
        <div
          className="relative w-full max-w-6xl xl:max-w-7xl bg-zinc-950 border border-zinc-800 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl flex flex-col my-auto max-h-[88vh]"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header modal épuré */}
          <div className="flex items-center justify-between px-5 py-3 border-b border-zinc-800 bg-zinc-900/95 text-white shrink-0">
            <div className="flex items-center gap-3">
              <span className="text-sm sm:text-base font-bold tracking-wide text-zinc-100">
                {project.title}
              </span>
              <span className="hidden sm:inline-block text-xs text-zinc-400 font-medium px-2.5 py-0.5 rounded-full bg-zinc-800">
                {project.category}
              </span>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-full text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors focus:outline-none"
              aria-label="Fermer la galerie"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Affichage de l'image en grand format HD avec netteté optimale */}
          <div className="relative w-full flex-1 bg-black flex items-center justify-center p-2 sm:p-4 overflow-hidden min-h-[300px]">
            <img
              src={images[currentIndex]}
              alt={`${project.title} - vue ${currentIndex + 1}`}
              className="max-h-[72vh] xl:max-h-[76vh] w-auto max-w-full object-contain mx-auto select-none rounded-lg shadow-2xl"
              style={{ imageRendering: '-webkit-optimize-contrast' }}
            />

            {/* Navigation flèches en orange */}
            {images.length > 1 && (
              <>
                <button
                  onClick={handlePrev}
                  className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 sm:p-3 rounded-full bg-black/70 hover:bg-brand-orange text-white backdrop-blur-md border border-white/20 transition-all shadow-lg active:scale-95"
                  aria-label="Image précédente"
                >
                  <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
                <button
                  onClick={handleNext}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 sm:p-3 rounded-full bg-brand-orange hover:bg-brand-orangeLight text-white backdrop-blur-md border border-brand-orange/40 transition-all shadow-lg active:scale-95"
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
            <div className="px-5 py-2.5 bg-zinc-900 border-t border-zinc-800 flex items-center gap-2 overflow-x-auto shrink-0">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={cn(
                    "relative w-14 h-9 sm:w-16 sm:h-10 rounded-md overflow-hidden border-2 shrink-0 transition-all duration-200 bg-zinc-800",
                    currentIndex === idx
                      ? "border-brand-orange scale-105 shadow-sm ring-1 ring-brand-orange/40"
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
  subtitle = "Parcourez les captures d'écran directement dans chaque interface ou cliquez pour agrandir en haute définition.",
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

        {/* Grille 3 par ligne sur grand écran (lg:grid-cols-3) */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {projects.map((item) => (
            <ShowcaseProjectCard
              key={item.id || item.title}
              item={item}
              onOpenProject={(proj) => setSelectedProject(proj)}
            />
          ))}
        </div>
      </div>

      {/* Visionneuse HD au clic */}
      {selectedProject && (
        <ProjectCarouselModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
}
