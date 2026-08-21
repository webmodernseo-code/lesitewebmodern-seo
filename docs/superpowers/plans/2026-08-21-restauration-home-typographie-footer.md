# Restauration accueil, typographie globale et footer mobile — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restaurer le CTA clair et le slider de partenaires, retirer le Portfolio orange de l’accueil, appliquer Bricolage Grotesque partout et rendre le footer compact en accordéon sur mobile.

**Architecture:** La restauration reste ciblée : `PartnerLogoSlider` complète le hero sans toucher à ses effets, `CtaPublic` reste statique, et la composition de l’accueil cesse simplement d’inclure `PortfolioShowcase`. Le footer est réécrit en React client avec une fonction d’état pure testable, tandis que Bricolage Grotesque devient la source unique des familles Tailwind et des styles locaux.

**Tech Stack:** Next.js 14.2, React 18, TypeScript 5, Tailwind CSS 3.4, CSS animations, `node:test`.

## Global Constraints

- Conserver le hero interactif actuel, son titre rotatif, ses points, ses textes, ses CTA et sa preuve sociale.
- Utiliser les assets existants `public/logo/meta.jpg`, `public/logo/n8n.jpg` et `public/logo/o2switch.jpeg` dans cet ordre.
- Respecter `prefers-reduced-motion: reduce` pour le slider.
- Conserver la page `/portfolio`, `PortfolioShowcase.tsx` et son image ; retirer uniquement leur composition sur l’accueil.
- Conserver les textes et liens actuels du CTA inférieur.
- Bricolage Grotesque est l’unique police visuelle du site public et du dashboard.
- Ne modifier ni tailles ni graisses typographiques sauf débordement prouvé.
- Sur mobile, les rubriques Services, Navigation et Contact sont fermées initialement et une seule peut être ouverte.
- Sur desktop, conserver le footer en quatre colonnes.
- Ne pas ajouter de dépendance.

---

### Task 1: Bricolage Grotesque comme police globale unique

**Files:**
- Create: `tests/global-font.test.mjs`
- Modify: `src/app/layout.tsx`
- Modify: `tailwind.config.ts`
- Modify: `src/app/apropos/page.tsx`
- Modify: `src/app/not-found.tsx`
- Modify: `src/app/politique/conditions-d-utilisation/page.tsx`
- Modify: `src/app/politique/gestion-des-cookies/page.tsx`
- Modify: `src/app/politique/mentions-legales/page.tsx`
- Modify: `src/app/politique/politique-de-confidentialite/page.tsx`
- Modify: `src/app/portfolio/page.tsx`
- Modify: `src/app/services/acquisition-clients/page.tsx`
- Modify: `src/app/services/creation-web/page.tsx`
- Modify: `src/app/services/referencement-seo/page.tsx`
- Modify: `src/components/public/AboutPublic.tsx`
- Modify: `src/components/public/AvisPublic.tsx`
- Modify: `src/components/public/FaqPublic.tsx`
- Modify: `src/components/public/FooterPublic.tsx`
- Modify: `src/components/public/HeaderPublic.tsx`
- Modify: `src/components/public/ServicesPublic.tsx`

**Interfaces:**
- Consumes: `Bricolage_Grotesque` depuis `next/font/google`.
- Produces: variables CSS `--font-sans` et `--font-display`, toutes deux alimentées par Bricolage Grotesque.

- [ ] **Step 1: Write the failing global-font test**

Créer `tests/global-font.test.mjs` :

```js
import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import test from 'node:test';

async function sourceFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(entries.map((entry) => {
    const target = path.join(directory, entry.name);
    if (entry.isDirectory()) return sourceFiles(target);
    return /\.(ts|tsx|css)$/.test(entry.name) ? [target] : [];
  }));
  return nested.flat();
}

test('loads only Bricolage Grotesque as the application font', async () => {
  const layout = await readFile('src/app/layout.tsx', 'utf8');
  const tailwind = await readFile('tailwind.config.ts', 'utf8');
  assert.doesNotMatch(layout, /\bInter\b|--font-inter/);
  assert.match(layout, /Bricolage_Grotesque/);
  assert.match(layout, /variable: "--font-sans"/);
  assert.match(layout, /variable: "--font-display"/);
  assert.match(tailwind, /sans: \["var\(--font-sans\)"/);
  assert.match(tailwind, /display: \["var\(--font-display\)"/);
});

test('contains no local Inter font override in src', async () => {
  const files = await sourceFiles('src');
  const offenders = [];
  for (const file of files) {
    const source = await readFile(file, 'utf8');
    if (/font-family:\s*['"]Inter['"]|--font-inter/.test(source)) offenders.push(file);
  }
  assert.deepEqual(offenders, []);
});
```

