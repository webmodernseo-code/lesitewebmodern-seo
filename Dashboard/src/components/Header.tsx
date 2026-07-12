import React from 'react';
import { Sparkles, Calendar, LayoutGrid, Database, AlertCircle } from 'lucide-react';
import { isSupabaseConfigured } from '@/lib/supabase';

interface HeaderProps {
  activeTab: 'content' | 'projects';
  setActiveTab: (tab: 'content' | 'projects') => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab }) => {
  return (
    <header className="border-b border-brand-black/10 bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-brand-orange flex items-center justify-center text-white">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-brand-black">
              WebModern <span className="text-brand-orange">SEO</span>
            </h1>
            <p className="text-[10px] text-brand-black/50 font-medium tracking-widest uppercase">
              Cockpit & Planning
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center gap-1 bg-brand-sable/30 p-1.5 rounded-xl border border-brand-black/5">
          <button
            onClick={() => setActiveTab('content')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
              activeTab === 'content'
                ? 'bg-white text-brand-black shadow-sm border border-brand-black/5'
                : 'text-brand-black/60 hover:text-brand-black'
            }`}
          >
            <LayoutGrid className="w-4 h-4" />
            Contenus IA
          </button>
          <button
            onClick={() => setActiveTab('projects')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
              activeTab === 'projects'
                ? 'bg-white text-brand-black shadow-sm border border-brand-black/5'
                : 'text-brand-black/60 hover:text-brand-black'
            }`}
          >
            <Calendar className="w-4 h-4" />
            Planification Projets
          </button>
        </nav>

        {/* Database Status Indicator */}
        <div className="flex items-center gap-2">
          {isSupabaseConfigured ? (
            <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 rounded-lg border border-emerald-100 text-xs font-semibold">
              <Database className="w-3.5 h-3.5" />
              Base Supabase Connectée
            </div>
          ) : (
            <div className="flex items-center gap-2 px-4 py-2 bg-brand-sable/80 text-brand-orange rounded-lg border border-brand-orange/20 text-xs font-semibold" title="Configuration de .env.local requise pour utiliser Supabase">
              <AlertCircle className="w-3.5 h-3.5" />
              Stockage Local (Mode Démo)
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
