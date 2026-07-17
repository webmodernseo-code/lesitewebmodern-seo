import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Création de Site Internet Sur-Mesure & Performant | WebModernSEO",
  description: "Besoin d'un site web rapide et unique ? Jean-Prosper MONE conçoit votre site internet sur-mesure (vitrine, e-commerce, SaaS) optimisé pour le SEO avec des performances d'ingénieur. Demandez votre diagnostic !",
  openGraph: {
    title: "Création de Site Internet Sur-Mesure & Performant | WebModernSEO",
    description: "Découvrez nos solutions de développement d'élite (vitrine, e-commerce, applications web) optimisées pour Google et chargeant instantanément.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
