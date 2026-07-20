'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { LiquidMetalButton } from './ui/liquid-metal-button';
import { ThemeToggle } from './ThemeToggle';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#050609]/90 backdrop-blur-md border-b border-white/10 py-3 shadow-2xl'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo WebModernSEO */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-orange-600 via-orange-500 to-amber-400 flex items-center justify-center text-black font-black shadow-lg shadow-orange-500/30 group-hover:scale-105 transition-transform">
              <span className="text-sm tracking-tighter text-black font-extrabold">WM</span>
            </div>
            <span className="text-xl font-extrabold tracking-tight text-white font-sans">
              WebModern<span className="text-orange-500">SEO</span>
            </span>
          </Link>

          {/* Navigation PC */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="#features"
              className="text-sm font-medium text-zinc-300 hover:text-orange-400 transition-colors"
            >
              Fonctionnalités
            </Link>
            <Link
              href="#results"
              className="text-sm font-medium text-zinc-300 hover:text-orange-400 transition-colors"
            >
              Résultats
            </Link>
            <Link
              href="#work"
              className="text-sm font-medium text-zinc-300 hover:text-orange-400 transition-colors"
            >
              Cas d'études
            </Link>
            <Link
              href="#process"
              className="text-sm font-medium text-zinc-300 hover:text-orange-400 transition-colors"
            >
              Processus
            </Link>
            <Link
              href="#pricing"
              className="text-sm font-medium text-zinc-300 hover:text-orange-400 transition-colors"
            >
              Tarifs
            </Link>
            <Link
              href="#faq"
              className="text-sm font-medium text-zinc-300 hover:text-orange-400 transition-colors"
            >
              FAQ
            </Link>
          </nav>

          {/* Bouton Theme Toggle & Action CTA */}
          <div className="hidden md:flex items-center gap-4">
            <ThemeToggle />
            <LiquidMetalButton
              label="Démarrer l'essai"
              onClick={() => {
                const el = document.getElementById('contact');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
            />
          </div>

          {/* Controls Mobile */}
          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-orange-500"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Menu Mobile */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0A0C14]/95 backdrop-blur-lg border-b border-white/10 px-4 pt-4 pb-6 space-y-4 font-sans">
          <Link
            href="#features"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-medium text-zinc-300 hover:text-orange-400"
          >
            Fonctionnalités
          </Link>
          <Link
            href="#results"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-medium text-zinc-300 hover:text-orange-400"
          >
            Résultats
          </Link>
          <Link
            href="#work"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-medium text-zinc-300 hover:text-orange-400"
          >
            Cas d'études
          </Link>
          <Link
            href="#process"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-medium text-zinc-300 hover:text-orange-400"
          >
            Processus
          </Link>
          <Link
            href="#pricing"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-medium text-zinc-300 hover:text-orange-400"
          >
            Tarifs
          </Link>
          <Link
            href="#contact"
            onClick={() => setMobileMenuOpen(false)}
            className="block w-full text-center py-3 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-black font-extrabold shadow-md"
          >
            Démarrer l'essai
          </Link>
        </div>
      )}
    </header>
  );
}
