# Correction du bug className/class sur 5 titres — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Corriger un bug pré-existant où 5 titres `<h1>` principaux (À propos, 3 pages Services, Portfolio) n'appliquent jamais leur style CSS car l'attribut `className` (syntaxe JSX) a été utilisé par erreur à l'intérieur d'une chaîne de HTML brut injectée via `dangerouslySetInnerHTML` — le navigateur ne reconnaît que `class` dans du HTML brut, pas `className`.

**Architecture:** Chaque occurrence est un attribut `className="..."` isolé dans une chaîne de template JSX déjà passée à `dangerouslySetInnerHTML`. La correction est un remplacement littéral `className=` → `class=` sur les lignes concernées, rien d'autre.

**Tech Stack:** Next.js 14 (App Router). Aucune dépendance, aucun changement de logique.

**Référence :** Découvert lors d'un audit de reconnaissance pour une passe de police d'affichage à venir (hors périmètre de ce plan).

## Global Constraints

- Périmètre strict : uniquement les occurrences de `className=` listées ci-dessous, à l'intérieur des blocs `dangerouslySetInnerHTML` déjà existants. Aucun autre changement dans ces fichiers (pas de police d'affichage, pas de refactoring, pas de changement de copy).
- Vérifier chaque correction par le HTML **rendu** (le navigateur/serveur doit produire `class="..."`, pas `className="..."`) — un grep sur le code source ne suffit pas à prouver que le rendu est correct, il faut vérifier le HTML servi par le serveur de dev.
- Le projet n'a pas de test runner installé : vérification par `npx tsc --noEmit` et un lancement du serveur de dev avec vérification `curl`/`grep` du HTML rendu.

---

### Task 1: Corriger les 5 occurrences de `className` dans le HTML brut

**Files:**
- Modify: `src/app/apropos/page.tsx:542`
- Modify: `src/app/services/creation-web/page.tsx:1138`
- Modify: `src/app/services/referencement-seo/page.tsx:1680`
- Modify: `src/app/services/acquisition-clients/page.tsx:1055`
- Modify: `src/app/portfolio/page.tsx:1178`

**Interfaces:**
- Consumes : rien.
- Produces : rien — correction de bug isolée, aucune tâche ultérieure n'en dépend.

- [ ] **Step 1: `src/app/apropos/page.tsx:542`**

Remplacer :

```
        <h1 className="wm-about-title">Créateurs d'expériences digitales <span className="fancy-underline">sur-mesure.</span></h1>
```

par :

```
        <h1 class="wm-about-title">Créateurs d'expériences digitales <span class="fancy-underline">sur-mesure.</span></h1>
```

(Deux occurrences de `className` sur cette ligne — le `<h1>` et le `<span>` imbriqué — les deux doivent devenir `class`.)

- [ ] **Step 2: `src/app/services/creation-web/page.tsx:1138`**

Remplacer :

```
      <h1 className="wm-service-title">
```

par :

```
      <h1 class="wm-service-title">
```

- [ ] **Step 3: `src/app/services/referencement-seo/page.tsx:1680`**

Remplacer :

```
      <h1 className="wm-seo-title">
```

par :

```
      <h1 class="wm-seo-title">
```

- [ ] **Step 4: `src/app/services/acquisition-clients/page.tsx:1055`**

Remplacer :

```
      <h1 className="wm-acq-title">
```

par :

```
      <h1 class="wm-acq-title">
```

- [ ] **Step 5: `src/app/portfolio/page.tsx:1178`**

Remplacer :

```
    <h1 className="portfolio-title">
```

par :

```
    <h1 class="portfolio-title">
```

- [ ] **Step 6: Vérifier la compilation TypeScript**

Run: `npx tsc --noEmit`
Expected: aucune erreur (exit code 0).

- [ ] **Step 7: Vérifier le rendu de chacune des 5 pages**

Run (depuis la racine du projet ; vérifier au préalable qu'aucun process
n'écoute sur le port 3000 via `netstat -ano | grep LISTENING`, et le
terminer si c'est le cas) :

```bash
npm run dev > /tmp/wms-classname-fix-dev.log 2>&1 &
sleep 25
curl -s http://localhost:3000/apropos | grep -o 'class="wm-about-title"'
curl -s http://localhost:3000/services/creation-web | grep -o 'class="wm-service-title"'
curl -s http://localhost:3000/services/referencement-seo | grep -o 'class="wm-seo-title"'
curl -s http://localhost:3000/services/acquisition-clients | grep -o 'class="wm-acq-title"'
curl -s http://localhost:3000/portfolio | grep -o 'class="portfolio-title"'
```

Expected : chacune des 5 commandes retourne au moins une ligne (la classe
apparaît maintenant comme `class="..."`, pas `className="..."`, dans le
HTML servi). Vérifier aussi qu'aucune des 5 sorties ne contient
`className=` (`curl ... | grep -c 'className='` doit retourner `0` sur
chacune des 5 pages) — c'est la preuve que le rendu a changé, pas
seulement le code source.

- [ ] **Step 8: Arrêter le serveur de dev**

Identifier le process node qui écoute sur le port 3000
(`netstat -ano | grep :3000`) et le terminer
(`taskkill //PID <pid> //F` sur Windows), puis vérifier que le port est
libre.

- [ ] **Step 9: Commit**

```bash
git add src/app/apropos/page.tsx src/app/services/creation-web/page.tsx src/app/services/referencement-seo/page.tsx src/app/services/acquisition-clients/page.tsx src/app/portfolio/page.tsx
git commit -m "fix: corrige l'attribut className en class sur 5 titres H1 en HTML brut"
```
