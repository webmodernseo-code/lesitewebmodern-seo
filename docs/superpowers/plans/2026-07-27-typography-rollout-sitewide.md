# Déploiement de la police d'affichage sur tout le site public — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Étendre la police d'affichage (`font-display`, Bricolage Grotesque) déjà appliquée sur la home à tous les titres H1-H4 restants du site public (hors espace admin/dashboard/CRM/login, hors périmètre).

**Architecture:** Chaque fichier public a déjà (ou non) un bloc `<style jsx>` qui force `font-family: 'Inter' !important` sur ses enfants via un sélecteur wrapper. La méthode déjà validée sur la home (Tâche 5 de la passe précédente) consiste à ajouter `font-family: var(--font-display), sans-serif !important;` à un sélecteur de spécificité égale ou supérieure au wrapper, en général directement dans la règle CSS dédiée du titre quand elle existe déjà (pas de nouveau sélecteur nécessaire, l'ordre de déclaration suffit à gagner si la spécificité est égale). Les pages sans blocage `!important` reçoivent directement la classe Tailwind `font-display`.

**Tech Stack:** Next.js 14 (App Router), Tailwind CSS 3, CSS-in-JS (`<style jsx>`). Aucune nouvelle dépendance.

**Référence :** Audit de reconnaissance mené avant ce plan, confirmé fichier par fichier avec lecture directe du code source.

## Global Constraints

- Périmètre : uniquement les fichiers listés dans ce plan (site public). Aucun changement sur l'espace admin/dashboard/CRM/login.
- `AvisPublic.tsx` est du code mort (jamais importé nulle part dans `src/`) — explicitement exclu de ce plan, ne pas y toucher.
- Le bug `className`/`class` sur 5 titres H1 (apropos, 3 pages services, portfolio) est corrigé par un plan séparé (`2026-07-27-fix-className-typo-bug.md`) déjà mergé ou en cours de PR — ce plan-ci suppose que `class="..."` est déjà correct sur ces 5 titres et se contente d'ajouter `font-family` par-dessus.
- Chaque ajout `font-family: var(--font-display), sans-serif !important;` doit être vérifié par le rendu HTML servi (computed style ou au minimum absence de régression visuelle), pas seulement par un grep sur le code source — leçon tirée d'un bug de spécificité découvert lors de la passe précédente (une règle ajoutée peut être servie sans jamais gagner la cascade).
- Le projet n'a pas de test runner : vérification par `npx tsc --noEmit` et des vérifications `curl`/`grep` du HTML rendu par le serveur de dev.
- Palette et polices : aucun changement en dehors de l'application de `font-display` aux titres listés — pas de nouvelle couleur, pas de changement de taille/poids/contenu des titres.

---

### Task 1: Titres restants sur les composants de la home (Footer, Services, About)

**Files:**
- Modify: `src/components/public/FooterPublic.tsx`
- Modify: `src/components/public/ServicesPublic.tsx`
- Modify: `src/components/public/AboutPublic.tsx`

**Interfaces:**
- Consumes : `--font-display` (déjà défini dans `src/app/layout.tsx`).
- Produces : rien.

- [ ] **Step 1: `FooterPublic.tsx` — 3 titres de colonne (h4, sans classe)**

Les 3 `<h4>` du footer ("Nos Services", "Navigation", "Contact") n'ont pas de classe propre — ils sont dans `<div class="wms-footer-col">`. Ajouter une nouvelle règle juste après le bloc de reset Inter (après la ligne `font-family: 'Inter', sans-serif !important;` de la règle `.wms-footer-wrapper *, ...`) :

Remplacer :

```css
        .wms-footer-wrapper *,
        .wms-footer-wrapper h1,
        .wms-footer-wrapper h2,
        .wms-footer-wrapper h3,
        .wms-footer-wrapper h4,
        .wms-footer-wrapper p,
        .wms-footer-wrapper a,
        .wms-footer-wrapper span,
        .wms-footer-wrapper li {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
            list-style: none;
            text-decoration: none;
            font-family: 'Inter', sans-serif !important;
        }
```

par :

```css
        .wms-footer-wrapper *,
        .wms-footer-wrapper h1,
        .wms-footer-wrapper h2,
        .wms-footer-wrapper h3,
        .wms-footer-wrapper h4,
        .wms-footer-wrapper p,
        .wms-footer-wrapper a,
        .wms-footer-wrapper span,
        .wms-footer-wrapper li {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
            list-style: none;
            text-decoration: none;
            font-family: 'Inter', sans-serif !important;
        }

        /* Titres de colonne en police d'affichage (sélecteur plus spécifique que le reset Inter ci-dessus) */
        .wms-footer-wrapper .wms-footer-col h4 {
            font-family: var(--font-display), sans-serif !important;
        }
```

- [ ] **Step 2: `ServicesPublic.tsx` — 3 titres de carte (h3, classe partagée)**

Les 3 `<h3 class="wms-services-card-title">` partagent la même classe. Remplacer le bloc de reset Inter :

```css
        /* Force la police Inter sur le composant Services et tous ses enfants */
        .wms-services-section,
        .wms-services-section *,
        .wms-services-section h1,
        .wms-services-section h2,
        .wms-services-section h3,
        .wms-services-section h4,
        .wms-services-section p,
        .wms-services-section a,
        .wms-services-section span {
            font-family: 'Inter', sans-serif !important;
        }
```

par :

```css
        /* Force la police Inter sur le composant Services et tous ses enfants */
        .wms-services-section,
        .wms-services-section *,
        .wms-services-section h1,
        .wms-services-section h2,
        .wms-services-section h3,
        .wms-services-section h4,
        .wms-services-section p,
        .wms-services-section a,
        .wms-services-section span {
            font-family: 'Inter', sans-serif !important;
        }

        /* Titres de carte en police d'affichage (sélecteur plus spécifique que le reset Inter ci-dessus) */
        .wms-services-section .wms-services-card-title {
            font-family: var(--font-display), sans-serif !important;
        }
```

- [ ] **Step 3: `AboutPublic.tsx` — 2 titres de carte (h3, sans classe)**

Les 2 `<h3>` ("Vitesse Éclair", "Confiance Totale") sont bruts, dans `<div class="presentation-feature-card">`. Remplacer le bloc de reset Inter :

```css
    .wm-presentation,
    .wm-presentation h2,
    .wm-presentation h3,
    .wm-presentation p,
    .wm-presentation a,
    .wm-presentation span,
    .wm-presentation strong,
    .wm-presentation small,
    .wm-presentation div {
        font-family: 'Inter', sans-serif !important;
    }
```

par :

```css
    .wm-presentation,
    .wm-presentation h2,
    .wm-presentation h3,
    .wm-presentation p,
    .wm-presentation a,
    .wm-presentation span,
    .wm-presentation strong,
    .wm-presentation small,
    .wm-presentation div {
        font-family: 'Inter', sans-serif !important;
    }

    /* Titres de carte en police d'affichage (sélecteur plus spécifique que le reset Inter ci-dessus) */
    .wm-presentation .presentation-feature-card h3 {
        font-family: var(--font-display), sans-serif !important;
    }
```

- [ ] **Step 4: Vérifier la compilation**

Run: `npx tsc --noEmit`
Expected: aucune erreur.

- [ ] **Step 5: Vérifier le rendu**

```bash
npm run dev > /tmp/wms-typo-t1-dev.log 2>&1 &
sleep 25
curl -s http://localhost:3000/ > /tmp/wms-typo-t1-home.html
grep -c "wms-footer-wrapper .wms-footer-col h4" /tmp/wms-typo-t1-home.html
grep -c "wms-services-section .wms-services-card-title" /tmp/wms-typo-t1-home.html
grep -c "wm-presentation .presentation-feature-card h3" /tmp/wms-typo-t1-home.html
```

Expected : les 3 commandes retournent chacune au moins `1` (un compte de `2` est possible et sans gravité — duplication RSC déjà observée sur cette home). Arrêter le serveur ensuite (`netstat -ano | grep :3000`, puis `taskkill //PID <pid> //F`).

- [ ] **Step 6: Commit**

```bash
git add src/components/public/FooterPublic.tsx src/components/public/ServicesPublic.tsx src/components/public/AboutPublic.tsx
git commit -m "feat: police d'affichage sur les titres restants de la home (Footer, cartes Services/About)"
```

---

### Task 2: Pages sans blocage CSS (police Tailwind directe)

**Files:**
- Modify: `src/app/contact/page.tsx`
- Modify: `src/app/blog/page.tsx`
- Modify: `src/app/blog/[slug]/page.tsx`
- Modify: `src/app/[ville]/page.tsx`
- Modify: `src/app/reservation/page.tsx`

**Interfaces:**
- Consumes : `font-display` (utilitaire Tailwind déjà défini).
- Produces : rien.

Ces 5 fichiers n'ont aucun bloc CSS forçant Inter — ajouter directement la classe `font-display` en tête de la chaîne `className` existante, sans rien changer d'autre.

- [ ] **Step 1: `src/app/contact/page.tsx` — h1 et h2**

Remplacer :

```tsx
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-black leading-none">
            Prêt à faire décoller votre <span className="text-[#ff4d00]">visibilité</span> ?
          </h1>
```

par :

```tsx
          <h1 className="font-display text-3xl md:text-4xl font-extrabold tracking-tight text-black leading-none">
            Prêt à faire décoller votre <span className="text-[#ff4d00]">visibilité</span> ?
          </h1>
```

Remplacer :

```tsx
            <h2 className="text-xs font-bold text-black/50 uppercase tracking-widest">
              Nos coordonnées
            </h2>
```

par :

```tsx
            <h2 className="font-display text-xs font-bold text-black/50 uppercase tracking-widest">
              Nos coordonnées
            </h2>
```

- [ ] **Step 2: `src/app/blog/page.tsx` — h1 et h3**

Remplacer :

```tsx
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-black leading-none">
            Analyses, conseils & <span className="text-[#ff4d00]">stratégies</span> de croissance.
          </h1>
```

par :

```tsx
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-black leading-none">
            Analyses, conseils & <span className="text-[#ff4d00]">stratégies</span> de croissance.
          </h1>
```

Remplacer :

```tsx
                  <h3 className="text-base font-extrabold text-black leading-snug">
                    {post.title}
                  </h3>
```

par :

```tsx
                  <h3 className="font-display text-base font-extrabold text-black leading-snug">
                    {post.title}
                  </h3>
```

- [ ] **Step 3: `src/app/blog/[slug]/page.tsx` — h1 et h3**

Remplacer :

```tsx
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-black leading-tight">
            {post.title}
          </h1>
```

par :

```tsx
          <h1 className="font-display text-3xl md:text-4xl font-extrabold tracking-tight text-black leading-tight">
            {post.title}
          </h1>
```

Remplacer :

```tsx
          <h3 className="text-lg font-bold text-black">Besoin d&apos;aide pour votre visibilité en ligne ?</h3>
```

par :

```tsx
          <h3 className="font-display text-lg font-bold text-black">Besoin d&apos;aide pour votre visibilité en ligne ?</h3>
```

- [ ] **Step 4: `src/app/[ville]/page.tsx` — h1 et h2**

Remplacer :

```tsx
          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-black leading-tight mb-6">
            Création de Site Internet & Référencement SEO à <span className="text-[#ff4d00]">{villeData.nom}</span>
          </h1>
```

par :

```tsx
          <h1 className="font-display text-4xl md:text-6xl font-black tracking-tight text-black leading-tight mb-6">
            Création de Site Internet & Référencement SEO à <span className="text-[#ff4d00]">{villeData.nom}</span>
          </h1>
```

Remplacer :

```tsx
            <h2 className="text-2xl md:text-3xl font-extrabold text-black mb-8">
              Pourquoi choisir WebModernSEO pour votre projet à {villeData.nom} ?
            </h2>
```

par :

```tsx
            <h2 className="font-display text-2xl md:text-3xl font-extrabold text-black mb-8">
              Pourquoi choisir WebModernSEO pour votre projet à {villeData.nom} ?
            </h2>
```

- [ ] **Step 5: `src/app/reservation/page.tsx` — h1**

Remplacer :

```tsx
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-black mb-3">
                Réservez votre appel stratégique <span className="text-[#ff4d00]">gratuit</span>
              </h1>
```

par :

```tsx
              <h1 className="font-display text-3xl md:text-4xl font-extrabold tracking-tight text-black mb-3">
                Réservez votre appel stratégique <span className="text-[#ff4d00]">gratuit</span>
              </h1>
```

- [ ] **Step 6: Vérifier la compilation**

Run: `npx tsc --noEmit`
Expected: aucune erreur.

- [ ] **Step 7: Vérifier le rendu**

```bash
npm run dev > /tmp/wms-typo-t2-dev.log 2>&1 &
sleep 25
curl -s http://localhost:3000/contact | grep -c "font-display text-3xl md:text-4xl font-extrabold tracking-tight text-black leading-none"
curl -s http://localhost:3000/blog | grep -c "font-display text-4xl md:text-5xl lg:text-6xl"
curl -s http://localhost:3000/reservation | grep -c "font-display text-3xl md:text-4xl font-extrabold tracking-tight text-black mb-3"
curl -s http://localhost:3000/grenoble | grep -c "font-display text-4xl md:text-6xl font-black"
```

Expected : chacune des 4 commandes retourne au moins `1`. Pour `/blog/[slug]` et le h2 de `/[ville]`, une vérification manuelle rapide suffit (contenu dynamique/variable) plutôt qu'un grep exact — ouvrir un article de blog existant et une page ville dans le HTML récupéré et confirmer visuellement la présence de `font-display` dans la classe du titre. Arrêter le serveur ensuite.

- [ ] **Step 8: Commit**

```bash
git add src/app/contact/page.tsx src/app/blog/page.tsx "src/app/blog/[slug]/page.tsx" "src/app/[ville]/page.tsx" src/app/reservation/page.tsx
git commit -m "feat: police d'affichage sur les titres de contact, blog, pages villes et reservation"
```

---

### Task 3: Page 404 (`not-found.tsx`)

**Files:**
- Modify: `src/app/not-found.tsx`

**Interfaces:**
- Consumes : `--font-display`.
- Produces : rien.

- [ ] **Step 1: Modifier la règle `.error-title` existante**

Cette règle gagne déjà la cascade face au reset universel du wrapper (même spécificité, déclarée après) — modification directe de la valeur, pas de nouveau sélecteur nécessaire.

Remplacer :

```css
  .error-title {
    font-family: 'Inter', sans-serif !important;
    font-size: clamp(24px, 4.2vw, 36px);
    font-weight: 800;
    color: var(--primary-black);
    margin: 0;
    letter-spacing: -0.02em;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }
```

par :

```css
  .error-title {
    font-family: var(--font-display), sans-serif !important;
    font-size: clamp(24px, 4.2vw, 36px);
    font-weight: 800;
    color: var(--primary-black);
    margin: 0;
    letter-spacing: -0.02em;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }
```

- [ ] **Step 2: Vérifier la compilation**

Run: `npx tsc --noEmit`
Expected: aucune erreur.

- [ ] **Step 3: Vérifier le rendu**

```bash
npm run dev > /tmp/wms-typo-t3-dev.log 2>&1 &
sleep 25
curl -s http://localhost:3000/cette-page-n-existe-pas | grep -c "var(--font-display)"
```

Expected : `1`. Arrêter le serveur ensuite.

- [ ] **Step 4: Commit**

```bash
git add src/app/not-found.tsx
git commit -m "feat: police d'affichage sur le titre de la page 404"
```

---

### Task 4: Page À propos (`apropos/page.tsx`)

**Files:**
- Modify: `src/app/apropos/page.tsx`

**Interfaces:**
- Consumes : `--font-display`. Le bug `className`/`class` sur le h1 de cette page est déjà corrigé par un plan séparé — cette tâche ajoute uniquement `font-family`.
- Produces : rien.

- [ ] **Step 1: `.wm-about-title` (h1)**

Remplacer :

```css
  .wm-about-title {
    font-size: clamp(28px, 4vw, 42px);
    font-weight: 800;
    line-height: 1.2;
    letter-spacing: -0.03em;
    color: var(--text) !important;
    margin: 0 0 20px;
  }
```

par :

```css
  .wm-about-title {
    font-family: var(--font-display), sans-serif !important;
    font-size: clamp(28px, 4vw, 42px);
    font-weight: 800;
    line-height: 1.2;
    letter-spacing: -0.03em;
    color: var(--text) !important;
    margin: 0 0 20px;
  }
```

- [ ] **Step 2: `.wm-about-value-title` (h3 ×2 : "Rigueur d'Ingénieur", "Performance SEO native")**

Remplacer :

```css
  .wm-about-value-title {
    font-size: 15px;
    font-weight: 700;
    color: var(--text);
    margin: 0 0 8px;
    display: flex;
    align-items: center;
    gap: 8px;
  }
```

par :

```css
  .wm-about-value-title {
    font-family: var(--font-display), sans-serif !important;
    font-size: 15px;
    font-weight: 700;
    color: var(--text);
    margin: 0 0 8px;
    display: flex;
    align-items: center;
    gap: 8px;
  }
```

- [ ] **Step 3: `.wms-cta-title` (h3, CTA de bas de page)**

Remplacer :

```css
  .wms-cta-title {
    font-size: clamp(2rem, 4vw, 3rem);
    font-weight: 800;
    color: var(--wms-cta-text-primary);
    line-height: 1.15;
    letter-spacing: -0.03em;
    max-width: 800px;
    margin: 0 auto 16px auto;
  }
```

par :

```css
  .wms-cta-title {
    font-family: var(--font-display), sans-serif !important;
    font-size: clamp(2rem, 4vw, 3rem);
    font-weight: 800;
    color: var(--wms-cta-text-primary);
    line-height: 1.15;
    letter-spacing: -0.03em;
    max-width: 800px;
    margin: 0 auto 16px auto;
  }
```

- [ ] **Step 4: Vérifier la compilation**

Run: `npx tsc --noEmit`
Expected: aucune erreur.

- [ ] **Step 5: Vérifier le rendu**

```bash
npm run dev > /tmp/wms-typo-t4-dev.log 2>&1 &
sleep 25
curl -s http://localhost:3000/apropos > /tmp/wms-typo-t4.html
grep -c "var(--font-display)" /tmp/wms-typo-t4.html
```

Expected : au moins `3` (une occurrence par règle modifiée ; un compte plus élevé dû à la duplication RSC est sans gravité). Arrêter le serveur ensuite.

- [ ] **Step 6: Commit**

```bash
git add src/app/apropos/page.tsx
git commit -m "feat: police d'affichage sur les titres de la page A propos"
```

---

### Task 5: Page Services — Référencement SEO

**Files:**
- Modify: `src/app/services/referencement-seo/page.tsx`

**Interfaces:**
- Consumes : `--font-display`. Le bug `className`/`class` sur le h1 de cette page est déjà corrigé par un plan séparé.
- Produces : rien.

Pour chacune des 8 règles suivantes, ajouter `font-family: var(--font-display), sans-serif !important;` comme première déclaration à l'intérieur du bloc (ces règles n'ont actuellement aucune déclaration `font-family` et gagnent déjà la cascade face au reset universel `.wm-seo-page *` — même spécificité ou plus, déclarées après ou via sélecteur composé).

