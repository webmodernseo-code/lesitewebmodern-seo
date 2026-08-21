# Homepage Motion and Social Proof Polish Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Affiner la preuve sociale et les espacements du portfolio, puis orchestrer des apparitions au scroll professionnelles sur la page d’accueil.

**Architecture:** `Reveal` reçoit quatre variantes rétrocompatibles. Un nouveau `StaggerReveal` anime les descendants de composants historiques via leurs sélecteurs CSS stables, sans réécrire leur HTML. La page d’accueil compose les variantes ; le hero, ses sliders et les témoignages conservent leurs animations propres.

**Tech Stack:** Next.js 14, React, TypeScript, Tailwind CSS, CSS transitions, IntersectionObserver, Node test runner.

## Global Constraints

- Les nouvelles animations s’appliquent uniquement à la page d’accueil.
- Aucune nouvelle bibliothèque d’animation.
- Le hero LCP ne reçoit aucune animation au scroll.
- Les translations sont limitées à 32 px et aucun flou n’est utilisé.
- Toutes les animations respectent `prefers-reduced-motion`.
- Les animations se jouent une seule fois et aucun contenu ne peut rester invisible.
- Les portraits sont des photographies authentiques, diversifiées, hébergées localement, avec provenance et licence documentées.
- Les pages `/portfolio`, Services, À propos, Blog et politiques ne changent pas de chorégraphie.

---

### Task 1: Badge, avatars et espacements du portfolio

**Files:**
- Modify: `src/components/public/HeroPublic.tsx`
- Modify: `src/components/public/HeroSocialProof.tsx`
- Modify: `src/components/public/HomePortfolioMarquee.tsx`
- Replace: `public/images/avatars/client-portrait-1.jpg`
- Replace: `public/images/avatars/client-portrait-2.jpg`
- Replace: `public/images/avatars/client-portrait-3.jpg`
- Create: `public/images/avatars/SOURCES.md`
- Modify: `tests/hero-social-proof.test.mjs`
- Modify: `tests/home-portfolio-marquee.test.mjs`

**Interfaces:**
- `HeroSocialProof(): JSX.Element` reste sans props.
- `HomePortfolioMarquee(): JSX.Element` reste sans props.

- [ ] **Step 1: Write failing visual contract tests**

Add these assertions:

```js
assert.match(hero, /rounded-full border border-black\/\[0\.08\] bg-black\/\[0\.03\]/);
assert.match(hero, /text-\[#0FAC71\]/);
assert.match(proof, /h-7 w-7/);
assert.match(proof, /sm:h-\[30px\] sm:w-\[30px\]/);
assert.match(proof, /text-\[#0FAC71\]/);
assert.doesNotMatch(proof, /text-brand-orange/);
assert.match(marquee, /py-6 sm:py-8/);
assert.match(marquee, /py-5 sm:py-6/);
assert.doesNotMatch(marquee, /py-12 sm:py-16|py-9/);
```

Also assert that `SOURCES.md` contains three distinct `https://` source pages and three license labels.

- [ ] **Step 2: Run tests and verify RED**

Run: `node --test tests/hero-social-proof.test.mjs tests/home-portfolio-marquee.test.mjs`

Expected: FAIL on old orange stars, avatar dimensions and portfolio padding.

- [ ] **Step 3: Select and verify three authentic portraits**

Use image search to select three portrait photographs with these exact acceptance rules: three different photographers; visibly diverse adult subjects; natural professional light; centered face; no celebrity; no photo already used by the current three files; source page explicitly permits reuse. Save the source page URL, photographer, platform and license in `public/images/avatars/SOURCES.md` before downloading. Reject any source whose license cannot be stated explicitly.

Download the largest square-compatible JPEG, crop to 160×160 without face distortion, and save under the three existing filenames. Verify JPEG magic bytes `FF D8 FF`, dimensions 160×160 and unique SHA-256 hashes.

- [ ] **Step 4: Implement the hero badge and compact proof**

In `HeroPublic.tsx`, replace the plain badge classes with:

```tsx
className="mb-6 inline-flex items-center gap-2 rounded-full border border-black/[0.08] bg-black/[0.03] px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.08em] text-[#5c5c64]"
```

and add `<span className="text-[#0FAC71]">✦</span>` before its text.

