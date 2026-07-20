// Générateurs centralisés de données structurées (JSON-LD) pour webmodernseo.co.

export const SITE_URL = 'https://webmodernseo.co';
export const ORGANIZATION_ID = `${SITE_URL}/#organization`;

// Zones commerciales ciblées (agence de service, sans point de vente physique visitable)
const CITIES_SERVED = ['Grenoble', 'Paris', 'Lyon', 'Saint-Étienne'];

function buildAreaServed() {
  return CITIES_SERVED.map((city) => ({
    '@type': 'City',
    name: city,
    containedInPlace: { '@type': 'Country', name: 'France' },
  }));
}

const FOUNDER = {
  '@type': 'Person',
  name: 'Jean-Prosper MONE',
  jobTitle: 'Fondateur',
  url: `${SITE_URL}/apropos`,
};

/**
 * Organization + ProfessionalService, à injecter une seule fois sur la page d'accueil.
 * Pas de champ "address" : recommandation Google pour les service-area businesses
 * sans adresse publique visitable.
 */
export function buildOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'ProfessionalService'],
    '@id': ORGANIZATION_ID,
    name: 'WebModernSEO',
    alternateName: 'webmodernseo.co',
    url: SITE_URL,
    logo: {
      '@type': 'ImageObject',
      url: `${SITE_URL}/apple-icon.png`,
      width: 360,
      height: 360,
    },
    image: `${SITE_URL}/apple-icon.png`,
    description:
      "Agence de création de sites internet sur-mesure, de référencement naturel (SEO) et d'acquisition de clients, intervenant à Grenoble, Paris, Lyon et Saint-Étienne.",
    email: 'contact@webmodernseo.co',
    telephone: '+33753887751',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Grenoble',
      addressRegion: 'Auvergne-Rhône-Alpes',
      addressCountry: 'FR',
    },
    areaServed: buildAreaServed(),
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '18:00',
    },
    founder: FOUNDER,
    sameAs: [
      'https://www.facebook.com/webmodernseo',
      'https://www.instagram.com/webmodernseo',
      'https://www.tiktok.com/@webmodernseo',
    ],
    makesOffer: [
      {
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: 'Création de sites internet', url: `${SITE_URL}/services/creation-web` },
      },
      {
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: 'Référencement naturel SEO', url: `${SITE_URL}/services/referencement-seo` },
      },
      {
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: 'Acquisition de clients', url: `${SITE_URL}/services/acquisition-clients` },
      },
    ],
  };
}

function getPublisherStub() {
  return {
    '@type': 'Organization',
    '@id': ORGANIZATION_ID,
    name: 'WebModernSEO',
    url: SITE_URL,
    logo: {
      '@type': 'ImageObject',
      url: `${SITE_URL}/apple-icon.png`,
      width: 360,
      height: 360,
    },
  };
}

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export function buildBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

interface ServiceSchemaParams {
  name: string;
  description: string;
  serviceType: string;
  slug: string;
  image: string;
  citySlug?: string; // si fourni, restreint areaServed à cette seule ville
  cityName?: string;
}

export function buildServiceSchema({ name, description, serviceType, slug, image, cityName }: ServiceSchemaParams) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    serviceType,
    url: `${SITE_URL}/services/${slug}`,
    image: `${SITE_URL}${image}`,
    provider: getPublisherStub(),
    areaServed: cityName
      ? [{ '@type': 'City', name: cityName, containedInPlace: { '@type': 'Country', name: 'France' } }]
      : buildAreaServed(),
  };
}

export interface BlogPostLike {
  title: string;
  brief?: string;
  meta_description?: string;
  focus_keyword?: string;
  featured_image?: string;
  published_at?: string;
  created_at?: string;
  updated_at?: string;
}

function toAbsoluteImageUrl(image?: string): string {
  if (!image) return `${SITE_URL}/images/portfolio/he75ojuxofe.jpg`;
  if (image.startsWith('http')) return image;
  return `${SITE_URL}${image.startsWith('/') ? '' : '/'}${image}`;
}

