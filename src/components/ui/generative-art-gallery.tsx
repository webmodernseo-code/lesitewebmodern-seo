"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, X, ChevronLeft, ChevronRight, Eye, Layers } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface GalleryProject {
  id: string | number;
  title: string;
  category: string;
  description?: string;
  image: string;
  galleryImages: string[];
  link?: string;
}

const DEFAULT_PROJECTS: GalleryProject[] = [
  {
    id: "cygnus",
    title: "Centre Optique Emy Paul",
    category: "Site E-commerce & Prise de RDV",
    description: "Plateforme digitale complète avec catalogue montures, prise de rendez-vous en ligne et SEO local à Grenoble.",
    image: "/images/portfolio/Accueil-emypaul.opticafe.fr-emypaul.opticafe.fr_.png",
    galleryImages: [
      "/images/portfolio/Accueil-emypaul.opticafe.fr-emypaul.opticafe.fr_.png",
      "/images/portfolio/he75ojuxofe.jpg",
      "https://cdn.21st.dev/assets/mirror/5c/5ca5be9f573e502cbf14b27eb1469d26128e1edc4ee9628a67804ba95428db86.jpg"
    ]
  },
  {
    id: "orion",
    title: "Sinai Happy Care",
    category: "Portail Médical & Services de Santé",
    description: "Application web responsive dédiée aux soins et à la réservation de prestations de santé.",
    image: "/images/portfolio/Sinaihappycare-sinaihappycare.com_.png",
    galleryImages: [
      "/images/portfolio/Sinaihappycare-sinaihappycare.com_.png",
      "https://cdn.21st.dev/assets/mirror/26/26874879d8d2f85e40ba2b18784d99a44e06651e1df084be15bbd45fa5580c7e.jpg",
      "/images/portfolio/Capture-decran-2026-04-14-120629.png"
    ]
  },
  {
    id: "lyra",
    title: "EPBOMI Europe Portal",
    category: "Portail Institutionnel & Événements",
    description: "Refonte complète, calendrier interactif, gestion multilingue et référencement naturel.",
    image: "/images/portfolio/FireShot-Capture-008-Accueil-Epbomi-Europe-epbomi-europe.org-1.png",
    galleryImages: [
      "/images/portfolio/FireShot-Capture-008-Accueil-Epbomi-Europe-epbomi-europe.org-1.png",
      "https://cdn.21st.dev/assets/mirror/d0/d093c8b3e15cb544b366e48841b597edc429492fe00cffc7645c07238c467889.jpg",
      "/images/portfolio/Capture-decran-2026-06-16-163553.png"
    ]
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
      "https://cdn.21st.dev/assets/mirror/72/72a14b0382af5afd11053fa6f1d2f380b0ba757bb31eb191f823b1a09011a0fe.jpg"
    ]
  },
  {
    id: "vela",
    title: "Opticafé Expérience Client",
    category: "Web App & Conversion Visiteurs",
    description: "Tunnel d'acquisition personnalisé avec animations légères et synchronisation CRM.",
    image: "/images/portfolio/he75ojuxofe.jpg",
    galleryImages: [
      "/images/portfolio/he75ojuxofe.jpg",
      "https://cdn.21st.dev/assets/mirror/cd/cd6f9f5bc630c050dbc2629b5205cc8295c2f62458fd60177044949fe60377f8.jpg",
      "/images/portfolio/Accueil-emypaul.opticafe.fr-emypaul.opticafe.fr_.png"
    ]
  },
  {
    id: "pavo",
    title: "Plateforme Next.js Haute Performance",
    category: "Architecture Dédiée & Lead Gen",
    description: "Conception modulaire, score Google Lighthouse 100/100 et indexation ultra-rapide.",
    image: "/images/portfolio/Capture-decran-2026-06-16-163553.png",
    galleryImages: [
      "/images/portfolio/Capture-decran-2026-06-16-163553.png",
      "https://cdn.21st.dev/assets/mirror/ae/ae546a2e9190983b16a50402080ec54b878f13d86870a463db5f3fe8ba2574ca.jpg",
      "/images/portfolio/Capture-decran-2026-04-14-120331.png"
    ]
  },
];

// Generative Art Canvas Component
const GenerativeArtCanvas = ({ isHovered }: { isHovered: boolean }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let lines: { x: number; y: number; speed: number; angle: number; length: number }[] = [];
    const numLines = 26;

    class Line {
      x: number;
      y: number;
      speed: number;
      angle: number;
      length: number;

      constructor() {
        this.x = Math.random() * (canvas?.width || 400);
        this.y = Math.random() * (canvas?.height || 400);
        this.speed = Math.random() * 0.5 + 0.15;
        this.angle = Math.random() * Math.PI * 2;
        this.length = Math.random() * 22 + 6;
      }

      update() {
        if (!canvas) return;
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;
        if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
          this.x = Math.random() * canvas.width;
          this.y = Math.random() * canvas.height;
        }
      }

      draw(context: CanvasRenderingContext2D) {
        context.beginPath();
        context.moveTo(this.x, this.y);
        context.lineTo(this.x - Math.cos(this.angle) * this.length, this.y - Math.sin(this.angle) * this.length);
        context.strokeStyle = `rgba(255, 77, 0, ${Math.random() * 0.3 + 0.15})`;
        context.lineWidth = 1.2;
        context.stroke();
      }
    }

    const init = () => {
      lines = [];
      for (let i = 0; i < numLines; i++) {
        lines.push(new Line());
      }
    };

    const animate = () => {
      if (isHovered) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        lines.forEach(line => {
          (line as any).update();
          (line as any).draw(ctx);
        });
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    canvas.width = 400;
    canvas.height = 400;
    init();
    animate();

    return () => cancelAnimationFrame(animationFrameId);
  }, [isHovered]);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />;
};

