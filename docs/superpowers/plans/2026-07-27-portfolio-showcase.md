# Section "Portfolio Showcase" — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ajouter une section "portfolio" après le Hero de la home, affichant une capture d'écran de la home elle-même dans un mockup de laptop construit en CSS pur, sur un fond dégradé aux couleurs de la marque.

**Architecture:** Un nouveau composant réutilisable `PortfolioShowcase` (props `title`/`imageSrc`/`imageAlt`) reçoit une image statique générée une fois via Playwright, et l'affiche dans un cadre de laptop construit avec des `div` Tailwind (pas d'image de mockup externe). Le composant est inséré dans `src/app/page.tsx` entre le Hero et Services, enveloppé par le composant `Reveal` déjà utilisé pour les autres sections (fondu à l'apparition, `prefers-reduced-motion` déjà géré par `Reveal`).

**Tech Stack:** Next.js 14 (App Router), Tailwind CSS 3, `next/image`. Playwright utilisé uniquement de façon transitoire (`npx`, jamais ajouté à `package.json`) pour générer l'asset image — aucune nouvelle dépendance npm permanente.

**Référence :** Spec validée dans `docs/superpowers/specs/2026-07-27-portfolio-showcase-design.md`.

## Global Constraints

- Palette de marque inchangée : orange `#ff4d00`, charbon `#16161a`, sable `#F5E6D3`, noir `#000000`, orangeLight `#ff7e47` — aucune nouvelle couleur (le violet du visuel de référence n'est pas repris).
- Le cadre du laptop est construit entièrement en CSS/Tailwind (`div` stylées) — aucune image de mockup externe.
- Le composant `PortfolioShowcase` reçoit tout son contenu par props (`title`, `imageSrc`, `imageAlt`) — aucun texte ou chemin d'image en dur dans le composant, pour permettre sa réutilisation future avec une autre capture.
- L'animation d'apparition réutilise le composant `Reveal` existant (`src/components/Reveal.tsx`) — aucun nouveau code d'animation, aucune vérification `motion-reduce` supplémentaire nécessaire (déjà garanti par `Reveal`).
- Le projet n'a pas de test runner installé (pas de Jest/Vitest/Playwright dans `package.json` en tant que dépendance) : la vérification s'appuie sur `npx tsc --noEmit`, un lancement du serveur de dev avec vérification `curl`/`grep` du HTML rendu, et une capture d'écran finale pour validation visuelle.
- Périmètre : le nouveau composant `PortfolioShowcase.tsx`, son insertion dans `src/app/page.tsx` (entre les sections `#hero` et `#services`), et le nouvel asset `public/portfolio/webmodernseo-home-showcase.png`. Aucun changement sur le Hero, les autres sections existantes, ou les autres pages du site.

---

### Task 1: Capture de l'image de la home actuelle

**Files:**
- Create (asset, pas du code) : `public/portfolio/webmodernseo-home-showcase.png`

**Interfaces:**
- Consumes : rien.
- Produces : le fichier image `public/portfolio/webmodernseo-home-showcase.png`, au format 1600×1000 (ratio 16:10), consommé par la Task 2 (référence utilisée en dur dans l'appel du composant à la Task 3).

- [ ] **Step 1: Créer le dossier de destination**

Run: `mkdir -p public/portfolio`

- [ ] **Step 2: S'assurer qu'un navigateur Playwright est disponible**

Run: `npx playwright install chromium`

Expected: la commande se termine sans erreur (elle ne re-télécharge rien si Chromium est déjà en cache localement).

- [ ] **Step 3: Démarrer le serveur de dev en arrière-plan**

Run (depuis la racine du projet) :

```bash
npm run dev > /tmp/wms-portfolio-dev.log 2>&1 &
sleep 25
curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/
```

Expected : `200`. Si un autre process écoute déjà sur le port 3000
(`netstat -ano | grep LISTENING`), l'identifier et le terminer avant de
relancer `npm run dev` — ne pas ignorer un conflit de port, il faut un
serveur qui répond avant de continuer.

- [ ] **Step 4: Capturer la home en 1600×1000**

Run:

```bash
npx playwright screenshot --viewport-size=1600,1000 http://localhost:3000/ public/portfolio/webmodernseo-home-showcase.png
```

Expected : la commande se termine sans erreur et affiche le chemin du
fichier créé.

- [ ] **Step 5: Vérifier le fichier créé**

Run: `ls -la public/portfolio/webmodernseo-home-showcase.png`

Expected : le fichier existe et fait plus de 50 Ko (une capture 1600×1000
d'une page avec ce niveau de contenu visuel ne peut pas être plus petite —
un fichier plus petit signale une page blanche ou une erreur de capture).

- [ ] **Step 6: Arrêter le serveur de dev**

Run : identifier le process node qui écoute sur le port 3000
(`netstat -ano | grep :3000` puis `taskkill //PID <pid> //F` sur Windows,
ou `kill %1` sous un shell qui supporte le job control) et vérifier que le
port est libre ensuite (`netstat -ano | grep :3000` ne doit plus rien
lister en `LISTENING`).

- [ ] **Step 7: Commit**

```bash
git add public/portfolio/webmodernseo-home-showcase.png
git commit -m "feat: ajoute la capture d'ecran de la home pour la section portfolio"
```

---

### Task 2: Composant `PortfolioShowcase`

**Files:**
- Create: `src/components/public/PortfolioShowcase.tsx`

**Interfaces:**
- Consumes : l'asset `public/portfolio/webmodernseo-home-showcase.png` produit par la Task 1 (référencé uniquement dans l'exemple d'usage de la Task 3 — le composant lui-même reste générique).
- Produces : composant `PortfolioShowcase`, export nommé, props `{ title: string; imageSrc: string; imageAlt: string }`. Consommé par la Task 3 (`src/app/page.tsx`).

- [ ] **Step 1: Créer le composant**

Créer `src/components/public/PortfolioShowcase.tsx` avec ce contenu exact :

```tsx
import React from 'react';
import Image from 'next/image';

interface PortfolioShowcaseProps {
  title: string;
  imageSrc: string;
  imageAlt: string;
}

export const PortfolioShowcase: React.FC<PortfolioShowcaseProps> = ({ title, imageSrc, imageAlt }) => {
  return (
    <section className="w-full bg-gradient-to-br from-brand-orange to-brand-charcoal">
      <div className="mx-auto max-w-5xl px-6 py-24 text-center sm:py-32">
        <h2 className="mb-14 font-display text-2xl font-extrabold leading-tight tracking-tight text-white sm:text-3xl md:text-4xl">
          {title}
        </h2>

        <div className="mx-auto max-w-3xl">
          {/* Écran du laptop */}
          <div className="relative mx-auto aspect-[16/10] w-full overflow-hidden rounded-2xl border-[10px] border-black bg-black shadow-2xl sm:border-[14px]">
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              className="object-cover object-top"
              sizes="(max-width: 768px) 100vw, 768px"
            />
          </div>

          {/* Charnière */}
          <div className="mx-auto h-2 w-full rounded-b-sm bg-zinc-800" />

          {/* Socle */}
          <div className="relative mx-auto -mt-px h-4 w-[92%] rounded-b-2xl bg-gradient-to-b from-zinc-300 to-zinc-400 shadow-xl sm:h-5">
            <div className="absolute left-1/2 top-0 h-1 w-16 -translate-x-1/2 rounded-b-md bg-zinc-500/60" />
          </div>
        </div>
      </div>
    </section>
  );
};
```

Notes pour l'implémenteur :
- `bg-brand-orange`, `bg-brand-charcoal`, `font-display` sont des tokens
  Tailwind déjà définis dans `tailwind.config.ts` (posés lors d'une passe
  précédente) — ne pas les redéfinir.
- Le composant ne contient aucune animation propre : l'apparition au
  scroll sera gérée par `Reveal` autour de lui (Task 3), conformément à la
  contrainte globale.
- Aucun texte ni chemin d'image en dur ici : tout vient des props.

- [ ] **Step 2: Vérifier la compilation TypeScript**

Run: `npx tsc --noEmit`
Expected: aucune erreur (exit code 0).

- [ ] **Step 3: Commit**

```bash
git add src/components/public/PortfolioShowcase.tsx
git commit -m "feat: ajoute le composant PortfolioShowcase (mockup laptop CSS)"
```

---

### Task 3: Intégration dans la home et vérification finale

**Files:**
- Modify: `src/app/page.tsx`

**Interfaces:**
- Consumes : `PortfolioShowcase` (Task 2), l'asset `public/portfolio/webmodernseo-home-showcase.png` (Task 1), `Reveal` (déjà importé dans `page.tsx`).
- Produces : rien — dernière tâche de cette passe.

- [ ] **Step 1: Ajouter l'import**

Dans `src/app/page.tsx`, ajouter cet import juste après celui de `HeroPublic` :

```tsx
import { PortfolioShowcase } from '@/components/public/PortfolioShowcase';
```

- [ ] **Step 2: Insérer la nouvelle section entre le Hero et Services**

Remplacer :

```tsx
        {/* Section Hero */}
        <section id="hero" className="w-full">
          <HeroPublic />
        </section>

        {/* Section Services */}
        <Reveal as="section" id="services" className="w-full">
          <ServicesPublic />
        </Reveal>
```

par :

```tsx
        {/* Section Hero */}
        <section id="hero" className="w-full">
          <HeroPublic />
        </section>

        {/* Section Portfolio (preuve de savoir-faire) */}
        <Reveal as="section" id="portfolio-showcase" className="w-full">
          <PortfolioShowcase
            title="Conçu avec la même exigence pour nos clients"
            imageSrc="/portfolio/webmodernseo-home-showcase.png"
            imageAlt="Aperçu de la home de WebModernSEO affichée dans un ordinateur portable"
          />
        </Reveal>

        {/* Section Services */}
        <Reveal as="section" id="services" className="w-full">
          <ServicesPublic />
        </Reveal>
```

- [ ] **Step 3: Vérifier la compilation TypeScript**

Run: `npx tsc --noEmit`
Expected: aucune erreur.

- [ ] **Step 4: Vérifier le rendu**

Run (depuis la racine du projet ; vérifier d'abord qu'aucun process
n'écoute déjà sur le port 3000 via `netstat -ano | grep LISTENING`, et le
terminer si c'est le cas) :

```bash
npm run dev > /tmp/wms-portfolio-verify.log 2>&1 &
sleep 25
curl -s http://localhost:3000/ > /tmp/wms-portfolio-home.html
grep -c "portfolio-showcase" /tmp/wms-portfolio-home.html
grep -c "Conçu avec la même exigence" /tmp/wms-portfolio-home.html
grep -c "webmodernseo-home-showcase.png" /tmp/wms-portfolio-home.html
```

Expected : les trois commandes retournent chacune au moins `1` (la section,
son titre, et la référence à l'image sont bien présents dans le HTML
rendu). Un compte de `2` sur une des lignes est possible et sans gravité
(duplication du payload RSC/flight-data de Next.js App Router observée sur
les autres sections de cette home — pas un bug).

- [ ] **Step 5: Capture d'écran de validation visuelle**

Run:

```bash
npx playwright screenshot --viewport-size=1440,1200 http://localhost:3000/ /tmp/wms-portfolio-desktop.png
npx playwright screenshot --viewport-size=375,1600 http://localhost:3000/ /tmp/wms-portfolio-mobile.png
```

Lire les deux fichiers générés (`/tmp/wms-portfolio-desktop.png` et
`/tmp/wms-portfolio-mobile.png`) et vérifier visuellement : la section
apparaît bien juste après le Hero et avant Services, le mockup laptop est
centré avec son écran, sa charnière et son socle visibles, le fond est un
dégradé orange → charbon (pas de violet), et l'image affichée dans l'écran
correspond bien à la capture de la home générée en Task 1.

- [ ] **Step 6: Arrêter le serveur de dev**

Identifier le process node qui écoute sur le port 3000
(`netstat -ano | grep :3000`) et le terminer
(`taskkill //PID <pid> //F` sur Windows), puis vérifier que le port est
libre.

- [ ] **Step 7: Commit**

```bash
git add src/app/page.tsx
git commit -m "feat: integre la section portfolio showcase entre le hero et services"
```