- [ ] **Step 1: `.wm-seo-title` (h1, ligne 431)**

Remplacer :

```css
  .wm-seo-title {
    font-size: clamp(32px, 5.5vw, 54px);
```

par :

```css
  .wm-seo-title {
    font-family: var(--font-display), sans-serif !important;
    font-size: clamp(32px, 5.5vw, 54px);
```

- [ ] **Step 2: `.wm-seo-headline` (h2, ligne 489)**

Remplacer :

```css
  .wm-seo-headline {
    font-size: clamp(26px, 3.8vw, 36px);
```

par :

```css
  .wm-seo-headline {
    font-family: var(--font-display), sans-serif !important;
    font-size: clamp(26px, 3.8vw, 36px);
```

- [ ] **Step 3: `.wm-geo-col h3` (h3 bare ×2, ligne 632)**

Remplacer :

```css
  .wm-geo-col h3 {
    font-size: 24px;
```

par :

```css
  .wm-geo-col h3 {
    font-family: var(--font-display), sans-serif !important;
    font-size: 24px;
```

- [ ] **Step 4: `.wm-sim-left h3` (h3 bare, ligne 715)**

Remplacer :

```css
  .wm-sim-left h3 {
    font-size: 24px;
```

par :

```css
  .wm-sim-left h3 {
    font-family: var(--font-display), sans-serif !important;
    font-size: 24px;
```

