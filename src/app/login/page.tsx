'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Sparkles, Key, Mail, AlertCircle, RefreshCw } from 'lucide-react';

export default function LoginPage() {
  const { user, login, loading, isDemoMode } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [signingIn, setSigningIn] = useState(false);
  const router = useRouter();

  // Redirect to home if user is already logged in
  useEffect(() => {
    if (!loading && user) {
      router.push('/dashboard');
    }
  }, [user, loading, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) return;

    try {
      setError('');
      setSigningIn(true);
      const success = await login(email.trim(), password);
      
      if (success) {
        router.push('/dashboard');
      } else {
        setError('Identifiant ou mot de passe incorrect.');
      }
    } catch (err) {
      console.error(err);
      setError('Une erreur est survenue lors de la connexion.');
    } finally {
      setSigningIn(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center">
        <RefreshCw className="w-8 h-8 text-brand-orange animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center p-6 font-sans">
      <div className="w-full max-w-md bg-white border border-brand-black/10 p-8 rounded-3xl shadow-sm space-y-8 animate-fadeIn">
        {/* Header Logo */}
        <div className="flex flex-col items-center text-center space-y-3">
          <div className="w-12 h-12 rounded-xl bg-brand-orange flex items-center justify-center text-white font-black text-xl shadow-sm">
            W
          </div>
          <div>
            <h2 className="text-xl font-bold tracking-tight text-brand-black">
              WebModern <span className="text-brand-orange">SEO</span>
            </h2>
            <p className="text-[10px] text-brand-black/40 font-bold uppercase tracking-widest mt-0.5">
              Accès Privé Cockpit
            </p>
          </div>
        </div>

        {/* Demo Mode Notice */}
        {isDemoMode && (
          <div className="p-4 bg-brand-sable/50 border border-brand-orange/20 rounded-xl space-y-1.5 text-xs text-brand-black/75">
            <p className="font-bold flex items-center gap-1.5 text-brand-orange uppercase text-[9px] tracking-wider">
              <AlertCircle className="w-3.5 h-3.5" />
              Mode Démo Local Actif
            </p>
            <p>Utilisez les identifiants par défaut pour tester le cockpit :</p>
            <div className="bg-white/80 p-2 rounded-lg border border-brand-black/5 font-mono text-[10px] space-y-1">
              <div>Identifiant: <span className="font-bold">webmodernseo@gmail.com</span></div>
              <div>Mot de passe: <span className="font-bold">Prosper226webmodernseo@</span></div>
            </div>
          </div>
        )}

        {/* Error message */}
        {error && (
          <div className="p-3 bg-red-50 border border-red-100 text-red-700 text-xs font-semibold rounded-xl flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            {error}
          </div>
        )}

        {/* Login form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-brand-black/50 uppercase tracking-widest">
              Adresse e-mail
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-brand-black/35">
                <Mail className="w-4 h-4" />
              </span>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#FDFBF7] border border-brand-black/10 focus:border-brand-orange rounded-xl pl-10 pr-4 py-2.5 text-sm text-brand-black focus:outline-none focus:ring-0"
                placeholder="nom@exemple.com"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-brand-black/50 uppercase tracking-widest">
              Mot de passe
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-brand-black/35">
                <Key className="w-4 h-4" />
              </span>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#FDFBF7] border border-brand-black/10 focus:border-brand-orange rounded-xl pl-10 pr-4 py-2.5 text-sm text-brand-black focus:outline-none focus:ring-0"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={signingIn}
            className="w-full bg-brand-orange text-white py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-brand-orange/95 transition-all shadow-sm disabled:bg-brand-orange/50 mt-6"
          >
            {signingIn ? (
              <RefreshCw className="w-4 h-4 animate-spin" />
            ) : (
              'Se connecter'
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
