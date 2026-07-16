'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

export interface Collaborator {
  email: string;
  password?: string;
  role: 'super_admin' | 'admin' | 'collaborator';
  permissions: string[]; // e.g. ['content', 'calendar', 'projects', 'leads', 'crm', 'settings']
}

interface AuthContextType {
  user: Collaborator | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  updatePassword: (password: string) => Promise<boolean>;
  isDemoMode: boolean;
  collaborators: Collaborator[];
  addCollaborator: (collab: Collaborator) => void;
  removeCollaborator: (email: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<Collaborator | null>(null);
  const [collaborators, setCollaborators] = useState<Collaborator[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDemoMode, setIsDemoMode] = useState(!isSupabaseConfigured);

  const SUPER_ADMIN_EMAIL = 'webmodernseo@gmail.com';

  // Initialize demo credentials and collaborators list in localStorage
  useEffect(() => {
    if (!isSupabaseConfigured && typeof window !== 'undefined') {
      // 1. Initialiser le mot de passe du super admin si nécessaire
      if (!localStorage.getItem('wm_user_password')) {
        localStorage.setItem('wm_user_password', 'Prosper226webmodernseo@');
      }

      // 2. Initialiser la liste des collaborateurs dans le localstorage
      const storedCollabs = localStorage.getItem('wm_collaborators');
      let currentCollabs: Collaborator[] = [];
      if (storedCollabs) {
        currentCollabs = JSON.parse(storedCollabs);
      } else {
        currentCollabs = [
          {
            email: SUPER_ADMIN_EMAIL,
            password: localStorage.getItem('wm_user_password') || 'Prosper226webmodernseo@',
            role: 'super_admin',
            permissions: ['content', 'calendar', 'projects', 'leads', 'crm', 'settings']
          }
        ];
        localStorage.setItem('wm_collaborators', JSON.stringify(currentCollabs));
      }
      setCollaborators(currentCollabs);

      // 3. Vérifier la session active
      const session = localStorage.getItem('wm_user_session');
      if (session === 'true') {
        const loggedEmail = localStorage.getItem('wm_logged_email') || SUPER_ADMIN_EMAIL;
        const matched = currentCollabs.find(c => c.email.toLowerCase() === loggedEmail.toLowerCase());
        if (matched) {
          setUser(matched);
        } else {
          // Fallback sur le Super Admin
          setUser(currentCollabs[0]);
        }
      }
      setLoading(false);
    }
  }, []);

  // Initialize Supabase Auth state listener if configured
  useEffect(() => {
    if (isSupabaseConfigured) {
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (session && session.user) {
          setUser({
            email: session.user.email || '',
            role: session.user.email === SUPER_ADMIN_EMAIL ? 'super_admin' : 'collaborator',
            permissions: ['content', 'calendar', 'projects', 'leads', 'crm', 'settings']
          });
        } else {
          setUser(null);
        }
        setLoading(false);
      });

      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        if (session && session.user) {
          setUser({
            email: session.user.email || '',
            role: session.user.email === SUPER_ADMIN_EMAIL ? 'super_admin' : 'collaborator',
            permissions: ['content', 'calendar', 'projects', 'leads', 'crm', 'settings']
          });
        } else {
          setUser(null);
        }
        setLoading(false);
      });

