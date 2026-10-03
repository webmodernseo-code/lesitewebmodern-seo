'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Sparkles,
  Globe,
  ShieldCheck,
  ArrowUpRight,
  TrendingUp,
  Gauge,
  Search,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  X,
  Eye,
  CheckCircle2,
  MapPin,
  BarChart3,
  Layers,
  Zap,
  Calendar,
  PhoneCall,
  Check,
} from 'lucide-react';
import { HeaderPublic } from '@/components/public/HeaderPublic';
import { FooterPublic } from '@/components/public/FooterPublic';

// Interface pour les réalisations
interface PortfolioProject {
  id: string;
  type: 'web' | 'seo';
  title: string;
  category: string;
  description: string;
  image: string;
  galleryImages?: string[];
  metrics: { label: string; value: string }[];
  tags: string[];
}

// Les véritables réalisations avec captures HD
const REAL_PROJECTS: PortfolioProject[] = [
  // 1. EPBOMI Europe (Église & Plateforme de Dons)
  {
    id: 'epbomi-europe',
    type: 'web',
    title: 'EPBOMI Europe',
    category: 'Portail Institutionnel & Dons',
    description:
      'Portail officiel et hub communautaire pour l’église EPBOMI Europe. Système de dons sécurisés multi-devises, agenda interactif des cultes et rendez-vous, et gestion centralisée des plateformes.',
    image: '/images/portfolio/epbomi-hero.png',
    galleryImages: [
      '/images/portfolio/epbomi-hero.png',
      '/images/portfolio/epbomi-histoire.png',
      '/images/portfolio/epbomi-rendezvous.png',
      '/images/portfolio/epbomi-dons.png',
      '/images/portfolio/epbomi-dons-en-ligne.png',
      '/images/portfolio/epbomi-plateformes.png',
    ],
    metrics: [
      { label: 'Vitesse de chargement', value: '< 0.8s' },
      { label: 'Paiement sécurisé', value: '100% chiffré' },
    ],
    tags: ['Next.js', 'Stripe Dons', 'Agenda Cultes', 'Multi-pages'],
  },

  // 2. Food Studio (Fast-Food & Commande en ligne)
  {
    id: 'food-studio',
    type: 'web',
    title: 'Food Studio',
    category: 'Restauration & Commande en ligne',
    description:
      'Solution web complète pour la restauration rapide moderne. Commande interactive avec personnalisation d’ingrédients en temps réel, panier fluide sans rechargement et paiement rapide.',
    image: '/images/services/food-studio-storefront.png',
    galleryImages: [
      '/images/services/food-studio-storefront.png',
      '/images/services/food-studio-menu.png',
      '/images/services/food-studio-order.png',
    ],
    metrics: [
      { label: 'Conversion panier', value: '+42%' },
      { label: 'Interface', value: 'Mobile-First' },
    ],
    tags: ['Menu interactif', 'Panier live', 'Commande express', 'Design gourmand'],
  },

  // 3. Aniq-ui Dashboard (Dashboard B2B & IA)
  {
    id: 'aniq-ui-dashboard',
    type: 'web',
    title: 'Aniq-ui Dashboard',
    category: 'Interface SaaS & Studio IA',
    description:
      'Cockpit de gestion pour plateformes e-commerce et studio IA. Tableau de bord des ventes en direct, pipeline de traitement des commandes et générateur visuel assisté par intelligence artificielle.',
    image: '/images/portfolio/aniq-ui-overview.png',
    galleryImages: [
      '/images/portfolio/aniq-ui-overview.png',
      '/images/portfolio/aniq-ui-orders.png',
      '/images/portfolio/aniq-ui-ai-product.png',
      '/images/portfolio/aniq-ui-ai-studio.png',
    ],
    metrics: [
      { label: 'Performance d’affichage', value: '60 FPS' },
      { label: 'Gestion commandes', value: 'Temps réel' },
    ],
    tags: ['Dashboard SaaS', 'Mode sombre', 'Studio IA', 'Analytics'],
  },

  // 4. SaaS Analytics & Growth (Visualisation SaaS)
  {
    id: 'saas-analytics-growth',
    type: 'web',
    title: 'SaaS Analytics & Growth',
    category: 'Plateforme SaaS & Visualisation',
    description:
      'Interface analytique d’acquisition et de fidélisation pour entreprise SaaS. Visualisation de flux de données, cartographie mondiale des conversions et suivi des cohortes d’utilisateurs en direct.',
    image: '/images/services/saas-stats-growth.png',
    galleryImages: [
      '/images/services/saas-stats-growth.png',
      '/images/services/saas-world-map.png',
    ],
    metrics: [
      { label: 'Temps de réponse API', value: '< 50ms' },
      { label: 'Graphiques', value: 'Vectoriels SVG' },
    ],
    tags: ['Analytics B2B', 'Carte interactive', 'SaaS Growth', 'UI Premium'],
  },

  // 5. Sinai Happy Care (Services de Soins & Santé à Domicile)
  {
    id: 'sinai-happy-care',
    type: 'web',
    title: 'Sinai Happy Care',
    category: 'Santé & Soins à Domicile',
    description:
      'Site vitrine professionnel de prestations d’assistance et de soins à domicile. Parcours utilisateur rassurant et bienveillant, présentation claire des interventions et demande de devis express.',
    image: '/images/portfolio/Sinaihappycare-sinaihappycare.com_.png',
    galleryImages: [
      '/images/portfolio/Sinaihappycare-sinaihappycare.com_.png',
    ],
    metrics: [
      { label: 'SEO local', value: 'Top 3 Maps' },
      { label: 'Accessibilité', value: 'Conforme RGAA' },
    ],
    tags: ['Santé & Soins', 'SEO Local', 'Prise de contact', 'Réassurance'],
  },

  // 6. Centre Optique & Vision (Optométrie & Lunetterie Créateurs)
  {
    id: 'centre-optique-vision',
    type: 'web',
    title: 'Centre Optique & Vision',
    category: 'Optométrie & Lunetterie',
    description:
      'Vitrine digitale d’un concept store d’optique indépendant alliant santé visuelle et expérience détente. Présentation des montures de créateurs, réservation de bilans visuels et géolocalisation.',
    image: '/images/portfolio/Accueil-emypaul.opticafe.fr-emypaul.opticafe.fr_.png',
    galleryImages: [
      '/images/portfolio/Accueil-emypaul.opticafe.fr-emypaul.opticafe.fr_.png',
      '/images/portfolio/he75ojuxofe.jpg',
    ],
    metrics: [
      { label: 'Réservations examens', value: 'En ligne' },
      { label: 'Visibilité locale', value: 'Top Google' },
    ],
    tags: ['Santé visuelle', 'Prise de RDV', 'Montures créateurs', 'Référencement local'],
  },

  // 7. SEO Local & Pack Google Maps
  {
    id: 'seo-local-pack',
    type: 'seo',
    title: 'Domination Google Maps & Pack Local',
    category: 'SEO Local & Google Business Profile',
    description:
      'Positionnement stratégique dans le Top 3 Google Maps sur des requêtes locales à fort taux d’intention d’achat. Optimisation complète de la fiche Google Business Profile et synergie d’avis certifiés.',
    image: '',
    metrics: [
      { label: 'Position moyenne', value: 'Top 3 garanti' },
      { label: 'Appels entrants', value: '+240%' },
    ],
    tags: ['Google Maps', 'Fiche GBP', 'Avis clients', 'Zone de chalandise'],
  },

  // 8. Acquisition Organique & Cocon Sémantique
  {
    id: 'seo-traffic-cocon',
    type: 'seo',
    title: 'Trafic Organique & Cocon Sémantique',
    category: 'Acquisition & Autorité de Domaine',
    description:
      'Déploiement d’une architecture de contenu en grappes thématiques (hub-and-spoke) et campagne de netlinking à haute autorité. Doublement des impressions organiques et captation de prospects intentionnistes.',
    image: '',
    metrics: [
      { label: 'Hausse d’impressions', value: '+380%' },
      { label: 'Mots-clés en P1', value: '45+' },
    ],
    tags: ['Cocon sémantique', 'Netlinking', 'Intention d’achat', 'Maillage interne'],
  },

  // 9. SEO Technique & Core Web Vitals
  {
    id: 'seo-technique-speed',
    type: 'seo',
    title: 'Excellence Core Web Vitals & Vitesse',
    category: 'SEO Technique & Performance Pure',
    description:
      'Code ultra-optimisé sous Next.js avec un temps de premier affichage (LCP) inférieur à 0.8s, aucun décalage de mise en page (CLS = 0) et balisage sémantique riche Schema.org (JSON-LD) complet.',
    image: '',
    metrics: [
      { label: 'Score PageSpeed', value: '100 / 100' },
      { label: 'Stabilité (CLS)', value: '0.00' },
    ],
    tags: ['Core Web Vitals', 'Schema.org JSON-LD', 'PageSpeed 100', 'Indexation instantanée'],
  },
];

