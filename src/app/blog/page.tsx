import React from 'react';
import { HeaderPublic } from '@/components/public/HeaderPublic';
import { FooterPublic } from '@/components/public/FooterPublic';
import { dbService } from '@/lib/supabase-db';
import Link from 'next/link';
import { Calendar, User, ArrowRight, BookOpen } from 'lucide-react';

export const revalidate = 60; // Régénération statique sémantique toutes les minutes

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
  let blogPosts = [];
  try {
    const allItems = await dbService.getContentItems();
    blogPosts = allItems.filter(item => item.type === 'blog');
  } catch (err) {
    console.error("Error loading blog posts:", err);
  }

  // Utiliser les articles de démo si aucun article n'est encore publié
  const postsToShow = blogPosts.length > 0 ? blogPosts : MOCK_POSTS;
  const featuredPost = postsToShow[0];
  const gridPosts = postsToShow.slice(1);

  return (
    <div className="relative min-h-screen bg-[#FDFBF7] text-black overflow-x-hidden font-sans">
      <HeaderPublic />

      {/* Hero Section Épurée */}
      <section className="w-full pt-36 pb-16 px-6 max-w-6xl mx-auto">
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

        {/* Featured Post (Grand Format Premium) */}
        {featuredPost && (
          <div className="bg-white border border-black/10 rounded-[32px] overflow-hidden shadow-sm hover:border-[#ff4d00]/25 transition-all duration-300 mb-16 flex flex-col lg:flex-row group">
            {/* Image */}
            <div className="w-full lg:w-7/12 h-64 sm:h-80 lg:h-auto bg-[#faf6ee] overflow-hidden relative">
              <img 
                src={featuredPost.featured_image || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&auto=format&fit=crop&q=80'} 
                alt={featuredPost.title}
                className="object-cover w-full h-full group-hover:scale-105 transition-all duration-500"
              />
            </div>
            {/* Content */}
            <div className="w-full lg:w-5/12 p-8 md:p-10 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-[10px] font-bold text-black/40 uppercase tracking-widest">
                  <span>{new Date(featuredPost.created_at || '').toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                  <span>•</span>
                  <span className="text-[#ff4d00]">{featuredPost.focus_keyword || 'SEO'}</span>
                </div>
                <h2 className="text-xl md:text-2xl font-black text-black group-hover:text-[#ff4d00] transition-colors leading-tight">
                  <Link href={`/blog/${slugify(featuredPost.title)}`}>
                    {featuredPost.title}
                  </Link>
                </h2>
                <p className="text-xs text-[#5c5c64] leading-relaxed font-medium">
                  {featuredPost.brief || "Découvrez notre analyse détaillée et nos conseils dans cet article complet pour optimiser votre visibilité."}
                </p>
              </div>
              
              <div className="pt-6 border-t border-black/5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-[#ff4d00]/10 flex items-center justify-center text-[10px] font-bold text-[#ff4d00]">WM</div>
                  <span className="text-[10px] font-bold text-black/50">Par l'équipe WebModern</span>
                </div>
                <Link 
                  href={`/blog/${slugify(featuredPost.title)}`}
                  className="text-xs font-black text-[#ff7e47] hover:text-[#ff4d00] flex items-center gap-1.5 transition-colors"
                >
                  Lire l'article
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Grid Posts */}
        {gridPosts.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {gridPosts.map((post) => {
              const slug = slugify(post.title);
              const formattedDate = new Date(post.created_at || '').toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });

              return (
                <article key={post.id} className="bg-white border border-black/10 rounded-3xl shadow-sm overflow-hidden flex flex-col justify-between group hover:border-[#ff4d00]/25 transition-all duration-300">
                  <div>
                    {/* Image */}
                    <div className="relative h-52 w-full bg-[#fdfbf7] overflow-hidden">
                      <img 
                        src={post.featured_image || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=60'} 
                        alt={post.title}
                        className="object-cover w-full h-full group-hover:scale-105 transition-all duration-500"
                      />
                    </div>

                    {/* Content */}
                    <div className="p-6 space-y-3.5">
                      <div className="flex items-center gap-3 text-[9px] font-bold text-black/40 uppercase tracking-widest">
                        <span>{formattedDate}</span>
                        <span>•</span>
                        <span className="text-[#ff4d00]">{post.focus_keyword || 'SEO'}</span>
                      </div>
                      <h3 className="text-lg font-black text-black group-hover:text-[#ff4d00] transition-colors leading-snug">
                        <Link href={`/blog/${slug}`}>
                          {post.title}
                        </Link>
                      </h3>
                      <p className="text-xs text-[#5c5c64] font-medium line-clamp-3 leading-relaxed">
                        {post.brief || "Découvrez notre analyse détaillée et nos conseils dans cet article complet pour optimiser votre visibilité."}
                      </p>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="p-6 pt-0 border-t border-black/5 mt-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full bg-[#ff4d00]/10 flex items-center justify-center text-[9px] font-bold text-[#ff4d00]">WM</div>
                      <span className="text-[9px] font-bold text-black/50">Équipe WebModern</span>
                    </div>
                    <Link 
                      href={`/blog/${slug}`}
                      className="text-xs font-black text-[#ff7e47] hover:text-[#ff4d00] flex items-center gap-1.5 transition-colors"
                    >
                      Lire l'article
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>

      <FooterPublic />
    </div>
  );
}
