import type { Metadata } from 'next';
import { JsonLd } from '@/components/JsonLd';
import { buildServiceSchema, buildBreadcrumbSchema, SITE_URL } from '@/lib/schema';

export const metadata: Metadata = {
  title: "Publicité Meta Ads (Facebook & Instagram)",
  description: "Campagnes Facebook & Instagram Ads pilotées par la donnée : ciblage précis, tracking fiable et optimisation continue pour un coût par acquisition maîtrisé.",
  openGraph: {
    title: "Publicité Meta Ads (Facebook & Instagram)",
    description: "Générez des prospects qualifiés dès les premiers jours grâce à des campagnes Meta Ads structurées pour la conversion.",
  },
};

const serviceSchema = buildServiceSchema({
  name: 'Publicité Meta Ads (Facebook & Instagram)',
  description: "Création et pilotage de campagnes publicitaires Facebook Ads et Instagram Ads : ciblage, tracking, créations publicitaires et optimisation du coût par acquisition.",
  serviceType: 'Publicité en ligne (Meta Ads)',
  slug: 'publicite-meta-ads',
  image: '/images/services/upsef48wagk.jpg',
});

const breadcrumbSchema = buildBreadcrumbSchema([
  { name: 'Accueil', url: SITE_URL },
  { name: 'Services', url: `${SITE_URL}/#services` },
  { name: 'Publicité Meta Ads', url: `${SITE_URL}/services/publicite-meta-ads` },
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
