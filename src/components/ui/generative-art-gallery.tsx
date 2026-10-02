"use client";

import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Eye, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface GalleryProject {
  id: string | number;
  title: string;
  category: string;
  description?: string;
  image: string;
  galleryImages: string[];
  slideLabels?: string[];
  slideUrls?: string[];
  link?: string;
  brandName?: string;
  brandIconBg?: string;
  clientName?: string;
  clientRole?: string;
  clientAvatar?: string;
  metric?: string;
}

// Les 3 réalisations sélectionnées et regroupées selon les directives exactes
const DEFAULT_PROJECTS: GalleryProject[] = [
  {
    id: "food-studio",
    title: "Food Studio — Fast-Food & Click and Collect",
    category: "Restauration & Commande en Ligne",
    description: "Storefront e-commerce épuré taillé pour la commande express de burgers artisanaux et formules avec personnalisation fine des ingrédients.",
    image: "/images/services/food-studio-storefront.png",
    galleryImages: [
      "/images/services/food-studio-storefront.png",
      "/images/services/food-studio-menu.png",
      "/images/services/food-studio-order.png"
    ],
    slideLabels: [
      "1. Vitrine d'accueil & Burgers signatures",
      "2. Menu interactif & Personnalisation des ingrédients",
      "3. Panier & Validation de commande express"
    ],
    slideUrls: [
      "foodstudio.fr",
      "foodstudio.fr/menu",
      "foodstudio.fr/commande"
    ],
    brandName: "Food Studio",
    brandIconBg: "bg-red-600",
    clientName: "Alexandre T.",
    clientRole: "Fondateur Food Studio",
    metric: "Commandes +65%",
    link: "/portfolio"
  },
  {
    id: "arise-growth",
    title: "Arise — Landing Page & Cockpit SaaS",
    category: "Application SaaS & Analytics",
    description: "Landing page haute conversion et cockpit analytique en bleu sombre : monitoring du trafic en direct, indicateurs de croissance (+350%) et carte mondiale.",
    image: "/images/services/saas-dashboard-dark.png",
    galleryImages: [
      "/images/services/saas-dashboard-dark.png",
      "/images/services/saas-analytics-growth.png",
      "/images/services/saas-stats-growth.png",
      "/images/services/saas-world-map.png"
    ],
    slideLabels: [
      "1. Cockpit Dark Mode & Sessions en direct",
      "2. Analyse granulaire des sources de trafic",
      "3. Métriques clés (+350% de croissance)",
      "4. Carte mondiale d'utilisateurs & Inscription"
    ],
    slideUrls: [
      "app.arise.io/dashboard",
      "app.arise.io/analytics",
      "arise.io/tarification",
      "arise.io/commencer"
    ],
    brandName: "Arise SaaS",
    brandIconBg: "bg-blue-600",
    clientName: "David C.",
    clientRole: "Head of Product",
    metric: "Rétention 87%",
    link: "/portfolio"
  },
  {
    id: "magasin-aniq",
    title: "Magasin — E-commerce & Dashboard Aniq-ui",
    category: "Storefront E-commerce & Dashboard Sombre",
    description: "Boutique vestimentaire haut de gamme avec vitrine, rayons, fiches produits et son dashboard sombre Aniq-ui avec studio IA vidéo Kling 2.6.",
    image: "/images/portfolio/magasin-hero-storefront.png",
    galleryImages: [
      "/images/portfolio/magasin-hero-storefront.png",
      "/images/portfolio/magasin-categories.png",
      "/images/portfolio/magasin-catalog-grid.png",
      "/images/portfolio/magasin-product-detail.png",
      "/images/portfolio/aniq-ui-ai-studio.png",
      "/images/portfolio/aniq-ui-overview.png"
    ],
    slideLabels: [
      "1. Vitrine d'accueil — Hero Collection 2026",
      "2. Rayons thématiques & Collections saisonnières",
      "3. Grille catalogue interactif & Filtres",
      "4. Fiche produit détaillée — Indigo Denim Shirt",
      "5. Dashboard sombre Aniq-ui — Studio vidéo IA Kling",
      "6. Dashboard sombre Aniq-ui — Cockpit de gestion des ventes"
    ],
    slideUrls: [
      "magasin.com",
      "magasin.com/collections",
      "magasin.com/catalogue",
      "magasin.com/produits/indigo-denim",
      "app.aniq-ui.com/products/ai-studio",
      "app.aniq-ui.com/dashboard/overview"
    ],
    brandName: "Magasin",
    brandIconBg: "bg-zinc-800",
    clientName: "Julien B.",
    clientRole: "Fondateur & Directeur Artistique",
    metric: "Conversion +42%",
    link: "/portfolio"
  }
];

