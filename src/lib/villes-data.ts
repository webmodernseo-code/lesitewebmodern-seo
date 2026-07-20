export interface VilleSEOData {
  slug: string;
  nom: string;
  codePostal: string;
  region: string;
  titreSEO: string;
  descriptionSEO: string;
  introText: string;
  avantagesLocaux: string[];
  statsLocal: { label: string; value: string }[];
}

export const VILLES_DATA: Record<string, VilleSEOData> = {
  lyon: {
    slug: 'lyon',
    nom: 'Lyon',
    codePostal: '69000',
    region: 'Auvergne-Rhône-Alpes',
    titreSEO: 'Agence Web & SEO à Lyon — Création de Site Internet & Référencement',
    descriptionSEO: 'Propulsez votre entreprise à Lyon avec des sites web Next.js ultra-rapides et des stratégies de référencement naturel SEO/SXO sur-mesure par Jean-Prosper MONE.',
    introText: 'Capitale économique de la région Auvergne-Rhône-Alpes, Lyon offre un marché dynamique mais hautement concurrentiel. WebModernSEO accompagne les PME et entreprises lyonnaises pour dominer les résultats de recherche locaux sur Google.',
    avantagesLocaux: [
      'Positionnement prioritaire sur les recherches locales "Agence Web Lyon" et "SEO Lyon"',
      'Création de sites internet Next.js vitesse d\'ingénieur',
      'Accompagnement de proximité par un expert dédié'
    ],
    statsLocal: [
      { label: 'Entreprises accompagnées en Rhône-Alpes', value: '+45' },
      { label: 'Gain moyen de visibilité Google à Lyon', value: '+180%' },
      { label: 'Temps de chargement moyen des sites', value: '< 0.8s' }
    ]
  },
  grenoble: {
    slug: 'grenoble',
    nom: 'Grenoble',
    codePostal: '38000',
    region: 'Auvergne-Rhône-Alpes',
    titreSEO: 'Création de Site Web & SEO à Grenoble',
    descriptionSEO: 'Spécialiste de la création de sites internet et du référencement naturel à Grenoble. Développez la notoriété de votre marque auprès des clients isérois.',
    introText: 'Au cœur des Alpes et du pôle d\'innovation isérois, Grenoble réclame une présence digitale d\'élite. Nous aidons les acteurs locaux à capturer de nouveaux prospects qualifiés.',
    avantagesLocaux: [
      'Visibilité ciblée sur l\'Isère et le bassin grenoblois',
      'Architecture technique sur-mesure sans lourdeur',
      'Stratégie de mots-clés de géolocalisation alpine'
    ],
    statsLocal: [
      { label: 'Projets Isérois concrétisés', value: '+20' },
      { label: 'Satisfaction client locale', value: '100%' },
      { label: 'Conversion de leads qualifiés', value: '+140%' }
    ]
  },
  paris: {
    slug: 'paris',
    nom: 'Paris',
    codePostal: '75000',
    region: 'Île-de-France',
    titreSEO: 'Agence SEO & Création Web Next.js à Paris',
    descriptionSEO: 'Conception de sites internet sur-mesure d\'ingénieur et stratégies de référencement SEO de premier plan pour les entreprises et startups parisiennes.',
    introText: 'Sur le marché francilien ultra-exigeant, un site lent ou mal référencé est invisible. WebModernSEO apporte l\'excellence technique Next.js pour s\'imposer face aux acteurs parisiens.',
    avantagesLocaux: [
      'Performance Web Vitals de niveau ingénieur pour dominer le SERP Parisien',
      'Stratégie SXO (Ergonomie + SEO) axée sur le taux de transformation',
      'Développement sur-mesure adapté aux exigences grands comptes & startups'
    ],
    statsLocal: [
      { label: 'Positions top 3 Google sur mots-clés compétitifs', value: '92%' },
      { label: 'Score Lighthouse moyen', value: '98/100' },
      { label: 'Multiplication des conversions', value: 'x2.5' }
    ]
  },
  'saint-etienne': {
    slug: 'saint-etienne',
    nom: 'Saint-Étienne',
    codePostal: '42000',
    region: 'Auvergne-Rhône-Alpes',
    titreSEO: 'Création de Site Internet & Référencement SEO à Saint-Étienne',
    descriptionSEO: 'Développez votre visibilité et votre chiffre d\'affaires à Saint-Étienne grâce à nos solutions web d\'ingénieur et de référencement SEO sur-mesure.',
    introText: 'Terre de design et d\'innovation industrielle, Saint-Étienne dispose d\'un tissu économique riche. Nous concevons pour les artisans, PME et commerçants stéphanois des outils digitaux générateurs de résultats.',
    avantagesLocaux: [
      'Accompagnement adapté au tissu économique de la Loire',
      'SEO local optimisé sur la métropole stéphanoise',
      'Design moderne et rapide pour maximiser les prises de contact'
    ],
    statsLocal: [
      { label: 'Accompagnements Loire & Métropole', value: '+30' },
      { label: 'Taux de fidélité', value: '98%' },
      { label: 'Croissance de trafic naturel', value: '+165%' }
    ]
  }
};