- [ ] **Step 2: Run the test and verify RED**

Run: `node --test tests/global-font.test.mjs`

Expected: FAIL car `layout.tsx` charge Inter et plusieurs composants forcent encore `font-family: 'Inter'`.

- [ ] **Step 3: Make Bricolage Grotesque the root font**

Dans `src/app/layout.tsx`, remplacer l’import et les instances de police par :

```tsx
import { Bricolage_Grotesque } from 'next/font/google';

const bricolageSans = Bricolage_Grotesque({
  subsets: ['latin'],
  variable: '--font-sans',
});

const bricolageDisplay = Bricolage_Grotesque({
  subsets: ['latin'],
  variable: '--font-display',
});
```

Appliquer les deux variables sur `<html>` :

```tsx
<html lang="fr" className={`${bricolageSans.variable} ${bricolageDisplay.variable}`}>
```

Dans `tailwind.config.ts`, utiliser :

```ts
fontFamily: {
  sans: ['var(--font-sans)', 'sans-serif'],
  display: ['var(--font-display)', 'sans-serif'],
},
```

Dans les 16 fichiers source listés plus haut, remplacer chaque déclaration locale :

```css
font-family: 'Inter', sans-serif;
font-family: 'Inter', sans-serif !important;
```

par respectivement :

```css
font-family: var(--font-sans), sans-serif;
font-family: var(--font-sans), sans-serif !important;
```

Ne pas remplacer `font-family: Georgia, serif !important` dans `AvisPublic.tsx`.

- [ ] **Step 4: Run test and TypeScript check**

Run: `node --test tests/global-font.test.mjs`

Expected: 2 tests PASS.

Run: `npx tsc --noEmit`

Expected: exit code 0.

- [ ] **Step 5: Commit typography unification**

```bash
git add -- tests/global-font.test.mjs src/app src/components/public tailwind.config.ts
git commit -m "feat: applique Bricolage Grotesque sur tout le site"
```

### Task 2: Slider historique dans le hero et retrait du Portfolio orange

**Files:**
- Create: `src/components/public/PartnerLogoSlider.tsx`
- Create: `tests/home-restoration.test.mjs`
- Modify: `src/components/public/HeroPublic.tsx`
- Modify: `src/app/page.tsx`

**Interfaces:**
- Consumes: les trois images existantes sous `/logo/`.
- Produces: `PartnerLogoSlider(): JSX.Element`, composé par `HeroPublic`.

- [ ] **Step 1: Write failing home-restoration tests**

Créer `tests/home-restoration.test.mjs` :

```js
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

test('home no longer composes the orange portfolio showcase', async () => {
  const source = await readFile('src/app/page.tsx', 'utf8');
  assert.doesNotMatch(source, /PortfolioShowcase|portfolio-showcase/);
  assert.match(source, /<HeroPublic\s*\/>[\s\S]*<ServicesPublic\s*\/>/);
});

test('partner slider contains the historical logos and accessible duplicate group', async () => {
  const source = await readFile('src/components/public/PartnerLogoSlider.tsx', 'utf8');
  for (const asset of ['/logo/meta.jpg', '/logo/n8n.jpg', '/logo/o2switch.jpeg']) {
    assert.match(source, new RegExp(asset.replaceAll('/', '\\/')));
  }
  assert.match(source, /Technologies &amp; Partenaires clés/);
  assert.match(source, /aria-hidden="true"/);
  assert.match(source, /motion-reduce:animate-none/);
  assert.match(source, /group-hover:\[animation-play-state:paused\]/);
});

test('hero composes the partner slider after the proof stat', async () => {
  const source = await readFile('src/components/public/HeroPublic.tsx', 'utf8');
  assert.match(source, /HERO_PROOF_STAT[\s\S]*<PartnerLogoSlider\s*\/>/);
});
```

- [ ] **Step 2: Run tests and verify RED**

Run: `node --test tests/home-restoration.test.mjs`

Expected: FAIL car le slider n’existe pas et `page.tsx` compose encore `PortfolioShowcase`.

- [ ] **Step 3: Create `PartnerLogoSlider`**

