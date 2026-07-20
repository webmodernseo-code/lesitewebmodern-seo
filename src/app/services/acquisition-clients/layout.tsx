import type { Metadata } from 'next';
import { JsonLd } from '@/components/JsonLd';
import { buildServiceSchema, buildBreadcrumbSchema, SITE_URL } from '@/lib/schema';

export const metadata: Metadata = {
  title: "Acquisition de Nouveaux Clients & Conversion Web",
  description: "Maximisez le retour sur investissement (ROI) de votre site : Jean-Prosper MONE conçoit vos tunnels de conversion, landing pages et stratégies d'acquisition de clients.",
  openGraph: {
    title: "Acquisition de Nouveaux Clients & Conversion Web",
    description: "Transformez vos visiteurs passifs en clients réguliers grâce à un tunnel de vente optimisé pour la performance et le design.",
  },
};

const serviceSchema = buildServiceSchema({
  name: 'Acquisition de Nouveaux Clients & Conversion Web',
  description: "Conception de tunnels de conversion, landing pages et stratégies d'acquisition de clients pour maximiser le retour sur investissement du site.",
  serviceType: "Acquisition de clients",
  slug: 'acquisition-clients',
  image: '/images/services/upsef48wagk.jpg',
});

const breadcrumbSchema = buildBreadcrumbSchema([
  { name: 'Accueil', url: SITE_URL },
  { name: 'Services', url: `${SITE_URL}/#services` },
  { name: 'Acquisition de clients', url: `${SITE_URL}/services/acquisition-clients` },
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
