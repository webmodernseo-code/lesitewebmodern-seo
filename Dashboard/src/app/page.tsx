'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Plus, LayoutGrid, Calendar, FolderClosed, Settings, LogOut, RefreshCw } from 'lucide-react';
import { ContentTab } from '@/components/ContentTab';
import { PlanningTab } from '@/components/PlanningTab';
import { CalendarTabView } from '@/components/CalendarTabView';
import { SettingsTab } from '@/components/SettingsTab';
import { isSupabaseConfigured } from '@/lib/supabase';

type ActiveViewType = 'content' | 'calendar' | 'projects' | 'settings';

export default function Home() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const [activeView, setActiveView] = useState<ActiveViewType>('content');
  const [newContentTrigger, setNewContentTrigger] = useState(0);
  const [newProjectTrigger, setNewProjectTrigger] = useState(0);

  // Auth Guard
  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  const handleNouveauClick = () => {
    if (activeView === 'content') {
      setNewContentTrigger(prev => prev + 1);
    } else if (activeView === 'projects') {
      setNewProjectTrigger(prev => prev + 1);
    } else {
      setActiveView('content');
      setNewContentTrigger(prev => prev + 1);
    }
  };

  const handleLogout = async () => {
    if (confirm('Voulez-vous vraiment vous déconnecter ?')) {
      await logout();
      router.push('/login');
    }
  };

  if (loading || !user) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center">
        <RefreshCw className="w-8 h-8 text-brand-orange animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#FDFBF7] font-sans antialiased text-brand-black">
      {/* Sidebar - Locked on Left */}
      <aside className="w-64 bg-white border-r border-brand-black/10 flex flex-col justify-between p-6 fixed h-full z-40 select-none">
        <div className="space-y-8">
          {/* Logo container */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-orange flex items-center justify-center text-white font-black text-lg shadow-sm">
              W
            </div>
            <div>
              <span className="font-extrabold text-base tracking-tight text-brand-black block">WebModern</span>
              <span className="text-[10px] text-brand-black/40 font-bold uppercase tracking-wider">SEO Cockpit</span>
            </div>
          </div>

          {/* Plus Nouveau Button */}
          <button
            onClick={handleNouveauClick}
            className="w-full bg-brand-orange text-white py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-brand-orange/95 transition-all shadow-sm"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            + Nouveau
          </button>

          {/* Navigation Items */}
          <nav className="flex flex-col gap-1">
            <button
              onClick={() => setActiveView('content')}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all border ${
                activeView === 'content'
                  ? 'bg-brand-sable border-brand-black/5 text-brand-black shadow-sm'
                  : 'border-transparent text-brand-black/50 hover:text-brand-black hover:bg-brand-sable/30'
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
              Contenus
            </button>
            
            <button
              onClick={() => setActiveView('calendar')}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all border ${
                activeView === 'calendar'
                  ? 'bg-brand-sable border-brand-black/5 text-brand-black shadow-sm'
                  : 'border-transparent text-brand-black/50 hover:text-brand-black hover:bg-brand-sable/30'
              }`}
            >
              <Calendar className="w-4 h-4" />
              Calendrier
            </button>

            <button
              onClick={() => setActiveView('projects')}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all border ${
                activeView === 'projects'
                  ? 'bg-brand-sable border-brand-black/5 text-brand-black shadow-sm'
                  : 'border-transparent text-brand-black/50 hover:text-brand-black hover:bg-brand-sable/30'
              }`}
            >
              <FolderClosed className="w-4 h-4" />
              Projets
            </button>

            <button
              onClick={() => setActiveView('settings')}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all border ${
                activeView === 'settings'
                  ? 'bg-brand-sable border-brand-black/5 text-brand-black shadow-sm'
                  : 'border-transparent text-brand-black/50 hover:text-brand-black hover:bg-brand-sable/30'
              }`}
            >
              <Settings className="w-4 h-4" />
              Réglages
            </button>
          </nav>
        </div>

        {/* User initials & connection status at bottom */}
        <div className="space-y-4">
          {/* Supabase status badge */}
          <div className="border-t border-brand-black/5 pt-4">
            {isSupabaseConfigured ? (
              <span className="text-[9px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-100 px-2 py-1 rounded-md block text-center uppercase tracking-wider">
                base connectée
              </span>
            ) : (
              <span className="text-[9px] font-bold text-brand-orange bg-brand-sable border border-brand-orange/20 px-2 py-1 rounded-md block text-center uppercase tracking-wider" title="Configuration de .env.local requise pour connecter Supabase">
                mode démo local
              </span>
            )}
          </div>

          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-brand-sable flex items-center justify-center text-xs font-black text-brand-black border border-brand-black/10 shadow-sm uppercase">
                JP
              </div>
              <div className="truncate max-w-[100px]">
                <span className="text-xs font-extrabold text-brand-black block leading-none truncate">{user.email.split('@')[0]}</span>
                <span className="text-[9px] text-brand-black/45 font-bold uppercase tracking-wider">Admin</span>
              </div>
            </div>
            
            <button
              onClick={handleLogout}
              className="p-2 hover:bg-red-50 text-brand-black/40 hover:text-red-500 rounded-lg transition-colors"
              title="Déconnexion"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 ml-64 min-h-screen bg-[#FDFBF7] p-8 overflow-y-auto">
        {activeView === 'content' && (
          <ContentTab newTrigger={newContentTrigger} />
        )}
        {activeView === 'calendar' && (
          <CalendarTabView />
        )}
        {activeView === 'projects' && (
          <PlanningTab newTrigger={newProjectTrigger} />
        )}
        {activeView === 'settings' && (
          <SettingsTab />
        )}
      </main>
    </div>
  );
}