Créer `src/components/public/PartnerLogoSlider.tsx` :

```tsx
import Image from 'next/image';

const PARTNERS = [
  { src: '/logo/meta.jpg', alt: 'Meta', width: 52, height: 38 },
  { src: '/logo/n8n.jpg', alt: 'n8n', width: 64, height: 38 },
  { src: '/logo/o2switch.jpeg', alt: 'o2switch', width: 50, height: 50 },
] as const;

function LogoGroup({ duplicate = false }: { duplicate?: boolean }) {
  return (
    <div className="flex shrink-0 items-center gap-16 pr-16 sm:gap-20 sm:pr-20" aria-hidden={duplicate || undefined}>
      {PARTNERS.map((partner) => (
        <span key={partner.alt} className="flex shrink-0 items-center justify-center transition-transform hover:scale-105">
          <Image
            src={partner.src}
            alt={duplicate ? '' : `${partner.alt} logo`}
            width={partner.width}
            height={partner.height}
            className="max-h-[50px] w-auto object-contain mix-blend-multiply"
          />
        </span>
      ))}
    </div>
  );
}

export function PartnerLogoSlider() {
  return (
    <div className="mt-14 w-full sm:mt-16">
      <p className="mb-5 text-xs font-semibold uppercase tracking-[0.15em] text-brand-charcoal/70">
        Technologies &amp; Partenaires clés
      </p>
      <div className="group mx-auto max-w-xl overflow-hidden py-2 [mask-image:linear-gradient(to_right,transparent,#000_12%,#000_88%,transparent)]">
        <div className="flex w-max animate-[partnerLogos_25s_linear_infinite] group-hover:[animation-play-state:paused] group-focus-within:[animation-play-state:paused] motion-reduce:animate-none">
          <LogoGroup />
          <LogoGroup duplicate />
        </div>
      </div>
    </div>
  );
}
```

Ajouter dans `src/app/globals.css` :

```css
@keyframes partnerLogos {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}
```

Importer et rendre `<PartnerLogoSlider />` dans `HeroPublic.tsx`, immédiatement après le bloc qui affiche `HERO_PROOF_STAT`.

- [ ] **Step 4: Remove only the homepage Portfolio composition**

Dans `src/app/page.tsx`, supprimer :

```tsx
import { PortfolioShowcase } from '@/components/public/PortfolioShowcase';
```

et le bloc complet :

```tsx
<Reveal as="section" id="portfolio-showcase" className="w-full">
  <PortfolioShowcase
    title="Conçu avec la même exigence pour nos clients"
    imageSrc="/portfolio/webmodernseo-home-showcase.png"
    imageAlt="Aperçu de la home de WebModernSEO affichée dans un ordinateur portable"
  />
</Reveal>
```

- [ ] **Step 5: Run tests and commit**

Run: `node --test tests/home-restoration.test.mjs tests/hero-effects.test.mjs tests/hero-public.test.mjs`

Expected: tous les tests PASS.

```bash
git add -- src/app/page.tsx src/app/globals.css src/components/public/HeroPublic.tsx src/components/public/PartnerLogoSlider.tsx tests/home-restoration.test.mjs
git commit -m "feat: restaure le slider du hero et retire le portfolio de l'accueil"
```

### Task 3: CTA clair historique

**Files:**
- Create: `tests/cta-public.test.mjs`
- Modify: `src/components/public/CtaPublic.tsx`

**Interfaces:**
- Consumes: couleurs Tailwind `brand-sable`, `brand-orange`, `brand-orangeLight`.
- Produces: `CtaPublic` avec la même signature et les mêmes liens.

- [ ] **Step 1: Write the failing CTA test**

Créer `tests/cta-public.test.mjs` :

```js
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

test('CTA uses the historical light rounded card and keeps its copy', async () => {
  const source = await readFile('src/components/public/CtaPublic.tsx', 'utf8');
  assert.doesNotMatch(source, /bg-brand-charcoal/);
  assert.match(source, /bg-gradient-to-br from-brand-sable/);
  assert.match(source, /rounded-\[32px\]/);
  assert.match(source, /Prêt à attirer de/);
  assert.match(source, /Lancer votre croissance/);
  assert.match(source, /Comment ça marche/);
  assert.match(source, /bg-black/);
  assert.match(source, /bg-white/);
});
```

- [ ] **Step 2: Run test and verify RED**