export default function PortfolioPage() {
  const [activeFilter, setActiveFilter] = useState<'all' | 'web' | 'seo'>('all');
  const [selectedModalProject, setSelectedModalProject] = useState<PortfolioProject | null>(null);
  const [activeSeoStep, setActiveSeoStep] = useState<number>(1);

  // Filtrage des cartes
  const filteredProjects = REAL_PROJECTS.filter((p) => {
    if (activeFilter === 'all') return true;
    return p.type === activeFilter;
  });

  return (
    <div className="relative min-h-screen bg-white text-gray-900 overflow-x-hidden font-sans">
      <HeaderPublic />

      <main className="w-full pt-28 sm:pt-32 pb-20">
        {/* =========================================================
            1. EN-TÊTE DE SECTION
            ========================================================= */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-gray-200 bg-gray-50/80 shadow-2xs mb-5">
            <Sparkles className="w-3.5 h-3.5 text-[#0fac71]" />
            <span className="text-xs font-semibold text-gray-800 tracking-wide">
              ✦ Réalisations Réelles & Résultats Concrets
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-950 tracking-tight leading-[1.18] mb-5">
            Des interfaces haute fidélité pour <br className="hidden sm:inline" />
            <span className="text-brand-orange">propulser votre entreprise</span>
          </h1>

          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Explorez les véritables sites vitrines, applications et stratégies SEO que nous avons
            conçus et propulsés. Chaque projet allie vitesse de pointe, design épuré et acquisition ciblée.
          </p>

          {/* Onglets de filtre */}
          <div className="flex items-center justify-center flex-wrap gap-2.5 mt-8">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 ${
                activeFilter === 'all'
                  ? 'bg-brand-orange text-white shadow-md shadow-brand-orange/20 border border-brand-orange'
                  : 'bg-gray-100/80 text-gray-600 hover:bg-gray-200/80 border border-gray-200/70'
              }`}
            >
              Tous les projets ({REAL_PROJECTS.length})
            </button>
            <button
              onClick={() => setActiveFilter('web')}
              className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 ${
                activeFilter === 'web'
                  ? 'bg-brand-orange text-white shadow-md shadow-brand-orange/20 border border-brand-orange'
                  : 'bg-gray-100/80 text-gray-600 hover:bg-gray-200/80 border border-gray-200/70'
              }`}
            >
              Création Web & SaaS (6)
            </button>
            <button
              onClick={() => setActiveFilter('seo')}
              className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 ${
                activeFilter === 'seo'
                  ? 'bg-[#0fac71] text-white shadow-md shadow-[#0fac71]/20 border border-[#0fac71]'
                  : 'bg-gray-100/80 text-gray-600 hover:bg-gray-200/80 border border-gray-200/70'
              }`}
            >
              Expertise & Référencement SEO (3)
            </button>
          </div>
        </section>

        {/* =========================================================
            2. GRILLE PORTFOLIO (3 PAR LIGNE SUR DESKTOP)
            ========================================================= */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onOpenModal={(p) => setSelectedModalProject(p)}
              />
            ))}
          </div>
        </section>

        {/* =========================================================
            3. SECTION MÉTHODOLOGIE SEO D'ÉLITE INTERACTIVE
            ========================================================= */}
        <section className="w-full bg-[#fdfbf7] border-y border-gray-200/80 py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-gray-200 bg-white shadow-2xs mb-4">
                <Gauge className="w-3.5 h-3.5 text-[#0fac71]" />
                <span className="text-xs font-semibold text-gray-800 tracking-wide">
                  ✦ Méthodologie SEO d’Excellence
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 tracking-tight mb-4">
                Comment nous générons une <span className="text-[#0fac71]">visibilité durable</span>
              </h2>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                Notre approche éprouvée en 3 phases rigoureuses pour transformer votre site en un actif
                numérique générateur de clients qualifiés sur Google.
              </p>
            </div>

            {/* Layout 2 colonnes interactif */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Colonne gauche : Boutons & explications */}
              <div className="lg:col-span-5 flex flex-col gap-4">
                <button
                  onClick={() => setActiveSeoStep(1)}
                  className={`w-full p-4 rounded-2xl border text-left transition-all duration-200 flex items-start gap-3.5 ${
                    activeSeoStep === 1
                      ? 'bg-white border-[#0fac71] shadow-md ring-1 ring-[#0fac71]/20'
                      : 'bg-white/60 hover:bg-white border-gray-200 text-gray-700'
                  }`}
                >
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 ${
                      activeSeoStep === 1
                        ? 'bg-[#0fac71] text-white'
                        : 'bg-gray-100 text-gray-500'
                    }`}
                  >
                    01
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-gray-900 mb-1">
                      Audit & Recherche Sémantique
                    </h3>
                    <p className="text-xs text-gray-500 leading-relaxed">
                      Identification des mots-clés transactionnels à forte intention d'achat et analyse concurrentielle.
                    </p>
                  </div>
                </button>

                <button
                  onClick={() => setActiveSeoStep(2)}
                  className={`w-full p-4 rounded-2xl border text-left transition-all duration-200 flex items-start gap-3.5 ${
                    activeSeoStep === 2
                      ? 'bg-white border-[#0fac71] shadow-md ring-1 ring-[#0fac71]/20'
                      : 'bg-white/60 hover:bg-white border-gray-200 text-gray-700'
                  }`}
                >
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 ${
                      activeSeoStep === 2
                        ? 'bg-[#0fac71] text-white'
                        : 'bg-gray-100 text-gray-500'
                    }`}
                  >
                    02
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-gray-900 mb-1">
                      Optimisation Technique & Vitesse
                    </h3>
                    <p className="text-xs text-gray-500 leading-relaxed">
                      Balisage Schema.org, temps de chargement ultra-rapide et scores Core Web Vitals parfaits.
                    </p>
                  </div>
                </button>

                <button
                  onClick={() => setActiveSeoStep(3)}
                  className={`w-full p-4 rounded-2xl border text-left transition-all duration-200 flex items-start gap-3.5 ${
                    activeSeoStep === 3
                      ? 'bg-white border-[#0fac71] shadow-md ring-1 ring-[#0fac71]/20'
                      : 'bg-white/60 hover:bg-white border-gray-200 text-gray-700'
                  }`}
                >
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 ${
                      activeSeoStep === 3
                        ? 'bg-[#0fac71] text-white'
                        : 'bg-gray-100 text-gray-500'
                    }`}
                  >
                    03
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-gray-900 mb-1">
                      Suivi Google & Croissance Continue
                    </h3>
                    <p className="text-xs text-gray-500 leading-relaxed">
                      Monitoring en direct via Search Console, optimisation du CTR et expansion de visibilité.
                    </p>
                  </div>
                </button>
              </div>

              {/* Colonne droite : Mockup visuel interactif */}
              <div className="lg:col-span-7">
                <div className="bg-white rounded-2xl border border-gray-200 shadow-xl overflow-hidden">
                  {/* Barre supérieure style application */}
                  <div className="px-4 py-3 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                      <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                      <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
                    </div>
                    <span className="text-[11px] font-mono text-gray-500 bg-white border border-gray-200 px-3 py-1 rounded-md">
                      {activeSeoStep === 1 && 'cockpit-seo / audit-semantique'}
                      {activeSeoStep === 2 && 'pagespeed / core-web-vitals'}
                      {activeSeoStep === 3 && 'search-console / monitoring'}
                    </span>
                    <div className="w-8" />
                  </div>

                  {/* Contenu dynamique selon l'étape */}
                  <div className="p-6 min-h-[300px] flex flex-col justify-center">
                    {activeSeoStep === 1 && (
                      <div className="space-y-4">
                        <div className="flex items-center justify-between pb-2 border-b border-gray-100">
                          <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
                            Opportunités & Mots-clés
                          </span>
                          <span className="text-xs font-semibold text-[#0fac71]">
                            Recherches Qualifiées
                          </span>
                        </div>
                        <div className="space-y-2.5">
                          <div className="flex items-center justify-between p-2.5 bg-gray-50 rounded-xl text-xs">
                            <span className="font-semibold text-gray-800">
                              création site vitrine grenoble
                            </span>
                            <span className="font-bold text-[#0fac71] bg-[#0fac71]/10 px-2 py-0.5 rounded-md">
                              Intention forte
                            </span>
                            <span className="text-gray-500 font-mono">1 800 rech/m</span>
                          </div>
                          <div className="flex items-center justify-between p-2.5 bg-gray-50 rounded-xl text-xs">
                            <span className="font-semibold text-gray-800">
                              agence référencement seo
                            </span>
                            <span className="font-bold text-[#0fac71] bg-[#0fac71]/10 px-2 py-0.5 rounded-md">
                              Conversion élevée
                            </span>
                            <span className="text-gray-500 font-mono">3 200 rech/m</span>
                          </div>
                          <div className="flex items-center justify-between p-2.5 bg-gray-50 rounded-xl text-xs">
                            <span className="font-semibold text-gray-800">
                              consultant seo e-commerce
                            </span>
                            <span className="font-bold text-[#0fac71] bg-[#0fac71]/10 px-2 py-0.5 rounded-md">
                              Haute rentabilité
                            </span>
                            <span className="text-gray-500 font-mono">1 100 rech/m</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {activeSeoStep === 2 && (
                      <div className="space-y-5">
                        <div className="grid grid-cols-3 gap-3 text-center">
                          <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
                            <span className="text-2xl font-black text-[#0fac71]">100</span>
                            <p className="text-[11px] font-semibold text-gray-500 mt-1">
                              Performance
                            </p>
                          </div>
                          <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
                            <span className="text-2xl font-black text-[#0fac71]">100</span>
                            <p className="text-[11px] font-semibold text-gray-500 mt-1">
                              SEO Google
                            </p>
                          </div>
                          <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
                            <span className="text-2xl font-black text-[#0fac71]">0.7s</span>
                            <p className="text-[11px] font-semibold text-gray-500 mt-1">
                              Affichage LCP
                            </p>
                          </div>
                        </div>
                        <div className="space-y-2 text-xs">
                          <div className="flex items-center justify-between p-2 bg-emerald-50/50 rounded-lg text-emerald-900 border border-emerald-100">
                            <span className="flex items-center gap-1.5 font-medium">
                              <CheckCircle2 className="w-3.5 h-3.5 text-[#0fac71]" /> Balisage Schema.org
                              (JSON-LD)
                            </span>
                            <span className="font-bold text-[#0fac71]">Certifié valide</span>
                          </div>
                          <div className="flex items-center justify-between p-2 bg-emerald-50/50 rounded-lg text-emerald-900 border border-emerald-100">
                            <span className="flex items-center gap-1.5 font-medium">
                              <CheckCircle2 className="w-3.5 h-3.5 text-[#0fac71]" /> Décalage de page
                              (CLS)
                            </span>
                            <span className="font-bold text-[#0fac71]">0.00 (Zéro saut)</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {activeSeoStep === 3 && (
                      <div className="space-y-4">
                        <div className="grid grid-cols-3 gap-2 text-center">
                          <div className="p-2.5 bg-gray-50 rounded-xl border border-gray-100">
                            <span className="text-xs font-semibold text-gray-500">Impressions</span>
                            <p className="text-lg font-extrabold text-gray-900 mt-0.5">+380%</p>
                          </div>
                          <div className="p-2.5 bg-gray-50 rounded-xl border border-gray-100">
                            <span className="text-xs font-semibold text-gray-500">Taux de clic</span>
                            <p className="text-lg font-extrabold text-[#0fac71] mt-0.5">8.4%</p>
                          </div>
                          <div className="p-2.5 bg-gray-50 rounded-xl border border-gray-100">
                            <span className="text-xs font-semibold text-gray-500">Position</span>
                            <p className="text-lg font-extrabold text-brand-orange mt-0.5">2.1</p>
                          </div>
                        </div>

                        {/* Graphique vectoriel épuré */}
                        <div className="bg-gray-50/70 p-4 rounded-xl border border-gray-100">
                          <svg viewBox="0 0 400 90" className="w-full h-20 overflow-visible">
                            <defs>
                              <linearGradient id="seoGlow" x1="0" y1="0" x2="1" y2="0">
                                <stop offset="0%" stopColor="#0fac71" stopOpacity="0.4" />
                                <stop offset="100%" stopColor="#0fac71" stopOpacity="1" />
                              </linearGradient>
                            </defs>
                            <path
                              d="M 10 75 Q 70 65 130 55 T 250 35 T 390 12"
                              fill="none"
                              stroke="url(#seoGlow)"
                              strokeWidth="3"
                              strokeLinecap="round"
                            />
                            <circle cx="390" cy="12" r="4" fill="#0fac71" />
                          </svg>
                          <div className="flex justify-between text-[10px] text-gray-400 font-mono pt-1">
                            <span>Mois 1 (Audit)</span>
                            <span>Mois 3 (Montée)</span>
                            <span className="text-[#0fac71] font-bold">Mois 6 (Top 3)</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            4. SECTION APPEL À L'ACTION (CTA RÉASSURANCE)
            ========================================================= */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
          <div className="relative rounded-3xl bg-gradient-to-b from-gray-900 to-black text-white p-8 sm:p-12 overflow-hidden shadow-2xl">
            <div className="relative z-10 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#0fac71] text-xs font-semibold mb-4 border border-white/10">
                <ShieldCheck className="w-3.5 h-3.5" />
                Garantie d'Excellence & Accompagnement Dédié
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight mb-4">
                Prêt à concevoir votre futur projet d'élite ?
              </h2>
              <p className="text-sm sm:text-base text-gray-300 leading-relaxed mb-8">
                Discutons de vos objectifs lors d’une session stratégique gratuite de 30 minutes. Analyse de
                votre marché, recommandations sur-mesure et plan d'action clair.
              </p>
              <div className="flex flex-col sm:flex-row gap-3.5">
                <button
                  type="button"
                  data-cal-namespace="30min"
                  data-cal-link="jean-prosper-dsljpi/30min"
                  data-cal-config='{"layout":"month_view","useSlotsViewOnSmallScreen":"true","theme":"light"}'
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-brand-orange hover:bg-brand-orangeLight text-white font-semibold text-sm transition-all duration-200 shadow-lg shadow-brand-orange/30 cursor-pointer"
                >
                  <Calendar className="w-4 h-4" />
                  Prendre un RDV offert (30 min)
                </button>
                <a
                  href="tel:+33753887751"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-sm border border-white/15 transition-all duration-200"
                >
                  <PhoneCall className="w-4 h-4 text-[#0fac71]" />
                  Échanger directement par téléphone
                </a>
              </div>
              <p className="text-[11px] text-gray-400 mt-4 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#0fac71]" />
                Sans engagement commercial • Audit 100% gratuit
              </p>
            </div>
          </div>
        </section>
      </main>

      <FooterPublic />

      {/* =========================================================
          5. MODALE PLEIN ÉCRAN HAUTE FIDÉLITÉ
          ========================================================= */}
      {selectedModalProject && (
        <ProjectModal
          project={selectedModalProject}
          onClose={() => setSelectedModalProject(null)}
        />
      )}
    </div>
  );
}

// =================================================================
// COMPOSANT CARTE DE PROJET (ZÉRO NOM DE DOMAINE, 3 PAR LIGNE)
// =================================================================
function ProjectCard({
  project,
  onOpenModal,
}: {
  project: PortfolioProject;
  onOpenModal: (project: PortfolioProject) => void;
}) {
  const images = project.galleryImages && project.galleryImages.length > 0
    ? project.galleryImages
    : project.image
    ? [project.image]
    : [];

  const [currentImgIndex, setCurrentImgIndex] = useState(0);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImgIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImgIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
  };

  return (
    <article className="group relative rounded-2xl bg-white border border-gray-200/90 shadow-soft hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col overflow-hidden">
      {/* Barre supérieure style fenêtre propre */}
      <div className="flex items-center justify-between px-3.5 py-2.5 bg-gray-50 border-b border-gray-200/80 select-none">
        <div className="flex items-center gap-1.5 shrink-0">
          <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
        </div>
        <span className="text-xs font-semibold text-gray-700 truncate max-w-[180px]">
          {project.title}
        </span>
        <div className="flex items-center gap-1">
          {images.length > 1 && (
            <span className="text-[10px] font-mono font-bold text-gray-500 bg-white px-2 py-0.5 rounded-md border border-gray-200 shadow-2xs">
              {currentImgIndex + 1}/{images.length}
            </span>
          )}
        </div>
      </div>

      {/* Visuel principal */}
      {project.type === 'web' && images.length > 0 ? (
        <div
          onClick={() => onOpenModal(project)}
          className="relative w-full aspect-[16/9] overflow-hidden bg-zinc-950 cursor-pointer group/screen flex items-center justify-center"
        >
          <img
            src={images[currentImgIndex]}
            alt={`${project.title} - capture ${currentImgIndex + 1}`}
            className="w-full h-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.02]"
            style={{ imageRendering: '-webkit-optimize-contrast' }}
            loading="lazy"
          />

          {/* Bouton agrandir au survol */}
          <div className="absolute inset-0 bg-black/25 opacity-0 group-hover/screen:opacity-100 transition-opacity duration-200 flex items-center justify-center pointer-events-none">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/95 text-gray-900 text-xs font-semibold shadow-lg backdrop-blur-md">
              <Maximize2 className="w-3.5 h-3.5 text-brand-orange" />
              Agrandir en HD
            </span>
          </div>

          {/* Flèches de navigation en orange du site */}
          {images.length > 1 && (
            <div className="absolute bottom-2.5 right-2.5 flex items-center gap-1.5 z-20">
              <button
                onClick={handlePrev}
                className="w-7 h-7 rounded-full bg-black/80 hover:bg-brand-orange text-white flex items-center justify-center shadow-lg transition-all border border-white/20 active:scale-95"
                aria-label="Image précédente"
              >
                <ChevronLeft className="w-4 h-4 stroke-[2.5]" />
              </button>
              <button
                onClick={handleNext}
                className="w-7 h-7 rounded-full bg-brand-orange hover:bg-brand-orangeLight text-white flex items-center justify-center shadow-lg transition-all border border-brand-orange/40 active:scale-95"
                aria-label="Image suivante"
              >
                <ChevronRight className="w-4 h-4 stroke-[2.5]" />
              </button>
            </div>
          )}
        </div>
      ) : (
        /* Widget Visuel pour projet SEO */
        <div className="relative w-full aspect-[16/9] bg-gradient-to-br from-emerald-500/10 via-emerald-500/5 to-white p-5 flex flex-col justify-between border-b border-gray-100">
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#0fac71]/10 text-[#0fac71] text-xs font-bold">
              {project.id === 'seo-local-pack' && <MapPin className="w-3.5 h-3.5" />}
              {project.id === 'seo-traffic-cocon' && <TrendingUp className="w-3.5 h-3.5" />}
              {project.id === 'seo-technique-speed' && <Zap className="w-3.5 h-3.5" />}
              {project.category}
            </span>
            <span className="text-[11px] font-bold text-[#0fac71] bg-white border border-[#0fac71]/20 px-2 py-0.5 rounded-full">
              Résultat Garanti
            </span>
          </div>

          <div className="space-y-1">
            <div className="text-3xl font-extrabold text-gray-900 tracking-tight">
              {project.metrics[0]?.value}
            </div>
            <p className="text-xs text-gray-500 font-medium">
              {project.metrics[0]?.label}
            </p>
          </div>

          <div className="flex items-center gap-2 text-[11px] font-semibold text-gray-600 bg-white/80 border border-gray-200/80 px-2.5 py-1.5 rounded-lg">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#0fac71]" />
            <span>{project.metrics[1]?.label} : {project.metrics[1]?.value}</span>
          </div>
        </div>
      )}

      {/* Contenu textuel de la carte */}
      <div className="p-5 flex flex-col flex-grow justify-between bg-white">
        <div>
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-brand-orange">
              {project.category}
            </span>
            <span
              className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                project.type === 'web'
                  ? 'bg-orange-50 text-brand-orange border border-brand-orange/20'
                  : 'bg-emerald-50 text-[#0fac71] border border-[#0fac71]/20'
              }`}
            >
              {project.type === 'web' ? 'Site Web' : 'Stratégie SEO'}
            </span>
          </div>

          <h3 className="text-base font-bold text-gray-950 mb-2 leading-snug group-hover:text-brand-orange transition-colors">
            {project.title}
          </h3>

          <p className="text-xs text-gray-600 leading-relaxed line-clamp-3 mb-4">
            {project.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-[10px] font-medium text-gray-500 bg-gray-50 border border-gray-200/70 px-2 py-0.5 rounded-md"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Bouton d'action sobre */}
        <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
          {project.type === 'web' && images.length > 0 ? (
            <button
              onClick={() => onOpenModal(project)}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-800 hover:text-brand-orange transition-colors"
            >
              <Eye className="w-3.5 h-3.5 text-brand-orange" />
              Voir les {images.length} écrans HD
            </button>
          ) : (
            <Link
              href="/reservation"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0fac71] hover:text-[#0fac71]/80 transition-colors"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#0fac71]" />
              Demander cet audit
            </Link>
          )}

          <Link
            href="/reservation"
            className="w-7 h-7 rounded-full bg-gray-50 hover:bg-brand-orange hover:text-white text-gray-600 border border-gray-200 flex items-center justify-center transition-all duration-200"
            title="Réserver un appel pour un projet similaire"
          >
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}

// =================================================================
// VISIONNEUSE PLEIN ÉCRAN HD (MODALE QUALITÉ BRUTE SANS COMPRESSION)
// =================================================================
function ProjectModal({
  project,
  onClose,
}: {
  project: PortfolioProject;
  onClose: () => void;
}) {
  const images = project.galleryImages && project.galleryImages.length > 0
    ? project.galleryImages
    : project.image
    ? [project.image]
    : [];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setCurrentIndex(0);
  }, [project]);

  // Raccourcis clavier (Flèches et Echap)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') {
        setCurrentIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
      }
      if (e.key === 'ArrowRight') {
        setCurrentIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [images.length, onClose]);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex flex-col justify-between p-3 sm:p-6 overflow-y-auto"
    >
      {/* En-tête de la visionneuse */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-6xl mx-auto flex items-center justify-between pb-3 text-white border-b border-white/10 shrink-0"
      >
        <div className="flex items-center gap-3">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              {project.title}
              <span className="text-xs font-normal text-gray-400 bg-white/10 px-2 py-0.5 rounded">
                {project.category}
              </span>
            </h3>
            <p className="text-xs text-gray-300 hidden sm:block mt-0.5">
              Écran {currentIndex + 1} sur {images.length} • Résolution native 16:9 HD
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            data-cal-namespace="30min"
            data-cal-link="jean-prosper-dsljpi/30min"
            data-cal-config='{"layout":"month_view","useSlotsViewOnSmallScreen":"true","theme":"light"}'
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-brand-orange hover:bg-brand-orangeLight text-white text-xs font-semibold transition-colors cursor-pointer"
          >
            Discuter d’un projet similaire
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors border border-white/20"
            aria-label="Fermer la visionneuse"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Écran central grand format */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-6xl mx-auto my-auto py-2 flex items-center justify-center"
      >
        <div className="relative w-full aspect-[16/9] max-h-[72vh] rounded-2xl overflow-hidden bg-zinc-950 border border-white/15 shadow-2xl flex items-center justify-center">
          <img
            src={images[currentIndex]}
            alt={`${project.title} - vue agrandie ${currentIndex + 1}`}
            className="w-full h-full object-contain"
            style={{ imageRendering: '-webkit-optimize-contrast' }}
          />

          {/* Flèches de navigation plein écran en orange */}
          {images.length > 1 && (
            <>
              <button
                onClick={handlePrev}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/80 hover:bg-brand-orange text-white flex items-center justify-center transition-all duration-200 border border-white/20 active:scale-95 shadow-xl"
                aria-label="Capture précédente"
              >
                <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
              </button>
              <button
                onClick={handleNext}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-brand-orange hover:bg-brand-orangeLight text-white flex items-center justify-center transition-all duration-200 border border-brand-orange/40 active:scale-95 shadow-xl"
                aria-label="Capture suivante"
              >
                <ChevronRight className="w-5 h-5 stroke-[2.5]" />
              </button>
            </>
          )}
        </div>
      </div>

      {/* Vignettes miniatures au bas */}
      {images.length > 1 && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-3xl mx-auto flex items-center justify-center gap-2 py-2 overflow-x-auto shrink-0"
        >
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`relative w-16 sm:w-20 aspect-[16/9] rounded-lg overflow-hidden border-2 transition-all shrink-0 ${
                currentIndex === idx
                  ? 'border-brand-orange ring-2 ring-brand-orange/30 scale-105'
                  : 'border-white/20 opacity-50 hover:opacity-100'
              }`}
            >
              <img
                src={img}
                alt={`Vignette ${idx + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