- [ ] **Step 5: `.wm-catalogue-title` (h2, ligne 853)**

Remplacer :

```css
  .wm-catalogue-title {
    font-size: clamp(26px, 3.8vw, 36px);
```

par :

```css
  .wm-catalogue-title {
    font-family: var(--font-display), sans-serif !important;
    font-size: clamp(26px, 3.8vw, 36px);
```

- [ ] **Step 6: `.wm-catalogue-card-title` (h3 ×2, ligne 938)**

Remplacer :

```css
  .wm-catalogue-card-title {
    font-size: 19px;
```

par :

```css
  .wm-catalogue-card-title {
    font-family: var(--font-display), sans-serif !important;
    font-size: 19px;
```

- [ ] **Step 7: `.wms-cta-title` (h3, ligne 1015)**

Remplacer :

```css
  .wms-cta-title {
    font-size: clamp(2rem, 4vw, 3rem);
```

par :

```css
  .wms-cta-title {
    font-family: var(--font-display), sans-serif !important;
    font-size: clamp(2rem, 4vw, 3rem);
```

- [ ] **Step 8: `.wm-seo-anim-title` (h3, ligne 1145)**

Remplacer :

```css
  .wm-seo-anim-title {
    font-size: clamp(24px, 3.5vw, 32px);
```