function toIsoDate(value?: string): string {
  if (!value) return new Date().toISOString();
  const d = new Date(value);
  return isNaN(d.getTime()) ? new Date().toISOString() : d.toISOString();
}

/**
 * Schéma BlogPosting. `author` est un Person (le fondateur) pour rester cohérent
 * avec la mention visible "Rédigé par Jean-Prosper MONE" sur la page article.
 */
export function buildArticleSchema(post: BlogPostLike, slug: string) {
  const url = `${SITE_URL}/blog/${slug}`;
  const published = toIsoDate(post.published_at || post.created_at);
  const modified = toIsoDate(post.updated_at || post.published_at || post.created_at);

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${url}#article`,
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    url,
    headline: post.title,
    description:
      post.meta_description ||
      post.brief ||
      'Analyses et conseils SEO, création de sites internet et acquisition de clients par WebModernSEO.',
    image: [toAbsoluteImageUrl(post.featured_image)],
    datePublished: published,
    dateModified: modified,
    inLanguage: 'fr-FR',
    articleSection: post.focus_keyword || 'SEO & Web',
    author: FOUNDER,
    publisher: getPublisherStub(),
  };
}

// FAQ de la page d'accueil — dupliqué depuis src/components/public/FaqPublic.tsx.
// Si les questions changent un jour, mettre à jour les deux endroits.
export const HOMEPAGE_FAQ_ITEMS = [
  {
    question: 'Quels types de projets web réalisez-vous ?',
    answer:
      "Nous créons des sites internet sur-mesure de haute performance (Next.js), des landing pages de conversion ultra-rapides, et des applications web SaaS. Tous nos designs sont exclusifs, modernes et optimisés pour le mobile.",
  },
  {
    question: "Comment fonctionne l'optimisation SEO native ?",
    answer:
      "Dès la première ligne de code, nous structurons votre site pour les moteurs de recherche (sémantique HTML5, balisage propre, vitesse de chargement PageSpeed maximale, et version mobile optimisée). C'est le moyen le plus sûr de monter rapidement dans Google.",
  },
  {
    question: "Qu'est-ce que l'automatisation de processus (Zapier, CRM...) ?",
    answer:
      "Nous connectons votre site internet à vos outils quotidiens (Zapier, Make, Hubspot, Notion, Google Sheets). Ainsi, vos formulaires de contact envoient automatiquement des alertes, créent des fiches clients ou planifient des rendez-vous sans aucune action manuelle de votre part.",
  },
  {
    question: 'Quels sont vos délais moyens de livraison ?',
    answer:
      "Une landing page de vente prend généralement entre 7 à 10 jours. Pour un site internet complet ou une refonte sur-mesure, comptez entre 3 à 5 semaines de développement selon la complexité et le nombre d'automatisations demandées.",
  },
  {
    question: 'Proposez-vous un service de maintenance après livraison ?',
    answer:
      "Oui, nous proposons des forfaits mensuels de maintenance technique pour gérer les sauvegardes quotidiennes, surveiller la sécurité contre les piratages, mettre à jour vos extensions, et réaliser des ajustements mineurs à votre demande.",
  },
];

export function buildFaqSchema(items: { question: string; answer: string }[] = HOMEPAGE_FAQ_ITEMS) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}

export interface LocalBusinessSchemaParams {
  name: string;
  description: string;
  address: {
    addressLocality: string;
    postalCode: string;
    addressRegion: string;
  };
}

export function buildLocalBusinessSchema({ name, description, address }: LocalBusinessSchemaParams) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${SITE_URL}/#local-${address.addressLocality.toLowerCase()}`,
    name,
    description,
    url: SITE_URL,
    image: `${SITE_URL}/apple-icon.png`,
    telephone: '+33753887751',
    address: {
      '@type': 'PostalAddress',
      addressLocality: address.addressLocality,
      postalCode: address.postalCode,
      addressRegion: address.addressRegion,
      addressCountry: 'FR',
    },
    provider: getPublisherStub(),
  };
}