Run: `node --test tests/cta-public.test.mjs`

Expected: FAIL car le CTA utilise encore `bg-brand-charcoal`.

- [ ] **Step 3: Replace the CTA shell and colors**

Conserver les textes, SVG et `href`, mais utiliser cette structure :

```tsx
<section className="w-full bg-white px-3 py-10 sm:px-6 sm:py-16">
  <div className="mx-auto flex max-w-[1400px] flex-col items-center rounded-[24px] border border-black/[0.06] bg-gradient-to-br from-brand-sable via-white to-brand-sable px-6 py-16 text-center shadow-soft sm:rounded-[32px] sm:px-12 sm:py-20">
    <h2 className="mb-4 font-display text-3xl font-extrabold leading-tight tracking-tight text-black sm:text-4xl md:text-5xl">
      Prêt à attirer de <span className="text-brand-orange">nouveaux clients</span> ?
    </h2>
    <p className="mb-9 max-w-xl text-base font-medium leading-relaxed text-[#5c5c64] sm:text-lg">
      Propulsez votre visibilité sur Google et convertissez vos visiteurs en prospects qualifiés dès ce mois-ci.
    </p>
    {/* Les deux liens existants restent ici. Le premier reçoit bg-black text-white ; le second bg-white text-black border-black/10. */}
  </div>
</section>
```

Pour le premier lien, utiliser `border border-black bg-black text-white` et conserver son badge orange. Pour le second, utiliser `border border-black/10 bg-white text-black` et conserver son badge orange.

- [ ] **Step 4: Run test and commit**

Run: `node --test tests/cta-public.test.mjs`

Expected: 1 test PASS.

```bash
git add -- src/components/public/CtaPublic.tsx tests/cta-public.test.mjs
git commit -m "feat: restaure le CTA clair d'origine"
```

### Task 4: Footer mobile accessible en accordéon

**Files:**
- Create: `src/components/public/footer-accordion.ts`
- Create: `tests/footer-accordion.test.mjs`
- Modify: `src/components/public/FooterPublic.tsx`

**Interfaces:**
- Produces: `type FooterSection = 'services' | 'navigation' | 'contact'` et `getNextFooterSection(current, requested)`.
- Consumes: la fonction pure dans `FooterPublic` pour garantir l’ouverture exclusive.

- [ ] **Step 1: Write failing state and markup tests**

Créer `tests/footer-accordion.test.mjs` :

```js
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import { getNextFooterSection } from '../src/components/public/footer-accordion.ts';

test('opens one footer section and closes it when selected again', () => {
  assert.equal(getNextFooterSection(null, 'services'), 'services');
  assert.equal(getNextFooterSection('services', 'services'), null);
  assert.equal(getNextFooterSection('services', 'contact'), 'contact');
});

test('footer exposes three accessible accordion controls and keeps legal links visible', async () => {
  const source = await readFile('src/components/public/FooterPublic.tsx', 'utf8');
  assert.match(source, /'use client'/);
  assert.equal((source.match(/aria-expanded=/g) ?? []).length, 3);
  assert.match(source, /aria-controls="footer-services"/);
  assert.match(source, /aria-controls="footer-navigation"/);
  assert.match(source, /aria-controls="footer-contact"/);
  assert.match(source, /Mentions légales/);
  assert.match(source, /Politique de confidentialité/);
  assert.doesNotMatch(source, /dangerouslySetInnerHTML/);
});
```

- [ ] **Step 2: Run test and verify RED**

Run: `node --test tests/footer-accordion.test.mjs`

Expected: FAIL avec module `footer-accordion.ts` introuvable.

- [ ] **Step 3: Implement the pure exclusive-state helper**

Créer `src/components/public/footer-accordion.ts` :

```ts
export type FooterSection = 'services' | 'navigation' | 'contact';

export function getNextFooterSection(
  current: FooterSection | null,
  requested: FooterSection,
): FooterSection | null {
  return current === requested ? null : requested;
}
```

- [ ] **Step 4: Rewrite FooterPublic as structured React**

Ajouter `'use client'`, `useState`, `ChevronDown` depuis `lucide-react`, et la fonction pure. Définir :

```tsx
const SERVICES = [
  ['Création Web', '/services/creation-web'],
  ['Référencement SEO', '/services/referencement-seo'],
  ['Acquisition Clients', '/services/acquisition-clients'],
  ['Maintenance de site', '/services/creation-web#maintenance-securite'],
] as const;

const NAVIGATION = [
  ['Accueil', '/'],
  ['À propos', '/apropos'],
  ['Portfolio', '/portfolio'],
  ['Blog', '/blog'],
] as const;
```

