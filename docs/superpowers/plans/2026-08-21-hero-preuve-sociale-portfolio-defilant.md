# Hero Social Proof and Scrolling Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Compacter le haut du hero, remplacer sa statistique fictive par une preuve sociale avec avatars, puis ajouter une bande inclinée de sept captures Portfolio entre le hero et les Services.

**Architecture:** `HeroSocialProof` encapsule la preuve sociale et ses portraits locaux. `HomePortfolioMarquee` centralise les sept captures et rend deux groupes identiques pour une boucle CSS accessible. `page.tsx` ne fait que composer la nouvelle bande à la position validée ; la page `/portfolio` reste intacte.

**Tech Stack:** Next.js 14, React, TypeScript, Tailwind CSS, `next/image`, CSS keyframes, Node test runner.

## Global Constraints

- La page `/portfolio` ne doit pas être modifiée.
- La bande de l’accueil affiche uniquement les sept captures existantes, sans nom, filtre, description, bouton ou statistique.
- La bande complète est inclinée de `-2deg`, tandis que chaque capture reçoit la contre-rotation `2deg`.
- Le défilement ralentit au survol, se met en pause au focus clavier et s’arrête avec `prefers-reduced-motion`.
- Aucun chiffre de résultat ou de nombre de clients non vérifié ne doit apparaître.
- Les trois portraits génériques sont fixes et hébergés dans `public/images/avatars/`.
- Aucune nouvelle dépendance d’animation n’est ajoutée.

---

### Task 1: Preuve sociale et densité du hero

**Files:**
- Create: `src/components/public/HeroSocialProof.tsx`
- Create: `public/images/avatars/client-portrait-1.jpg`
- Create: `public/images/avatars/client-portrait-2.jpg`
- Create: `public/images/avatars/client-portrait-3.jpg`
- Modify: `src/components/public/HeroPublic.tsx`
- Test: `tests/hero-social-proof.test.mjs`

**Interfaces:**
- Produces: `HeroSocialProof(): JSX.Element`, sans props.
- Consumes: trois fichiers locaux `/images/avatars/client-portrait-{1,2,3}.jpg`.

- [ ] **Step 1: Write the failing hero proof test**

```js
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

test('hero uses compact spacing and the verified social proof', async () => {
  const hero = await readFile(new URL('../src/components/public/HeroPublic.tsx', import.meta.url), 'utf8');
  const proof = await readFile(new URL('../src/components/public/HeroSocialProof.tsx', import.meta.url), 'utf8');
  assert.doesNotMatch(hero, /HERO_PROOF_STAT|1 482 leads/);
  assert.match(hero, /pt-12 pb-24/);
  assert.match(hero, /sm:pt-16 sm:pb-32/);
  assert.match(hero, /<HeroSocialProof \/>/);
  assert.match(proof, /Des clients satisfaits partout en France/);
  assert.equal((proof.match(/client-portrait-/g) ?? []).length, 3);
  assert.match(proof, /import \{ Star \} from 'lucide-react'/);
  assert.match(proof, /Array\.from\(\{ length: 5 \}/);
});
```

- [ ] **Step 2: Run the test and verify RED**

Run: `node --test tests/hero-social-proof.test.mjs`

Expected: FAIL because `HeroSocialProof.tsx` does not exist.

- [ ] **Step 3: Add three fixed local stock portraits**

Create `public/images/avatars/`, then download these fixed Unsplash crops as the three named files:

```powershell
Invoke-WebRequest 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=160&h=160&fit=crop&crop=face' -OutFile 'public/images/avatars/client-portrait-1.jpg'
Invoke-WebRequest 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=160&h=160&fit=crop&crop=face' -OutFile 'public/images/avatars/client-portrait-2.jpg'
Invoke-WebRequest 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=160&h=160&fit=crop&crop=face' -OutFile 'public/images/avatars/client-portrait-3.jpg'
```

Verify each response is a JPEG and each file is non-empty before continuing.

- [ ] **Step 4: Implement `HeroSocialProof`**

