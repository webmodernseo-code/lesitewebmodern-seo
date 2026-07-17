import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Acquisition de Nouveaux Clients & Conversion Web | WebModernSEO",
  description: "Maximisez le retour sur investissement (ROI) de votre site : Jean-Prosper MONE conçoit vos tunnels de conversion, landing pages et stratégies d'acquisition de clients.",
  openGraph: {
    title: "Acquisition de Nouveaux Clients & Conversion Web | WebModernSEO",
    description: "Transformez vos visiteurs passifs en clients réguliers grâce à un tunnel de vente optimisé pour la performance et le design.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
