import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Portfolio — Réalisations Web & SEO | WebModernSEO",
  description: "Découvrez les sites vitrines et stratégies SEO conçus par WebModernSEO : création web sur-mesure, référencement local et optimisation technique pour des résultats concrets.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
