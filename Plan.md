# Plan de Branding & Structure : webmodernseo.co

Ce document définit la charte graphique et la structure technique pour le site internet de **webmodernseo.co**, en s'inspirant du style premium de Vidsync mais adapté à votre identité de marque (Mode Clair Chaleureux / Warm Light Mode) et à votre activité d'agence web et SEO.

---

## 🎨 1. Palette de Couleurs & Identité Visuelle
Le design s'appuie sur une esthétique minimaliste technologique et chaleureuse, caractérisée par :
- **Arrière-plan principal** : Dégradé crème/sable très doux (`#fdfbf7` vers `#faf6ee`) offrant un rendu organique et haut de gamme.
- **Cartes et Conteneurs** : Blanc pur (`#ffffff`) avec des bordures très fines (`rgba(0, 0, 0, 0.08)`) et des ombres légères et diffuses pour créer du relief.
- **Texte principal (Headers)** : Noir pur (`#000000`) pour une lisibilité maximale et un aspect moderne.
- **Texte secondaire (Body & Muted)** : Gris ardoise doux (`#5c5c64`) pour le contenu informatif.
- **Couleur de Marque (Accent)** : Orange vif premium (`#ff4d00`) pour les éléments clés et les boutons d'action.
- **Couleur d'Action (CTAs principaux)** : Noir pur (`#000000`) pour contraster avec le fond clair.
- **Liens des Articles** : Orange de transition (`#ff7e47`) pour assurer une bonne lisibilité des liens dans le contenu éditorial.
- **Effets Spéciaux** : Flou d'arrière-plan (Glassmorphism) sur le header fixe (`backdrop-filter: blur(16px)` avec translucidité claire `rgba(255, 255, 255, 0.75)`).

---

## ✍️ 2. Typographie (Règle d'Or du Projet)
- **Police Unique** : **"Inter"**, sans-serif (chargée depuis Google Fonts).
- **Titres (H1, H2, H3)** : Très gras (`font-weight: 800`), hauteur de ligne resserrée (`line-height: 1.1` à `1.2`), et espacement de lettres resserré (`letter-spacing: -0.03em`) pour un look professionnel et affirmé.
- **Corps de texte** : Taille standard (16px / 1rem), poids régulier (`400` / `500`) et espacement aéré pour une lecture fluide.

---

## ⚙️ 3. Architecture Technique (Intégration WordPress)
Pour permettre une intégration directe et sans conflits dans votre site WordPress (via Elementor ou Gutenberg) :
- **Préfixage des Classes** : Toutes les classes CSS du projet utilisent le préfixe `wms-` (ex: `.wms-header-wrapper`, `.wms-hero-title`, etc.).
- **Aucun Style Global Bloquant** : Les fichiers ne contiennent aucun style sur les balises de base (`body`, `a`, `h1`) hors de leur conteneur respectif, évitant ainsi de casser les styles de votre thème WordPress actuel.
- **Autonomie des Composants** : Chaque section est développée dans un fichier HTML indépendant contenant sa propre structure, son CSS isolé et son JavaScript nécessaire.

---

## 🧱 4. Structure des Sections du Site

Chaque section ci-dessous est conçue pour maximiser l'engagement des clients :

1. **Header (En-tête) [Terminé]** :
   - Logo 3D orange interactif avec le texte "webmodernseo" à gauche.
   - Menu centré (Accueil, Services, À propos, Portfolio, Blog).
   - Bouton d'action "Prendre RDV" à droite (avec tiroir Hamburger responsive pour mobiles).
2. **Section Hero (Accueil) [Terminé]** :
   - Titre fort axé conversion + sous-titre présentant votre expertise.
   - Boutons CTAs (Bouton pilule carbone "Prendre RDV" + bouton contour "Nos Services").
   - **Maquette SaaS Client** : Graphique de croissance SEO en SVG orange, compteur de leads et modules d'automations actives.
   - **Ruban de confiance** : Logos SVG des technologies partenaires (WordPress, Zapier, Google Ads, Google Analytics).
3. **Services** :
   - Grille de services présentant vos spécialités (Création WordPress, Référencement SEO, Automatisation, Google Ads, Maintenance).
4. **À propos** :
   - Présentation de votre méthode d'accompagnement et de votre vision stratégique.
5. **Portfolio** :
   - Grille interactive de vos réalisations de sites web modernes.
6. **Formulaire (Lead Gen & Contact)** :
   - Formulaire de contact optimisé pour la collecte de prospects qualifiés.
7. **Blog** :
   - Cartes d'articles récents sur le SEO, le Web et l'automatisation.
8. **Footer (Pied de Page)** :
   - Liens de navigation, crédits et mentions légales.

---

## 📱 5. Fluidité Responsive & Animations
- **Mobile-First** : Les colonnes s'empilent verticalement sur mobile sans créer de débordement horizontal. Les tailles de texte s'adaptent grâce à `clamp()`.
- **Micro-animations** :
  - Survol interactif sur le logo 3D, les boutons et les cartes.
  - Apparition en cascade (staggered animation) des liens sur le menu mobile.