par :

```css
  .wm-seo-anim-title {
    font-family: var(--font-display), sans-serif !important;
    font-size: clamp(24px, 3.5vw, 32px);
```

- [ ] **Step 9: Vérifier la compilation**

Run: `npx tsc --noEmit`
Expected: aucune erreur.

- [ ] **Step 10: Vérifier le rendu**

```bash
npm run dev > /tmp/wms-typo-t5-dev.log 2>&1 &
sleep 25
curl -s http://localhost:3000/services/referencement-seo > /tmp/wms-typo-t5.html
grep -c "var(--font-display)" /tmp/wms-typo-t5.html
```

Expected : au moins `8`. Arrêter le serveur ensuite.

- [ ] **Step 11: Commit**

```bash
git add src/app/services/referencement-seo/page.tsx
git commit -m "feat: police d'affichage sur les titres de la page Referencement SEO"
```

---

### Task 6: Page Services — Création Web

**Files:**
- Modify: `src/app/services/creation-web/page.tsx`

**Interfaces:**
- Consumes : `--font-display`. Le bug `className`/`class` sur le h1 de cette page est déjà corrigé par un plan séparé.
- Produces : rien.

- [ ] **Step 1: `.wm-service-title` (h1, ligne 236)**

Remplacer :

```css
  .wm-service-title {
    font-size: clamp(32px, 5.5vw, 54px);
```

