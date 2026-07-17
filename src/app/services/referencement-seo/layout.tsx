import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Référencement SEO & GÉO Sur-Mesure | WebModernSEO",
  description: "Doublez votre visibilité digitale : Jean-Prosper MONE optimise votre référencement Google (SEO) et votre présence sur les moteurs IA (GÉO - ChatGPT, Perplexity).",
  openGraph: {
    title: "Référencement SEO & GÉO Sur-Mesure | WebModernSEO",
    description: "Dominez les résultats de recherche Google et devenez la source recommandée par les moteurs d'intelligence artificielle (ChatGPT, Gemini).",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
