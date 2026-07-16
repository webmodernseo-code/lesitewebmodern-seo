import React from 'react';

export const ServicesPublic: React.FC = () => {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        :root {
            /* Variables isolées pour les Services en Mode Clair Chaleureux */
            --wms-srv-bg: linear-gradient(180deg, #fdfbf7 0%, #faf6ee 100%); /* Warm light background */
            --wms-srv-card-bg: #ffffff; /* White card background */
            --wms-srv-text-primary: #000000; /* Anthracite dark text */
            --wms-srv-text-secondary: #5c5c64; /* Slate gray body text */
            --wms-srv-orange: #ff4d00;
            --wms-srv-orange-light: #ff7e47;
            --wms-srv-green: #0FAC71;
            --wms-srv-purple: #8b5cf6;
            --wms-srv-border: rgba(15, 15, 17, 0.08);
            --wms-srv-transition: 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        /* Force la police Inter sur le composant Services et tous ses enfants */
        .wms-services-section,
        .wms-services-section *,
        .wms-services-section h1,
        .wms-services-section h2,
        .wms-services-section h3,
        .wms-services-section h4,
        .wms-services-section p,
        .wms-services-section a,
        .wms-services-section span {
            font-family: 'Inter', sans-serif !important;
        }

        /* Conteneur principal de la section Services */
        .wms-services-section {
            max-width: 1400px;
            width: 100%;
            margin: 0 auto;
            background: var(--wms-srv-bg);
            border: 1px solid var(--wms-srv-border);
            border-radius: 32px;
            padding: 80px 48px;
            box-sizing: border-box;
            font-family: 'Inter', sans-serif;
            color: var(--wms-srv-text-primary);
            box-shadow: 
                0 20px 40px -15px rgba(15, 15, 17, 0.04),
                0 1px 3px rgba(15, 15, 17, 0.02);
            text-align: center;
        }

        .wms-services-container {
            max-width: 1200px;
            width: 100%;
            margin: 0 auto;
        }

        /* --- BADGE / PILL DE SECTION EN HAUT --- */
        .wms-services-top-badge-container {
            display: flex;
            justify-content: center;
            margin-bottom: 24px;
        }

        .wms-services-top-badge {
            font-size: 0.75rem;
            font-weight: 700;
            color: var(--wms-srv-text-secondary);
            letter-spacing: 0.08em;
            text-transform: uppercase;
            background-color: rgba(15, 15, 17, 0.03);
            border: 1px solid rgba(15, 15, 17, 0.08);
            padding: 6px 14px;
            border-radius: 9999px;
            display: inline-flex;
            align-items: center;
            gap: 8px;
        }

        .wms-services-top-badge span {
            color: var(--wms-srv-green);
        }

        /* --- EN-TÊTE DE LA SECTION --- */
        .wms-services-header {
            margin-bottom: 64px;
        }

        .wms-services-title {
            font-size: clamp(2.2rem, 5vw, 3.5rem);
            font-weight: 800;
            color: var(--wms-srv-text-primary);
            line-height: 1.15;
            letter-spacing: -0.03em;
            margin: 0 auto 20px auto;
            max-width: 800px;
        }

        /* Écriture orange pour Web & SEO */
        .wms-services-title span {
            background: linear-gradient(135deg, var(--wms-srv-orange-light) 0%, var(--wms-srv-orange) 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }

        .wms-services-subtitle {
            font-size: clamp(1rem, 1.8vw, 1.15rem);
            line-height: 1.6;
            color: var(--wms-srv-text-secondary);
            max-width: 780px;
            margin: 0 auto;
        }

        /* --- GRILLE DES CARTES DE SERVICES --- */
        .wms-services-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 24px;
            margin-bottom: 48px;
            text-align: center;
        }

        /* Carte de service individuelle */
        .wms-services-card {
            background-color: var(--wms-srv-card-bg);
            border: 1px solid var(--wms-srv-border);
            border-radius: 24px;
            padding: 32px 24px;
            display: flex;
            flex-direction: column;
            align-items: center;
            box-sizing: border-box;
            box-shadow: 0 10px 30px rgba(15, 15, 17, 0.02);
            transition: all var(--wms-srv-transition);
            position: relative;
        }

        /* Accents de bordure supérieure */
        .wms-services-card-orange {
            border-top: 4px solid var(--wms-srv-orange-light);
        }

        .wms-services-card-green {
            border-top: 4px solid var(--wms-srv-green);
        }

        .wms-services-card-purple {
            border-top: 4px solid var(--wms-srv-purple);
        }

        .wms-services-card:hover {
            transform: translateY(-8px);
            box-shadow: 0 20px 40px rgba(15, 15, 17, 0.06);
            border-color: rgba(15, 15, 17, 0.15);
        }

        /* Conteneur d'image */
        .wms-services-card-img-wrapper {
            width: 100%;
            height: 180px;
            border-radius: 16px;
            overflow: hidden;
            margin-bottom: 24px;
            border: 1px solid rgba(15, 15, 17, 0.05);
            background-color: #f5f5f7;
        }

        .wms-services-card-img-wrapper img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            display: block;
            transition: transform var(--wms-srv-transition);
        }

        .wms-services-card:hover .wms-services-card-img-wrapper img {
            transform: scale(1.05);
        }

        .wms-services-card-title {
            font-size: 1.45rem;
            font-weight: 700;
            color: var(--wms-srv-text-primary);
            margin: 0 0 12px 0;
            letter-spacing: -0.01em;
        }

        .wms-services-card-desc {
            font-size: 0.95rem;
            line-height: 1.6;
            color: var(--wms-srv-text-secondary);
            margin: 0 0 24px 0;
            flex-grow: 1; /* Aligne le bouton vers le bas */
        }

        /* --- LIEN EN SAVOIR PLUS --- */
        .wms-services-card-link {
            font-size: 0.95rem;
            font-weight: 600;
            color: var(--wms-srv-text-primary);
            text-decoration: none;
            display: inline-flex;
            align-items: center;
            gap: 6px;
            transition: color var(--wms-srv-transition);
        }

        .wms-services-card-link:hover {
            color: var(--wms-srv-orange);
        }

        .wms-services-card-link span {
            transition: transform var(--wms-srv-transition);
            display: inline-block;
        }

        .wms-services-card-link:hover span {
            transform: translateX(4px);
        }

        /* --- BOUTON DE PIED DE SECTION --- */
        .wms-services-footer-btn-container {
            display: flex;
            justify-content: center;
            margin-bottom: 56px;
        }

        .wms-services-footer-btn {
            background-color: var(--wms-srv-text-primary); /* #000000 */
            color: #ffffff;
            padding: 8px 28px 8px 8px;
            border-radius: 9999px;
            font-size: 1rem;
            font-weight: 700;
            text-decoration: none;
            display: inline-flex;
            align-items: center;
            gap: 16px;
            transition: all var(--wms-srv-transition);
            box-shadow: 0 10px 20px -10px rgba(15, 15, 17, 0.3);
            border: none;
        }

        .wms-services-btn-icon {
            background-color: var(--wms-srv-orange);
            color: #ffffff;
            width: 38px;
            height: 38px;
            border-radius: 12px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            transition: transform var(--wms-srv-transition), background-color var(--wms-srv-transition);
            flex-shrink: 0;
        }

        .wms-services-btn-chevron {
            transition: transform var(--wms-srv-transition);
        }

        .wms-services-btn-text {
            color: #ffffff;
            letter-spacing: -0.01em;
        }

        .wms-services-footer-btn:hover {
            background-color: #1a1a1e;
            transform: translateY(-2px);
            box-shadow: 0 15px 30px -10px rgba(15, 15, 17, 0.4);
        }

        .wms-services-footer-btn:hover .wms-services-btn-icon {
            background-color: var(--wms-srv-orange-light);
            transform: scale(1.05);
        }

        .wms-services-footer-btn:hover .wms-services-btn-chevron {
            transform: translateX(2px);
        }

        /* --- NUAGE DE BADGES / TAGS --- */
        .wms-services-tags {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 12px;
            flex-wrap: wrap;
            max-width: 950px;
            margin: 0 auto;
        }

        .wms-services-tag-badge {
            font-size: 0.82rem;
            padding: 6px 14px;
            border-radius: 9999px;
            display: inline-flex;
            align-items: center;
            gap: 8px;
            transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
            font-weight: 600;
            text-decoration: none;
            background-color: #ffffff;
            border: 1px solid rgba(15, 15, 17, 0.08);
            color: #000000; /* Noir */
            box-shadow: 0 2px 4px rgba(15, 15, 17, 0.01);
            cursor: default;
        }

        /* Tags en mode Orange et Noir */
        .wms-tag-orange span {
            color: var(--wms-srv-orange); /* Orange star */
        }
        .wms-tag-orange:hover {
            background-color: #000000; /* Noir */
            border-color: var(--wms-srv-orange);
            color: var(--wms-srv-orange-light); /* Orange text */
            transform: translateY(-2px);
            box-shadow: 0 8px 20px rgba(224, 83, 0, 0.15);
        }
        .wms-tag-orange:hover span {
            color: var(--wms-srv-orange-light);
        }

        /* Tags avec une touche de Vert (SEO) */
        .wms-tag-green {
            background-color: #ffffff;
            border: 1px solid rgba(15, 15, 17, 0.08);
        }
        .wms-tag-green span {
            color: var(--wms-srv-green); /* Green star */
        }
        .wms-tag-green:hover {
            background-color: #000000; /* Noir */
            border-color: var(--wms-srv-green);
            color: var(--wms-srv-green); /* Green text */
            transform: translateY(-2px);
            box-shadow: 0 8px 20px rgba(15, 172, 113, 0.15);
        }
        .wms-tag-green:hover span {
            color: var(--wms-srv-green);
        }

        /* ==========================================================================
           RESPONSIVE MEDIA QUERIES
           ========================================================================== */
        @media (max-width: 992px) {
            .wms-services-grid {
                grid-template-columns: 1fr; /* Passage sur une seule colonne */
                gap: 32px;
                max-width: 450px;
                margin: 0 auto 40px auto;
            }

            .wms-services-card {
                padding: 32px 24px;
            }
        }

        @media (max-width: 768px) {
            .wms-services-section {
                padding: 60px 24px;
                margin: 40px 16px 20px 16px;
                border-radius: 24px;
            }

            .wms-services-header {
                margin-bottom: 48px;
            }

            .wms-services-tags {
                gap: 8px;
            }

            .wms-services-tag-badge {
                font-size: 0.78rem;
                padding: 5px 12px;
            }
        }
      ` }} />
      
      <div dangerouslySetInnerHTML={{ __html: `
        <!-- Importation de la police Inter unique -->


    <!-- ==========================================================================
       CSS DE LA SECTION SERVICES (À copier dans WordPress / Custom CSS ou Elementor)
       ========================================================================== -->
    

    <!-- ==========================================================================
       HTML DE LA SECTION SERVICES (À copier-coller dans votre élément HTML WordPress)
       ========================================================================== -->
    <section class="wms-services-section">
        <div class="wms-services-container">
            <!-- Badge supérieur -->
            <div class="wms-services-top-badge-container">
                <div class="wms-services-top-badge">
                    <span>✦</span> Nos services
                </div>
            </div>

            <!-- En-tête de la section -->
            <div class="wms-services-header">
                <h2 class="wms-services-title">
                    Solutions <span>Web & SEO</span> d'élite
                </h2>
                <p class="wms-services-subtitle">
                    Grâce à une expertise technique poussée, je crée des solutions sur-mesure de haute qualité qui favorisent la réussite de votre activité et dépassent systématiquement les standards du web.
                </p>
            </div>

            <!-- Grille des Services -->
            <div class="wms-services-grid">

                <!-- Service 1 : Création de Site Web (Orange) -->
                <div class="wms-services-card wms-services-card-orange">
                    <div class="wms-services-card-img-wrapper">
                        <img src="https://webmodernseo.co/wp-content/uploads/2026/06/c2k8vbhynwm.jpg" alt="Création de Site Web">
                    </div>
                    <h3 class="wms-services-card-title">Création de Site Web</h3>
                    <p class="wms-services-card-desc">
                        Création, refonte et maintenance de plateformes haute performance alliant esthétique premium, expérience fluide et architecture robuste pour maximiser vos conversions.
                    </p>
                    <a href="/services/creation-web" class="wms-services-card-link">
                        En savoir plus <span>→</span>
                    </a>
                </div>

                <!-- Service 2 : Référencement SEO (Vert) -->
                <div class="wms-services-card wms-services-card-green">
                    <div class="wms-services-card-img-wrapper">
                        <img src="https://webmodernseo.co/wp-content/uploads/2026/05/c_ry4rm1_b4.jpg" alt="Référencement SEO d'élite">
                    </div>
                    <h3 class="wms-services-card-title">Référencement SEO</h3>
                    <p class="wms-services-card-desc">
                        Dominez les moteurs de recherche grâce à nos stratégies d'optimisation sémantique et technique pour capter un trafic qualifié.
                    </p>
                    <a href="/services/referencement-seo" class="wms-services-card-link">
                        En savoir plus <span>→</span>
                    </a>
                </div>

                <!-- Service 3 : Acquisition Clients (Violet) -->
                <div class="wms-services-card wms-services-card-purple">
                    <div class="wms-services-card-img-wrapper">
                        <img src="https://webmodernseo.co/wp-content/uploads/2026/04/upsef48wagk.jpg" alt="Acquisition Clients Payante">
                    </div>
                    <h3 class="wms-services-card-title">Acquisition Clients</h3>
                    <p class="wms-services-card-desc">
                        Générez des prospects qualifiés immédiatement grâce à des campagnes publicitaires ciblées (Google Ads, Meta) optimisées pour maximiser votre retour sur investissement.
                    </p>
                    <a href="/services/acquisition-clients" class="wms-services-card-link">
                        En savoir plus <span>→</span>
                    </a>
                </div>

            </div>

            <!-- Bouton central -->
            <div class="wms-services-footer-btn-container">
                <a href="/contact" class="wms-services-footer-btn">
                    <span class="wms-services-btn-icon">
                        <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round" class="wms-services-btn-chevron"><polyline points="13 17 18 12 13 7"></polyline><polyline points="6 17 11 12 6 7"></polyline></svg>
                    </span>
                    <span class="wms-services-btn-text">Nous contacter</span>
                </a>
            </div>

            <!-- Nuage de badges de spécialités -->
            <div class="wms-services-tags">
                <div class="wms-services-tag-badge wms-tag-green"><span>✦</span> Audit Technique</div>
                <div class="wms-services-tag-badge wms-tag-orange"><span>✦</span> Performance Blitz</div>
                <div class="wms-services-tag-badge wms-tag-orange"><span>✦</span> UI/UX Design</div>
                <div class="wms-services-tag-badge wms-tag-green"><span>✦</span> Netlinking</div>
                <div class="wms-services-tag-badge wms-tag-orange"><span>✦</span> Stratégie Digitale</div>
                <div class="wms-services-tag-badge wms-tag-orange"><span>✦</span> No-Code Elite</div>
                <div class="wms-services-tag-badge wms-tag-green"><span>✦</span> Growth Hacking</div>
                <div class="wms-services-tag-badge wms-tag-orange"><span>✦</span> Securité des API</div>
            </div>

        </div>
    </section>
      ` }} />
    </>
  );
};