par :

```css
  .wm-service-title {
    font-family: var(--font-display), sans-serif !important;
    font-size: clamp(32px, 5.5vw, 54px);
```

- [ ] **Step 2: `.wm-assets-headline` (h2, ligne 294)**

Remplacer :

```css
  .wm-assets-headline {
    font-size: clamp(26px, 3.8vw, 36px);
```

par :

```css
  .wm-assets-headline {
    font-family: var(--font-display), sans-serif !important;
    font-size: clamp(26px, 3.8vw, 36px);
```

- [ ] **Step 3: `.wm-sim-left h3` (h3 bare, ligne 442)**

Remplacer :

```css
  .wm-sim-left h3 {
    font-size: 24px;
```

par :

```css
  .wm-sim-left h3 {
    font-family: var(--font-display), sans-serif !important;
    font-size: 24px;
```

- [ ] **Step 4: `.wm-accomp-title` (h2, ligne 667)**

Remplacer :

```css
  .wm-accomp-title {
    text-align: center;
    font-size: clamp(26px, 3.8vw, 36px);
```

par :

```css
  .wm-accomp-title {
    font-family: var(--font-display), sans-serif !important;
    text-align: center;
    font-size: clamp(26px, 3.8vw, 36px);
```

- [ ] **Step 5: `.wm-accomp-card-title` (h3 ×3, ligne 749)**

