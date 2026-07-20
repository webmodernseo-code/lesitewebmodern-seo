import React from 'react';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { StatsSection } from '@/components/StatsSection';
import { LogosMarquee } from '@/components/LogosMarquee';
import { FeaturesGrid } from '@/components/FeaturesGrid';
import { VideoShowcase } from '@/components/VideoShowcase';
import { AnalyticsResults } from '@/components/AnalyticsResults';
import { PortfolioGrid } from '@/components/PortfolioGrid';
import { ProcessTimeline } from '@/components/ProcessTimeline';
import { Testimonials } from '@/components/Testimonials';
import { PricingSection } from '@/components/PricingSection';
import { TeamSection } from '@/components/TeamSection';
import { ContactSection } from '@/components/ContactSection';
import { BlogSection } from '@/components/BlogSection';
import { FaqSection } from '@/components/FaqSection';
import { Footer } from '@/components/Footer';

export const metadata = {
  title: "webmodernseo.co — Agence Web & Plateforme de Croissance SEO IA",
  description: "Développez votre chiffre d'affaires, automatisez vos workflows et dominez votre secteur grâce à notre architecture stratégique SEO & IA.",
};

export default function Home() {
  return (
    <div className="min-h-screen bg-[#FAF8F5] dark:bg-[#050609] text-zinc-900 dark:text-zinc-100 transition-colors duration-400 selection:bg-amber-500 selection:text-black">
      <Navbar />
      <Hero />
      <StatsSection />
      <LogosMarquee />
      <FeaturesGrid />
      <VideoShowcase />
      <AnalyticsResults />
      <PortfolioGrid />
      <ProcessTimeline />
      <Testimonials />
      <PricingSection />
      <TeamSection />
      <ContactSection />
      <BlogSection />
      <FaqSection />
      <Footer />
    </div>
  );
}
