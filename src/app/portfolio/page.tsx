'use client';

import React, { useEffect } from 'react';
import { HeaderPublic } from '@/components/public/HeaderPublic';
import { FooterPublic } from '@/components/public/FooterPublic';

export default function Page() {
  useEffect(() => {
    try {
      (function () {
    function initPortfolioFilters() {
      const filterBtns = document.querySelectorAll('.wm-portfolio .portfolio-filter-btn');
      const cards = document.querySelectorAll('.wm-portfolio .portfolio-card');

      if (filterBtns && cards) {
        filterBtns.forEach(btn => {
          btn.addEventListener('click', () => {
            // Activer l'onglet cliqué
            filterBtns.forEach(b => {
              b.classList.remove('active');
              b.setAttribute('aria-selected', 'false');
            });
            btn.classList.add('active');
            btn.setAttribute('aria-selected', 'true');

            const filterValue = btn.getAttribute('data-filter');

            // Filtrage avec fondu animé
            cards.forEach(card => {
              if (filterValue === 'all' || card.classList.contains(filterValue)) {
                // Montrer la carte
                card.style.display = 'flex';
                setTimeout(() => {
                  card.style.opacity = '1';
                  card.style.transform = 'scale(1)';
                  card.style.pointerEvents = 'auto';
                }, 40);
              } else {
                // Cacher la carte
                card.style.opacity = '0';
                card.style.transform = 'scale(0.96)';
                card.style.pointerEvents = 'none';
                setTimeout(() => {
                  card.style.display = 'none';
                }, 300);
              }
            });
          });
        });
      }
    }

    function initSeoTabs() {
      const tabBtns = document.querySelectorAll('.wm-portfolio .seo-tab-btn');
      const tabContents = document.querySelectorAll('.wm-portfolio .seo-tab-content');
      const mockupScreens = document.querySelectorAll('.wm-portfolio .mockup-screen');
      const mockupUrl = document.getElementById('mockup-url');

      if (tabBtns && tabContents && mockupScreens) {
        tabBtns.forEach(btn => {
          btn.addEventListener('click', () => {
            const stepId = btn.getAttribute('data-step');

            // Activer l'onglet cliqué
            tabBtns.forEach(b => {
              b.classList.remove('active');
              b.setAttribute('aria-selected', 'false');
            });
            btn.classList.add('active');
            btn.setAttribute('aria-selected', 'true');

            // Afficher le bon texte
            tabContents.forEach(content => {
              if (content.getAttribute('data-step') === stepId) {
                content.classList.add('active');
              } else {
                content.classList.remove('active');
              }
            });

            // Afficher le bon mockup
            mockupScreens.forEach(screen => {
              if (screen.getAttribute('data-step') === stepId) {
                screen.classList.add('active');

                // Relancer l'animation du graphique SVG si c'est l'écran 3
                if (stepId === '3') {
                  const line = screen.querySelector('.chart-line');
                  if (line) {
                    line.style.animation = 'none';
                    line.offsetHeight; /* trigger reflow */
                    line.style.animation = 'drawChart 2.5s cubic-bezier(0.16, 1, 0.3, 1) forwards';
                  }
                }
              } else {
                screen.classList.remove('active');
              }
            });

            // Mettre à jour l'URL factice du navigateur
            if (mockupUrl) {
              if (stepId === '1') {
                mockupUrl.textContent = 'https://webmodernseo.co/seo-audit-semantique';
              } else if (stepId === '2') {
                mockupUrl.textContent = 'https://webmodernseo.co/pagespeed-insights';
              } else if (stepId === '3') {
                mockupUrl.textContent = 'https://webmodernseo.co/search-console';
              }
            }
          });
        });
      }
    }

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        initPortfolioFilters();
        initSeoTabs();
      });
    } else {
      initPortfolioFilters();
      initSeoTabs();
    }
  })();
    } catch (e) {
      console.error("Error in portfolio page script:", e);
    }
  }, []);

  return (
    <div className="relative min-h-screen bg-[#FDFBF7] text-black overflow-x-hidden font-sans">
      <HeaderPublic />
      
      <main className="w-full pt-24 pb-16">
        <style dangerouslySetInnerHTML={{ __html: `
          /* --- ISOLATION TOTALE DU CSS PORTFOLIO --- */
  .wm-portfolio {
    --primary-orange: #e85500;
    --primary-orange-light: #ff6a1a;
    --bg-color: #ffffff;
    --text-main: #000000;
    --text-dim: #5c5c64;
    --border-subtle: rgba(15, 15, 17, 0.06);
    --card-bg: #ffffff;
    --emerald-green: #0fac71;

    background: linear-gradient(180deg, #fdfbf7 0%, #faf6ee 100%) !important;
    border-top: 1px solid rgba(15, 15, 17, 0.06) !important;
    border-bottom: 1px solid rgba(15, 15, 17, 0.06) !important;
    color: var(--text-main) !important;
    -webkit-font-smoothing: antialiased;
    padding: 100px 24px;
    box-sizing: border-box;
    position: relative;
    overflow: hidden;
    width: 100%;
  }

  /* --- FORCE POLICE INTER SUR TOUS LES ENFANTS --- */
  .wm-portfolio *,
  .wm-portfolio *::before,
  .wm-portfolio *::after {
    box-sizing: inherit;
    margin: 0;
    padding: 0;
  }

  .wm-portfolio,
  .wm-portfolio h2,
  .wm-portfolio h3,
  .wm-portfolio p,
  .wm-portfolio span,
  .wm-portfolio strong,
  .wm-portfolio div,
  .wm-portfolio a,
  .wm-portfolio button {
    font-family: 'Inter', sans-serif !important;
  }

  /* === EN-TETE === */
  .wm-portfolio .portfolio-header {
    text-align: center;
    max-width: 800px;
    margin: 0 auto 50px auto;
    position: relative;
    z-index: 1;
  }

  .wm-portfolio .portfolio-badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 6px 18px;
    background: rgba(15, 15, 17, 0.04);
    border: 1px solid var(--border-subtle);
    border-radius: 999px;
    font-size: 13px;
    font-weight: 500;
    color: var(--text-main);
    margin-bottom: 20px;
    letter-spacing: 0.5px;
    backdrop-filter: blur(10px);
  }

  .wm-portfolio .portfolio-badge-icon {
    color: var(--primary-orange);
  }

  .wm-portfolio .portfolio-title {
    font-size: clamp(28px, 4.5vw, 48px);
    font-weight: 800;
    line-height: 1.2;
    margin-bottom: 20px;
    letter-spacing: -1.2px;
    color: var(--text-main);
  }

  .wm-portfolio .portfolio-title .highlight {
    color: var(--primary-orange);
  }

  .wm-portfolio .portfolio-subtitle {
    color: var(--text-dim);
    font-size: clamp(15px, 2vw, 18px);
    line-height: 1.65;
  }

  /* === BOUTONS DE FILTRE === */
  .wm-portfolio .portfolio-filters {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    gap: 12px;
    margin-bottom: 50px;
    position: relative;
    z-index: 2;
  }

  .wm-portfolio .portfolio-filter-btn {
    font-size: 14px;
    font-weight: 600;
    color: var(--text-dim);
    background: rgba(15, 15, 17, 0.02);
    border: 1px solid var(--border-subtle);
    padding: 10px 24px;
    border-radius: 999px;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .wm-portfolio .portfolio-filter-btn:hover {
    color: var(--text-main);
    border-color: rgba(15, 15, 17, 0.15);
    background: rgba(15, 15, 17, 0.05);
  }

  .wm-portfolio .portfolio-filter-btn.active {
    color: #ffffff;
    background: var(--primary-orange);
    border-color: var(--primary-orange);
    box-shadow: 0 4px 15px rgba(232, 85, 0, 0.25);
  }

  /* === GRID === */
  .wm-portfolio .portfolio-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 32px;
    max-width: 1200px;
    margin: 0 auto;
    position: relative;
    z-index: 1;
    min-height: 500px;
  }

  /* === CARTE PROJET === */
  .wm-portfolio .portfolio-card {
    background: var(--card-bg);
    border: 1px solid var(--border-subtle);
    border-radius: 28px;
    padding: 24px;
    backdrop-filter: blur(12px);
    transition: opacity 0.4s ease, transform 0.4s ease, border-color 0.3s ease, box-shadow 0.3s ease;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: relative;
    overflow: hidden;
    opacity: 1;
    transform: scale(1);
    box-shadow: 0 10px 30px rgba(15, 15, 17, 0.02), 0 1px 3px rgba(15, 15, 17, 0.01);
  }

  .wm-portfolio .portfolio-card:hover {
    border-color: rgba(232, 85, 0, 0.25);
    box-shadow: 0 20px 40px rgba(15, 15, 17, 0.06), 0 0 0 1px rgba(232, 85, 0, 0.02);
  }

  .wm-portfolio .portfolio-card-visual {
    width: 100%;
    height: 180px;
    background: rgba(15, 15, 17, 0.02);
    border-radius: 20px;
    margin-bottom: 24px;
    position: relative;
    overflow: hidden;
    border: 1px solid rgba(15, 15, 17, 0.04);
  }

  /* Zoom image au survol */
  .wm-portfolio .portfolio-card-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .wm-portfolio .portfolio-card:hover .portfolio-card-img {
    transform: scale(1.06);
  }

  /* Ombre interne pour l'effet premium */
  .wm-portfolio .portfolio-card-visual::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, transparent 70%, rgba(15, 15, 17, 0.04) 100%);
    pointer-events: none;
  }

  .wm-portfolio .portfolio-card h3 {
    font-size: 20px;
    font-weight: 700;
    margin-bottom: 8px;
    letter-spacing: -0.5px;
    color: var(--text-main) !important;
  }

  .wm-portfolio .portfolio-card p {
    color: var(--text-dim);
    font-size: 14px;
    line-height: 1.55;
    margin-bottom: 20px;
    flex-grow: 1;
  }

  .wm-portfolio .project-tag {
    font-size: 10px;
    font-weight: 700;
    color: var(--primary-orange);
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-bottom: 6px;
  }

  /* === BOUTON LIEN EXTERNE === */
  .wm-portfolio .visit-link {
    font-size: 13.5px;
    font-weight: 600;
    color: var(--text-main) !important;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    transition: all 0.2s ease;
    align-self: flex-start;
    padding: 6px 0;
  }

  .wm-portfolio .visit-link:hover {
    color: var(--primary-orange) !important;
    transform: translateX(4px);
  }

  .wm-portfolio .visit-link .link-arrow {
    transition: transform 0.2s ease;
  }

  .wm-portfolio .visit-link:hover .link-arrow {
    transform: translateX(2px);
  }


  /* =============================================
     RESPONSIVE DESIGN
     ============================================= */

  @media (min-width: 768px) {
    .wm-portfolio {
      padding: 120px 40px;
    }

    .wm-portfolio .portfolio-header {
      margin-bottom: 70px;
    }

    .wm-portfolio .portfolio-grid {
      grid-template-columns: repeat(2, 1fr);
      gap: 28px;
    }

    /* Le 7ème élément prend toute la largeur sur tablette ou se centre */
    .wm-portfolio .portfolio-card:nth-child(7) {
      grid-column: span 2;
      max-width: 580px;
      margin: 0 auto;
      width: 100%;
    }
  }

  @media (min-width: 1024px) {
    .wm-portfolio {
      padding: 140px 60px;
    }

    .wm-portfolio .portfolio-grid {
      grid-template-columns: repeat(3, 1fr);
      gap: 32px;
    }

    /* Réinitialisation de l'alignement tablette sur grand écran */
    .wm-portfolio .portfolio-card:nth-child(7) {
      grid-column: span 1;
      max-width: none;
      margin: 0;
    }
  }

  /* --- SECTION METHODOLOGIE SEO --- */
  .wm-portfolio .portfolio-seo-section {
    margin-top: 120px;
    padding-top: 100px;
    border-top: 1px solid var(--border-subtle);
    position: relative;
    z-index: 1;
  }

  .wm-portfolio .seo-header {
    text-align: center;
    max-width: 800px;
    margin: 0 auto 60px auto;
  }

  .wm-portfolio .seo-section-title {
    font-size: clamp(24px, 3.5vw, 38px);
    font-weight: 800;
    line-height: 1.25;
    margin-bottom: 16px;
    letter-spacing: -1.2px;
    color: var(--text-main);
  }

  .wm-portfolio .seo-section-title .highlight-green {
    color: #0fac71;
    /* Green accent */
    text-shadow: 0 0 20px rgba(15, 172, 113, 0.1);
  }

  .wm-portfolio .seo-section-subtitle {
    color: var(--text-dim);
    font-size: clamp(14px, 1.8vw, 16px);
    line-height: 1.6;
  }

  /* Layout 2 colonnes */
  .wm-portfolio .seo-steps-container {
    display: grid;
    grid-template-columns: 1fr;
    gap: 40px;
    max-width: 1200px;
    margin: 0 auto;
    align-items: center;
  }

  /* Colonne de gauche : Boutons & explications */
  .wm-portfolio .seo-sidebar {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  /* Liste horizontale sur mobile, verticale sur desktop */
  .wm-portfolio .seo-tabs-nav {
    display: flex;
    gap: 10px;
    overflow-x: auto;
    padding-bottom: 8px;
    scrollbar-width: none;
    /* Hide scrollbar on Firefox */
  }

  .wm-portfolio .seo-tabs-nav::-webkit-scrollbar {
    display: none;
    /* Hide scrollbar on Chrome/Safari */
  }

  .wm-portfolio .seo-tab-btn {
    flex: 0 0 auto;
    background: rgba(15, 15, 17, 0.02);
    border: 1px solid var(--border-subtle);
    padding: 12px 20px;
    border-radius: 16px;
    color: var(--text-dim);
    font-size: 13.5px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    display: flex;
    align-items: center;
    gap: 10px;
    text-align: left;
  }

  .wm-portfolio .seo-tab-btn:hover {
    color: var(--text-main);
    background: rgba(15, 15, 17, 0.05);
    border-color: rgba(15, 15, 17, 0.15);
  }

  .wm-portfolio .seo-tab-btn.active {
    color: #ffffff;
    background: var(--emerald-green);
    border-color: var(--emerald-green);
    box-shadow: 0 4px 20px rgba(15, 172, 113, 0.2);
  }

  .wm-portfolio .seo-tab-num {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    border-radius: 6px;
    background: rgba(15, 15, 17, 0.05);
    font-size: 11px;
    font-weight: 800;
    color: var(--text-dim);
    transition: all 0.3s;
  }

  .wm-portfolio .seo-tab-btn.active .seo-tab-num {
    background: #ffffff;
    color: var(--emerald-green);
  }

  /* Explications sous le bouton actif */
  .wm-portfolio .seo-tab-content-wrapper {
    background: #ffffff;
    border: 1px solid var(--border-subtle);
    border-radius: 20px;
    padding: 24px;
    min-height: 180px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
    overflow: hidden;
    box-shadow: 0 10px 30px rgba(15, 15, 17, 0.02);
  }

  .wm-portfolio .seo-tab-content {
    display: none;
    animation: fadeIn 0.4s ease forwards;
  }

  .wm-portfolio .seo-tab-content.active {
    display: block;
  }

  .wm-portfolio .seo-tab-content h4 {
    font-size: 18px;
    font-weight: 700;
    color: var(--text-main) !important;
    margin-bottom: 8px;
  }

  .wm-portfolio .seo-tab-content p {
    font-size: 14px;
    color: var(--text-dim);
    line-height: 1.6;
    margin-bottom: 16px;
  }

  .wm-portfolio .seo-tags-list {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  .wm-portfolio .seo-tag {
    font-size: 11px;
    font-weight: 600;
    background: rgba(15, 15, 17, 0.04);
    border: 1px solid var(--border-subtle);
    padding: 4px 10px;
    border-radius: 99px;
    color: var(--text-dim);
  }

  /* Colonne de droite : Affichage interactif du Mockup en CSS */
  .wm-portfolio .seo-visual-display {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    perspective: 1000px;
  }

  .wm-portfolio .seo-mockup-frame {
    width: 100%;
    max-width: 540px;
    background: #ffffff;
    border: 1px solid var(--border-subtle);
    border-radius: 24px;
    padding: 16px;
    box-shadow: 0 20px 45px rgba(15, 15, 17, 0.06);
    position: relative;
    overflow: hidden;
    aspect-ratio: 16 / 11;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  /* Barre d'adresse factice type navigateur */
  .wm-portfolio .mockup-browser-bar {
    display: flex;
    align-items: center;
    gap: 6px;
    margin-bottom: 16px;
    border-bottom: 1px solid rgba(15, 15, 17, 0.06);
    padding-bottom: 12px;
  }

  .wm-portfolio .browser-dots {
    display: flex;
    gap: 4px;
  }

  .wm-portfolio .browser-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
  }

  .wm-portfolio .browser-dot:nth-child(1) {
    background: #ef4444;
  }

  .wm-portfolio .browser-dot:nth-child(2) {
    background: #fbbf24;
  }

  .wm-portfolio .browser-dot:nth-child(3) {
    background: #0fac71;
  }

  .wm-portfolio .browser-address {
    flex-grow: 1;
    background: rgba(15, 15, 17, 0.03);
    border: 1px solid rgba(15, 15, 17, 0.04);
    border-radius: 6px;
    font-size: 11px;
    color: #5c5c64;
    padding: 4px 12px;
    text-align: center;
    letter-spacing: 0.5px;
  }

  /* Conteneur des écrans de mockups */
  .wm-portfolio .mockup-screens {
    flex-grow: 1;
    position: relative;
    width: 100%;
    height: 100%;
  }

  .wm-portfolio .mockup-screen {
    position: absolute;
    inset: 0;
    opacity: 0;
    transform: scale(0.97) translateY(5px);
    transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
    pointer-events: none;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .wm-portfolio .mockup-screen.active {
    opacity: 1;
    transform: scale(1) translateY(0);
    pointer-events: auto;
  }

  /* MOCKUP 1 : AUDIT SÉMANTIQUE */
  .wm-portfolio .mockup-audit-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
    height: 100%;
  }

  .wm-portfolio .audit-card {
    background: rgba(15, 15, 17, 0.02);
    border: 1px solid rgba(15, 15, 17, 0.04);
    border-radius: 12px;
    padding: 12px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .wm-portfolio .audit-card.span-2 {
    grid-column: span 2;
  }

  .wm-portfolio .audit-card-title {
    font-size: 10px;
    color: var(--text-dim);
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-bottom: 6px;
  }

  .wm-portfolio .audit-score-num {
    font-size: 26px;
    font-weight: 800;
    color: #0fac71;
  }

  .wm-portfolio .audit-volume-bar {
    height: 6px;
    width: 100%;
    background: rgba(15, 15, 17, 0.06);
    border-radius: 99px;
    overflow: hidden;
    margin-top: 6px;
  }

  .wm-portfolio .audit-volume-fill {
    height: 100%;
    background: #0fac71;
    border-radius: 99px;
  }

  /* Tableau de mots clés */
  .wm-portfolio .audit-table {
    display: flex;
    flex-direction: column;
    gap: 6px;
    margin-top: 4px;
  }

  .wm-portfolio .audit-table-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #ffffff;
    border: 1px solid rgba(15, 15, 17, 0.04);
    border-radius: 8px;
    padding: 6px 10px;
    font-size: 11px;
  }

  .wm-portfolio .audit-keyword {
    font-weight: 600;
    color: var(--text-main);
  }

  .wm-portfolio .audit-kd-badge {
    background: rgba(15, 172, 113, 0.08);
    color: #0fac71;
    font-size: 9px;
    font-weight: 700;
    padding: 2px 6px;
    border-radius: 4px;
  }

  .wm-portfolio .audit-search-vol {
    font-weight: 700;
    color: var(--text-dim);
  }

  /* MOCKUP 2 : PAGE SPEED / CORE WEB VITALS */
  .wm-portfolio .mockup-speed-scores {
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin: 10px 0 20px 0;
  }

  .wm-portfolio .speed-gauge-wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
  }

  .wm-portfolio .speed-gauge {
    position: relative;
    width: 68px;
    height: 68px;
    border-radius: 50%;
    background: conic-gradient(#0fac71 var(--score-pct), rgba(15, 15, 17, 0.05) 0);
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0 0 15px rgba(15, 172, 113, 0.1);
  }

  .wm-portfolio .speed-gauge::after {
    content: '';
    position: absolute;
    width: 56px;
    height: 56px;
    border-radius: 50%;
    background: #ffffff;
  }

  .wm-portfolio .speed-gauge-value {
    position: relative;
    z-index: 1;
    font-size: 18px;
    font-weight: 800;
    color: #0fac71;
  }

  .wm-portfolio .speed-gauge-lbl {
    font-size: 10px;
    font-weight: 600;
    color: var(--text-dim);
  }

  .wm-portfolio .speed-metrics-list {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
  }

  .wm-portfolio .speed-metric-item {
    background: rgba(15, 15, 17, 0.02);
    border: 1px solid rgba(15, 15, 17, 0.04);
    border-radius: 8px;
    padding: 8px 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 11px;
  }

  .wm-portfolio .metric-name {
    color: var(--text-dim);
  }

  .wm-portfolio .metric-val-green {
    font-weight: 700;
    color: #0fac71;
  }

  /* MOCKUP 3 : GOOGLE SEARCH CONSOLE */
  .wm-portfolio .mockup-gsc-stats {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
    margin-bottom: 12px;
  }

  .wm-portfolio .gsc-stat-card {
    background: rgba(15, 15, 17, 0.02);
    border: 1px solid rgba(15, 15, 17, 0.04);
    border-radius: 10px;
    padding: 10px;
  }

  .wm-portfolio .gsc-stat-title {
    font-size: 9px;
    color: var(--text-dim);
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-bottom: 4px;
  }

  .wm-portfolio .gsc-stat-val {
    font-size: 16px;
    font-weight: 800;
    color: var(--text-main);
    display: flex;
    align-items: center;
    gap: 4px;
  }

  .wm-portfolio .gsc-stat-trend {
    font-size: 9px;
    color: #0fac71;
    font-weight: 700;
  }

  /* Graphique vectoriel */
  .wm-portfolio .gsc-chart-wrap {
    flex-grow: 1;
    position: relative;
    border: 1px solid rgba(15, 15, 17, 0.04);
    background: rgba(15, 15, 17, 0.01);
    border-radius: 12px;
    padding: 12px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 120px;
  }

  .wm-portfolio .gsc-chart-svg {
    width: 100%;
    height: 70px;
    overflow: visible;
  }

  .wm-portfolio .chart-line {
    fill: none;
    stroke: url(#gsc-glow-grad);
    stroke-width: 2.5;
    stroke-linecap: round;
    filter: drop-shadow(0px 4px 10px rgba(15, 172, 113, 0.2));
    stroke-dasharray: 1000;
    stroke-dashoffset: 1000;
    animation: drawChart 2.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }

  .wm-portfolio .chart-area {
    fill: url(#gsc-area-grad);
    opacity: 0.08;
  }

  .wm-portfolio .chart-labels {
    display: flex;
    justify-content: space-between;
    font-size: 9px;
    color: #5c5c64;
    margin-top: 6px;
    border-top: 1px dashed rgba(15, 15, 17, 0.06);
    padding-top: 6px;
  }

  /* Animations */
  @keyframes drawChart {
    to {
      stroke-dashoffset: 0;
    }
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(6px);
    }

    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  /* =============================================
     RESPONSIVE SUR SEO PROCESS
     ============================================= */
  @media (min-width: 1024px) {
    .wm-portfolio .portfolio-seo-section {
      margin-top: 160px;
      padding-top: 120px;
    }

    .wm-portfolio .seo-steps-container {
      grid-template-columns: 1fr 1.1fr;
      gap: 60px;
    }

    .wm-portfolio .seo-tabs-nav {
      flex-direction: column;
      overflow-x: visible;
      gap: 12px;
    }

    .wm-portfolio .seo-tab-btn {
      width: 100%;
    }
  }

  /* --- WIDGETS DES CARTES SEO DANS LE PORTFOLIO --- */
  .wm-portfolio .seo-visual-local,
  .wm-portfolio .seo-visual-traffic,
  .wm-portfolio .seo-visual-technical {
    display: flex;
    justify-content: center;
    align-items: center;
    background: #faf6ee !important;
  }

  .wm-portfolio .local-seo-widget,
  .wm-portfolio .traffic-seo-widget,
  .wm-portfolio .technical-seo-widget {
    width: 100%;
    height: 100%;
    padding: 16px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    box-sizing: border-box;
  }

  .wm-portfolio .local-seo-header,
  .wm-portfolio .traffic-seo-header,
  .wm-portfolio .technical-seo-header {
    display: flex;
    align-items: center;
    gap: 8px;
    border-bottom: 1px solid rgba(15, 15, 17, 0.08);
    padding-bottom: 8px;
    margin-bottom: 4px;
    width: 100%;
  }

  .wm-portfolio .widget-icon {
    font-size: 14px;
  }

  .wm-portfolio .widget-title {
    font-size: 10px;
    font-weight: 700;
    color: #5c5c64;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  /* Widget Local SEO */
  .wm-portfolio .local-seo-ranking {
    display: flex;
    align-items: center;
    gap: 8px;
    margin: 4px 0;
  }

  .wm-portfolio .ranking-badge {
    background: #e85500;
    color: #ffffff;
    font-size: 11px;
    font-weight: 800;
    padding: 4px 8px;
    border-radius: 6px;
    box-shadow: 0 0 10px rgba(232, 85, 0, 0.3);
  }

  .wm-portfolio .ranking-term {
    font-size: 12px;
    font-weight: 700;
    color: #000000;
    font-style: italic;
  }

  .wm-portfolio .local-seo-stats {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 10.5px;
    width: 100%;
  }

  .wm-portfolio .stats-stars {
    color: #fbbf24;
    font-weight: 700;
  }

  .wm-portfolio .stats-reviews {
    color: var(--text-dim);
  }

  /* Widget Traffic SEO */
  .wm-portfolio .traffic-seo-grow {
    display: flex;
    align-items: baseline;
    gap: 4px;
    margin: 2px 0;
  }

  .wm-portfolio .grow-value {
    font-size: 24px;
    font-weight: 800;
    color: #0fac71;
    text-shadow: 0 0 15px rgba(15, 172, 113, 0.1);
  }

  .wm-portfolio .grow-lbl {
    font-size: 9px;
    color: var(--text-dim);
    font-weight: 600;
  }

  .wm-portfolio .traffic-seo-keywords {
    display: flex;
    gap: 6px;
    width: 100%;
  }

  .wm-portfolio .kw-tag {
    font-size: 9px;
    background: rgba(15, 172, 113, 0.08);
    border: 1px solid rgba(15, 172, 113, 0.15);
    border-radius: 6px;
    padding: 3px 6px;
    color: #0fac71;
    font-weight: 600;
  }

  /* Widget Technical SEO */
  .wm-portfolio .speed-radial {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 4px 0;
  }

  .wm-portfolio .speed-radial-inner {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    border: 3.5px solid #0fac71;
    box-shadow: 0 0 10px rgba(15, 172, 113, 0.1);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: rgba(15, 172, 113, 0.02);
  }

  .wm-portfolio .speed-number {
    font-size: 16px;
    font-weight: 800;
    color: #0fac71;
  }

  .wm-portfolio .speed-label {
    font-size: 7.5px;
    font-weight: 600;
    color: var(--text-dim);
    text-transform: uppercase;
  }

  .wm-portfolio .technical-checklist {
    display: flex;
    justify-content: space-between;
    font-size: 9.5px;
    color: var(--text-dim);
    font-weight: 600;
    width: 100%;
  }

  .wm-portfolio .chk-item {
    color: #0fac71;
  }
        ` }} />
        
        <div dangerouslySetInnerHTML={{ __html: `
          <!-- Import de la police Inter (sécurité si non présent dans le parent) -->




<section class="wm-portfolio" id="portfolio" aria-label="Portfolio">

  <div class="portfolio-header">
    <div class="portfolio-badge">
      <span class="portfolio-badge-icon">✦</span> Réalisations Réelles
    </div>
    <h1 className="portfolio-title">
      Des résultats concrets pour<br>
      <span class="highlight">propulser votre marque</span>
    </h1>
    <p class="portfolio-subtitle">
      Explorez les véritables sites vitrines et e-commerce que j'ai conçus et référencés. Une expertise Web & SEO
      sur-mesure au service de la réussite de mes clients.
    </p>
  </div>

  <!-- Filtres de Catégories (Strictement Web & SEO) -->
  <div class="portfolio-filters" role="tablist" aria-label="Catégories du portfolio">
    <button class="portfolio-filter-btn active" data-filter="all" role="tab" aria-selected="true">Tous</button>
    <button class="portfolio-filter-btn" data-filter="web" role="tab" aria-selected="false">Création Web</button>
    <button class="portfolio-filter-btn" data-filter="seo" role="tab" aria-selected="false">Référencement SEO</button>
  </div>

  <div class="portfolio-grid">

    <!-- Projet 1 : webmodernseo.co (Web uniquement) -->
    <article class="portfolio-card web">
      <div class="portfolio-card-visual">
        <img src="/images/portfolio/Capture-decran-2026-06-16-163553.png"
          alt="Création de site vitrine et référencement naturel d'élite - webmodernseo.co" width="600" height="380"
          class="portfolio-card-img" loading="lazy">
      </div>

      <span class="project-tag">Création Web & SEO</span>
      <h3>webmodernseo.co</h3>
      <p>Mon propre site vitrine d'élite. Une vitrine technologique illustrant mes compétences en développement
        ultra-rapide (sans layout shifts) et en **référencement naturel d'élite**.</p>

      <a href="https://webmodernseo.co" target="_blank" rel="noopener noreferrer" class="visit-link">
        Visiter le site <span class="link-arrow">→</span>
      </a>
    </article>

    <!-- Projet 2 : digiproo.com (Web uniquement) -->
    <article class="portfolio-card web">
      <div class="portfolio-card-visual">
        <img src="/images/portfolio/Capture-decran-2026-04-14-120629.png"
          alt="Plateforme de services digitaux modernes et ergonomiques - digiproo.com" width="600" height="380"
          class="portfolio-card-img" loading="lazy">
      </div>

      <span class="project-tag">Création Web</span>
      <h3>digiproo.com</h3>
      <p>Conception d'une plateforme de services digitaux moderne et adaptative. Un design épuré, pensé pour
        l'**ergonomie de conversion** et une vitesse de chargement instantanée.</p>

      <a href="https://digiproo.com" target="_blank" rel="noopener noreferrer" class="visit-link">
        Visiter le site <span class="link-arrow">→</span>
      </a>
    </article>

    <!-- Projet 3 : shammah.eu (Web uniquement) -->
    <article class="portfolio-card web">
      <div class="portfolio-card-visual">
        <img src="/images/portfolio/Capture-decran-2026-04-14-120331.png"
          alt="Plateforme logistique d'achats Europe-Afrique et livraison - shammah.eu" width="600" height="380"
          class="portfolio-card-img" loading="lazy">
      </div>

      <span class="project-tag">Création Web / Logistique</span>
      <h3>shammah.eu</h3>
      <p>Plateforme logistique permettant aux clients en Afrique d'**effectuer des achats sur des e-shops en Europe** et
        de se faire livrer directement et de façon sécurisée.</p>

      <a href="https://shammah.eu" target="_blank" rel="noopener noreferrer" class="visit-link">
        Visiter le site <span class="link-arrow">→</span>
      </a>
    </article>

    <!-- Projet 4 : sinaihappycare.com (Web uniquement) -->
    <article class="portfolio-card web">
      <div class="portfolio-card-visual">
        <img src="/images/portfolio/Sinaihappycare-sinaihappycare.com_.png"
          alt="Site vitrine professionnel de soins et santé à domicile - sinaihappycare.com" width="600" height="380"
          class="portfolio-card-img" loading="lazy">
      </div>

      <span class="project-tag">Création Web & SEO</span>
      <h3>sinaihappycare.com</h3>
      <p>Site vitrine professionnel de services de soins et santé à domicile. Une interface réconfortante couplée à une
        stratégie d'acquisition et de **visibilité SEO local**.</p>

      <a href="https://sinaihappycare.com" target="_blank" rel="noopener noreferrer" class="visit-link">
        Visiter le site <span class="link-arrow">→</span>
      </a>
    </article>

    <!-- Projet 5 : epbomi-europe.org (Web uniquement) -->
    <article class="portfolio-card web">
      <div class="portfolio-card-visual">
        <img src="/images/portfolio/FireShot-Capture-008-Accueil-Epbomi-Europe-epbomi-europe.org-1.png"
          alt="Portail de la branche européenne de l'église EPBOMI - epbomi-europe.org" width="600" height="380"
          class="portfolio-card-img" loading="lazy">
      </div>

      <span class="project-tag">Création Web</span>
      <h3>epbomi-europe.org</h3>
      <p>Portail officiel et hub communautaire représentant la **branche européenne de l'église EPBOMI** (basée en Côte
        d'Ivoire). Un espace d'information moderne, performant et fluide.</p>

      <a href="https://epbomi-europe.org" target="_blank" rel="noopener noreferrer" class="visit-link">
        Visiter le site <span class="link-arrow">→</span>
      </a>
    </article>

    <!-- Projet 6 : opticafe.fr (Web uniquement) -->
    <article class="portfolio-card web">
      <div class="portfolio-card-visual">
        <img src="/images/portfolio/he75ojuxofe.jpg" alt="Concept store de café et centre optique - opticafe.fr" width="600"
          height="380" class="portfolio-card-img" loading="lazy">
      </div>

      <span class="project-tag">Création Web & SEO</span>
      <h3>opticafe.fr</h3>
      <p>Concept store innovant alliant optique et détente. Site d'un **espace café chaleureux intégré au sein d'un
        centre optique**, optimisé avec une solide stratégie de **référencement local**.</p>

      <a href="https://opticafe.fr" target="_blank" rel="noopener noreferrer" class="visit-link">
        Visiter le site <span class="link-arrow">→</span>
      </a>
    </article>

    <!-- Projet 7 : emypaul.opticafe.fr (Web uniquement) -->
    <article class="portfolio-card web">
      <div class="portfolio-card-visual">
        <img src="/images/portfolio/Accueil-emypaul.opticafe.fr-emypaul.opticafe.fr_.png"
          alt="Centre optique examens de vue et lunettes de créateur - emypaul.opticafe.fr" width="600" height="380"
          class="portfolio-card-img" loading="lazy">
      </div>

      <span class="project-tag">Création Web / Centre Optique</span>
      <h3>emypaul.opticafe.fr</h3>
      <p>La vitrine digitale de la même enseigne, **spécifiquement centrée sur le centre optique**. Présentation
        complète des services d'optométrie, examens de vue et collections exclusives.</p>

      <a href="https://emypaul.opticafe.fr" target="_blank" rel="noopener noreferrer" class="visit-link">
        Visiter le site <span class="link-arrow">→</span>
      </a>
    </article>

    <!-- =============================================
         3 CARTES EXCLUSIVES RÉFÉRENCEMENT SEO (Pur CSS Animé)
         ============================================= -->

    <!-- Projet 8 (SEO) : Domination Locale -->
    <article class="portfolio-card seo">
      <div class="portfolio-card-visual seo-visual-local">
        <div class="local-seo-widget">
          <div class="local-seo-header">
            <span class="widget-icon">📍</span>
            <span class="widget-title">Visibilité Locale</span>
          </div>
          <div class="local-seo-ranking">
            <div class="ranking-badge">TOP 3</div>
            <div class="ranking-term">"Commerce & Services"</div>
          </div>
          <div class="local-seo-stats">
            <span class="stats-stars">★★★★★</span>
            <span class="stats-reviews">120+ avis clients</span>
          </div>
        </div>
      </div>

      <span class="project-tag">SEO Local & GBP</span>
      <h3>Domination Local Pack</h3>
      <p>Positionnement stratégique dans le Top 3 Google Maps sur des requêtes locales à fort taux d'intention d'achat.
        Idéal pour attirer des clients qualifiés en boutique physique ou services de proximité.</p>

      <a href="tel:+33753887751" class="visit-link">
        Obtenir mon audit local <span class="link-arrow">→</span>
      </a>
    </article>

    <!-- Projet 9 (SEO) : Netlinking & Acquisition -->
    <article class="portfolio-card seo">
      <div class="portfolio-card-visual seo-visual-traffic">
        <div class="traffic-seo-widget">
          <div class="traffic-seo-header">
            <span class="widget-icon">📈</span>
            <span class="widget-title">Trafic Organique</span>
          </div>
          <div class="traffic-seo-grow">
            <span class="grow-value">+380%</span>
            <span class="grow-lbl">Impressions</span>
          </div>
          <div class="traffic-seo-keywords">
            <span class="kw-tag">"intention d'achat"</span>
            <span class="kw-tag">"mots-clés rentables"</span>
          </div>
        </div>
      </div>

      <span class="project-tag">Netlinking & Acquisition</span>
      <h3>Autorité & Backlinks</h3>
      <p>Campagne d'acquisition de backlinks thématisés à forte autorité de domaine et restructuration de maillage
        interne. Propulse le trafic organique et double les impressions en moins de 6 mois.</p>

      <a href="tel:+33753887751" class="visit-link">
        Demander ma stratégie <span class="link-arrow">→</span>
      </a>
    </article>

    <!-- Projet 10 (SEO) : SEO Technique -->
    <article class="portfolio-card seo">
      <div class="portfolio-card-visual seo-visual-technical">
        <div class="technical-seo-widget">
          <div class="technical-seo-header">
            <span class="widget-icon">⚡</span>
            <span class="widget-title">Vitesse & Code</span>
          </div>
          <div class="speed-radial">
            <div class="speed-radial-inner">
              <span class="speed-number">100</span>
              <span class="speed-label">PageSpeed</span>
            </div>
          </div>
          <div class="technical-checklist">
            <span class="chk-item">✓ CLS = 0.00</span>
            <span class="chk-item">✓ Schema.org</span>
          </div>
        </div>
      </div>

      <span class="project-tag">SEO Technique & Vitesse</span>
      <h3>Optimisation Core Web Vitals</h3>
      <p>Structure de code ultra-propre, sans décalage de mise en page (CLS = 0) et indexation instantanée des pages. Le
        socle technique ultime pour pérenniser vos positions durables sur les moteurs.</p>

      <a href="tel:+33753887751" class="visit-link">
        Analyser mon code <span class="link-arrow">→</span>
      </a>
    </article>

  </div>

  <!-- =============================================
       SECTION METHODOLOGIE SEO / OPTIMISATION
       ============================================= -->
  <div class="portfolio-seo-section">

    <div class="seo-header">
      <div class="portfolio-badge">
        <span class="portfolio-badge-icon">✦</span> Méthodologie SEO d'Élite
      </div>
      <h3 class="seo-section-title">
        Comment j'améliore la <span class="highlight-green">visibilité Google</span> de mes clients
      </h3>
      <p class="seo-section-subtitle">
        Découvrez les 3 interfaces et étapes stratégiques de mon plan d'action pour propulser vos sites en première page
        de Google.
      </p>
    </div>

    <div class="seo-steps-container">

      <!-- Colonne Gauche : Boutons Interactifs & Détails -->
      <div class="seo-sidebar">
        <div class="seo-tabs-nav" role="tablist" aria-label="Étapes de la méthodologie SEO">

          <button class="seo-tab-btn active" data-step="1" role="tab" aria-selected="true">
            <span class="seo-tab-num">01</span>
            <span>Audit & Recherche Sémantique</span>
          </button>

          <button class="seo-tab-btn" data-step="2" role="tab" aria-selected="false">
            <span class="seo-tab-num">02</span>
            <span>Optimisation On-Page & Code</span>
          </button>

          <button class="seo-tab-btn" data-step="3" role="tab" aria-selected="false">
            <span class="seo-tab-num">03</span>
            <span>Suivi & Croissance Organique</span>
          </button>

        </div>

        <div class="seo-tab-content-wrapper">

          <!-- Contenu Étape 1 -->
          <div class="seo-tab-content active" data-step="1">
            <h4>01. Analyse & Stratégie Sémantique</h4>
            <p>
              Avant d'écrire la moindre ligne de code, j'analyse votre marché et étudie vos concurrents directs.
              L'objectif est d'identifier les mots-clés stratégiques à fort volume de recherche et à faible concurrence
              pour cibler une intention d'achat qualifiée.
            </p>
            <div class="seo-tags-list">
              <span class="seo-tag">Étude de la concurrence</span>
              <span class="seo-tag">Mots-clés longue traîne</span>
              <span class="seo-tag">Intention de recherche</span>
              <span class="seo-tag">Volume & Opportunité</span>
            </div>
          </div>

          <!-- Contenu Étape 2 -->
          <div class="seo-tab-content" data-step="2">
            <h4>02. Optimisation Technique & Structure de Code</h4>
            <p>
              Un excellent contenu ne sert à rien si le site est lent ou mal structuré. J'optimise en profondeur le
              balisage sémantique HTML (H1-H6, microdonnées Schema.org) et améliore drastiquement vos scores Core Web
              Vitals pour une vitesse de chargement instantanée.
            </p>
            <div class="seo-tags-list">
              <span class="seo-tag">Balisage sémantique Hn</span>
              <span class="seo-tag">Vitesse (PageSpeed 100/100)</span>
              <span class="seo-tag">Schema.org Structured Data</span>
              <span class="seo-tag">Maillage interne</span>
            </div>
          </div>

          <!-- Contenu Étape 3 -->
          <div class="seo-tab-content" data-step="3">
            <h4>03. Suivi Search Console & Acquisition Continue</h4>
            <p>
              Le SEO est une discipline continue. Je mets en place un tableau de bord analytique complet reliant la
              Google Search Console et Google Analytics. Je suis quotidiennement l'évolution des clics, impressions, et
              positions moyennes pour affiner et maintenir votre domination.
            </p>
            <div class="seo-tags-list">
              <span class="seo-tag">Google Search Console</span>
              <span class="seo-tag">Suivi de positionnement</span>
              <span class="seo-tag">Analyse du taux de clic (CTR)</span>
              <span class="seo-tag">Netlinking & Autorité</span>
            </div>
          </div>

        </div>
      </div>

      <!-- Colonne Droite : Interface Mockup Dynamique en Pur CSS -->
      <div class="seo-visual-display">
        <div class="seo-mockup-frame">

          <!-- Barre du navigateur -->
          <div class="mockup-browser-bar">
            <div class="browser-dots">
              <div class="browser-dot"></div>
              <div class="browser-dot"></div>
              <div class="browser-dot"></div>
            </div>
            <div class="browser-address" id="mockup-url">https://webmodernseo.co/seo-audit-semantique</div>
          </div>

          <!-- Écrans interactifs -->
          <div class="mockup-screens">

            <!-- Écran 1 : Audit & Recherche Sémantique -->
            <div class="mockup-screen active" data-step="1">
              <div class="mockup-audit-grid">

                <div class="audit-card span-2">
                  <span class="audit-card-title">Mots-clés ciblés & Intentions d'achat</span>
                  <div class="audit-table">
                    <div class="audit-table-row">
                      <span class="audit-keyword">centre optique paris</span>
                      <span class="audit-kd-badge">Faible KD%</span>
                      <span class="audit-search-vol">2 400 rech/mois</span>
                    </div>
                    <div class="audit-table-row">
                      <span class="audit-keyword">soins à domicile lyon</span>
                      <span class="audit-kd-badge">Moyen KD%</span>
                      <span class="audit-search-vol">1 800 rech/mois</span>
                    </div>
                    <div class="audit-table-row">
                      <span class="audit-keyword">achat livraison afrique</span>
                      <span class="audit-kd-badge">Très faible KD%</span>
                      <span class="audit-search-vol">950 rech/mois</span>
                    </div>
                  </div>
                </div>

                <div class="audit-card">
                  <span class="audit-card-title">Volume d'opportunité</span>
                  <span class="audit-score-num">8.2k</span>
                  <div class="audit-volume-bar">
                    <div class="audit-volume-fill" style="width: 78%"></div>
                  </div>
                </div>

                <div class="audit-card">
                  <span class="audit-card-title">Difficulté SEO Moyenne</span>
                  <span class="audit-score-num" style="color: #ef4444;">18%</span>
                  <div class="audit-volume-bar">
                    <div class="audit-volume-fill" style="width: 18%; background: #ef4444;"></div>
                  </div>
                </div>

              </div>
            </div>

            <!-- Écran 2 : Optimisation On-Page & Performance -->
            <div class="mockup-screen" data-step="2">
              <div class="mockup-speed-scores">

                <div class="speed-gauge-wrap">
                  <div class="speed-gauge" style="--score-pct: 100%"><span class="speed-gauge-value">100</span></div>
                  <span class="speed-gauge-lbl">Performance</span>
                </div>

                <div class="speed-gauge-wrap">
                  <div class="speed-gauge" style="--score-pct: 98%"><span class="speed-gauge-value">98</span></div>
                  <span class="speed-gauge-lbl">Accessibilité</span>
                </div>

                <div class="speed-gauge-wrap">
                  <div class="speed-gauge" style="--score-pct: 100%"><span class="speed-gauge-value">100</span></div>
                  <span class="speed-gauge-lbl">SEO d'Élite</span>
                </div>

              </div>

              <div class="speed-metrics-list">
                <div class="speed-metric-item">
                  <span class="metric-name">Largest Contentful Paint</span>
                  <span class="metric-val-green">0.7s</span>
                </div>
                <div class="speed-metric-item">
                  <span class="metric-name">First Input Delay</span>
                  <span class="metric-val-green">10ms</span>
                </div>
                <div class="speed-metric-item">
                  <span class="metric-name">Cumulative Layout Shift</span>
                  <span class="metric-val-green">0.00</span>
                </div>
                <div class="speed-metric-item">
                  <span class="metric-name">HTML tags & Schema.org</span>
                  <span class="metric-val-green">Valide</span>
                </div>
              </div>
            </div>

            <!-- Écran 3 : Monitoring de Performance -->
            <div class="mockup-screen" data-step="3">

              <div class="mockup-gsc-stats">
                <div class="gsc-stat-card">
                  <span class="gsc-stat-title">Clics Organiques</span>
                  <span class="gsc-stat-val">12.4k <span class="gsc-stat-trend">▲ 340%</span></span>
                </div>
                <div class="gsc-stat-card">
                  <span class="gsc-stat-title">Taux de clic (CTR)</span>
                  <span class="gsc-stat-val">8.4% <span class="gsc-stat-trend">▲ 24%</span></span>
                </div>
                <div class="gsc-stat-card">
                  <span class="gsc-stat-title">Pos. Moyenne</span>
                  <span class="gsc-stat-val" style="color: #10b981;">2.1 <span class="gsc-stat-trend">▲
                      1.4</span></span>
                </div>
              </div>

              <div class="gsc-chart-wrap">
                <!-- SVG Gradient Definition -->
                <svg class="gsc-chart-svg" viewBox="0 0 450 70">
                  <defs>
                    <linearGradient id="gsc-glow-grad" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stop-color="#10b981" stop-opacity="0.2" />
                      <stop offset="50%" stop-color="#10b981" stop-opacity="0.6" />
                      <stop offset="100%" stop-color="#10b981" stop-opacity="1" />
                    </linearGradient>
                    <linearGradient id="gsc-area-grad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stop-color="#10b981" stop-opacity="0.4" />
                      <stop offset="100%" stop-color="#10b981" stop-opacity="0.0" />
                    </linearGradient>
                  </defs>

                  <!-- Area under line -->
                  <path class="chart-area"
                    d="M 0 65 L 0 55 Q 60 50 90 40 T 180 32 T 270 18 T 360 10 T 450 2 L 450 65 Z" />

                  <!-- Main neon line -->
                  <path class="chart-line" d="M 0 55 Q 60 50 90 40 T 180 32 T 270 18 T 360 10 T 450 2" />
                </svg>

                <div class="chart-labels">
                  <span>Janvier</span>
                  <span>Mars</span>
                  <span>Mai (Aujourd'hui)</span>
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>

    </div>
  </div>

</section>



<!-- Structured Data (JSON-LD) for SEO d'Élite -->

        ` }} />
      </main>
      
      <FooterPublic />
    </div>
  );
}
