import React from 'react';
import type { Metadata } from 'next';
import { HeaderPublic } from '@/components/public/HeaderPublic';
import { FooterPublic } from '@/components/public/FooterPublic';

export const metadata: Metadata = {
  title: "Politique de confidentialité | WebModernSEO",
  description: "Politique de confidentialité de WebModernSEO : collecte, utilisation et protection de vos données personnelles.",
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
      <h1 class="page-title">Politique de confidentialité</h1>
      <span class="last-updated">Dernière mise à jour : 23 mai 2026</span>
    </div>
    
    <div class="content-section">
      <p>Chez <a href="/">Webmodernseo</a>, nous accordons une grande importance à la protection de votre vie privée et nous nous engageons à protéger les informations personnelles que vous nous communiquez. La présente Politique de confidentialité décrit comment nous collectons, utilisons et protégeons vos données lorsque vous utilisez nos services de conception web, de référencement (SEO) et de maintenance (« Service »). En utilisant Webmodernseo, vous consentez à la collecte et à l'utilisation de vos informations conformément à la présente politique.</p>
      
      <h2>1. Informations que nous recueillons</h2>
      <p>Nous recueillons différents types d'informations afin de vous fournir et d'améliorer notre Service :</p>
      
      <h3>a. Informations personnelles</h3>
      <p>Lorsque vous nous contactez ou utilisez notre Service, nous pouvons vous demander des informations personnelles telles que :</p>
      <ul>
        <li>Nom et prénom</li>
        <li>Adresse email</li>
        <li>Numéro de téléphone</li>
        <li>Informations relatives à votre entreprise ou projet web</li>
      </ul>

      <h3>b. Données d'utilisation</h3>
      <p>Nous pouvons recueillir des informations sur votre utilisation de notre site web (comme l'adresse IP, type de navigateur, pages visitées). Pour plus de détails sur le contrôle de ces traceurs, vous pouvez consulter notre <a href="/politique/gestion-des-cookies">Politique de gestion des cookies</a>.</p>
      
      <h2>2. Utilisation de vos informations</h2>
      <p>Nous utilisons les informations recueillies pour :</p>
      <ul>
        <li>Fournir, maintenir et améliorer nos services de webmastering</li>
        <li>Communiquer avec vous concernant vos projets et demandes de devis</li>
        <li>Personnaliser votre expérience et vous proposer des solutions adaptées</li>
        <li>Respecter nos obligations légales et réglementaires</li>
      </ul>
      
      <h2>3. Protection de vos données</h2>
      <p>Nous mettons en œuvre des mesures de sécurité techniques et organisationnelles appropriées pour protéger vos informations personnelles contre tout accès, modification, divulgation ou destruction non autorisés.</p>
      
      <h2>4. Vos droits</h2>
      <p>Vous disposez d'un droit d'accès, de rectification, de suppression et de limitation du traitement de vos données personnelles. Pour exercer ces droits, veuillez nous contacter directement via notre adresse email : <a href="mailto:contact@webmodernseo.co">contact@webmodernseo.co</a>.</p>
    </div>
  </div>

</div>
        ` }} />
      </main>
      
      <FooterPublic />
    </div>
  );
}
