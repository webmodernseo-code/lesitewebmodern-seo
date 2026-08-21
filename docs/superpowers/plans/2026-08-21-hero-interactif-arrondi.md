# Hero interactif arrondi — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transformer le hero actuel en carte flottante arrondie, avec un titre à mot rotatif et une constellation de points interactive superposée au dégradé existant.

**Architecture:** `HeroPublic` reste responsable du contenu commercial et compose deux effets clients exportés depuis un fichier ciblé. `BubbleBackground` encapsule entièrement le canvas et son cycle de vie ; `RotatingWord` encapsule la rotation accessible des quatre mots. Les tests de contrat utilisent `node:test`, déjà inclus dans Node, afin de ne pas ajouter de dépendance.

**Tech Stack:** Next.js 14.2, React 18, TypeScript 5, Tailwind CSS 3.4, Framer Motion 12, API Canvas, `node:test`.

## Global Constraints

- Conserver le surtitre, le paragraphe, les deux CTA et la preuve sociale actuels.
- Conserver le dégradé sable-vers-blanc actuel sous la constellation.
- Utiliser exactement les mots « visibilité », « trafic », « notoriété » et « chiffre d’affaires ».
- Utiliser l’orange de marque pour le mot rotatif.
- Appliquer quatre coins arrondis d’environ 32 px sur ordinateur, légèrement réduits sur mobile.
- Ne capter aucun clic avec le canvas et lui appliquer `aria-hidden="true"`.
- Avec `prefers-reduced-motion: reduce`, garder le premier mot, les points statiques et désactiver l’interaction au curseur.
- Ne pas ajouter de dépendance ni d’appel réseau.
- Ne modifier aucune section après le hero.

---

### Task 1: Effets clients isolés du hero

**Files:**
- Create: `tests/hero-effects.test.mjs`
- Create: `src/components/public/HeroEffects.tsx`

**Interfaces:**
- Consumes: React hooks, `motion` depuis `framer-motion`, API Canvas du navigateur.
- Produces: `BubbleBackground(): JSX.Element` et `RotatingWord({ words }: { words: readonly string[] }): JSX.Element`.

- [ ] **Step 1: Write the failing contract tests**

Créer `tests/hero-effects.test.mjs` :

```js
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const effectsPath = new URL('../src/components/public/HeroEffects.tsx', import.meta.url);

async function effectsSource() {
  return readFile(effectsPath, 'utf8');
}

test('exports the canvas background and rotating word components', async () => {
  const source = await effectsSource();
  assert.match(source, /export function BubbleBackground/);
  assert.match(source, /export function RotatingWord/);
});

test('honours reduced motion and exposes a decorative canvas', async () => {
  const source = await effectsSource();
  assert.match(source, /prefers-reduced-motion: reduce/);
  assert.match(source, /aria-hidden="true"/);
  assert.match(source, /pointer-events-none/);
});

test('cleans up animation frame and browser listeners', async () => {
  const source = await effectsSource();
  assert.match(source, /cancelAnimationFrame/);
  assert.match(source, /removeEventListener/);
});
```

- [ ] **Step 2: Run the tests and verify RED**

Run: `node --test tests/hero-effects.test.mjs`

Expected: FAIL avec `ENOENT` pour `HeroEffects.tsx`, puisque le composant n’existe pas encore.

- [ ] **Step 3: Implement the two effects**

Créer `src/components/public/HeroEffects.tsx` avec :

