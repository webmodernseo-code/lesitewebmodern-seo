import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Contact | WebModernSEO — Agence Web & SEO",
  description: "Contactez WebModernSEO pour discuter de votre projet de refonte de site WordPress, de stratégie SEO ou d'automatisation de génération de leads.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