// Carte Réalisation au format navigateur épuré (Zéro espace perdu, navigation intégrée)
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

  const currentLabel = item.slideLabels && item.slideLabels[currentImgIndex]
    ? item.slideLabels[currentImgIndex]
    : `Écran ${currentImgIndex + 1}`;

  const currentUrl = item.slideUrls && item.slideUrls[currentImgIndex]
    ? item.slideUrls[currentImgIndex]
    : (item.brandName ? `${item.brandName.toLowerCase().replace(/\s+/g, '')}.com` : "webmodernseo.co");

  return (
    <div className="relative w-full rounded-[22px] bg-white border border-gray-200/90 shadow-sm hover:shadow-xl hover:border-gray-300 transition-all duration-300 overflow-hidden flex flex-col group">
      {/* 1. Cadre du site : Barre supérieure de navigation type navigateur web */}
      <div className="flex items-center justify-between px-3.5 py-2.5 bg-zinc-900 border-b border-zinc-800 text-zinc-300 select-none">
        {/* Contrôles fenêtre style macOS */}
        <div className="flex items-center gap-1.5 shrink-0">
          <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56] inline-block" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e] inline-block" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f] inline-block" />
        </div>

        {/* Barre d'adresse URL dynamique liée à l'écran actif */}
        <div className="flex items-center gap-1.5 text-[11px] text-zinc-300 font-mono bg-black/60 px-2.5 py-0.5 rounded-full border border-zinc-800 max-w-[170px] sm:max-w-[200px] truncate shadow-inner">
          <div
            className={cn(
              "w-3 h-3 rounded-full text-white flex items-center justify-center text-[7px] font-bold shrink-0",
              item.brandIconBg || "bg-brand-orange"
            )}
          >
            {item.brandName ? item.brandName.slice(0, 1).toUpperCase() : "W"}
          </div>
          <span className="truncate">{currentUrl}</span>
        </div>

        {/* Compteur d'écrans du projet */}
        <div className="flex items-center gap-1 shrink-0">
          {images.length > 1 && (
            <span className="text-[10px] font-mono font-semibold text-zinc-400 bg-black/50 px-2 py-0.5 rounded-md border border-zinc-800">
              {currentImgIndex + 1}/{images.length}
            </span>
          )}
        </div>
      </div>

      {/* 2. Écran du site bord-à-bord (aucun padding ni marge vide autour du visuel) */}
      <div
        onClick={() => onOpenProject(item)}
        className="relative w-full aspect-[16/10] overflow-hidden bg-zinc-950 cursor-pointer group/screen"
      >
        <img
          src={images[currentImgIndex]}
          alt={`${item.title} - ${currentLabel}`}
          className="w-full h-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.02]"
          loading="lazy"
        />

        {/* Gradient subtil en bas de l'écran */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />

        {/* Label narratif de l'étape affiché discrètement en bas à gauche */}
        <div className="absolute bottom-2.5 left-2.5 pointer-events-none z-10 max-w-[65%]">
          <span className="inline-flex items-center gap-1.5 text-[10px] sm:text-[11px] font-medium text-white/95 bg-black/80 backdrop-blur-md px-2 py-0.5 rounded-lg border border-white/15 shadow-sm truncate">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
            <span className="truncate">{currentLabel}</span>
          </span>
        </div>

        {/* Survol pour inciter à agrandir */}
        <div className="absolute inset-0 bg-black/25 opacity-0 group-hover/screen:opacity-100 transition-opacity duration-200 flex items-center justify-center pointer-events-none">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/95 text-gray-900 text-xs font-semibold shadow-lg backdrop-blur-md">
            <Eye className="w-3.5 h-3.5 text-blue-600" />
            Agrandir
          </span>
        </div>

        {/* Boutons de navigation incrustés au bas à droite du cadre */}
        {images.length > 1 && (
          <div className="absolute bottom-2.5 right-2.5 flex items-center gap-1 z-20">
            <button
              onClick={handlePrevImage}
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-black/75 hover:bg-black text-white flex items-center justify-center shadow-lg transition-all border border-white/20 active:scale-95"
              aria-label="Étape précédente"
            >
              <ChevronLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.5]" />
            </button>
            <button
              onClick={handleNextImage}
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center shadow-lg transition-all border border-white/20 active:scale-95"
              aria-label="Étape suivante"
            >
              <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.5]" />
            </button>
          </div>
        )}
      </div>

      {/* 3. Bandeau d'information projet sous le cadre (style Apple / Stripe sobre) */}
      <div className="p-4 sm:p-5 flex flex-col justify-between flex-1 bg-white border-t border-gray-100">
        <div>
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-[11px] font-semibold text-blue-600 uppercase tracking-wider truncate">
              {item.category}
            </span>
            {item.metric && (
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200/80 px-2 py-0.5 rounded-full shrink-0">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                {item.metric}
              </span>
            )}
          </div>
          <h3 className="text-base sm:text-[17px] font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-1">
            {item.title}
          </h3>
          <p className="text-xs sm:text-sm text-gray-600 mt-1 line-clamp-2 leading-relaxed">
            {item.description}
          </p>
        </div>

        {/* Pastilles indicatrices pour sauter directement à une étape */}
        {images.length > 1 && (
          <div className="flex items-center gap-1.5 pt-3.5 mt-2 border-t border-gray-100">
            <span className="text-[10px] text-gray-400 font-medium mr-0.5">Étapes :</span>
            {images.map((_, idx) => (
              <button
                key={idx}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentImgIndex(idx);
                }}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-300",
                  currentImgIndex === idx
                    ? "w-5 bg-blue-600"
                    : "w-1.5 bg-gray-200 hover:bg-gray-400"
                )}
                aria-label={`Aller à l'étape ${idx + 1}`}
              />
            ))}
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
  const currentStepTitle = project.slideLabels && project.slideLabels[currentIndex]
    ? project.slideLabels[currentIndex]
    : `Écran ${currentIndex + 1} sur ${images.length}`;

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
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-3 sm:p-6"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-label={`Galerie du projet ${project.title}`}
      >
        <div
          className="relative w-full max-w-5xl bg-white border border-gray-200 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[95vh]"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header modal */}
          <div className="flex items-center justify-between px-5 py-3.5 border-b border-gray-200 bg-gray-50/80">
            <div>
              <span className="text-[11px] font-bold text-blue-600 uppercase tracking-wider">
                {project.category}
              </span>
              <h3 className="text-base sm:text-lg font-bold text-gray-900 mt-0.5">
                {project.title}
              </h3>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full text-gray-500 hover:text-gray-900 hover:bg-gray-200/80 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-600"
              aria-label="Fermer la galerie"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Affichage de l'image agrandie */}
          <div className="relative w-full h-[320px] sm:h-[460px] lg:h-[520px] bg-zinc-950 flex items-center justify-center overflow-hidden">
            <img
              src={images[currentIndex]}
              alt={`${project.title} - ${currentStepTitle}`}
              className="max-h-full max-w-full object-contain"
            />

            {/* Navigation flèches */}
            {images.length > 1 && (
              <>
                <button
                  onClick={handlePrev}
                  className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 sm:p-3 rounded-full bg-black/60 hover:bg-black/90 text-white backdrop-blur-md border border-white/20 transition-all shadow-lg active:scale-95"
                  aria-label="Image précédente"
                >
                  <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
                <button
                  onClick={handleNext}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 sm:p-3 rounded-full bg-black/60 hover:bg-black/90 text-white backdrop-blur-md border border-white/20 transition-all shadow-lg active:scale-95"
                  aria-label="Image suivante"
                >
                  <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
              </>
            )}

            {/* Titre de l'étape affiché en bas */}
            <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between pointer-events-none">
              <span className="text-xs font-medium text-white bg-black/75 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/15">
                {currentStepTitle}
              </span>
              <span className="text-xs font-mono font-semibold text-white bg-black/75 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/15">
                {currentIndex + 1} / {images.length}
              </span>
            </div>
          </div>

          {/* Footer miniatures */}
          <div className="px-5 py-3.5 bg-white border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-3 overflow-x-auto">
            <p className="text-xs sm:text-sm text-gray-600 line-clamp-1">
              {project.description}
            </p>

            {/* Miniatures cliquables */}
            {images.length > 1 && (
              <div className="flex items-center gap-2 shrink-0">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={cn(
                      "relative w-14 h-9 rounded-md overflow-hidden border-2 shrink-0 transition-all duration-200 bg-gray-100",
                      currentIndex === idx
                        ? "border-blue-600 scale-105 shadow-sm"
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
  subtitle = "Découvrez 3 réalisations complètes taillées sur-mesure. Parcourez chaque étape ou cliquez pour agrandir.",
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

        {/* Grille 3 colonnes sur une même ligne sur desktop (exactement 3 projets côte à côte) */}
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
