# Refonte visuelle premium de la home — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Faire évoluer la home (et les tokens de design partagés) d'un look "template SaaS générique" vers une identité premium d'agence, en gardant la palette orange/noir/sable existante.

**Architecture:** Tokens Tailwind partagés (police d'affichage, couleur charbon, ombre) posés une fois dans `tailwind.config.ts`/`layout.tsx`, puis consommés par les composants retouchés. `HeroPublic.tsx` et `CtaPublic.tsx` sont entièrement réécrits en JSX + classes Tailwind (ils étaient des blocs `dangerouslySetInnerHTML`). `HeaderPublic.tsx`, `ServicesPublic.tsx`, `AboutPublic.tsx`, `FaqPublic.tsx` gardent leur architecture actuelle (CSS inline scoping par wrapper class) et reçoivent uniquement un ajustement ciblé de police sur leur titre. `testimonial-v2.tsx` (déjà en JSX/Tailwind) reçoit juste une classe utilitaire de plus.

**Tech Stack:** Next.js 14 (App Router), Tailwind CSS 3, `next/font/google`. Pas de nouvelle dépendance npm requise.

**Référence :** Spec validée dans `docs/superpowers/specs/2026-07-26-homepage-premium-refresh-design.md`.

## Global Constraints

- Palette de marque inchangée : orange `#ff4d00`, noir `#000000`, sable `#F5E6D3` restent les couleurs de référence ; on ajoute seulement `orangeLight` (`#ff7e47`, déjà utilisé en dur ailleurs dans le code) et `charcoal` (`#16161a`) comme nouveaux tokens.
- `Inter` reste la police du corps de texte, des labels et des boutons partout. Seuls les titres (H1–H4) et le texte du logo passent en police d'affichage (`Bricolage Grotesque`).
- Aucune nouvelle dépendance npm : la police est chargée via `next/font/google`, déjà utilisé pour Inter.
- Toute animation d'entrée ajoutée ou modifiée doit respecter `prefers-reduced-motion` (utiliser la variante Tailwind `motion-reduce:animate-none`).
- Tout élément interactif (lien, bouton) doit garder un focus clavier visible.
- Le projet n'a pas de test runner installé (pas de Jest/Vitest/Playwright dans `package.json`) : la vérification de chaque tâche s'appuie sur `npx tsc --noEmit` (compilation TypeScript/JSX), un lancement du serveur de dev avec vérification `curl` du HTML rendu, et une vérification visuelle manuelle finale (Tâche 6). C'est le plus proche équivalent de TDD disponible dans ce projet purement frontend/visuel.
- Périmètre : uniquement la home (`src/app/page.tsx` et les composants qu'elle assemble) + les tokens partagés. Pas de changement sur les autres pages, ni sur la nav du header (dropdown/menu mobile), ni sur le contenu/layout des sections Services/À propos/FAQ/Footer au-delà de la police des titres.

---

### Task 1: Tokens de design partagés (Tailwind + police d'affichage)

**Files:**
- Modify: `tailwind.config.ts`
- Modify: `src/app/layout.tsx`

**Interfaces:**
- Consumes: rien (fondation de la passe).
- Produces : classes Tailwind `font-display`, `bg-brand-charcoal` / `text-brand-charcoal`, `bg-brand-orangeLight` / `from-brand-orangeLight` etc., `shadow-soft` ; variable CSS `--font-display` disponible dans tout le DOM (posée sur `<html>`). Consommées par les tâches 2 à 5.

- [ ] **Step 1: Ajouter les tokens dans `tailwind.config.ts`**

Remplacer le contenu de `tailwind.config.ts` par :

```ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        brand: {
          orange: "#ff4d00",
          orangeLight: "#ff7e47",
          sable: "#F5E6D3",
          black: "#000000",
          charcoal: "#16161a",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        display: ["var(--font-display)", "sans-serif"],
      },
      boxShadow: {
        soft: "0 20px 40px -15px rgba(15, 15, 17, 0.06), 0 1px 3px rgba(15, 15, 17, 0.02)",
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(6px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.96)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        toastIn: {
          '0%': { opacity: '0', transform: 'translateY(8px) translateX(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0) translateX(0)' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.35s ease-out',
        scaleIn: 'scaleIn 0.2s ease-out',
        toastIn: 'toastIn 0.25s ease-out',
      },
    },
  },
  plugins: [],
};
export default config;
```

- [ ] **Step 2: Charger `Bricolage Grotesque` dans `src/app/layout.tsx`**

Dans `src/app/layout.tsx`, remplacer :

```tsx
import { Inter } from "next/font/google";
```

par :

```tsx
import { Inter, Bricolage_Grotesque } from "next/font/google";
```

Puis, juste après la déclaration de `const inter = Inter({...})`, ajouter :

```tsx
const bricolageGrotesque = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
});
```

Enfin, dans le JSX du `RootLayout`, remplacer :

```tsx
<html lang="fr" className={`${inter.variable}`}>
```

par :

```tsx
<html lang="fr" className={`${inter.variable} ${bricolageGrotesque.variable}`}>
```

- [ ] **Step 3: Vérifier la compilation TypeScript**

Run: `npx tsc --noEmit`
Expected: aucune erreur (exit code 0).

- [ ] **Step 4: Vérifier que le serveur de dev démarre et sert la home**

Run (depuis la racine du projet) :

```bash
npm run dev > /tmp/wms-dev.log 2>&1 &
sleep 6
curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/
```

Expected: `200`. Puis arrêter le serveur (`kill %1` ou fermer le job en arrière-plan).

- [ ] **Step 5: Commit**

```bash
git add tailwind.config.ts src/app/layout.tsx
git commit -m "feat: ajoute les tokens de design premium (police d'affichage, charcoal, ombre)"
```

---

### Task 2: Logo du Header en police d'affichage

**Files:**
- Modify: `src/components/public/HeaderPublic.tsx:253-262`

**Interfaces:**
- Consumes: `--font-display` (Task 1).
- Produces: aucun changement d'API — même composant, même export `HeaderPublic`.

- [ ] **Step 1: Changer la police du texte du logo**

Dans `src/components/public/HeaderPublic.tsx`, remplacer le bloc :

```css
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
```

par :

```css
        .wms-logo-text {
            font-size: 1.25rem;
            font-weight: 800;
            color: var(--wms-text-primary);
            letter-spacing: -0.03em;
            margin-left: 12px;
            text-transform: lowercase;
            font-family: var(--font-display), sans-serif !important;
            transition: color var(--wms-transition-fast);
        }
```

Aucun autre changement dans ce fichier (nav, dropdown, menu mobile inchangés).

- [ ] **Step 2: Vérifier la compilation**

Run: `npx tsc --noEmit`
Expected: aucune erreur.

- [ ] **Step 3: Vérifier le rendu**

Run :

```bash
npm run dev > /tmp/wms-dev.log 2>&1 &
sleep 6
curl -s http://localhost:3000/ | grep -o "font-family: var(--font-display)" | head -1
```

Expected : la ligne `font-family: var(--font-display)` apparaît dans le HTML servi (preuve que le style modifié est bien rendu). Arrêter le serveur ensuite.

- [ ] **Step 4: Commit**

```bash
git add src/components/public/HeaderPublic.tsx
git commit -m "feat: logo du header en police d'affichage"
```

---

### Task 3: Hero — direction "typographie pure"

**Files:**
- Modify (réécriture complète) : `src/components/public/HeroPublic.tsx`

**Interfaces:**
- Consumes : `font-display`, `brand.orange`, `brand.orangeLight`, `shadow-soft` (Task 1).
- Produces : composant `HeroPublic` — même export nommé, même usage (`<HeroPublic />` sans props) depuis `src/app/page.tsx:36`. Constante interne `HERO_PROOF_STAT` (chaîne), à isoler en haut du fichier pour un remplacement facile par un vrai chiffre plus tard.

- [ ] **Step 1: Remplacer tout le contenu de `HeroPublic.tsx`**

```tsx
import React from 'react';

// Valeur provisoire (placeholder) : à remplacer par le vrai chiffre client dès qu'il est disponible.
const HERO_PROOF_STAT = '1 482 leads générés ce mois pour nos clients';

export const HeroPublic: React.FC = () => {
  return (
    <section className="w-full bg-gradient-to-b from-brand-sable/60 to-white">
      <div className="mx-auto flex max-w-3xl flex-col items-center px-6 py-24 text-center sm:py-32">
        <span className="mb-6 block animate-fadeIn text-xs font-semibold uppercase tracking-[0.15em] text-brand-orange motion-reduce:animate-none">
          Agence Web &amp; SEO — Grenoble
        </span>

        <h1
          className="mb-6 animate-fadeIn font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-black motion-reduce:animate-none sm:text-5xl md:text-6xl"
          style={{ animationDelay: '80ms' }}
        >
          Attirez plus de clients avec{' '}
          <span className="bg-gradient-to-br from-brand-orangeLight to-brand-orange bg-clip-text text-transparent">
            webmoderne
          </span>
          <span className="ml-1 inline-block rounded-full bg-gradient-to-br from-[#0FAC71] to-[#1B9476] px-3 py-0.5 align-middle text-[0.55em] font-bold text-white">
            seo
          </span>
        </h1>

        <p
          className="mb-9 max-w-xl animate-fadeIn text-base leading-relaxed text-[#5c5c64] motion-reduce:animate-none sm:text-lg"
          style={{ animationDelay: '150ms' }}
        >
          Agence basée à Grenoble : création de sites internet sur-mesure (Next.js), référencement naturel (SEO)
          haute performance, publicité Meta Ads et automatisations intelligentes pour générer des leads en continu.
        </p>

        <div
          className="mb-8 flex animate-fadeIn flex-wrap items-center justify-center gap-4 motion-reduce:animate-none"
          style={{ animationDelay: '220ms' }}
        >
          <a
            href="/contact"
            className="inline-flex items-center gap-3 rounded-full border border-black bg-black py-2.5 pl-2.5 pr-6 text-base font-semibold text-white shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#1a1a20] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-orange">
              <svg width="10" height="10" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 3L10 8L5 13" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M9 3L14 8L9 13" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            Prendre un RDV offert
          </a>

          <a
            href="/#services"
            className="inline-flex items-center gap-3 rounded-full border border-black/10 py-2.5 pl-2.5 pr-6 text-base font-semibold text-black transition-all duration-300 hover:-translate-y-0.5 hover:bg-black/[0.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-orange text-white">
              <svg width="10" height="10" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M11.596 8.697l-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z" />
              </svg>
            </span>
            Découvrir nos services
          </a>
        </div>

        <div
          className="inline-flex animate-fadeIn items-center gap-2 rounded-full border border-black/10 bg-white px-4 py-2 text-xs font-semibold text-black shadow-soft motion-reduce:animate-none"
          style={{ animationDelay: '320ms' }}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-[#22c55e]" aria-hidden="true" />
          {HERO_PROOF_STAT}
        </div>
      </div>
    </section>
  );
};
```

Ce remplacement supprime entièrement : le mockup dashboard SaaS (grille de cartes, graphique SVG, toggles d'automatisation) et le carrousel de logos d'outils (Meta/n8n/o2switch) avec son animation `wmsScrollLogos`.

- [ ] **Step 2: Vérifier la compilation**

Run: `npx tsc --noEmit`
Expected: aucune erreur.

- [ ] **Step 3: Vérifier le rendu et l'absence des éléments supprimés**

Run :

```bash
npm run dev > /tmp/wms-dev.log 2>&1 &
sleep 6
curl -s http://localhost:3000/ > /tmp/wms-home.html
grep -c "wms-mockup-grid" /tmp/wms-home.html
grep -c "wms-social-logos-track" /tmp/wms-home.html
grep -c "1 482 leads" /tmp/wms-home.html
```

Expected : les deux premiers `grep -c` retournent `0` (mockup et carrousel bien supprimés), le troisième retourne `1` (le badge de preuve est bien rendu). Arrêter le serveur ensuite.

- [ ] **Step 4: Commit**

```bash
git add src/components/public/HeroPublic.tsx
git commit -m "feat: refonte du hero en direction typographie pure (retrait du mockup et du carrousel de logos)"
```

---

### Task 4: CTA final en fond charbon

**Files:**
- Modify (réécriture complète) : `src/components/public/CtaPublic.tsx`

**Interfaces:**
- Consumes : `brand.charcoal`, `brand.orange`, `shadow-soft` (Task 1).
- Produces : composant `CtaPublic` — même export nommé, même usage (`<CtaPublic />` sans props) depuis `src/app/page.tsx:57`.

- [ ] **Step 1: Remplacer tout le contenu de `CtaPublic.tsx`**

```tsx
import React from 'react';

export const CtaPublic: React.FC = () => {
  return (
    <section className="w-full bg-brand-charcoal">
      <div className="mx-auto flex max-w-3xl flex-col items-center px-6 py-20 text-center sm:py-24">
        <h2 className="mb-4 font-display text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl md:text-5xl">
          Prêt à attirer de <span className="text-brand-orange">nouveaux clients</span> ?
        </h2>
        <p className="mb-9 max-w-xl text-base font-medium leading-relaxed text-white/70 sm:text-lg">
          Propulsez votre visibilité sur Google et convertissez vos visiteurs en prospects qualifiés dès ce mois-ci.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href="/contact"
            className="inline-flex items-center gap-3 rounded-full bg-brand-orange py-2.5 pl-2.5 pr-6 text-base font-semibold text-white shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-orangeLight focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-brand-charcoal"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-brand-orange">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4.5 3L9.5 8L4.5 13" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M8.5 3L13.5 8L8.5 13" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            Lancer votre croissance
          </a>

          <a
            href="/#services"
            className="inline-flex items-center gap-3 rounded-full border border-white/20 py-2.5 pl-2.5 pr-6 text-base font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-brand-charcoal"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-orange text-white">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M3.5 2.5L9.5 6L3.5 9.5V2.5Z" />
              </svg>
            </span>
            Comment ça marche
          </a>
        </div>
      </div>
    </section>
  );
};
```

- [ ] **Step 2: Vérifier la compilation**

Run: `npx tsc --noEmit`
Expected: aucune erreur.

- [ ] **Step 3: Vérifier le rendu**

Run :

```bash
npm run dev > /tmp/wms-dev.log 2>&1 &
sleep 6
curl -s http://localhost:3000/ | grep -c "bg-brand-charcoal"
```

Expected : `1` (la section CTA en fond charbon est bien présente dans le HTML). Arrêter le serveur ensuite.

- [ ] **Step 4: Commit**

```bash
git add src/components/public/CtaPublic.tsx
git commit -m "feat: CTA final en fond charbon avec bouton principal orange"
```

---

### Task 5: Police d'affichage sur les titres restants

**Files:**
- Modify: `src/components/public/ServicesPublic.tsx:89-97`
- Modify: `src/components/public/AboutPublic.tsx:105-112`
- Modify: `src/components/public/FaqPublic.tsx:90-97`
- Modify: `src/components/ui/testimonial-v2.tsx:177`

**Interfaces:**
- Consumes : `--font-display` (Task 1).
- Produces : aucun changement d'API sur ces 4 composants, uniquement leur rendu visuel (titre).

Ces 4 composants forcent `font-family: 'Inter' !important` avec une règle générique de haute spécificité (`.wrapper h2 { ... }` ou `.wrapper * { ... }`). Pour gagner face à `!important` sans dépendre de l'ordre dans le fichier, chaque nouvelle règle utilise un sélecteur composé (ancêtre + classe) plus spécifique que la règle générique existante.

- [ ] **Step 1: `ServicesPublic.tsx` — titre de section**

Remplacer :

```css
        .wms-services-title {
            font-size: clamp(2.2rem, 5vw, 3.5rem);
            font-weight: 800;
            color: var(--wms-srv-text-primary);
            line-height: 1.15;
            letter-spacing: -0.03em;
            margin: 0 auto 20px auto;
            max-width: 800px;
        }
```

par :

```css
        .wms-services-title {
            font-size: clamp(2.2rem, 5vw, 3.5rem);
            font-weight: 800;
            color: var(--wms-srv-text-primary);
            line-height: 1.15;
            letter-spacing: -0.03em;
            margin: 0 auto 20px auto;
            max-width: 800px;
        }

        /* Titre en police d'affichage (sélecteur plus spécifique que la règle Inter forcée plus haut) */
        .wms-services-section .wms-services-title {
            font-family: var(--font-display), sans-serif !important;
        }
```

- [ ] **Step 2: `AboutPublic.tsx` — titre de section**

Remplacer :

```css
    .presentation-title {
        font-size: clamp(28px, 4.2vw, 48px);
        font-weight: 800;
        line-height: 1.15;
        letter-spacing: -1.5px;
        color: var(--text-main);
        margin-bottom: 24px;
    }
```

par :

```css
    .presentation-title {
        font-size: clamp(28px, 4.2vw, 48px);
        font-weight: 800;
        line-height: 1.15;
        letter-spacing: -1.5px;
        color: var(--text-main);
        margin-bottom: 24px;
    }

    /* Titre en police d'affichage (sélecteur plus spécifique que la règle Inter forcée plus haut) */
    .wm-presentation .presentation-title {
        font-family: var(--font-display), sans-serif !important;
    }
```

- [ ] **Step 3: `FaqPublic.tsx` — titre de section**

Remplacer :

```css
  .wms-faq-title {
    font-size: clamp(32px, 5.5vw, 48px);
    font-weight: 800;
    line-height: 1.15;
    letter-spacing: -0.04em;
    color: var(--text) !important;
    margin: 0;
  }
```

par :

```css
  .wms-faq-title {
    font-size: clamp(32px, 5.5vw, 48px);
    font-weight: 800;
    line-height: 1.15;
    letter-spacing: -0.04em;
    color: var(--text) !important;
    margin: 0;
  }

  /* Titre en police d'affichage (sélecteur plus spécifique que la règle Inter forcée plus haut) */
  .wms-faq-section .wms-faq-title {
    font-family: var(--font-display), sans-serif !important;
  }
```

- [ ] **Step 4: `testimonial-v2.tsx` — titre de section**

Remplacer :

```tsx
          <h2 id="testimonials-heading" className="text-3xl md:text-5xl font-extrabold tracking-tight mt-3 text-center text-zinc-900 transition-colors">
```

par :

```tsx
          <h2 id="testimonials-heading" className="font-display text-3xl md:text-5xl font-extrabold tracking-tight mt-3 text-center text-zinc-900 transition-colors">
```

- [ ] **Step 5: Vérifier la compilation**

Run: `npx tsc --noEmit`
Expected: aucune erreur.

- [ ] **Step 6: Vérifier le rendu des 4 titres**

Run :

```bash
npm run dev > /tmp/wms-dev.log 2>&1 &
sleep 6
curl -s http://localhost:3000/ > /tmp/wms-home.html
grep -c ".wms-services-section .wms-services-title" /tmp/wms-home.html
grep -c ".wm-presentation .presentation-title" /tmp/wms-home.html
grep -c ".wms-faq-section .wms-faq-title" /tmp/wms-home.html
grep -c "font-display text-3xl md:text-5xl" /tmp/wms-home.html
```

Expected : les 4 commandes retournent chacune `1`. Arrêter le serveur ensuite.

- [ ] **Step 7: Commit**

```bash
git add src/components/public/ServicesPublic.tsx src/components/public/AboutPublic.tsx src/components/public/FaqPublic.tsx src/components/ui/testimonial-v2.tsx
git commit -m "feat: applique la police d'affichage aux titres Services, About, FAQ et Témoignages"
```

---

### Task 6: Vérification finale de la passe

**Files:** aucun fichier modifié — tâche de vérification uniquement.

**Interfaces:**
- Consumes : l'ensemble des tâches 1 à 5.
- Produces : confirmation que la home refaite build et se comporte correctement — rien de consommé par une tâche ultérieure (dernière tâche de cette passe).

- [ ] **Step 1: Build de production complet**

Run: `npm run build`
Expected: le build se termine sans erreur (exit code 0). Si le build échoue pour une raison sans rapport avec cette passe (ex. variable d'environnement manquante déjà absente avant ces changements), le noter mais ne pas bloquer dessus — sinon corriger avant de continuer.

- [ ] **Step 2: Vérification responsive et accessibilité clavier (manuelle)**

Run: `npm run dev`, ouvrir `http://localhost:3000/` dans un navigateur.

Vérifier :
- Hero, Header et CTA final s'affichent correctement en largeur mobile (~375px) et desktop (~1440px).
- Navigation au clavier (Tab) sur les CTA du Hero et du CTA final : un anneau de focus visible apparaît (grâce aux classes `focus-visible:ring-2` ajoutées).
- Dans les DevTools, activer l'émulation `prefers-reduced-motion: reduce` (Rendering tab) et recharger : les animations d'entrée du Hero ne doivent plus jouer (grâce à `motion-reduce:animate-none`).

- [ ] **Step 3: Capture d'écran avant/après pour validation visuelle**

Capturer une capture d'écran de la home (desktop + mobile) et la comparer mentalement à la description du design dans `docs/superpowers/specs/2026-07-26-homepage-premium-refresh-design.md` : typographie Bricolage Grotesque sur les titres, hero sans mockup ni carrousel de logos, CTA final en fond charbon.

- [ ] **Step 4: Commit final (si des ajustements ont été faits pendant la vérification)**

```bash
git add -A
git commit -m "chore: ajustements finaux après vérification visuelle de la refonte premium de la home"
```

Si aucun ajustement n'a été nécessaire, ne pas créer de commit vide — cette tâche se termine sans commit.
