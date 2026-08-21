# Polish de la preuve sociale et animations de l’accueil

## Objectif

Rendre la page d’accueil plus premium et vivante tout en conservant une hiérarchie claire, une bonne performance et un comportement accessible. Le travail porte sur la preuve sociale du hero, les espacements du portfolio défilant et une chorégraphie d’apparition au scroll limitée à l’accueil.

## Périmètre

Sont concernés :

- le badge « Agence Web & SEO — Grenoble » ;
- le bloc d’avatars et d’étoiles du hero ;
- les marges verticales de `HomePortfolioMarquee` ;
- les sections de la page d’accueil uniquement ;
- le système générique `Reveal`, qui reste réutilisable ailleurs sans modifier les animations des autres pages.

Les pages Services, Portfolio, À propos, Blog et politiques ne reçoivent pas de nouvelle orchestration au scroll dans ce lot.

## Hero

### Badge supérieur

Le texte « Agence Web & SEO — Grenoble » devient une pilule inspirée du badge « Nos services » :

- fond noir à 3 % d’opacité ;
- bordure noire à 8 % d’opacité ;
- rayon totalement arrondi ;
- padding horizontal de 14 px et vertical de 6 px ;
- texte de 12 px, gras, uppercase et espacé ;
- étoile `✦` verte `#0FAC71` avant le texte.

Le badge conserve sa position et son espacement inférieur afin de ne pas modifier la hiérarchie du titre.

### Preuve sociale

Les trois portraits actuels sont remplacés par trois photographies authentiques moins répandues, représentant un groupe diversifié. Les fichiers sont fixes, contrôlés et hébergés localement dans `public/images/avatars/`. La licence et l’origine de chaque photo sont vérifiées avant intégration. Aucun chargement d’image tiers n’est effectué en production.

Les portraits passent de 36–40 px à 28 px sur mobile et 30 px à partir du breakpoint `sm`. Ils conservent une bordure blanche de 2 px et un chevauchement de 8 px.

Les cinq étoiles passent de l’orange au vert de marque `#0FAC71`. Leur taille reste compacte, comprise entre 12 et 14 px. Le texte « Des clients satisfaits partout en France » est conservé.

La pilule complète utilise les mêmes principes que le badge Services : fond noir très léger, bordure subtile et ombre réduite. Elle reste plus large que le badge supérieur car elle contient une information de preuve sociale.

## Portfolio défilant

L’inclinaison de `-2deg`, la contre-rotation des captures et la boucle continue sont conservées.

L’espace vertical est réduit d’environ moitié :

- section externe : de `py-12 sm:py-16` à `py-6 sm:py-8` ;
- fenêtre inclinée : de `py-9` à `py-5 sm:py-6` ;
- aucune marge supplémentaire n’est ajoutée dans `page.tsx`.

Le contrôle responsive doit confirmer que les angles des cartes ne sont jamais coupés malgré cette réduction.

## Système d’animation

### Variantes de Reveal

Le composant `Reveal` accepte une nouvelle prop `variant` :

- `up` : opacité 0 et translation verticale de 24 px ;
- `left` : opacité 0 et translation horizontale de -32 px ;
- `right` : opacité 0 et translation horizontale de 32 px ;
- `scale` : opacité 0, translation verticale de 12 px et échelle 0,97.

La valeur par défaut est `up`, ce qui conserve le comportement actuel pour tous les appels existants. La transition dure environ 700 ms avec l’easing existant. L’animation ne se joue qu’une fois.

Si `prefers-reduced-motion: reduce` est actif ou si `IntersectionObserver` est indisponible, le contenu est visible immédiatement sans translation ni mise à l’échelle. Le filet de sécurité existant reste présent afin qu’aucun contenu ne demeure invisible.

### Staggered reveal

Un composant `StaggerReveal` orchestre les groupes d’éléments. Il accepte un sélecteur de descendants, une variante et un délai progressif. Cette approche permet d’animer les cartes rendues dans les composants historiques sans cloner ni réécrire leur HTML. Le délai par défaut est de 100 ms et doit pouvoir être configuré.

Le composant ne clone pas de contenu sémantique et ne change pas l’ordre du DOM. Après montage, il sélectionne uniquement les descendants ciblés, leur attribue un index CSS et bascule une classe d’état sur le conteneur lors de l’intersection. Il utilise les mêmes garde-fous que `Reveal` et supprime ses styles temporaires lors du démontage.

### Chorégraphie de l’accueil

- Hero : conserve ses animations d’entrée actuelles ; aucun reveal au scroll n’est ajouté au contenu LCP.
- Portfolio défilant : `fade-up` sur le conteneur une seule fois ; le mouvement horizontal interne reste indépendant.
- Services : la section entre en `fade-up`, puis `.wms-services-card` et `.wms-services-tag-badge` reçoivent une révélation échelonnée de 80 ms.
- À propos : alternance éditoriale, visuel depuis la gauche et contenu depuis la droite lorsque la structure le permet ; à défaut, la section entière utilise `right`.
- Témoignages : la section conserve son `whileInView` existant afin d’éviter une double animation. Les cartes utilisent uniquement leur cascade interne existante.
- CTA : variante `scale`, discrète et centrée.
- FAQ : la section entre en `fade-up`, puis `.wms-faq-item` reçoit une révélation échelonnée de 80 ms.

Les sections n’emploient pas systématiquement gauche/droite : les directions servent la composition et évitent un effet mécanique.

## Architecture

- `Reveal.tsx` porte les variantes génériques et expose les styles de départ et d’arrivée.
- `StaggerReveal.tsx` est un composant client isolé qui anime les descendants correspondant à un sélecteur CSS explicite.
- `page.tsx` choisit les variantes au niveau des grandes sections.
- Les composants Services et FAQ restent inchangés dans leur contenu ; `page.tsx` cible leurs classes stables `.wms-services-card`, `.wms-services-tag-badge` et `.wms-faq-item`.
- Les animations existantes du hero, des sliders et des témoignages restent indépendantes.

## Performance et accessibilité

- aucune nouvelle bibliothèque d’animation ;
- `IntersectionObserver` partagé par composant et déconnecté après apparition ;
- aucune animation sur le contenu LCP au scroll ;
- pas de translation supérieure à 32 px ;
- pas d’effet de flou ;
- aucune animation infinie supplémentaire ;
- respect systématique de `prefers-reduced-motion` ;
- le contenu reste présent dans le DOM et lisible sans JavaScript grâce au filet de sécurité existant.

## Validation

Les tests automatisés vérifient :

- le nouveau style du badge du hero et son étoile verte ;
- les dimensions réduites des avatars et la couleur verte des cinq étoiles ;
- l’absence des trois anciennes images ;
- les nouveaux espacements du portfolio ;
- les quatre variantes de `Reveal` et le comportement par défaut inchangé ;
- la progression des délais dans `StaggerReveal` ;
- la cartographie des variantes sur l’accueil ;
- l’absence de double Reveal autour des témoignages ;
- la prise en charge de reduced motion ;
- la réussite des tests, de TypeScript et du build de production.

La vérification visuelle couvre 390, 768 et 1440 px, les arrivées depuis le haut et le bas de page, la navigation par ancre et le mode mouvement réduit.
