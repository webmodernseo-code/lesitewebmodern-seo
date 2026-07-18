'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Mail, Lock, Eye, EyeOff, AlertCircle, RefreshCw, ShieldCheck } from 'lucide-react';
import { Logo3D } from '@/components/public/Logo3D';

export default function LoginPage() {
  const { user, login, loading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [signingIn, setSigningIn] = useState(false);
  const router = useRouter();

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
        <RefreshCw className="w-8 h-8 text-[#ff4d00] animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row font-sans">
      {/* Panneau visuel */}
      <div className="relative w-full md:w-1/2 h-[34vh] md:h-screen overflow-hidden bg-black order-1 md:order-2">
        {/* Mobile: hero plein écran avec logo centré */}
        <div className="md:hidden absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?auto=format&fit=crop&w=1200&q=80"
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/55 to-black/25" />
          <div className="relative h-full flex flex-col items-center justify-center gap-3">
            <Logo3D scale={0.5} />
            <span className="text-white font-bold text-lg tracking-tight -mt-2">
              webmodern<span className="text-[#ff4d00]">seo</span>
            </span>
          </div>
        </div>

        {/* Desktop: mockup encadré, plus petit que l'espace disponible */}
        <div className="hidden md:flex h-full items-center justify-center bg-[#FDFBF7] p-12">
          <div className="relative w-full max-w-md aspect-[4/3] rounded-3xl overflow-hidden border border-black/10 shadow-lg">
            <img
              src="https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&w=900&q=80"
              alt="Mockup d'un site web moderne affiché sur écran"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute bottom-16 left-1/2 -translate-x-1/2 w-full max-w-md bg-white border border-black/10 rounded-2xl p-4 flex items-center gap-3 shadow-xl">
            <div className="w-10 h-10 rounded-xl bg-[#ff4d00]/10 flex items-center justify-center text-[#ff4d00] shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-bold text-black">Accès Cockpit sécurisé</p>
              <p className="text-xs text-black/50">Réservé à l&apos;équipe webmodernseo</p>
            </div>
          </div>
        </div>
      </div>

      {/* Panneau formulaire */}
      <div className="w-full md:w-1/2 flex items-start md:items-center justify-center bg-[#FDFBF7] order-2 md:order-1">
        <div className="w-full max-w-md bg-white md:bg-transparent rounded-t-[32px] md:rounded-none px-8 py-10 md:p-12 shadow-[0_-12px_30px_rgba(0,0,0,0.06)] md:shadow-none -mt-8 md:mt-0 relative z-10 space-y-6">
          <div className="hidden md:flex items-center gap-2.5 mb-2">
            <Logo3D scale={0.32} />
            <span className="text-black font-bold text-base tracking-tight -ml-3">
              webmodern<span className="text-[#ff4d00]">seo</span>
            </span>
          </div>

          <div>
            <h1 className="text-2xl font-extrabold tracking-tight text-black">
              Connexion à votre <span className="text-[#ff4d00]">espace</span>
            </h1>
            <p className="text-xs text-black/40 font-semibold uppercase tracking-widest mt-1.5">
              Cockpit webmodernseo
            </p>
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-100 text-red-700 text-xs font-semibold rounded-xl flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-black/50 uppercase tracking-widest">
                Adresse e-mail
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-black/35">
                  <Mail className="w-4 h-4" />
                </span>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#FDFBF7] border border-black/10 focus:border-[#ff4d00] rounded-xl pl-10 pr-4 py-3 text-sm text-black focus:outline-none focus:ring-0"
                  placeholder="nom@exemple.com"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-[10px] font-bold text-black/50 uppercase tracking-widest">
                  Mot de passe
                </label>
                <a href="#" className="text-[10px] font-bold text-[#ff4d00] hover:underline">
                  Mot de passe oublié ?
                </a>
              </div>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-black/35">
                  <Lock className="w-4 h-4" />
                </span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#FDFBF7] border border-black/10 focus:border-[#ff4d00] rounded-xl pl-10 pr-11 py-3 text-sm text-black focus:outline-none focus:ring-0"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-black/35 hover:text-black/60"
                  aria-label={showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={signingIn}
              className="w-full bg-[#ff4d00] text-white py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-[#ff4d00]/95 transition-all shadow-sm disabled:bg-[#ff4d00]/50 mt-2"
            >
              {signingIn ? <RefreshCw className="w-4 h-4 animate-spin" /> : 'Se connecter'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