```tsx
import Image from 'next/image';
import { Star } from 'lucide-react';

const portraits = [1, 2, 3] as const;

export function HeroSocialProof() {
  return (
    <div className="inline-flex max-w-full items-center gap-3 rounded-full border border-black/10 bg-white/90 py-2 pl-2 pr-4 shadow-soft backdrop-blur-sm">
      <div className="flex shrink-0" aria-hidden="true">
        {portraits.map((portrait, index) => (
          <Image key={portrait} src={`/images/avatars/client-portrait-${portrait}.jpg`} alt="" width={40} height={40} className={`h-9 w-9 rounded-full border-2 border-white object-cover sm:h-10 sm:w-10 ${index ? '-ml-2.5' : ''}`} />
        ))}
      </div>
      <div className="min-w-0 text-left">
        <div className="flex gap-0.5 text-brand-orange" aria-label="5 étoiles">
          {Array.from({ length: 5 }, (_, index) => <Star key={index} className="h-3.5 w-3.5 fill-current" aria-hidden="true" />)}
        </div>
        <p className="mt-1 text-xs font-semibold leading-tight text-black sm:text-sm">Des clients satisfaits partout en France</p>
      </div>
    </div>
  );
}
```

- [ ] **Step 5: Compose it and halve the hero top space**

In `HeroPublic.tsx`, delete `HERO_PROOF_STAT`, import `HeroSocialProof`, replace `py-24 sm:py-32` with `pt-12 pb-24 sm:pt-16 sm:pb-32`, and replace the old green-dot statistic block with:

```tsx
<div className="animate-fadeIn [animation-fill-mode:both] motion-reduce:animate-none" style={{ animationDelay: '320ms' }}>
  <HeroSocialProof />
</div>
```

- [ ] **Step 6: Run tests and TypeScript**

Run: `node --test tests/hero-social-proof.test.mjs tests/hero-public.test.mjs`

Expected: all tests PASS.

Run: `npx tsc --noEmit`

Expected: exit code 0.

- [ ] **Step 7: Commit**

```bash
git add tests/hero-social-proof.test.mjs src/components/public/HeroSocialProof.tsx src/components/public/HeroPublic.tsx public/images/avatars
git commit -m "feat: ajoute la preuve sociale au hero"
```

### Task 2: Bande Portfolio inclinée et accessible

**Files:**
- Create: `src/components/public/HomePortfolioMarquee.tsx`
- Modify: `src/app/globals.css`
- Test: `tests/home-portfolio-marquee.test.mjs`

**Interfaces:**
- Produces: `HomePortfolioMarquee(): JSX.Element`, sans props.
- Consumes: les sept captures existantes sous `/images/portfolio/`.

- [ ] **Step 1: Write the failing marquee test**

```js
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

test('home portfolio marquee uses all captures with a tilted accessible loop', async () => {
  const source = await readFile(new URL('../src/components/public/HomePortfolioMarquee.tsx', import.meta.url), 'utf8');
  const css = await readFile(new URL('../src/app/globals.css', import.meta.url), 'utf8');
  for (const image of ['Accueil-emypaul.opticafe.fr-emypaul.opticafe.fr_.png', 'Capture-decran-2026-04-14-120331.png', 'Capture-decran-2026-04-14-120629.png', 'Capture-decran-2026-06-16-163553.png', 'FireShot-Capture-008-Accueil-Epbomi-Europe-epbomi-europe.org-1.png', 'he75ojuxofe.jpg', 'Sinaihappycare-sinaihappycare.com_.png']) assert.match(source, new RegExp(image.replaceAll('.', '\\.')));
  assert.match(source, /-rotate-2/);
  assert.match(source, /rotate-2/);
  assert.match(source, /aria-hidden="true"/);
  assert.doesNotMatch(source, /portfolio-filter|project-tag|Visiter le site/);
  assert.match(css, /@keyframes homePortfolioMarquee/);
  assert.match(css, /prefers-reduced-motion/);
});
```

- [ ] **Step 2: Run the test and verify RED**

Run: `node --test tests/home-portfolio-marquee.test.mjs`

Expected: FAIL because `HomePortfolioMarquee.tsx` does not exist.

- [ ] **Step 3: Implement the component**

Create a constant array `{ src, alt }[]` containing the seven exact filenames and project-specific alternative text. Render a labelled `<section>` with `overflow-hidden py-12 sm:py-16`, then a `-rotate-2 py-8` track viewport. Give that viewport `tabIndex={0}`, an accessible label and a visible `focus-visible` outline so keyboard users can focus it and pause motion. Inside it, render two identical `flex w-max` groups using `PROJECTS.map`; put `aria-hidden="true"` on the second group. Each image wrapper uses `w-[280px] sm:w-[380px] lg:w-[460px]`, `aspect-[16/10]`, `rotate-2`, rounded corners, a subtle border and `shadow-card`. Each `Image` uses `fill`, `sizes="(max-width: 640px) 280px, (max-width: 1024px) 380px, 460px"` and `object-cover object-top`.

Apply `home-portfolio-track` to the animated flex container and `home-portfolio-viewport` to its parent.

