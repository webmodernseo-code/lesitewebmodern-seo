# Restauration de l’accueil, typographie globale et footer mobile — spécification

## Objectif

Restaurer plusieurs éléments visuels historiques sans annuler le nouveau hero interactif : CTA clair, slider de partenaires et footer mobile compact. Uniformiser en parallèle toute l’application avec la police Bricolage Grotesque et retirer la section Portfolio orange de l’accueil.

## Hero

Le hero interactif actuellement en production reste la base :

- carte flottante arrondie ;
- dégradé sable-blanc et constellation interactive ;
- titre « On développe votre » avec les quatre mots rotatifs ;
- surtitre, description, deux boutons et preuve sociale actuels.

Sous la preuve sociale, restaurer un ruban intitulé « Technologies & Partenaires clés ». Il contient, dans cet ordre, les logos Meta, n8n et o2switch déjà présents dans `public/logo/`.

Le ruban défile horizontalement en boucle continue grâce à deux groupes identiques. Il s’arrête au survol et au focus clavier. Avec `prefers-reduced-motion: reduce`, il reste statique. Un masque progressif sur les côtés adoucit l’entrée et la sortie des logos. Les doublons nécessaires à la boucle sont masqués aux technologies d’assistance.

## CTA inférieur

La section CTA située après les témoignages retrouve son apparence claire d’origine :

- carte centrée avec marge latérale ;
- fond dégradé sable/crème ;
- bordure fine et quatre coins arrondis à 32 px sur ordinateur, 24 px sur mobile ;
- titre noir avec mots accentués en orange ;
- paragraphe gris ardoise ;
- bouton principal noir avec badge orange ;
- bouton secondaire blanc avec bordure légère et badge orange.

Les textes et liens actuels restent inchangés. Le fond charbon disparaît entièrement de cette section.

## Suppression du Portfolio orange

La section `PortfolioShowcase` n’est plus rendue sur la page d’accueil. Son import, son wrapper `Reveal` et ses propriétés sont retirés de `src/app/page.tsx`.

La page `/portfolio`, le composant `PortfolioShowcase` et l’image associée restent dans le dépôt. Ils ne sont ni supprimés ni modifiés afin de permettre une réutilisation ultérieure.

Après le hero, la page enchaîne directement sur la section Services.

## Typographie globale

Bricolage Grotesque devient l’unique police visuelle de l’ensemble de l’application : site public, dashboard, formulaires, navigation, boutons, paragraphes, légendes et titres.

- Retirer le chargement de `Inter` dans le layout racine.
- Définir `--font-sans` et `--font-display` sur la variable de Bricolage Grotesque.
- Faire pointer les familles Tailwind `font-sans` et `font-display` vers la même variable.
- Remplacer les déclarations locales qui imposent `'Inter', sans-serif !important` par `var(--font-display), sans-serif !important`.
- Conserver les polices explicitement sémantiques qui ne représentent pas Inter, par exemple la citation décorative en Georgia, sauf si elles affectent un texte d’interface normal.

Le changement porte uniquement sur la famille. Les tailles, graisses, interlignages et espacements existants restent inchangés sauf correction nécessaire d’un débordement constaté.

## Footer mobile en accordéon

Le footer conserve sa grille actuelle sur les écrans de plus de 768 px.

À 768 px et moins :

- le bloc marque, description et réseaux sociaux reste visible ;
- Services, Navigation et Contact deviennent des boutons d’accordéon ;
- les trois rubriques sont fermées au chargement ;
- une seule rubrique peut être ouverte à la fois ;
- ouvrir une rubrique ferme automatiquement la précédente ;
- copyright et liens légaux restent visibles sous les accordéons.

Le footer devient un composant client React afin de gérer l’état de la rubrique ouverte. Le contenu n’utilise plus `dangerouslySetInnerHTML` pour les éléments interactifs. Chaque bouton expose `aria-expanded` et `aria-controls`, possède un focus visible et commande une région identifiée. Les chevrons accompagnent l’état ouvert ou fermé.

## Responsive et accessibilité

- Aucun défilement horizontal à 390 px de largeur.
- Les boutons CTA restent utilisables au clavier et lisibles sur mobile.
- Le slider ne gêne pas la navigation et respecte la réduction des animations.
- Les accordéons sont des boutons natifs et leurs contenus restent dans le DOM.
- Le footer desktop ne change pas de disposition.

## Architecture

- `HeroPublic.tsx` compose un sous-composant `PartnerLogoSlider` focalisé sur le ruban.
- `CtaPublic.tsx` reste un composant statique et reçoit uniquement le nouveau traitement clair.
- `page.tsx` cesse de composer `PortfolioShowcase`.
- `layout.tsx`, `tailwind.config.ts` et les styles locaux portent l’unification typographique.
- `FooterPublic.tsx` devient un composant client React structuré, avec une donnée de configuration pour Services et Navigation et un bloc Contact dédié.

## Vérification

- Test du contenu, de la duplication accessible et de la réduction des animations du slider.
- Test de l’absence de `PortfolioShowcase` dans la composition de l’accueil.
- Test du CTA clair et de l’absence du fond charbon.
- Test de la configuration globale Bricolage Grotesque et de l’absence de règles Inter dans `src/`.
- Test de l’état initial fermé et du comportement exclusif de l’accordéon mobile.
- Vérification TypeScript, build Next.js et contrôle visuel desktop/mobile.

## Hors périmètre

- Suppression de la page Portfolio ou de ses assets.
- Modification du contenu éditorial des sections.
- Refonte du hero interactif validé.
- Changement des couleurs globales autres que la restauration du CTA.
