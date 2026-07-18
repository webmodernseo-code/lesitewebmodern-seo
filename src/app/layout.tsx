import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AuthProvider } from "@/context/AuthContext";
import { UIFeedbackProvider } from "@/context/UIFeedbackContext";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://webmodernseo.co"),
  title: "webmodernseo.co — Agence Web et Référencement Naturel Premium SEO",
  description: "Création de sites internet modernes sous WordPress, stratégies de référencement naturel SEO avancées et automatisation de leads pour votre business.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${inter.variable}`}>
      <body className="font-sans antialiased bg-white text-brand-black min-h-screen">
        <UIFeedbackProvider>
          <AuthProvider>
            {children}
          </AuthProvider>
        </UIFeedbackProvider>
      </body>
    </html>
  );
}
