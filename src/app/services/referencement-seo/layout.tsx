import type { Metadata } from 'next';
import { JsonLd } from '@/components/JsonLd';
import { buildServiceSchema, buildBreadcrumbSchema, SITE_URL } from '@/lib/schema';

export const metadata: Metadata = {
  title: "Référencement SEO & GÉO Sur-Mesure",
  description: "Doublez votre visibilité digitale : Jean-Prosper MONE optimise votre référencement Google (SEO) et votre présence sur les moteurs IA (GÉO - ChatGPT, Perplexity).",
  openGraph: {
    title: "Référencement SEO & GÉO Sur-Mesure",
    description: "Dominez les résultats de recherche Google et devenez la source recommandée par les moteurs d'intelligence artificielle (ChatGPT, Gemini).",
  },
};

const serviceSchema = buildServiceSchema({
  name: 'Référencement SEO & GÉO Sur-Mesure',
  description: "Optimisation du référencement naturel Google (SEO) et de la présence sur les moteurs IA (GÉO — ChatGPT, Perplexity, Gemini).",
  serviceType: 'Référencement naturel (SEO/GEO)',
  slug: 'referencement-seo',
  image: '/images/services/c_ry4rm1_b4.jpg',
});

const breadcrumbSchema = buildBreadcrumbSchema([
  { name: 'Accueil', url: SITE_URL },
  { name: 'Services', url: `${SITE_URL}/#services` },
  { name: 'Référencement SEO', url: `${SITE_URL}/services/referencement-seo` },
]);

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={serviceSchema} />
      <JsonLd data={breadcrumbSchema} />
      {children}
    </>
  );
}
