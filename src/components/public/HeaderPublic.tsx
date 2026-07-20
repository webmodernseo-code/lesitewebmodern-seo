'use client';

import React, { useEffect } from 'react';
import { ThemeToggle } from '@/components/ThemeToggle';

export const HeaderPublic: React.FC = () => {
  useEffect(() => {
    try {
      (function () {
            function initNav() {
                const header = document.getElementById('wms-header');
                const hamburgerBtn = document.getElementById('wms-hamburger');
                const mobileMenu = document.getElementById('wms-mobile-menu');
                const body = document.body;

                // 1. Gestion du changement de style au défilement (Sticky Scrolled)
                const handleScroll = () => {
                    if (window.scrollY > 20) {
                        header.classList.add('wms-scrolled');
                    } else {
                        header.classList.remove('wms-scrolled');
                    }
                };
                window.addEventListener('scroll', handleScroll);
                handleScroll(); // Init au chargement

                // 2. Gestion de l'ouverture/fermeture du menu mobile
                const toggleMobileMenu = () => {
                    const isOpen = hamburgerBtn.classList.contains('wms-active');
                    if (isOpen) {
                        // Fermeture
                        hamburgerBtn.classList.remove('wms-active');
                        mobileMenu.classList.remove('wms-active');
                        body.classList.remove('wms-menu-open');
                        hamburgerBtn.setAttribute('aria-expanded', 'false');
                    } else {
                        // Ouverture
                        hamburgerBtn.classList.add('wms-active');
                        mobileMenu.classList.add('wms-active');
                        body.classList.add('wms-menu-open');
                        hamburgerBtn.setAttribute('aria-expanded', 'true');
                    }
                };

                let activeHamburger = hamburgerBtn;
                if (hamburgerBtn && mobileMenu) {
                    // Enlève l'ancien listener s'il existe (protection événements)
                    const newHamburgerBtn = hamburgerBtn.cloneNode(true);
                    hamburgerBtn.parentNode.replaceChild(newHamburgerBtn, hamburgerBtn);
                    activeHamburger = newHamburgerBtn;
                    
                    newHamburgerBtn.addEventListener('click', toggleMobileMenu);

                    // 2b. Fermer le menu mobile lors d'un clic en dehors
                    document.addEventListener('click', (event) => {
                        const isOpen = newHamburgerBtn.classList.contains('wms-active');
                        if (isOpen && !mobileMenu.contains(event.target) && !newHamburgerBtn.contains(event.target)) {
                            toggleMobileMenu();
                        }
                    });

                    // 2c. Bouton de fermeture (croix) interne au menu mobile
                    const closeBtn = document.getElementById('wms-mobile-close-btn');
                    if (closeBtn) {
                        closeBtn.addEventListener('click', toggleMobileMenu);
                    }
                }

                // 3. Gestion de l'accordéon mobile
                window.toggleMobileDropdown = function(button) {
                    const parent = button.closest('.wms-mobile-dropdown');
                    const submenu = parent.querySelector('.wms-mobile-submenu');
                    parent.classList.toggle('wms-open');
                    if (parent.classList.contains('wms-open')) {
                        submenu.style.maxHeight = submenu.scrollHeight + 'px';
                    } else {
                        submenu.style.maxHeight = '0';
                    }
                };

                // 4. Gestion automatique du lien actif au chargement
                const currentUrl = window.location.href;
                const desktopLinks = header.querySelectorAll('.wms-nav-link, .wms-dropdown-item');
                const mobileLinks = mobileMenu.querySelectorAll('.wms-mobile-nav-link, .wms-mobile-submenu-link');

                const setActiveLink = (links, parentWrapperClass, toggleClass) => {
                    let bestMatch = null;
                    let longestMatch = 0;

                    links.forEach(link => {
                        link.classList.remove('wms-active');
                        const href = link.getAttribute('href');

                        if (href && href !== '#' && href !== '') {
                            // Nettoie l'adresse absolue pour la comparaison relative de l'état actif
                            const relativeHref = href.replace('https://webmodernseo.co', '');
                            if (relativeHref && relativeHref !== '/' && currentUrl.includes(relativeHref) && relativeHref.length > longestMatch) {
                                longestMatch = relativeHref.length;
                                bestMatch = link;
                            }
                        }
                    });

                    if (bestMatch) {
                        bestMatch.classList.add('wms-active');
                        // Activer le parent dropdown si c'est un lien de sous-menu
                        const parentDropdown = bestMatch.closest(parentWrapperClass);
                        if (parentDropdown) {
                            const toggle = parentDropdown.querySelector(toggleClass);
                            if (toggle) toggle.classList.add('wms-active');
                        }
                    } else if (currentUrl === 'https://webmodernseo.co/' || currentUrl.endsWith('/') || currentUrl.includes('localhost') && (currentUrl.endsWith('/header.html') || currentUrl.endsWith('/hero.html'))) {
                        const firstLink = header.querySelector('.wms-nav-link');
                        if (firstLink) firstLink.classList.add('wms-active');
                    }
                };

                setActiveLink(desktopLinks, '.wms-dropdown', '.wms-dropdown-toggle');
                setActiveLink(mobileLinks, '.wms-mobile-dropdown', '.wms-mobile-dropdown-toggle');
            }

            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', initNav);
            } else {
                initNav();
            }
        })();
    } catch (e) {
      console.error("Error in HeaderPublic script:", e);
    }
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        :root {
            /* Variables CSS isolées pour Webmodernseo */
            --wms-bg-header: rgba(255, 255, 255, 0.9);
            --wms-bg-scrolled: rgba(255, 255, 255, 0.95);
            --wms-bg-mobile: rgba(255, 255, 255, 0.98);
            
            --wms-brand-orange: #ff4d00;
            --wms-brand-orange-light: #ff7e47;
            --wms-brand-orange-dark: #8F3000;
            --wms-brand-glow: rgba(224, 83, 0, 0.15);

            /* Spécifique au logo 3D légèrement plus foncé */
            --wms-logo-orange: #ff4d00;
            --wms-logo-orange-light: #F56B22;
            --wms-logo-orange-dark: #803100;
            --wms-logo-glow: rgba(204, 78, 0, 0.4);

            --wms-text-primary: #000000;
            --wms-text-secondary: #5c5c64;
            
            --wms-border-color: rgba(15, 15, 17, 0.08);
            --wms-border-scrolled: rgba(15, 15, 17, 0.12);
            
            --wms-transition-fast: 0.2s cubic-bezier(0.16, 1, 0.3, 1);
            --wms-transition-smooth: 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        /* Force la police Inter sur l'en-tête et tous ses enfants */
        .wms-header-wrapper,
        .wms-header-wrapper *,
        .wms-header-wrapper h1,
        .wms-header-wrapper h2,
        .wms-header-wrapper h3,
        .wms-header-wrapper h4,
        .wms-header-wrapper p,
        .wms-header-wrapper a,
        .wms-header-wrapper span {
            font-family: 'Inter', sans-serif !important;
        }

        /* Encapsulation complète sous le sélecteur .wms-header-wrapper pour éviter les conflits */
        .wms-header-wrapper {
            position: fixed;
            top: 24px;
            left: 50%;
            transform: translateX(-50%);
            width: calc(100% - 48px);
            max-width: 980px;
            z-index: 9999;
            background-color: var(--wms-bg-header);
            border: 1px solid var(--wms-border-color);
            border-radius: 20px;
            backdrop-filter: blur(16px);
            -webkit-backdrop-filter: blur(16px);
            font-family: 'Inter', sans-serif;
            box-shadow: 
                0 10px 30px -10px rgba(15, 15, 17, 0.08), 
                0 1px 3px rgba(15, 15, 17, 0.04), 
                0 20px 40px -15px rgba(224, 83, 0, 0.03);
            transition: all var(--wms-transition-smooth);
        }

        /* Style lorsque la page défile */
        .wms-header-wrapper.wms-scrolled {
            top: 12px;
            background-color: var(--wms-bg-scrolled);
            border-color: var(--wms-border-scrolled);
            box-shadow: 
                0 20px 40px -15px rgba(15, 15, 17, 0.12), 
                0 1px 3px rgba(15, 15, 17, 0.06), 
                0 30px 60px -20px rgba(224, 83, 0, 0.05);
        }

        .wms-header-container {
            max-width: 100%;
            height: 72px;
            margin: 0 auto;
            padding: 0 24px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            box-sizing: border-box;
        }

        /* --- LOGO 3D INTEGRATION --- */
        .wms-header-logo {
            display: flex;
            align-items: center;
            text-decoration: none;
            outline: none;
            background: none;
            border: none;
            padding: 0;
            margin: 0;
            cursor: pointer;
        }

        .wms-logo-scaler {
            transform: scale(0.42);
            transform-origin: center left;
            width: 42px;
            height: 42px;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .wms-logo-text {
            font-size: 1.25rem;
            font-weight: 800;
            color: var(--wms-text-primary);
            letter-spacing: -0.03em;
            margin-left: 12px;
            text-transform: lowercase;
            font-family: 'Inter', sans-serif !important;
            transition: color var(--wms-transition-fast);
        }

        .wms-logo-text-accent {
            color: var(--wms-logo-orange);
            transition: color var(--wms-transition-fast);
        }

        .wms-header-logo:hover .wms-logo-text-accent {
            color: var(--wms-logo-orange-light);
        }

        .wms-scene-3d {
            width: 100px;
            height: 100px;
            position: relative;
            transform-style: preserve-3d;
            transform: rotateY(22deg) rotateX(6deg);
            transition: transform var(--wms-transition-smooth);
        }

        .wms-header-logo:hover .wms-scene-3d {
            transform: rotateY(30deg) rotateX(10deg) scale(1.05);
        }

        .wms-layer {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            overflow: visible;
        }

        .wms-card-glow {
            fill: var(--wms-logo-orange);
            opacity: 0.35;
            filter: blur(12px) drop-shadow(0 0 20px var(--wms-logo-glow));
        }

        .wms-card-thickness {
            fill: var(--wms-logo-orange-dark);
            opacity: 0.9;
        }

        .wms-card-face {
            fill: url(#wms-card-gradient);
            filter: drop-shadow(0 4px 10px rgba(0, 0, 0, 0.4));
        }

        .wms-logo-thickness {
            fill: #cbd5e1;
            opacity: 0.8;
        }

        .wms-logo-face {
            fill: url(#wms-logo-gradient);
        }

        .wms-logo-glow {
            fill: #ffffff;
            opacity: 0.25;
            filter: blur(2px);
        }

        /* --- DESKTOP NAVIGATION --- */
        .wms-desktop-nav {
            display: flex;
            align-items: center;
            gap: 32px;
            list-style: none;
            padding: 0;
            margin: 0;
        }

        .wms-nav-item {
            padding: 0;
            margin: 0;
        }

        .wms-nav-link {
            font-size: 0.95rem;
            font-weight: 500;
            color: var(--wms-text-secondary);
            text-decoration: none;
            position: relative;
            padding: 8px 0;
            transition: color var(--wms-transition-fast);
        }

        .wms-nav-link::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 2px;
            background-color: var(--wms-brand-orange-light);
            transform: scaleX(0);
            transform-origin: right center;
            transition: transform var(--wms-transition-fast);
        }

        .wms-nav-link:hover {
            color: var(--wms-text-primary);
        }

        .wms-nav-link:hover::after {
            transform: scaleX(1);
            transform-origin: left center;
        }

        .wms-nav-link.wms-active {
            color: var(--wms-text-primary);
        }

        .wms-nav-link.wms-active::after {
            transform: scaleX(1);
            transform-origin: left center;
        }

        /* --- DROPDOWN NAVIGATION --- */
        .wms-dropdown {
            position: relative;
        }

        .wms-dropdown-toggle {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            cursor: pointer;
        }

        .wms-desktop-dot {
            width: 6px;
            height: 6px;
            background-color: var(--wms-brand-orange-light);
            border-radius: 50%;
            margin-left: 6px;
            display: inline-block;
            vertical-align: middle;
            transition: transform var(--wms-transition-smooth), background-color var(--wms-transition-fast), border-radius var(--wms-transition-smooth);
        }

        .wms-dropdown-toggle:hover .wms-desktop-dot {
            background-color: var(--wms-brand-orange);
            transform: scale(1.2);
        }

        .wms-dropdown:hover .wms-desktop-dot {
            transform: rotate(45deg) scale(1.1);
            border-radius: 2px;
            background-color: var(--wms-brand-orange);
        }

        .wms-dropdown-menu {
            position: absolute;
            top: 100%;
            left: 50%;
            transform: translateX(-50%) translateY(12px);
            background-color: #ffffff;
            border: 1px solid var(--wms-border-color);
            border-radius: 12px;
            padding: 8px 0;
            min-width: 160px;
            list-style: none;
            box-shadow: 0 10px 30px rgba(15, 15, 17, 0.06);
            opacity: 0;
            visibility: hidden;
            transition: opacity var(--wms-transition-fast), transform var(--wms-transition-fast), visibility var(--wms-transition-fast);
            z-index: 1000;
        }

        .wms-dropdown:hover .wms-dropdown-menu {
            opacity: 1;
            visibility: visible;
            transform: translateX(-50%) translateY(4px);
        }

        .wms-dropdown-item {
            display: block;
            padding: 8px 16px;
            font-size: 0.9rem;
            font-weight: 500;
            color: var(--wms-text-secondary);
            text-decoration: none;
            transition: background-color var(--wms-transition-fast), color var(--wms-transition-fast);
        }

        .wms-dropdown-item:hover {
            background-color: rgba(224, 83, 0, 0.04);
            color: var(--wms-brand-orange);
        }

        /* --- ACTIONS (CTA) --- */
        .wms-header-actions {
            display: flex;
            align-items: center;
            gap: 16px;
        }

        .wms-cta-button {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            padding: 8px 20px 8px 16px;
            border-radius: 9999px;
            font-size: 0.9rem;
            font-weight: 600;
            text-decoration: none;
            cursor: pointer;
            box-sizing: border-box;
            transition: all var(--wms-transition-fast);
        }

        .wms-cta-primary {
            background-color: #000000;
            color: #ffffff;
            border: 1px solid #000000;
            box-shadow: 0 4px 15px rgba(12, 12, 14, 0.08);
        }

        .wms-cta-primary:hover {
            background-color: #1a1a22;
            border-color: #1a1a22;
            transform: translateY(-1.5px);
            box-shadow: 0 6px 20px rgba(12, 12, 14, 0.15);
        }

        .wms-cta-primary:active {
            transform: translateY(0);
        }

        /* Badge d'icône orange pour le bouton CTA */
        .wms-cta-icon-badge {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 24px;
            height: 24px;
            border-radius: 50%;
            background-color: var(--wms-brand-orange);
            color: #ffffff;
            margin-right: 8px;
        }

        /* --- MOBILE MENU TRIGGER (HAMBURGER) --- */
        .wms-hamburger-btn {
            display: none;
            background: none;
            border: none;
            cursor: pointer;
            padding: 8px;
            z-index: 10000;
            outline: none;
            margin: 0;
        }

        .wms-hamburger-icon {
            width: 24px;
            height: 18px;
            position: relative;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
        }

        .wms-hamburger-bar {
            width: 100%;
            height: 2px;
            background-color: var(--wms-text-primary);
            border-radius: 2px;
            transition: transform var(--wms-transition-smooth), opacity var(--wms-transition-smooth);
        }

        /* Hamburger actif (état X) */
        .wms-hamburger-btn.wms-active .wms-bar-top {
            transform: translateY(8px) rotate(45deg);
        }

        .wms-hamburger-btn.wms-active .wms-bar-middle {
            opacity: 0;
            transform: scaleX(0);
        }

        .wms-hamburger-btn.wms-active .wms-bar-bottom {
            transform: translateY(-8px) rotate(-45deg);
        }

        /* --- MOBILE MENU OVERLAY --- */
        .wms-mobile-overlay {
            position: fixed;
            top: 72px;
            left: 0;
            width: 100%;
            height: auto;
            max-height: calc(100vh - 72px);
            background-color: var(--wms-bg-mobile);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            z-index: 9998;
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            padding: 24px 24px 32px 24px;
            box-sizing: border-box;
            transform: translateY(-100%);
            transition: transform var(--wms-transition-smooth), visibility var(--wms-transition-smooth);
            overflow-y: auto;
            visibility: hidden;
            pointer-events: none;
            box-shadow: 0 10px 30px rgba(15, 15, 17, 0.08);
            border-bottom: 1px solid var(--wms-border-color);
        }

        .wms-mobile-overlay.wms-active {
            transform: translateY(0);
            visibility: visible;
            pointer-events: auto;
        }

        /* Bouton fermer (croix) dans le volet mobile */
        .wms-mobile-close {
            position: absolute;
            top: 16px;
            right: 16px;
            background: none;
            border: none;
            cursor: pointer;
            color: var(--wms-text-secondary);
            padding: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: color var(--wms-transition-fast), transform var(--wms-transition-fast);
            z-index: 10001;
        }

        .wms-mobile-close:hover {
            color: var(--wms-text-primary);
            transform: scale(1.1);
        }

        .wms-mobile-nav {
            display: flex;
            flex-direction: column;
            gap: 24px;
            list-style: none;
            padding: 0;
            margin: 0 0 30px 0;
        }

        .wms-mobile-nav-link {
            font-size: 1.25rem;
            font-weight: 600;
            color: var(--wms-text-secondary);
            text-decoration: none;
            display: block;
            transition: color var(--wms-transition-fast), transform var(--wms-transition-fast), opacity var(--wms-transition-fast);
            transform: translateY(10px);
            opacity: 0;
        }

        .wms-mobile-overlay.wms-active .wms-mobile-nav-link {
            transform: translateY(0);
            opacity: 1;
        }

        /* Apparition en cascade */
        .wms-mobile-nav > li:nth-child(1) > .wms-mobile-nav-link,
        .wms-mobile-nav > li:nth-child(1) > .wms-mobile-dropdown-toggle { transition-delay: 0.1s; }
        .wms-mobile-nav > li:nth-child(2) > .wms-mobile-nav-link,
        .wms-mobile-nav > li:nth-child(2) > .wms-mobile-dropdown-toggle { transition-delay: 0.15s; }
        .wms-mobile-nav > li:nth-child(3) > .wms-mobile-nav-link,
        .wms-mobile-nav > li:nth-child(3) > .wms-mobile-dropdown-toggle { transition-delay: 0.2s; }
        .wms-mobile-nav > li:nth-child(4) > .wms-mobile-nav-link,
        .wms-mobile-nav > li:nth-child(4) > .wms-mobile-dropdown-toggle { transition-delay: 0.25s; }
        .wms-mobile-nav > li:nth-child(5) > .wms-mobile-nav-link,
        .wms-mobile-nav > li:nth-child(5) > .wms-mobile-dropdown-toggle { transition-delay: 0.3s; }

        .wms-mobile-nav-link:hover, 
        .wms-mobile-dropdown-toggle:hover {
            color: var(--wms-brand-orange);
            transform: translateY(0) translateX(8px);
        }

        .wms-mobile-nav-link.wms-active,
        .wms-mobile-dropdown-toggle.wms-active {
            color: var(--wms-brand-orange);
            border-left: 3px solid var(--wms-brand-orange);
            padding-left: 12px;
            transform: translateY(0) translateX(4px);
        }

        /* Style du toggle dropdown sur mobile */
        .wms-mobile-dropdown-toggle {
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 100%;
            background: none;
            border: none;
            padding: 0;
            text-align: left;
            cursor: pointer;
            font-family: 'Inter', sans-serif !important;
            transform: translateY(10px);
            opacity: 0;
            transition: color var(--wms-transition-fast), transform var(--wms-transition-fast), opacity var(--wms-transition-fast);
        }

        .wms-mobile-overlay.wms-active .wms-mobile-dropdown-toggle {
            transform: translateY(0);
            opacity: 1;
        }

        .wms-dropdown-arrow {
            transition: transform var(--wms-transition-smooth);
            color: var(--wms-text-secondary);
        }

        .wms-mobile-dropdown.wms-open .wms-dropdown-arrow {
            transform: rotate(180deg);
        }

        /* Sous-menu mobile */
        .wms-mobile-submenu {
            max-height: 0;
            overflow: hidden;
            list-style: none;
            padding: 0 0 0 16px;
            margin: 0;
            transition: max-height var(--wms-transition-smooth), margin var(--wms-transition-smooth);
        }

        .wms-mobile-dropdown.wms-open .wms-mobile-submenu {
            max-height: 200px;
            margin-top: 12px;
        }

        .wms-mobile-submenu-link {
            display: block;
            padding: 10px 0;
            font-size: 1.1rem;
            font-weight: 500;
            color: var(--wms-text-secondary);
            text-decoration: none;
            transition: color var(--wms-transition-fast), transform var(--wms-transition-fast), opacity var(--wms-transition-fast);
            transform: translateY(10px);
            opacity: 0;
        }

        .wms-mobile-overlay.wms-active .wms-mobile-submenu-link {
            transform: translateY(0);
            opacity: 1;
            transition: transform var(--wms-transition-smooth), opacity var(--wms-transition-smooth);
        }

        .wms-mobile-submenu li:nth-child(1) .wms-mobile-submenu-link { transition-delay: 0.35s; }
        .wms-mobile-submenu li:nth-child(2) .wms-mobile-submenu-link { transition-delay: 0.4s; }

        .wms-mobile-submenu-link:hover,
        .wms-mobile-submenu-link.wms-active {
            color: var(--wms-brand-orange-light);
            transform: translateY(0) translateX(8px);
        }

        .wms-mobile-actions {
            transform: translateY(20px);
            opacity: 0;
            transition: all var(--wms-transition-smooth) 0.4s;
            width: 100%;
        }

        .wms-mobile-overlay.wms-active .wms-mobile-actions {
            transform: translateY(0);
            opacity: 1;
        }

        .wms-mobile-actions .wms-cta-button {
            width: 100%;
            font-size: 1rem;
            padding: 12px;
        }

        /* Désactiver le scroll du body quand le menu est ouvert */
        body.wms-menu-open {
            overflow: hidden !important;
        }

        /* ==========================================================================
           RESPONSIVE MEDIA QUERIES
           ========================================================================== */
        @media (max-width: 860px) {
            .wms-header-wrapper {
                top: 0;
                left: 0;
                transform: none;
                width: 100%;
                border-radius: 0;
                border-left: none;
                border-right: none;
                border-top: none;
                background-color: #ffffff;
            }

            .wms-header-wrapper.wms-scrolled {
                top: 0;
                box-shadow: 0 4px 20px rgba(15, 15, 17, 0.04);
            }

            .wms-header-container {
                height: 72px;
                padding: 0 16px;
            }

            .wms-desktop-nav {
                display: none;
            }

            .wms-header-actions .wms-cta-button {
                display: none; /* Cache dans la barre fixe, s'affiche dans le tiroir mobile */
            }

            .wms-hamburger-btn {
                display: flex;
            }
        }
      ` }} />
      
      <div dangerouslySetInnerHTML={{ __html: `
        <!-- Importation de la police Inter unique -->



    <!-- ==========================================================================
       CSS DU COMPOSANT HEADER (Styles isolés)
       ========================================================================== -->
    

    <!-- ==========================================================================
       HTML DU HEADER (Composant Header)
       ========================================================================== -->
    <header class="wms-header-wrapper" id="wms-header">
        <!-- SVG Definitions pour le logo 3D -->
        <svg width="0" height="0" style="position: absolute;">
            <defs>
                <linearGradient id="wms-card-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="var(--wms-logo-orange-light)" />
                    <stop offset="100%" stop-color="var(--wms-logo-orange)" />
                </linearGradient>
                <linearGradient id="wms-logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#ffffff" />
                    <stop offset="100%" stop-color="#f1f5f9" />
                </linearGradient>
                <g id="wms-card-shape">
                    <rect x="5" y="5" width="90" height="90" rx="22" />
                </g>
                <g id="wms-logo-shapes">
                    <polygon points="20,28 42,28 42,76 25,76 21,58 27,58" />
                    <polygon points="58,28 80,28 70,76 58,76" />
                    <polygon points="41,66 59,66 50,46" />
                </g>
            </defs>
        </svg>

        <div class="wms-header-container">
            <!-- Logo 3D Animé -->
            <a href="/" class="wms-header-logo" id="wms-logo-btn" aria-label="Accueil">
                <div class="wms-logo-scaler">
                    <div class="wms-scene-3d">
                        <svg class="wms-layer wms-card-glow" style="transform: translateZ(-16px)">
                            <use href="#wms-card-shape" />
                        </svg>
                        <svg class="wms-layer wms-card-thickness" style="transform: translateZ(-14px)">
                            <use href="#wms-card-shape" />
                        </svg>
                        <svg class="wms-layer wms-card-thickness" style="transform: translateZ(-12px)">
                            <use href="#wms-card-shape" />
                        </svg>
                        <svg class="wms-layer wms-card-thickness" style="transform: translateZ(-10px)">
                            <use href="#wms-card-shape" />
                        </svg>
                        <svg class="wms-layer wms-card-thickness" style="transform: translateZ(-8px)">
                            <use href="#wms-card-shape" />
                        </svg>
                        <svg class="wms-layer wms-card-face" style="transform: translateZ(-6px)">
                            <use href="#wms-card-shape" />
                        </svg>
                        <svg class="wms-layer wms-logo-thickness" style="transform: translateZ(-2px)">
                            <use href="#wms-logo-shapes" />
                        </svg>
                        <svg class="wms-layer wms-logo-thickness" style="transform: translateZ(2px)">
                            <use href="#wms-logo-shapes" />
                        </svg>
                        <svg class="wms-layer wms-logo-thickness" style="transform: translateZ(6px)">
                            <use href="#wms-logo-shapes" />
                        </svg>
                        <svg class="wms-layer wms-logo-face" style="transform: translateZ(10px)">
                            <use href="#wms-logo-shapes" />
                        </svg>
                        <svg class="wms-layer wms-logo-glow" style="transform: translateZ(12px)">
                            <use href="#wms-logo-shapes" />
                        </svg>
                    </div>
                </div>
                <span class="wms-logo-text">webmodern<span class="wms-logo-text-accent">seo</span></span>
            </a>

            <!-- Navigation Bureau -->
            <nav>
                <ul class="wms-desktop-nav">
                    <li class="wms-nav-item"><a href="/" class="wms-nav-link wms-active">Accueil</a></li>
                    <li class="wms-nav-item"><a href="/#services" class="wms-nav-link">Services</a></li>
                    <li class="wms-nav-item"><a href="/apropos" class="wms-nav-link">À propos</a></li>
                    <li class="wms-nav-item"><a href="/portfolio" class="wms-nav-link">Portfolio</a></li>
                    <!-- Dropdown Ressources -->
                    <li class="wms-nav-item wms-dropdown">
                        <a href="#" class="wms-nav-link wms-dropdown-toggle" onclick="return false;">
                            Ressources
                            <span class="wms-desktop-dot"></span>
                        </a>
                        <ul class="wms-dropdown-menu">
                            <li><a href="/blog" class="wms-dropdown-item">Blog</a></li>
                            <li><a href="https://magazinia.webmodernseo.co" class="wms-dropdown-item" target="_blank" rel="noopener">Magazine IA</a></li>
                            <li><a href="/dashboard" class="wms-dropdown-item" style="color: #ff4d00; font-weight: 700;">Cockpit Admin</a></li>
                        </ul>
                    </li>
                </ul>
            </nav>

            <!-- Actions CTA Bureau -->
            <div class="wms-header-actions">
                <a href="/contact" class="wms-cta-button wms-cta-primary">
                    <span class="wms-cta-icon-badge">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                            <line x1="7" y1="17" x2="17" y2="7"></line>
                            <polyline points="7 7 17 7 17 17"></polyline>
                        </svg>
                    </span>
                    Nous contacter
                </a>
                
                <!-- Hamburger Trigger Mobile -->
                <button class="wms-hamburger-btn" id="wms-hamburger" aria-label="Menu de navigation" aria-expanded="false">
                    <div class="wms-hamburger-icon">
                        <span class="wms-hamburger-bar wms-bar-top"></span>
                        <span class="wms-hamburger-bar wms-bar-middle"></span>
                        <span class="wms-hamburger-bar wms-bar-bottom"></span>
                    </div>
                </button>
            </div>
        </div>

        <!-- Tiroir Menu Mobile (Overlay) -->
        <div class="wms-mobile-overlay" id="wms-mobile-menu">
            <!-- Bouton de fermeture (croix) -->
            <button class="wms-mobile-close" id="wms-mobile-close-btn" aria-label="Fermer le menu">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
            </button>
            <nav>
                <ul class="wms-mobile-nav">
                    <li><a href="/" class="wms-mobile-nav-link wms-active">Accueil</a></li>
                    <li><a href="/#services" class="wms-mobile-nav-link">Services</a></li>
                    <li><a href="/apropos" class="wms-mobile-nav-link">À propos</a></li>
                    <li><a href="/portfolio" class="wms-mobile-nav-link">Portfolio</a></li>
                    <li class="wms-mobile-dropdown">
                        <button class="wms-mobile-nav-link wms-mobile-dropdown-toggle" onclick="toggleMobileDropdown(this)">
                            Ressources
                            <svg class="wms-dropdown-arrow" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                                <polyline points="6 9 12 15 18 9"></polyline>
                            </svg>
                        </button>
                        <ul class="wms-mobile-submenu">
                            <li><a href="/blog" class="wms-mobile-submenu-link">Blog</a></li>
                            <li><a href="https://magazinia.webmodernseo.co" class="wms-mobile-submenu-link" target="_blank" rel="noopener">Magazine IA</a></li>
                            <li><a href="/dashboard" class="wms-mobile-submenu-link" style="color: #ff4d00; font-weight: 700;">Cockpit Admin</a></li>
                        </ul>
                    </li>
                </ul>
            </nav>
            <div class="wms-mobile-actions">
                <a href="/contact" class="wms-cta-button wms-cta-primary" style="padding: 12px 24px; justify-content: center;">
                    <span class="wms-cta-icon-badge" style="margin-left: 0; margin-right: 12px;">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                            <line x1="7" y1="17" x2="17" y2="7"></line>
                            <polyline points="7 7 17 7 17 17"></polyline>
                        </svg>
                    </span>
                    Nous contacter
                </a>
            </div>
        </div>
    </header>



    <!-- ==========================================================================
       JAVASCRIPT DU COMPOSANT HEADER (Gestion dynamique du Header)
       ========================================================================== -->
    
      ` }} />
    </>
  );
};
