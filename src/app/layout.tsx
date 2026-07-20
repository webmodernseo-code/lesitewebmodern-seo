import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AuthProvider } from "@/context/AuthContext";
import { UIFeedbackProvider } from "@/context/UIFeedbackContext";
import { ThemeProvider } from "@/components/ThemeProvider";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const DEFAULT_TITLE = "webmodernseo.co — Agence Web et Référencement Naturel Premium SEO";
const DEFAULT_DESCRIPTION =
  "Création de sites internet modernes et performants (Next.js), stratégies de référencement naturel SEO avancées et automatisation de leads pour votre business.";

export const metadata: Metadata = {
  metadataBase: new URL("https://webmodernseo.co"),
  title: {
    default: DEFAULT_TITLE,
    template: "%s | WebModernSEO",
  },
  description: DEFAULT_DESCRIPTION,
  keywords: [
    "agence seo",
    "création de site internet",
    "référencement naturel",
    "développement Next.js",
    "sxo",
    "acquisition de leads"
  ],
  authors: [{ name: "Jean-Prosper MONE", url: "https://webmodernseo.co/apropos" }],
  creator: "Jean-Prosper MONE",
  publisher: "WebModernSEO",
  category: "Technology",
  alternates: {
    canonical: "./",
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
        <ThemeProvider>
          <UIFeedbackProvider>
            <AuthProvider>
              {children}
            </AuthProvider>
          </UIFeedbackProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
