# Refonte visuelle premium de la home — design

## Contexte et objectif

Le site actuel (Next.js + Tailwind) est fonctionnel et bien optimisé côté SEO/perf, mais son langage visuel (Hero avec faux mockup de dashboard SaaS, boutons et badges tous en pilule, carrousel de logos d'outils, police unique Inter forcée partout) correspond au gabarit générique des landing pages "startup IA" qu'on retrouve partout actuellement. L'objectif est de faire évoluer cette identité vers quelque chose qui se lit comme une agence web/SEO premium, sans repartir de zéro sur la palette de marque (orange `#ff4d00` / noir / sable `#F5E6D3`, conservée).

Cette passe couvre la home et les tokens de design partagés. Les autres pages (services, à propos, portfolio, blog...) hériteront de ces tokens dans une passe ultérieure, hors périmètre ici.

## Décisions validées

Ces choix ont été validés avec l'utilisateur via une session de brainstorming (questions à choix multiple + comparaisons visuelles) :

- **Ampleur** : affiner l'identité existante, pas de rebrand complet.
- **Typographie** : `Bricolage Grotesque` (700/800) pour tous les titres (H1–H4), `Inter` conservé pour le corps de texte, labels et boutons.
- **Hero** : direction "typographie pure" — suppression du mockup dashboard et du carrousel de logos d'outils ; le H1 devient l'élément visuel principal, avec un badge flottant discret comme seule preuve sociale.
- **Preuve sociale** : les logos d'outils (Meta, n8n, o2switch) sont retirés du site vitrine, pas seulement déplacés.
- **Contraste tonal** : la section CTA finale passe en fond charbon (`#16161a`) plutôt que de créer une nouvelle section.
- **Données chiffrées** : pas de vrais chiffres clients disponibles pour l'instant → valeurs plausibles utilisées comme placeholders, isolées dans une constante unique par composant pour être remplacées facilement plus tard.

## Périmètre

**Dans le périmètre :**
- Tokens de design partagés (`tailwind.config.ts`) : police d'affichage, couleur charbon, échelle de rayons, ombre partagée.
- Chargement de la police `Bricolage Grotesque` dans `src/app/layout.tsx` (à côté d'Inter).
- Reconstruction de `HeroPublic.tsx` en JSX + Tailwind (direction "typographie pure").
- Ajustement ciblé de `HeaderPublic.tsx` : uniquement le texte du logo passe en police d'affichage.
- Reconstruction de la section CTA finale (`CtaPublic.tsx`) en variante fond charbon.
- Application des nouveaux tokens (police des titres, rayons, ombres) aux sections existantes : `ServicesPublic`, `AboutPublic`, `FaqPublic`, `TestimonialsSection`, `FooterPublic` — sans réécriture de leur structure ou de leur contenu.

**Hors périmètre (à traiter dans une passe ultérieure si besoin) :**
- Refonte de contenu/layout des sections Services, À propos, Témoignages, FAQ, Footer.
- Autres pages du site (services/*, apropos, portfolio, blog, contact, [ville]).
- Remplacement des données chiffrées placeholder par de vrais chiffres clients (dépend de données non encore disponibles).
- Navigation desktop/mobile du header (dropdown, menu mobile) : structure et logique inchangées.

## Tokens de design

Dans `tailwind.config.ts`, en plus des tokens `brand.orange` / `brand.sable` / `brand.black` existants :

- `fontFamily.display` → variable CSS `--font-display` (Bricolage Grotesque), à utiliser sur H1–H4 et éléments de marque (logo texte).
- `fontFamily.sans` → inchangé (Inter), reste la police par défaut du corps de texte.
- `colors.brand.charcoal` → `#16161a`, pour les sections à contraste sombre (CTA final).
- Rayons : convention explicite — `rounded-full` réservé aux boutons/CTA/badges ; `rounded-2xl` (`~20px`) pour cartes et conteneurs de contenu. Pas de nouveau token requis (Tailwind fournit déjà ces valeurs), mais la convention doit être respectée de façon cohérente dans les composants retouchés.
- Ombre partagée : une classe utilitaire (ex. `shadow-soft` via `boxShadow` dans le thème Tailwind) reprenant l'ombre douce déjà utilisée (`0 20px 40px -15px rgba(15,15,17,0.06)` etc.), pour éviter de la redéfinir en dur dans chaque composant.

`layout.tsx` charge `Bricolage Grotesque` via `next/font/google` de la même façon qu'Inter aujourd'hui, expose sa variable CSS, et l'ajoute à la classe sur `<html>`.

## Header

Changement strictement ciblé : le texte du logo ("webmodernseo") utilise la police d'affichage au lieu d'Inter. Aucune autre modification de structure, de navigation, de dropdown ou de menu mobile.

## Hero — direction "typographie pure"

Remplace entièrement le contenu actuel de `HeroPublic.tsx` (actuellement un bloc `dangerouslySetInnerHTML` avec `<style>` inline) par un composant JSX + Tailwind :

- Fond dégradé sable→blanc conservé, padding vertical augmenté pour donner plus d'air (le hero n'est plus une "boîte compacte").
- H1 en police d'affichage, gros corps, mot-clé accentué avec le dégradé de texte orange déjà utilisé aujourd'hui (conservé tel quel, juste appliqué à la nouvelle police).
- Sous-titre en Inter, inchangé dans l'esprit du texte actuel.
- Deux CTA en pilule (inchangés dans leur logique : "Prendre un RDV offert" en bouton noir primaire, "Découvrir nos services" en bouton contour).
- Un badge flottant sous les CTA : pastille verte + texte de preuve sociale, valeur définie comme constante en tête de fichier (ex. `const HERO_PROOF_STAT = "1 482 leads générés ce mois pour nos clients"`) pour être remplaçable en un seul endroit.
- Suppression complète : mockup dashboard SaaS (grille de cartes, faux graphique SVG, toggles d'automatisation) et carrousel de logos d'outils (et son animation `wmsScrollLogos`).

## CTA final — variante fond charbon

`CtaPublic.tsx` passe en fond `brand.charcoal`, texte blanc, bouton principal orange conservé (contraste suffisant sur fond sombre à vérifier). Reste la dernière section avant le footer.

## Sections inchangées structurellement

`ServicesPublic`, `AboutPublic`, `FaqPublic`, `TestimonialsSection` (déjà en `testimonial-v2`), `FooterPublic` : seuls les titres passent en police d'affichage et les rayons/ombres sont alignés sur la nouvelle convention si un composant utilisait un rayon incohérent (ex. pilule sur une carte de contenu). Pas de changement de copy, de structure de grille, ni de contenu.

## Approche technique

`HeroPublic.tsx` et la partie logo de `HeaderPublic.tsx` sont aujourd'hui des blocs `dangerouslySetInnerHTML` avec CSS dupliqué en `<style>` inline. Pour le Hero (réécriture complète) et le logo du Header (changement ciblé), le code est reconstruit en JSX + classes Tailwind s'appuyant sur les tokens ci-dessus, plutôt que d'éditer les chaînes HTML à la main. Le reste du Header (nav, dropdown, menu mobile, JS d'interaction) n'est pas touché et reste dans son format actuel.

## Vérification

Pas de logique métier à tester (changement visuel). Avant de considérer la passe terminée :
- Rendu responsive mobile/desktop du Hero, Header et CTA final.
- Focus clavier visible sur les CTA et liens.
- `prefers-reduced-motion` respecté sur les animations d'entrée existantes.
- Lancement du serveur dev (`npm run dev`) et capture d'écran de la home avant/après pour validation visuelle.
- Vérifier qu'aucune régression Lighthouse/CLS n'est introduite par le chargement de la police additionnelle (utiliser `next/font/google` avec `display: swap` comme pour Inter).
