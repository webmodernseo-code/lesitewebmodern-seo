import type { Metadata } from 'next';
import { JsonLd } from '@/components/JsonLd';
import { buildBreadcrumbSchema, SITE_URL } from '@/lib/schema';

export const metadata: Metadata = {
  title: "Portfolio — Réalisations Web & SEO | WebModernSEO",
  description: "Découvrez les sites vitrines et stratégies SEO conçus par WebModernSEO : création web sur-mesure, référencement local et optimisation technique pour des résultats concrets.",
  alternates: { canonical: '/portfolio' },
};

const breadcrumbSchema = buildBreadcrumbSchema([
  { name: 'Accueil', url: SITE_URL },
  { name: 'Portfolio', url: `${SITE_URL}/portfolio` },
]);

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      {children}
    </>
  );
}