In `HeroSocialProof.tsx`, use `h-7 w-7 sm:h-[30px] sm:w-[30px]`, `-ml-2`, `gap-2.5`, reduced padding, and `text-[#0FAC71]` for the star row. Keep exactly five filled `Star` icons and the existing copy.

- [ ] **Step 5: Reduce marquee spacing**

Change the section to `py-6 sm:py-8` and the rotated viewport to `py-5 sm:py-6`. Keep `-rotate-2`, card `rotate-2`, overflow protection and focus styles unchanged.

- [ ] **Step 6: Verify and commit**

Run: `node --test tests/hero-social-proof.test.mjs tests/home-portfolio-marquee.test.mjs`

Run: `npx tsc --noEmit`

Expected: all PASS, exit code 0.

```bash
git add src/components/public/HeroPublic.tsx src/components/public/HeroSocialProof.tsx src/components/public/HomePortfolioMarquee.tsx public/images/avatars tests/hero-social-proof.test.mjs tests/home-portfolio-marquee.test.mjs
git commit -m "style: affine la preuve sociale et le portfolio"
```

### Task 2: Variantes directionnelles de Reveal

**Files:**
- Modify: `src/components/Reveal.tsx`
- Create: `tests/reveal-variants.test.mjs`

**Interfaces:**
- Produces: `type RevealVariant = 'up' | 'left' | 'right' | 'scale'`.
- Extends: `RevealProps` with `variant?: RevealVariant`, default `up`.

- [ ] **Step 1: Write the failing Reveal variant test**

```js
test('Reveal exposes four motion variants with up as the default', async () => {
  const source = await readFile('src/components/Reveal.tsx', 'utf8');
  assert.match(source, /type RevealVariant = 'up' \| 'left' \| 'right' \| 'scale'/);
  assert.match(source, /variant = 'up'/);
  for (const classes of ['translate-y-6', '-translate-x-8', 'translate-x-8', 'scale-[0.97]']) {
    assert.match(source, new RegExp(classes.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
  }
  assert.match(source, /prefers-reduced-motion/);
  assert.match(source, /opacity-100 translate-x-0 translate-y-0 scale-100/);
});
```

- [ ] **Step 2: Run test and verify RED**

Run: `node --test tests/reveal-variants.test.mjs`

Expected: FAIL because `RevealVariant` is missing.

- [ ] **Step 3: Implement variant mapping**

Add:

```tsx
export type RevealVariant = 'up' | 'left' | 'right' | 'scale';

const hiddenClasses: Record<RevealVariant, string> = {
  up: 'opacity-0 translate-y-6',
  left: 'opacity-0 -translate-x-8',
  right: 'opacity-0 translate-x-8',
  scale: 'opacity-0 translate-y-3 scale-[0.97]',
};
```

Use `opacity-100 translate-x-0 translate-y-0 scale-100` as the visible state and keep the existing observer, fallback, delay and default behavior.

- [ ] **Step 4: Verify compatibility and commit**

Run: `node --test tests/reveal-variants.test.mjs tests/home-restoration.test.mjs`

Run: `npx tsc --noEmit`

Expected: all PASS.

```bash
git add src/components/Reveal.tsx tests/reveal-variants.test.mjs
git commit -m "feat: ajoute les variantes directionnelles de Reveal"
```

### Task 3: StaggerReveal accessible et réutilisable

**Files:**
- Create: `src/components/StaggerReveal.tsx`
- Modify: `src/app/globals.css`
- Create: `tests/stagger-reveal.test.mjs`

**Interfaces:**
- Produces: `StaggerReveal({ children, selector, variant?, step?, className?, as?, id? })`.
- Consumes: `RevealVariant` from `@/components/Reveal`.
- Defaults: `variant='up'`, `step=100`, `as='div'`.

- [ ] **Step 1: Write the failing stagger test**

Assert that the component imports `RevealVariant`, requires `selector: string`, queries descendants with `querySelectorAll<HTMLElement>(selector)`, writes `--stagger-index`, uses IntersectionObserver once, handles reduced motion, disconnects the observer and removes temporary inline properties on cleanup. Assert CSS contains selectors for `data-stagger-variant="up|left|right|scale"`, `.is-visible`, `--stagger-step` and a reduced-motion media query.

- [ ] **Step 2: Run test and verify RED**

Run: `node --test tests/stagger-reveal.test.mjs`

Expected: FAIL because `StaggerReveal.tsx` does not exist.

- [ ] **Step 3: Implement observer and descendant indexing**

