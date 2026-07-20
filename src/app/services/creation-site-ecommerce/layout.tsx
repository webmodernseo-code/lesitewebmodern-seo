import type { Metadata } from 'next';
import { JsonLd } from '@/components/JsonLd';
import { buildServiceSchema, buildBreadcrumbSchema, SITE_URL } from '@/lib/schema';

export const metadata: Metadata = {
  title: "Création de Site E-commerce",
  description: "Boutique en ligne Next.js sur-mesure : rapide, optimisée SEO produit et pensée pour la conversion. Paiement sécurisé et gestion de catalogue simplifiée.",
  openGraph: {
    title: "Création de Site E-commerce",
    description: "Une boutique en ligne rapide, sécurisée et optimisée pour le référencement de vos fiches produits.",
  },
};

const serviceSchema = buildServiceSchema({
  name: 'Création de Site E-commerce',
  description: "Conception de boutiques en ligne Next.js sur-mesure : catalogue produit, paiement sécurisé, optimisation SEO produit et performance de conversion.",
  serviceType: 'Création de site e-commerce',
  slug: 'creation-site-ecommerce',
  image: '/images/services/c2k8vbhynwm.jpg',
});

const breadcrumbSchema = buildBreadcrumbSchema([
  { name: 'Accueil', url: SITE_URL },
  { name: 'Services', url: `${SITE_URL}/#services` },
  { name: 'Création de site e-commerce', url: `${SITE_URL}/services/creation-site-ecommerce` },
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
