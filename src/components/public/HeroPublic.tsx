'use client';

import React from 'react';

export const HeroPublic: React.FC = () => {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        :root {
        /* Variables isolées pour le Hero */
        --wms-hero-bg: linear-gradient(180deg, #faf6ee 0%, #fdfbf7 100%);
        /* Dégradé sable vers le haut */
        --wms-hero-text-primary: #000000;
        --wms-hero-text-secondary: #5c5c64;
        --wms-hero-orange: #ff4d00;
        --wms-hero-orange-light: #ff7e47;
        --wms-hero-black: #000000;
        --wms-hero-card-bg: #ffffff;
        --wms-hero-border: rgba(15, 15, 17, 0.08);

        --wms-hero-transition: 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    }

    /* Force la police Inter sur le composant Hero et tous ses enfants */
    .wms-hero-wrapper,
    .wms-hero-wrapper *,
    .wms-hero-wrapper h1,
    .wms-hero-wrapper h2,
    .wms-hero-wrapper h3,
    .wms-hero-wrapper h4,
    .wms-hero-wrapper p,
    .wms-hero-wrapper a,
    .wms-hero-wrapper span {
        font-family: 'Inter', sans-serif !important;
    }

    /* Conteneur principal de la section Hero */
    .wms-hero-wrapper {
        max-width: 1400px;
        /* Élargi à 1400px pour PC */
        margin: 60px auto 40px auto;
        background: var(--wms-hero-bg);
        border: 1px solid var(--wms-hero-border);
        border-radius: 32px;
        padding: 60px 48px 80px 48px;
        display: flex;
        flex-direction: column;
        align-items: center;
        overflow: hidden;
        font-family: 'Inter', sans-serif;
        box-sizing: border-box;
        box-shadow:
            0 20px 40px -15px rgba(15, 15, 17, 0.04),
            0 1px 3px rgba(15, 15, 17, 0.02);
    }

    .wms-hero-container {
        max-width: 1400px;
        /* Élargi à 1400px pour PC */
        width: 100%;
        margin: 0 auto;
        text-align: center;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    /* --- EN-TÊTE DU HERO (TEXTE & TITRES) --- */
    .wms-hero-title {
        font-size: clamp(2rem, 3.8vw, 3.4rem);
        font-weight: 800;
        color: var(--wms-hero-text-primary);
        line-height: 1.1;
        letter-spacing: -0.03em;
        max-width: 900px;
        margin: 0 auto 24px auto;
        animation: wmsSlideInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }

    .wms-hero-title span {
        background: linear-gradient(135deg, var(--wms-hero-orange-light) 0%, var(--wms-hero-orange) 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }

    .wms-hero-title span.wms-title-badge {
        background: linear-gradient(135deg, #0FAC71 0%, #1B9476 100%);
        /* Vert croissance */
        -webkit-text-fill-color: #ffffff;
        color: #ffffff;
        padding: 2px 14px;
        border-radius: 12px;
        margin-left: 6px;
        display: inline-block;
        font-size: 0.9em;
        vertical-align: middle;
        box-shadow: 0 4px 12px rgba(15, 172, 113, 0.15);
    }

    .wms-hero-subtitle {
        font-size: clamp(1rem, 2vw, 1.25rem);
        line-height: 1.6;
        color: var(--wms-hero-text-secondary);
        max-width: 680px;
        margin: 0 auto 36px auto;
        animation: wmsSlideInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.15s forwards;
    }

    /* --- BOUTONS D'ACTION (CTA) --- */
    .wms-hero-actions {
        display: flex;
        gap: 16px;
        justify-content: center;
        align-items: center;
        margin-bottom: 64px;
        flex-wrap: wrap;
        opacity: 0;
        transform: translateY(20px);
        animation: wmsFadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.3s forwards;
    }

    .wms-hero-btn {
        display: inline-flex;
        align-items: center;
        gap: 12px;
        padding: 10px 24px 10px 20px;
        border-radius: 9999px;
        font-size: 1rem;
        font-weight: 600;
        text-decoration: none;
        cursor: pointer;
        box-sizing: border-box;
        transition: all var(--wms-hero-transition);
    }

    /* Badge d'icône orange pour le bouton principal */
    .wms-hero-btn-icon-badge {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 28px;
        height: 28px;
        border-radius: 50%;
        background-color: var(--wms-hero-orange);
        color: #ffffff;
        margin-right: -2px;
        box-shadow: 0 2px 8px rgba(224, 83, 0, 0.3);
    }

    /* Badge d'icône orange pour le bouton secondaire */
    .wms-hero-btn-icon-badge-secondary {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 28px;
        height: 28px;
        border-radius: 50%;
        background-color: var(--wms-hero-orange);
        color: #ffffff;
        margin-right: -2px;
        box-shadow: 0 2px 8px rgba(224, 83, 0, 0.2);
    }

    /* Bouton Noir Carbone */
    .wms-hero-btn-primary {
        background-color: var(--wms-hero-black) !important;
        color: #ffffff !important;
        border: 1px solid var(--wms-hero-black) !important;
        box-shadow: 0 4px 20px rgba(12, 12, 14, 0.15);
    }

    .wms-hero-btn-primary:hover {
        background-color: #1a1a20 !important;
        color: #ffffff !important;
        border-color: #1a1a20 !important;
        transform: translateY(-2px);
        box-shadow: 0 8px 30px rgba(12, 12, 14, 0.25);
    }

    /* Bouton Contour Blanc */
    .wms-hero-btn-secondary {
        background-color: transparent !important;
        color: var(--wms-hero-text-primary) !important;
        border: 1px solid var(--wms-hero-border) !important;
    }

    .wms-hero-btn-secondary:hover {
        background-color: rgba(15, 15, 17, 0.03) !important;
        color: var(--wms-hero-text-primary) !important;
        border-color: rgba(15, 15, 17, 0.2) !important;
        transform: translateY(-2px);
    }

    .wms-hero-btn-secondary svg {
        transition: transform var(--wms-hero-transition);
        fill: currentColor;
    }

    .wms-hero-btn-secondary:hover svg {
        transform: scale(1.1);
    }

    /* --- DASHBOARD MOCKUP --- */
    .wms-hero-mockup-container {
        width: 100%;
        max-width: 1000px;
        background-color: var(--wms-hero-card-bg);
        border: 1px solid var(--wms-hero-border);
        border-radius: 20px;
        box-shadow: 0 20px 50px rgba(15, 15, 17, 0.06), 0 4px 12px rgba(15, 15, 17, 0.02);
        padding: 16px;
        box-sizing: border-box;
        position: relative;
        transform: perspective(1000px) rotateX(4deg) translateY(0);
        transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.6s ease;
        opacity: 0;
        animation: wmsFadeInUp 1s cubic-bezier(0.16, 1, 0.3, 1) 0.45s forwards;
    }

    .wms-hero-mockup-container:hover {
        transform: perspective(1000px) rotateX(0deg) translateY(-8px);
        box-shadow: 0 30px 60px rgba(15, 15, 17, 0.12);
    }

    /* Structure Interne du Mockup (SaaS) */
    .wms-mockup-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-bottom: 16px;
        border-bottom: 1px solid var(--wms-hero-border);
        margin-bottom: 16px;
    }

    .wms-mockup-dots {
        display: flex;
        gap: 6px;
    }

    .wms-mockup-dot {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background-color: #cbd5e1;
    }

    .wms-mockup-dot:nth-child(1) {
        background-color: #ef4444;
    }

    .wms-mockup-dot:nth-child(2) {
        background-color: #eab308;
    }

    .wms-mockup-dot:nth-child(3) {
        background-color: #22c55e;
    }

    .wms-mockup-title {
        font-size: 0.8rem;
        color: var(--wms-hero-text-secondary);
        font-weight: 600;
        letter-spacing: 0.05em;
        text-transform: uppercase;
    }

    .wms-mockup-status {
        background-color: rgba(34, 197, 94, 0.1);
        color: #16a34a;
        font-size: 0.75rem;
        font-weight: 600;
        padding: 4px 10px;
        border-radius: 9999px;
        display: flex;
        align-items: center;
        gap: 6px;
    }

    .wms-mockup-status::before {
        content: '';
        width: 6px;
        height: 6px;
        background-color: #22c55e;
        border-radius: 50%;
        display: inline-block;
    }

    /* Grille du Dashboard */
    .wms-mockup-grid {
        display: grid;
        grid-template-columns: 2fr 1fr;
        gap: 16px;
        text-align: left;
    }

    .wms-mockup-card {
        background-color: #fafafb;
        border: 1px solid var(--wms-hero-border);
        border-radius: 12px;
        padding: 20px;
    }

    .wms-card-label {
        font-size: 0.8rem;
        font-weight: 600;
        color: var(--wms-hero-text-secondary);
        margin-bottom: 8px;
        text-transform: uppercase;
        letter-spacing: 0.02em;
    }

    .wms-card-val {
        font-size: 1.8rem;
        font-weight: 800;
        color: var(--wms-hero-text-primary);
        display: flex;
        align-items: baseline;
        gap: 8px;
        margin-bottom: 12px;
    }

    .wms-card-trend {
        font-size: 0.8rem;
        font-weight: 600;
        color: #16a34a;
        background-color: rgba(34, 197, 94, 0.1);
        padding: 2px 8px;
        border-radius: 9999px;
    }

    /* Graphique SEO dessiné en SVG */
    .wms-seo-chart-container {
        width: 100%;
        height: 140px;
        margin-top: 10px;
        position: relative;
    }

    .wms-seo-chart {
        width: 100%;
        height: 100%;
    }

    /* Métriques de droite */
    .wms-mockup-right-pane {
        display: flex;
        flex-direction: column;
        gap: 16px;
    }

    .wms-automation-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: #ffffff;
        border: 1px solid var(--wms-hero-border);
        border-radius: 8px;
        padding: 10px 12px;
        margin-top: 8px;
        font-size: 0.85rem;
    }

    .wms-auto-name {
        font-weight: 500;
        color: var(--wms-hero-text-primary);
        display: flex;
        align-items: center;
        gap: 8px;
    }

    .wms-auto-toggle {
        width: 32px;
        height: 18px;
        background-color: var(--wms-hero-orange);
        border-radius: 9999px;
        position: relative;
        cursor: pointer;
    }

    .wms-auto-toggle::after {
        content: '';
        position: absolute;
        top: 2px;
        right: 2px;
        width: 14px;
        height: 14px;
        background-color: #ffffff;
        border-radius: 50%;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
    }

    /* --- PREUVE SOCIALE (LOGOS) --- */
    .wms-hero-social-proof {
        margin-top: 80px;
        width: 100%;
        opacity: 0;
        animation: wmsFadeIn 1s ease 0.8s forwards;
    }

    .wms-social-label {
        font-size: 0.85rem;
        color: var(--wms-hero-text-secondary);
        font-weight: 500;
        margin-bottom: 24px;
        letter-spacing: 0.05em;
        text-transform: uppercase;
    }

    .wms-social-logos-slider {
        overflow: hidden;
        width: 100%;
        max-width: 680px;
        margin: 0 auto;
        position: relative;
        padding: 10px 0;
        /* Fade gradient effect on edges */
        mask-image: linear-gradient(to right, transparent, #000 15%, #000 85%, transparent);
        -webkit-mask-image: linear-gradient(to right, transparent, #000 15%, #000 85%, transparent);
    }

    .wms-social-logos-track {
        display: flex;
        width: max-content;
        animation: wmsScrollLogos 25s linear infinite;
    }

    .wms-social-logos-track:hover {
        animation-play-state: paused;
    }

    .wms-social-logos-group {
        display: flex;
        align-items: center;
        gap: 64px;
        padding-right: 64px;
    }

    .wms-social-logo {
        display: flex;
        align-items: center;
        justify-content: center;
        transition: transform var(--wms-hero-transition);
    }

    .wms-social-logo:hover {
        transform: scale(1.08);
    }

    .wms-social-logo img {
        height: 38px;
        object-fit: cover;
        opacity: 0.9;
        mix-blend-mode: multiply;
        /* Rend le fond blanc transparent */
        transition: all var(--wms-hero-transition);
    }

    .wms-social-logo:hover img {
        opacity: 1;
    }

    /* Détourages spécifiques pour n'afficher que l'icône/symbole et masquer le nom */
    .wms-logo-meta {
        width: 52px;
        object-position: center;
    }

    .wms-logo-n8n {
        width: 64px;
        object-position: left center;
    }

    .wms-logo-o2switch {
        width: 50px;
        height: 50px !important;
        border-radius: 50%;
        object-fit: cover;
        object-position: center;
    }

    .wms-logo-tech {
        width: 38px;
        object-fit: cover;
        object-position: center;
    }

    .wms-logo-themify {
        width: 80px;
        object-fit: cover;
        object-position: center;
    }

    .wms-logo-yoast {
        width: 38px;
        object-fit: cover;
        object-position: center;
    }

    @keyframes wmsScrollLogos {
        0% {
            transform: translateX(0);
        }

        100% {
            transform: translateX(-50%);
        }
    }

    /* --- ANIMATIONS --- */
    @keyframes wmsFadeInUp {
        0% {
            opacity: 0;
            transform: translateY(20px);
        }

        100% {
            opacity: 1;
            transform: translateY(0);
        }
    }

    /* Variante sans opacity pour le H1/sous-titre (candidats LCP) : évite de retarder
       le paint du texte principal tout en gardant l'effet de glissement. */
    @keyframes wmsSlideInUp {
        0% {
            transform: translateY(20px);
        }

        100% {
            transform: translateY(0);
        }
    }

    @keyframes wmsFadeIn {
        0% {
            opacity: 0;
        }

        100% {
            opacity: 1;
        }
    }

    /* ==========================================================================
           RESPONSIVE MEDIA QUERIES
           ========================================================================== */
    @media (max-width: 768px) {
        .wms-hero-wrapper {
            margin: 40px 16px 20px 16px;
            padding: 40px 24px 60px 24px;
            border-radius: 24px;
        }

        .wms-hero-actions {
            flex-direction: column;
            align-items: center;
            gap: 12px;
            width: 100%;
        }

        .wms-hero-btn {
            width: auto;
            min-width: 260px;
            justify-content: center;
        }

        .wms-mockup-grid {
            grid-template-columns: 1fr;
        }

        .wms-hero-social-proof {
            margin-top: 60px;
        }

        .wms-social-logos-group {
            gap: 80px;
            padding-right: 80px;
        }

        .wms-social-logos-slider {
            max-width: 450px;
            mask-image: linear-gradient(to right, transparent, #000 8%, #000 92%, transparent);
            -webkit-mask-image: linear-gradient(to right, transparent, #000 8%, #000 92%, transparent);
        }
    }
      ` }} />
      
      <div dangerouslySetInnerHTML={{ __html: `
        <!-- Importation de la police Inter unique -->




<!-- ==========================================================================
       CSS DU COMPOSANT HERO (Styles isolés)
       ========================================================================== -->


<!-- ==========================================================================
       HTML DU HERO (Composant Hero)
       ========================================================================== -->
<section class="wms-hero-wrapper">
    <div class="wms-hero-container">
        <!-- Titre Principal -->
        <h1 class="wms-hero-title">
            Attirez plus de clients avec <span>webmoderne</span><span class="wms-title-badge">seo</span>
        </h1>
        <!-- Sous-titre explicatif -->
        <p class="wms-hero-subtitle">
            Agence basée à Grenoble : création de sites internet sur-mesure (Next.js), référencement naturel (SEO) haute
            performance, publicité Meta Ads et automatisations intelligentes pour générer des leads en continu.
        </p>

        <!-- Actions CTA -->
        <div class="wms-hero-actions">
            <a href="/contact" class="wms-hero-btn wms-hero-btn-primary">
                <span class="wms-hero-btn-icon-badge">
                    <svg width="10" height="10" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 3L10 8L5 13" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"
                            stroke-linejoin="round" />
                        <path d="M9 3L14 8L9 13" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"
                            stroke-linejoin="round" />
                    </svg>
                </span>
                Prendre un RDV offert
            </a>
            <a href="/#services" class="wms-hero-btn wms-hero-btn-secondary">
                <span class="wms-hero-btn-icon-badge-secondary">
                    <svg width="10" height="10" viewBox="0 0 16 16" fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M11.596 8.697l-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z" />
                    </svg>
                </span>
                Découvrir nos services
            </a>
        </div>

        <!-- Maquette Application (Dashboard Mockup) -->
        <div class="wms-hero-mockup-container">
            <div class="wms-mockup-header">
                <div class="wms-mockup-dots">
                    <span class="wms-mockup-dot"></span>
                    <span class="wms-mockup-dot"></span>
                    <span class="wms-mockup-dot"></span>
                </div>
                <div class="wms-mockup-title">webmodernseo.co // Client Dashboard</div>
                <div class="wms-mockup-status">Live SEO & Leads</div>
            </div>

            <div class="wms-mockup-grid">
                <!-- Graphique de croissance SEO (Gauche) -->
                <div class="wms-mockup-card">
                    <div class="wms-card-label">Trafic Organique SEO</div>
                    <div class="wms-card-val">
                        84,290 <span
                            style="font-size: 1rem; color: var(--wms-hero-text-secondary); font-weight: 500;">visites/mois</span>
                        <span class="wms-card-trend">+142%</span>
                    </div>
                    <div class="wms-seo-chart-container">
                        <svg class="wms-seo-chart" viewBox="0 0 500 140" preserveAspectRatio="none">
                            <defs>
                                <!-- Dégradé sous la courbe (vert croissance) -->
                                <linearGradient id="chart-area-grad" x1="0%" y1="0%" x2="0%" y2="100%">
                                    <stop offset="0%" stop-color="rgba(15, 172, 113, 0.22)" />
                                    <stop offset="100%" stop-color="rgba(15, 172, 113, 0.0)" />
                                </linearGradient>
                                <!-- Dégradé de tracé de la courbe (Orange -> Vert) -->
                                <linearGradient id="chart-stroke-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stop-color="#ff4d00" />
                                    <stop offset="60%" stop-color="#ff7e47" />
                                    <stop offset="100%" stop-color="#0FAC71" />
                                </linearGradient>
                            </defs>
                            <!-- Courbe de croissance -->
                            <path d="M 0 130 Q 80 110 150 90 T 300 45 T 450 15 L 500 10 L 500 140 L 0 140 Z"
                                fill="url(#chart-area-grad)" />
                            <path d="M 0 130 Q 80 110 150 90 T 300 45 T 450 15 L 500 10" fill="none"
                                stroke="url(#chart-stroke-grad)" stroke-width="3.5" stroke-linecap="round" />

                            <!-- Points interactifs -->
                            <circle cx="150" cy="90" r="5" fill="#ffffff" stroke="#ff4d00" stroke-width="2" />
                            <circle cx="300" cy="45" r="5" fill="#ffffff" stroke="#ff4d00" stroke-width="2" />
                            <circle cx="500" cy="10" r="6" fill="#0FAC71" />
                        </svg>
                    </div>
                </div>

                <!-- Statistiques de leads et automatisations (Droite) -->
                <div class="wms-mockup-right-pane">
                    <div class="wms-mockup-card" style="padding: 16px;">
                        <div class="wms-card-label">Génération de Leads</div>
                        <div class="wms-card-val" style="font-size: 1.5rem; margin-bottom: 4px;">
                            1,482 <span
                                style="font-size: 0.85rem; color: var(--wms-hero-text-secondary); font-weight: 500;">leads
                                ce mois</span>
                        </div>
                        <div
                            style="width: 100%; height: 6px; background-color: #e2e8f0; border-radius: 3px; overflow: hidden; margin-top: 8px;">
                            <div
                                style="width: 82%; height: 100%; background-color: var(--wms-hero-orange); border-radius: 3px;">
                            </div>
                        </div>
                    </div>

                    <div class="wms-mockup-card" style="padding: 16px; flex-grow: 1;">
                        <div class="wms-card-label">Automatisations Actives</div>
                        <div class="wms-automation-item">
                            <span class="wms-auto-name">Formulaire → CRM Slack</span>
                            <span class="wms-auto-toggle"></span>
                        </div>
                        <div class="wms-automation-item" style="margin-top: 8px;">
                            <span class="wms-auto-name">Google Ads → Lead Sync</span>
                            <span class="wms-auto-toggle"></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Ruban Social Proof (Logos d'outils et stacks) -->
        <div class="wms-hero-social-proof">
            <div class="wms-social-label">Technologies & Partenaires clés</div>
            <div class="wms-social-logos-slider">
                <div class="wms-social-logos-track">
                    <!-- Group 1 -->
                    <div class="wms-social-logos-group">
                        <!-- Meta -->
                        <div class="wms-social-logo">
                            <img src="/logo/meta.jpg" class="wms-logo-meta"
                                alt="Meta Logo">
                        </div>
                        <!-- n8n -->
                        <div class="wms-social-logo">
                            <img src="/logo/n8n.jpg" class="wms-logo-n8n"
                                alt="n8n Logo">
                        </div>
                        <!-- o2switch -->
                        <div class="wms-social-logo">
                            <img src="/logo/o2switch.jpeg"
                                class="wms-logo-o2switch" alt="o2switch Logo">
                        </div>
                    </div>
                    <!-- Group 2 (Duplicated for infinite looping) -->
                    <div class="wms-social-logos-group" aria-hidden="true">
                        <!-- Meta -->
                        <div class="wms-social-logo">
                            <img src="/logo/meta.jpg" class="wms-logo-meta"
                                alt="Meta Logo">
                        </div>
                        <!-- n8n -->
                        <div class="wms-social-logo">
                            <img src="/logo/n8n.jpg" class="wms-logo-n8n"
                                alt="n8n Logo">
                        </div>
                        <!-- o2switch -->
                        <div class="wms-social-logo">
                            <img src="/logo/o2switch.jpeg"
                                class="wms-logo-o2switch" alt="o2switch Logo">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
      ` }} />
    </>
  );
};