// Gallery Card Component with 3D tilt effect (Design Clair)
const GalleryCard = ({
  item,
  onOpenProject
}: {
  item: GalleryProject;
  index: number;
  onOpenProject: (item: GalleryProject) => void;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 25 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 25 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["6deg", "-6deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-6deg", "6deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      onClick={() => onOpenProject(item)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => setIsHovered(true)}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="group relative h-80 sm:h-96 w-full rounded-3xl bg-white border border-gray-200 shadow-sm cursor-pointer select-none overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-brand-orange/40 hover:-translate-y-1"
    >
      <div
        style={{ transform: "translateZ(25px)", transformStyle: "preserve-3d" }}
        className="absolute inset-3 sm:inset-3.5 flex flex-col justify-end p-5 sm:p-6 rounded-2xl overflow-hidden bg-gray-50 border border-gray-100"
      >
        <img
          src={item.image}
          alt={item.title}
          className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-108"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.onerror = null;
            target.src = 'https://cdn.21st.dev/assets/mirror/6a/6a6e4ed1abce146a2e0fe926cd28a8546c7f433494fce63e253adc752a00c7af.svg';
          }}
        />
        <GenerativeArtCanvas isHovered={isHovered} />
        
        {/* Dégradé doux et lisible */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />

        {/* Badge Galerie / Click info (Style Clair) */}
        <div className="absolute top-3 left-3 z-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold bg-white/95 backdrop-blur-md text-gray-800 border border-gray-200/80 shadow-xs">
            <Layers className="w-3 h-3 text-brand-orange" />
            {item.galleryImages.length} vues
          </span>
        </div>

        {/* Textes de la réalisation */}
        <div className="relative z-10">
          <h3 className="text-lg sm:text-xl font-bold font-display text-white mb-1 tracking-tight group-hover:text-brand-orangeLight transition-colors">
            {item.title}
          </h3>
          <p className="text-xs sm:text-sm text-gray-200 line-clamp-1 font-medium">
            {item.category}
          </p>
        </div>

        {/* Bouton d'action flottant */}
        <div className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/95 backdrop-blur-md border border-gray-200 flex items-center justify-center text-gray-800 opacity-0 group-hover:opacity-100 group-hover:bg-brand-orange group-hover:text-white group-hover:border-brand-orange group-hover:scale-110 transition-all duration-300 shadow-md">
          <ArrowUpRight className="w-4 h-4" />
        </div>
      </div>
    </motion.div>
  );
};

// Modal Carousel Lightbox (Design Clair & Épuré)
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
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-4 sm:p-6"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-label={`Galerie du projet ${project.title}`}
      >
        <div
          className="relative w-full max-w-5xl bg-white border border-gray-200 rounded-3xl overflow-hidden shadow-2xl flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header modal (Design Clair) */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200/80 bg-gray-50/70">
            <div>
              <span className="text-xs font-bold text-brand-orange uppercase tracking-wider">
                {project.category}
              </span>
              <h3 className="text-xl font-bold font-display text-gray-900 mt-0.5">
                {project.title}
              </h3>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full text-gray-500 hover:text-gray-900 hover:bg-gray-200/70 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-orange"
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

            {/* Navigation Arrows (Clair) */}
            {images.length > 1 && (
              <>
                <button
                  onClick={handlePrev}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/90 hover:bg-brand-orange text-gray-900 hover:text-white backdrop-blur-md border border-gray-200 transition-all duration-200 shadow-lg"
                  aria-label="Image précédente"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={handleNext}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/90 hover:bg-brand-orange text-gray-900 hover:text-white backdrop-blur-md border border-gray-200 transition-all duration-200 shadow-lg"
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

          {/* Footer & Thumbnails (Design Clair) */}
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
                        ? "border-brand-orange scale-105 shadow-md shadow-brand-orange/20"
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
  subtitle = "Cliquez sur une réalisation pour parcourir la galerie de captures, zoomer et apprécier la qualité du rendu.",
}: GenerativeArtGalleryProps) {
  const [selectedProject, setSelectedProject] = useState<GalleryProject | null>(null);

  return (
    <section className={cn("relative w-full py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-[#fafbfc] border-t border-gray-200/70 text-gray-900 font-sans overflow-hidden", className)}>
      <div className="relative z-10 max-w-6xl mx-auto flex flex-col items-center">
        {/* En-tête de section (Design Clair) */}
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

        {/* Grille des cartes 3D en design clair */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {projects.map((item, index) => (
            <GalleryCard
              key={item.id || item.title}
              item={item}
              index={index}
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
