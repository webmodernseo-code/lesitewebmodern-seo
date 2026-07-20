import type { Metadata } from 'next';
import { JsonLd } from '@/components/JsonLd';
import { buildServiceSchema, buildBreadcrumbSchema, SITE_URL } from '@/lib/schema';

export const metadata: Metadata = {
  title: "Création de Site Internet Sur-Mesure & Performant | WebModernSEO",
  description: "Besoin d'un site web rapide et unique ? Jean-Prosper MONE conçoit votre site internet sur-mesure (vitrine, e-commerce, SaaS) optimisé pour le SEO avec des performances d'ingénieur. Demandez votre diagnostic !",
  openGraph: {
    title: "Création de Site Internet Sur-Mesure & Performant | WebModernSEO",
    description: "Découvrez nos solutions de développement d'élite (vitrine, e-commerce, applications web) optimisées pour Google et chargeant instantanément.",
  },
};

const serviceSchema = buildServiceSchema({
  name: 'Création de Sites Internet Sur-Mesure & Performants',
  description: "Conception et développement de sites internet sur-mesure (vitrine, e-commerce, SaaS), optimisés pour la vitesse de chargement et le référencement naturel (SEO).",
  serviceType: 'Création de site internet',
  slug: 'creation-web',
  image: '/images/services/c2k8vbhynwm.jpg',
});

const breadcrumbSchema = buildBreadcrumbSchema([
  { name: 'Accueil', url: SITE_URL },
  { name: 'Services', url: `${SITE_URL}/#services` },
  { name: 'Création de sites internet', url: `${SITE_URL}/services/creation-web` },
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
