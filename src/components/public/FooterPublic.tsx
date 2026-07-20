import React from 'react';

export const FooterPublic: React.FC = () => {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        :root {
            /* Variables CSS isolées pour Webmodernseo */
            --wms-footer-bg: linear-gradient(180deg, #faf6ee 0%, #fdfbf7 100%);
            --wms-footer-brand-orange: #ff4d00;
            --wms-footer-brand-orange-light: #ff7e47;
            --wms-footer-text-primary: #000000;
            --wms-footer-text-secondary: #5c5c64;
            --wms-footer-border: rgba(15, 15, 17, 0.08);
            --wms-footer-transition: 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .dark .wms-footer-wrapper,
        html.dark .wms-footer-wrapper,
        body.dark .wms-footer-wrapper {
            --wms-footer-bg: linear-gradient(180deg, #050609 0%, #0d0f17 100%);
            --wms-footer-text-primary: #ffffff;
            --wms-footer-text-secondary: #94a3b8;
            --wms-footer-border: rgba(255, 255, 255, 0.08);
        }

        /* Encapsulation complète sous le sélecteur .wms-footer-wrapper pour éviter les conflits */
        .wms-footer-wrapper {
            max-width: 1400px;
            margin: 80px auto 40px auto;
            background: var(--wms-footer-bg);
            border: 1px solid var(--wms-footer-border);
            border-radius: 32px;
            padding: 48px 36px 32px 36px;
            font-family: 'Inter', sans-serif;
            color: var(--wms-footer-text-secondary);
            box-sizing: border-box;
            box-shadow:
                0 30px 60px -20px rgba(0, 0, 0, 0.4),
                0 1px 3px rgba(0, 0, 0, 0.2);
        }

        .wms-footer-wrapper *,
        .wms-footer-wrapper h1,
        .wms-footer-wrapper h2,
        .wms-footer-wrapper h3,
        .wms-footer-wrapper h4,
        .wms-footer-wrapper p,
        .wms-footer-wrapper a,
        .wms-footer-wrapper span,
        .wms-footer-wrapper li {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
            list-style: none;
            text-decoration: none;
            font-family: 'Inter', sans-serif !important;
        }

        .wms-footer-container {
            max-width: 1400px;
            margin: 0 auto;
        }

        /* --- GRID FOOTER --- */
        .wms-footer-grid {
            display: grid;
            grid-template-columns: 2fr 1fr 1.2fr 1.3fr;
            gap: 48px;
            margin-bottom: 60px;
        }

        /* Colonne 1 : Brand & Logo */
        .wms-footer-brand {
            display: flex;
            flex-direction: column;
            gap: 20px;
        }

        .wms-footer-logo-link {
            display: inline-flex;
            align-items: center;
            gap: 12px;
        }

        .wms-footer-logo-text {
            font-size: 1.4rem;
            font-weight: 800;
            color: var(--wms-footer-text-primary);
            letter-spacing: -0.03em;
            text-transform: lowercase;
        }

        .wms-footer-logo-accent {
            color: var(--wms-footer-brand-orange);
        }

        .wms-footer-desc {
            font-size: 0.95rem;
            line-height: 1.6;
            max-width: 320px;
            color: var(--wms-footer-text-secondary);
        }

        /* Réseaux Sociaux */
        .wms-footer-socials {
            display: flex;
            gap: 12px;
            margin-top: 8px;
        }

        .wms-social-icon {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 38px;
            height: 38px;
            border-radius: 50%;
            background-color: rgba(255, 255, 255, 0.03);
            border: 1px solid var(--wms-footer-border);
            color: var(--wms-footer-text-secondary);
            transition: all var(--wms-footer-transition);
        }

        .wms-social-icon:hover {
            border-color: var(--wms-footer-brand-orange-light);
            color: #ffffff;
            background-color: var(--wms-footer-brand-orange);
            transform: translateY(-3px);
            box-shadow: 0 4px 15px rgba(224, 83, 0, 0.4);
        }

        .wms-social-icon svg {
            width: 18px;
            height: 18px;
        }

        /* Colonnes Communes : Titres & Liens */
        .wms-footer-col h4 {
            font-size: 1rem;
            font-weight: 700;
            color: var(--wms-footer-text-primary);
            text-transform: uppercase;
            letter-spacing: 1.5px;
            margin-bottom: 24px;
        }

        .wms-footer-links {
            display: flex;
            flex-direction: column;
            gap: 14px;
        }

        .wms-footer-link-item a {
            font-size: 0.95rem;
            color: var(--wms-footer-text-secondary);
            display: inline-flex;
            align-items: center;
            transition: all var(--wms-footer-transition);
        }

        .wms-footer-link-item a:hover {
            color: var(--wms-footer-brand-orange);
            transform: translateX(4px);
        }

        /* Colonne Contact Spécifique */
        .wms-contact-list {
            display: flex;
            flex-direction: column;
            gap: 16px;
        }

        .wms-contact-item {
            display: flex;
            align-items: flex-start;
            gap: 12px;
            font-size: 0.95rem;
            line-height: 1.5;
        }

        .wms-contact-item svg {
            width: 18px;
            height: 18px;
            color: var(--wms-footer-brand-orange);
            flex-shrink: 0;
            margin-top: 3px;
        }

        .wms-contact-item a {
            color: var(--wms-footer-text-secondary);
            transition: color var(--wms-footer-transition);
        }

        .wms-contact-item a:hover {
            color: var(--wms-footer-brand-orange);
        }

        /* --- BARRE DE COPYRIGHT & PAGES POLITIQUES --- */
        .wms-footer-bottom {
            border-top: 1px solid var(--wms-footer-border);
            padding-top: 32px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            gap: 20px;
        }

        .wms-footer-copyright {
            font-size: 0.88rem;
            color: var(--wms-footer-text-secondary);
        }

        .wms-footer-policy-links {
            display: flex;
            gap: 24px;
            flex-wrap: wrap;
        }

        .wms-footer-policy-links a {
            font-size: 0.88rem;
            color: var(--wms-footer-text-secondary);
            transition: color var(--wms-footer-transition);
        }

        .wms-footer-policy-links a:hover {
            color: var(--wms-footer-brand-orange);
        }

        /* ==========================================================================
           RESPONSIVE MEDIA QUERIES
           ========================================================================== */
        @media (max-width: 960px) {
            .wms-footer-grid {
                grid-template-columns: 1.2fr 1fr;
                gap: 40px;
            }
        }

        @media (max-width: 600px) {
            .wms-footer-wrapper {
                margin: 40px 16px 20px 16px;
                padding: 32px 20px 24px 20px;
                border-radius: 24px;
            }

            .wms-footer-grid {
                grid-template-columns: 1fr;
                gap: 36px;
                margin-bottom: 40px;
            }

            .wms-footer-col h4 {
                margin-bottom: 16px;
            }

            .wms-footer-bottom {
                flex-direction: column;
                align-items: flex-start;
                gap: 16px;
                padding-top: 24px;
            }

            .wms-footer-policy-links {
                flex-direction: column;
                gap: 12px;
            }
        }
      ` }} />
      
      <div dangerouslySetInnerHTML={{ __html: `
        <!-- Importation de la police Inter unique -->


    <!-- ==========================================================================
       CSS DU COMPOSANT FOOTER (À copier dans WordPress / Custom CSS ou Elementor)
       ========================================================================== -->
    

    <!-- ==========================================================================
       HTML DU FOOTER (À copier-coller dans votre élément HTML WordPress)
       ========================================================================== -->
    <footer class="wms-footer-wrapper">
        <div class="wms-footer-container">
            <div class="wms-footer-grid">
                <!-- Colonne 1 : Brand & Description -->
                <div class="wms-footer-brand">
                    <a href="/" class="wms-footer-logo-link" aria-label="Accueil">
                        <!-- Mini version simplifiée du logo orange du Header -->
                        <svg width="28" height="28" viewBox="0 0 100 100" style="overflow: visible;">
                            <rect x="5" y="5" width="90" height="90" rx="22" fill="var(--wms-footer-brand-orange)" />
                            <polygon points="20,28 42,28 42,76 25,76 21,58 27,58" fill="#ffffff" />
                            <polygon points="58,28 80,28 70,76 58,76" fill="#ffffff" />
                            <polygon points="41,66 59,66 50,46" fill="#ffffff" />
                        </svg>
                        <span class="wms-footer-logo-text">webmodern<span
                                class="wms-footer-logo-accent">seo</span></span>
                    </a>
                    <p class="wms-footer-desc">Création de sites WordPress professionnels de nouvelle génération,
                        optimisés pour le référencement (SEO) et automatisés pour générer des leads.</p>
                    <div class="wms-footer-socials">
                        <!-- Facebook -->
                        <a href="https://www.facebook.com/webmodernseo" class="wms-social-icon" target="_blank"
                            rel="noopener" aria-label="Facebook">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                stroke-linecap="round" stroke-linejoin="round">
                                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                            </svg>
                        </a>
                        <!-- Instagram -->
                        <a href="https://www.instagram.com/webmodernseo" class="wms-social-icon" target="_blank"
                            rel="noopener" aria-label="Instagram">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                stroke-linecap="round" stroke-linejoin="round">
                                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                            </svg>
                        </a>
                        <!-- TikTok -->
                        <a href="https://www.tiktok.com/@webmodernseo" class="wms-social-icon" target="_blank"
                            rel="noopener" aria-label="TikTok">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                stroke-linecap="round" stroke-linejoin="round">
                                <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path>
                            </svg>
                        </a>
                    </div>
                </div>

                <!-- Services -->
                <div class="wms-footer-col">
                    <h4>Nos Services</h4>
                    <ul class="wms-footer-links">
                        <li class="wms-footer-link-item"><a href="/services/creation-web">Création Web</a></li>
                        <li class="wms-footer-link-item"><a href="/services/referencement-seo">Référencement SEO</a></li>
                        <li class="wms-footer-link-item"><a href="/services/acquisition-clients">Acquisition Clients</a></li>
                        <li class="wms-footer-link-item"><a href="/services/creation-web#maintenance-securite">Maintenance de site</a></li>
                    </ul>
                </div>

                <!-- Colonne 3 : Navigation -->
                <div class="wms-footer-col">
                    <h4>Navigation</h4>
                    <ul class="wms-footer-links">
                        <li class="wms-footer-link-item"><a href="/">Accueil</a></li>
                        <li class="wms-footer-link-item"><a href="/apropos">À propos</a></li>
                        <li class="wms-footer-link-item"><a href="/portfolio">Portfolio</a></li>
                        <li class="wms-footer-link-item"><a href="/blog">Blog</a></li>
                        <li class="wms-footer-link-item"><a href="/dashboard" style="color: #ff7e47; font-weight: 700;">Admin</a></li>
                    </ul>
                </div>

                <!-- Colonne 4 : Contact -->
                <div class="wms-footer-col">
                    <h4>Contact</h4>
                    <div class="wms-contact-list">
                        <div class="wms-contact-item">
                            <!-- Téléphone -->
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                stroke-linecap="round" stroke-linejoin="round">
                                <path
                                    d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                            </svg>
                            <a href="tel:+33758418018">+33 7 53 88 77 51</a>
                        </div>
                        <div class="wms-contact-item">
                            <!-- E-mail -->
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                stroke-linecap="round" stroke-linejoin="round">
                                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                                <polyline points="22,6 12,13 2,6" />
                            </svg>
                            <a href="mailto:contact@webmodernseo.co">contact@webmodernseo.co</a>
                        </div>
                        <div class="wms-contact-item">
                            <!-- Horaires -->
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                stroke-linecap="round" stroke-linejoin="round">
                                <circle cx="12" cy="12" r="10" />
                                <polyline points="12 6 12 12 16 14" />
                            </svg>
                            <span>Lundi - Vendredi<br>09h00 - 18h00</span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Barre de pied de page (Copyright & Pages politiques) -->
            <div class="wms-footer-bottom">
                <div class="wms-footer-copyright">
                    © 2026 Webmodernseo. Tous droits réservés.
                </div>
                <div class="wms-footer-policy-links">
                    <a href="/politique/mentions-legales">Mentions légales</a>
                    <a href="/politique/conditions-d-utilisation">Conditions d'utilisation</a>
                    <a href="/politique/gestion-des-cookies">Gestion des cookies</a>
                    <a href="/politique/politique-de-confidentialite">Politique de confidentialité</a>
                </div>
            </div>
        </div>
    </footer>
      ` }} />
    </>
  );
};
