# Section "Portfolio Showcase" — Design

**Date :** 2026-07-27
**Statut :** Validé (session de brainstorming)

## Contexte et objectif

Ajouter une nouvelle section sur la home, juste après le Hero, inspirée d'un
visuel de référence fourni par l'utilisateur (mockup d'un laptop flottant sur
un fond dégradé coloré, affichant une capture d'écran d'un site à l'intérieur
de l'écran — style courant de landing page produit).

**Objectif :** preuve de savoir-faire — montrer que l'agence conçoit des
sites soignés en utilisant sa propre home comme premier exemple. Le composant
est conçu pour être dupliqué facilement plus tard avec la capture d'un futur
site client, sans qu'il soit nécessaire de construire dès maintenant un
carrousel ou une liste multi-éléments (YAGNI — une seule instance aujourd'hui).

Cette section est indépendante du Hero (qui reste en direction "typographie
pure", sans mockup, suite à la refonte précédente) : le mockup vit ici, pas
dans le Hero.

## Placement

Insérée dans `src/app/page.tsx`, entre la section Hero (`#hero`) et la
section Services (`#services`) :

```tsx
<section id="hero" className="w-full">
  <HeroPublic />
</section>

{/* Nouvelle section */}
<Reveal as="section" id="portfolio-showcase" className="w-full">
  <PortfolioShowcase
    title="Conçu avec la même exigence pour nos clients"
    imageSrc="/portfolio/webmodernseo-home-showcase.png"
    imageAlt="Aperçu de la home de WebModernSEO affichée dans un ordinateur portable"
  />
</Reveal>

<Reveal as="section" id="services" className="w-full">
  <ServicesPublic />
</Reveal>
```

Utilise le composant `Reveal` déjà en place pour les autres sections
(fondu à l'apparition au scroll, respecte `prefers-reduced-motion`
automatiquement — aucun nouveau code d'animation à écrire).

## Composant : `src/components/public/PortfolioShowcase.tsx`

Nouveau composant, props typées pour permettre une réutilisation future
triviale (dupliquer la section pour un futur client = copier le bloc JSX
dans `page.tsx` avec des props différentes, sans toucher au composant) :

```tsx
interface PortfolioShowcaseProps {
  title: string;
  imageSrc: string;
  imageAlt: string;
}

export const PortfolioShowcase: React.FC<PortfolioShowcaseProps> = ({ title, imageSrc, imageAlt }) => { ... }
```

Pas de props optionnelles superflues (pas de `subtitle`, pas de `ctaHref`,
etc.) tant qu'aucun besoin concret ne les justifie.

## Construction visuelle

**Fond de section :** dégradé diagonal dans la palette de marque existante
— `bg-gradient-to-br from-brand-orange to-brand-charcoal`. Pas de nouvelle
couleur introduite (le violet du visuel de référence n'est pas repris — la
charte reste orange/noir/sable/charbon).
Contraste volontaire avec le Hero (fond clair) et le CTA final (charbon
uni) : cette section a son propre fond coloré pour se distinguer visuellement.

**Cadre du laptop :** construit entièrement en CSS/Tailwind, sans image
externe de mockup :
- Un conteneur "écran" : fond noir/charbon, coins arrondis, bordure
  simulant la lunette (`border-8` ou `p-3` sombre autour de l'image), ratio
  d'aspect proche 16:10.
- Un conteneur "socle" en dessous : une barre plus large et fine
  (`rounded-b-xl`, teinte légèrement différente du noir de l'écran pour
  suggérer l'aluminium), centrée, plus large que l'écran.
- Une ombre portée (`shadow-2xl` ou variante custom) sous l'ensemble pour
  l'effet de flottement.
- Wrapper avec `max-width` centré, responsive (le laptop rétrécit
  proportionnellement sur mobile, socle inclus).

**Capture d'écran :** générée par l'agent lui-même via Playwright (déjà
utilisé pour la vérification visuelle de la refonte précédente) — capture
du viewport (pas la page entière) de la home actuelle à une taille de
1600×1000 (ratio 16:10, correspond au ratio de l'écran du mockup), montrant
le Hero. Sauvegardée en asset statique sous
`public/portfolio/webmodernseo-home-showcase.png`, affichée via
`next/image` (optimisation automatique, `alt` descriptif obligatoire).

## Texte

Titre court au-dessus du mockup, en police d'affichage (`font-display`),
cohérent avec le traitement typographique du reste de la home. Formulation
proposée : *"Conçu avec la même exigence pour nos clients"* — ajustable
librement à l'implémentation si une formulation plus percutante émerge.

## Accessibilité

- Image avec `alt` descriptif (pas décorative — elle porte un sens réel :
  "voici notre travail").
- Dégradé de fond purement décoratif, aucun `aria-hidden` requis sur le
  fond lui-même (pas d'élément DOM séparé pour le dégradé, c'est une classe
  de fond sur la section).
- Le fondu à l'apparition (`Reveal`) respecte déjà `prefers-reduced-motion`
  — aucune vérification supplémentaire nécessaire au-delà de ce que
  `Reveal` garantit déjà.

## Vérification

Le projet n'a pas de suite de tests (pas de Jest/Vitest/Playwright dans
`package.json` en tant que test runner) : vérification par
`npx tsc --noEmit`, lancement du serveur de dev + vérification visuelle
manuelle (desktop + mobile), comme pour la refonte précédente.

## Périmètre

Uniquement : nouveau composant `PortfolioShowcase.tsx`, son insertion dans
`src/app/page.tsx`, et le nouvel asset image capturé. Aucun changement sur
le Hero, les autres sections, ou les autres pages du site.
