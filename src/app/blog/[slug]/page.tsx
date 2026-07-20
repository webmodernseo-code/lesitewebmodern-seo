import React from 'react';
import type { Metadata } from 'next';
import { HeaderPublic } from '@/components/public/HeaderPublic';
import { FooterPublic } from '@/components/public/FooterPublic';
import { dbService } from '@/lib/supabase-db';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Calendar, User, ArrowLeft, Clock } from 'lucide-react';
import { JsonLd } from '@/components/JsonLd';
import { buildArticleSchema, buildBreadcrumbSchema, SITE_URL } from '@/lib/schema';

export const revalidate = 60; // Régénération statique sémantique toutes les minutes

const slugify = (text: string) => 
  text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Supprimer les accents
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = params;
  try {
    const post = await dbService.getContentItemBySlug(slug);
    if (post && post.type === 'blog') {
      return {
        title: `${post.title} | Blog WebModernSEO`,
        description: post.meta_description || post.brief || "Découvrez notre analyse détaillée et nos conseils pour optimiser votre visibilité.",
        alternates: { canonical: `/blog/${slug}` },
      };
    }
  } catch (err) {
    console.error("Error generating blog post metadata:", err);
  }
  return {
    title: "Article | Blog WebModernSEO",
    description: "Analyses, conseils et stratégies de croissance en création de sites internet et référencement naturel.",
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = params;
  let post = null;

  try {
    post = await dbService.getContentItemBySlug(slug);
  } catch (err) {
    console.error("Error fetching post by slug:", err);
  }

  if (!post) {
    notFound();
  }

  const formattedDate = post.published_at
    ? new Date(post.published_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })
    : new Date(post.created_at || '').toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });

  const articleSchema = buildArticleSchema(post, slug);
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Accueil', url: SITE_URL },
    { name: 'Blog', url: `${SITE_URL}/blog` },
    { name: post.title, url: `${SITE_URL}/blog/${slug}` },
  ]);

  return (
    <div className="relative min-h-screen bg-[#FDFBF7] text-black overflow-x-hidden font-sans">
      <JsonLd data={articleSchema} />
      <JsonLd data={breadcrumbSchema} />
      <HeaderPublic />

      <main className="w-full pt-32 pb-24 px-6 max-w-3xl mx-auto">
        {/* Bouton retour */}
        <div className="mb-8">
          <Link 
            href="/blog" 
            className="text-xs font-bold text-black/50 hover:text-black flex items-center gap-1.5 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            Retour aux articles
          </Link>
        </div>

        {/* En-tête de l'article */}
        <header className="space-y-6 mb-12">
          {/* Tag mot-clé */}
          <span className="text-[10px] font-bold text-[#ff4d00] uppercase tracking-wider bg-[#ff4d00]/10 px-3 py-1 rounded-full">
            {post.focus_keyword || 'SEO & Web'}
          </span>
          
          {/* Titre */}
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-black leading-tight">
            {post.title}
          </h1>

          {/* Méta-infos */}
          <div className="flex flex-wrap items-center gap-6 text-xs text-black/50 border-y border-black/5 py-4">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              {formattedDate}
            </span>
            <Link href="/apropos" className="flex items-center gap-1.5 hover:text-[#ff4d00] transition-colors">
              <User className="w-4 h-4" />
              Rédigé par Jean-Prosper MONE
            </Link>
            {post.seo_score > 0 && (
              <span className="flex items-center gap-1.5 text-[#0FAC71] font-bold">
                <Clock className="w-4 h-4" />
                Score SEO : {post.seo_score}/100
              </span>
            )}
          </div>
        </header>

        {/* Image principale */}
        <div className="relative h-64 sm:h-96 w-full rounded-3xl overflow-hidden bg-white border border-black/5 mb-12">
          <img 
            src={post.featured_image || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&auto=format&fit=crop&q=80'} 
            alt={post.title}
            className="object-cover w-full h-full"
          />
        </div>

        {/* Corps de l'article */}
        <article className="prose prose-stone max-w-none text-black leading-relaxed space-y-6">
          <div 
            className="article-content"
            dangerouslySetInnerHTML={{ __html: post.content || '' }} 
          />
        </article>

        {/* Section Newsletter / Fin d'article */}
        <div className="mt-16 bg-white border border-black/10 p-8 rounded-3xl text-center space-y-4">
          <h3 className="text-lg font-bold text-black">Besoin d'aide pour votre visibilité en ligne ?</h3>
          <p className="text-xs text-[#5c5c64] max-w-md mx-auto">
            Nous concevons des stratégies SEO sur-mesure et des sites internet performants pour attirer des clients qualifiés chaque mois.
          </p>
          <div className="pt-2">
            <Link 
              href="/contact" 
              className="inline-block bg-[#ff4d00] hover:bg-[#ff4d00]/95 text-white py-3 px-6 rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-sm"
            >
              Échanger avec un consultant
            </Link>
          </div>
        </div>
      </main>

      <FooterPublic />
    </div>
  );
}
