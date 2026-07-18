import React from 'react';
import type { Metadata } from 'next';
import { HeaderPublic } from '@/components/public/HeaderPublic';
import { FooterPublic } from '@/components/public/FooterPublic';
import { dbService } from '@/lib/supabase-db';
import Link from 'next/link';
import { BookOpen } from 'lucide-react';

export const metadata: Metadata = {
  title: "Blog | WebModernSEO — Conseils SEO, Web & Growth",
  description: "Nos meilleures pratiques en création de sites internet, référencement naturel et tunnels d'acquisition commerciale, par l'équipe WebModernSEO.",
};

export const revalidate = 60; // Régénération statique sémantique toutes les minutes

interface BlogPostView {
  id: string | number;
  title: string;
  brief?: string;
  featured_image?: string;
}

const slugify = (text: string) =>
  text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Supprimer les accents
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');

const MOCK_POSTS = [
  {
    id: 'm1',
    title: 'Comment optimiser votre SEO local en 2026',
    brief: 'Découvrez nos conseils d\'experts et notre guide complet pour optimiser votre SEO local et sur-optimiser votre fiche Google Business Profile.',
    focus_keyword: 'SEO Local 2026',
    featured_image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=60',
    created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'm2',
    title: 'Pourquoi choisir WordPress pour le site de votre agence web',
    brief: 'Analyse comparative des CMS et des solutions sur-mesure. Pourquoi WordPress reste le pivot incontournable de l\'acquisition de leads en ligne.',
    focus_keyword: 'WordPress',
    featured_image: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=800&auto=format&fit=crop&q=60',
    created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'm3',
    title: 'Automatiser la génération de leads qualifiés avec Next.js',
    brief: 'Comment coupler la rapidité et le SEO de Next.js avec vos formulaires de contact pour doubler vos taux de conversion commerciaux.',
    focus_keyword: 'Lead Gen',
    featured_image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=800&auto=format&fit=crop&q=60',
    created_at: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString()
  }
];

export default async function BlogPage() {
  let blogPosts: BlogPostView[] = [];
  try {
    const allItems = await dbService.getContentItems();
    blogPosts = allItems.filter(item => item.type === 'blog');
  } catch (err) {
    console.error("Error loading blog posts:", err);
  }

  // Utiliser les articles de démo si aucun article n'est encore publié
  const postsToShow = blogPosts.length > 0 ? blogPosts : MOCK_POSTS;

  return (
    <div className="relative min-h-screen bg-[#FDFBF7] text-black overflow-x-hidden font-sans">
      <HeaderPublic />

      {/* Hero Section Épurée */}
      <section className="w-full pt-36 pb-16 px-6 max-w-7xl mx-auto">
        <div className="text-center space-y-5 max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-[#ff4d00]/10 text-[#ff4d00] px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">
            <BookOpen className="w-3.5 h-3.5" />
            Le Blog WebModern SEO
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-black leading-none">
            Analyses, conseils & <span className="text-[#ff4d00]">stratégies</span> de croissance.
          </h1>
          <p className="text-sm md:text-base text-[#5c5c64] font-medium leading-relaxed max-w-2xl mx-auto">
            Nous partageons nos meilleures pratiques en création de sites internet, référencement naturel et tunnels d'acquisition commerciale.
          </p>
        </div>

        {/* Grid Posts — 4 par ligne */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {postsToShow.map((post) => {
            const slug = slugify(post.title);

            return (
              <Link
                key={post.id}
                href={`/blog/${slug}`}
                className="bg-white border border-black/10 rounded-2xl overflow-hidden shadow-sm hover:border-[#ff4d00]/25 hover:shadow-md transition-all duration-300 flex flex-col group"
              >
                {/* Image */}
                <div className="relative h-44 w-full bg-[#fdfbf7] overflow-hidden">
                  <img
                    src={post.featured_image || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=60'}
                    alt={post.title}
                    className="object-cover w-full h-full group-hover:scale-105 transition-all duration-500"
                  />
                </div>

                {/* Content */}
                <div className="p-5 space-y-2 flex-1 flex flex-col">
                  <h3 className="text-base font-extrabold text-black leading-snug">
                    {post.title}
                  </h3>
                  <p className="text-xs text-[#5c5c64] font-medium line-clamp-3 leading-relaxed">
                    {post.brief || "Découvrez notre analyse détaillée et nos conseils dans cet article complet pour optimiser votre visibilité."}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <FooterPublic />
    </div>
  );
}