```tsx
'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface Bubble {
  x: number;
  y: number;
  baseOpacity: number;
  currentOpacity: number;
  opacitySpeed: number;
}

const BUBBLE_SPACING = 24;
const BASE_RADIUS = 1.2;
const INTERACTION_RADIUS = 150;
const OPACITY_MIN = 0.08;
const OPACITY_MAX = 0.18;

export function BubbleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const bubblesRef = useRef<Bubble[]>([]);
  const frameRef = useRef<number | null>(null);
  const sizeRef = useRef({ width: 0, height: 0 });
  const mouseRef = useRef<{ x: number | null; y: number | null }>({ x: null, y: null });

  const createBubbles = useCallback(() => {
    const { width, height } = sizeRef.current;
    const bubbles: Bubble[] = [];
    for (let x = BUBBLE_SPACING / 2; x < width; x += BUBBLE_SPACING) {
      for (let y = BUBBLE_SPACING / 2; y < height; y += BUBBLE_SPACING) {
        const opacity = Math.random() * (OPACITY_MAX - OPACITY_MIN) + OPACITY_MIN;
        bubbles.push({ x, y, baseOpacity: opacity, currentOpacity: opacity, opacitySpeed: Math.random() * 0.004 + 0.0015 });
      }
    }
    bubblesRef.current = bubbles;
  }, []);

  const resize = useCallback(() => {
    const canvas = canvasRef.current;
    const parent = canvas?.parentElement;
    if (!canvas || !parent) return;
    const pixelRatio = window.devicePixelRatio || 1;
    const width = parent.clientWidth;
    const height = parent.clientHeight;
    canvas.width = width * pixelRatio;
    canvas.height = height * pixelRatio;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    canvas.getContext('2d')?.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    sizeRef.current = { width, height };
    createBubbles();
  }, [createBubbles]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (!canvas || !context) return;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const handleMouseMove = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: event.clientX - rect.left, y: event.clientY - rect.top };
    };
    const handleMouseLeave = () => { mouseRef.current = { x: null, y: null }; };
    const draw = () => {
      const { width, height } = sizeRef.current;
      context.clearRect(0, 0, width, height);
      for (const bubble of bubblesRef.current) {
        if (!reducedMotion) {
          bubble.currentOpacity += bubble.opacitySpeed;
          if (bubble.currentOpacity >= OPACITY_MAX || bubble.currentOpacity <= OPACITY_MIN) bubble.opacitySpeed *= -1;
        }
        let interaction = 0;
        const { x: mouseX, y: mouseY } = mouseRef.current;
        if (!reducedMotion && mouseX !== null && mouseY !== null) {
          const distance = Math.hypot(bubble.x - mouseX, bubble.y - mouseY);
          if (distance < INTERACTION_RADIUS) interaction = Math.pow(1 - distance / INTERACTION_RADIUS, 2);
        }
        context.beginPath();
        context.fillStyle = `rgba(10, 10, 10, ${Math.min(0.65, bubble.currentOpacity + interaction * 0.4)})`;
        context.arc(bubble.x, bubble.y, BASE_RADIUS + interaction * 1.8, 0, Math.PI * 2);
        context.fill();
      }
      if (!reducedMotion) frameRef.current = requestAnimationFrame(draw);
    };
    resize();
    window.addEventListener('resize', resize);
    if (!reducedMotion) window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.documentElement.addEventListener('mouseleave', handleMouseLeave);
    draw();
    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.documentElement.removeEventListener('mouseleave', handleMouseLeave);
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    };
  }, [resize]);

  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden="true">
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden="true" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_55%,rgba(255,255,255,0.92)_98%)]" />
    </div>
  );
}

export function RotatingWord({ words }: { words: readonly string[] }) {
  const [index, setIndex] = useState(0);
  const reducedMotion = useReducedMotion();
  useEffect(() => {
    if (reducedMotion) return;
    const interval = window.setInterval(() => setIndex((current) => (current + 1) % words.length), 2400);
    return () => window.clearInterval(interval);
  }, [reducedMotion, words.length]);
  return (
    <span className="relative inline-flex min-h-[1.15em] max-w-full overflow-hidden align-bottom text-brand-orange">
      <motion.span
        key={words[index]}
        initial={reducedMotion ? false : { y: '100%', opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', damping: 22, stiffness: 260 }}
        className="inline-block max-w-full whitespace-normal sm:whitespace-nowrap"
      >
        {words[index]}
      </motion.span>
    </span>
  );
}
```

- [ ] **Step 4: Run tests and TypeScript verification**

Run: `node --test tests/hero-effects.test.mjs`

Expected: 3 tests PASS.

Run: `npx tsc --noEmit`

Expected: exit code 0, sans erreur TypeScript.

- [ ] **Step 5: Commit the isolated effects**

```bash
git add -- tests/hero-effects.test.mjs src/components/public/HeroEffects.tsx
git commit -m "feat: ajoute les effets interactifs du hero"
```

### Task 2: Composition dans le hero existant

**Files:**
- Create: `tests/hero-public.test.mjs`
- Modify: `src/components/public/HeroPublic.tsx`

**Interfaces:**
- Consumes: `BubbleBackground` et `RotatingWord` depuis `@/components/public/HeroEffects`.
- Produces: le composant public existant `HeroPublic`, sans changement de signature.

- [ ] **Step 1: Write the failing integration contract tests**

Créer `tests/hero-public.test.mjs` :

