'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';

export interface Collaborator {
  email: string;
  password?: string;
  role: 'super_admin' | 'admin' | 'collaborator';
  permissions: string[];
}

interface AuthContextType {
  user: Collaborator | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  updatePassword: (password: string) => Promise<boolean>;
  collaborators: Collaborator[];
  addCollaborator: (collab: Collaborator) => Promise<void>;
  removeCollaborator: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<Collaborator | null>(null);
  const [collaborators, setCollaborators] = useState<Collaborator[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/auth/session')
      .then((res) => res.json())
      .then((data) => setUser(data.user))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  const fetchCollaborators = useCallback(async () => {
    try {
      const res = await fetch('/api/auth/collaborators');
      if (res.ok) {
        const data = await res.json();
        setCollaborators(data.collaborators || []);
      }
    } catch (err) {
      console.error('Failed to fetch collaborators:', err);
    }
  }, []);

  useEffect(() => {
    if (user?.role === 'super_admin') {
      fetchCollaborators();
    }
  }, [user, fetchCollaborators]);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) return false;
      const data = await res.json();
      setUser(data.user);
      return true;
    } catch (err) {
      console.error('Login error:', err);
      return false;
    }
  };

  const logout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    setUser(null);
    setCollaborators([]);
  };

  const updatePassword = async (password: string): Promise<boolean> => {
    try {
      const res = await fetch('/api/auth/password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      return res.ok;
    } catch (err) {
      console.error('Password update error:', err);
      return false;
    }
  };

  const addCollaborator = async (collab: Collaborator) => {
    try {
      const res = await fetch('/api/auth/collaborators', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(collab),
      });
      if (res.ok) {
        await fetchCollaborators();
      } else {
        const data = await res.json();
        alert(data.error || "Impossible d'ajouter ce collaborateur.");
      }
    } catch (err) {
      console.error('Add collaborator error:', err);
    }
  };

  const removeCollaborator = async (email: string) => {
    try {
      const res = await fetch(`/api/auth/collaborators/${encodeURIComponent(email)}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        await fetchCollaborators();
      } else {
        const data = await res.json();
        alert(data.error || 'Impossible de supprimer ce compte.');
      }
    } catch (err) {
      console.error('Remove collaborator error:', err);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, login, logout, updatePassword, collaborators, addCollaborator, removeCollaborator }}
    >
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
