# Hero interactif arrondi — spécification de conception

## Objectif

Améliorer le hero de la page d’accueil sans remplacer sa structure commerciale. Le nouveau traitement doit renforcer l’identité visuelle de WebModernSEO tout en conservant le contenu utile et les appels à l’action existants.

## Périmètre

La modification concerne uniquement le hero de la page d’accueil et ses éventuels sous-composants. Les sections Portfolio, Services et suivantes ne changent pas.

## Contenu conservé

- Le surtitre « Agence Web & SEO — Grenoble ».
- Le paragraphe de présentation actuel.
- Les boutons « Prendre un RDV offert » et « Découvrir nos services ».
- La preuve sociale affichée sous les boutons.
- Le dégradé sable-vers-blanc du fond actuel.

## Nouveau titre

Le titre statique actuel est remplacé par deux lignes :

1. « On développe votre » ;
2. un mot rotatif choisi successivement parmi « visibilité », « trafic », « notoriété » et « chiffre d’affaires ».

Le mot rotatif utilise l’orange de la marque. La transition est verticale, fluide et discrète, avec une durée d’affichage d’environ 2,4 secondes par mot. L’espace réservé doit accepter le mot le plus long sans déplacement brutal du reste du hero ni débordement sur mobile.

## Conteneur du hero

Le hero devient une carte flottante :

- marge latérale visible sur ordinateur et marge réduite sur mobile ;
- largeur maximale cohérente avec le reste du site ;
- quatre coins arrondis d’environ 32 px sur ordinateur et légèrement réduits sur mobile ;
- `overflow: hidden` pour contenir le canvas et le dégradé dans les coins ;
- séparation visuelle légère avec la page, sans bordure orange ni ombre lourde.

## Fond interactif

Une constellation régulière de petits points noirs est dessinée sur un canvas placé au-dessus du dégradé actuel et derrière le contenu.

- Les points gardent une faible opacité au repos.
- À proximité du curseur, leur rayon et leur opacité augmentent progressivement.
- Un masque radial adoucit la constellation vers les bords.
- Le canvas ne capture aucun clic et reste décoratif pour les technologies d’assistance.
- Le redimensionnement du conteneur recalcule le canvas en tenant compte de la densité de pixels de l’écran.
- L’animation est nettoyée au démontage du composant.

## Architecture

`HeroPublic` conserve la composition du contenu. Deux sous-composants privés ou dédiés portent les comportements isolés :

- `BubbleBackground` gère le canvas, le redimensionnement, le curseur et la boucle d’animation ;
- `RotatingWord` gère la liste des mots et leur transition.

Le hero devient un composant client uniquement si les hooks nécessaires l’exigent. Aucun état ni donnée métier ne change.

## Responsive et accessibilité

- Le titre utilise des tailles fluides adaptées du mobile au grand écran.
- « chiffre d’affaires » reste lisible sans déborder ni élargir le document.
- Les boutons conservent leurs états de focus visibles et leur disposition responsive.
- Avec `prefers-reduced-motion: reduce`, le premier mot reste affiché sans rotation, les points restent statiques et l’interaction au curseur est désactivée.
- Le canvas porte `aria-hidden="true"`.

## Performance

- Une seule boucle `requestAnimationFrame` est active.
- Les écouteurs et la boucle sont supprimés au démontage.
- Le nombre de points dépend de la surface du hero avec un espacement d’environ 24 px.
- Aucun nouvel appel réseau ni nouvelle dépendance n’est ajouté ; Framer Motion est déjà présent dans le projet.

## Vérification

- Test automatisé du contenu du titre et de la liste des mots.
- Test du comportement de réduction des animations dans la mesure permise par l’environnement de test.
- Vérification TypeScript et build de production.
- Contrôle visuel sur mobile et ordinateur : arrondi, absence de débordement, lisibilité du mot long, position des CTA et fondu du fond.

## Hors périmètre

- Modification des textes autres que le titre.
- Refonte des boutons, de la preuve sociale ou des sections suivantes.
- Changement de palette globale.
- Déploiement tant que les vérifications locales ne sont pas terminées.
