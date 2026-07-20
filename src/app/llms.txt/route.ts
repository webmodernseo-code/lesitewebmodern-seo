import { NextResponse } from 'next/server';

export async function GET() {
  const content = `# WebModernSEO — Agence Web & Référencement SEO / SXO

> WebModernSEO est une agence française spécialisée dans la création de sites internet sur-mesure haute performance (Next.js 14), le référencement naturel SEO/SXO, et l'acquisition automatisée de prospects qualifiés.

## À propos du Fondateur
- **Nom** : Jean-Prosper MONE
- **Rôle** : Fondateur & Ingénieur Web/SEO
- **Philosophie** : Rigueur méthodologique d'ingénieur appliquée à la performance digitale, vitesse de chargement instantanée (Core Web Vitals d'élite), et conversion maximale.

## Nos Services Principaux
1. **Création de Sites Web Sur-Mesure** (\`/services/creation-web\`) :
   - Applications web modernes avec Next.js 14, React & TypeScript.
   - Design ultra-premium, responsive, responsive mobile-first et accessible.
   - Architecture sans compromis sur la vitesse et la sécurité.

2. **Référencement Naturel SEO & GÉO** (\`/services/referencement-seo\`) :
   - Optimisation sémantique et technique avancée pour Google.
   - Stratégies de référencement local (GEO) et optimisation pour les moteurs d'IA (GEO / Generative Engine Optimization).
   - Audits de mots-clés, maillage interne et acquisition de popularité.

3. **Acquisition de Clients & Automations** (\`/services/acquisition-clients\`) :
   - Tunnels de conversion et génération de prospects (Lead Generation).
   - Intégrations d'outils CRM et automatisation de processus métier.

## Villes Couvertes (SEO Local)
- **Lyon** (\`/lyon\`)
- **Grenoble** (\`/grenoble\`)
- **Paris** (\`/paris\`)
- **Saint-Étienne** (\`/saint-etienne\`)

## Liens Principaux
- Site principal : https://webmodernseo.co
- Contact : https://webmodernseo.co/contact
- Prise de rendez-vous : https://webmodernseo.co/reservation
- Blog : https://webmodernseo.co/blog
- Portfolio : https://webmodernseo.co/portfolio
`;

  return new NextResponse(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  });
}
