# Hero compact, preuve sociale et portfolio défilant

## Objectif

Améliorer la densité et la preuve sociale de la page d’accueil, puis présenter les réalisations sous une forme premium et animée. La page `/portfolio` reste inchangée.

## Périmètre

La modification concerne uniquement la page d’accueil et ses composants publics :

- réduction de l’espace entre le header et le badge du hero ;
- remplacement de la statistique fictive du hero par une preuve sociale visuelle ;
- ajout d’une bande de captures de projets entre le slider de partenaires et la section Services.

## Hero

### Espacement supérieur

L’espace vertical situé avant le badge « Agence Web & SEO — Grenoble » est réduit d’environ 50 %. La réduction porte prioritairement sur le padding supérieur du contenu du hero, sans écraser les espacements internes entre le titre, le texte, les boutons et la preuve sociale.

### Preuve sociale

Le texte fictif « 1 482 leads générés ce mois pour nos clients » et sa constante associée sont supprimés.

Le remplacement est une pilule claire cohérente avec le fond crème du hero. Elle contient :

- trois portraits professionnels génériques, fixes et hébergés localement, affichés dans des cercles superposés ;
- cinq étoiles orange ;
- le texte « Des clients satisfaits partout en France ».

Les portraits sont décoratifs et utilisent des textes alternatifs vides. Le texte constitue la preuve sociale accessible. Aucun chiffre de clients, de note ou de résultat non vérifié n’est affiché.

Sur mobile, le bloc peut réduire la taille des portraits et autoriser le texte à revenir sur deux lignes, sans débordement horizontal.

## Portfolio défilant sur l’accueil

### Position

La bande est insérée sur la page d’accueil après le hero — donc après le slider de logos déjà inclus dans celui-ci — et immédiatement avant la section Services. Elle ne réintroduit pas l’ancienne section Portfolio orange.

### Contenu

La bande réutilise les sept captures déjà employées sur la page `/portfolio`. Elle affiche uniquement les images : aucun nom de projet, filtre, description, bouton ou statistique.

Les images sont rendues avec `next/image`, des dimensions explicites et des tailles responsives. Chaque capture possède un texte alternatif descriptif basé sur le projet correspondant.

### Présentation

- fond blanc ou crème très léger, sans aplat orange ;
- cartes paysage avec coins arrondis, bordure subtile et ombre discrète ;
- une seule rangée horizontale ;
- bande complète inclinée de `-2deg` ;
- captures conservées droites à l’intérieur de leur carte pour préserver la lisibilité ;
- réserve verticale suffisante autour de la bande afin que l’inclinaison ne coupe aucun bord, y compris sur mobile.

L’inclinaison est la signature visuelle de cette section. Aucun autre effet décoratif fort n’est ajouté.

### Mouvement

Le défilement est continu, en boucle et de droite à gauche. Le contenu est dupliqué uniquement pour assurer la continuité visuelle ; la copie est masquée aux technologies d’assistance.

- vitesse normale modérée ;
- ralentissement au survol ;
- pause lorsqu’un élément interne reçoit le focus clavier ;
- animation entièrement désactivée avec `prefers-reduced-motion` ;
- aucune dépendance d’animation externe n’est ajoutée si le comportement peut être réalisé avec CSS et React existants.

## Architecture

- `HeroPublic` conserve la composition du hero et accueille un petit composant de preuve sociale isolé.
- Un composant public dédié rend la bande Portfolio sur la page d’accueil.
- La liste des sept captures et leurs textes alternatifs est centralisée dans ce composant.
- Les animations utilisent des keyframes globales nommées explicitement et des classes utilitaires ciblées.

## Validation

Les tests doivent vérifier :

- la suppression de l’ancienne statistique fictive ;
- la présence des trois avatars, des cinq étoiles et du nouveau texte ;
- la réduction du padding supérieur du hero ;
- la présence de la bande avant `ServicesPublic` sur l’accueil ;
- l’utilisation des sept captures existantes ;
- l’absence de filtres et de texte projet dans la bande ;
- la duplication accessible et la prise en charge de `prefers-reduced-motion` ;
- l’inclinaison de `-2deg` et la conservation des captures droites ;
- la réussite de TypeScript, des tests existants et du build de production.

Une vérification visuelle finale couvre les largeurs mobile, tablette et ordinateur, ainsi que l’absence de coupure pendant le défilement.
