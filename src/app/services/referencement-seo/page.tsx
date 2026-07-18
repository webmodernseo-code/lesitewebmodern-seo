'use client';

import React, { useEffect } from 'react';
import { HeaderPublic } from '@/components/public/HeaderPublic';
import { FooterPublic } from '@/components/public/FooterPublic';

export default function Page() {
  useEffect(() => {
    try {
      (function() {
    const slider = document.getElementById('seo-slider');
    const ctrVal = document.getElementById('ctr-val');
    const trafficVal = document.getElementById('traffic-val');
    const progressIndicator = document.getElementById('seo-progress-indicator');
    const verdictText = document.getElementById('seo-verdict-text');

    if (!slider || !ctrVal || !trafficVal || !progressIndicator || !verdictText) return;

    // Volume de recherche mensuel fictif pour simulation
    const MONTHLY_SEARCHES = 5000;

    function updateSimulation(position) {
      let ctr = 0;
      let text = '';
      let isPerfect = false;

      // Calculs de CTR empiriques réels selon la position dans la SERP Google
      if (position === 1) {
        ctr = 31.7;
        text = 'Position #1 : Trafic maximal ! Vous captez près d’un tiers de toute l’audience du marché.';
        isPerfect = true;
      } else if (position === 2) {
        ctr = 16.1;
        text = 'Position #2 : Excellent trafic. Vous êtes l’un des acteurs majeurs de la première page.';
        isPerfect = true;
      } else if (position === 3) {
        ctr = 10.2;
        text = 'Position #3 : Visibilité forte. Dernier spot du podium très rentable.';
        isPerfect = true;
      } else if (position <= 5) {
        ctr = 6.8;
        text = `Position #${position} : Visibilité moyenne. Vous manquez plus de 90% des opportunités.`;
      } else if (position <= 10) {
        ctr = 2.4;
        text = `Position #${position} : Bas de première page. L’audience s’effrite considérablement.`;
      } else {
        ctr = 0.5;
        text = `Position #${position} (Page 2+) : L'invisible. Moins de 1% des internautes cliquent ici.`;
      }

      // Calcul du trafic estimé
      const traffic = Math.round((MONTHLY_SEARCHES * ctr) / 100);

      // Mises à jour des valeurs textuelles
      ctrVal.textContent = ctr.toFixed(1) + '%';
      trafficVal.textContent = traffic;

      if (isPerfect) {
        ctrVal.style.color = 'var(--primary-green)';
        trafficVal.style.color = 'var(--primary-green)';
        ctrVal.className = 'wm-sim-metric-val green-ok';
        trafficVal.className = 'wm-sim-metric-val green-ok';
      } else if (position > 10) {
        ctrVal.style.color = '#e11d48';
        trafficVal.style.color = '#e11d48';
        ctrVal.className = 'wm-sim-metric-val bad-pos';
        trafficVal.className = 'wm-sim-metric-val bad-pos';
      } else {
        ctrVal.style.color = '';
        trafficVal.style.color = '';
        ctrVal.className = 'wm-sim-metric-val';
        trafficVal.className = 'wm-sim-metric-val';
      }

      // Mise à jour de la jauge visuelle (inversée pour montrer la force)
      const percentFill = (16 - position) / 15 * 100;
      progressIndicator.style.width = percentFill + '%';
      
      if (isPerfect) {
        progressIndicator.style.background = 'linear-gradient(90deg, var(--primary-green-light) 0%, var(--primary-green) 100%)';
      } else if (position <= 10) {
        progressIndicator.style.background = '#f59e0b'; // Amber
      } else {
        progressIndicator.style.background = '#e11d48'; // Red
      }

      // Mise à jour du verdict textuel
      verdictText.textContent = text;
    }

    // Initialisation
    updateSimulation(parseInt(slider.value));

    // Détecteurs d'événements
    slider.addEventListener('input', function() {
      updateSimulation(parseInt(this.value));
    });
  })();

  // SCRIPT JS DYNAMIQUE POUR L'ANIMATION DE MONTÉE EN SERP SEO
  (function() {
    const btnReplay = document.getElementById('btn-replay-anim');
    const animStatus = document.getElementById('anim-general-status');
    
    // Checklist items
    const checkSpeed = document.getElementById('check-speed');
    const checkSchema = document.getElementById('check-schema');
    const checkContent = document.getElementById('check-content');
    const checkLinks = document.getElementById('check-links');
    
    // Badges
    const badgeSpeed = document.getElementById('badge-speed');
    const badgeSchema = document.getElementById('badge-schema');
    const badgeContent = document.getElementById('badge-content');
    const badgeLinks = document.getElementById('badge-links');
    
    // Target website elements
    const target = document.getElementById('target-website');
    const rankBadge = document.getElementById('rank-badge-display');
    const animCtr = document.getElementById('anim-ctr-display');
    const animTraffic = document.getElementById('anim-traffic-display');
    const animStatusDisp = document.getElementById('anim-status-display');
    
    // Competitors to animate swaps
    const comp1 = document.getElementById('comp-1');
    const comp2 = document.getElementById('comp-2');
    
    if (!target || !comp1 || !comp2 || !btnReplay || !animStatus) return;

    let animTimeoutIds = [];
    let isAnimating = false;

    function clearAllTimeouts() {
      animTimeoutIds.forEach(id => clearTimeout(id));
      animTimeoutIds = [];
    }

    function resetAnimation() {
      clearAllTimeouts();
      isAnimating = false;

      // Reset Checklist UI
      const checkItems = [checkSpeed, checkSchema, checkContent, checkLinks];
      checkItems.forEach(item => {
        if (item) item.classList.remove('active');
      });
      if (badgeSpeed) { badgeSpeed.textContent = "En attente"; badgeSpeed.style.background = ""; }
      if (badgeSchema) { badgeSchema.textContent = "En attente"; badgeSchema.style.background = ""; }
      if (badgeContent) { badgeContent.textContent = "En attente"; badgeContent.style.background = ""; }
      if (badgeLinks) { badgeLinks.textContent = "En attente"; badgeLinks.style.background = ""; }

      // Reset Target Site visual states
      target.classList.remove('climbing', 'success');
      target.style.transform = 'translateY(0)';
      comp1.style.transform = 'translateY(0)';
      comp2.style.transform = 'translateY(0)';

      // Reset Target Metrics
      if (rankBadge) {
        rankBadge.textContent = "#25 (Page 3)";
        rankBadge.style.color = "";
        rankBadge.style.background = "";
      }
      if (animCtr) animCtr.textContent = "0.2%";
      if (animTraffic) animTraffic.textContent = "12";
      if (animStatusDisp) {
        animStatusDisp.textContent = "Faible";
        animStatusDisp.style.color = "#e11d48";
      }

      animStatus.textContent = "Initialisation...";
      animStatus.style.color = "var(--text-dim)";
    }

    function runAnimationSequence() {
      if (isAnimating) return;
      isAnimating = true;

      // Calcul dynamique du décalage (step) entre deux éléments
      const step = comp2.offsetTop - comp1.offsetTop;

      // Étape 1 : Vitesse
      animStatus.textContent = "Optimisation Vitesse...";
      animStatus.style.color = "var(--primary-orange)";
      
      let tid = setTimeout(() => {
        if (checkSpeed) checkSpeed.classList.add('active');
        if (badgeSpeed) badgeSpeed.textContent = "0.4s (A+)";
      }, 800);
      animTimeoutIds.push(tid);

      // Étape 2 : Balises & Schema.org
      tid = setTimeout(() => {
        animStatus.textContent = "Données structurées...";
        if (checkSchema) checkSchema.classList.add('active');
        if (badgeSchema) badgeSchema.textContent = "JSON-LD OK";
      }, 2000);
      animTimeoutIds.push(tid);

      // Étape 3 : Contenu d'Autorité
      tid = setTimeout(() => {
        animStatus.textContent = "Rédaction sémantique...";
        if (checkContent) checkContent.classList.add('active');
        if (badgeContent) badgeContent.textContent = "EEAT Validé";
      }, 3200);
      animTimeoutIds.push(tid);

      // Étape 4 : Netlinking
      tid = setTimeout(() => {
        animStatus.textContent = "Gain d'autorité...";
        if (checkLinks) checkLinks.classList.add('active');
        if (badgeLinks) badgeLinks.textContent = "Backlinks OK";
      }, 4400);
      animTimeoutIds.push(tid);

      // Étape 5 : Ascension à la Position #2
      tid = setTimeout(() => {
        animStatus.textContent = "Ascension dans l'index...";
        target.classList.add('climbing');
        
        // Swapper de 1 position (Target monte, Comp 2 descend)
        target.style.transform = 'translateY(' + (-step) + 'px)';
        comp2.style.transform = 'translateY(' + step + 'px)';
        comp1.style.transform = 'translateY(0)';

        if (rankBadge) {
          rankBadge.textContent = "Position #2";
          rankBadge.style.color = "var(--primary-orange)";
          rankBadge.style.background = "rgba(224, 83, 0, 0.08)";
        }
        if (animCtr) animCtr.textContent = "16.1%";
        if (animTraffic) animTraffic.textContent = "805";
        if (animStatusDisp) {
          animStatusDisp.textContent = "Excellent";
          animStatusDisp.style.color = "var(--primary-orange)";
        }
      }, 5600);
      animTimeoutIds.push(tid);

      // Étape 6 : Podium Position #1 (Victoire !)
      tid = setTimeout(() => {
        animStatus.textContent = "Première place atteinte !";
        animStatus.style.color = "var(--primary-green)";
        target.classList.remove('climbing');
        target.classList.add('success');

        // Swapper de 2 positions (Target au top, Comp 1 et Comp 2 descendent)
        target.style.transform = 'translateY(' + (-2 * step) + 'px)';
        comp1.style.transform = 'translateY(' + step + 'px)';
        comp2.style.transform = 'translateY(' + step + 'px)'; // Reste en bas

        if (rankBadge) {
          rankBadge.textContent = "Top 1 Google";
        }
        if (animCtr) animCtr.textContent = "31.7%";
        if (animTraffic) animTraffic.textContent = "1585";
        if (animStatusDisp) {
          animStatusDisp.textContent = "Optimal";
          animStatusDisp.style.color = "var(--primary-green)";
        }
      }, 7200);
      animTimeoutIds.push(tid);

      // Étape 7 : Boucle / Relance automatique après un délai de repos
      tid = setTimeout(() => {
        resetAnimation();
        // Attendre 1.5s au repos avant de relancer automatiquement
        let loopId = setTimeout(() => {
          runAnimationSequence();
        }, 1500);
        animTimeoutIds.push(loopId);
      }, 13000);
      animTimeoutIds.push(tid);
    }

    // Bouton de relance manuelle
    btnReplay.addEventListener('click', () => {
      resetAnimation();
      setTimeout(() => {
        runAnimationSequence();
      }, 100);
    });

    // Démarrage initial
    resetAnimation();
    setTimeout(() => {
      runAnimationSequence();
    }, 1200);

  })();
    } catch (e) {
      console.error("Error in services/referencement-seo page script:", e);
    }
  }, []);

  return (
    <div className="relative min-h-screen bg-[#FDFBF7] text-black overflow-x-hidden font-sans">
      <HeaderPublic />
      
      <main className="w-full pt-24 pb-16">
        <style dangerouslySetInnerHTML={{ __html: `
          /* --- ISOLATION TOTALE DU CSS SERVICE SEO/GEO POUR WORDPRESS --- */
  .wm-seo-page {
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
  .wm-seo-page *,
  .wm-seo-page *::before,
  .wm-seo-page *::after {
    box-sizing: border-box;
    font-family: 'Inter', sans-serif !important;
  }

  /* Lueur d'ambiance verte (haut droite) */
  .wm-seo-page::before {
    content: '';
    position: absolute;
    top: -5%;
    right: -5%;
    width: 700px;
    height: 700px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(15, 172, 113, 0.04) 0%, transparent 70%);
    filter: blur(100px);
    pointer-events: none;
    z-index: 0;
  }

  /* Lueur d'ambiance orange (milieu gauche) */
  .wm-seo-page::after {
    content: '';
    position: absolute;
    top: 35%;
    left: -15%;
    width: 700px;
    height: 700px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(224, 83, 0, 0.03) 0%, transparent 70%);
    filter: blur(100px);
    pointer-events: none;
    z-index: 0;
  }

  /* ── CONTENEUR PRINCIPAL ── */
  .wm-seo-container {
    max-width: 1240px;
    width: 100%;
    margin: 0 auto;
    position: relative;
    z-index: 2;
  }

  /* ── BADGE SUPERIEUR ── */
  .wm-seo-badge {
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

  .wm-seo-badge-dot {
    width: 6px;
    height: 6px;
    background: var(--primary-green);
    border-radius: 50%;
    box-shadow: 0 0 8px var(--primary-green);
  }

  /* ── ENTÊTE HERO ── */
  .wm-seo-header {
    text-align: center;
    margin-bottom: 80px;
  }

  .wm-seo-title {
    font-size: clamp(32px, 5.5vw, 54px);
    font-weight: 800;
    line-height: 1.12;
    letter-spacing: -0.03em;
    color: var(--text) !important;
    max-width: 950px;
    margin: 0 auto 24px;
  }

  .wm-seo-title span.fancy-underline {
    position: relative;
    display: inline-block;
    white-space: nowrap;
  }

  .wm-seo-title span.fancy-underline::after {
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

  .wm-seo-subtitle {
    font-size: clamp(16px, 2.2vw, 20px);
    line-height: 1.6;
    color: var(--text-dim);
    max-width: 820px;
    margin: 0 auto;
    font-weight: 500;
  }

  /* ── SECTIONS SPLIT (ARGUMENTAIRE & IMAGE) ── */
  .wm-seo-split-section {
    display: grid;
    grid-template-columns: 1fr;
    gap: 48px;
    margin-bottom: 80px;
    align-items: center;
  }

  @media (min-width: 992px) {
    .wm-seo-split-section {
      grid-template-columns: 1.15fr 1fr;
      gap: 72px;
    }
  }

  .wm-seo-content {
    display: flex;
    flex-direction: column;
  }

  .wm-seo-headline {
    font-size: clamp(26px, 3.8vw, 36px);
    font-weight: 800;
    line-height: 1.2;
    letter-spacing: -0.02em;
    color: var(--text);
    margin: 0 0 20px 0;
  }

  .wm-seo-headline span {
    color: var(--primary-green);
  }

  .wm-seo-text {
    font-size: 16px;
    line-height: 1.68;
    color: var(--text-dim);
    margin: 0 0 24px 0;
  }

  .wm-seo-quote {
    border-left: 4px solid var(--primary-green);
    padding: 6px 0 6px 20px;
    margin: 28px 0;
    font-style: italic;
    color: var(--text);
    font-size: 17px;
    line-height: 1.6;
    font-weight: 500;
  }

  /* Colonne Image Showcase premium */
  .wm-seo-image-column {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    width: 100%;
  }

  .wm-seo-image-wrapper {
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

  .wm-seo-image-wrapper::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 28px;
    padding: 1.5px;
    background: linear-gradient(135deg, rgba(15, 172, 113, 0.2) 0%, transparent 50%, rgba(224, 83, 0, 0.15) 100%);
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    pointer-events: none;
  }

  .wm-seo-image-wrapper:hover {
    transform: translateY(-4px) scale(1.01) rotate(-0.5deg);
  }

  .wm-seo-img {
    width: 100%;
    height: auto;
    aspect-ratio: 4/3;
    object-fit: cover;
    border-radius: 20px;
    display: block;
    border: 1px solid rgba(15, 15, 17, 0.03);
  }

  /* Points de déco d'arrière-plan */
  .wm-seo-image-deco {
    position: absolute;
    bottom: -20px;
    right: -20px;
    width: 96px;
    height: 96px;
    background-image: radial-gradient(var(--primary-green) 2px, transparent 2px);
    background-size: 14px 14px;
    opacity: 0.2;
    z-index: -1;
    pointer-events: none;
  }

  .wm-seo-image-badge {
    position: absolute;
    top: 24px;
    left: 24px;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(8px);
    border: 1px solid rgba(15, 15, 17, 0.05);
    padding: 8px 16px;
    border-radius: 999px;
    font-size: 12px;
    font-weight: 700;
    color: var(--primary-orange);
    box-shadow: 0 10px 25px -5px rgba(15, 15, 17, 0.08);
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .wm-seo-image-badge-dot {
    width: 6px;
    height: 6px;
    background: var(--primary-orange);
    border-radius: 50%;
    box-shadow: 0 0 8px var(--primary-orange);
    animation: wmPulseOrangeDot 2s infinite;
  }

  /* ── SECTION D'ÉLEVATION TECH : GÉO vs SEO (EXPLORATION COMPOSANTS) ── */
  .wm-geo-intro-section {
    background: #ffffff;
    border: 1px solid var(--card-border);
    border-radius: 32px;
    padding: 48px;
    margin-bottom: 80px;
    box-shadow: 0 15px 35px rgba(15, 15, 17, 0.02);
  }

  .wm-geo-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 40px;
  }

  @media (min-width: 768px) {
    .wm-geo-grid {
      grid-template-columns: 1fr 1fr;
      gap: 48px;
    }
  }

  .wm-geo-col h3 {
    font-size: 22px;
    font-weight: 800;
    margin: 0 0 16px 0;
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .wm-geo-col-seo h3 { color: var(--primary-orange); }
  .wm-geo-col-geo h3 { color: var(--primary-green); }

  .wm-geo-badge-icon {
    width: 38px;
    height: 38px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
  }

  .wm-geo-col-seo .wm-geo-badge-icon { background: rgba(224, 83, 0, 0.08); }
  .wm-geo-col-geo .wm-geo-badge-icon { background: rgba(15, 172, 113, 0.08); }

  .wm-geo-desc {
    font-size: 14.5px;
    line-height: 1.6;
    color: var(--text-dim);
    margin: 0 0 20px 0;
  }

  .wm-geo-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .wm-geo-item {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    font-size: 13.5px;
    font-weight: 600;
    color: var(--text);
  }

  .wm-geo-item svg {
    margin-top: 2px;
    flex-shrink: 0;
  }

  .wm-geo-col-seo .wm-geo-item svg { color: var(--primary-orange); }
  .wm-geo-col-geo .wm-geo-item svg { color: var(--primary-green); }

  /* ── WIDGET INTERACTIF : SIMULATEUR DE TRAFIC ET VISIBILITÉ (WOW EFFECT) ── */
  .wm-simulator-card {
    background: var(--card-bg);
    border: 1px solid var(--card-border);
    backdrop-filter: blur(16px);
    border-radius: 28px;
    padding: 36px;
    box-shadow: var(--glass-glow);
    margin-bottom: 96px;
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
    color: var(--primary-green);
  }

  .wm-sim-desc {
    font-size: 14.5px;
    color: var(--text-dim);
    line-height: 1.55;
    margin: 0 0 28px 0;
  }

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
    background: var(--primary-green);
    cursor: pointer;
    box-shadow: 0 0 0 4px rgba(15, 172, 113, 0.15), 0 4px 10px rgba(15, 15, 17, 0.1);
    transition: transform 0.2s, background-color 0.2s;
  }

  .wm-range-slider::-webkit-slider-thumb:hover {
    transform: scale(1.1);
    background: var(--primary-green-light);
  }

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
    color: var(--primary-green);
    line-height: 1.1;
    margin-bottom: 4px;
    transition: color 0.3s ease;
  }

  .wm-sim-metric-val.bad-pos {
    color: #e11d48;
  }

  .wm-sim-metric-lbl {
    font-size: 12px;
    font-weight: 700;
    color: var(--text-dim);
  }

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
    width: 100%;
    background: linear-gradient(90deg, var(--primary-green-light) 0%, var(--primary-green) 100%);
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
    color: var(--primary-green);
    flex-shrink: 0;
  }

  /* ── SECTION CATALOGUE DES PRESTATIONS ── */
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

  .wm-catalogue-card-orange .wm-catalogue-card-icon { color: var(--primary-orange); background: rgba(224, 83, 0, 0.05); }
  .wm-catalogue-card-green .wm-catalogue-card-icon { color: var(--primary-green); background: rgba(15, 172, 113, 0.05); }

  .wm-catalogue-card:hover .wm-catalogue-card-icon {
    transform: scale(1.05);
  }
  .wm-catalogue-card-orange:hover .wm-catalogue-card-icon { background: var(--primary-orange); color: #ffffff; }
  .wm-catalogue-card-green:hover .wm-catalogue-card-icon { background: var(--primary-green); color: #ffffff; }

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

  .wm-seo-link {
    color: var(--primary-green) !important;
    text-decoration: none !important;
    border-bottom: 1.5px solid rgba(15, 172, 113, 0.3) !important;
    transition: all 0.2s ease !important;
    font-weight: 600 !important;
  }
  .wm-seo-link:hover {
    color: var(--primary-green-light) !important;
    border-bottom-color: var(--primary-green-light) !important;
  }

  .wm-stat-link {
    text-decoration: none !important;
    color: inherit !important;
    cursor: pointer !important;
  }
  .wm-stat-source {
    font-size: 11px !important;
    color: var(--primary-green) !important;
    text-decoration: underline !important;
    margin-left: 4px !important;
    display: inline-block !important;
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
  @keyframes wmPulseOrangeDot {
    0% { box-shadow: 0 0 0 0 rgba(224, 83, 0, 0.7); }
    70% { box-shadow: 0 0 0 8px rgba(224, 83, 0, 0); }
    100% { box-shadow: 0 0 0 0 rgba(224, 83, 0, 0); }
  }

  @keyframes wmPulseGreenBorder {
    0% { box-shadow: 0 12px 30px rgba(15, 172, 113, 0.15); }
    50% { box-shadow: 0 12px 30px rgba(15, 172, 113, 0.3); }
    100% { box-shadow: 0 12px 30px rgba(15, 172, 113, 0.15); }
  }

  /* --- STYLE SECTION ANIMATION SEO --- */
  .wm-seo-anim-section {
    margin: 80px 0;
    width: 100%;
    box-sizing: border-box;
  }

  .wm-seo-anim-header {
    text-align: center;
    margin-bottom: 48px;
  }

  .wm-seo-anim-title {
    font-size: clamp(24px, 3.5vw, 32px);
    font-weight: 800;
    color: var(--text) !important;
    margin: 0 0 12px 0;
    letter-spacing: -0.02em;
  }

  .wm-seo-anim-subtitle {
    font-size: 16px;
    color: var(--text-dim);
    max-width: 720px;
    margin: 0 auto;
    font-weight: 500;
    line-height: 1.5;
  }

  .wm-seo-anim-container {
    display: grid;
    grid-template-columns: 1fr;
    gap: 32px;
    width: 100%;
  }

  @media (min-width: 992px) {
    .wm-seo-anim-container {
      grid-template-columns: 1fr 1.15fr;
      gap: 48px;
    }
  }

  .wm-anim-panel-left {
    background: var(--card-bg);
    border: 1px solid var(--card-border);
    backdrop-filter: blur(16px);
    border-radius: 28px;
    padding: 32px;
    box-shadow: var(--glass-glow);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border-top: 1px solid rgba(255, 255, 255, 0.6);
  }

  .wm-panel-title {
    font-size: 18px;
    font-weight: 800;
    color: var(--text);
    margin: 0 0 24px 0;
    letter-spacing: -0.01em;
  }

  .wm-panel-checklist {
    display: flex;
    flex-direction: column;
    gap: 16px;
    margin-bottom: 28px;
  }

  .wm-panel-check-item {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 16px;
    background: rgba(255, 255, 255, 0.5);
    border: 1px solid rgba(15, 15, 17, 0.04);
    border-radius: 18px;
    transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .wm-panel-check-item.active {
    background: rgba(15, 172, 113, 0.04);
    border-color: rgba(15, 172, 113, 0.2);
    transform: translateY(-2px);
    box-shadow: 0 8px 20px -6px rgba(15, 172, 113, 0.08);
  }

  .wm-check-status-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #cbd5e1;
    transition: all 0.4s ease;
    flex-shrink: 0;
  }

  .wm-panel-check-item.active .wm-check-status-dot {
    background: var(--primary-green);
    box-shadow: 0 0 10px var(--primary-green);
  }

  .wm-check-text-group {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    gap: 3px;
  }

  .wm-check-label {
    font-size: 13.5px;
    font-weight: 700;
    color: var(--text);
  }

  .wm-check-desc {
    font-size: 11.5px;
    color: var(--text-dim);
  }

  .wm-check-badge {
    font-size: 11px;
    font-weight: 700;
    color: var(--text-dim);
    background: rgba(15, 15, 17, 0.05);
    padding: 4px 10px;
    border-radius: 8px;
    transition: all 0.4s ease;
    flex-shrink: 0;
  }

  .wm-panel-check-item.active .wm-check-badge {
    background: var(--primary-green);
    color: #ffffff;
  }

  .wm-anim-controls {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    padding-top: 20px;
    border-top: 1px solid rgba(15, 15, 17, 0.06);
  }

  .wm-anim-btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 10px 20px;
    border-radius: 14px;
    font-size: 13px;
    font-weight: 700;
    background: var(--text) !important;
    color: #ffffff !important;
    border: 1px solid var(--text) !important;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .wm-anim-btn:hover {
    background: var(--primary-orange) !important;
    border-color: var(--primary-orange) !important;
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(224, 83, 0, 0.15);
  }

  .wm-anim-btn svg {
    transition: transform 0.4s ease;
  }

  .wm-anim-btn:hover svg {
    transform: rotate(-180deg);
  }

  .wm-anim-status {
    font-size: 13px;
    font-weight: 700;
    color: var(--primary-orange);
    transition: all 0.3s ease;
  }

  .wm-anim-panel-right {
    background: #ffffff;
    border: 1px solid var(--card-border);
    border-radius: 28px;
    padding: 16px;
    box-shadow: var(--glass-glow);
    border-top: 1px solid rgba(255, 255, 255, 0.6);
  }

  .wm-mock-browser {
    border: 1px solid rgba(15, 15, 17, 0.06);
    border-radius: 18px;
    background: #ffffff;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    min-height: 460px;
    box-shadow: 0 4px 20px rgba(15, 15, 17, 0.01);
  }

  .wm-browser-bar {
    background: #fafafa;
    border-bottom: 1px solid rgba(15, 15, 17, 0.05);
    padding: 12px 18px;
    display: flex;
    align-items: center;
    gap: 16px;
  }

  .wm-browser-dots {
    display: flex;
    gap: 6px;
  }

  .wm-browser-dots span {
    width: 9px;
    height: 9px;
    border-radius: 50%;
  }

  .wm-dot-red { background: #ff5f56; }
  .wm-dot-yellow { background: #ffbd2e; }
  .wm-dot-green { background: #27c93f; }

  .wm-browser-search {
    background: #f1f1f1;
    border-radius: 8px;
    padding: 6px 14px;
    flex-grow: 1;
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 11.5px;
    color: var(--text-dim);
    font-weight: 500;
  }

  .wm-browser-search svg {
    color: #94a3b8;
  }

  .wm-browser-content {
    padding: 24px;
    display: flex;
    flex-direction: column;
    gap: 18px;
    background: #ffffff;
    flex-grow: 1;
  }

  .wm-serp-stats {
    font-size: 11.5px;
    color: var(--text-dim);
    font-weight: 500;
    margin-bottom: 4px;
  }
  .wm-serp-list {
    display: flex;
    flex-direction: column;
    gap: 16px;
    position: relative;
    height: 512px; /* 3 items * 160px + 2 gaps * 16px = 512px */
    overflow: hidden;
  }

  .wm-serp-item {
    height: 160px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 4px;
    padding: 14px 18px;
    border-radius: 14px;
    border: 1.5px solid transparent;
    background: transparent;
    transition: transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease;
    position: absolute;
    width: 100%;
    left: 0;
  }

  #comp-1 { top: 0px; }
  #comp-2 { top: 176px; }
  #target-website { top: 352px; }
  #comp-3 { top: 528px; opacity: 0; pointer-events: none; }
  .wm-competitor-item {
    opacity: 0.55;
    border-color: rgba(15, 15, 17, 0.03);
    background: rgba(15, 15, 17, 0.01);
  }

  .wm-serp-url {
    font-size: 11px;
    color: var(--text-dim);
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: 6px;
    margin-bottom: 2px;
  }

  .wm-serp-title {
    font-size: 14.5px;
    font-weight: 700;
    color: #1a0dab;
    margin: 0;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    transition: color 0.3s ease;
  }

  .wm-competitor-item:hover .wm-serp-title {
    text-decoration: underline;
  }

  .wm-serp-snippet {
    font-size: 12px;
    color: var(--text-dim);
    line-height: 1.45;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    margin: 0;
  }

  .wm-target-item {
    border-color: rgba(224, 83, 0, 0.08);
    background: #ffffff;
    box-shadow: 0 4px 15px rgba(15, 15, 17, 0.02);
    z-index: 5;
    position: relative;
    overflow: hidden;
  }

  .wm-target-glow {
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(224, 83, 0, 0.04) 0%, rgba(15, 172, 113, 0.04) 100%);
    opacity: 0;
    transition: opacity 0.5s ease;
    pointer-events: none;
    z-index: 0;
  }

  .wm-target-inner {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    gap: 3px;
    height: 100%;
    justify-content: center;
  }

  .wm-target-header-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    margin-bottom: 2px;
  }

  .wm-target-tag {
    background: rgba(224, 83, 0, 0.08);
    color: var(--primary-orange);
    font-size: 9px;
    font-weight: 700;
    padding: 2px 6px;
    border-radius: 4px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-left: 6px;
  }

  .wm-rank-badge {
    font-size: 11px;
    font-weight: 700;
    color: #e11d48;
    background: rgba(225, 29, 72, 0.08);
    padding: 3px 10px;
    border-radius: 99px;
    transition: all 0.4s ease;
  }

  .wm-target-title {
    color: var(--primary-orange);
  }

  .wm-target-item.climbing {
    border-color: rgba(224, 83, 0, 0.25);
    box-shadow: 0 10px 25px -5px rgba(224, 83, 0, 0.08);
  }

  .wm-target-item.climbing .wm-rank-badge {
    color: var(--primary-orange);
    background: rgba(224, 83, 0, 0.08);
  }

  .wm-target-item.success {
    border-color: var(--primary-green);
    box-shadow: 0 15px 35px -10px rgba(15, 172, 113, 0.2);
    animation: wmPulseGreenBorder 2.5s infinite;
  }

  .wm-target-item.success .wm-target-glow {
    opacity: 1;
  }

  .wm-target-item.success .wm-rank-badge {
    color: #ffffff;
    background: var(--primary-green);
    box-shadow: 0 0 10px rgba(15, 172, 113, 0.4);
  }

  .wm-target-item.success .wm-target-title {
    color: var(--primary-green);
  }

  .wm-target-live-metrics {
    display: flex;
    justify-content: space-between;
    gap: 12px;
    margin-top: 8px;
    padding-top: 8px;
    border-top: 1px solid rgba(15, 15, 17, 0.04);
  }

  .wm-live-metric-box {
    display: flex;
    flex-direction: column;
    gap: 1px;
  }

  .wm-live-lbl {
    font-size: 9px;
    font-weight: 700;
    color: var(--text-dim);
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .wm-live-val {
    font-size: 12.5px;
    font-weight: 800;
    color: var(--text);
    transition: color 0.3s ease;
  }

  @media (max-width: 768px) {
    .wm-seo-page {
      padding: 65px 16px;
    }
    .wm-geo-intro-section {
      padding: 32px 20px;
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
    .wm-seo-anim-section {
      margin: 60px 0;
    }
    .wm-anim-panel-left {
      padding: 24px;
    }
  }

  @media (max-width: 480px) {
    .wm-serp-title { font-size: 13.5px; }
    .wm-serp-snippet { font-size: 11px; -webkit-line-clamp: 1; }
    .wm-target-live-metrics { gap: 6px; }
    .wm-live-val { font-size: 11px; }
    .wm-live-lbl { font-size: 8px; }
    .wm-serp-item { height: 150px; padding: 10px 14px; }
    .wm-serp-list { height: 482px; }
    #comp-1 { top: 0px; }
    #comp-2 { top: 166px; }
    #target-website { top: 332px; }
    #comp-3 { top: 498px; }
  }
        ` }} />
        
        <div dangerouslySetInnerHTML={{ __html: `
          <!-- 
  ==========================================================================
  CONFIGURATION SEO POUR CETTE PAGE (À configurer dans WordPress / Yoast SEO / Rank Math)
  ==========================================================================
  
  ✦ SLUG (Permalien) :
    referencement-seo-geo
    
  ✦ TITRE SEO (Title Tag) :
    Référencement SEO & GÉO Sur-Mesure | WebModernSEO
    
  ✦ META DESCRIPTION :
    Doublez votre visibilité digitale : Jean-Prosper MONE optimise votre référencement Google (SEO) et votre présence sur les moteurs IA (GÉO - ChatGPT, Perplexity).
    
  ✦ MOTS-CLÉS CIBLES (Focus Keywords) :
    référencement SEO et GÉO, optimisation SEO Google, visibilité moteurs IA, référencement naturel
    
  ✦ BALISES DE PARTAGE SOCIAL (Open Graph) :
    - og:title       : Référencement SEO & GÉO Sur-Mesure | WebModernSEO
    - og:description : Dominez les résultats de recherche Google et devenez la source recommandée par les moteurs d'intelligence artificielle (ChatGPT, Gemini).
    - og:image       : /images/services/c_ry4rm1_b4.jpg
  
  ==========================================================================
-->
<!-- Import de la police Inter (sécurité si non présent dans le parent) -->

<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>




<section class="wm-seo-page" id="seo-geo">
  <div class="wm-seo-container">
    
    <!-- En-tête Hero -->
    <div class="wm-seo-header">
      <div class="wm-seo-badge">
        <span class="wm-seo-badge-dot"></span> Next-Gen SEO & GÉO
      </div>
      <h1 class="wm-seo-title">
        Optimisation SEO & GÉO <span class="fancy-underline">sur-mesure.</span>
      </h1>
      <p class="wm-seo-subtitle">
        Ne vous contentez pas de plaire à Google. Devenez la réponse recommandée par les intelligences artificielles (ChatGPT, Claude, Google SGE).
      </p>
    </div>

    <!-- Section Argumentaire Actif -->
    <div class="wm-seo-split-section">
      <div class="wm-seo-content">
        <h2 class="wm-seo-headline">
          Si vous n'êtes pas sur la première page, <span>vous laissez vos clients à la concurrence.</span>
        </h2>
        <p class="wm-seo-text">
          Chaque jour, des milliers de personnes recherchent activement vos services. Si votre site web n'est pas optimisé pour capter cette demande, vous passez à côté de prospects qualifiés prêts à acheter. Le référencement naturel est l'investissement digital le plus durable et le plus rentable.
        </p>
        <div class="wm-seo-quote">
          « L'essor de la recherche par Intelligence Artificielle (GÉO) redéfinit les règles. Être visible aujourd'hui, c'est aussi être la source citée par ChatGPT et Perplexity. »
        </div>
        <p class="wm-seo-text">
          Avec mon expertise d'ingénieur, je structure votre site pour le rendre parfaitement lisible par les robots de Google et les modèles de langage de l'IA. Ensemble, avec <a href="/apropos" class="wm-seo-link">Jean-Prosper MONE</a>, bâtissons votre autorité digitale.
        </p>
      </div>

      <!-- Colonne Image Showcase premium -->
      <div class="wm-seo-image-column">
        <div class="wm-seo-image-wrapper">
          <img src="/images/services/c_ry4rm1_b4.jpg" alt="Référencement SEO et GÉO" class="wm-seo-img">
          <div class="wm-seo-image-deco"></div>
          <div class="wm-seo-image-badge">
            <span class="wm-seo-image-badge-dot"></span> IA Ready & SGE
          </div>
        </div>
      </div>
    </div>

    <!-- WIDGET DOUBLE PRESTATION : SEO vs GÉO -->
    <div class="wm-geo-intro-section">
      <div class="wm-geo-grid">
        <!-- Colonne SEO -->
        <div class="wm-geo-col wm-geo-col-seo">
          <h3>
            <span class="wm-geo-badge-icon">🔍</span>
            Le SEO Classique (Google)
          </h3>
          <p class="wm-geo-desc">
            L'art de positionner votre site en tête des résultats naturels de Google (en conformité avec les directives officielles de <a href="https://developers.google.com/search/docs/essentials?hl=fr" class="wm-seo-link" target="_blank" rel="noopener noreferrer">Google Search Essentials</a>) pour capter le flux sémantique traditionnel.
          </p>
          <div class="wm-geo-list">
            <div class="wm-geo-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
              Ciblage de mots-clés transactionnels à forte valeur
            </div>
            <div class="wm-geo-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
              Optimisation technique (Vitesse, Balises HTML5, Sitemap)
            </div>
            <div class="wm-geo-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
              Netlinking et gain d'autorité thématique (Backlinks)
            </div>
          </div>
        </div>

        <!-- Colonne GÉO -->
        <div class="wm-geo-col wm-geo-col-geo">
          <h3>
            <span class="wm-geo-badge-icon">🤖</span>
            La GÉO (Generative Engine)
          </h3>
          <p class="wm-geo-desc">
            L'optimisation pour les moteurs de recherche génératifs (ChatGPT Search, Google Gemini, Perplexity). L'avenir de l'acquisition.
          </p>
          <div class="wm-geo-list">
            <div class="wm-geo-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
              Mise en forme des données pour la lecture par l'IA (JSON-LD)
            </div>
            <div class="wm-geo-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
              Création de contenus d'autorité conformes aux critères E-E-A-T
            </div>
            <div class="wm-geo-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
              Optimisation de la notoriété de marque pour citation par les IA
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- SECTION D'ANIMATION SEO : L'ASCENSION DANS LE MOTEUR DE RECHERCHE -->
    <div class="wm-seo-anim-section">
      <div class="wm-seo-anim-header">
        <h3 class="wm-seo-anim-title">L'Ascension SEO en Temps Réel</h3>
        <p class="wm-seo-anim-subtitle">
          Découvrez en direct comment un site optimisé surmonte les obstacles techniques pour grimper des profondeurs de Google jusqu'à la première place.
        </p>
      </div>

      <div class="wm-seo-anim-container">
        <!-- Panneau de Contrôle Technique (Gauche) -->
        <div class="wm-anim-panel-left">
          <div class="wm-panel-title">Optimisations Antigravity</div>
          <div class="wm-panel-checklist">
            <div class="wm-panel-check-item" id="check-speed">
              <span class="wm-check-status-dot"></span>
              <div class="wm-check-text-group">
                <div class="wm-check-label">Vitesse de Chargement (Core Web Vitals)</div>
                <div class="wm-check-desc">Temps d'affichage réduit à &lt; 0.5s</div>
              </div>
              <div class="wm-check-badge" id="badge-speed">En attente</div>
            </div>
            
            <div class="wm-panel-check-item" id="check-schema">
              <span class="wm-check-status-dot"></span>
              <div class="wm-check-text-group">
                <div class="wm-check-label">Schema JSON-LD & Balisage HTML5</div>
                <div class="wm-check-desc">Données structurées IA & Google de pointe</div>
              </div>
              <div class="wm-check-badge" id="badge-schema">En attente</div>
            </div>

            <div class="wm-panel-check-item" id="check-content">
              <span class="wm-check-status-dot"></span>
              <div class="wm-check-text-group">
                <div class="wm-check-label">Sémantique & IA Optimization (E-E-A-T)</div>
                <div class="wm-check-desc">Contenus uniques d'autorité thématique</div>
              </div>
              <div class="wm-check-badge" id="badge-content">En attente</div>
            </div>

            <div class="wm-panel-check-item" id="check-links">
              <span class="wm-check-status-dot"></span>
              <div class="wm-check-text-group">
                <div class="wm-check-label">Netlinking & Autorité de Domaine</div>
                <div class="wm-check-desc">Backlinks qualitatifs et relations publiques</div>
              </div>
              <div class="wm-check-badge" id="badge-links">En attente</div>
            </div>
          </div>

          <div class="wm-anim-controls">
            <button class="wm-anim-btn" id="btn-replay-anim">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"/></svg>
              Relancer la simulation
            </button>
            <div class="wm-anim-status" id="anim-general-status">Initialisation...</div>
          </div>
        </div>

        <!-- Simulateur d'Écran Google SERP (Droite) -->
        <div class="wm-anim-panel-right">
          <div class="wm-mock-browser">
            <!-- Header du navigateur -->
            <div class="wm-browser-bar">
              <div class="wm-browser-dots">
                <span class="wm-dot-red"></span>
                <span class="wm-dot-yellow"></span>
                <span class="wm-dot-green"></span>
              </div>
              <div class="wm-browser-search">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                <span>google.fr/search?q=creation+web+moderne</span>
              </div>
            </div>
            
            <!-- Contenu SERP -->
            <div class="wm-browser-content">
              <div class="wm-serp-stats">Environ 14 200 000 résultats (0,28 secondes)</div>
              
              <!-- Liste de résultats -->
              <div class="wm-serp-list" id="serp-container">
                <!-- Site Concurrent 1 -->
                <div class="wm-serp-item wm-competitor-item" id="comp-1">
                  <div class="wm-serp-url">https://www.le-geant-du-web.fr</div>
                  <div class="wm-serp-title">Création de site web professionnel & agence digitale</div>
                  <div class="wm-serp-snippet">Besoin d'un site web ? Notre agence vous accompagne de A à Z. Des solutions standards sur CMS pour toutes les entreprises...</div>
                </div>

                <!-- Site Concurrent 2 -->
                <div class="wm-serp-item wm-competitor-item" id="comp-2">
                  <div class="wm-serp-url">https://www.crea-facile.com</div>
                  <div class="wm-serp-title">Faites votre site web vous-même en quelques clics</div>
                  <div class="wm-serp-snippet">Créez un site vitrine gratuit avec nos modèles pré-conçus. Option e-commerce de base et outils marketing intégrés...</div>
                </div>

                <!-- Notre Site Web (Cible de l'animation) -->
                <div class="wm-serp-item wm-target-item" id="target-website">
                  <div class="wm-target-glow"></div>
                  <div class="wm-target-inner">
                    <div class="wm-target-header-row">
                      <div class="wm-serp-url">https://webmodernseo.co <span class="wm-target-tag">Votre Site</span></div>
                      <div class="wm-rank-badge" id="rank-badge-display">#25 (Page 3)</div>
                    </div>
                    <div class="wm-serp-title wm-target-title">WebModernSEO | Création de Site Internet & Référencement de Performance</div>
                    <div class="wm-serp-snippet">Doublez votre visibilité. Conception de sites ultra-rapides, optimisés pour Google et cités par ChatGPT & les IA génératives (GÉO)...</div>
                    
                    <!-- Stats d'impact en surimpression quand Top 1 -->
                    <div class="wm-target-live-metrics">
                      <div class="wm-live-metric-box">
                        <span class="wm-live-lbl">CTR estimé</span>
                        <span class="wm-live-val" id="anim-ctr-display">0.2%</span>
                      </div>
                      <div class="wm-live-metric-box">
                        <span class="wm-live-lbl">Visiteurs / mois</span>
                        <span class="wm-live-val" id="anim-traffic-display">12</span>
                      </div>
                      <div class="wm-live-metric-box">
                        <span class="wm-live-lbl">Statut SEO</span>
                        <span class="wm-live-val" id="anim-status-display" style="color: #e11d48;">Faible</span>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Site Concurrent 3 -->
                <div class="wm-serp-item wm-competitor-item" id="comp-3">
                  <div class="wm-serp-url">https://www.annuaire-site.org</div>
                  <div class="wm-serp-title">Liste des meilleures agences de développement web</div>
                  <div class="wm-serp-snippet">Découvrez notre classement des prestataires et agences en France pour votre projet de création de portail ou site internet...</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- WIDGET INTERACTIF : CALCULATEUR D'IMPACT DE POSITION GOOGLE -->
    <div class="wm-simulator-card">
      <div class="wm-simulator-grid">
        <div class="wm-sim-left">
          <h3>Estimez votre <span>Potentiel de Croissance</span></h3>
          <p class="wm-sim-desc">
            Ajustez le curseur ci-dessous pour simuler votre position moyenne sur vos mots-clés cibles dans Google et découvrir comment votre visibilité se transforme en trafic et en revenus.
          </p>
          
          <div class="wm-slider-container">
            <div class="wm-slider-labels">
              <span>Position #1 (Top Google)</span>
              <span>Page 3 ou pire</span>
            </div>
            <input type="range" min="1" max="15" step="1" value="5" class="wm-range-slider" id="seo-slider">
          </div>
        </div>
        
        <div class="wm-sim-right">
          <div class="wm-sim-stats-grid">
            <div class="wm-sim-metric">
              <div class="wm-sim-metric-val" id="ctr-val">7.2%</div>
              <div class="wm-sim-metric-lbl">Taux de Clic (CTR)</div>
            </div>
            <div class="wm-sim-metric">
              <div class="wm-sim-metric-val" id="traffic-val">360</div>
              <div class="wm-sim-metric-lbl">Visiteurs / mois</div>
            </div>
          </div>
          
          <div class="wm-progress-track">
            <div class="wm-progress-bar" id="seo-progress-indicator"></div>
          </div>
          
          <div class="wm-sim-verdict" id="seo-verdict">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
            <span id="seo-verdict-text">En position 5, vous manquez 93% du marché potentiel. Les premiers captent tout.</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Section Catalogue des Prestations -->
    <div class="wm-catalogue-header">
      <h2 class="wm-catalogue-title">
        Nos Solutions SEO & GÉO sur-mesure
      </h2>
      <p class="wm-catalogue-subtitle">
        Des actions structurées pour transformer votre site internet en un canal d'acquisition automatique et ultra-rentable.
      </p>
    </div>

    <div class="wm-catalogue-grid">
      
      <!-- Prestation 1 : Audit & Technique -->
      <div class="wm-catalogue-card wm-catalogue-card-orange">
        <div class="wm-catalogue-card-icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="22" y1="22" x2="16.65" y2="16.65"></line></svg>
        </div>
        <h3 class="wm-catalogue-card-title">Audit & SEO Technique</h3>
        <p class="wm-catalogue-card-desc">
          L'indexation et la vitesse sont les piliers de votre visibilité. J'analyse l'infrastructure de votre site pour corriger les freins techniques et maximiser le crawl des robots.
        </p>
        <div class="wm-catalogue-features">
          <div class="wm-feature-item">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
            Optimisation du Core Web Vitals
          </div>
          <div class="wm-feature-item">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
            Structuration balisage HTML5 & Schema.org
          </div>
          <div class="wm-feature-item">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
            Indexation sitemap & robots.txt
          </div>
        </div>
      </div>

      <!-- Prestation 2 : Strategie Semantique -->
      <div class="wm-catalogue-card wm-catalogue-card-green">
        <div class="wm-catalogue-card-icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
        </div>
        <h3 class="wm-catalogue-card-title">Contenu d'Autorité (SEO/GÉO)</h3>
        <p class="wm-catalogue-card-desc">
          Les moteurs de recherche et les IA adorent la valeur ajoutée. Nous ciblons les requêtes stratégiques de votre secteur pour rédiger des contenus de référence qui se positionnent naturellement.
        </p>
        <div class="wm-catalogue-features">
          <div class="wm-feature-item">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
            Recherche de mots-clés d'intention
          </div>
          <div class="wm-feature-item">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
            Rédaction optimisée aux standards E-E-A-T
          </div>
          <div class="wm-feature-item">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
            Mise en conformité sémantique pour l'IA
          </div>
        </div>
      </div>

    </div>

    <!-- Section CTA en bas (Design identique à cta.html) -->
    <div class="wms-cta-wrapper">
      <h3 class="wms-cta-title">
        Prêt à dominer les <span class="wms-cta-highlight">moteurs de recherche</span> ?
      </h3>
      <p class="wms-cta-subtitle">
        Bâtissons dès aujourd'hui votre stratégie de référencement naturel (SEO) et préparez votre marque pour la révolution de l'intelligence artificielle (GÉO).
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

<!-- SCRIPT JS DYNAMIQUE POUR LE WOW EFFECT DU SIMULATEUR DE POSITION GOOGLE -->

        ` }} />
      </main>
      
      <FooterPublic />
    </div>
  );
}
