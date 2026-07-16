'use client';

import React, { useEffect } from 'react';

export const AvisPublic: React.FC = () => {
  useEffect(() => {
    try {
      (function() {
    const track = document.querySelector('.rv-track-single');
    if (!track) return;
    
    const cards = track.querySelectorAll('.rv-card');
    if (cards.length === 0) return;
    
    let index = 2; // Démarre sur l'Avis 1 (Paul)
    let isTransitioning = false;
    let autoPlayInterval = null;
    
    function updateCarousel(animate = true) {
      const container = track.closest('.rv-ticker-container');
      if (!container) return;
      const containerWidth = container.offsetWidth;
      const cardWidth = cards[0].offsetWidth || 300;
      const gap = 24;
      
      const T = (containerWidth - cardWidth) / 2 - index * (cardWidth + gap);
      
      if (animate) {
        track.style.transition = 'transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)';
      } else {
        track.style.transition = 'none';
      }
      
      track.style.transform = `translate3d(${T}px, 0, 0)`;
      
      // Update classes pour les effets de perspective 3D
      cards.forEach((card, i) => {
        card.classList.remove('rv-active', 'rv-left', 'rv-right');
        if (i === index) {
          card.classList.add('rv-active');
        } else if (i < index) {
          card.classList.add('rv-left');
        } else {
          card.classList.add('rv-right');
        }
      });
    }
    
    function step() {
      if (isTransitioning) return;
      isTransitioning = true;
      index++;
      updateCarousel(true);
    }
    
    function prev() {
      if (isTransitioning) return;
      isTransitioning = true;
      index--;
      updateCarousel(true);
      resetAutoPlay();
    }
    
    function next() {
      if (isTransitioning) return;
      isTransitioning = true;
      index++;
      updateCarousel(true);
      resetAutoPlay();
    }
    
    function resetAutoPlay() {
      stopAutoPlay();
      startAutoPlay();
    }
    
    track.addEventListener('transitionend', (e) => {
      if (e.target !== track) return;
      isTransitioning = false;
      
      // Quand on atteint le clone de l'Avis 1 à la fin (index 7), on saute sur l'Avis 1 réel au début (index 2)
      if (index >= 7) {
        index = 2;
        updateCarousel(false);
      } else if (index <= 1) {
        index = 6;
        updateCarousel(false);
      }
    });
    
    const btnLeft = document.querySelector('.rv-nav-left');
    const btnRight = document.querySelector('.rv-nav-right');
    if (btnLeft) btnLeft.addEventListener('click', prev);
    if (btnRight) btnRight.addEventListener('click', next);
    
    function startAutoPlay() {
      if (autoPlayInterval) clearInterval(autoPlayInterval);
      autoPlayInterval = setInterval(step, 2000); // 2 secondes
    }
    
    function stopAutoPlay() {
      if (autoPlayInterval) clearInterval(autoPlayInterval);
    }
    
    // Pause au survol de la souris
    const container = track.closest('.rv-ticker-container');
    if (container) {
      container.addEventListener('mouseenter', stopAutoPlay);
      container.addEventListener('mouseleave', startAutoPlay);
    }
    
    // Initialisation
    updateCarousel(false);
    startAutoPlay();
    
    // Support du redimensionnement d'écran
    window.addEventListener('resize', () => {
      updateCarousel(false);
    });
  })();
    } catch (e) {
      console.error("Error in AvisPublic script:", e);
    }
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        /* --- ISOLATION TOTALE DU CSS AVIS POUR WORDPRESS --- */
  .wm-reviews-section {
    --primary-orange:       #ff4d00;
    --primary-orange-light: #ff7e47;
    --primary-green:        #0FAC71;
    --primary-green-light:  #33db88;
    --bg:                   linear-gradient(180deg, #fdfbf7 0%, #faf6ee 100%);
    --card-bg:              #ffffff;
    --card-border:          rgba(15, 15, 17, 0.08);
    --text:                 #000000;
    --text-dim:             #5c5c64;
    --gold:                 #ffb800;

    background: var(--bg);
    color: var(--text);
    padding: 60px 0;
    box-sizing: border-box;
    position: relative;
    overflow: hidden;
    width: 100%;
    border-top: 1px solid var(--card-border) !important;
    border-bottom: 1px solid var(--card-border) !important;
  }

  /* Force Inter + reset isolation WordPress */
  .wm-reviews-section *,
  .wm-reviews-section *::before,
  .wm-reviews-section *::after {
    box-sizing: border-box;
    font-family: 'Inter', sans-serif !important;
  }

  /* Lueur ambiante subtile orange (haut droite) */
  .wm-reviews-section::before {
    content: '';
    position: absolute;
    top: -20%;
    right: -15%;
    width: 600px;
    height: 600px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(224, 83, 0, 0.04) 0%, transparent 65%);
    filter: blur(80px);
    pointer-events: none;
    z-index: 0;
  }

  /* Deuxième lueur d'ambiance verte à l'opposé (bas gauche) */
  .wm-reviews-section::after {
    content: '';
    position: absolute;
    bottom: -20%;
    left: -15%;
    width: 600px;
    height: 600px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(15, 172, 113, 0.03) 0%, transparent 65%);
    filter: blur(80px);
    pointer-events: none;
    z-index: 0;
  }

  /* ── HEADER ── */
  .wm-reviews-section .rv-header {
    text-align: center;
    max-width: 680px;
    margin: 0 auto 32px;
    padding: 0 24px;
    position: relative;
    z-index: 1;
  }

  .wm-reviews-section .rv-badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 6px 18px;
    background: #ffffff;
    border: 1px solid var(--card-border);
    border-radius: 999px;
    font-size: 13px;
    font-weight: 600;
    color: var(--text);
    margin-bottom: 24px;
    letter-spacing: 0.5px;
    box-shadow: 0 2px 8px rgba(15, 15, 17, 0.04);
  }

  .wm-reviews-section .rv-badge-dot {
    width: 6px;
    height: 6px;
    background: var(--primary-green);
    border-radius: 50%;
    box-shadow: 0 0 8px var(--primary-green);
    animation: rvPulseDot 2s infinite;
  }

  .wm-reviews-section .rv-title {
    font-size: clamp(28px, 4vw, 42px);
    font-weight: 800;
    line-height: 1.2;
    letter-spacing: -0.03em;
    color: var(--text) !important;
    margin: 0 0 20px;
  }

  .wm-reviews-section .fancy-underline {
    position: relative;
    display: inline-block;
    white-space: nowrap;
  }

  .wm-reviews-section .fancy-underline::after {
    content: '';
    position: absolute;
    left: -4%;
    bottom: -8px;
    width: 108%;
    height: 10px;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 12' preserveAspectRatio='none'%3E%3Cpath d='M1,4 C30,1 60,1 99,4 M3,8 C33,5 63,5 97,8' fill='none' stroke='%23E05300' stroke-width='2.5' stroke-linecap='round' opacity='0.95'/%3E%3C/svg%3E");
    background-size: 100% 100%;
    background-repeat: no-repeat;
  }

  .wm-reviews-section .rv-subtitle {
    font-size: clamp(14px, 1.8vw, 16px);
    color: var(--text-dim) !important;
    line-height: 1.65;
    margin: 0;
  }

  .wm-reviews-section .rv-highlight-green {
    color: var(--primary-green) !important;
    font-weight: 600;
  }

  /* ── CONTENEUR TICKER DÉFILANT ── */
  .wm-reviews-section .rv-ticker-container {
    display: flex;
    flex-direction: column;
    gap: 32px;
    width: 100%;
    max-width: 1180px;
    margin: 0 auto;
    position: relative;
    z-index: 2;
    overflow: hidden;
    padding: 10px 24px;
  }

  .wm-reviews-section .rv-ticker-row {
    width: 100%;
    overflow: visible;
    display: flex;
    padding: 24px 0;
    perspective: 1200px;
  }

  .wm-reviews-section .rv-ticker-track {
    display: flex;
    gap: 24px;
    width: max-content;
    transform-style: preserve-3d;
    will-change: transform;
    transition: transform 0.8s cubic-bezier(0.25, 1, 0.5, 1);
  }

  /* ── CARTE DANS LE TICKER ── */
  .wm-reviews-section .rv-card {
    background: var(--card-bg);
    border: 1px solid var(--card-border);
    border-radius: 20px;
    padding: 16px;
    display: flex;
    flex-direction: column;
    width: 280px;
    min-height: 280px; /* Hauteur minimale fluide sur mobile */
    flex-shrink: 0;
    white-space: normal;
    position: relative;
    overflow: hidden;
    box-shadow: 0 8px 24px rgba(15, 15, 17, 0.03), 0 1px 3px rgba(15, 15, 17, 0.01);
    
    /* 3D Carousel states */
    opacity: 0.4;
    transform: scale(0.85);
    transform-style: preserve-3d;
    transition: transform 0.8s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.8s ease, border-color 0.3s ease, box-shadow 0.3s ease;
  }

  @media (min-width: 768px) {
    .wm-reviews-section .rv-card {
      width: 320px; /* Largeur sur ordinateur */
      min-height: 300px; /* Hauteur minimale fluide sur ordinateur */
      padding: 24px 20px;
    }
  }

  /* 3D Rotations for Carousel */
  .wm-reviews-section .rv-card.rv-left {
    transform: scale(0.85) rotateY(15deg);
  }

  .wm-reviews-section .rv-card.rv-right {
    transform: scale(0.85) rotateY(-15deg);
  }

  /* Center Active Card */
  .wm-reviews-section .rv-card.rv-active {
    opacity: 1;
    transform: scale(1) rotateY(0deg);
    z-index: 10;
    border-color: var(--primary-orange);
    box-shadow: 0 16px 36px rgba(15, 15, 17, 0.06), 0 1px 3px rgba(15, 15, 17, 0.02);
  }

  .wm-reviews-section .rv-card.rv-active:hover {
    transform: translateY(-4px) scale(1.02) rotateY(0deg);
    border-color: var(--primary-orange);
    box-shadow: 0 20px 40px rgba(15, 15, 17, 0.08), 0 1px 3px rgba(15, 15, 17, 0.02);
  }

  /* Guillemet décoratif positionné absolument */
  .wm-reviews-section .rv-quote-icon {
    font-size: 38px;
    line-height: 1;
    color: var(--primary-orange);
    opacity: 0.15;
    font-family: Georgia, serif !important;
    position: absolute;
    top: 16px;
    right: 20px;
    pointer-events: none;
    transition: transform 0.3s ease, color 0.3s ease;
  }

  .wm-reviews-section .rv-card.rv-active:hover .rv-quote-icon {
    transform: scale(1.1) rotate(-8deg);
    color: var(--primary-green);
    opacity: 0.25;
  }

  /* Étoiles */
  .wm-reviews-section .rv-stars {
    display: flex;
    gap: 4px;
    margin-bottom: 12px;
    transition: transform 0.3s ease;
  }

  .wm-reviews-section .rv-card.rv-active:hover .rv-stars {
    transform: scale(1.03);
  }

  .wm-reviews-section .rv-star {
    width: 15px;
    height: 15px;
    transition: fill 0.3s ease;
  }

  .wm-reviews-section .rv-star.filled {
    fill: var(--gold);
  }

  .wm-reviews-section .rv-star.half {
    fill: url(#halfGrad);
  }

  .wm-reviews-section .rv-star.empty {
    fill: rgba(15, 15, 17, 0.08);
  }

  /* En-tête de la carte (Service + Vérifié) */
  .wm-reviews-section .rv-card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;
    width: 100%;
    gap: 12px;
  }

  /* Badge service */
  .wm-reviews-section .rv-service-badge {
    display: inline-block;
    font-size: 10.5px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.7px;
    color: var(--primary-orange);
    background: rgba(224, 83, 0, 0.05);
    border: 1px solid rgba(224, 83, 0, 0.1);
    border-radius: 6px;
    padding: 3px 9px;
  }

  /* Badge Avis Vérifié */
  .wm-reviews-section .rv-verified-badge {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    font-size: 10.5px;
    font-weight: 600;
    color: var(--primary-green);
    background: rgba(0, 210, 106, 0.06);
    border: 1px solid rgba(0, 210, 106, 0.12);
    padding: 3px 8px;
    border-radius: 6px;
    letter-spacing: 0.2px;
    flex-shrink: 0;
  }

  .wm-reviews-section .rv-verified-icon {
    width: 10px;
    height: 10px;
    stroke: currentColor;
  }

  /* Texte du témoignage complet (hauteur adaptative) */
  .wm-reviews-section .rv-text {
    font-size: 13.5px;
    line-height: 1.6;
    color: #3f3f46;
    font-style: italic;
    flex-grow: 1;
    margin: 0 0 16px;
    font-family: 'Inter', sans-serif !important;
  }

  /* Séparateur */
  .wm-reviews-section .rv-divider {
    width: 100%;
    height: 1px;
    background: rgba(15, 15, 17, 0.06);
    margin-bottom: 16px;
    transition: background 0.4s ease, opacity 0.4s ease;
  }

  .wm-reviews-section .rv-card.rv-active:hover .rv-divider {
    background: linear-gradient(90deg, var(--primary-orange) 0%, var(--primary-green) 100%);
    opacity: 0.6;
  }

  /* Auteur */
  .wm-reviews-section .rv-author {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .wm-reviews-section .rv-avatar {
    width: 38px;
    height: 38px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    font-weight: 800;
    color: #fff;
    flex-shrink: 0;
    letter-spacing: -0.5px;
    border: 2px solid rgba(15, 15, 17, 0.06);
    transition: border-color 0.3s ease, transform 0.3s ease;
  }

  .wm-reviews-section .rv-card.rv-active:hover .rv-avatar {
    border-color: var(--primary-green);
    transform: scale(1.05);
  }

  .wm-reviews-section .av-paul    { background: linear-gradient(135deg, #ff6b6b, #ee5a24); }
  .wm-reviews-section .av-dorcas  { background: linear-gradient(135deg, #4facfe, #0652DD); }
  .wm-reviews-section .av-kouassi { background: linear-gradient(135deg, #43e97b, #0A9E4D); }
  .wm-reviews-section .av-thomas  { background: linear-gradient(135deg, #fa709a, #9b59b6); }
  .wm-reviews-section .av-sarah   { background: linear-gradient(135deg, #f7971e, #ffd200); }
  .wm-reviews-section .av-marc    { background: linear-gradient(135deg, #00c6ff, #0072ff); }

  .wm-reviews-section .rv-author-info {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .wm-reviews-section .rv-name {
    font-size: 13.5px;
    font-weight: 700;
    color: var(--text) !important;
    margin: 0;
  }

  .wm-reviews-section .rv-role {
    font-size: 11px;
    color: var(--text-dim);
    margin: 0;
  }

  /* ── BOUTONS DE NAVIGATION MANUELLE SUR LES CÔTÉS ── */
  .wm-reviews-section .rv-nav-btn {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 46px;
    height: 46px;
    border-radius: 50%;
    border: 1px solid var(--card-border);
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    color: var(--text);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    box-shadow: 0 4px 12px rgba(15, 15, 17, 0.08);
    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    z-index: 10;
    outline: none;
  }

  .wm-reviews-section .rv-nav-left {
    left: 8px;
  }

  .wm-reviews-section .rv-nav-right {
    right: 8px;
  }

  @media (min-width: 1024px) {
    .wm-reviews-section .rv-nav-left {
      left: 12px;
    }
    .wm-reviews-section .rv-nav-right {
      right: 12px;
    }
  }

  .wm-reviews-section .rv-nav-btn:hover {
    background: var(--primary-orange);
    color: #ffffff;
    border-color: var(--primary-orange);
    transform: translateY(-50%) scale(1.08);
    box-shadow: 0 6px 20px rgba(224, 83, 0, 0.25);
  }

  .wm-reviews-section .rv-nav-btn:active {
    transform: translateY(-50%) scale(0.95);
  }

  /* Note globale en bas */
  .wm-reviews-section .rv-global-note-container {
    text-align: center;
    margin-top: 28px;
    position: relative;
    z-index: 1;
    width: 100%;
    padding: 0 24px;
  }

  .wm-reviews-section .rv-global-note {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    gap: 8px;
    background: #ffffff;
    border: 1px solid var(--card-border);
    border-radius: 999px;
    padding: 10px 24px;
    font-size: 13.5px;
    color: var(--text-dim);
    box-shadow: 0 4px 12px rgba(15, 15, 17, 0.02);
  }

  .wm-reviews-section .rv-global-note strong {
    color: var(--primary-green);
    font-weight: 700;
  }

  /* Animations keyframes pulse */
  @keyframes rvPulseDot {
    0% {
      box-shadow: 0 0 0 0 rgba(0, 210, 106, 0.7);
    }
    70% {
      box-shadow: 0 0 0 6px rgba(0, 210, 106, 0);
    }
    100% {
      box-shadow: 0 0 0 0 rgba(0, 210, 106, 0);
    }
  }

  /* Responsive */
  @media (min-width: 768px) {
    .wm-reviews-section .rv-header { margin-bottom: 32px; }
  }
      ` }} />
      
      <div dangerouslySetInnerHTML={{ __html: `
        <!-- Import de la police Inter (sécurité si non présent dans le parent) -->




<!-- SVG gradient pour demi-étoile -->
<svg width="0" height="0" style="position:absolute">
  <defs>
    <linearGradient id="halfGrad">
      <stop offset="50%" stop-color="#ffb800"/>
      <stop offset="50%" stop-color="rgba(15, 15, 17, 0.08)"/>
    </linearGradient>
  </defs>
</svg>

<section class="wm-reviews-section" id="avis-clients" aria-label="Témoignages clients">

  <div class="rv-header">
    <div class="rv-badge">
      <span class="rv-badge-dot"></span> Témoignages clients
    </div>
    <h2 class="rv-title">Ils nous font <span class="fancy-underline">confiance.</span></h2>
    <p class="rv-subtitle">Des retours sincères de professionnels accompagnés vers leur <span class="rv-highlight-green">réussite</span> digitale.</p>
  </div>

  <div class="rv-ticker-container">
    
    <!-- Unique ligne de défilement -->
    <div class="rv-ticker-row">
      <div class="rv-ticker-track rv-track-single">
        
        <!-- Index 0 : Avis 4 (Thomas) - Clone -->
        <div class="rv-card">
          <span class="rv-quote-icon">&ldquo;</span>
          <div class="rv-stars" aria-label="5 étoiles sur 5">
            <svg class="rv-star filled" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>
            <svg class="rv-star filled" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>
            <svg class="rv-star filled" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>
            <svg class="rv-star filled" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>
            <svg class="rv-star filled" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>
          </div>
          <div class="rv-card-header">
            <span class="rv-service-badge">Plateforme · Conversion</span>
            <span class="rv-verified-badge">
              <svg class="rv-verified-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
              Avis Vérifié
            </span>
          </div>
          <p class="rv-text">« Esthétique et fluidité impeccables. Nos conversions ont augmenté de 40% dès le premier mois grâce à ce design premium. Un travail d'orfèvre, vraiment impressionnant. »</p>
          <div class="rv-divider"></div>
          <div class="rv-author">
            <div class="rv-avatar av-thomas">T</div>
            <div class="rv-author-info">
              <p class="rv-name">Thomas</p>
              <p class="rv-role">Directeur Produit · Services Digitaux</p>
            </div>
          </div>
        </div>

        <!-- Index 1 : Avis 5 (Sarah) - Clone -->
        <div class="rv-card">
          <span class="rv-quote-icon">&ldquo;</span>
          <div class="rv-stars" aria-label="4 étoiles sur 5">
            <svg class="rv-star filled" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>
            <svg class="rv-star filled" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>
            <svg class="rv-star filled" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>
            <svg class="rv-star filled" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>
            <svg class="rv-star empty" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>
          </div>
          <div class="rv-card-header">
            <span class="rv-service-badge">E-commerce · Logistique</span>
            <span class="rv-verified-badge">
              <svg class="rv-verified-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
              Avis Vérifié
            </span>
          </div>
          <p class="rv-text">« Une logistique complexe Europe-Afrique enfin simplifiée ! Nos clients apprécient grandement la clarté du parcours et la rapidité de prise en charge des commandes. »</p>
          <div class="rv-divider"></div>
          <div class="rv-author">
            <div class="rv-avatar av-sarah">S</div>
            <div class="rv-author-info">
              <p class="rv-name">Sarah</p>
              <p class="rv-role">Co-fondatrice · Logistique Express</p>
            </div>
          </div>
        </div>

        <!-- Index 2 : Avis 1 (Paul) -->
        <div class="rv-card">
          <span class="rv-quote-icon">&ldquo;</span>
          <div class="rv-stars" aria-label="5 étoiles sur 5">
            <svg class="rv-star filled" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>
            <svg class="rv-star filled" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>
            <svg class="rv-star filled" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>
            <svg class="rv-star filled" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>
            <svg class="rv-star filled" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>
          </div>
          <div class="rv-card-header">
            <span class="rv-service-badge">Création WordPress</span>
            <span class="rv-verified-badge">
              <svg class="rv-verified-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
              Avis Vérifié
            </span>
          </div>
          <p class="rv-text">« Notre nouveau site WordPress est d'une fluidité incroyable. L'équipe a su traduire notre vision avec un design ultra-moderne et des performances techniques exceptionnelles. »</p>
          <div class="rv-divider"></div>
          <div class="rv-author">
            <div class="rv-avatar av-paul">P</div>
            <div class="rv-author-info">
              <p class="rv-name">Paul</p>
              <p class="rv-role">Fondateur · Studio Créatif</p>
            </div>
          </div>
        </div>

        <!-- Index 3 : Avis 2 (Dorcas) -->
        <div class="rv-card">
          <span class="rv-quote-icon">&ldquo;</span>
          <div class="rv-stars" aria-label="5 étoiles sur 5">
            <svg class="rv-star filled" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>
            <svg class="rv-star filled" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>
            <svg class="rv-star filled" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>
            <svg class="rv-star filled" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>
            <svg class="rv-star filled" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>
          </div>
          <div class="rv-card-header">
            <span class="rv-service-badge">Automatisations · CRM</span>
            <span class="rv-verified-badge">
              <svg class="rv-verified-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
              Avis Vérifié
            </span>
          </div>
          <p class="rv-text">« L'automatisation de nos tunnels de vente a divisé par deux le temps de traitement de nos leads. Une expertise rare qui a révolutionné notre organisation au quotidien. »</p>
          <div class="rv-divider"></div>
          <div class="rv-author">
            <div class="rv-avatar av-dorcas">D</div>
            <div class="rv-author-info">
              <p class="rv-name">Dorcas</p>
              <p class="rv-role">Directrice Opérationnelle · FinTech</p>
            </div>
          </div>
        </div>

        <!-- Index 4 : Avis 3 (Kouassi) -->
        <div class="rv-card">
          <span class="rv-quote-icon">&ldquo;</span>
          <div class="rv-stars" aria-label="5 étoiles sur 5">
            <svg class="rv-star filled" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>
            <svg class="rv-star filled" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>
            <svg class="rv-star filled" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>
            <svg class="rv-star filled" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>
            <svg class="rv-star filled" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>
          </div>
          <div class="rv-card-header">
            <span class="rv-service-badge">Google Ads · SEA</span>
            <span class="rv-verified-badge">
              <svg class="rv-verified-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
              Avis Vérifié
            </span>
          </div>
          <p class="rv-text">« Une campagne Google Ads structurée avec brio. En seulement deux semaines, notre coût par lead a chuté de 30% tandis que le volume de conversions s'est envolé. »</p>
          <div class="rv-divider"></div>
          <div class="rv-author">
            <div class="rv-avatar av-kouassi">K</div>
            <div class="rv-author-info">
              <p class="rv-name">Kouassi</p>
              <p class="rv-role">Responsable Acquisition · Groupe B2B</p>
            </div>
          </div>
        </div>

        <!-- Index 5 : Avis 4 (Thomas) -->
        <div class="rv-card">
          <span class="rv-quote-icon">&ldquo;</span>
          <div class="rv-stars" aria-label="5 étoiles sur 5">
            <svg class="rv-star filled" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>
            <svg class="rv-star filled" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>
            <svg class="rv-star filled" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>
            <svg class="rv-star filled" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>
            <svg class="rv-star filled" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>
          </div>
          <div class="rv-card-header">
            <span class="rv-service-badge">Plateforme · Conversion</span>
            <span class="rv-verified-badge">
              <svg class="rv-verified-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
              Avis Vérifié
            </span>
          </div>
          <p class="rv-text">« Esthétique et fluidité impeccables. Nos conversions ont augmenté de 40% dès le premier mois grâce à ce design premium. Un travail d'orfèvre, vraiment impressionnant. »</p>
          <div class="rv-divider"></div>
          <div class="rv-author">
            <div class="rv-avatar av-thomas">T</div>
            <div class="rv-author-info">
              <p class="rv-name">Thomas</p>
              <p class="rv-role">Directeur Produit · Services Digitaux</p>
            </div>
          </div>
        </div>

        <!-- Index 6 : Avis 5 (Sarah) -->
        <div class="rv-card">
          <span class="rv-quote-icon">&ldquo;</span>
          <div class="rv-stars" aria-label="4 étoiles sur 5">
            <svg class="rv-star filled" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>
            <svg class="rv-star filled" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>
            <svg class="rv-star filled" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>
            <svg class="rv-star filled" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>
            <svg class="rv-star empty" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>
          </div>
          <div class="rv-card-header">
            <span class="rv-service-badge">E-commerce · Logistique</span>
            <span class="rv-verified-badge">
              <svg class="rv-verified-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
              Avis Vérifié
            </span>
          </div>
          <p class="rv-text">« Une logistique complexe Europe-Afrique enfin simplifiée ! Nos clients apprécient grandement la clarté du parcours et la rapidité de prise en charge des commandes. »</p>
          <div class="rv-divider"></div>
          <div class="rv-author">
            <div class="rv-avatar av-sarah">S</div>
            <div class="rv-author-info">
              <p class="rv-name">Sarah</p>
              <p class="rv-role">Co-fondatrice · Logistique Express</p>
            </div>
          </div>
        </div>

        <!-- Index 7 : Avis 1 (Paul) - Clone -->
        <div class="rv-card">
          <span class="rv-quote-icon">&ldquo;</span>
          <div class="rv-stars" aria-label="5 étoiles sur 5">
            <svg class="rv-star filled" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>
            <svg class="rv-star filled" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>
            <svg class="rv-star filled" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>
            <svg class="rv-star filled" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>
            <svg class="rv-star filled" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>
          </div>
          <div class="rv-card-header">
            <span class="rv-service-badge">Création WordPress</span>
            <span class="rv-verified-badge">
              <svg class="rv-verified-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
              Avis Vérifié
            </span>
          </div>
          <p class="rv-text">« Notre nouveau site WordPress est d'une fluidité incroyable. L'équipe a su traduire notre vision avec un design ultra-moderne et des performances techniques exceptionnelles. »</p>
          <div class="rv-divider"></div>
          <div class="rv-author">
            <div class="rv-avatar av-paul">P</div>
            <div class="rv-author-info">
              <p class="rv-name">Paul</p>
              <p class="rv-role">Fondateur · Studio Créatif</p>
            </div>
          </div>
        </div>

        <!-- Index 8 : Avis 2 (Dorcas) - Clone -->
        <div class="rv-card">
          <span class="rv-quote-icon">&ldquo;</span>
          <div class="rv-stars" aria-label="5 étoiles sur 5">
            <svg class="rv-star filled" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>
            <svg class="rv-star filled" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>
            <svg class="rv-star filled" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>
            <svg class="rv-star filled" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>
            <svg class="rv-star filled" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>
          </div>
          <div class="rv-card-header">
            <span class="rv-service-badge">Automatisations · CRM</span>
            <span class="rv-verified-badge">
              <svg class="rv-verified-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
              Avis Vérifié
            </span>
          </div>
          <p class="rv-text">« L'automatisation de nos tunnels de vente a divisé par deux le temps de traitement de nos leads. Une expertise rare qui a révolutionné notre organisation au quotidien. »</p>
          <div class="rv-divider"></div>
          <div class="rv-author">
            <div class="rv-avatar av-dorcas">D</div>
            <div class="rv-author-info">
              <p class="rv-name">Dorcas</p>
              <p class="rv-role">Directrice Opérationnelle · FinTech</p>
            </div>
          </div>
        </div>

      </div>
    </div>
    
    <!-- Boutons de navigation manuelle -->
    <button class="rv-nav-btn rv-nav-left" aria-label="Avis précédent">
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
    </button>
    <button class="rv-nav-btn rv-nav-right" aria-label="Avis suivant">
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
    </button>
    
  </div>

  <!-- Note globale -->
  <div class="rv-global-note-container">
    <div class="rv-global-note">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--primary-green)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
      <span>Note moyenne de <strong>4,8 / 5</strong> basée sur 5 avis clients vérifiés</span>
    </div>
  </div>

</section>


      ` }} />
    </>
  );
};
