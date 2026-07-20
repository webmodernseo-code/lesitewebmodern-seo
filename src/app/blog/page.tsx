import React from 'react';
import type { Metadata } from 'next';
import { HeaderPublic } from '@/components/public/HeaderPublic';
import { FooterPublic } from '@/components/public/FooterPublic';
import { dbService } from '@/lib/supabase-db';
import Link from 'next/link';
import Image from 'next/image';
import { BookOpen } from 'lucide-react';
import { JsonLd } from '@/components/JsonLd';
import { Reveal } from '@/components/Reveal';
import { buildBreadcrumbSchema, SITE_URL } from '@/lib/schema';

export const metadata: Metadata = {
  title: "Blog — Conseils SEO, Web & Growth",
  description: "Nos meilleures pratiques en création de sites internet, référencement naturel et tunnels d'acquisition commerciale, par l'équipe WebModernSEO.",
  alternates: { canonical: '/blog' },
};

const breadcrumbSchema = buildBreadcrumbSchema([
  { name: 'Accueil', url: SITE_URL },
  { name: 'Blog', url: `${SITE_URL}/blog` },
]);

export const revalidate = 60; // Régénération statique sémantique toutes les minutes

interface BlogPostView {
  id: string | number;
  title: string;
  slug?: string;
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

export default async function BlogPage() {
  let postsToShow: BlogPostView[] = [];
  try {
    const allItems = await dbService.getContentItems();
    postsToShow = allItems.filter(item => item.type === 'blog' && item.status === 'published');
  } catch (err) {
    console.error("Error loading blog posts:", err);
  }

  return (
    <div className="relative min-h-screen bg-white text-black overflow-x-hidden font-sans">
      <JsonLd data={breadcrumbSchema} />
      <HeaderPublic />

      {/* Hero Section Épurée */}
      <section className="w-full pt-36 pb-16 px-6 max-w-[1400px] mx-auto">
        <div className="text-center space-y-5 max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-[#ff4d00]/10 text-[#ff4d00] px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">
            <BookOpen className="w-3.5 h-3.5" />
            Le Blog WebModern SEO
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-black leading-none">
            Analyses, conseils & <span className="text-[#ff4d00]">stratégies</span> de croissance.
          </h1>
          <p className="text-sm md:text-base text-[#5c5c64] font-medium leading-relaxed max-w-2xl mx-auto">
            Nous partageons nos meilleures pratiques en création de sites internet, référencement naturel et tunnels d&apos;acquisition commerciale.
          </p>
        </div>

        {/* Grid Posts — 4 par ligne */}
        {postsToShow.length === 0 ? (
          <div className="text-center py-20 text-sm font-semibold text-black/40">
            Aucun article publié pour le moment.
          </div>
        ) : (
        <Reveal className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {postsToShow.map((post) => {
            const slug = post.slug || slugify(post.title);

            return (
              <Link
                key={post.id}
                href={`/blog/${slug}`}
                className="bg-white border border-black/10 rounded-2xl overflow-hidden shadow-sm hover:border-[#ff4d00]/25 hover:shadow-md transition-all duration-300 flex flex-col group"
              >
                {/* Image */}
                <div className="relative h-44 w-full bg-zinc-100 overflow-hidden">
                  <Image
                    src={post.featured_image || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=60'}
                    alt={post.title}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover group-hover:scale-105 transition-all duration-500"
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
        </Reveal>
        )}
      </section>

      <FooterPublic />
    </div>
  );
}
