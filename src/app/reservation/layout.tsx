import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Prendre Rendez-vous | WebModernSEO",
  description: "Réservez un appel gratuit avec WebModernSEO pour échanger sur votre projet de création de site web ou de référencement SEO.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
