'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Plus, LayoutGrid, Calendar, FolderClosed, Settings, LogOut, RefreshCw, MessageSquare, Briefcase, Users, Shield } from 'lucide-react';
import { ContentTab } from '@/components/ContentTab';
import { PlanningTab } from '@/components/PlanningTab';
import { CalendarTabView } from '@/components/CalendarTabView';
import { SettingsTab } from '@/components/SettingsTab';
import { LeadsTab } from '@/components/LeadsTab';
import { CRMTab } from '@/components/CRMTab';
import { TeamTab } from '@/components/TeamTab';
import { isSupabaseConfigured } from '@/lib/supabase';

type ActiveViewType = 'content' | 'calendar' | 'projects' | 'leads' | 'crm' | 'team' | 'settings';

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

  const hasPermission = (tab: string) => {
    if (user.role === 'super_admin') return true;
    return user.permissions?.includes(tab);
  };

  const canAccessView = (view: ActiveViewType) => {
    if (view === 'team') return user.role === 'super_admin';
    return hasPermission(view);
  };

  const userInitials = user.email.slice(0, 2).toUpperCase();
  const userRoleLabel = user.role === 'super_admin' ? 'Super Admin' : user.role === 'admin' ? 'Admin' : 'Collaborateur';

  return (
    <div className="flex min-h-screen bg-[#FDFBF7] font-sans antialiased text-brand-black">
      {/* Sidebar - Locked on Left */}
      <aside className="w-64 bg-white border-r border-brand-black/10 flex flex-col justify-between p-6 fixed h-full z-40 select-none">
        <div className="space-y-8">
          {/* Logo container SVG WebModern */}
          <div className="flex items-center gap-3">
            <svg width="34" height="34" viewBox="0 0 100 100" className="shrink-0 shadow-sm rounded-xl">
              <rect width="100" height="100" rx="22" fill="#ff4d00" />
              <polygon points="20,28 42,28 42,76 25,76 21,58 27,58" fill="#ffffff" />
              <polygon points="58,28 80,28 70,76 58,76" fill="#ffffff" />
              <polygon points="41,66 59,66 50,46" fill="#ffffff" />
            </svg>
            <div>
              <span className="font-extrabold text-base tracking-tight text-brand-black block">webmodern<span className="text-brand-orange">seo</span></span>
              <span className="text-[9px] text-brand-black/40 font-bold uppercase tracking-wider block -mt-0.5">Cockpit Admin</span>
            </div>
          </div>

          {/* Plus Nouveau Button */}
          {hasPermission('content') && (
            <button
              onClick={handleNouveauClick}
              className="w-full bg-brand-orange text-white py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-brand-orange/95 transition-all shadow-sm"
            >
              <Plus className="w-4 h-4 stroke-[2.5]" />
              + Nouveau
            </button>
          )}

          {/* Navigation Items */}
          <nav className="flex flex-col gap-1">
            {hasPermission('content') && (
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
            )}
            
            {hasPermission('calendar') && (
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
            )}

            {hasPermission('projects') && (
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
            )}

            {hasPermission('leads') && (
              <button
                onClick={() => setActiveView('leads')}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all border ${
                  activeView === 'leads'
                    ? 'bg-brand-sable border-brand-black/5 text-brand-black shadow-sm'
                    : 'border-transparent text-brand-black/50 hover:text-brand-black hover:bg-brand-sable/30'
                }`}
              >
                <MessageSquare className="w-4 h-4" />
                Prospects
              </button>
            )}

            {hasPermission('crm') && (
              <button
                onClick={() => setActiveView('crm')}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all border ${
                  activeView === 'crm'
                    ? 'bg-brand-sable border-brand-black/5 text-brand-black shadow-sm'
                    : 'border-transparent text-brand-black/50 hover:text-brand-black hover:bg-brand-sable/30'
                }`}
              >
                <Briefcase className="w-4 h-4" />
                Commercial (CRM)
              </button>
            )}

            {user.role === 'super_admin' && (
              <button
                onClick={() => setActiveView('team')}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all border ${
                  activeView === 'team'
                    ? 'bg-brand-sable border-brand-black/5 text-brand-black shadow-sm'
                    : 'border-transparent text-brand-black/50 hover:text-brand-black hover:bg-brand-sable/30'
                }`}
              >
                <Users className="w-4 h-4" />
                Équipe
              </button>
            )}

            {hasPermission('settings') && (
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
            )}
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
                {userInitials}
              </div>
              <div className="truncate max-w-[100px]">
                <span className="text-xs font-extrabold text-brand-black block leading-none truncate">{user.email.split('@')[0]}</span>
                <span className="text-[9px] text-brand-black/45 font-bold uppercase tracking-wider">{userRoleLabel}</span>
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
        {!canAccessView(activeView) ? (
          <div className="py-20 text-center bg-white border border-brand-black/5 rounded-3xl p-12 max-w-md mx-auto shadow-sm space-y-4">
            <Shield className="w-12 h-12 text-[#ff4d00] mx-auto animate-pulse" />
            <h2 className="text-lg font-bold text-brand-black">Accès restreint</h2>
            <p className="text-xs text-brand-black/50 leading-relaxed">
              Votre compte n'a pas les privilèges requis pour administrer cette section. 
              Veuillez contacter le super administrateur de WebModern SEO pour modifier vos permissions.
            </p>
          </div>
        ) : (
          <>
            {activeView === 'content' && (
              <ContentTab newTrigger={newContentTrigger} />
            )}
            {activeView === 'calendar' && (
              <CalendarTabView />
            )}
            {activeView === 'projects' && (
              <PlanningTab newTrigger={newProjectTrigger} />
            )}
            {activeView === 'leads' && (
              <LeadsTab />
            )}
            {activeView === 'crm' && (
              <CRMTab />
            )}
            {activeView === 'team' && (
              <TeamTab />
            )}
            {activeView === 'settings' && (
              <SettingsTab />
            )}
          </>
        )}
      </main>
    </div>
  );
}