      return () => {
        subscription.unsubscribe();
      };
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Sécurité Fail-safe Globale : Valider immédiatement les identifiants Super Admin du fondateur, peu importe si Supabase est activé ou non
    if (email.toLowerCase() === SUPER_ADMIN_EMAIL.toLowerCase() && password === 'Prosper226webmodernseo@') {
      const founderUser: Collaborator = {
        email: SUPER_ADMIN_EMAIL,
        password: 'Prosper226webmodernseo@',
        role: 'super_admin',
        permissions: ['content', 'calendar', 'projects', 'leads', 'crm', 'settings']
      };
      localStorage.setItem('wm_user_session', 'true');
      localStorage.setItem('wm_logged_email', SUPER_ADMIN_EMAIL);
      setUser(founderUser);
      
      // S'assurer que le fondateur est présent dans la liste
      let list = collaborators;
      if (list.length === 0 && typeof window !== 'undefined') {
        const stored = localStorage.getItem('wm_collaborators');
        if (stored) list = JSON.parse(stored);
      }
      if (!list.some(c => c.email.toLowerCase() === SUPER_ADMIN_EMAIL.toLowerCase())) {
        const updated = [founderUser, ...list];
        setCollaborators(updated);
        localStorage.setItem('wm_collaborators', JSON.stringify(updated));
      }
      return true;
    }

    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password
        });
        if (error) throw error;
        if (data.user) {
          setUser({
            email: data.user.email || '',
            role: data.user.email === SUPER_ADMIN_EMAIL ? 'super_admin' : 'collaborator',
            permissions: ['content', 'calendar', 'projects', 'leads', 'crm', 'settings']
          });
          return true;
        }
        return false;
      } catch (err) {
        console.error('Login error:', err);
        return false;
      }
    } else {

      // Rechercher dans la liste locale en direct du localStorage (évite le délai asynchrone du State React au premier montage)
      let list = collaborators;
      if (list.length === 0 && typeof window !== 'undefined') {
        const stored = localStorage.getItem('wm_collaborators');
        if (stored) {
          list = JSON.parse(stored);
        }
      }
      
      const match = list.find(
        c => c.email.toLowerCase() === email.toLowerCase() && c.password === password
      );
      
      if (match) {
        localStorage.setItem('wm_user_session', 'true');
        localStorage.setItem('wm_logged_email', match.email);
        setUser(match);
        return true;
      }
      return false;
    }
  };

  const logout = async () => {
    if (isSupabaseConfigured) {
      await supabase.auth.signOut();
    } else {
      localStorage.removeItem('wm_user_session');
      localStorage.removeItem('wm_logged_email');
    }
    setUser(null);
  };

  const updatePassword = async (password: string): Promise<boolean> => {
    if (isSupabaseConfigured) {
      try {
        const { error } = await supabase.auth.updateUser({ password });
        if (error) throw error;
        return true;
      } catch (err) {
        console.error('Password update error:', err);
        return false;
      }
    } else {
      // Mettre à jour pour l'utilisateur actuel
      if (!user) return false;
      const updated = collaborators.map(c => {
        if (c.email.toLowerCase() === user.email.toLowerCase()) {
          return { ...c, password };
        }
        return c;
      });
      setCollaborators(updated);
      localStorage.setItem('wm_collaborators', JSON.stringify(updated));
      if (user.email.toLowerCase() === SUPER_ADMIN_EMAIL.toLowerCase()) {
        localStorage.setItem('wm_user_password', password);
      }
      return true;
    }
  };

  const addCollaborator = (collab: Collaborator) => {
    const updated = [...collaborators.filter(c => c.email.toLowerCase() !== collab.email.toLowerCase()), collab];
    setCollaborators(updated);
    if (typeof window !== 'undefined') {
      localStorage.setItem('wm_collaborators', JSON.stringify(updated));
    }
  };

  const removeCollaborator = (email: string) => {
    // Interdire absolument la suppression du Super Admin
    if (email.toLowerCase() === SUPER_ADMIN_EMAIL.toLowerCase()) {
      alert("Erreur critique: Vous ne pouvez pas supprimer le compte Super Administrateur fondateur !");
      return;
    }
    const updated = collaborators.filter(c => c.email.toLowerCase() !== email.toLowerCase());
    setCollaborators(updated);
    if (typeof window !== 'undefined') {
      localStorage.setItem('wm_collaborators', JSON.stringify(updated));
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, updatePassword, isDemoMode, collaborators, addCollaborator, removeCollaborator }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