```js
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const heroPath = new URL('../src/components/public/HeroPublic.tsx', import.meta.url);

test('composes the background and exact rotating title words', async () => {
  const source = await readFile(heroPath, 'utf8');
  assert.match(source, /<BubbleBackground\s*\/>/);
  assert.match(source, /On développe votre/);
  for (const word of ['visibilité', 'trafic', 'notoriété', 'chiffre d’affaires']) assert.match(source, new RegExp(word));
});

test('keeps the commercial content and uses a rounded clipped shell', async () => {
  const source = await readFile(heroPath, 'utf8');
  assert.match(source, /Prendre un RDV offert/);
  assert.match(source, /Découvrir nos services/);
  assert.match(source, /HERO_PROOF_STAT/);
  assert.match(source, /rounded-\[32px\]/);
  assert.match(source, /overflow-hidden/);
});
```

- [ ] **Step 2: Run the tests and verify RED**

Run: `node --test tests/hero-public.test.mjs`

Expected: FAIL car `HeroPublic` ne compose pas encore `BubbleBackground`, `RotatingWord` et le nouveau titre.

- [ ] **Step 3: Modify only the shell and title in `HeroPublic`**

Dans `src/components/public/HeroPublic.tsx` :

1. Ajouter `import { BubbleBackground, RotatingWord } from '@/components/public/HeroEffects';`.
2. Ajouter `const HERO_WORDS = ['visibilité', 'trafic', 'notoriété', 'chiffre d’affaires'] as const;`.
3. Remplacer l’élément racine par :

```tsx
<section className="w-full bg-white px-3 py-3 sm:px-6 sm:py-6">
  <div className="relative mx-auto w-full max-w-[1440px] overflow-hidden rounded-[24px] bg-gradient-to-b from-brand-sable/60 to-white sm:rounded-[32px]">
    <BubbleBackground />
    <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center px-6 py-24 text-center sm:py-32">
      {/* contenu actuel */}
    </div>
  </div>
</section>
```

4. Remplacer uniquement le `<h1>` actuel par :

```tsx
<h1 className="mb-6 max-w-4xl font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-black sm:text-5xl md:text-6xl">
  <span className="block">On développe votre</span>
  <RotatingWord words={HERO_WORDS} />
</h1>
```

5. Laisser à l’identique le surtitre, le paragraphe, les deux liens et le bloc `HERO_PROOF_STAT`.

- [ ] **Step 4: Run integration and regression checks**

Run: `node --test tests/hero-effects.test.mjs tests/hero-public.test.mjs`

Expected: 5 tests PASS.

Run: `npx tsc --noEmit`

Expected: exit code 0.

- [ ] **Step 5: Commit the hero composition**

```bash
git add -- tests/hero-public.test.mjs src/components/public/HeroPublic.tsx
git commit -m "feat: compose le hero interactif arrondi"
```

### Task 3: Vérification de production et contrôle visuel

**Files:**
- Modify only if a verified visual defect exists: `src/components/public/HeroEffects.tsx`
- Modify only if a verified visual defect exists: `src/components/public/HeroPublic.tsx`

**Interfaces:**
- Consumes: hero complet produit par Tasks 1 et 2.
- Produces: validation de livraison, sans nouvelle interface.

- [ ] **Step 1: Run the complete automated verification**

Run: `node --test tests/hero-effects.test.mjs tests/hero-public.test.mjs`

Expected: 5 tests PASS.

Run: `npx tsc --noEmit`

Expected: exit code 0.

Run: `npm run build`

Expected: build Next.js terminé avec exit code 0.

- [ ] **Step 2: Inspect desktop rendering**

Run: `npm run dev`, puis ouvrir `http://localhost:3000` à 1440 × 900.

Vérifier exactement : quatre coins arrondis visibles, marge latérale, dégradé conservé, points derrière le contenu, réaction douce au curseur, CTA inchangés et aucune rupture de mise en page lors des quatre mots.

- [ ] **Step 3: Inspect mobile and reduced-motion rendering**

À 390 × 844, vérifier : rayon réduit à 24 px, absence de défilement horizontal, « chiffre d’affaires » entièrement lisible, boutons utilisables et preuve sociale contenue.

Activer `prefers-reduced-motion: reduce`, recharger et vérifier : « visibilité » reste affiché, les points restent statiques et aucun point ne réagit au curseur.

- [ ] **Step 4: Apply only evidence-based polish if needed**

Si une vérification de Steps 2–3 échoue, écrire d’abord un test de contrat reproduisant l’exigence, observer son échec, puis modifier uniquement la classe ou le comportement responsable. Rejouer les cinq tests, TypeScript et le build après chaque correction.

- [ ] **Step 5: Commit verified visual fixes, if any**

```bash
git add -- tests/hero-effects.test.mjs tests/hero-public.test.mjs src/components/public/HeroEffects.tsx src/components/public/HeroPublic.tsx
git commit -m "fix: finalise le rendu responsive du hero"
```

S’il n’existe aucune correction après les contrôles visuels, ne créer aucun commit vide.
