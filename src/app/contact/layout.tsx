import type { Metadata } from 'next';
import { JsonLd } from '@/components/JsonLd';
import { buildBreadcrumbSchema, SITE_URL } from '@/lib/schema';

export const metadata: Metadata = {
  title: "Contact | WebModernSEO — Agence Web & SEO",
  description: "Contactez WebModernSEO pour discuter de votre projet de site internet, de stratégie SEO ou d'automatisation de génération de leads.",
  alternates: { canonical: '/contact' },
};

const breadcrumbSchema = buildBreadcrumbSchema([
  { name: 'Accueil', url: SITE_URL },
  { name: 'Contact', url: `${SITE_URL}/contact` },
]);

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      {children}
    </>
  );
}
