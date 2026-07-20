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
