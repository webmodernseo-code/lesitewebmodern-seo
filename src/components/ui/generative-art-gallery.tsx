"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Eye, ExternalLink, Globe, Sparkles, Layers, ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface GalleryProject {
  id: string | number;
  title: string;
  category: string;
  categoryFilter: 'ecommerce' | 'saas' | 'fintech';
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
  gradient?: string;
}

const DEFAULT_PROJECTS: GalleryProject[] = [
  {
    id: "magasin-aniq",
    title: "Magasin — Storefront E-commerce & Studio IA Aniq-ui",
    category: "E-commerce Prêt-à-porter & IA",
    categoryFilter: "ecommerce",
    description: "Boutique en ligne nouvelle génération : vitrine éditoriale immersive, catalogue interactif haute fidélité, fiches produits dynamiques et back-office avec studio IA vidéo Kling 2.6.",
    image: "/images/portfolio/magasin-hero-storefront.png",
    galleryImages: [
      "/images/portfolio/magasin-hero-storefront.png",
      "/images/portfolio/magasin-categories.png",
      "/images/portfolio/magasin-catalog-grid.png",
      "/images/portfolio/magasin-product-detail.png",
      "/images/portfolio/aniq-ui-ai-studio.png"
    ],
    slideLabels: [
      "1. Vitrine d'accueil — Hero Collection 2026",
      "2. Rayons thématiques & Collections saisonnières",
      "3. Catalogue interactif & Grille de produits",
      "4. Fiche produit détaillée — Indigo Denim Shirt",
      "5. Back-office Aniq-ui — Studio vidéo IA Kling 2.6"
    ],
    slideUrls: [
      "magasin.com",
      "magasin.com/collections",
      "magasin.com/catalogue",
      "magasin.com/produits/indigo-denim",
      "app.aniq-ui.com/products/ai-studio"
    ],
    brandName: "Magasin",
    brandIconBg: "bg-zinc-800",
    clientName: "Julien B.",
    clientRole: "Fondateur & Directeur Artistique",
    metric: "Conversion +42%",
    clientAvatar: "/images/avatars/client-portrait-1.jpg",
    link: "/portfolio"
  },
  {
    id: "food-studio",
    title: "Food Studio — Restauration Digitale & Click and Collect",
    category: "E-commerce Restauration",
    categoryFilter: "ecommerce",
    description: "Plateforme e-commerce moderne taillée pour la restauration : présentation visuelle des formules, personnalisation fine des ingrédients et tunnel de paiement ultra-rapide.",
    image: "/images/services/food-studio-storefront.png",
    galleryImages: [
      "/images/services/food-studio-storefront.png",
      "/images/services/food-studio-menu.png",
      "/images/services/food-studio-order.png"
    ],
    slideLabels: [
      "1. Storefront d'accueil & Burgers signatures",
      "2. Menu interactif & Personnalisation des ingrédients",
      "3. Panier d'achat & Validation de commande express"
    ],
    slideUrls: [
      "foodstudio.fr",
      "foodstudio.fr/menu/personnaliser",
      "foodstudio.fr/panier/retrait"
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
    title: "Arise — Dashboard SaaS & Analytics Croissance",
    category: "Cockpit Métier & Analytics",
    categoryFilter: "saas",
    description: "Cockpit analytique pour plateforme SaaS : suivi de l'acquisition en direct, décomposition des canaux de trafic, indicateurs de croissance clés et cartographie internationale.",
    image: "/images/services/saas-dashboard-dark.png",
    galleryImages: [
      "/images/services/saas-dashboard-dark.png",
      "/images/services/saas-analytics-growth.png",
      "/images/services/saas-stats-growth.png",
      "/images/services/saas-world-map.png"
    ],
    slideLabels: [
      "1. Cockpit principal dark-mode & Sessions en direct",
      "2. Analyse granulaire des sources d'acquisition",
      "3. Tableau des chiffres clés (+350% de croissance)",
      "4. Carte mondiale d'utilisateurs & Inscription"
    ],
    slideUrls: [
      "app.arise.io/dashboard",
      "app.arise.io/analytics/sources",
      "arise.io/tarification/chiffres",
      "arise.io/commencer/monde"
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
    title: "Vira — Dashboard Bancaire & Cartes Connectées",
    category: "FinTech & Application Web",
    categoryFilter: "fintech",
    description: "Solution bancaire d'entreprise haute sécurité : portail de connexion chiffré, suivi en temps réel de la trésorerie, gestion du parc de cartes bancaires et bibliothèque de stat cards modulaires.",
    image: "/images/services/fintech-dashboard.png",
    galleryImages: [
      "/images/services/fintech-login.png",
      "/images/services/fintech-dashboard.png",
      "/images/services/fintech-cards.png",
      "/images/services/fintech-components.png"
    ],
    slideLabels: [
      "1. Portail de connexion sécurisé & Authentification SSO",
      "2. Dashboard de trésorerie John Carter & Graphique",
      "3. Gestion du portefeuille multi-cartes (Vira & Mastercard)",
      "4. Bibliothèque de composants UI & Stat Cards réorganisables"
    ],
    slideUrls: [
      "auth.vira.bank/login",
      "app.vira.bank/dashboard/overview",
      "app.vira.bank/cards/management",
      "app.vira.bank/components/stats"
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
    id: "cygnus",
    title: "Centre Optique Emy Paul — E-commerce & Rendez-vous",
    category: "Site E-commerce & Santé Visuelle",
    categoryFilter: "ecommerce",
    description: "Présence web premium pour opticien indépendant à Grenoble : vitrine de montures créateurs, module de prise de rendez-vous en ligne et référencement local leader.",
    image: "/images/portfolio/Accueil-emypaul.opticafe.fr-emypaul.opticafe.fr_.png",
    galleryImages: [
      "/images/portfolio/Accueil-emypaul.opticafe.fr-emypaul.opticafe.fr_.png",
      "/images/portfolio/he75ojuxofe.jpg",
      "/images/portfolio/Capture-decran-2026-04-14-120629.png"
    ],
    slideLabels: [
      "1. Vitrine digitale & Univers de la marque",
      "2. Expérience de choix de montures & Prise de rendez-vous",
      "3. Catalogue local & Tunnel de confirmation"
    ],
    slideUrls: [
      "emypaul.opticafe.fr",
      "emypaul.opticafe.fr/reservation",
      "emypaul.opticafe.fr/catalogue"
    ],
    brandName: "Emy Paul",
    brandIconBg: "bg-emerald-800",
    clientName: "Emy Paul",
    clientRole: "Fondatrice Centre Optique",
    metric: "RDV en ligne x3",
    clientAvatar: "/images/avatars/client-portrait-2.jpg",
    link: "/portfolio"
  },
  {
    id: "sinai-happy-care",
    title: "Sinai Happy Care — Portail Médical & Réservation",
    category: "Santé Digitale & Prise en Charge",
    categoryFilter: "fintech",
    description: "Plateforme de réservation de soins et de coordination médicale : parcours patient rassurant et ergonomique, conformité RGPD et performance SEO sans compromis.",
    image: "/images/portfolio/Sinaihappycare-sinaihappycare.com_.png",
    galleryImages: [
      "/images/portfolio/Sinaihappycare-sinaihappycare.com_.png",
      "/images/portfolio/Capture-decran-2026-04-14-120629.png",
      "/images/portfolio/Capture-decran-2026-06-16-163553.png"
    ],
    slideLabels: [
      "1. Portail d'accueil & Présentation des soins",
      "2. Module de réservation & Choix de prestation",
      "3. Espace coordination patient & Sécurité"
    ],
    slideUrls: [
      "sinaihappycare.com",
      "sinaihappycare.com/soins/reservation",
      "sinaihappycare.com/espace-patient"
    ],
    brandName: "Sinai Care",
    brandIconBg: "bg-cyan-900",
    clientName: "Dr. K. Sinai",
    clientRole: "Directeur Médical Fondateur",
    metric: "Score SEO 100/100",
    clientAvatar: "/images/avatars/client-portrait-3.jpg",
    link: "/portfolio"
  }
];

// Filtres de catégories par grand domaine d'expertise
const FILTER_TABS = [
  { id: "all", label: "Toutes les réalisations" },
  { id: "ecommerce", label: "E-commerce & Storefronts" },
  { id: "saas", label: "SaaS & Cockpits Métier" },
  { id: "fintech", label: "FinTech & Applications Web" }
] as const;

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
    <div className="relative w-full rounded-[20px] sm:rounded-[24px] bg-white border border-gray-200/90 shadow-sm hover:shadow-xl hover:border-gray-300 transition-all duration-300 overflow-hidden flex flex-col group">
      {/* 1. Cadre du site : Barre supérieure de navigation type navigateur web */}
      <div className="flex items-center justify-between px-3.5 py-2.5 bg-zinc-900 border-b border-zinc-800 text-zinc-300 select-none">
        {/* Contrôles fenêtre style macOS */}
        <div className="flex items-center gap-1.5 shrink-0">
          <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56] inline-block" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e] inline-block" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f] inline-block" />
        </div>

        {/* Barre d'adresse URL dynamique liée à l'écran actif */}
        <div className="flex items-center gap-2 text-[11px] text-zinc-300 font-mono bg-black/60 px-3 py-1 rounded-full border border-zinc-800 max-w-[220px] sm:max-w-xs truncate shadow-inner">
          <div
            className={cn(
              "w-3.5 h-3.5 rounded-full text-white flex items-center justify-center text-[8px] font-bold shrink-0",
              item.brandIconBg || "bg-brand-orange"
            )}
          >
            {item.brandName ? item.brandName.slice(0, 1).toUpperCase() : "W"}
          </div>
          <span className="truncate">{currentUrl}</span>
        </div>

        {/* Compteur d'écrans du projet */}
        <div className="flex items-center gap-1.5 shrink-0">
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
        className="relative w-full aspect-[16/10] sm:aspect-[16/9.5] overflow-hidden bg-zinc-950 cursor-pointer group/screen"
      >
        <img
          src={images[currentImgIndex]}
          alt={`${item.title} - ${currentLabel}`}
          className="w-full h-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.015]"
          loading="lazy"
        />

        {/* Gradient subtil en bas de l'écran pour détacher les textes */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* Label narratif de l'étape affiché discrètement en bas à gauche */}
        <div className="absolute bottom-3 left-3 pointer-events-none z-10 max-w-[70%]">
          <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-white/95 bg-black/75 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/15 shadow-sm truncate">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
            <span className="truncate">{currentLabel}</span>
          </span>
        </div>

        {/* Survol pour inciter à agrandir */}
        <div className="absolute inset-0 bg-black/25 opacity-0 group-hover/screen:opacity-100 transition-opacity duration-200 flex items-center justify-center pointer-events-none">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/95 text-gray-900 text-xs font-semibold shadow-lg backdrop-blur-md">
            <Eye className="w-3.5 h-3.5 text-blue-600" />
            Agrandir la capture
          </span>
        </div>

        {/* Boutons de navigation incrustés au bas à droite du cadre */}
        {images.length > 1 && (
          <div className="absolute bottom-3 right-3 flex items-center gap-1.5 z-20">
            <button
              onClick={handlePrevImage}
              className="w-8 h-8 rounded-full bg-black/75 hover:bg-black text-white flex items-center justify-center shadow-lg transition-all border border-white/20 active:scale-95"
              aria-label="Étape précédente"
            >
              <ChevronLeft className="w-4 h-4 stroke-[2.5]" />
            </button>
            <button
              onClick={handleNextImage}
              className="w-8 h-8 rounded-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center shadow-lg transition-all border border-white/20 active:scale-95"
              aria-label="Étape suivante"
            >
              <ChevronRight className="w-4 h-4 stroke-[2.5]" />
            </button>
          </div>
        )}
      </div>

      {/* 3. Bandeau d'information projet sous le cadre (style Apple / Stripe sobre) */}
      <div className="p-4 sm:p-5 flex flex-col justify-between flex-1 bg-white border-t border-gray-100">
        <div>
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
              {item.category}
            </span>
            {item.metric && (
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200/80 px-2 py-0.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                {item.metric}
              </span>
            )}
          </div>
          <h3 className="text-base sm:text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-1">
            {item.title}
          </h3>
          <p className="text-xs sm:text-sm text-gray-600 mt-1 line-clamp-2 leading-relaxed">
            {item.description}
          </p>
        </div>

        {/* Pastilles indicatrices pour sauter directement à une étape */}
        {images.length > 1 && (
          <div className="flex items-center gap-1.5 pt-3.5 mt-2 border-t border-gray-100">
            <span className="text-[11px] text-gray-400 font-medium mr-1">Parcours :</span>
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
                    ? "w-6 bg-blue-600"
                    : "w-2 bg-gray-200 hover:bg-gray-400"
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
  subtitle = "Parcourez les étapes clés de chaque réalisation directement dans les cadres ou cliquez pour agrandir chaque capture.",
}: GenerativeArtGalleryProps) {
  const [selectedProject, setSelectedProject] = useState<GalleryProject | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>("all");

  const filteredProjects = useMemo(() => {
    if (activeFilter === "all") return projects;
    return projects.filter((p) => p.categoryFilter === activeFilter);
  }, [projects, activeFilter]);

  return (
    <section className={cn("relative w-full py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-[#fafbfc] border-t border-gray-200/70 text-gray-900 font-sans overflow-hidden", className)}>
      <div className="relative z-10 max-w-7xl mx-auto flex flex-col items-center">
        {/* En-tête de section */}
        <div className="text-center mb-10 sm:mb-12">
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

        {/* Filtres par domaine d'expertise (Style Apple / Stripe épuré) */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10 sm:mb-12">
          {FILTER_TABS.map((tab) => {
            const count = tab.id === "all"
              ? projects.length
              : projects.filter((p) => p.categoryFilter === tab.id).length;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id)}
                className={cn(
                  "inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 border",
                  activeFilter === tab.id
                    ? "bg-gray-900 text-white border-gray-900 shadow-sm"
                    : "bg-white text-gray-600 border-gray-200 hover:text-gray-900 hover:border-gray-300 shadow-2xs"
                )}
              >
                <span>{tab.label}</span>
                <span
                  className={cn(
                    "text-[10px] px-1.5 py-0.5 rounded-full font-mono",
                    activeFilter === tab.id
                      ? "bg-white/20 text-white"
                      : "bg-gray-100 text-gray-500"
                  )}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Grille 2 colonnes fidèle aux mockups, avec cadres web épurés sans espace perdu */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {filteredProjects.map((item) => (
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