Remplacer :

```css
  .wm-accomp-card-title {
    font-size: 20px;
```

par :

```css
  .wm-accomp-card-title {
    font-family: var(--font-display), sans-serif !important;
    font-size: 20px;
```

- [ ] **Step 6: `.wm-catalogue-title` (h2, ligne 769)**

Remplacer :

```css
  .wm-catalogue-title {
    font-size: clamp(26px, 3.8vw, 36px);
```

par :

```css
  .wm-catalogue-title {
    font-family: var(--font-display), sans-serif !important;
    font-size: clamp(26px, 3.8vw, 36px);
```

- [ ] **Step 7: `.wm-catalogue-card-title` (h3 ×8, ligne 874)**

Remplacer :

```css
  .wm-catalogue-card-title {
    font-size: 19px;
```

par :

```css
  .wm-catalogue-card-title {
    font-family: var(--font-display), sans-serif !important;
    font-size: 19px;
```

- [ ] **Step 8: `.wms-cta-title` (h3, ligne 926)**

Remplacer :

```css
  .wms-cta-title {
    font-size: clamp(2rem, 4vw, 3rem);
```

par :

```css
  .wms-cta-title {
    font-family: var(--font-display), sans-serif !important;
    font-size: clamp(2rem, 4vw, 3rem);
```

- [ ] **Step 9: Vérifier la compilation**

Run: `npx tsc --noEmit`
Expected: aucune erreur.

- [ ] **Step 10: Vérifier le rendu**

```bash
npm run dev > /tmp/wms-typo-t6-dev.log 2>&1 &
sleep 25
curl -s http://localhost:3000/services/creation-web > /tmp/wms-typo-t6.html
grep -c "var(--font-display)" /tmp/wms-typo-t6.html
```

Expected : au moins `8`. Arrêter le serveur ensuite.

- [ ] **Step 11: Commit**

```bash
git add src/app/services/creation-web/page.tsx
git commit -m "feat: police d'affichage sur les titres de la page Creation Web"
```

---

### Task 7: Page Services — Acquisition Clients

**Files:**
- Modify: `src/app/services/acquisition-clients/page.tsx`

**Interfaces:**
- Consumes : `--font-display`. Le bug `className`/`class` sur le h1 de cette page est déjà corrigé par un plan séparé.
- Produces : rien.

- [ ] **Step 1: `.wm-acq-title` (h1, ligne 246)**

Remplacer :

```css
  .wm-acq-title {
    font-size: clamp(32px, 5.5vw, 54px);
```

par :

```css
  .wm-acq-title {
    font-family: var(--font-display), sans-serif !important;
    font-size: clamp(32px, 5.5vw, 54px);
```

- [ ] **Step 2: `.wm-acq-headline` (h2, ligne 304)**

Remplacer :

```css
  .wm-acq-headline {
    font-size: clamp(26px, 3.8vw, 36px);
```

par :

```css
  .wm-acq-headline {
    font-family: var(--font-display), sans-serif !important;
    font-size: clamp(26px, 3.8vw, 36px);
```

- [ ] **Step 3: `.wm-funnel-header h3` (h3 bare, ligne 443)**

Remplacer :

```css
  .wm-funnel-header h3 {
    font-size: 26px;
```

par :

```css
  .wm-funnel-header h3 {
    font-family: var(--font-display), sans-serif !important;
    font-size: 26px;
```

- [ ] **Step 4: `.wm-pil-title` (h2, ligne 743)**

Remplacer :

```css
  .wm-pil-title {
    font-size: clamp(26px, 3.8vw, 36px);
```

par :

```css
  .wm-pil-title {
    font-family: var(--font-display), sans-serif !important;
    font-size: clamp(26px, 3.8vw, 36px);
```

