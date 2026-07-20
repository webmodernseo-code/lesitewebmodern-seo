'use client';

import React, { useEffect } from 'react';
import { HeaderPublic } from '@/components/public/HeaderPublic';
import { FooterPublic } from '@/components/public/FooterPublic';

export default function Page() {
  useEffect(() => {
    try {
      (function() {
    const sliderTraffic = document.getElementById('slider-traffic');
    const sliderValue = document.getElementById('slider-value');
    const toggleAcq = document.getElementById('toggle-acq');

    const valTraffic = document.getElementById('val-traffic');
    const valValue = document.getElementById('val-value');

    const funnelTrafficNum = document.getElementById('funnel-traffic-num');
    const funnelLeadsNum = document.getElementById('funnel-leads-num');
    const funnelSalesNum = document.getElementById('funnel-sales-num');

    const fillTraffic = document.getElementById('funnel-traffic-fill');
    const fillLeads = document.getElementById('funnel-leads-fill');
    const fillSales = document.getElementById('funnel-sales-fill');

    const statConvRate = document.getElementById('stat-conv-rate');
    const statRevenue = document.getElementById('stat-revenue');
    const roiBadge = document.getElementById('roi-badge');

    if (!sliderTraffic || !sliderValue || !toggleAcq) return;

    function formatNumber(num) {
      return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    }

    function updateFunnel() {
      const traffic = parseInt(sliderTraffic.value);
      const clientValue = parseInt(sliderValue.value);
      const isOptimized = toggleAcq.checked;

      // Update text values
      valTraffic.textContent = formatNumber(traffic) + " Visiteurs";
      valValue.textContent = formatNumber(clientValue) + " €";

      // Conversion rates
      // Normal: 1.2% conversion rate, 20% of those closed as customers
      // Optimized: 4.5% conversion rate, 20% of those closed as customers
      const conversionRate = isOptimized ? 4.5 : 1.2;
      const leadsRate = isOptimized ? 10 : 3; // Leads generated are 10% vs 3% of traffic

      const leads = Math.round((traffic * leadsRate) / 100);
      const sales = Math.round((traffic * conversionRate) / 100);
      const revenue = sales * clientValue;

      // Update UI numbers
      funnelTrafficNum.textContent = formatNumber(traffic) + " / mois";
      funnelLeadsNum.textContent = formatNumber(leads) + " Contacts";
      funnelSalesNum.textContent = formatNumber(sales) + " Ventes";

      statConvRate.textContent = conversionRate.toFixed(1) + "%";
      statRevenue.textContent = formatNumber(revenue) + " €";

      // Color coding metrics and badge
      if (isOptimized) {
        statConvRate.style.color = "var(--primary-green)";
        statRevenue.style.color = "var(--primary-green)";
        roiBadge.classList.add('show');
      } else {
        statConvRate.style.color = "var(--primary-orange)";
        statRevenue.style.color = "var(--primary-orange)";
        roiBadge.classList.remove('show');
      }

      // Update fill widths of the bars relative to max values
      // Traffic is always 100% of the bar width
      fillTraffic.style.width = "100%";

      // Leads bar shows conversion level visually
      const maxLeadsPercent = 60;
      const leadsPercent = isOptimized ? 50 : 20;
      fillLeads.style.width = leadsPercent + "%";

      // Sales bar shows close level visually
      const salesPercent = isOptimized ? 25 : 8;
      fillSales.style.width = salesPercent + "%";
    }

    // Event listeners
    sliderTraffic.addEventListener('input', updateFunnel);
    sliderValue.addEventListener('input', updateFunnel);
    toggleAcq.addEventListener('change', updateFunnel);

    // Initial trigger
    updateFunnel();
  })();
    } catch (e) {
      console.error("Error in services/acquisition-clients page script:", e);
    }
  }, []);

  return (
    <div className="relative min-h-screen bg-white text-black overflow-x-hidden font-sans">
      <HeaderPublic />
      
      <main className="w-full pt-24 pb-16">
        <style dangerouslySetInnerHTML={{ __html: `
          /* --- ISOLATION TOTALE DU CSS SERVICE ACQUISITION POUR WORDPRESS --- */
  .wm-acquisition-page {
    --primary-orange:       #ff4d00;
    --primary-orange-light: #ff7e47;
    --primary-green:        #0FAC71;
    --primary-green-light:  #33db88;
    --primary-blue:         #1d4ed8;
    --primary-blue-light:   #3b82f6;
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
  .wm-acquisition-page *,
  .wm-acquisition-page *::before,
  .wm-acquisition-page *::after {
    box-sizing: border-box;
    font-family: 'Inter', sans-serif !important;
  }

  /* Lueur d'ambiance bleue (haut gauche) */
  .wm-acquisition-page::before {
    content: '';
    position: absolute;
    top: -5%;
    left: -5%;
    width: 700px;
    height: 700px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(29, 78, 216, 0.03) 0%, transparent 70%);
    filter: blur(100px);
    pointer-events: none;
    z-index: 0;
  }

  /* Lueur d'ambiance orange (bas droite) */
  .wm-acquisition-page::after {
    content: '';
    position: absolute;
    bottom: -5%;
    right: -5%;
    width: 700px;
    height: 700px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(224, 83, 0, 0.03) 0%, transparent 70%);
    filter: blur(100px);
    pointer-events: none;
    z-index: 0;
  }

  /* ── CONTENEUR PRINCIPAL ── */
  .wm-acq-container {
    max-width: 1240px;
    width: 100%;
    margin: 0 auto;
    position: relative;
    z-index: 2;
  }

  /* ── BADGE SUPERIEUR ── */
  .wm-acq-badge {
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

  .wm-acq-badge-dot {
    width: 6px;
    height: 6px;
    background: var(--primary-orange);
    border-radius: 50%;
    box-shadow: 0 0 8px var(--primary-orange);
  }

  /* ── ENTÊTE HERO ── */
  .wm-acq-header {
    text-align: center;
    margin-bottom: 80px;
  }

  .wm-acq-title {
    font-size: clamp(32px, 5.5vw, 54px);
    font-weight: 800;
    line-height: 1.12;
    letter-spacing: -0.03em;
    color: var(--text) !important;
    max-width: 950px;
    margin: 0 auto 24px;
  }

  .wm-acq-title span.fancy-underline {
    position: relative;
    display: inline-block;
    white-space: nowrap;
  }

  .wm-acq-title span.fancy-underline::after {
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

  .wm-acq-subtitle {
    font-size: clamp(16px, 2.2vw, 20px);
    line-height: 1.6;
    color: var(--text-dim);
    max-width: 820px;
    margin: 0 auto;
    font-weight: 500;
  }

  /* ── SECTIONS SPLIT (ARGUMENTAIRE & IMAGE) ── */
  .wm-acq-split-section {
    display: grid;
    grid-template-columns: 1fr;
    gap: 48px;
    margin-bottom: 96px;
    align-items: center;
  }

  @media (min-width: 992px) {
    .wm-acq-split-section {
      grid-template-columns: 1.15fr 1fr;
      gap: 72px;
    }
  }

  .wm-acq-content {
    display: flex;
    flex-direction: column;
  }

  .wm-acq-headline {
    font-size: clamp(26px, 3.8vw, 36px);
    font-weight: 800;
    line-height: 1.2;
    letter-spacing: -0.02em;
    color: var(--text);
    margin: 0 0 20px 0;
  }

  .wm-acq-headline span {
    color: var(--primary-orange);
  }

  .wm-acq-text {
    font-size: 16px;
    line-height: 1.68;
    color: var(--text-dim);
    margin: 0 0 24px 0;
  }

  .wm-acq-quote {
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
  .wm-acq-image-column {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    width: 100%;
  }

  .wm-acq-image-wrapper {
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

  .wm-acq-image-wrapper::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 28px;
    padding: 1.5px;
    background: linear-gradient(135deg, rgba(224, 83, 0, 0.2) 0%, transparent 50%, rgba(29, 78, 216, 0.15) 100%);
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    pointer-events: none;
  }

  .wm-acq-image-wrapper:hover {
    transform: translateY(-4px) scale(1.01) rotate(0.5deg);
  }

  .wm-acq-img {
    width: 100%;
    height: auto;
    aspect-ratio: 4/3;
    object-fit: cover;
    border-radius: 20px;
    display: block;
    border: 1px solid rgba(15, 15, 17, 0.03);
  }

  /* Points de déco d'arrière-plan */
  .wm-acq-image-deco {
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

  .wm-acq-image-badge {
    position: absolute;
    bottom: 24px;
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

  .wm-acq-image-badge-dot {
    width: 6px;
    height: 6px;
    background: var(--primary-green);
    border-radius: 50%;
    box-shadow: 0 0 8px var(--primary-green);
    animation: wmPulseGreenDot 2s infinite;
  }

  /* ── WIDGET INTERACTIF : SIMULATEUR DE TUNNEL DE CONVERSION (WOW ROI EFFECT) ── */
  .wm-funnel-card {
    background: var(--card-bg);
    border: 1px solid var(--card-border);
    backdrop-filter: blur(16px);
    border-radius: 32px;
    padding: 40px;
    box-shadow: var(--glass-glow);
    margin-bottom: 96px;
    width: 100%;
    position: relative;
    border-top: 1px solid rgba(255, 255, 255, 0.6);
  }

  .wm-funnel-header {
    text-align: center;
    margin-bottom: 36px;
  }

  .wm-funnel-header h3 {
    font-size: 26px;
    font-weight: 800;
    margin: 0 0 8px 0;
    letter-spacing: -0.02em;
  }

  .wm-funnel-header h3 span {
    color: var(--primary-orange);
  }

  .wm-funnel-header p {
    font-size: 14.5px;
    color: var(--text-dim);
    margin: 0;
  }

  .wm-funnel-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 40px;
    align-items: flex-start;
  }

  @media (min-width: 992px) {
    .wm-funnel-grid {
      grid-template-columns: 1fr 1.15fr;
      gap: 56px;
    }
  }

  /* Conteneur curseurs (Gauche) */
  .wm-funnel-inputs {
    display: flex;
    flex-direction: column;
    gap: 28px;
  }

  .wm-funnel-input-group {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .wm-funnel-input-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .wm-funnel-input-label {
    font-size: 14px;
    font-weight: 700;
    color: var(--text);
  }

  .wm-funnel-input-val {
    font-size: 15px;
    font-weight: 800;
    color: var(--primary-orange);
    background: rgba(224, 83, 0, 0.05);
    padding: 4px 10px;
    border-radius: 8px;
  }

  .wm-acq-slider {
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

  .wm-acq-slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 22px;
    height: 22px;
    border-radius: 50%;
    background: var(--primary-orange);
    cursor: pointer;
    box-shadow: 0 0 0 4px rgba(224, 83, 0, 0.1), 0 4px 10px rgba(15, 15, 17, 0.08);
    transition: transform 0.2s;
  }

  .wm-acq-slider::-webkit-slider-thumb:hover {
    transform: scale(1.15);
    background: var(--primary-orange-light);
  }

  /* Commutateur optimisation d'acquisition */
  .wm-toggle-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px;
    background: #ffffff;
    border: 1px solid rgba(15, 15, 17, 0.05);
    border-radius: 20px;
    margin-top: 12px;
    box-shadow: 0 4px 12px rgba(15, 15, 17, 0.01);
  }

  .wm-toggle-info {
    display: flex;
    flex-direction: column;
    gap: 3px;
  }

  .wm-toggle-title {
    font-size: 14.5px;
    font-weight: 800;
    color: var(--text);
  }

  .wm-toggle-desc {
    font-size: 12px;
    color: var(--text-dim);
  }

  .wm-switch {
    position: relative;
    display: inline-block;
    width: 52px;
    height: 28px;
    flex-shrink: 0;
  }

  .wm-switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  .wm-switch-slider {
    position: absolute;
    cursor: pointer;
    inset: 0;
    background-color: #cbd5e1;
    transition: .3s cubic-bezier(0.16, 1, 0.3, 1);
    border-radius: 34px;
  }

  .wm-switch-slider::before {
    position: absolute;
    content: "";
    height: 20px;
    width: 20px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    transition: .3s cubic-bezier(0.16, 1, 0.3, 1);
    border-radius: 50%;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }

  input:checked + .wm-switch-slider {
    background-color: var(--primary-green);
  }

  input:checked + .wm-switch-slider::before {
    transform: translateX(24px);
  }

  /* Visualiseur Tunnel (Droite) */
  .wm-funnel-visual {
    background: #ffffff;
    border: 1px solid rgba(15, 15, 17, 0.04);
    border-radius: 24px;
    padding: 32px;
    box-shadow: inset 0 2px 8px rgba(15, 15, 17, 0.01);
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  /* Les barres de l'entonnoir */
  .wm-funnel-bars {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    width: 100%;
    padding: 10px 0;
  }

  .wm-funnel-row {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
    position: relative;
  }

  .wm-funnel-label-row {
    width: 100%;
    display: flex;
    justify-content: space-between;
    font-size: 11.5px;
    font-weight: 700;
    color: var(--text-dim);
  }

  .wm-funnel-bar-track {
    width: 100%;
    height: 26px;
    background: rgba(15, 15, 17, 0.03);
    border-radius: 8px;
    overflow: hidden;
    position: relative;
  }

  .wm-funnel-bar-fill {
    height: 100%;
    border-radius: 8px;
    transition: width 0.6s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.4s ease;
  }

  /* Couleurs par niveau */
  #funnel-traffic-fill {
    background: linear-gradient(90deg, var(--primary-blue-light) 0%, var(--primary-blue) 100%);
  }

  #funnel-leads-fill {
    background: linear-gradient(90deg, var(--primary-orange-light) 0%, var(--primary-orange) 100%);
  }

  #funnel-sales-fill {
    background: linear-gradient(90deg, var(--primary-green-light) 0%, var(--primary-green) 100%);
  }

  /* Statistiques de performance en bas */
  .wm-funnel-stats {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
    border-top: 1px solid rgba(15, 15, 17, 0.05);
    padding-top: 24px;
  }

  .wm-funnel-stat-box {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .wm-funnel-stat-lbl {
    font-size: 11px;
    font-weight: 700;
    color: var(--text-dim);
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .wm-funnel-stat-val {
    font-size: 24px;
    font-weight: 800;
    color: var(--text);
    line-height: 1.1;
    transition: color 0.3s ease;
  }

  .wm-funnel-stat-val.highlight-green {
    color: var(--primary-green);
    text-shadow: 0 0 10px rgba(15, 172, 113, 0.05);
  }

  /* Badge ROI flottant */
  .wm-roi-badge {
    position: absolute;
    top: -16px;
    right: -16px;
    background: var(--primary-green);
    color: #ffffff;
    font-size: 12px;
    font-weight: 800;
    padding: 6px 14px;
    border-radius: 99px;
    box-shadow: 0 8px 20px rgba(15, 172, 113, 0.3);
    opacity: 0;
    transform: scale(0.8);
    transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  .wm-roi-badge.show {
    opacity: 1;
    transform: scale(1);
  }

  /* ── SECTION LES TROIS PILIERS D'ACQUISITION ── */
  .wm-pil-header {
    text-align: center;
    margin-bottom: 56px;
  }

  .wm-pil-title {
    font-size: clamp(26px, 3.8vw, 36px);
    font-weight: 800;
    margin-bottom: 16px;
    letter-spacing: -0.02em;
  }

  .wm-pil-subtitle {
    font-size: 16.5px;
    color: var(--text-dim);
    max-width: 650px;
    margin: 0 auto;
  }

  .wm-pil-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 28px;
    margin-bottom: 96px;
  }

  @media (min-width: 768px) {
    .wm-pil-grid {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  .wm-pil-card {
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

  .wm-pil-card::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background: transparent;
    transition: background-color 0.3s ease;
  }

  .wm-pil-card:hover {
    transform: translateY(-8px) scale(1.01);
    box-shadow: 0 30px 60px -20px rgba(15, 15, 17, 0.06);
    border-color: rgba(15, 15, 17, 0.12);
  }

  .wm-pil-card-blue:hover::after { background: var(--primary-blue); }
  .wm-pil-card-orange:hover::after { background: var(--primary-orange); }
  .wm-pil-card-green:hover::after { background: var(--primary-green); }

  .wm-pil-card-icon {
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

  .wm-pil-card-blue .wm-pil-card-icon { color: var(--primary-blue); background: rgba(29, 78, 216, 0.05); }
  .wm-pil-card-orange .wm-pil-card-icon { color: var(--primary-orange); background: rgba(224, 83, 0, 0.05); }
  .wm-pil-card-green .wm-pil-card-icon { color: var(--primary-green); background: rgba(15, 172, 113, 0.05); }

  .wm-pil-card:hover .wm-pil-card-icon {
    transform: scale(1.05);
  }
  .wm-pil-card-blue:hover .wm-pil-card-icon { background: var(--primary-blue); color: #ffffff; }
  .wm-pil-card-orange:hover .wm-pil-card-icon { background: var(--primary-orange); color: #ffffff; }
  .wm-pil-card-green:hover .wm-pil-card-icon { background: var(--primary-green); color: #ffffff; }

  .wm-pil-card-title {
    font-size: 19px;
    font-weight: 700;
    color: var(--text);
    margin: 0 0 12px 0;
  }

  .wm-pil-card-desc {
    font-size: 14px;
    line-height: 1.6;
    color: var(--text-dim);
    margin: 0 0 24px 0;
    flex-grow: 1;
  }

  .wm-acq-link {
    color: var(--primary-orange) !important;
    text-decoration: none !important;
    border-bottom: 1.5px solid rgba(224, 83, 0, 0.3) !important;
    transition: all 0.2s ease !important;
    font-weight: 600 !important;
  }
  .wm-acq-link:hover {
    color: var(--primary-orange-light) !important;
    border-bottom-color: var(--primary-orange-light) !important;
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
  @keyframes wmPulseGreenDot {
    0% { box-shadow: 0 0 0 0 rgba(15, 172, 113, 0.7); }
    70% { box-shadow: 0 0 0 8px rgba(15, 172, 113, 0); }
    100% { box-shadow: 0 0 0 0 rgba(15, 172, 113, 0); }
  }

  @media (max-width: 768px) {
    .wm-acquisition-page {
      padding: 65px 16px;
    }
    .wm-funnel-card {
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
        ` }} />
        
        <div dangerouslySetInnerHTML={{ __html: `
          <!-- 
  ==========================================================================
  CONFIGURATION SEO POUR CETTE PAGE (Next.js Metadata)
  ==========================================================================
  
  ✦ SLUG (Permalien) :
    acquisition-clients
    
  ✦ TITRE SEO (Title Tag) :
    Acquisition de Nouveaux Clients & Conversion Web | WebModernSEO
    
  ✦ META DESCRIPTION :
    Maximilisez le retour sur investissement (ROI) de votre site : Jean-Prosper MONE conçoit vos tunnels de conversion, landing pages et stratégies d'acquisition de clients.
    
  ✦ MOTS-CLÉS CIBLES (Focus Keywords) :
    acquisition de nouveaux clients, tunnel de conversion, retour sur investissement web, croissance chiffre d'affaires, conversion prospects
    
  ✦ BALISES DE PARTAGE SOCIAL (Open Graph) :
    - og:title       : Acquisition de Nouveaux Clients & Conversion Web | WebModernSEO
    - og:description : Transformez vos visiteurs passifs en clients réguliers grâce à un tunnel de vente optimisé pour la performance et le design.
    - og:image       : /images/services/upsef48wagk.jpg
  
  ==========================================================================
-->
<!-- Import de la police Inter (sécurité si non présent dans le parent) -->

<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>




<section class="wm-acquisition-page" id="acquisition-clients">
  <div class="wm-acq-container">
    
    <!-- En-tête Hero -->
    <div class="wm-acq-header">
      <div class="wm-acq-badge">
        <span class="wm-acq-badge-dot"></span> Croissance & Performance
      </div>
      <h1 className="wm-acq-title">
        Acquisition de <span class="fancy-underline">Nouveaux Clients.</span>
      </h1>
      <p class="wm-acq-subtitle">
        Avoir un beau site internet ne suffit plus. Transformez votre présence digitale en une machine d'acquisition automatique et ultra-rentable.
      </p>
    </div>

    <!-- Section Argumentaire Actif -->
    <div class="wm-acq-split-section">
      <div class="wm-acq-content">
        <h2 class="wm-acq-headline">
          Un site web sans acquisition de client est <span>une boutique invisible.</span>
        </h2>
        <p class="wm-acq-text">
          Chaque jour, des centaines de leads potentiels visitent des plateformes en ligne. Si votre site n'est pas structurellement conçu pour capter leur attention, créer un climat de confiance et inciter à l'action immédiate, vous offrez ces opportunités à vos concurrents directs.
        </p>
        <div class="wm-acq-quote">
          « L'acquisition n'est pas un hasard technique. C'est l'alignement d'un design premium, d'un copywriting persuasif et d'une fluidité d'utilisation absolue. »
        </div>
        <p class="wm-acq-text">
          Ingénieur de formation, j'analyse le parcours utilisateur de vos visiteurs pour éliminer les freins à la conversion. En combinant la puissance de la <a href="/services/creation-web" class="wm-acq-link">création web sur-mesure</a> et de l'<a href="/services/referencement-seo" class="wm-acq-link">optimisation SEO technique</a>, nous bâtissons des tunnels de conversion qui multiplient votre nombre de clients.
        </p>
      </div>

      <!-- Colonne Image Showcase premium -->
      <div class="wm-acq-image-column">
        <div class="wm-acq-image-wrapper">
          <img src="/images/services/upsef48wagk.jpg" alt="Acquisition de Nouveaux Clients" class="wm-acq-img">
          <div class="wm-acq-image-deco"></div>
          <div class="wm-acq-image-badge">
            <span class="wm-acq-image-badge-dot"></span> ROI Certifié
          </div>
        </div>
      </div>
    </div>

    <!-- WIDGET INTERACTIF : SIMULATEUR DE TUNNEL DE VENTE & ROI (WOW EFFECT) -->
    <div class="wm-funnel-card">
      <div class="wm-roi-badge" id="roi-badge">ROI Boosté !</div>
      <div class="wm-funnel-header">
        <h3>Simulateur de <span>Tunnel de Conversion</span></h3>
        <p>Visualisez l'impact immédiat d'une stratégie d'acquisition sur votre chiffre d'affaires mensuel.</p>
      </div>

      <div class="wm-funnel-grid">
        <!-- Sliders (Gauche) -->
        <div class="wm-funnel-inputs">
          
          <!-- Slider Trafic -->
          <div class="wm-funnel-input-group">
            <div class="wm-funnel-input-header">
              <span class="wm-funnel-input-label">Trafic Mensuel</span>
              <span class="wm-funnel-input-val" id="val-traffic">2 000 Visiteurs</span>
            </div>
            <input type="range" min="500" max="15000" step="500" value="2000" class="wm-acq-slider" id="slider-traffic">
          </div>

          <!-- Slider Panier Moyen -->
          <div class="wm-funnel-input-group">
            <div class="wm-funnel-input-header">
              <span class="wm-funnel-input-label">Valeur d'un Client (Panier Moyen)</span>
              <span class="wm-funnel-input-val" id="val-value">250 €</span>
            </div>
            <input type="range" min="50" max="2000" step="50" value="250" class="wm-acq-slider" id="slider-value">
          </div>

          <!-- Toggle Acquisition Engine -->
          <div class="wm-toggle-container">
            <div class="wm-toggle-info">
              <span class="wm-toggle-title">Optimisation d'Acquisition</span>
              <span class="wm-toggle-desc">Taux de conversion : 1.2% ➔ 4.5%</span>
            </div>
            <label class="wm-switch">
              <input type="checkbox" id="toggle-acq" checked>
              <span class="wm-switch-slider"></span>
            </label>
          </div>

        </div>

        <!-- Visualisation de l'entonnoir (Droite) -->
        <div class="wm-funnel-visual">
          <div class="wm-funnel-bars">
            
            <!-- Ligne 1 : Trafic -->
            <div class="wm-funnel-row">
              <div class="wm-funnel-label-row">
                <span>1. Visiteurs qualifiés</span>
                <span id="funnel-traffic-num">2 000 / mois</span>
              </div>
              <div class="wm-funnel-bar-track">
                <div class="wm-funnel-bar-fill" id="funnel-traffic-fill" style="width: 100%;"></div>
              </div>
            </div>

            <!-- Ligne 2 : Leads / Contacts -->
            <div class="wm-funnel-row">
              <div class="wm-funnel-label-row">
                <span>2. Prospects générés</span>
                <span id="funnel-leads-num">90 Contacts</span>
              </div>
              <div class="wm-funnel-bar-track">
                <div class="wm-funnel-bar-fill" id="funnel-leads-fill" style="width: 45%;"></div>
              </div>
            </div>

            <!-- Ligne 3 : Ventes / Clients -->
            <div class="wm-funnel-row">
              <div class="wm-funnel-label-row">
                <span>3. Nouveaux clients</span>
                <span id="funnel-sales-num">18 Ventes</span>
              </div>
              <div class="wm-funnel-bar-track">
                <div class="wm-funnel-bar-fill" id="funnel-sales-fill" style="width: 18%;"></div>
              </div>
            </div>

          </div>

          <!-- Statistiques de ROI -->
          <div class="wm-funnel-stats">
            <div class="wm-funnel-stat-box">
              <span class="wm-funnel-stat-lbl">Taux de Conversion</span>
              <span class="wm-funnel-stat-val" id="stat-conv-rate">4.5%</span>
            </div>
            <div class="wm-funnel-stat-box">
              <span class="wm-funnel-stat-lbl">CA Généré / mois</span>
              <span class="wm-funnel-stat-val highlight-green" id="stat-revenue">4 500 €</span>
            </div>
          </div>
        </div>

      </div>
    </div>

    <!-- SECTION LES TROIS PILIERS DE LA CONVERSION -->
    <div class="wm-pil-header">
      <h2 class="wm-pil-title">
        Mes Piliers pour Multiplier vos Ventes
      </h2>
      <p class="wm-pil-subtitle">
        Une méthodologie scientifique combinant psychologie d'achat et ingénierie de données pour maximiser vos résultats.
      </p>
    </div>

    <div class="wm-pil-grid">
      
      <!-- Pilier 1 : Copywriting -->
      <div class="wm-pil-card wm-pil-card-blue">
        <div class="wm-pil-card-icon">✍️</div>
        <h3 class="wm-pil-card-title">Copywriting Persuasif</h3>
        <p class="wm-pil-card-desc">
          Les mots vendent. Je rédige des textes percutants qui captent l'attention de votre cible, résolvent ses doutes et la guident naturellement vers l'action.
        </p>
      </div>

      <!-- Pilier 2 : Landing Pages -->
      <div class="wm-pil-card wm-pil-card-orange">
        <div class="wm-pil-card-icon">⚡</div>
        <h3 class="wm-pil-card-title">Landing Pages Premium</h3>
        <p class="wm-pil-card-desc">
          Des pages de destination épurées, ultra-rapides et entièrement optimisées pour un objectif unique : transformer le clic en prise de rendez-vous ou achat.
        </p>
      </div>

      <!-- Pilier 3 : Analytics & A/B testing -->
      <div class="wm-pil-card wm-pil-card-green">
        <div class="wm-pil-card-icon">📈</div>
        <h3 class="wm-pil-card-title">Analyse & Optimisation</h3>
        <p class="wm-pil-card-desc">
          Ce qui est mesuré s'améliore. Grâce aux études de conversion de référence (comme les données de conversion de <a href="https://blog.hubspot.fr/marketing/taux-de-conversion" class="wm-acq-link" target="_blank">HubSpot</a>), nous testons et ajustons chaque élément pour accroître en continu votre ROI.
        </p>
      </div>

    </div>

    <!-- Section CTA en bas (Design identique à cta.html) -->
    <div class="wms-cta-wrapper">
      <h3 class="wms-cta-title">
        Prêt à multiplier votre <span class="wms-cta-highlight">nombre de clients</span> ?
      </h3>
      <p class="wms-cta-subtitle">
        Bâtissons dès aujourd'hui votre tunnel de conversion personnalisé et commencez à attirer des leads qualifiés prêts à acheter vos services.
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

<!-- SCRIPT JS INTERACTIF DU WIDGET ROI FUNNEL -->

        ` }} />
      </main>
      
      <FooterPublic />
    </div>
  );
}