The wrapper receives `data-stagger-variant`, `style={{ '--stagger-step': `${step}ms` } as React.CSSProperties }`, and the selected descendants receive class `stagger-reveal-item` plus `--stagger-index`. On intersection, set `visible=true` and disconnect. Reduced motion and missing IntersectionObserver set visible immediately. Keep the 1.2 s fallback. Cleanup removes the class and inline index from every selected node.

- [ ] **Step 4: Add global motion CSS**

Define initial opacity/transform per variant, a 700 ms transition, `transition-delay: calc(var(--stagger-index) * var(--stagger-step))`, a visible state resetting translation/scale, and a reduced-motion override that forces immediate visibility and no transition.

- [ ] **Step 5: Verify and commit**

Run: `node --test tests/stagger-reveal.test.mjs`

Run: `npx tsc --noEmit`

Expected: PASS and exit code 0.

```bash
git add src/components/StaggerReveal.tsx src/app/globals.css tests/stagger-reveal.test.mjs
git commit -m "feat: ajoute les révélations échelonnées"
```

### Task 4: Chorégraphie de la page d’accueil

**Files:**
- Modify: `src/app/page.tsx`
- Modify: `tests/home-restoration.test.mjs`

**Interfaces:**
- Consumes: `Reveal` variants and `StaggerReveal` from Tasks 2–3.

- [ ] **Step 1: Write the failing homepage choreography test**

Assert exact composition markers:

```js
assert.match(source, /<Reveal variant="up">\s*<HomePortfolioMarquee \/>/);
assert.match(source, /<StaggerReveal[\s\S]*selector="\.wms-services-card, \.wms-services-tag-badge"[\s\S]*step=\{80\}/);
assert.match(source, /id="apropos"[\s\S]*variant="right"/);
assert.match(source, /id="cta"[\s\S]*variant="scale"/);
assert.match(source, /selector="\.wms-faq-item"[\s\S]*step=\{80\}/);
assert.doesNotMatch(source, /<Reveal[\s\S]{0,100}<TestimonialsSection/);
```

- [ ] **Step 2: Run test and verify RED**

Run: `node --test tests/home-restoration.test.mjs`

Expected: FAIL because variants and stagger wrappers are absent.

- [ ] **Step 3: Compose the choreography**

Import `StaggerReveal`. Wrap the portfolio in `Reveal variant="up"`; Services in the existing section-level `Reveal variant="up"` plus `StaggerReveal selector=".wms-services-card, .wms-services-tag-badge" variant="up" step={80}`; About in `Reveal variant="right"`; leave testimonials without Reveal; CTA in `Reveal variant="scale"`; FAQ in `Reveal variant="up"` plus `StaggerReveal selector=".wms-faq-item" variant="up" step={80}`.

- [ ] **Step 4: Verify and commit**

Run: `node --test tests/home-restoration.test.mjs tests/reveal-variants.test.mjs tests/stagger-reveal.test.mjs`

Run: `npx tsc --noEmit`

Expected: all PASS.

```bash
git add src/app/page.tsx tests/home-restoration.test.mjs
git commit -m "feat: orchestre les apparitions de l'accueil"
```

### Task 5: Full verification, visual review and deployment readiness

**Files:**
- Verify all changed files; fix only findings covered by the approved spec.

**Interfaces:**
- Consumes the completed Tasks 1–4.

- [ ] **Step 1: Run complete automated checks**

Run: `node --test tests/*.test.mjs`

Run: `npx tsc --noEmit`

Run: `npm run build`

Expected: zero test failures, TypeScript exit 0 and Next.js build exit 0.

- [ ] **Step 2: Perform visual checks**

At 390, 768 and 1440 px, verify smaller avatars, green stars, badge parity, reduced marquee gaps, unclipped tilted cards, section directions, stagger order and no horizontal overflow. Enable reduced motion and confirm immediate static visibility. Scroll rapidly and navigate to `/#faq` to confirm no section remains hidden.

- [ ] **Step 3: Request code review**

Review against `docs/superpowers/specs/2026-08-21-homepage-motion-social-proof-polish-design.md`. Fix every Critical or Important issue with a new failing regression test, then repeat Step 1.

- [ ] **Step 4: Prepare integration**

Use `superpowers:finishing-a-development-branch`. Merge and deploy only after the user selects the integration option. Verify production HTML contains the new green badge marker and stagger CSS after deployment.