- [ ] **Step 5: `.wm-pil-card-title` (h3 ×3, ligne 831)**

Remplacer :

```css
  .wm-pil-card-title {
    font-size: 19px;
```

par :

```css
  .wm-pil-card-title {
    font-family: var(--font-display), sans-serif !important;
    font-size: 19px;
```

- [ ] **Step 6: `.wms-cta-title` (h3, ligne 873)**

Remplacer :

```css
  .wms-cta-title {
    font-size: clamp(2rem, 4vw, 3rem);
```

par :

```css
  .wms-cta-title {
    font-family: var(--font-display), sans-serif !important;
    font-size: clamp(2rem, 4vw, 3rem);
```

- [ ] **Step 7: Vérifier la compilation**

Run: `npx tsc --noEmit`
Expected: aucune erreur.

- [ ] **Step 8: Vérifier le rendu**

```bash
npm run dev > /tmp/wms-typo-t7-dev.log 2>&1 &
sleep 25
curl -s http://localhost:3000/services/acquisition-clients > /tmp/wms-typo-t7.html
grep -c "var(--font-display)" /tmp/wms-typo-t7.html
```

Expected : au moins `6`. Arrêter le serveur ensuite.

- [ ] **Step 9: Commit**

```bash
git add src/app/services/acquisition-clients/page.tsx
git commit -m "feat: police d'affichage sur les titres de la page Acquisition Clients"
```

---

### Task 8: Page Portfolio

**Files:**
- Modify: `src/app/portfolio/page.tsx`

**Interfaces:**
- Consumes : `--font-display`. Le bug `className`/`class` sur le h1 de cette page est déjà corrigé par un plan séparé.
- Produces : rien.

- [ ] **Step 1: `.wm-portfolio .portfolio-title` (h1, ligne 209)**

Remplacer :

```css
  .wm-portfolio .portfolio-title {
    font-size: clamp(28px, 4.5vw, 48px);
```

par :

```css
  .wm-portfolio .portfolio-title {
    font-family: var(--font-display), sans-serif !important;
    font-size: clamp(28px, 4.5vw, 48px);
```

- [ ] **Step 2: `.wm-portfolio .portfolio-card h3` (h3 ×10, ligne 332)**

Remplacer :

```css
  .wm-portfolio .portfolio-card h3 {
    font-size: 20px;
```

par :

```css
  .wm-portfolio .portfolio-card h3 {
    font-family: var(--font-display), sans-serif !important;
    font-size: 20px;
```

- [ ] **Step 3: `.wm-portfolio .seo-section-title` (h3, ligne 445)**

Remplacer :

```css
  .wm-portfolio .seo-section-title {
    font-size: clamp(24px, 3.5vw, 38px);
```

par :

```css
  .wm-portfolio .seo-section-title {
    font-family: var(--font-display), sans-serif !important;
    font-size: clamp(24px, 3.5vw, 38px);
```

- [ ] **Step 4: `.wm-portfolio .seo-tab-content h4` (h4 ×3, ligne 571)**

Remplacer :

```css
  .wm-portfolio .seo-tab-content h4 {
    font-size: 18px;
```

par :

```css
  .wm-portfolio .seo-tab-content h4 {
    font-family: var(--font-display), sans-serif !important;
    font-size: 18px;
```

- [ ] **Step 5: Vérifier la compilation**

Run: `npx tsc --noEmit`
Expected: aucune erreur.

- [ ] **Step 6: Vérifier le rendu**

```bash
npm run dev > /tmp/wms-typo-t8-dev.log 2>&1 &
sleep 25
curl -s http://localhost:3000/portfolio > /tmp/wms-typo-t8.html
grep -c "var(--font-display)" /tmp/wms-typo-t8.html
```

Expected : au moins `4`. Arrêter le serveur ensuite.

- [ ] **Step 7: Commit**

```bash
git add src/app/portfolio/page.tsx
git commit -m "feat: police d'affichage sur les titres de la page Portfolio"
```

---

### Task 9: Pages légales (4 pages, structure identique)

**Files:**
- Modify: `src/app/politique/politique-de-confidentialite/page.tsx`
- Modify: `src/app/politique/mentions-legales/page.tsx`
- Modify: `src/app/politique/gestion-des-cookies/page.tsx`
- Modify: `src/app/politique/conditions-d-utilisation/page.tsx`

**Interfaces:**
- Consumes : `--font-display`.
- Produces : rien.

Les 4 fichiers ont une structure CSS strictement identique (mêmes numéros de ligne : `page-title` à la ligne 91, `content-section h2` à la ligne 123, `content-section h3` à la ligne 144). Appliquer les 3 mêmes modifications sur chacun des 4 fichiers.

