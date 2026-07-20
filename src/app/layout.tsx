import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AuthProvider } from "@/context/AuthContext";
import { UIFeedbackProvider } from "@/context/UIFeedbackContext";
import { JsonLd } from "@/components/JsonLd";
import { buildWebSiteSchema } from "@/lib/schema";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const DEFAULT_TITLE = "Agence Web & SEO à Grenoble — Création de Site, Référencement";
const DEFAULT_DESCRIPTION =
  "Agence basée à Grenoble : création de sites internet Next.js et référencement SEO. Intervention à Paris, Lyon, Saint-Étienne et partout en France.";

export const metadata: Metadata = {
  metadataBase: new URL("https://webmodernseo.co"),
  title: {
    default: DEFAULT_TITLE,
    template: "%s | WebModernSEO",
  },
  description: DEFAULT_DESCRIPTION,
  keywords: [
    "agence seo grenoble",
    "création de site internet",
    "référencement naturel",
    "publicité meta ads",
    "création application web",
    "site e-commerce",
    "développement Next.js",
    "sxo",
    "acquisition de leads"
  ],
  authors: [{ name: "Jean-Prosper MONE", url: "https://webmodernseo.co/apropos" }],
  creator: "Jean-Prosper MONE",
  publisher: "WebModernSEO",
  category: "Technology",
  alternates: {
    canonical: "https://webmodernseo.co/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    siteName: 'WebModernSEO',
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    url: 'https://webmodernseo.co',
    images: [{ url: '/apple-icon.png', width: 360, height: 360, alt: 'WebModernSEO Logo' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    creator: '@webmodernseo',
    images: ['/apple-icon.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${inter.variable}`}>
      <body className="font-sans antialiased min-h-screen selection:bg-amber-500 selection:text-black">
        <JsonLd data={buildWebSiteSchema()} />
        <UIFeedbackProvider>
          <AuthProvider>
            {children}
          </AuthProvider>
        </UIFeedbackProvider>
      </body>
    </html>
  );
}
