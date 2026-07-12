'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

interface AuthContextType {
  user: { email: string } | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  updatePassword: (password: string) => Promise<boolean>;
  isDemoMode: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<{ email: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [isDemoMode, setIsDemoMode] = useState(!isSupabaseConfigured);

  // Initialize demo credentials in localStorage
  useEffect(() => {
    if (!isSupabaseConfigured && typeof window !== 'undefined') {
      if (!localStorage.getItem('wm_user_email')) {
        localStorage.setItem('wm_user_email', 'webmodernseo@gmail.com');
      }
      if (!localStorage.getItem('wm_user_password')) {
        localStorage.setItem('wm_user_password', 'Prosper226Dashboard@');
      }

      // Check for an active session in local storage
      const session = localStorage.getItem('wm_user_session');
      if (session === 'true') {
        const email = localStorage.getItem('wm_user_email') || 'webmodernseo@gmail.com';
        setUser({ email });
      }
      setLoading(false);
    }
  }, []);

  // Initialize Supabase Auth state listener if configured
  useEffect(() => {
    if (isSupabaseConfigured) {
      // Get active session
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (session && session.user) {
          setUser({ email: session.user.email || '' });
        } else {
          setUser(null);
        }
        setLoading(false);
      });

      // Listen for auth changes
      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        if (session && session.user) {
          setUser({ email: session.user.email || '' });
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
    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password
        });
        if (error) throw error;
        if (data.user) {
          setUser({ email: data.user.email || '' });
          return true;
        }
        return false;
      } catch (err) {
        console.error('Login error:', err);
        return false;
      }
    } else {
      // Local Storage Demo Mode login
      const localEmail = localStorage.getItem('wm_user_email');
      const localPassword = localStorage.getItem('wm_user_password');
      
      if (email === localEmail && password === localPassword) {
        localStorage.setItem('wm_user_session', 'true');
        setUser({ email });
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
      localStorage.setItem('wm_user_password', password);
      return true;
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, updatePassword, isDemoMode }}>
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
