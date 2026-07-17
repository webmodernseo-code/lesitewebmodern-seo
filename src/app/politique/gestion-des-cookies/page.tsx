import React from 'react';
import type { Metadata } from 'next';
import { HeaderPublic } from '@/components/public/HeaderPublic';
import { FooterPublic } from '@/components/public/FooterPublic';

export const metadata: Metadata = {
  title: "Gestion des cookies | WebModernSEO",
  description: "Politique de gestion des cookies du site WebModernSEO : cookies utilisés, finalités et modalités de contrôle.",
};

export default function Page() {
  return (
    <div className="relative min-h-screen bg-[#FDFBF7] text-black overflow-x-hidden font-sans">
      <HeaderPublic />
      
      <main className="w-full pt-24 pb-16">
        <style dangerouslySetInnerHTML={{ __html: `
          /* --- ISOLATION CSS WORDPRESS --- */

        .wms-policy-section {
          --bg-color: #faf6ee;
          --bg-surface: #ffffff;
          --text-primary: #000000;
          --text-secondary: #5c5c64;
          --accent-color: #ff4d00;
          --accent-glow: rgba(224, 83, 0, 0.15);
          --border-light: rgba(15, 15, 17, 0.08);
        }

        .wms-policy-section *,
        .wms-policy-section h1,
        .wms-policy-section h2,
        .wms-policy-section h3,
        .wms-policy-section h4,
        .wms-policy-section h5,
        .wms-policy-section h6,
        .wms-policy-section p,
        .wms-policy-section li,
        .wms-policy-section a,
        .wms-policy-section span,
        .wms-policy-section strong {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
          font-family: 'Inter', sans-serif !important;
        }

        .wms-policy-section {
          font-family: 'Inter', sans-serif !important;
          background-color: var(--bg-color);
          color: var(--text-secondary);
          line-height: 1.7;
          padding: 20px;
          -webkit-font-smoothing: antialiased;
          background-image: linear-gradient(180deg, #fdfbf7 0%, #faf6ee 100%);
          background-attachment: fixed;
        }

        .wms-policy-section .container {
          max-width: 840px;
          margin: 0 auto;
          padding: 40px 0 80px 0;
          animation: wmsFadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes wmsFadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .wms-policy-section .page-header {
          position: relative;
          padding: 50px 30px;
          border-radius: 20px;
          background: var(--bg-surface);
          border: 1px solid var(--border-light);
          box-shadow: 0 10px 30px -10px rgba(15, 15, 17, 0.06), 0 1px 3px rgba(15, 15, 17, 0.02);
          margin-bottom: 60px;
          overflow: hidden;
          text-align: center;
        }

        .wms-policy-section .page-header::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0; height: 3px;
          background: linear-gradient(90deg, transparent, var(--accent-color), transparent);
          opacity: 0.8;
        }

        .wms-policy-section .page-title {
          font-size: clamp(32px, 5vw, 48px);
          font-weight: 800;
          letter-spacing: -1px;
          margin-bottom: 12px;
          background: linear-gradient(135deg, #000000 0%, #3a3a40 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .wms-policy-section .page-title.no-badge {
          margin-bottom: 0;
        }

        .wms-policy-section .last-updated {
          display: inline-block;
          font-size: 14px;
          font-weight: 600;
          color: var(--accent-color);
          text-transform: uppercase;
          letter-spacing: 1.5px;
          padding: 6px 16px;
          border: 1px solid rgba(224, 83, 0, 0.2);
          border-radius: 999px;
          background: rgba(224, 83, 0, 0.05);
        }

        .wms-policy-section .content-section {
          font-size: 16px;
          padding: 0 10px;
        }

        .wms-policy-section .content-section h2 {
          color: var(--text-primary);
          font-size: 26px;
          font-weight: 700;
          margin-top: 56px;
          margin-bottom: 24px;
          letter-spacing: -0.5px;
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .wms-policy-section .content-section h2::before {
          content: '';
          display: inline-block;
          width: 6px;
          height: 24px;
          background-color: var(--accent-color);
          border-radius: 4px;
        }

        .wms-policy-section .content-section h3 {
          color: var(--text-primary);
          font-size: 19px;
          font-weight: 600;
          margin-top: 36px;
          margin-bottom: 16px;
          padding-left: 20px;
          border-left: 2px solid var(--accent-color);
        }

        .wms-policy-section .content-section p {
          margin-bottom: 20px;
        }

        .wms-policy-section .content-section strong {
          color: var(--text-primary);
          font-weight: 600;
        }

        .wms-policy-section .content-section ul {
          margin-bottom: 24px;
          margin-top: 10px;
          padding-left: 10px;
        }

        .wms-policy-section .content-section li {
          position: relative;
          padding-left: 32px;
          margin-bottom: 12px;
          list-style: none;
        }

        .wms-policy-section .content-section li::before {
          content: '';
          position: absolute;
          left: 6px;
          top: 10px;
          width: 6px;
          height: 6px;
          background-color: var(--accent-color);
          border-radius: 50%;
        }

        .wms-policy-section .content-section p, 
        .wms-policy-section .content-section ul {
          transition: color 0.3s ease;
        }

        .wms-policy-section .content-section p:hover, 
        .wms-policy-section .content-section ul:hover {
          color: var(--text-primary);
        }

        .wms-policy-section .content-section a {
          color: var(--accent-color);
          text-decoration: none;
          font-weight: 500;
          transition: color 0.2s ease;
        }

        .wms-policy-section .content-section a:hover {
          color: var(--text-primary);
          text-decoration: underline;
        }

        @media (min-width: 768px) {
          .wms-policy-section .page-header {
            padding: 60px 50px;
          }
          .wms-policy-section {
            padding: 40px;
          }
          .wms-policy-section .content-section {
            padding: 0;
          }
        }
        ` }} />
        
        <div dangerouslySetInnerHTML={{ __html: `
          <!-- Import de la police Inter -->

    

<div class="wms-policy-section">

  <div class="container">
    <div class="page-header">
      <h1 class="page-title">Gestion des cookies</h1>
      <span class="last-updated">Dernière mise à jour : 23 mai 2026</span>
    </div>
    
    <div class="content-section">
      <p>La présente politique de gestion des cookies explique comment <a href="/">Webmodernseo</a> utilise les cookies et technologies similaires pour vous reconnaître lorsque vous visitez notre site web. Elle explique ce que sont ces technologies et pourquoi nous les utilisons, ainsi que vos droits de contrôler notre utilisation de celles-ci.</p>
      
      <h2>1. Qu'est-ce qu'un cookie ?</h2>
      <p>Un cookie est un petit fichier texte placé sur votre ordinateur ou appareil mobile (smartphone, tablette) lorsque vous visitez un site web. Les cookies sont largement utilisés par les propriétaires de sites web pour faire fonctionner leurs sites, ou les rendre plus efficaces, ainsi que pour fournir des informations de suivi et de performance.</p>
      
      <h2>2. Pourquoi utilisons-nous des cookies ?</h2>
      <p>Nous utilisons des cookies pour plusieurs raisons. Certains cookies sont techniquement nécessaires au bon fonctionnement de notre site web (les cookies "essentiels"). D'autres cookies nous permettent de mesurer l'audience de notre site pour en améliorer les performances et l'expérience utilisateur (les cookies "analytiques").</p>
      
      <h2>3. Types de cookies que nous utilisons</h2>
      
      <h3>a. Cookies essentiels et fonctionnels</h3>
      <p>Ces cookies sont strictement nécessaires pour vous fournir les services disponibles sur notre site web et pour utiliser certaines de ses fonctionnalités, comme la sécurité globale ou la mémorisation de vos préférences de base. Sans ces cookies, le site ne peut pas fonctionner correctement.</p>
      
      <h3>b. Cookies d'analyse (Performance)</h3>
      <p>Ces cookies collectent des informations qui sont utilisées sous forme agrégée pour nous aider à comprendre comment notre site web est utilisé (par exemple, quelles pages sont les plus visitées). Cela nous aide à améliorer continuellement l'ergonomie et le contenu de <a href="/">Webmodernseo</a>.</p>
      
      <h2>4. Comment contrôler ou refuser les cookies ?</h2>
      <p>Vous avez le droit de décider d'accepter ou de refuser les cookies non essentiels. Vous pouvez modifier les paramètres de votre navigateur web pour refuser ou supprimer les cookies. Pour plus de détails sur les démarches de paramétrage de votre navigateur, vous pouvez consulter le guide explicatif de la <a href="https://www.cnil.fr/fr/cookies-et-autres-traceurs" target="_blank" rel="noopener">CNIL (Commission Nationale de l'Informatique et des Libertés)</a>. Si vous choisissez de bloquer les cookies, vous pourrez toujours utiliser notre site, bien que certaines fonctionnalités puissent être légèrement affectées.</p>
    </div>
  </div>

</div>
        ` }} />
      </main>
      
      <FooterPublic />
    </div>
  );
}