- [ ] **Step 4: Add motion styles**

Append to `globals.css`:

```css
@keyframes homePortfolioMarquee {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}

.home-portfolio-track { animation: homePortfolioMarquee 34s linear infinite; }
.home-portfolio-viewport:hover .home-portfolio-track { animation-duration: 70s; }
.home-portfolio-viewport:focus-within .home-portfolio-track { animation-play-state: paused; }

@media (prefers-reduced-motion: reduce) {
  .home-portfolio-track { animation: none; transform: none; }
}
```

Ensure the two groups have identical gap and right padding so `-50%` closes the loop without a jump.

- [ ] **Step 5: Run the marquee test and TypeScript**

Run: `node --test tests/home-portfolio-marquee.test.mjs`

Expected: PASS.

Run: `npx tsc --noEmit`

Expected: exit code 0.

- [ ] **Step 6: Commit**

```bash
git add tests/home-portfolio-marquee.test.mjs src/components/public/HomePortfolioMarquee.tsx src/app/globals.css
git commit -m "feat: ajoute le portfolio défilant incliné"
```

### Task 3: Composition sur la page d’accueil

**Files:**
- Modify: `src/app/page.tsx`
- Test: `tests/home-restoration.test.mjs`

**Interfaces:**
- Consumes: `HomePortfolioMarquee(): JSX.Element` from Task 2.

- [ ] **Step 1: Extend the homepage composition test**

Add assertions that locate the rendered components and enforce this order:

```js
assert.match(source, /import \{ HomePortfolioMarquee \}/);
const hero = source.indexOf('<HeroPublic />');
const portfolio = source.indexOf('<HomePortfolioMarquee />');
const services = source.indexOf('<ServicesPublic />');
assert.ok(hero >= 0 && portfolio > hero && services > portfolio);
```

- [ ] **Step 2: Run the test and verify RED**

Run: `node --test tests/home-restoration.test.mjs`

Expected: FAIL because the homepage does not import or render `HomePortfolioMarquee`.

- [ ] **Step 3: Compose the component**

Import `HomePortfolioMarquee` from `@/components/public/HomePortfolioMarquee` and render exactly:

```tsx
<HeroPublic />
<HomePortfolioMarquee />
<ServicesPublic />
```

Do not import or render the former `PortfolioShowcase`.

- [ ] **Step 4: Run all focused tests**

Run: `node --test tests/hero-social-proof.test.mjs tests/home-portfolio-marquee.test.mjs tests/home-restoration.test.mjs tests/hero-public.test.mjs`

Expected: all tests PASS.

- [ ] **Step 5: Commit**

```bash
git add tests/home-restoration.test.mjs src/app/page.tsx
git commit -m "feat: place le portfolio défilant sur l'accueil"
```

### Task 4: Final verification, review and deployment readiness

**Files:**
- Verify only; modify implementation and tests only for review findings.

**Interfaces:**
- Consumes the completed homepage from Tasks 1–3.

- [ ] **Step 1: Run the complete automated verification**

Run: `node --test tests/*.test.mjs`

Expected: all tests PASS with zero failures.

Run: `npx tsc --noEmit`

Expected: exit code 0.

Run: `npm run build`

Expected: Next.js production build exits 0 and generates all routes.

- [ ] **Step 2: Perform responsive visual checks**

At widths 390, 768 and 1440 pixels verify: reduced hero top gap, no avatar overflow, diagonal strip edges remain visible, images remain visually upright, seamless scrolling, and exact placement before Services. Enable reduced motion and verify the strip is static.

- [ ] **Step 3: Request code review**

Review the complete diff against `docs/superpowers/specs/2026-08-21-hero-preuve-sociale-portfolio-defilant-design.md`. Fix all Critical and Important findings through a fresh failing test, then repeat Step 1.

- [ ] **Step 4: Commit review fixes if necessary**

```bash
git add src/components/public/HeroSocialProof.tsx src/components/public/HeroPublic.tsx src/components/public/HomePortfolioMarquee.tsx src/app/page.tsx src/app/globals.css tests/hero-social-proof.test.mjs tests/home-portfolio-marquee.test.mjs tests/home-restoration.test.mjs
git commit -m "fix: finalise l'expérience premium de l'accueil"
```

- [ ] **Step 5: Merge, push and deploy only after user authorization**

Fast-forward the verified feature branch into `main`, repeat the full tests on merged `main`, push `main` to GitHub, deploy to Vercel production, and verify the public URL returns HTTP 200 with the new proof text and portfolio image markers.
