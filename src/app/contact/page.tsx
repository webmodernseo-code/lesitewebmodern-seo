'use client';

import React, { useState } from 'react';
import { HeaderPublic } from '@/components/public/HeaderPublic';
import { FooterPublic } from '@/components/public/FooterPublic';
import Link from 'next/link';
import { Mail, User, Phone, Briefcase, Send, CheckCircle, RefreshCw, CalendarClock } from 'lucide-react';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    try {
      setLoading(true);
      setError('');
      
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, company, message })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSuccess(true);
        setName('');
        setEmail('');
        setPhone('');
        setCompany('');
        setMessage('');
      } else {
        setError(data.error || 'Une erreur est survenue lors de l\'envoi.');
      }
    } catch (err) {
      console.error(err);
      setError('Impossible d\'envoyer le message pour le moment. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#FDFBF7] text-black overflow-x-hidden font-sans">
      <HeaderPublic />

      <main className="w-full pt-32 pb-24 px-6 max-w-4xl mx-auto flex flex-col md:flex-row gap-12 items-start">
        {/* Colonne Gauche - Texte & Coordonnées */}
        <div className="w-full md:w-5/12 space-y-6 md:sticky md:top-32">
          <div className="inline-block bg-[#ff4d00]/10 text-[#ff4d00] px-4 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-wider">
            Parlons SEO & Web
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-black leading-none">
            Prêt à faire décoller votre <span className="text-[#ff4d00]">visibilité</span> ?
          </h1>
          <p className="text-sm text-[#5c5c64] leading-relaxed">
            Que vous ayez besoin d'une refonte complète sous WordPress, d'une stratégie SEO de premier plan, ou d'automatisations de leads pour votre équipe, nous sommes là pour concrétiser vos objectifs.
          </p>
          <Link
            href="/reservation"
            className="inline-flex items-center gap-2 bg-black hover:bg-black/90 text-white py-3 px-5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-sm"
          >
            <CalendarClock className="w-4 h-4" />
            Prendre RDV directement
          </Link>
          <div className="pt-4 space-y-3.5 text-sm">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-white border border-black/5 flex items-center justify-center text-[#ff4d00] shadow-sm">
                <Mail className="w-4 h-4" />
              </div>
              <span className="font-semibold text-black">contact@webmodernseo.co</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-white border border-black/5 flex items-center justify-center text-[#ff4d00] shadow-sm">
                <Phone className="w-4 h-4" />
              </div>
              <span className="font-semibold text-black">+33 (0)1 84 60 90 20</span>
            </div>
          </div>
        </div>

        {/* Colonne Droite - Formulaire de contact */}
        <div className="w-full md:w-7/12 bg-white border border-black/10 p-8 md:p-10 rounded-3xl shadow-sm relative overflow-hidden">
          {success ? (
            <div className="py-12 flex flex-col items-center text-center space-y-4 animate-scaleUp">
              <div className="w-16 h-16 rounded-full bg-[#0FAC71]/10 flex items-center justify-center text-[#0FAC71]">
                <CheckCircle className="w-10 h-10" />
              </div>
              <h2 className="text-xl font-bold text-black">Votre message a bien été envoyé !</h2>
              <p className="text-xs text-[#5c5c64] max-w-sm">
                Merci de votre intérêt. Un expert de l'équipe de WebModern SEO vous recontactera sous 24 heures ouvrées pour échanger sur votre projet.
              </p>
              <button 
                onClick={() => setSuccess(false)} 
                className="mt-4 text-xs font-bold text-[#ff4d00] hover:underline"
              >
                Envoyer une autre demande
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <h2 className="text-lg font-bold text-black border-b border-black/5 pb-3">Envoyez-nous un message</h2>
              
              {error && (
                <div className="p-3.5 bg-red-50 border border-red-100 text-red-700 text-xs font-semibold rounded-xl">
                  {error}
                </div>
              )}

              {/* Nom */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-black/50 uppercase tracking-widest block">
                  Votre nom & prénom *
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-black/30" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Marc Aurel"
                    className="w-full pl-11 pr-4 py-3 bg-[#fdfbf7]/50 border border-black/10 rounded-xl text-sm focus:outline-none focus:border-[#ff4d00] focus:ring-1 focus:ring-[#ff4d00] transition-all text-black"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-black/50 uppercase tracking-widest block">
                  Adresse e-mail *
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-black/30" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="marc.aurel@societe.com"
                    className="w-full pl-11 pr-4 py-3 bg-[#fdfbf7]/50 border border-black/10 rounded-xl text-sm focus:outline-none focus:border-[#ff4d00] focus:ring-1 focus:ring-[#ff4d00] transition-all text-black"
                  />
                </div>
              </div>

              {/* Téléphone & Entreprise */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-black/50 uppercase tracking-widest block">
                    Téléphone
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-black/30" />
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="06 12 34 56 78"
                      className="w-full pl-11 pr-4 py-3 bg-[#fdfbf7]/50 border border-black/10 rounded-xl text-sm focus:outline-none focus:border-[#ff4d00] focus:ring-1 focus:ring-[#ff4d00] transition-all text-black"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-black/50 uppercase tracking-widest block">
                    Entreprise / Société
                  </label>
                  <div className="relative">
                    <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-black/30" />
                    <input
                      type="text"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="Empire Corp"
                      className="w-full pl-11 pr-4 py-3 bg-[#fdfbf7]/50 border border-black/10 rounded-xl text-sm focus:outline-none focus:border-[#ff4d00] focus:ring-1 focus:ring-[#ff4d00] transition-all text-black"
                    />
                  </div>
                </div>
              </div>

              {/* Message */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-black/50 uppercase tracking-widest block">
                  Parlez-nous de votre projet *
                </label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Expliquez-nous brièvement votre besoin (objectifs SEO, refonte, génération de leads...)"
                  className="w-full px-4 py-3 bg-[#fdfbf7]/50 border border-black/10 rounded-xl text-sm focus:outline-none focus:border-[#ff4d00] focus:ring-1 focus:ring-[#ff4d00] transition-all text-black resize-none"
                />
              </div>

              {/* Bouton de soumission */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#ff4d00] hover:bg-[#ff4d00]/95 text-white py-3.5 px-4 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-sm"
              >
                {loading ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Envoyer ma demande
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </main>

      <FooterPublic />
    </div>
  );
}
