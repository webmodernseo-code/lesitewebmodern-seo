'use client';

import React, { useEffect } from 'react';
import { HeaderPublic } from '@/components/public/HeaderPublic';
import { FooterPublic } from '@/components/public/FooterPublic';

export default function Page() {
  useEffect(() => {
    try {
      (function() {
    const slider = document.getElementById('speed-slider') as HTMLInputElement | null;
    const bounceVal = document.getElementById('bounce-val');
    const lossVal = document.getElementById('loss-val');
    const progressIndicator = document.getElementById('progress-indicator');
    const verdictText = document.getElementById('verdict-text');

    if (!slider || !bounceVal || !lossVal || !progressIndicator || !verdictText) return;

    // Réassignations narrowées : conservent le type non-nullable dans la closure ci-dessous.
    const sliderEl = slider;
    const bounceValEl = bounceVal;
    const lossValEl = lossVal;
    const progressIndicatorEl = progressIndicator;
    const verdictTextEl = verdictText;

    function updateSimulation(speed: number) {
      let bounce = 0;
      let loss = 0;
      let text = '';
      let isPerfect = false;

      // Calculs d'impact sémantique basés sur les statistiques réelles
      if (speed <= 1.0) {
        bounce = 9;
        loss = 0;
        text = 'Temps idéal (Vitesse MONE). Expérience utilisateur optimale, aucune opportunité perdue.';
        isPerfect = true;
      } else if (speed <= 2.0) {
        bounce = 22;
        loss = 15;
        text = `Chargement à ${speed.toFixed(1)}s : Légère latence. Environ 15% de vos clients potentiels se désintéressent.`;
      } else if (speed <= 3.0) {
        bounce = 45;
        loss = 38;
        text = `Chargement à ${speed.toFixed(1)}s : Vitesse critique. Plus d'un tiers des internautes quittent immédiatement votre site.`;
      } else if (speed <= 4.5) {
        bounce = 74;
        loss = 60;
        text = `Chargement à ${speed.toFixed(1)}s : Frustration élevée. 60% de pertes sèches enregistrées sur vos ventes.`;
      } else {
        bounce = 92;
        loss = 88;
        text = `Chargement à ${speed.toFixed(1)}s : Lenteur critique. Votre site est inexploitable et pénalisé par Google.`;
      }

      // Mises à jour des valeurs textuelles
      if (isPerfect) {
        bounceValEl.textContent = bounce + '%';
        bounceValEl.style.color = 'var(--primary-green)';
        lossValEl.textContent = '0%';
        lossValEl.style.color = 'var(--primary-green)';
        lossValEl.className = 'wm-sim-metric-val green-ok';
        bounceValEl.className = 'wm-sim-metric-val green-ok';
      } else {
        bounceValEl.textContent = bounce + '%';
        bounceValEl.style.color = '';
        lossValEl.textContent = '-' + loss + '%';
        lossValEl.style.color = '';
        lossValEl.className = 'wm-sim-metric-val';
        bounceValEl.className = 'wm-sim-metric-val';
      }

      // Mise à jour de la jauge visuelle
      progressIndicatorEl.style.width = loss + '%';
      if (isPerfect) {
        progressIndicatorEl.style.background = 'var(--primary-green)';
      } else if (loss < 40) {
        progressIndicatorEl.style.background = '#f59e0b'; // Amber
      } else {
        progressIndicatorEl.style.background = ''; // Red gradient par défaut
      }

      // Mise à jour du verdict textuel
      verdictTextEl.textContent = text;
    }

    // Initialisation
    updateSimulation(parseFloat(sliderEl.value));

    // Détecteurs d'événements (Input pour fluidité temps réel)
    sliderEl.addEventListener('input', function() {
      updateSimulation(parseFloat(this.value));
    });
  })();
    } catch (e) {
      console.error("Error in services/creation-web page script:", e);
    }
  }, []);

  return (
    <div className="relative min-h-screen bg-white text-black overflow-x-hidden font-sans">
      <HeaderPublic />
      
      <main className="w-full pt-24 pb-16">
        <style dangerouslySetInnerHTML={{ __html: `
          /* --- ISOLATION TOTALE DU CSS SERVICE CREATION WEB POUR WORDPRESS --- */
  .wm-service-page {
    --primary-orange:       #ff4d00;
    --primary-orange-light: #ff7e47;
    --primary-green:        #0FAC71;
    --primary-green-light:  #33db88;
    --bg:                   linear-gradient(180deg, #fdfbf7 0%, #faf6ee 100%);
    --card-bg:              rgba(255, 255, 255, 0.75);
    --card-border:          rgba(15, 15, 17, 0.06);
    --text:                 #000000;
    --text-dim:             #5c5c64;
    --glass-glow:           0 20px 45px -10px rgba(15, 15, 17, 0.03), 0 1px 3px rgba(15, 15, 17, 0.01);

    /* Variables isolées pour le CTA (design identique à cta.html) */
    --wms-cta-bg:             linear-gradient(135deg, #faf5eb 0%, #fefcf9 50%, #faf5eb 100%);
    --wms-cta-text-primary:   #000000;
    --wms-cta-text-secondary: #5c5c64;
    --wms-cta-orange:         #ff4d00;
    --wms-cta-orange-light:   #ff7e47;
    --wms-cta-black:          #000000;
    --wms-cta-border:         rgba(15, 15, 17, 0.06);
    --wms-cta-transition:     0.25s cubic-bezier(0.16, 1, 0.3, 1);

    background: var(--bg);
    color: var(--text);
    padding: 100px 24px;
    min-height: 100vh;
    position: relative;
    overflow: hidden;
    width: 100%;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-top: 1px solid rgba(15, 15, 17, 0.08) !important;
    border-bottom: 1px solid rgba(15, 15, 17, 0.08) !important;
  }

  /* Force la police Inter + reset isolation WordPress */
  .wm-service-page *,
  .wm-service-page *::before,
  .wm-service-page *::after {
    box-sizing: border-box;
    font-family: 'Inter', sans-serif !important;
  }

  /* Lueur d'ambiance orange (haut droite) */
  .wm-service-page::before {
    content: '';
    position: absolute;
    top: -5%;
    right: -5%;
    width: 700px;
    height: 700px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(224, 83, 0, 0.04) 0%, transparent 70%);
    filter: blur(100px);
    pointer-events: none;
    z-index: 0;
  }

  /* Lueur d'ambiance verte (milieu gauche) */
  .wm-service-page::after {
    content: '';
    position: absolute;
    top: 35%;
    left: -15%;
    width: 700px;
    height: 700px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(15, 172, 113, 0.03) 0%, transparent 70%);
    filter: blur(100px);
    pointer-events: none;
    z-index: 0;
  }

  /* Lueur supplémentaire jaune chaleureuse */
  .wm-glow-accent {
    position: absolute;
    bottom: 15%;
    right: -10%;
    width: 500px;
    height: 500px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(255, 193, 7, 0.02) 0%, transparent 65%);
    filter: blur(80px);
    pointer-events: none;
    z-index: 0;
  }

  /* ── CONTENEUR PRINCIPAL ── */
  .wm-service-container {
    max-width: 1240px;
    width: 100%;
    margin: 0 auto;
    position: relative;
    z-index: 2;
  }

  /* ── BADGE SUPERIEUR ── */
  .wm-service-badge {
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
    box-shadow: 0 4px 12px rgba(15, 15, 17, 0.03);
  }

  .wm-service-badge-dot {
    width: 6px;
    height: 6px;
    background: var(--primary-orange);
    border-radius: 50%;
    box-shadow: 0 0 8px var(--primary-orange);
  }

  /* ── ENTÊTE HERO ── */
  .wm-service-header {
    text-align: center;
    margin-bottom: 80px;
  }

  .wm-service-title {
    font-size: clamp(32px, 5.5vw, 54px);
    font-weight: 800;
    line-height: 1.12;
    letter-spacing: -0.03em;
    color: var(--text) !important;
    max-width: 950px;
    margin: 0 auto 24px;
  }

  .wm-service-title span.fancy-underline {
    position: relative;
    display: inline-block;
    white-space: nowrap;
  }

  .wm-service-title span.fancy-underline::after {
    content: '';
    position: absolute;
    left: -4%;
    bottom: -8px;
    width: 108%;
    height: 12px;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 12' preserveAspectRatio='none'%3E%3Cpath d='M1,4 C30,1 60,1 99,4 M3,8 C33,5 63,5 97,8' fill='none' stroke='%23E05300' stroke-width='2.8' stroke-linecap='round'/%3E%3C/svg%3E");
    background-size: 100% 100%;
    background-repeat: no-repeat;
  }

  .wm-service-subtitle {
    font-size: clamp(16px, 2.2vw, 20px);
    line-height: 1.6;
    color: var(--text-dim);
    max-width: 820px;
    margin: 0 auto;
    font-weight: 500;
  }

  /* ── SECTIONS DE PRESTATION (COMPORTEMENT SPLIT) ── */
  .wm-assets-section {
    display: grid;
    grid-template-columns: 1fr;
    gap: 48px;
    margin-bottom: 64px;
    align-items: center;
  }

  @media (min-width: 992px) {
    .wm-assets-section {
      grid-template-columns: 1.15fr 1fr;
      gap: 72px;
    }
  }

  .wm-assets-content {
    display: flex;
    flex-direction: column;
  }

  .wm-assets-headline {
    font-size: clamp(26px, 3.8vw, 36px);
    font-weight: 800;
    line-height: 1.2;
    letter-spacing: -0.02em;
    color: var(--text);
    margin: 0 0 20px 0;
  }

  .wm-assets-headline span {
    color: var(--primary-orange);
  }

  .wm-assets-text {
    font-size: 16px;
    line-height: 1.68;
    color: var(--text-dim);
    margin: 0 0 24px 0;
  }

  .wm-assets-quote {
    border-left: 4px solid var(--primary-orange);
    padding: 6px 0 6px 20px;
    margin: 28px 0;
    font-style: italic;
    color: var(--text);
    font-size: 17px;
    line-height: 1.6;
    font-weight: 500;
  }

  /* Colonne Image Showcase premium */
  .wm-assets-image-column {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    width: 100%;
  }

  .wm-assets-image-wrapper {
    position: relative;
    width: 100%;
    max-width: 500px;
    border-radius: 28px;
    background: #ffffff;
    padding: 10px;
    border: 1px solid var(--card-border);
    box-shadow: 0 30px 60px -15px rgba(15, 15, 17, 0.05);
    transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .wm-assets-image-wrapper::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 28px;
    padding: 1.5px;
    background: linear-gradient(135deg, rgba(224, 83, 0, 0.2) 0%, transparent 50%, rgba(15, 172, 113, 0.15) 100%);
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    pointer-events: none;
  }

  .wm-assets-image-wrapper:hover {
    transform: translateY(-4px) scale(1.01) rotate(0.5deg);
  }

  .wm-assets-img {
    width: 100%;
    height: auto;
    aspect-ratio: 4/3;
    object-fit: cover;
    border-radius: 20px;
    display: block;
    border: 1px solid rgba(15, 15, 17, 0.03);
  }

  /* Points de déco d'arrière-plan */
  .wm-assets-image-deco {
    position: absolute;
    bottom: -20px;
    left: -20px;
    width: 96px;
    height: 96px;
    background-image: radial-gradient(var(--primary-orange) 2px, transparent 2px);
    background-size: 14px 14px;
    opacity: 0.2;
    z-index: -1;
    pointer-events: none;
  }

  .wm-assets-image-badge {
    position: absolute;
    top: 24px;
    right: 24px;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(8px);
    border: 1px solid rgba(15, 15, 17, 0.05);
    padding: 8px 16px;
    border-radius: 999px;
    font-size: 12px;
    font-weight: 700;
    color: var(--primary-green);
    box-shadow: 0 10px 25px -5px rgba(15, 15, 17, 0.08);
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .wm-assets-image-badge-dot {
    width: 6px;
    height: 6px;
    background: var(--primary-green);
    border-radius: 50%;
    box-shadow: 0 0 8px var(--primary-green);
    animation: wmPulseDot 2s infinite;
  }

  /* ── WIDGET INTERACTIF : SIMULATEUR DE PERTE DE CLIENTS (WOW EFFECT) ── */
  .wm-simulator-card {
    background: var(--card-bg);
    border: 1px solid var(--card-border);
    backdrop-filter: blur(16px);
    border-radius: 28px;
    padding: 36px;
    box-shadow: var(--glass-glow);
    margin-bottom: 80px;
    width: 100%;
    position: relative;
    border-top: 1px solid rgba(255, 255, 255, 0.6);
  }

  .wm-simulator-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 36px;
    align-items: center;
  }

  @media (min-width: 992px) {
    .wm-simulator-grid {
      grid-template-columns: 1.1fr 1fr;
      gap: 60px;
    }
  }

  .wm-sim-left h3 {
    font-size: 24px;
    font-weight: 800;
    margin: 0 0 12px 0;
    letter-spacing: -0.01em;
  }

  .wm-sim-left h3 span {
    color: var(--primary-orange);
  }

  .wm-sim-desc {
    font-size: 14.5px;
    color: var(--text-dim);
    line-height: 1.55;
    margin: 0 0 28px 0;
  }

  /* Le curseur custom */
  .wm-slider-container {
    margin: 20px 0;
  }

  .wm-slider-labels {
    display: flex;
    justify-content: space-between;
    font-size: 12px;
    font-weight: 700;
    color: var(--text-dim);
    margin-bottom: 8px;
  }

  .wm-range-slider {
    -webkit-appearance: none;
    appearance: none;
    width: 100%;
    height: 8px;
    border-radius: 999px;
    background: rgba(15, 15, 17, 0.06);
    outline: none;
    margin: 0;
    transition: background 0.3s;
  }

  .wm-range-slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: var(--primary-orange);
    cursor: pointer;
    box-shadow: 0 0 0 4px rgba(224, 83, 0, 0.15), 0 4px 10px rgba(15, 15, 17, 0.1);
    transition: transform 0.2s, background-color 0.2s;
  }

  .wm-range-slider::-webkit-slider-thumb:hover {
    transform: scale(1.1);
    background: var(--primary-orange-light);
  }

  /* Affichage des métriques dynamiques */
  .wm-sim-right {
    background: #ffffff;
    border: 1px solid rgba(15, 15, 17, 0.04);
    border-radius: 20px;
    padding: 28px;
    box-shadow: inset 0 2px 8px rgba(15, 15, 17, 0.01);
  }

  .wm-sim-stats-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
    margin-bottom: 24px;
  }

  .wm-sim-metric {
    border-bottom: 1px solid rgba(15, 15, 17, 0.04);
    padding-bottom: 12px;
  }

  .wm-sim-metric-val {
    font-size: 28px;
    font-weight: 800;
    color: #e11d48; /* Red for loss */
    line-height: 1.1;
    margin-bottom: 4px;
    transition: color 0.3s ease;
  }

  .wm-sim-metric-val.green-ok {
    color: var(--primary-green);
  }

  .wm-sim-metric-lbl {
    font-size: 12px;
    font-weight: 700;
    color: var(--text-dim);
  }

  /* Barre de progression visuelle */
  .wm-progress-track {
    width: 100%;
    height: 12px;
    background: rgba(15, 15, 17, 0.04);
    border-radius: 999px;
    overflow: hidden;
    margin-bottom: 24px;
    position: relative;
  }

  .wm-progress-bar {
    height: 100%;
    width: 50%;
    background: linear-gradient(90deg, #fb7185 0%, #e11d48 100%);
    border-radius: 999px;
    transition: width 0.3s cubic-bezier(0.16, 1, 0.3, 1), background 0.3s;
  }

  .wm-sim-verdict {
    font-size: 13.5px;
    line-height: 1.5;
    font-weight: 600;
    color: var(--text);
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .wm-sim-verdict svg {
    color: var(--primary-orange);
    flex-shrink: 0;
  }

  /* ── SECTION DES STATISTIQUES (DESIGN PREMIUM) ── */
  .wm-assets-stats {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 24px;
    margin-bottom: 96px;
    width: 100%;
  }

  @media (min-width: 992px) {
    .wm-assets-stats {
      grid-template-columns: repeat(4, 1fr);
    }
  }

  .wm-stat-card {
    background: #ffffff;
    border: 1px solid var(--card-border);
    border-radius: 24px;
    padding: 32px 24px;
    box-shadow: 0 10px 25px -10px rgba(15, 15, 17, 0.02);
    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  .wm-stat-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 20px 40px -15px rgba(15, 15, 17, 0.05);
    border-color: rgba(224, 83, 0, 0.15);
  }

  /* Icônes custom pour stats */
  .wm-stat-icon-wrapper {
    width: 44px;
    height: 44px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
    font-size: 18px;
    box-shadow: 0 4px 10px rgba(15, 15, 17, 0.01);
  }

  .wm-stat-icon-orange {
    background: rgba(224, 83, 0, 0.06);
    color: var(--primary-orange);
  }

  .wm-stat-icon-green {
    background: rgba(15, 172, 113, 0.06);
    color: var(--primary-green);
  }

  .wm-stat-number {
    font-size: 38px;
    font-weight: 800;
    color: var(--text);
    line-height: 1;
    margin-bottom: 12px;
    letter-spacing: -0.02em;
  }

  .wm-stat-label {
    font-size: 13.5px;
    color: var(--text-dim);
    line-height: 1.5;
    font-weight: 500;
  }

  /* ── SECTION ACCOMPAGNEMENT (DESIGN TIMELINE WORKFLOW) ── */
  .wm-accompagnement-section {
    background: #ffffff;
    border: 1px solid var(--card-border);
    border-radius: 36px;
    padding: 64px 48px;
    margin-bottom: 96px;
    box-shadow: 0 25px 50px -20px rgba(15, 15, 17, 0.03);
    border-top: 1px solid rgba(255, 255, 255, 0.8);
  }

  .wm-accomp-title {
    text-align: center;
    font-size: clamp(26px, 3.8vw, 36px);
    font-weight: 800;
    margin-bottom: 12px;
    letter-spacing: -0.02em;
  }

  .wm-accomp-subtitle {
    text-align: center;
    font-size: 16px;
    color: var(--text-dim);
    max-width: 600px;
    margin: 0 auto 56px auto;
  }

  .wm-accomp-title span {
    color: var(--primary-green);
  }

  .wm-accomp-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 32px;
  }

  @media (min-width: 992px) {
    .wm-accomp-grid {
      grid-template-columns: repeat(3, 1fr);
      gap: 40px;
    }
  }

  .wm-accomp-card {
    display: flex;
    flex-direction: column;
    padding: 24px;
    border-radius: 24px;
    transition: all 0.3s ease;
    border: 1px solid transparent;
    position: relative;
  }

  .wm-accomp-card:hover {
    background: rgba(15, 15, 17, 0.01);
    border-color: rgba(15, 15, 17, 0.03);
    transform: translateY(-4px);
  }

  /* Ligne de connexion imaginaire en CSS sur Desktop */
  @media (min-width: 992px) {
    .wm-accomp-card:not(:last-child)::after {
      content: '→';
      position: absolute;
      right: -24px;
      top: 48px;
      font-size: 24px;
      color: rgba(15, 15, 17, 0.1);
      font-weight: 300;
    }
  }

  .wm-accomp-icon-box {
    width: 58px;
    height: 58px;
    border-radius: 18px;
    background: rgba(15, 172, 113, 0.07);
    color: var(--primary-green);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 24px;
    font-size: 24px;
    box-shadow: 0 8px 16px rgba(15, 172, 113, 0.02);
  }

  .wm-accomp-card-orange .wm-accomp-icon-box {
    background: rgba(224, 83, 0, 0.07);
    color: var(--primary-orange);
    box-shadow: 0 8px 16px rgba(224, 83, 0, 0.02);
  }

  .wm-accomp-card-title {
    font-size: 20px;
    font-weight: 700;
    color: var(--text);
    margin: 0 0 12px 0;
  }

  .wm-accomp-card-desc {
    font-size: 14.5px;
    line-height: 1.62;
    color: var(--text-dim);
    margin: 0;
  }

  /* ── SECTION DU CATALOGUE DES SITES CRÉÉS (NEO-CARDS) ── */
  .wm-catalogue-header {
    text-align: center;
    margin-bottom: 56px;
  }

  .wm-catalogue-title {
    font-size: clamp(26px, 3.8vw, 36px);
    font-weight: 800;
    margin-bottom: 16px;
    letter-spacing: -0.02em;
  }

  .wm-catalogue-subtitle {
    font-size: 16.5px;
    color: var(--text-dim);
    max-width: 650px;
    margin: 0 auto;
  }

  .wm-catalogue-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 28px;
    margin-bottom: 96px;
  }

  @media (min-width: 768px) {
    .wm-catalogue-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (min-width: 992px) {
    .wm-catalogue-grid {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  .wm-catalogue-card {
    background: var(--card-bg);
    border: 1px solid var(--card-border);
    backdrop-filter: blur(12px);
    border-radius: 28px;
    padding: 36px;
    display: flex;
    flex-direction: column;
    box-shadow: 0 10px 30px rgba(15, 15, 17, 0.01);
    transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    position: relative;
    overflow: hidden;
    border-top: 1px solid rgba(255, 255, 255, 0.6);
  }

  /* Effet de bordure néon au survol */
  .wm-catalogue-card::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background: transparent;
    transition: background-color 0.3s ease;
  }

  .wm-catalogue-card:hover {
    transform: translateY(-8px) scale(1.01);
    box-shadow: 0 30px 60px -20px rgba(15, 15, 17, 0.06);
    border-color: rgba(15, 15, 17, 0.12);
  }

  .wm-catalogue-card-orange:hover::after { background: var(--primary-orange); }
  .wm-catalogue-card-green:hover::after { background: var(--primary-green); }
  .wm-catalogue-card-purple:hover::after { background: #8b5cf6; }
  .wm-catalogue-card-amber:hover::after { background: #f59e0b; }
  .wm-catalogue-card-blue:hover::after { background: #3b82f6; }
  .wm-catalogue-card-dark:hover::after { background: #1f2937; }

  .wm-catalogue-card-icon {
    width: 50px;
    height: 50px;
    border-radius: 14px;
    background: rgba(15, 15, 17, 0.03);
    color: var(--text);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 24px;
    font-size: 20px;
    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  }

  /* Coloration spécifique des icônes */
  .wm-catalogue-card-orange .wm-catalogue-card-icon { color: var(--primary-orange); background: rgba(224, 83, 0, 0.05); }
  .wm-catalogue-card-green .wm-catalogue-card-icon { color: var(--primary-green); background: rgba(15, 172, 113, 0.05); }
  .wm-catalogue-card-purple .wm-catalogue-card-icon { color: #8b5cf6; background: rgba(139, 92, 246, 0.05); }
  .wm-catalogue-card-amber .wm-catalogue-card-icon { color: #f59e0b; background: rgba(245, 158, 11, 0.05); }
  .wm-catalogue-card-blue .wm-catalogue-card-icon { color: #3b82f6; background: rgba(59, 130, 246, 0.05); }
  .wm-catalogue-card-dark .wm-catalogue-card-icon { color: #4b5563; background: rgba(75, 85, 99, 0.05); }

  .wm-catalogue-card:hover .wm-catalogue-card-icon {
    transform: scale(1.05);
  }
  .wm-catalogue-card-orange:hover .wm-catalogue-card-icon { background: var(--primary-orange); color: #ffffff; }
  .wm-catalogue-card-green:hover .wm-catalogue-card-icon { background: var(--primary-green); color: #ffffff; }
  .wm-catalogue-card-purple:hover .wm-catalogue-card-icon { background: #8b5cf6; color: #ffffff; }
  .wm-catalogue-card-amber:hover .wm-catalogue-card-icon { background: #f59e0b; color: #ffffff; }
  .wm-catalogue-card-blue:hover .wm-catalogue-card-icon { background: #3b82f6; color: #ffffff; }
  .wm-catalogue-card-dark:hover .wm-catalogue-card-icon { background: #1f2937; color: #ffffff; }

  .wm-catalogue-card-title {
    font-size: 19px;
    font-weight: 700;
    color: var(--text);
    margin: 0 0 12px 0;
  }

  .wm-catalogue-card-desc {
    font-size: 14px;
    line-height: 1.6;
    color: var(--text-dim);
    margin: 0 0 24px 0;
    flex-grow: 1;
  }

  .wm-catalogue-features {
    display: flex;
    flex-direction: column;
    gap: 10px;
    border-top: 1px solid rgba(15, 15, 17, 0.05);
    padding-top: 20px;
  }

  .wm-feature-item {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 13px;
    font-weight: 600;
    color: var(--text);
  }

  .wm-feature-item svg {
    color: var(--primary-green);
    flex-shrink: 0;
  }

  /* ── STYLE REPRIS DE CTA.HTML POUR UN RENDU COHÉRENT ── */
  .wms-cta-wrapper {
    max-width: 1400px;
    width: 100%;
    margin: 32px auto 0;
    background: var(--wms-cta-bg);
    border: 1px solid var(--wms-cta-border);
    border-radius: 32px;
    padding: 72px 48px;
    text-align: center;
    box-shadow: 0 15px 35px rgba(15, 15, 17, 0.03), 0 1px 3px rgba(15, 15, 17, 0.01);
    position: relative;
    overflow: hidden;
  }

  .wms-cta-title {
    font-size: clamp(2rem, 4vw, 3rem);
    font-weight: 800;
    color: var(--wms-cta-text-primary);
    line-height: 1.15;
    letter-spacing: -0.03em;
    max-width: 800px;
    margin: 0 auto 16px auto;
  }

  .wms-cta-highlight {
    color: var(--wms-cta-orange) !important;
  }

  .wms-cta-subtitle {
    font-size: clamp(1rem, 1.8vw, 1.15rem);
    line-height: 1.6;
    color: var(--wms-cta-text-secondary);
    max-width: 600px;
    margin: 0 auto 36px auto;
    font-weight: 500;
  }

  .wms-cta-actions {
    display: flex;
    gap: 16px;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
  }

  .wms-cta-btn {
    display: inline-flex;
    align-items: center;
    gap: 12px;
    padding: 10px 24px 10px 10px;
    border-radius: 14px;
    font-size: 1rem;
    font-weight: 600;
    text-decoration: none;
    cursor: pointer;
    transition: all var(--wms-cta-transition);
  }

  .wms-cta-btn-primary {
    background-color: var(--wms-cta-black) !important;
    color: #ffffff !important;
    border: 1px solid var(--wms-cta-black) !important;
    box-shadow: 0 4px 12px rgba(12, 12, 14, 0.08) !important;
  }

  .wms-cta-btn-primary:hover {
    background-color: #1a1a24 !important;
    border-color: #1a1a24 !important;
    transform: translateY(-2px) !important;
    box-shadow: 0 6px 18px rgba(12, 12, 14, 0.15) !important;
  }

  .wms-cta-icon-badge-primary {
    display: inline-flex !important;
    align-items: center !important;
    justify-content: center !important;
    width: 32px !important;
    height: 32px !important;
    border-radius: 10px !important;
    background-color: var(--wms-cta-orange) !important;
    color: #ffffff !important;
    transition: transform var(--wms-cta-transition) !important;
  }

  .wms-cta-btn-primary:hover .wms-cta-icon-badge-primary {
    transform: translateX(2px) !important;
  }

  .wms-cta-btn-secondary {
    background-color: #ffffff !important;
    color: var(--wms-cta-text-primary) !important;
    border: 1.5px solid rgba(15, 15, 17, 0.12) !important;
    box-shadow: 0 2px 4px rgba(15, 15, 17, 0.02) !important;
  }

  .wms-cta-btn-secondary:hover {
    background-color: #fafafa !important;
    border-color: rgba(15, 15, 17, 0.2) !important;
    transform: translateY(-2px) !important;
    box-shadow: 0 4px 12px rgba(15, 15, 17, 0.05) !important;
  }

  .wms-cta-icon-badge-secondary {
    display: inline-flex !important;
    align-items: center !important;
    justify-content: center !important;
    width: 32px !important;
    height: 32px !important;
    border-radius: 10px !important;
    background-color: var(--wms-cta-orange) !important;
    border: none !important;
    color: #ffffff !important;
    transition: transform var(--wms-cta-transition) !important;
  }

  .wms-cta-btn-secondary:hover .wms-cta-icon-badge-secondary {
    transform: scale(1.08) !important;
  }

  /* Animations */
  @keyframes wmPulseDot {
    0% { box-shadow: 0 0 0 0 rgba(15, 172, 113, 0.7); }
    70% { box-shadow: 0 0 0 8px rgba(15, 172, 113, 0); }
    100% { box-shadow: 0 0 0 0 rgba(15, 172, 113, 0); }
  }

  @media (max-width: 768px) {
    .wm-service-page {
      padding: 65px 16px;
    }
    .wm-accompagnement-section {
      padding: 40px 24px;
    }
    .wm-simulator-card {
      padding: 24px;
    }
    .wms-cta-wrapper {
      padding: 50px 24px;
      border-radius: 24px;
    }
    .wms-cta-actions {
      flex-direction: column;
      align-items: center;
      gap: 12px;
      width: 100%;
    }
    .wms-cta-btn {
      width: auto;
      justify-content: center;
      padding: 10px 24px 10px 10px;
    }
  }

  .wm-seo-link {
    color: var(--primary-orange) !important;
    text-decoration: none !important;
    border-bottom: 1.5px solid rgba(224, 83, 0, 0.3) !important;
    transition: all 0.2s ease !important;
    font-weight: 600 !important;
  }
  .wm-seo-link:hover {
    color: var(--primary-orange-light) !important;
    border-bottom-color: var(--primary-orange-light) !important;
  }
  .wm-stat-link {
    text-decoration: none !important;
    color: inherit !important;
    cursor: pointer !important;
  }
  .wm-stat-source {
    font-size: 11px !important;
    color: var(--primary-orange) !important;
    text-decoration: underline !important;
    margin-left: 4px !important;
    display: inline-block !important;
  }
        ` }} />
        
        <div dangerouslySetInnerHTML={{ __html: `
          <!-- 
  ==========================================================================
  CONFIGURATION SEO POUR CETTE PAGE (Next.js Metadata)
  ==========================================================================
  
  ✦ SLUG (Permalien) :
    conception-developpement-web
    
  ✦ TITRE SEO (Title Tag) :
    Création de Site Internet Sur-Mesure & Performant | WebModernSEO
    
  ✦ META DESCRIPTION :
    Besoin d'un site web rapide et unique ? Jean-Prosper MONE conçoit votre site internet sur-mesure (vitrine, e-commerce, SaaS) optimisé pour le SEO avec des performances d'ingénieur. Demandez votre diagnostic !
    
  ✦ MOTS-CLÉS CIBLES (Focus Keywords) :
    création de site internet sur-mesure, développement web performant, conception site Next.js, site internet rapide, agence web
    
  ✦ BALISES DE PARTAGE SOCIAL (Open Graph) :
    - og:title       : Création de Site Internet Sur-Mesure & Performant | WebModernSEO
    - og:description : Découvrez nos solutions de développement d'élite (vitrine, e-commerce, applications web) optimisées pour Google et chargeant instantanément.
    - og:image       : /images/services/c2k8vbhynwm.jpg
  
  ==========================================================================
-->
<!-- Import de la police Inter (sécurité si non présent dans le parent) -->

<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>




<section class="wm-service-page" id="creation-web">
  <div class="wm-glow-accent"></div>
  
  <div class="wm-service-container">
    
    <!-- En-tête Hero -->
    <div class="wm-service-header">
      <div class="wm-service-badge">
        <span class="wm-service-badge-dot"></span> Service Élite
      </div>
      <h1 className="wm-service-title">
        Création de Sites Internet d'Élite <span class="fancy-underline">sur-mesure.</span>
      </h1>
      <p class="wm-service-subtitle">
        Des plateformes robustes conçues avec la rigueur d'un ingénieur, alliant une <a href="/services/referencement-seo" class="wm-seo-link">vitesse blitz</a>, un design unique et une optimisation SEO native.
      </p>
    </div>

    <!-- Section Argumentaire Actif -->
    <div class="wm-assets-section">
      <div class="wm-assets-content">
        <h2 class="wm-assets-headline">
          Votre site web n'est pas une dépense. <span>C'est votre actif le plus rentable.</span>
        </h2>
        <p class="wm-assets-text">
          Contrairement aux réseaux sociaux où vous êtes tributaire des algorithmes, votre site internet vous appartient à 100 %. C'est votre vitrine officielle, ouverte 24 heures sur 24, capable de capter du trafic organique ciblé et de transformer de simples visiteurs en clients fidèles.
        </p>
        <div class="wm-assets-quote">
          « Un mauvais site coûte de l'argent. Un site performant, structuré sur des bases d'ingénierie web solides, en rapporte continuellement. »
        </div>
        <p class="wm-assets-text">
          Ne laissez plus un design obsolète ou des lenteurs techniques freiner vos ventes. Ensemble, avec <a href="/apropos" class="wm-seo-link">Jean-Prosper MONE</a>, nous créons un outil d'acquisition taillé pour l'efficacité.
        </p>
      </div>

      <!-- Colonne Image Showcase premium -->
      <div class="wm-assets-image-column">
        <div class="wm-assets-image-wrapper">
          <img src="/images/services/c2k8vbhynwm.jpg" alt="Création de Site Internet" class="wm-assets-img">
          <div class="wm-assets-image-deco"></div>
          <div class="wm-assets-image-badge">
            <span class="wm-assets-image-badge-dot"></span> Vitesse Blitz < 0.8s
          </div>
        </div>
      </div>
    </div>

    <!-- WIDGET INTERACTIF : CALCULATEUR DE CONVERSION DE SITES LENTS -->
    <div class="wm-simulator-card">
      <div class="wm-simulator-grid">
        <div class="wm-sim-left">
          <h3>Simulateur de <span>Perte d'Audience</span></h3>
          <p class="wm-sim-desc">
            Glissez le curseur ci-dessous pour simuler le temps de chargement actuel de votre site internet et observer directement l'impact sur vos conversions et la perte de vos clients potentiels.
          </p>
          
          <div class="wm-slider-container">
            <div class="wm-slider-labels">
              <span>Ultra-rapide (MONE)</span>
              <span>Lenteur Critique</span>
            </div>
            <input type="range" min="1" max="6" step="0.5" value="4" class="wm-range-slider" id="speed-slider">
          </div>
        </div>
        
        <div class="wm-sim-right">
          <div class="wm-sim-stats-grid">
            <div class="wm-sim-metric">
              <div class="wm-sim-metric-val" id="bounce-val">74%</div>
              <div class="wm-sim-metric-lbl">Taux de Rebond</div>
            </div>
            <div class="wm-sim-metric">
              <div class="wm-sim-metric-val" id="loss-val">-60%</div>
              <div class="wm-sim-metric-lbl">Perte de Clients</div>
            </div>
          </div>
          
          <div class="wm-progress-track">
            <div class="wm-progress-bar" id="progress-indicator"></div>
          </div>
          
          <div class="wm-sim-verdict" id="sim-verdict">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
            <span id="verdict-text">Chargement à 4.0s : Vos clients s'impatientent et partent chez vos concurrents.</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Section Statistiques (Déplacée sous l'argumentaire en mode horizontal) -->
    <div class="wm-assets-stats">
      <!-- Stat 1 : Taux de Rebond -->
      <a href="https://www.thinkwithgoogle.com/intl/en-154/marketing-strategies/app-and-mobile/mobile-page-speed-new-industry-benchmarks/" target="_blank" rel="noopener noreferrer" class="wm-stat-card wm-stat-link">
        <div class="wm-stat-icon-wrapper wm-stat-icon-orange">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
        </div>
        <div class="wm-stat-number">-90%</div>
        <div class="wm-stat-label">de chances qu'un visiteur quitte votre site s'il met plus de 3 secondes à s'afficher. <span class="wm-stat-source">(Source: Google)</span></div>
      </a>
      
      <!-- Stat 2 : Expérience Négative -->
      <div class="wm-stat-card">
        <div class="wm-stat-icon-wrapper wm-stat-icon-orange">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M10 15v4a3 3 0 0 0 6 0v-4"></path><rect x="4" y="3" width="16" height="18" rx="2"></rect><path d="M9 9h.01"></path><path d="M15 9h.01"></path></svg>
        </div>
        <div class="wm-stat-number">88%</div>
        <div class="wm-stat-label">des internautes déclarent ne plus retourner sur un site après une mauvaise expérience.</div>
      </div>
      
      <!-- Stat 3 : Continuité 24/7 -->
      <div class="wm-stat-card">
        <div class="wm-stat-icon-wrapper wm-stat-icon-green">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
        </div>
        <div class="wm-stat-number">24/7</div>
        <div class="wm-stat-label">Votre entreprise reste visible et capte des prospects qualifiés à toute heure.</div>
      </div>
      
      <!-- Stat 4 : Propriété Totale -->
      <div class="wm-stat-card">
        <div class="wm-stat-icon-wrapper wm-stat-icon-green">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
        </div>
        <div class="wm-stat-number">100%</div>
        <div class="wm-stat-label">Indépendant des réseaux et des plateformes tierces. Votre marque est votre propriété exclusive.</div>
      </div>
    </div>

    <!-- Section Accompagnement (Timeline) -->
    <div class="wm-accompagnement-section">
      <h2 class="wm-accomp-title">
        Mon Accompagnement : <span>L'alliance du design et de l'ingénierie</span>
      </h2>
      <p class="wm-accomp-subtitle">
        Une méthodologie rigoureuse en 3 étapes pour bâtir un écosystème web performant et sur-mesure.
      </p>
      
      <div class="wm-accomp-grid">
        <!-- Pilier 1 : Branding -->
        <div class="wm-accomp-card">
          <div class="wm-accomp-icon-box">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
          </div>
          <h3 class="wm-accomp-card-title">Branding & Image Unique</h3>
          <p class="wm-accomp-card-desc">
            Votre site doit inspirer confiance dès la première seconde. Nous créons une identité de marque cohérente et mémorable (logos, typographies, palettes) pour vous démarquer nettement de la concurrence.
          </p>
        </div>

        <!-- Pilier 2 : Besoins & Activité -->
        <div class="wm-accomp-card wm-accomp-card-orange">
          <div class="wm-accomp-icon-box">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
          </div>
          <h3 class="wm-accomp-card-title">Ciblage & Besoins Clients</h3>
          <p class="wm-accomp-card-desc">
            Un beau site inutile ne sert à rien. J'analyse vos process métiers et les attentes réelles de vos clients pour concevoir un parcours utilisateur (UX) fluide, taillé pour guider vers l'acte d'achat ou le contact.
          </p>
        </div>

        <!-- Pilier 3 : Performance & Vitesse -->
        <div class="wm-accomp-card">
          <div class="wm-accomp-icon-box">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>
          </div>
          <h3 class="wm-accomp-card-title">Vitesse Blitz & SEO</h3>
          <p class="wm-accomp-card-desc">
            Issu d'une formation d'ingénieur, j'optimise chaque ligne de code pour éliminer la lenteur. Votre site charge en un clin d'œil, réduisant le taux de rebond et boostant directement votre référencement Google.
          </p>
        </div>
      </div>
    </div>

    <!-- Section Catalogue des typologies de sites -->
    <div class="wm-catalogue-header">
      <h2 class="wm-catalogue-title">
        Des technologies adaptées à chaque vision
      </h2>
      <p class="wm-catalogue-subtitle">
        Quel que soit votre secteur, je développe des solutions sur-mesure répondant précisément à vos objectifs stratégiques.
      </p>
    </div>

    <div class="wm-catalogue-grid">
      
      <!-- Site Vitrine Premium (Green) -->
      <div class="wm-catalogue-card wm-catalogue-card-green">
        <div class="wm-catalogue-card-icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>
        </div>
        <h3 class="wm-catalogue-card-title">Site Vitrine Premium</h3>
        <p class="wm-catalogue-card-desc">
          Idéal pour les entreprises, artisans et professions libérales souhaitant attirer des prospects et valoriser leur image de marque avec un design haut de gamme.
        </p>
        <div class="wm-catalogue-features">
          <div class="wm-feature-item">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
            Design sur-mesure & interactif
          </div>
          <div class="wm-feature-item">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
            Formulaires de contact avancés
          </div>
          <div class="wm-feature-item">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
            SEO technique configuré d'office
          </div>
        </div>
      </div>

      <!-- E-Commerce (Orange) -->
      <div class="wm-catalogue-card wm-catalogue-card-orange">
        <div class="wm-catalogue-card-icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
        </div>
        <h3 class="wm-catalogue-card-title">E-Commerce & Vente en ligne</h3>
        <p class="wm-catalogue-card-desc">
          Boutique digitale optimisée pour la conversion. Tunnels de commande fluides, paniers d'achats rapides et expériences de paiement ultra-sécurisées.
        </p>
        <div class="wm-catalogue-features">
          <div class="wm-feature-item">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
            Paiements <a href="https://stripe.com" target="_blank" rel="noopener noreferrer" class="wm-seo-link">Stripe</a>, PayPal & Apple Pay
          </div>
          <div class="wm-feature-item">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
            Tunnels d'achat en un clic
          </div>
          <div class="wm-feature-item">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
            Gestion intuitive des stocks
          </div>
        </div>
      </div>

      <!-- Base de Données (Blue) -->
      <div class="wm-catalogue-card wm-catalogue-card-blue">
        <div class="wm-catalogue-card-icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path><path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3"></path></svg>
        </div>
        <h3 class="wm-catalogue-card-title">Plateforme avec Base de Données</h3>
        <p class="wm-catalogue-card-desc">
          Portails dynamiques, espaces membres, filtres de recherche complexes et gestion de volumes de données importants (annuaires, plateformes de mise en relation).
        </p>
        <div class="wm-catalogue-features">
          <div class="wm-feature-item">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
            Espace membre sécurisé (auth)
          </div>
          <div class="wm-feature-item">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
            Filtres de recherche instantanés
          </div>
          <div class="wm-feature-item">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
            Panneau d'administration dédié
          </div>
        </div>
      </div>

      <!-- SaaS & Web App (Purple) -->
      <div class="wm-catalogue-card wm-catalogue-card-purple">
        <div class="wm-catalogue-card-icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path></svg>
        </div>
        <h3 class="wm-catalogue-card-title">SaaS & Applications Web</h3>
        <p class="wm-catalogue-card-desc">
          Développement d'outils interactifs de type "Software as a Service". Tableaux de bord en temps réel, abonnements récurrents et intégration d'API tierces.
        </p>
        <div class="wm-catalogue-features">
          <div class="wm-feature-item">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
            Système d'abonnement Stripe Billing
          </div>
          <div class="wm-feature-item">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
            Architectures scalables et robustes
          </div>
          <div class="wm-feature-item">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
            Intégration d'API (<a href="https://zapier.com" target="_blank" rel="noopener noreferrer" class="wm-seo-link">Zapier</a>, CRM, IA)
          </div>
        </div>
      </div>

      <!-- Associations (Amber) -->
      <div class="wm-catalogue-card wm-catalogue-card-amber">
        <div class="wm-catalogue-card-icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
        </div>
        <h3 class="wm-catalogue-card-title">Site d'Association</h3>
        <p class="wm-catalogue-card-desc">
          Une plateforme pour structurer votre communauté, présenter vos missions, collecter des dons de manière sécurisée et coordonner vos adhérents.
        </p>
        <div class="wm-catalogue-features">
          <div class="wm-feature-item">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
            Module de dons en ligne sécurisé
          </div>
          <div class="wm-feature-item">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
            Calendrier d'événements & actualités
          </div>
          <div class="wm-feature-item">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
            Adhésions & newsletters intégrées
          </div>
        </div>
      </div>

      <!-- Églises (Dark) -->
      <div class="wm-catalogue-card wm-catalogue-card-dark">
        <div class="wm-catalogue-card-icon">
          <!-- Icône de temple/église symbolique -->
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v20M17 5H7M12 10h5M12 14h5M7 10h5M7 14h5"></path></svg>
        </div>
        <h3 class="wm-catalogue-card-title">Site d'Église & Communauté</h3>
        <p class="wm-catalogue-card-desc">
          Une présence en ligne accueillante pour rassembler vos fidèles. Diffusion des cultes, agenda d'activités, podcasts de sermons et dons sécurisés.
        </p>
        <div class="wm-catalogue-features">
          <div class="wm-feature-item">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
            Streaming live & Médiathèque (sermons)
          </div>
          <div class="wm-feature-item">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
            Planning des assemblées & cultes
          </div>
          <div class="wm-feature-item">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
            Collecte de dîmes & offrandes en ligne
          </div>
        </div>
      </div>

      <!-- Refonte de Site (Orange) -->
      <div class="wm-catalogue-card wm-catalogue-card-orange">
        <div class="wm-catalogue-card-icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"></path></svg>
        </div>
        <h3 class="wm-catalogue-card-title">Refonte de Site Web</h3>
        <p class="wm-catalogue-card-desc">
          Offrez une seconde jeunesse à votre plateforme vieillissante. J'analyse les points de friction, modernise l'esthétique générale de votre site et corrige l'obsolescence technique pour relancer vos conversions.
        </p>
        <div class="wm-catalogue-features">
          <div class="wm-feature-item">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
            Audit ergonomique & UI complet
          </div>
          <div class="wm-feature-item">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
            Optimisation responsive & fluidité
          </div>
          <div class="wm-feature-item">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
            Préservation de votre historique SEO
          </div>
        </div>
      </div>

      <!-- Maintenance Élite (Green) -->
      <div class="wm-catalogue-card wm-catalogue-card-green">
        <div class="wm-catalogue-card-icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path><path d="M12 15v3"></path></svg>
        </div>
        <h3 class="wm-catalogue-card-title">Maintenance & Sécurité</h3>
        <p class="wm-catalogue-card-desc">
          Un site performant doit le rester. Je protège votre actif digital contre les failles, gère les mises à jour critiques de votre application web (Next.js), sécurise vos sauvegardes et surveille en temps réel vos temps de chargement.
        </p>
        <div class="wm-catalogue-features">
          <div class="wm-feature-item">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
            Mises à jour applicatives & dépendances Next.js
          </div>
          <div class="wm-feature-item">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
            Sauvegardes quotidiennes délocalisées
          </div>
          <div class="wm-feature-item">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
            Sécurisation anti-piratage avancée
          </div>
        </div>
      </div>

    </div>

    <!-- Section CTA en bas (Design identique à cta.html) -->
    <div class="wms-cta-wrapper">
      <h3 class="wms-cta-title">
        Prêt à lancer votre <span class="wms-cta-highlight">projet web</span> ?
      </h3>
      <p class="wms-cta-subtitle">
        Rencontrons-nous pour définir votre branding et structurer une plateforme d'exception taillée pour la réussite de votre entreprise.
      </p>
      
      <div class="wms-cta-actions">
        <!-- Bouton Principal (redirige vers formulaire) -->
        <a href="/contact" class="wms-cta-btn wms-cta-btn-primary">
          <span class="wms-cta-icon-badge-primary">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4.5 3L9.5 8L4.5 13" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M8.5 3L13.5 8L8.5 13" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </span>
          Prendre RDV offert
        </a>

        <!-- Bouton Secondaire (redirige vers services) -->
        <a href="/#services" class="wms-cta-btn wms-cta-btn-secondary">
          <span class="wms-cta-icon-badge-secondary">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M3.5 2.5L9.5 6L3.5 9.5V2.5Z" />
            </svg>
          </span>
          Découvrir mes services
        </a>
      </div>
    </div>

  </div>
</section>

<!-- SCRIPT JS DYNAMIQUE POUR LE WOW EFFECT DU SIMULATEUR -->

        ` }} />
      </main>
      
      <FooterPublic />
    </div>
  );
}
