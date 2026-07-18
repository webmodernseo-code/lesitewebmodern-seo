'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Mail, Lock, Eye, EyeOff, AlertCircle, RefreshCw, ShieldCheck, MailCheck } from 'lucide-react';
import { Logo3D } from '@/components/public/Logo3D';

export default function LoginPage() {
  const { user, login, verifyOtp, resendOtp, loading } = useAuth();
  const [step, setStep] = useState<'credentials' | 'otp'>('credentials');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [otpDigits, setOtpDigits] = useState(['', '', '', '']);
  const [error, setError] = useState('');
  const [resendMessage, setResendMessage] = useState('');
  const [signingIn, setSigningIn] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [resending, setResending] = useState(false);
  const otpInputRefs = useRef<(HTMLInputElement | null)[]>([]);
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
      const result = await login(email.trim(), password);

      if (result.status === 'success') {
        router.push('/dashboard');
      } else if (result.status === 'otp_required') {
        setStep('otp');
        setOtpDigits(['', '', '', '']);
      } else {
        setError(result.error || 'Identifiant ou mot de passe incorrect.');
      }
    } catch (err) {
      console.error(err);
      setError('Une erreur est survenue lors de la connexion.');
    } finally {
      setSigningIn(false);
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value && !/^\d$/.test(value)) return;
    const next = [...otpDigits];
    next[index] = value;
    setOtpDigits(next);
    if (value && index < 3) {
      otpInputRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otpDigits[index] && index > 0) {
      otpInputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    const code = otpDigits.join('');
    if (code.length !== 4) return;

    try {
      setError('');
      setVerifying(true);
      const result = await verifyOtp(code);
      if (result.status === 'success') {
        router.push('/dashboard');
      } else {
        setError(result.error || 'Code incorrect.');
      }
    } catch (err) {
      console.error(err);
      setError('Une erreur est survenue.');
    } finally {
      setVerifying(false);
    }
  };

  const handleResend = async () => {
    setError('');
    setResendMessage('');
    setResending(true);
    const ok = await resendOtp();
    setResendMessage(ok ? 'Un nouveau code a été envoyé.' : "L'envoi a échoué. Réessayez.");
    setResending(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center">
        <RefreshCw className="w-8 h-8 text-[#ff4d00] animate-spin" />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center font-sans overflow-hidden bg-[#FDFBF7] px-6 py-16">
      {/* Fond décoratif : formes douces + blocs empilés (inspiré de la maquette) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-[#ff4d00]/10 blur-3xl" />
        <div className="absolute top-1/3 -right-32 w-[28rem] h-[28rem] rounded-full bg-black/[0.04] blur-3xl" />
        <div className="absolute -bottom-32 left-1/4 w-96 h-96 rounded-full bg-[#F5E6D3]/70 blur-3xl" />

        {/* Pile de blocs 3D, visible uniquement sur grand écran */}
        <div className="hidden lg:block absolute bottom-16 left-[8%] w-40 h-64">
          <div className="absolute bottom-40 left-2 w-28 h-16 rounded-2xl bg-white border border-black/10 shadow-lg rotate-[-4deg]" />
          <div className="absolute bottom-24 left-0 w-32 h-16 rounded-2xl bg-[#ff4d00] shadow-lg rotate-[3deg]" />
          <div className="absolute bottom-8 left-3 w-28 h-16 rounded-2xl bg-[#F5E6D3] border border-black/5 shadow-lg rotate-[-2deg]" />
          <div className="absolute bottom-0 left-1 w-28 h-14 rounded-2xl bg-black/85 shadow-lg rotate-[2deg]" />
        </div>
      </div>

      {/* Zone carte(s) */}
      <div className="relative w-full max-w-md">
        {/* Badge flottant décoratif (desktop uniquement) */}
        <div className="hidden md:flex absolute -top-7 left-6 z-20 items-center gap-2 bg-black text-white rounded-full pl-2 pr-4 py-2 shadow-xl rotate-[-2deg]">
          <svg width="28" height="28" viewBox="0 0 100 100" className="shrink-0 rounded-lg">
            <rect width="100" height="100" rx="22" fill="#ff4d00" />
            <polygon points="20,28 42,28 42,76 25,76 21,58 27,58" fill="#ffffff" />
            <polygon points="58,28 80,28 70,76 58,76" fill="#ffffff" />
            <polygon points="41,66 59,66 50,46" fill="#ffffff" />
          </svg>
          <span className="text-xs font-bold tracking-tight">Cockpit sécurisé</span>
        </div>

        {/* Carte principale en verre dépoli */}
        <div className="relative z-10 bg-white/75 backdrop-blur-xl border border-white shadow-2xl rounded-[32px] px-8 py-10 space-y-6">
          <div className="flex items-center gap-2.5">
            <Logo3D scale={0.32} />
            <span className="text-black font-bold text-base tracking-tight -ml-3">
              webmodern<span className="text-[#ff4d00]">seo</span>
            </span>
          </div>

          {step === 'credentials' ? (
            <>
              <div>
                <h1 className="text-2xl font-extrabold tracking-tight text-black">
                  Connexion à votre <span className="text-[#ff4d00]">espace</span>
                </h1>
                <p className="text-xs text-black/40 font-semibold uppercase tracking-widest mt-1.5">
                  Cockpit webmodernseo
                </p>
              </div>

              {error && (
                <div className="p-3 bg-red-50 border border-red-100 text-red-700 text-xs font-semibold rounded-2xl flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-3.5">
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-5 flex items-center text-black/35">
                    <Mail className="w-4 h-4" />
                  </span>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white/70 border border-black/10 focus:border-[#ff4d00] rounded-full pl-12 pr-4 py-3.5 text-sm text-black focus:outline-none focus:ring-0 placeholder:text-black/35"
                    placeholder="Adresse e-mail"
                  />
                </div>

                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-5 flex items-center text-black/35">
                    <Lock className="w-4 h-4" />
                  </span>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-white/70 border border-black/10 focus:border-[#ff4d00] rounded-full pl-12 pr-11 py-3.5 text-sm text-black focus:outline-none focus:ring-0 placeholder:text-black/35"
                    placeholder="Mot de passe"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute inset-y-0 right-0 pr-5 flex items-center text-black/35 hover:text-black/60"
                    aria-label={showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>

                <div className="flex justify-end">
                  <a href="#" className="text-[11px] font-bold text-[#ff4d00] hover:underline">
                    Mot de passe oublié ?
                  </a>
                </div>

                <button
                  type="submit"
                  disabled={signingIn}
                  className="w-full bg-[#ff4d00] text-white py-3.5 px-4 rounded-full text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-[#ff4d00]/95 transition-all shadow-sm disabled:bg-[#ff4d00]/50 mt-2"
                >
                  {signingIn ? <RefreshCw className="w-4 h-4 animate-spin" /> : 'Se connecter'}
                </button>
              </form>
            </>
          ) : (
            <>
              <div>
                <div className="w-11 h-11 rounded-2xl bg-[#ff4d00]/10 flex items-center justify-center text-[#ff4d00] mb-3">
                  <MailCheck className="w-5 h-5" />
                </div>
                <h1 className="text-2xl font-extrabold tracking-tight text-black">
                  Vérifiez votre <span className="text-[#ff4d00]">email</span>
                </h1>
                <p className="text-xs text-black/50 mt-1.5">
                  Code à 4 chiffres envoyé à <span className="font-semibold text-black">{email}</span>
                </p>
              </div>

              {error && (
                <div className="p-3 bg-red-50 border border-red-100 text-red-700 text-xs font-semibold rounded-2xl flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  {error}
                </div>
              )}

              {resendMessage && !error && (
                <div className="p-3 bg-[#0FAC71]/5 border border-[#0FAC71]/15 text-[#0FAC71] text-xs font-semibold rounded-2xl">
                  {resendMessage}
                </div>
              )}

              <form onSubmit={handleVerifyOtp} className="space-y-6">
                <div className="flex items-center justify-center gap-3">
                  {otpDigits.map((digit, i) => (
                    <input
                      key={i}
                      ref={(el) => {
                        otpInputRefs.current[i] = el;
                      }}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(i, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(i, e)}
                      className="w-14 h-14 text-center text-xl font-extrabold bg-white/70 border border-black/10 focus:border-[#ff4d00] rounded-2xl text-black focus:outline-none focus:ring-0"
                    />
                  ))}
                </div>

                <button
                  type="submit"
                  disabled={verifying || otpDigits.join('').length !== 4}
                  className="w-full bg-[#ff4d00] text-white py-3.5 px-4 rounded-full text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-[#ff4d00]/95 transition-all shadow-sm disabled:bg-[#ff4d00]/50"
                >
                  {verifying ? <RefreshCw className="w-4 h-4 animate-spin" /> : 'Continuer'}
                </button>

                <p className="text-center text-xs text-black/50">
                  Pas reçu de code ?{' '}
                  <button
                    type="button"
                    onClick={handleResend}
                    disabled={resending}
                    className="font-bold text-[#ff4d00] hover:underline disabled:opacity-50"
                  >
                    {resending ? 'Envoi...' : 'Renvoyer le code'}
                  </button>
                </p>

                <button
                  type="button"
                  onClick={() => {
                    setStep('credentials');
                    setError('');
                    setResendMessage('');
                  }}
                  className="w-full text-center text-[10px] font-bold text-black/40 uppercase tracking-widest hover:text-black/60"
                >
                  ← Retour
                </button>
              </form>
            </>
          )}
        </div>

        {/* Badge sécurité (mobile) */}
        <div className="md:hidden flex items-center justify-center gap-2 mt-5 text-black/40">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span className="text-[10px] font-bold uppercase tracking-widest">Accès réservé à l&apos;équipe webmodernseo</span>
        </div>
      </div>
    </div>
  );
}