Dans `FooterPublic`, initialiser :

```tsx
const [openSection, setOpenSection] = useState<FooterSection | null>(null);
const toggleSection = (section: FooterSection) => {
  setOpenSection((current) => getNextFooterSection(current, section));
};
```

Pour chacune des trois colonnes, rendre un bouton visible uniquement sur mobile :

```tsx
<button
  type="button"
  aria-expanded={openSection === 'services'}
  aria-controls="footer-services"
  onClick={() => toggleSection('services')}
  className="flex w-full items-center justify-between py-4 text-left font-bold uppercase tracking-wider focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange md:hidden"
>
  Nos Services
  <ChevronDown className={`h-4 w-4 transition-transform ${openSection === 'services' ? 'rotate-180' : ''}`} />
</button>
```

Associer le contenu avec :

```tsx
<div
  id="footer-services"
  className={`${openSection === 'services' ? 'grid' : 'hidden'} gap-3 pb-4 md:grid md:pb-0`}
>
  {/* liens SERVICES */}
</div>
```

Répéter avec les identifiants `footer-navigation` et `footer-contact`. Les titres desktop utilisent `hidden md:block`. La marque/réseaux précède les accordéons ; copyright et les quatre liens légaux suivent toujours les accordéons. Conserver les liens, coordonnées, horaires, SVG, couleurs sable/orange, rayon et ombre du footer actuel.

- [ ] **Step 5: Run footer tests and commit**

Run: `node --test tests/footer-accordion.test.mjs`

Expected: 2 tests PASS.

Run: `npx tsc --noEmit`

Expected: exit code 0.

```bash
git add -- src/components/public/FooterPublic.tsx src/components/public/footer-accordion.ts tests/footer-accordion.test.mjs
git commit -m "feat: transforme le footer mobile en accordéon"
```

### Task 5: Régression, rendu et production

**Files:**
- Modify only after a failing test identifies a defect: files from Tasks 1–4.

**Interfaces:**
- Consumes: tous les livrables des Tasks 1–4.
- Produces: une branche prête à intégrer et déployer.

- [ ] **Step 1: Run the complete test suite for this feature**

Run:

```bash
node --test tests/global-font.test.mjs tests/home-restoration.test.mjs tests/cta-public.test.mjs tests/footer-accordion.test.mjs tests/hero-effects.test.mjs tests/hero-public.test.mjs
```

Expected: tous les tests PASS, zéro échec.

- [ ] **Step 2: Run compilation and production build**

Run: `npx tsc --noEmit`

Expected: exit code 0.

Run: `npm run build`

Expected: build Next.js terminé avec 47 pages générées et exit code 0.

- [ ] **Step 3: Inspect desktop at 1440 × 900**

Vérifier : nouveau hero inchangé sauf slider ; slider lisible et continu ; Services suit directement le hero ; CTA clair arrondi ; footer en quatre colonnes ; Bricolage Grotesque visible sur titres, paragraphes, boutons et navigation.

- [ ] **Step 4: Inspect mobile at 390 × 844**

Vérifier : aucun débordement horizontal ; slider contenu dans le hero ; CTA lisible ; marque du footer visible ; trois accordéons fermés au chargement ; une seule rubrique ouverte ; liens légaux visibles ; focus clavier visible.

- [ ] **Step 5: Apply evidence-based corrections only**

Pour tout défaut constaté, écrire d’abord un test qui échoue pour l’exigence précise, appliquer la correction minimale, puis rejouer la suite complète et le build. Ne pas créer de refonte supplémentaire.

- [ ] **Step 6: Commit verified corrections if any**

```bash
git add -- src/app/layout.tsx src/app/page.tsx src/app/globals.css tailwind.config.ts src/components/public/HeroPublic.tsx src/components/public/PartnerLogoSlider.tsx src/components/public/CtaPublic.tsx src/components/public/FooterPublic.tsx src/components/public/footer-accordion.ts tests/global-font.test.mjs tests/home-restoration.test.mjs tests/cta-public.test.mjs tests/footer-accordion.test.mjs
git commit -m "fix: finalise la restauration responsive de l'accueil"
```

Ne pas créer de commit vide si aucun défaut n’est constaté.
