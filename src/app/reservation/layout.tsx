import type { Metadata } from 'next';
import { JsonLd } from '@/components/JsonLd';
import { buildBreadcrumbSchema, SITE_URL } from '@/lib/schema';

export const metadata: Metadata = {
  title: "Prendre Rendez-vous | WebModernSEO",
  description: "Réservez un appel gratuit avec WebModernSEO pour échanger sur votre projet de création de site web ou de référencement SEO.",
  alternates: { canonical: '/reservation' },
};

const breadcrumbSchema = buildBreadcrumbSchema([
  { name: 'Accueil', url: SITE_URL },
  { name: 'Réservation', url: `${SITE_URL}/reservation` },
]);

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      {children}
    </>
  );
}
