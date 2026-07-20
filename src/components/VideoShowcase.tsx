'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Sparkles, X } from 'lucide-react';

export function VideoShowcase() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section className="py-20 bg-stone-50/90 dark:bg-[#07090E] relative border-t border-b border-zinc-200 dark:border-white/5 transition-colors duration-400">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-orange-600 dark:text-orange-400 uppercase tracking-widest mb-3">
          <Sparkles className="w-4 h-4" />
          <span>Démonstration Plateforme WebModernSEO</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white mb-12">
          Découvrez la Plateforme en <span className="orange-gradient-text">Action</span>
        </h2>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl overflow-hidden border border-orange-500/40 shadow-2xl shadow-orange-500/15 group cursor-pointer"
          onClick={() => setIsPlaying(true)}
        >
          {/* Aperçu vidéo */}
          <img
            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=80"
            alt="Aperçu Télémetrie WebModernSEO"
            className="w-full h-[400px] sm:h-[550px] object-cover filter brightness-75 group-hover:scale-105 transition-transform duration-700"
          />

          {/* Dégradé sombre */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

          {/* Bouton de lecture */}
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
            <div className="w-20 h-20 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 text-black flex items-center justify-center shadow-2xl shadow-orange-500/50 group-hover:scale-110 transition-transform">
              <Play className="w-8 h-8 fill-black translate-x-0.5" />
            </div>
            <span className="text-white font-semibold text-sm tracking-wide bg-black/70 px-5 py-2 rounded-full border border-white/10 backdrop-blur-md">
              Regarder la présentation d'architecture (2 min)
            </span>
          </div>
        </motion.div>
      </div>

      {/* Modale Vidéo */}
      {isPlaying && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative w-full max-w-4xl aspect-video bg-black rounded-2xl overflow-hidden border border-zinc-800">
            <button
              onClick={() => setIsPlaying(false)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-zinc-900 text-white hover:bg-orange-500 hover:text-black transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
              title="Vidéo de Démonstration WebModernSEO"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </section>
  );
}