- [ ] **Step 1: `.wms-policy-section .page-title` (h1, ligne 91) — sur les 4 fichiers**

Remplacer (identique dans les 4 fichiers) :

```css
        .wms-policy-section .page-title {
          font-size: clamp(32px, 5vw, 48px);
```

par :

```css
        .wms-policy-section .page-title {
          font-family: var(--font-display), sans-serif !important;
          font-size: clamp(32px, 5vw, 48px);
```

- [ ] **Step 2: `.wms-policy-section .content-section h2` (h2, ligne 123) — sur les 4 fichiers**

Remplacer (identique dans les 4 fichiers) :

```css
        .wms-policy-section .content-section h2 {
          color: var(--text-primary);
```

par :

```css
        .wms-policy-section .content-section h2 {
          font-family: var(--font-display), sans-serif !important;
          color: var(--text-primary);
```

- [ ] **Step 3: `.wms-policy-section .content-section h3` (h3, ligne 144) — sur les 4 fichiers**

Remplacer (identique dans les 4 fichiers) :

```css
        .wms-policy-section .content-section h3 {
          color: var(--text-primary);
          font-size: 19px;
```

par :

```css
        .wms-policy-section .content-section h3 {
          font-family: var(--font-display), sans-serif !important;
          color: var(--text-primary);
          font-size: 19px;
```

- [ ] **Step 4: Vérifier la compilation**

Run: `npx tsc --noEmit`
Expected: aucune erreur.

- [ ] **Step 5: Vérifier le rendu des 4 pages**

```bash
npm run dev > /tmp/wms-typo-t9-dev.log 2>&1 &
sleep 25
curl -s http://localhost:3000/politique/politique-de-confidentialite | grep -c "var(--font-display)"
curl -s http://localhost:3000/politique/mentions-legales | grep -c "var(--font-display)"
curl -s http://localhost:3000/politique/gestion-des-cookies | grep -c "var(--font-display)"
curl -s http://localhost:3000/politique/conditions-d-utilisation | grep -c "var(--font-display)"
```

Expected : chacune des 4 commandes retourne au moins `2` (page-title + au moins un content-section h2 utilisé sur chaque page). Arrêter le serveur ensuite.

- [ ] **Step 6: Commit**

```bash
git add src/app/politique/politique-de-confidentialite/page.tsx src/app/politique/mentions-legales/page.tsx src/app/politique/gestion-des-cookies/page.tsx src/app/politique/conditions-d-utilisation/page.tsx
git commit -m "feat: police d'affichage sur les titres des 4 pages legales"
```

---

### Task 10: Vérification finale de la passe

**Files:** aucun fichier modifié — tâche de vérification uniquement.

**Interfaces:**
- Consumes : l'ensemble des tâches 1 à 9.
- Produces : confirmation que le déploiement de la police est cohérent sur tout le site public — dernière tâche de cette passe.

- [ ] **Step 1: Build de production**

Run: `npm run build`
Expected : le build de production a un problème préexistant connu et documenté (échec de prérendu `useContext` reproduit sur la base avant toute modification de cette passe, sans rapport avec la typographie) — le noter si présent, ne pas bloquer dessus. Si le build échoue pour une AUTRE raison clairement liée aux changements de cette passe (erreur de syntaxe CSS, etc.), corriger avant de continuer.

- [ ] **Step 2: Capture visuelle d'un échantillon de pages**

```bash
npm run dev > /tmp/wms-typo-final-dev.log 2>&1 &
sleep 25
npx playwright screenshot --viewport-size=1440,1600 http://localhost:3000/apropos /tmp/wms-typo-final-apropos.png
npx playwright screenshot --viewport-size=1440,1600 http://localhost:3000/services/creation-web /tmp/wms-typo-final-creation-web.png
npx playwright screenshot --viewport-size=1440,2400 http://localhost:3000/portfolio /tmp/wms-typo-final-portfolio.png
npx playwright screenshot --viewport-size=1440,1600 http://localhost:3000/politique/mentions-legales /tmp/wms-typo-final-mentions-legales.png
```

Lire les 4 fichiers générés et vérifier visuellement que les titres (H1, titres de section, titres de carte) s'affichent bien dans la police d'affichage (caractères plus arrondis/distinctifs que Inter), sans régression de mise en page (pas de texte coupé, pas de débordement).

- [ ] **Step 3: Arrêter le serveur de dev**

Identifier le process node sur le port 3000 (`netstat -ano | grep :3000`) et le terminer (`taskkill //PID <pid> //F`), vérifier que le port est libre.

- [ ] **Step 4: Commit final (si des ajustements ont été faits pendant la vérification)**

```bash
git add -A
git commit -m "chore: ajustements finaux apres verification visuelle du deploiement de la police"
```

Si aucun ajustement n'a été nécessaire, ne pas créer de commit vide — cette tâche se termine sans commit.
